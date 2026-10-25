# 🍍 鳳梨老師的數學小教室

安親班數學教學分享網站：依主題整理的 Threads 文章、自我介紹、社群連結，以及給孩子用的數學練習場。

## 檔案結構

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 品牌首頁（關於我、文章分類、社群連結） |
| `practice.html` | 數學練習場（原本的 index.html 搬到這裡） |
| `data/site.js` | 自我介紹、社群連結、文章分類與自動分類關鍵字 |
| `data/articles.js` | 文章資料（目前是 3 篇範例） |
| `tools/import_threads.py` | 把 Threads 匯出檔轉成 `data/articles.js` 並自動分類 |

## 匯入 Threads 文章

### 方法一：用 Threads 官方匯出（推薦，一次匯入全部）

1. 打開 Threads App →「設定」→「帳號」→「下載你的資訊」（會進到 Meta 帳號管理中心）。
2. 選擇 Threads 帳號，格式選 **JSON**，時間範圍選「所有時間」，送出請求。
3. 收到通知後下載 `.zip` 檔。
4. 在這個資料夾執行：

   ```bash
   python3 tools/import_threads.py ~/Downloads/你的匯出檔.zip
   ```

   完成後會顯示每個分類各有幾篇，範例文章會被取代。

### 方法二：手動貼文章

建立一個 `posts.txt`，每篇用 `---` 分隔，第一行可以寫日期，也可以用 `#分類名稱` 指定分類：

```
2026-03-05
應用題卡關？先請孩子圈出題目在問什麼…… #題型與解題
---
2026-03-10
今天跟家長聊到……
```

```bash
python3 tools/import_threads.py posts.txt
```

加上 `--merge` 可以保留已經匯入的文章，只加入新的。

### 調整分類

- 單篇：直接改 `data/articles.js` 裡該篇的 `tags`（也可以加上 `"title"` 和 Threads 原文網址 `"url"`）。
- 整體規則：改 `data/site.js` 裡 `categories` 的 `keywords`，再重新執行匯入。

## 更新自我介紹與社群連結

編輯 `data/site.js`：

- `about`：自我介紹段落
- `links`：把 YouTube、Facebook、Email 的 `url` 填上就會出現在網站上（留空不顯示）
- `avatar`：想放大頭照的話，把照片放到 `assets/` 並加上 `avatar: "assets/me.jpg"`

## 上線

到 GitHub repo 的 **Settings → Pages**，Source 選 `main` 分支根目錄，網站就會出現在
`https://<你的帳號>.github.io/pineapplemathweb/`。
每篇文章與分類都有自己的分享連結（例如 `#tag=parents`），方便傳給其他老師。
