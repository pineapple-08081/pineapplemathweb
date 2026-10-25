#!/usr/bin/env python3
"""把 Threads 文章匯入網站，並依關鍵字自動分類。

用法：
  python3 tools/import_threads.py <輸入>

<輸入> 可以是：
  1. Meta「下載你的資訊」匯出的 Threads 資料（.zip 檔或解壓縮後的資料夾，選 JSON 格式）
  2. 一個 .txt 檔：每篇文章用一行 "---" 分隔，第一行可以寫日期（YYYY-MM-DD），
     也可以在文中寫 #分類名稱 指定分類，例如 #親師溝通

選項：
  --min-length N   少於 N 個字的貼文略過（預設 20，用來過濾簡短回覆）
  --merge          保留 data/articles.js 原本的文章（範例文章除外），只加入新的
  --out PATH       輸出位置（預設 data/articles.js）

分類規則寫在 data/site.js 的 categories.keywords，改那裡就能調整自動分類。
"""

import argparse
import hashlib
import json
import re
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_JS = ROOT / "data" / "site.js"
ARTICLES_JS = ROOT / "data" / "articles.js"

TEXT_KEYS = ("title", "text", "caption", "string_map_data")
TIME_KEYS = ("creation_timestamp", "timestamp", "taken_at")


def load_categories():
    """從 site.js 讀出 categories（id、name、keywords）。"""
    src = SITE_JS.read_text(encoding="utf-8")
    cats = []
    for block in re.finditer(r"\{\s*id:\s*\"([^\"]+)\",\s*name:\s*\"([^\"]+)\".*?keywords:\s*\[([^\]]*)\]", src, re.S):
        cid, name, kw = block.groups()
        cats.append({"id": cid, "name": name, "keywords": re.findall(r"\"([^\"]+)\"", kw)})
    if not cats:
        sys.exit("讀不到 data/site.js 裡的 categories，請確認格式。")
    return cats


def fix_mojibake(s):
    """Meta 的匯出檔常把 UTF-8 中文存成 latin-1 跳脫字元，這裡轉回來。"""
    try:
        return s.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


def walk_posts(node, out):
    """在任意結構的 JSON 裡找出「有文字 + 有時間」的貼文。"""
    if isinstance(node, dict):
        text = next((node[k] for k in TEXT_KEYS if isinstance(node.get(k), str) and node[k].strip()), None)
        ts = next((node[k] for k in TIME_KEYS if isinstance(node.get(k), (int, float))), None)
        if ts is None:
            # 有些格式把時間放在第一個 media 裡
            for m in node.get("media") or []:
                if isinstance(m, dict) and isinstance(m.get("creation_timestamp"), (int, float)):
                    ts = m["creation_timestamp"]
                    text = text or m.get("title")
                    break
        if text and ts:
            out.append({"text": fix_mojibake(text).strip(), "ts": ts})
            return
        for v in node.values():
            walk_posts(v, out)
    elif isinstance(node, list):
        for v in node:
            walk_posts(v, out)


def read_export(path):
    """讀取 zip 或資料夾中所有跟 Threads 有關的 JSON。"""
    blobs = []
    if path.suffix.lower() == ".zip":
        with zipfile.ZipFile(path) as z:
            for name in z.namelist():
                if name.endswith(".json") and "thread" in name.lower():
                    blobs.append(z.read(name).decode("utf-8", "replace"))
    else:
        for f in path.rglob("*.json"):
            if "thread" in str(f).lower():
                blobs.append(f.read_text(encoding="utf-8", errors="replace"))
    posts = []
    for b in blobs:
        try:
            walk_posts(json.loads(b), posts)
        except json.JSONDecodeError:
            continue
    for p in posts:
        p["date"] = datetime.fromtimestamp(p.pop("ts"), tz=timezone.utc).astimezone().strftime("%Y-%m-%d")
    return posts


def read_txt(path):
    posts = []
    for chunk in re.split(r"^\s*-{3,}\s*$", path.read_text(encoding="utf-8"), flags=re.M):
        lines = chunk.strip().splitlines()
        if not lines:
            continue
        date = ""
        if re.fullmatch(r"\d{4}[-/.]\d{1,2}[-/.]\d{1,2}", lines[0].strip()):
            y, m, d = re.split(r"[-/.]", lines.pop(0).strip())
            date = f"{y}-{int(m):02d}-{int(d):02d}"
        text = "\n".join(lines).strip()
        if text:
            posts.append({"text": text, "date": date})
    return posts


def classify(text, cats):
    tags = []
    lower = text.lower()
    # 1. 文中有 #分類名稱 就直接採用
    for c in cats:
        if f"#{c['name']}" in text or f"#{c['id']}" in lower:
            tags.append(c["id"])
    if tags:
        return tags
    # 2. 依關鍵字出現次數打分，取前兩名
    scores = []
    for c in cats:
        score = sum(lower.count(k.lower()) for k in c["keywords"])
        if score:
            scores.append((score, c["id"]))
    scores.sort(reverse=True)
    return [cid for _, cid in scores[:2]]


def load_existing():
    if not ARTICLES_JS.exists():
        return []
    src = ARTICLES_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.ARTICLES\s*=\s*(\[.*\]);?\s*$", src, re.S)
    if not m:
        return []
    try:
        return [a for a in json.loads(m.group(1)) if not a.get("sample")]
    except json.JSONDecodeError:
        print("提醒：原本的 articles.js 不是純 JSON 格式，--merge 會略過舊文章。")
        return []


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input", type=Path)
    ap.add_argument("--min-length", type=int, default=20)
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--out", type=Path, default=ARTICLES_JS)
    args = ap.parse_args()

    if not args.input.exists():
        sys.exit(f"找不到 {args.input}")
    cats = load_categories()
    posts = read_txt(args.input) if args.input.suffix.lower() == ".txt" else read_export(args.input)

    existing = load_existing() if args.merge else []
    seen = {a["text"] for a in existing}
    articles = list(existing)
    skipped = 0
    for p in posts:
        if len(p["text"]) < args.min_length or p["text"] in seen:
            skipped += 1
            continue
        seen.add(p["text"])
        articles.append({
            "id": hashlib.md5(p["text"].encode("utf-8")).hexdigest()[:10],
            "date": p["date"],
            "text": p["text"],
            "tags": classify(p["text"], cats),
        })
    articles.sort(key=lambda a: a.get("date", ""), reverse=True)

    header = "// 由 tools/import_threads.py 產生，可以直接手動修改 tags 或 title。\n"
    args.out.write_text(header + "window.ARTICLES = " + json.dumps(articles, ensure_ascii=False, indent=2) + ";\n",
                        encoding="utf-8")

    untagged = [a for a in articles if not a["tags"]]
    print(f"完成！共 {len(articles)} 篇文章寫入 {args.out}（略過 {skipped} 則太短或重複的貼文）")
    names = {c["id"]: c["name"] for c in cats}
    for cid, name in names.items():
        print(f"  {name}：{sum(cid in a['tags'] for a in articles)} 篇")
    if untagged:
        print(f"  未分類：{len(untagged)} 篇（只會出現在「全部文章」，可以手動補 tags 或在 site.js 加關鍵字）")


if __name__ == "__main__":
    main()
