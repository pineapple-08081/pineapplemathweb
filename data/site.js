// 網站基本設定：改這個檔案就能更新自我介紹與社群連結。
// 連結留空字串 "" 的平台不會顯示在網站上。
window.SITE = {
  brand: "鳳梨老師的數學小教室",
  tagline: "陪安親班老師把數學教得更輕鬆、更有趣",
  teacherName: "鳳梨老師",

  // 自我介紹（每個字串是一段）
  about: [
    "嗨，我是鳳梨老師！在安親班陪孩子寫作業、教數學，每天都在跟分數、應用題和「老師我不會」奮戰。",
    "我把教學現場的觀察、好用的講解方法、班級經營的小撇步記錄在 Threads 上，希望能幫到同樣在安親班努力的老師們。",
    "這個網站把我發過的文章依主題整理好，歡迎慢慢挖寶，也歡迎到各平台找我聊聊！"
  ],

  // 自我介紹旁的小標籤
  highlights: ["安親班數學老師", "國小數學", "教學分享", "班級經營"],

  links: [
    { id: "threads",   label: "Threads",   handle: "@a_l_w_a_y_s_joy", url: "https://www.threads.com/@a_l_w_a_y_s_joy" },
    { id: "instagram", label: "Instagram", handle: "@a_l_w_a_y_s_joy", url: "https://www.instagram.com/a_l_w_a_y_s_joy/" },
    { id: "youtube",   label: "YouTube",   handle: "", url: "" },
    { id: "facebook",  label: "Facebook",  handle: "", url: "" },
    { id: "email",     label: "Email",     handle: "", url: "" }
  ],

  // 主題分類。keywords 給匯入工具自動貼標籤用（tools/import_threads.py 會讀同樣的清單）。
  categories: [
    { id: "teaching", name: "數學教學技巧", emoji: "📐", desc: "觀念怎麼講、孩子才聽得懂",
      keywords: ["講解", "觀念", "教法", "怎麼教", "理解", "分數", "小數", "乘法", "除法", "九九乘法", "幾何", "面積", "單位"] },
    { id: "problems", name: "題型與解題", emoji: "🧩", desc: "應用題、易錯題、解題思路",
      keywords: ["應用題", "題目", "解題", "易錯", "錯題", "考卷", "考試", "列式", "算式", "題型"] },
    { id: "classroom", name: "班級經營", emoji: "🏫", desc: "秩序、獎勵制度、帶班節奏",
      keywords: ["班級", "秩序", "獎勵", "集點", "規矩", "帶班", "上課", "管教", "常規"] },
    { id: "parents", name: "親師溝通", emoji: "💬", desc: "跟家長說話的眉角",
      keywords: ["家長", "爸媽", "媽媽", "爸爸", "聯絡簿", "溝通", "親師"] },
    { id: "habits", name: "作業與學習習慣", emoji: "✏️", desc: "訂正、專注力、自主學習",
      keywords: ["作業", "訂正", "專注", "習慣", "粗心", "檢查", "寫字", "自主"] },
    { id: "resources", name: "教材與教具", emoji: "🎲", desc: "學習單、桌遊、好用工具",
      keywords: ["學習單", "教具", "桌遊", "遊戲", "講義", "工具", "教材", "app", "練習"] },
    { id: "life", name: "老師日常與心情", emoji: "🍍", desc: "安親班老師的喜怒哀樂",
      keywords: ["心情", "崩潰", "累", "感動", "日常", "下班", "薪水", "職涯", "老師的", "可愛"] }
  ]
};
