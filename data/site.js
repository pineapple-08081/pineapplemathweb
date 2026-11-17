// 網站基本設定：改這個檔案就能更新文字與社群連結。
// 連結留空字串 "" 的平台不會顯示在網站上。
window.SITE = {
  brand: "鳳梨老師的數學小教室",
  teacherName: "鳳梨老師",

  // 首頁大標，每個字串一行（最後一行會加上底線強調）
  headline: ["用創意和聯想，", "帶孩子愛上", "邏輯思考。"],
  tagline: "給安親班老師和家長的動腦活動、解題方法與帶班心法，全部來自真實的教學現場。",
  greeting: "今天也來動動腦吧！",

  // 自我介紹：aboutTitle 是標題（每個字串一行，最後一行會加上黃色底線），about 每個字串是一段
  aboutTitle: ["成績不是絕對，", "過程大於結果"],
  about: [
    "大家好，我是鳳梨老師，是一位安親班老師、補習班老師、奧數老師，對我來說，成績不是一切，態度、品行才是更重要的。",
    "在這裡，有許多我在 Threads 上的分享文，裡面有一些資源、心得、心法，希望可以幫助到其他人，又或是當作一個紀錄自己足跡的地方，也歡迎大家一起互相交流，在教育這條路上，多點教育理念相同的夥伴，也是很不錯的。"
  ],
  avatar: "", // 例如 "assets/me.jpg"

  facts: [
    { label: "教學現場", value: "安親班・補習班・奧數" },
    { label: "最愛設計", value: "動腦挑戰與創意活動" },
    { label: "我的信念", value: "教孩子「願意對自己負責任」" }
  ],

  // 「三把鑰匙」：創意、聯想、邏輯，tag 對應下面 categories 的 id
  pillars: [
    { key: "創意", title: "讓孩子用自己的方式表達", text: "創意寫手、棉花糖人臉大賽、鳳梨村夏日盛典……把寫作、畫畫和理財都變成好玩的任務。", tag: "activities" },
    { key: "聯想", title: "從一個字串起一整片", text: "注音聯想、成語接龍、重組句子、幾A幾B，用遊戲練習觀察和聯想。", tag: "puzzles" },
    { key: "邏輯", title: "把解題拆成看得懂的步驟", text: "方程式、相似形、段考好題，一步一步把思路寫清楚，孩子才真的學得會。", tag: "teaching" }
  ],

  // 首頁看板：輪流展示的重點貼文。id 對應 data/articles.js 裡的文章 id，
  // image 是看板配圖，badge 是看板上的小標籤，title 可以替看板另取標題（留空就用文章第一行）。
  // 也可以放網站裡的其他頁面或外部網站：不寫 id，改寫 href、text、cta（按鈕文字）和 color。
  featured: [
    { href: "junior.html#daily", image: "assets/featured/daily-three.webp", badge: "每天更新", meta: "國中數學專區", color: "sky",
      title: "國中數學每日三題：每天學一點，會考不慌",
      text: "國一、國二、國三每天各一題，跟著學校進度走，附上本日觀念和一分鐘解題影片。日積月累，讓基本概念越來越紮實。",
      cta: "看每日三題" },
    { id: "3429cba600", image: "assets/featured/teacher-turn.webp", badge: "新上線", title: "「換我當老師」網路版：換孩子拿紅筆改考卷" },
    { href: "junior.html#notes", image: "assets/featured/math-notes.webp", badge: "重點筆記", meta: "國中數學專區", color: "leaf",
      title: "國一到國三數學重點筆記，一次整理好",
      text: "倍數與分數、根式與畢氏定理、簡易測量與圓，每個單元都有重點筆記，搭配一分鐘短影片複習觀念。",
      cta: "看重點筆記" },
    { id: "d1d413e0d5", image: "assets/featured/24-points.webp", badge: "數感遊戲", title: "下課前 5 分鐘玩「24 點」，練出數感" },
    { id: "d2c0cffaf9", image: "assets/featured/team-training.webp", badge: "競賽培訓", title: "奧林匹克團體賽：賽前實體訓練開跑" },
    { id: "0b1995d2c7", image: "assets/featured/halloween.webp", badge: "節慶活動", title: "每年萬聖節，我都變裝去接孩子放學" },
    { id: "8bd9beb67d", image: "assets/featured/worksheets.webp", badge: "近 200 人索取", title: "學生常嫌的活動單，竟然爆單了" },
    { id: "51966edaf9", image: "assets/featured/puzzle-dishes.webp", badge: "動腦挑戰", title: "除夕推理大挑戰：到底是誰煮了高麗菜？" },
    { id: "a37f89ac4d", image: "assets/featured/writing.webp", badge: "熱烈討論", title: "「雕字」是必要的嗎？我的寫字要求" },
    { id: "83c632349c", image: "assets/featured/walk-home.webp", badge: "暖心故事", title: "「鳳梨，謝謝你今天陪我走回家」" }
  ],

  // 里程碑（首頁時間軸）。icon 可用：heart、home、laptop、medal、star、school、video、rocket
  milestones: [
    { date: "小時候", icon: "heart", title: "受到許多好老師的幫助與教誨", text: "一路上遇到許多好老師，他們的幫助與教誨，是我走上教育這條路的起點。" },
    { date: "2019", icon: "home", title: "開始走進安親班", text: "從助教、櫃檯到帶班老師，安親班裡的每個職位幾乎都做過。" },
    { date: "2020", icon: "school", title: "到慈馨兒少之家擔任課輔老師", text: "陪伴兒少之家的孩子們課後學習。" },
    { date: "2021", icon: "laptop", title: "疫情期間在 AmazingTalker 線上教學", text: "因為疫情，開始在 AmazingTalker 上教學，直到疫情結束。一堂課賺不到 200 元，卻遇到了很多學生、累積了很多經驗。" },
    { date: "2024", icon: "medal", title: "第一次帶學生參賽", text: "從安親班找願意挑戰的孩子，靠著線上影片培訓，奧林匹克數學團體競賽拿下銅獎。" },
    { date: "2025", icon: "medal", title: "銀獎＋銅獎", text: "只準備兩個月、主要看線上課程，團體成績從第一年的後半段，進步到前三分之一。" },
    { date: "2026.02", icon: "star", title: "Threads 破 100 萬瀏覽、1000 位粉絲", text: "靠著自己一字一句打出來的文字，還有過年期間大家一起玩的幾A幾B 挑戰。" },
    { date: "2026.03.07", icon: "school", title: "第一個奧數實體班開班", text: "「我不是什麼很厲害的老師，我只是一個靠著教育愛和熱忱，在努力勇敢追夢的人而已。」" },
    { date: "2026", icon: "medal", title: "學生入選 WMI 銅獎", text: "WMI 世界數學邀請賽，學生入選銅獎。希望有一天，能帶著學生站上更大的舞台。" },
    { date: "2026.10", icon: "video", title: "鳳梨老師陪你讀數學", text: "第一次線上段考檢討、開始上傳 YouTube 解題影片，國中數學解題群組也來到 84 人。" },
    { date: "2026.10.29", icon: "laptop", title: "「換我當老師」上線、每日三題開跑", text: "讓孩子當小老師批改考卷的複習網站正式上線；同一天開始每天分享國一到國三的「每日三題」。" },
    { date: "下一站", icon: "rocket", title: "11/22 奧林匹克數學團體競賽", text: "新的一屆小中組、小高組正在努力培訓，11 月 22 日（日）出賽。下一個里程碑，正在路上！" }
  ],

  // 首頁照片牆。把照片放進 assets/photos/，再加一行：
  //   { src: "assets/photos/檔名.jpg", caption: "照片說明" }
  // 可以加 size: "big" / "tall" / "wide" / "small" 指定大小，不寫的話會自動排出有大有小的版面。
  photos: [
    { src: "assets/photos/contest/2024-team.webp", caption: "2024 鳳梨小隊初登場", size: "half" },
    { src: "assets/photos/contest/2025-team.webp", caption: "2025 鳳梨小隊 2", size: "half" },
    { src: "assets/photos/contest/2026-wmi.webp", caption: "2026 WMI 世界數學邀請賽", size: "tall" },
    { src: "assets/photos/contest/2024-bronze.webp", caption: "2024 團體賽銅獎", size: "tall" },
    { src: "assets/photos/contest/2026-olympiad.webp", caption: "2026 奧林匹克數學競賽（個人賽）", size: "tall" }
  ],
  photoPlaceholders: ["上課的白板", "學生的創意作品", "戶外教學", "奧數桌遊時間", "孩子們畫的鳳梨老師", "夏日盛典"],

  // 「帶學生征戰比賽」頁面（competitions.html）
  contest: {
    intro: "我從安親班裡找願意一起挑戰的孩子，每天回家錄影片給他們在家看，賽前再做模擬訓練。從線上培訓走到第一個奧數實體班，一步一步帶喜歡數學的孩子，走進更高的數學殿堂。",
    records: [
      { year: "2024", name: "奧林匹克數學團體競賽", medals: { bronze: 1 }, note: "第一次帶隊參賽，全程線上培訓" },
      { year: "2025", name: "奧林匹克數學團體競賽", medals: { silver: 1, bronze: 1 }, note: "只準備兩個月，團體成績進步到前三分之一" },
      { year: "2026", name: "WMI 世界數學邀請賽", medals: { bronze: 1 }, note: "學生入選銅獎" },
      { year: "2026", name: "奧林匹克數學團體競賽", training: true, date: "2026-11-22", dateText: "11/22（日）出賽", note: "新的一屆小中組、小高組培訓中" }
    ],
    methods: [
      { title: "從安親班找願意挑戰的孩子", text: "那時還沒有學生來上奧數課，我就從安親班裡，一個一個找願意和我一起挑戰的孩子。" },
      { title: "每天錄詳細的線上影片", text: "兩三題就要錄快半個小時，因為我希望講得詳細一點，彌補線上和實體的差距。" },
      { title: "週六加強與賽前模擬", text: "免費的週六加強課，加上賽前一到兩週的模擬訓練，讓孩子熟悉比賽的節奏。" },
      { title: "桌遊與動手操作", text: "數學更著重在體驗。奧數課裡有桌遊和操作，孩子自己做出來的那一刻，才是學習的開始。" }
    ],
    // 培訓日記：對應 data/articles.js 的文章 id，會連到首頁的文章閱讀頁
    diary: ["d2c0cffaf9", "e4f76ac887", "7eeb880bd7", "895f37191a", "e9e09a562d", "90105e8232", "459205d730"],
    // 比賽相簿：依年份分組。fit: "contain" 代表完整顯示不裁切（適合截圖）；size 多了 "half"（半版）和 "strip"（滿版長條）
    albums: [
      { year: "2024", title: "奧林匹克數學團體競賽", results: ["銅獎 × 1"], photos: [
        { src: "assets/photos/contest/2024-group-chat.webp", caption: "線上培訓的群組", size: "strip", fit: "contain" },
        { src: "assets/photos/contest/2024-team.webp", caption: "鳳梨小隊初登場", size: "half" },
        { src: "assets/photos/contest/2024-bronze.webp", caption: "獲得銅獎的夥伴", size: "half" }
      ] },
      { year: "2025", title: "奧林匹克數學團體競賽", results: ["銀獎 × 1", "銅獎 × 1"], photos: [
        { src: "assets/photos/contest/2025-team.webp", caption: "鳳梨小隊 2 團照", size: "half" },
        { src: "assets/photos/contest/2025-group-chat.webp", caption: "線上培訓的群組", size: "half", fit: "contain" },
        { src: "assets/photos/contest/2025-silver.webp", caption: "獲得銀獎的夥伴", size: "half" },
        { src: "assets/photos/contest/2025-bronze.webp", caption: "獲得銅獎的夥伴", size: "half" }
      ] },
      { year: "2026", title: "WMI 世界數學邀請賽・奧林匹克數學競賽（個人賽）", results: ["WMI 銅獎 × 1", "團體賽 11/22 出賽"], photos: [
        { src: "assets/photos/contest/2026-wmi.webp", caption: "WMI 世界數學邀請賽・比賽當天", size: "tall" },
        { src: "assets/photos/contest/2026-olympiad.webp", caption: "奧林匹克數學競賽（個人賽）・4/19 比賽當天", size: "tall" }
      ] }
    ]
  },

  // 我開發的教學工具，會出現在首頁的「教學工具」區塊
  tools: [
    {
      id: "teacher-turn",
      name: "鳳梨數學練功坊",
      badge: "NEW",
      subtitle: "「換我當老師」：用批改考卷來複習觀念",
      text: "每個孩子會拿到一份「已經寫好」的考卷，換他們當小老師，在沒有解答的情況下把錯的地方全部找出來。能不能改對，就知道觀念是不是真的懂了。",
      steps: ["拿到一份寫好的考卷", "當小老師，找出錯誤", "改完馬上對答案"],
      chips: ["國小數學", "複習觀念", "網路版"],
      url: "https://it-s-my-turn-to-be-teacher.web.app",
      cta: "開始批改",
      post: "422efb1081"
    }
  ],

  // 國中數學專區（junior.html）。每日三題的資料在 data/daily.js，由匯入工具自動整理。
  junior: {
    intro: "給國中生和家長的數學複習角落：每天三題跟上學校進度，重點筆記搭配一分鐘短影片，把基本觀念一個一個補起來。",
    exam: { date: "2027-05-15", label: "2027 國中教育會考" },
    notes: [
      { grade: "國一", color: "yellow", title: "倍數、質數與分數", post: "87fa1a0d81",
        topics: ["倍數判別法", "質數與標準分解式", "公因數與公倍數", "分數的四則運算", "分數的常考概念", "分數的進階考題"],
        tip: "因數、倍數和分數是國一的地基，熟悉之後，後面的方程式和比例都會輕鬆很多。",
        videos: [{ label: "一分鐘觀念短影片", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g/shorts" }] },
      { grade: "國二", color: "sky", title: "根式與畢氏定理", post: "5629e99aaf",
        topics: ["最簡根式", "根式的近似值", "根式比大小（會考愛考）", "畢氏定理", "畢氏定理常考題型"],
        tip: "看到畢氏定理，就代表「幾何」的世界已經來臨了。除了基本的定理，最重要的是學會「下一步該怎麼走」：題目給完條件，要怎麼用這些條件找到答案。",
        videos: [{ label: "一分鐘觀念短影片", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g/shorts" }] },
      { grade: "國三", color: "leaf", title: "簡易測量、三角比與圓", post: "7706dfc224",
        topics: ["簡易測量常考題型", "特殊三角比與三角函數", "點、直線與圓的位置關係", "圓心角與圓周角", "弧、弦、角的關係"],
        tip: "幾何的世界即將大集合。三角形「三心」教完之後，一題裡會融合國二、國三的概念，學會怎麼把概念串起來，是最重要的課題。",
        videos: [{ label: "一分鐘觀念短影片", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g/shorts" }] }
    ],
    // 國小的複習資源，放在專區最下面
    elementary: { post: "b41a8b39ab", title: "國小 3–6 年級數學重點筆記", text: "翰林、康軒、南一三大版本都有，可以自己挑對應的版本和單元。" }
  },

  links: [
    { id: "threads",   label: "Threads",   handle: "@a_l_w_a_y_s_joy", note: "教學筆記每週更新", url: "https://www.threads.com/@a_l_w_a_y_s_joy" },
    { id: "instagram", label: "Instagram", handle: "@a_l_w_a_y_s_joy", note: "教室日常與圖文",   url: "https://www.instagram.com/a_l_w_a_y_s_joy/" },
    { id: "youtube",   label: "YouTube",   handle: "國中數學解題影片", note: "段考檢討與觀念講解", url: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g",
      shorts: "https://www.youtube.com/@%E9%99%B3%E6%98%93%E5%BD%A3-e1g/shorts" },
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
    { id: "olympiad", name: "奧數課程分享", color: "sky", desc: "週六奧數課的教學片段、桌遊與奧數題",
      keywords: ["奧數", "數獨", "一筆畫", "閃靈快手", "三視圖", "正方體", "桌遊"] },
    { id: "contest", name: "競賽培訓", color: "berry", desc: "帶學生參加數學競賽的培訓紀錄",
      keywords: ["奧數", "奧林匹克", "WMI", "競賽", "培訓", "比賽"] },
    { id: "stories", name: "教室小故事", color: "coral", desc: "看得見教學方式的真實片段",
      keywords: ["謝謝老師", "感動", "最後一堂課"] }
  ]
};
