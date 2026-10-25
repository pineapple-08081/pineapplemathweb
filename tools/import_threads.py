#!/usr/bin/env python3
"""把 Threads 文章匯入網站，並依關鍵字自動分類。

用法：
  python3 tools/import_threads.py <輸入>

<輸入> 可以是：
  1. Meta「下載你的資訊」匯出的 Threads 資料：threads_and_replies.json，
     或整包 .zip / 解壓縮後的資料夾（選 JSON 格式）
  2. 一個 .txt 檔：每篇文章用一行 "---" 分隔，第一行可以寫日期（YYYY-MM-DD），
     也可以在文中寫 #分類名稱 指定分類，例如 #親師溝通

Threads 匯出檔的處理方式：
  - 回覆別人的留言不會匯入
  - 自己在主文底下 30 分鐘內接續的串文，會併回主文
  - 內容完全相同的貼文只保留一篇

選項：
  --min-length N   少於 N 個字的貼文略過（預設 15）
  --merge          保留 data/articles.js 原本的文章（範例文章除外），
                   只加入比現有最新文章更新的貼文，原本手動調整的分類不會被蓋掉
  --out PATH       輸出位置（預設 data/articles.js）
  --username NAME  Threads 帳號（預設從 data/site.js 的 Threads 連結讀取）

分類規則寫在 data/site.js 的 categories.keywords，改那裡就能調整自動分類。
"""

import argparse
import hashlib
import json
import re
import sys
import zipfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_JS = ROOT / "data" / "site.js"
ARTICLES_JS = ROOT / "data" / "articles.js"

TEXT_KEYS = ("title", "text", "caption")
TIME_KEYS = ("creation_timestamp", "timestamp", "taken_at")
THREAD_GAP = 30 * 60  # 串文續篇與上一段的最大間隔（秒）


def load_site():
    src = SITE_JS.read_text(encoding="utf-8")
    cats = []
    for block in re.finditer(r"\{\s*id:\s*\"([^\"]+)\",\s*name:\s*\"([^\"]+)\".*?keywords:\s*\[([^\]]*)\]", src, re.S):
        cid, name, kw = block.groups()
        cats.append({"id": cid, "name": name, "keywords": re.findall(r"\"([^\"]+)\"", kw)})
    if not cats:
        sys.exit("讀不到 data/site.js 裡的 categories，請確認格式。")
    m = re.search(r"threads\.(?:com|net)/@([\w.]+)", src)
    return cats, (m.group(1) if m else "")


def fix_mojibake(s):
    """Meta 的匯出檔常把 UTF-8 中文存成 latin-1 跳脫字元，這裡轉回來。"""
    try:
        return s.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


def clean(s):
    """去掉匯出檔裡代替 emoji 的「▓」與物件符號，並把只有一個 - 的分隔行變成空行。"""
    s = s.replace("▓", "").replace("￼", "")
    lines = ["" if ln.strip() in ("-", "—", "－") else ln.rstrip() for ln in s.splitlines()]
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def make_id(text):
    return hashlib.md5(text.strip().encode("utf-8")).hexdigest()[:10]


def to_date(ts):
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d")


def parse_threads_export(data, username):
    """解析 threads_and_replies.json（text_post_app_text_posts）。"""
    items = []
    for p in data.get("text_post_app_text_posts", []):
        media = p.get("media") or [{}]
        first = media[0]
        info = first.get("text_app_post") or {}
        items.append({
            "ts": p.get("creation_timestamp") or first.get("creation_timestamp") or 0,
            "text": fix_mojibake(p.get("title") or first.get("title") or ""),
            "reply": bool(info.get("is_reply")),
            "to": info.get("in_reply_to_username"),
            "images": sum(1 for m in media if m.get("uri")),
        })
    items.sort(key=lambda r: r["ts"])

    posts, cur, last = [], None, 0
    for r in items:
        if not r["reply"]:
            cur = {"ts": r["ts"], "parts": [r["text"]], "images": r["images"]}
            posts.append(cur)
            last = r["ts"]
        elif cur and username and r["to"] == username and r["ts"] - last < THREAD_GAP and r["text"].strip():
            cur["parts"].append(r["text"])
            cur["images"] += r["images"]
            last = r["ts"]
    out = []
    for p in posts:
        head = p["parts"][0].strip()
        out.append({
            "id": make_id(head),
            "head": head,
            "text": clean("\n\n".join(x.strip() for x in p["parts"] if x.strip())),
            "date": to_date(p["ts"]),
            "images": p["images"],
        })
    return out


def walk_posts(node, out):
    """其他格式：在任意結構的 JSON 裡找出「有文字 + 有時間」的貼文。"""
    if isinstance(node, dict):
        text = next((node[k] for k in TEXT_KEYS if isinstance(node.get(k), str) and node[k].strip()), None)
        ts = next((node[k] for k in TIME_KEYS if isinstance(node.get(k), (int, float))), None)
        if text and ts:
            t = fix_mojibake(text).strip()
            out.append({"id": make_id(t), "head": t, "text": clean(t), "date": to_date(ts), "images": 0})
            return
        for v in node.values():
            walk_posts(v, out)
    elif isinstance(node, list):
        for v in node:
            walk_posts(v, out)


def parse_json(raw, username):
    data = json.loads(raw)
    if isinstance(data, dict) and "text_post_app_text_posts" in data:
        return parse_threads_export(data, username)
    out = []
    walk_posts(data, out)
    return out


def read_export(path, username):
    blobs = []
    if path.suffix.lower() == ".json":
        blobs.append(path.read_text(encoding="utf-8", errors="replace"))
    elif path.suffix.lower() == ".zip":
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
            posts.extend(parse_json(b, username))
        except json.JSONDecodeError:
            continue
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
            posts.append({"id": make_id(text), "head": text, "text": clean(text), "date": date, "images": 0})
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


def write_articles(articles, out):
    articles.sort(key=lambda a: a.get("date", ""), reverse=True)
    header = "// 由 tools/import_threads.py 產生，可以直接手動修改 tags 或 title。\n"
    out.write_text(header + "window.ARTICLES = " + json.dumps(articles, ensure_ascii=False, indent=1) + ";\n",
                   encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input", type=Path)
    ap.add_argument("--min-length", type=int, default=15)
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--out", type=Path, default=ARTICLES_JS)
    ap.add_argument("--username")
    args = ap.parse_args()

    if not args.input.exists():
        sys.exit(f"找不到 {args.input}")
    cats, site_user = load_site()
    username = args.username or site_user
    posts = read_txt(args.input) if args.input.suffix.lower() == ".txt" else read_export(args.input, username)

    existing = load_existing() if args.merge else []
    latest = max((a.get("date", "") for a in existing), default="")
    seen = {a["id"] for a in existing} | {a["text"] for a in existing}
    articles = list(existing)
    skipped = 0
    for p in posts:
        if len(p["head"]) < args.min_length or p["id"] in seen or p["text"] in seen or (latest and p["date"] <= latest):
            skipped += 1
            continue
        seen.update((p["id"], p["text"]))
        a = {"id": p["id"], "date": p["date"], "text": p["text"], "tags": classify(p["text"], cats)}
        if p["images"]:
            a["images"] = p["images"]
        articles.append(a)
    write_articles(articles, args.out)

    untagged = [a for a in articles if not a["tags"]]
    print(f"完成！共 {len(articles)} 篇文章寫入 {args.out}（略過 {skipped} 則太短、重複或已匯入的貼文）")
    for c in cats:
        print(f"  {c['name']}：{sum(c['id'] in a['tags'] for a in articles)} 篇")
    if untagged:
        print(f"  未分類：{len(untagged)} 篇（只會出現在「全部」，可以手動補 tags 或在 site.js 加關鍵字）")


if __name__ == "__main__":
    main()
