// 網站基本設定：改這個檔案就能更新文字與社群連結。
// 連結留空字串 "" 的平台不會顯示在網站上。
window.SITE = {
  brand: "鳳梨老師的數學小教室",
  teacherName: "鳳梨老師",

  // 首頁大標，每個字串一行（最後一行會加上底線強調）
  headline: ["用創意和聯想，", "帶孩子愛上", "邏輯思考。"],
  tagline: "給安親班老師和家長的動腦活動、解題方法與帶班心法，全部來自真實的教學現場。",
  greeting: "今天也來動動腦吧！",

  // 自我介紹（每個字串是一段）
  about: [
    "嗨，我是鳳梨老師！從小在家裡的安親班幫忙長大，現在是安親班、國中數學班、奧數和桌遊老師。",
    "我是一個嚴格的老師：字要寫好、算式要完整。但孩子們都願意接受我，也很樂意學。因為我相信，快樂學習不是不學習，而是在適當且快樂的環境下，好好學習。",
    "我最喜歡設計各種動腦活動：幾A幾B、成語四則運算、創意寫手、新聞閱讀測驗……讓孩子在玩的過程裡練習聯想和推理。這些活動和帶班心得都整理在這裡，送給每一位安親班老師和家長。"
  ],
  avatar: "", // 例如 "assets/me.jpg"

  facts: [
    { label: "教學現場", value: "安親班・國中數學・奧數・桌遊" },
    { label: "最愛設計", value: "動腦挑戰與創意活動" },
    { label: "我的信念", value: "教孩子「願意對自己負責任」" }
  ],

  // 「三把鑰匙」：創意、聯想、邏輯，tag 對應下面 categories 的 id
  pillars: [
    { key: "創意", title: "讓孩子用自己的方式表達", text: "創意寫手、棉花糖人臉大賽、鳳梨村夏日盛典……把寫作、畫畫和理財都變成好玩的任務。", tag: "activities" },
    { key: "聯想", title: "從一個字串起一整片", text: "注音聯想、成語接龍、重組句子、幾A幾B，用遊戲練習觀察和聯想。", tag: "puzzles" },
    { key: "邏輯", title: "把解題拆成看得懂的步驟", text: "方程式、相似形、段考好題，一步一步把思路寫清楚，孩子才真的學得會。", tag: "teaching" }
  ],

  // 首頁看板：輪流展示的人氣貼文。id 對應 data/articles.js 裡的文章 id，
  // badge 是看板上的小標籤，title 可以替看板另取標題（留空就用文章第一行）。
  featured: [
    { id: "a37f89ac4d", badge: "熱烈討論", title: "「雕字」是必要的嗎？我的寫字要求" },
    { id: "8bd9beb67d", badge: "近 200 人索取", title: "學生常嫌的活動單，竟然爆單了" },
    { id: "51966edaf9", badge: "動腦挑戰", title: "除夕推理大挑戰：到底是誰煮了高麗菜？" },
    { id: "b5cd4c91dd", badge: "暑假企劃", title: "鳳梨村之夏日盛典：貫穿整個暑假的小任務" },
    { id: "0dec72cd83", badge: "免費資源", title: "每天三篇新聞閱讀測驗，帶孩子認識真實世界" },
    { id: "9d28f3d35a", badge: "帶班心法", title: "安親班裡的特殊生，我這樣陪伴" },
    { id: "83c632349c", badge: "暖心故事", title: "「鳳梨，謝謝你今天陪我走回家」" },
    { id: "c3f11ff8f7", badge: "給家長", title: "想救孩子的數學？先找到卡住的根源" },
    { id: "3a5ae207a6", badge: "帶班小技巧", title: "一打多的安親班老師，最佳幫手是碼錶" }
  ],

  links: [
    { id: "threads",   label: "Threads",   handle: "@a_l_w_a_y_s_joy", note: "教學筆記每週更新", url: "https://www.threads.com/@a_l_w_a_y_s_joy" },
    { id: "instagram", label: "Instagram", handle: "@a_l_w_a_y_s_joy", note: "教室日常與圖文",   url: "https://www.instagram.com/a_l_w_a_y_s_joy/" },
    { id: "youtube",   label: "YouTube",   handle: "國中數學解題影片", note: "段考檢討與觀念講解", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g" },
    { id: "line",      label: "LINE 社群", handle: "鳳梨國中數學討論群", note: "國中生數學解題討論", url: "https://line.me/ti/g2/4U2D296ojeHdqg2w-cSXXtIlYnEkdwMPVreRdA" },
    { id: "facebook",  label: "Facebook",  handle: "", note: "", url: "" },
    { id: "email",     label: "Email",     handle: "", note: "合作與邀約", url: "" }
  ],

  // 主題分類。color 是分類的代表色（yellow / coral / leaf / sky / berry）。
  // keywords 給匯入工具自動貼標籤用（tools/import_threads.py 會讀同樣的清單）。
  categories: [
    { id: "teaching", name: "數學觀念與解題", color: "yellow", desc: "方程式、相似形、段考與會考好題",
      keywords: ["數學", "方程式", "解題", "題型", "分數", "小數", "乘法", "九九", "幾何", "函數", "相似", "考古題", "會考", "重點"] },
    { id: "puzzles", name: "邏輯動腦挑戰", color: "sky", desc: "幾A幾B、成語算式、推理與聯想",
      keywords: ["挑戰", "動動腦", "幾A幾B", "成語", "猜", "接龍", "推理", "解謎", "聯想"] },
    { id: "activities", name: "創意活動", color: "coral", desc: "寒暑假任務、節慶活動、創意寫手",
      keywords: ["活動", "寒假", "暑假", "聖誕", "兒童節", "交換禮物", "戶外教學", "創意寫手", "注音聯想"] },
    { id: "classroom", name: "帶班心法", color: "leaf", desc: "常規、特殊生、寫字與獎勵制度",
      keywords: ["帶班", "特殊生", "常規", "控班", "尊重", "雕字", "管教", "獎勵", "加分", "規矩"] },
    { id: "parents", name: "給家長的話", color: "berry", desc: "安親班、學習與親師溝通",
      keywords: ["家長", "爸媽", "媽媽", "爸爸", "聯絡簿", "家庭", "親師"] },
    { id: "resources", name: "免費資源", color: "yellow", desc: "學習單、簡報、考卷與筆記索取",
      keywords: ["索取", "簡報", "考卷", "講義", "閱讀測驗", "錯題本", "教材", "學習單", "筆記"] },
    { id: "stories", name: "教室小故事", color: "coral", desc: "看得見教學方式的真實片段",
      keywords: ["謝謝老師", "感動", "最後一堂課"] }
  ]
};
