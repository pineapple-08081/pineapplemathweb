# 🍍 鳳梨老師的數學小教室

安親班數學教學分享網站：依主題整理的 Threads 文章、自我介紹、社群連結，以及給孩子用的數學練習場。

## 檔案結構

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 品牌首頁（看板、教學特色、里程碑、相簿、教學筆記、社群連結） |
| `competitions.html` | 帶學生征戰比賽：得獎紀錄、培訓方式、培訓日記、比賽相簿 |
| `practice.html` | 數學練習場（原本的 index.html 搬到這裡） |
| `data/site.js` | 自我介紹、社群連結、文章分類與自動分類關鍵字 |
| `data/articles.js` | 文章資料（237 篇精選，從 Threads 匯出檔人工挑選並分類） |
| `assets/site.css`、`assets/common.js` | 全站共用的樣式與互動（導覽列、深淺色、進場動畫、照片牆） |
| `assets/featured/` | 鳳梨看板的配圖（AI 生成插圖，Z-Image Turbo） |
| `assets/illustrations/` | 鳳梨看板的備用向量插畫 |
| `assets/photos/` | 放照片的資料夾 |
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
- `aboutTitle`、`about`、`facts`：「關於我」的標題、自我介紹段落與旁邊的小資料
- `pillars`：「三把鑰匙」的文字（`tag` 對應分類）
- `greeting`：吉祥物對話框的文字
- `links`：把 YouTube、Facebook、Email 的 `url` 填上就會出現在網站上（留空不顯示）
- `avatar`：想放大頭照的話，把照片放到 `assets/` 並填上 `"assets/me.jpg"`

## 放照片

1. 把照片放進 `assets/photos/`（建議先縮小到寬 1600px 以內，檔名用英文或數字）。
2. 在 `data/site.js` 加上照片：
   - 首頁相簿：`photos: [ { src: "assets/photos/class-1.jpg", caption: "上課的白板" } ]`
   - 比賽相簿：`contest.albums`，依年份分組，每組有 `year`、`title`、`results` 和 `photos`
3. 可以加 `size` 指定大小：`"big"`、`"half"`（半版）、`"tall"`、`"wide"`、`"small"`、`"strip"`（滿版長條）；不寫的話會自動排出有大有小、有不同角度的拼貼。
4. 截圖這類細長的圖片加上 `fit: "contain"`，就會完整顯示不被裁切。

> 照片裡如果有學生的真實姓名（例如獎狀、聊天截圖），上架前請先霧化。

還沒有照片時，網站會先顯示空白相框。

## 帶學生征戰比賽

`data/site.js` 的 `contest` 裡：

- `records`：每一筆比賽成績，`medals` 寫 `{ silver: 1, bronze: 1 }`，還在準備的比賽寫 `training: true`
- `methods`：培訓方式
- `diary`：培訓日記，填 `data/articles.js` 裡的文章 id

## 里程碑

`data/site.js` 的 `milestones`，每一筆有 `date`、`title`、`text` 和 `icon`（heart、home、laptop、medal、star、school、video、rocket）。

## 鳳梨看板（首頁輪播）

`data/site.js` 的 `featured` 決定看板要輪播哪些文章，每則停留 5 秒後往右滑到下一則，每次打開網頁順序都會隨機打亂。

- `id`：文章 id（在 `data/articles.js` 找到該篇的 `"id"`）
- `badge`：看板上的小標籤，例如「熱烈討論」
- `title`：看板標題，留空就用文章第一行
- `image`：看板配圖，目前用的是 `assets/featured/` 裡的 AI 生成插圖（4:3 比例最合適），也可以換成照片

Threads 匯出檔沒有按讚數和瀏覽數，目前的看板是依照貼文中提到的熱度（例如「快200個人來詢問」）挑選的，可以換成你知道的高流量貼文。

## 網站區塊

| 區塊 | 用意 |
| --- | --- |
| 首頁主視覺 | 品牌標語＋會眨眼揮手的鳳梨吉祥物 |
| 鳳梨看板 | 人氣貼文輪播，像遊戲活動看板 |
| 三把鑰匙 | 創意、聯想、邏輯三個教學特色，點了直接篩選文章 |
| 關於我 | 自我介紹與教學信念 |
| 里程碑 | 小路時間軸，捲動時鳳梨會沿著小路往下走 |
| 教室相簿 | 拍立得拼貼照片牆，點開可放大瀏覽 |
| 教學筆記 | 8 個主題分頁、搜尋、側邊閱讀欄（可上下篇） |
| 今日一題 | 可以直接作答的小題目，答對鳳梨會跳起來，導向數學練習場 |
| 找到我 | Threads、Instagram、YouTube、LINE 社群 |

## 上線

到 GitHub repo 的 **Settings → Pages**，Source 選 `main` 分支根目錄，網站就會出現在
`https://<你的帳號>.github.io/pineapplemathweb/`。
每篇文章與分類都有自己的分享連結（例如 `#tag=parents`），方便傳給其他老師。
