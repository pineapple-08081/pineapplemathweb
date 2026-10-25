// 網站基本設定：改這個檔案就能更新文字與社群連結。
// 連結留空字串 "" 的平台不會顯示在網站上。
window.SITE = {
  brand: "鳳梨老師的數學小教室",
  teacherName: "鳳梨老師",

  // 首頁大標，每個字串一行
  headline: ["把數學，", "講成孩子", "聽得懂的話。"],
  tagline: "寫給安親班老師的國小數學教學筆記——講解方法、題型拆解、班級經營與親師溝通，都是從教學現場長出來的經驗。",

  // 自我介紹（每個字串是一段）
  about: [
    "嗨，我是鳳梨老師。每天下午，我在安親班陪孩子寫作業、教數學，跟分數、應用題，還有那句「老師我不會」相處。",
    "教久了發現，孩子卡住的地方往往不是不夠努力，而是還沒遇到適合他的講法。所以我開始把現場試過有用的方法記下來，放在 Threads 上分享。",
    "如果你也是安親班老師，希望這些筆記能讓你少走一點彎路，多一點和孩子一起「啊，原來是這樣！」的時刻。"
  ],
  avatar: "", // 例如 "assets/me.jpg"

  // 關於我旁邊的小資料
  facts: [
    { label: "教學現場", value: "安親班・國小數學" },
    { label: "最常分享", value: "觀念講解、應用題、帶班" },
    { label: "相信的事", value: "沒有學不會的孩子，只有還沒找到的講法" }
  ],

  // 「在這裡你會找到」三個入口，tag 對應下面 categories 的 id
  pillars: [
    { title: "講得通的教法", text: "分數、小數、乘除與應用題，用畫圖、具體物和生活例子，把抽象的觀念拆成孩子跨得過去的小步。", tag: "teaching" },
    { title: "帶得動的班級", text: "一個老師面對不同年級、不同進度的孩子，靠的是清楚的規則和節奏。這裡整理我在帶班上的做法。", tag: "classroom" },
    { title: "說得清的溝通", text: "家長在意什麼、聯絡簿怎麼寫、孩子的狀況怎麼說，讓親師站在同一邊。", tag: "parents" }
  ],

  links: [
    { id: "threads",   label: "Threads",   handle: "@a_l_w_a_y_s_joy", note: "教學筆記每週更新", url: "https://www.threads.com/@a_l_w_a_y_s_joy" },
    { id: "instagram", label: "Instagram", handle: "@a_l_w_a_y_s_joy", note: "教室日常與圖文",   url: "https://www.instagram.com/a_l_w_a_y_s_joy/" },
    { id: "youtube",   label: "YouTube",   handle: "", note: "", url: "" },
    { id: "facebook",  label: "Facebook",  handle: "", note: "", url: "" },
    { id: "email",     label: "Email",     handle: "", note: "合作與邀約", url: "" }
  ],

  // 主題分類。keywords 給匯入工具自動貼標籤用（tools/import_threads.py 會讀同樣的清單）。
  categories: [
    { id: "teaching", name: "數學教學技巧", desc: "觀念怎麼講，孩子才聽得懂",
      keywords: ["講解", "觀念", "教法", "怎麼教", "理解", "分數", "小數", "乘法", "除法", "九九乘法", "幾何", "面積", "單位"] },
    { id: "problems", name: "題型與解題", desc: "應用題、易錯題、解題思路",
      keywords: ["應用題", "題目", "解題", "易錯", "錯題", "考卷", "考試", "列式", "算式", "題型"] },
    { id: "classroom", name: "班級經營", desc: "秩序、獎勵制度、帶班節奏",
      keywords: ["班級", "秩序", "獎勵", "集點", "規矩", "帶班", "上課", "管教", "常規"] },
    { id: "parents", name: "親師溝通", desc: "跟家長說話的眉角",
      keywords: ["家長", "爸媽", "媽媽", "爸爸", "聯絡簿", "溝通", "親師"] },
    { id: "habits", name: "作業與學習習慣", desc: "訂正、專注力、自主學習",
      keywords: ["作業", "訂正", "專注", "習慣", "粗心", "檢查", "寫字", "自主"] },
    { id: "resources", name: "教材與教具", desc: "學習單、桌遊、好用工具",
      keywords: ["學習單", "教具", "桌遊", "遊戲", "講義", "工具", "教材", "app", "練習"] },
    { id: "life", name: "老師日常", desc: "安親班老師的喜怒哀樂",
      keywords: ["心情", "崩潰", "累", "感動", "日常", "下班", "薪水", "職涯", "老師的", "可愛"] }
  ]
};
