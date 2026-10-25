// 文章資料。可以手動編輯，也可以用 tools/import_threads.py 從 Threads 匯出檔自動產生。
// 欄位：
//   id        唯一代號
//   date      發文日期 YYYY-MM-DD
//   title     標題（可省略，會自動取內文第一行）
//   text      內文
//   tags      分類 id 陣列，對應 data/site.js 的 categories
//   url       Threads 原文連結（可省略）
//   sample    true 代表是範例文章，匯入真實文章後請刪除
window.ARTICLES = [
  {
    id: "sample-1",
    date: "2026-10-01",
    title: "【範例】分數的大小比較，先畫圖再算",
    text: "這是一篇範例文章，用來示範網站的版面。\n\n匯入你在 Threads 的真實文章後，這裡就會換成你的內容。\n\n小提醒：講分數時先讓孩子畫出同樣大小的長條，再切成幾等分，比直接通分更容易理解。",
    tags: ["teaching"],
    sample: true
  },
  {
    id: "sample-2",
    date: "2026-09-20",
    title: "【範例】應用題卡關？先圈出「問什麼」",
    text: "這是一篇範例文章。\n\n很多孩子應用題不會，不是不會算，是沒讀懂題目。可以先請孩子用螢光筆圈出題目最後在問什麼，再回頭找需要的數字。",
    tags: ["problems", "habits"],
    sample: true
  },
  {
    id: "sample-3",
    date: "2026-09-05",
    title: "【範例】跟家長說孩子粗心，可以換個說法",
    text: "這是一篇範例文章。\n\n與其說「他很粗心」，不如具體說「他在進位時常忘記加上去，我們這週在練習寫完後逐位檢查」，家長會更安心也更願意配合。",
    tags: ["parents", "habits"],
    sample: true
  }
];
