# 🍍 鳳梨老師的數學小教室

安親班數學教學分享網站：依主題整理的 Threads 文章、自我介紹、社群連結，以及給孩子用的數學練習場。

## 檔案結構

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 品牌首頁（關於我、文章分類、社群連結） |
| `practice.html` | 數學練習場（原本的 index.html 搬到這裡） |
| `data/site.js` | 自我介紹、社群連結、文章分類與自動分類關鍵字 |
| `data/articles.js` | 文章資料（520 篇，從 Threads 匯出檔整理並人工分類） |
| `tools/import_threads.py` | 把 Threads 匯出檔轉成 `data/articles.js` 並自動分類 |

## 匯入 Threads 文章

### 方法一：用 Threads 官方匯出（推薦，一次匯入全部）

1. 打開 Threads App →「設定」→「帳號」→「下載你的資訊」（會進到 Meta 帳號管理中心）。
2. 選擇 Threads 帳號，格式選 **JSON**，時間範圍選「所有時間」，送出請求。
3. 收到通知後下載 `.zip` 檔。
4. 之後有新文章時，在這個資料夾執行（`.zip` 或裡面的 `threads_and_replies.json` 都可以）：

   ```bash
   python3 tools/import_threads.py ~/Downloads/threads_and_replies.json --merge
   ```

   `--merge` 會保留現有文章和手動調整過的分類，只加入比目前最新一篇更新的貼文，並用關鍵字自動分類。
   回覆別人的留言不會匯入；自己在主文底下 30 分鐘內接續的串文會併回主文。

> ⚠️ 不要把匯出檔本身放進這個專案：它包含帳號資料與所有留言，專案是公開的。

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

- `headline`、`tagline`：首頁大標與副標
- `about`、`facts`：自我介紹段落與旁邊的小資料
- `pillars`：「在這裡你會找到」的三個主題入口（`tag` 對應分類）
- `links`：把 YouTube、Facebook、Email 的 `url` 填上就會出現在網站上（留空不顯示）
- `avatar`：想放大頭照的話，把照片放到 `assets/` 並填上 `"assets/me.jpg"`

## 網站區塊

| 區塊 | 用意 |
| --- | --- |
| 首頁主視覺 | 品牌宣言＋手繪鳳梨線條動畫 |
| 01 品牌理念 | 鳳梨鱗片裡的費氏數列，帶出「數學藏在生活裡」 |
| 02 關於我 | 寫給安親班老師的一封信 |
| 03 在這裡你會找到 | 三個主題入口，點了直接篩選文章 |
| 04 教學筆記 | 目錄式文章列表：主題分頁、搜尋、側邊閱讀欄（可上下篇） |
| 05 今日一題 | 可以直接作答的小題目，導向數學練習場 |
| 06 找到我 | 社群平台連結 |

## 上線

到 GitHub repo 的 **Settings → Pages**，Source 選 `main` 分支根目錄，網站就會出現在
`https://<你的帳號>.github.io/pineapplemathweb/`。
每篇文章與分類都有自己的分享連結（例如 `#tag=parents`），方便傳給其他老師。
