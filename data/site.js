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
    { id: "youtube",   label: "YouTube",   handle: "國中數學解題影片", note: "段考檢討與觀念講解", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g" },
    { id: "line",      label: "LINE 社群", handle: "鳳梨國中數學討論群", note: "國中生數學解題討論", url: "https://line.me/ti/g2/4U2D296ojeHdqg2w-cSXXtIlYnEkdwMPVreRdA" },
    { id: "facebook",  label: "Facebook",  handle: "", note: "", url: "" },
    { id: "email",     label: "Email",     handle: "", note: "合作與邀約", url: "" }
  ],

  // 主題分類。keywords 給匯入工具自動貼標籤用（tools/import_threads.py 會讀同樣的清單）。
  categories: [
    { id: "teaching", name: "數學教學與解題", desc: "觀念講解、段考題型、會考解析",
      keywords: ["數學", "方程式", "解題", "題型", "分數", "小數", "乘法", "九九", "幾何", "函數", "相似", "考古題", "會考", "重點"] },
    { id: "puzzles", name: "動腦挑戰", desc: "幾A幾B、成語算式、腦力激盪題",
      keywords: ["挑戰", "動動腦", "幾A幾B", "成語", "猜", "接龍", "推理", "解謎"] },
    { id: "classroom", name: "班級經營", desc: "帶班、常規、特殊生與寫字要求",
      keywords: ["帶班", "特殊生", "常規", "控班", "尊重", "雕字", "管教", "獎勵", "加分", "規矩"] },
    { id: "activities", name: "活動企劃", desc: "節慶活動、寒暑假任務、戶外教學",
      keywords: ["活動", "寒假", "暑假", "聖誕", "兒童節", "交換禮物", "戶外教學", "創意寫手", "注音聯想"] },
    { id: "students", name: "學生的故事", desc: "教室裡的感動、好笑與成長",
      keywords: ["學生", "孩子", "感動", "分享", "寫的", "畫"] },
    { id: "parents", name: "親師溝通", desc: "給家長的話與親師之間的眉角",
      keywords: ["家長", "爸媽", "媽媽", "爸爸", "聯絡簿", "家庭", "親師"] },
    { id: "resources", name: "教材與資源", desc: "簡報、考卷、新聞閱讀測驗索取",
      keywords: ["索取", "簡報", "考卷", "講義", "閱讀測驗", "錯題本", "教材", "教具", "桌遊"] },
    { id: "life", name: "安親老師日常", desc: "戰友們才懂的喜怒哀樂",
      keywords: ["安親班老師", "戰友", "下班", "撐", "累", "連假", "星期", "起床"] }
  ]
};
