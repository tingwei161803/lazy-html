/* lazy-html 介紹頁資料層 — bento 版型 */

window.SITE_META = {
  title:    { en: "lazy-html", zh: "lazy-html" },
  pageTitle:{ en: "lazy-html — pretty single-file pages from your data",
              zh: "lazy-html — 把資料變成漂亮的單檔網頁" },
  subtitle: {
    en: "A claude.ai (web) skill that turns pasted text, files, URLs or a topic into one pretty, interactive, self-contained HTML page — all CSS, JS and data inline in a single .html.",
    zh: "claude.ai 網頁版專用的 skill:把你貼上的文字、檔案、URL 或一個主題,整理成一個漂亮、可互動的「單檔 HTML」—— CSS、JS、資料全部 inline 在同一個 .html。"
  }
};

window.SITE_TILES = [
  {
    slug: "what",
    size: "lg",
    accent: true,
    icon: "auto_awesome",
    title: { en: "What is lazy-html?", zh: "lazy-html 是什麼?" },
    body: {
      en: "A Claude skill made for claude.ai (the web app). Give Claude your data — pasted text, an uploaded file, a URL, or just a topic — and it builds one pretty, interactive web page. Everything (CSS, JavaScript, data) is packed into a single .html, so it works right inside the artifact preview and also when you download and open it in a browser.",
      zh: "一個給 claude.ai 網頁版用的 Claude skill。把你的資料交給 Claude —— 貼上的文字、上傳的檔案、一個網址、或只是一個主題 —— 它就幫你做成一頁漂亮、可互動的網頁。所有東西(CSS、JavaScript、資料)都打包進同一個 .html,在 artifact 預覽裡就能直接玩,下載後用瀏覽器打開也一樣能用。"
    },
    points: [
      { en: "Paste data → get a polished, shareable page", zh: "貼資料 → 得到一頁漂亮、可分享的網站" },
      { en: "Everything in one .html — no install, no build", zh: "全部在一個 .html —— 零安裝、零 build" },
      { en: "Great for galleries, lists, dashboards, timelines, long reads…", zh: "適合圖鑑、清單、儀表板、時間軸、長文…" }
    ]
  },
  {
    slug: "single-file",
    size: "tall",
    icon: "description",
    title: { en: "One file, everything inside", zh: "一個檔案,全部搞定" },
    body: {
      en: "CSS, JavaScript and data are all inlined into the same .html. No index.html + assets/ + data/ folder structure, no build tool, no server. Copy it, email it, drop it anywhere — it just runs.",
      zh: "CSS、JavaScript、資料全部 inline 在同一個 .html。沒有 index.html + assets/ + data/ 的多檔結構,不需要任何 build 工具,也不需要伺服器。複製、寄出、丟到任何地方都能直接跑。"
    }
  },
  {
    slug: "zero-build",
    size: "sm",
    accent: true,
    icon: "bolt",
    value: "0",
    title: { en: "build steps", zh: "個 build 步驟" },
    body: {
      en: "No npm, no webpack, no framework. Opening it in a browser is the whole deploy.",
      zh: "沒有 npm、沒有 webpack、沒有框架。用瀏覽器打開,就是成品。"
    }
  },
  {
    slug: "layouts",
    size: "md",
    icon: "dashboard",
    value: "13",
    title: { en: "layouts, not just cards", zh: "種版型,不只是卡片" },
    body: {
      en: "lazy-html picks a layout that fits the shape of your data: gallery, article, lesson, dashboard, timeline, table, bento, kanban, FAQ, comparison, leaderboard, scrollytelling, and map.",
      zh: "lazy-html 會依你的資料形狀挑版型,而不是一律塞卡片:gallery 圖鑑、article 長文、lesson 教材、dashboard 儀表板、timeline 時間軸、table 表格、bento 便當格、kanban 看板、faq 問答、comparison 比較、leaderboard 排名、scrolly 捲動敘事、map 地圖。"
    }
  },
  {
    slug: "claude-web",
    size: "md",
    icon: "language",
    title: { en: "Built for claude.ai (web)", zh: "為 claude.ai 網頁版打造" },
    body: {
      en: "On claude.ai there's no terminal — no bash, git, or Playwright, and the output is a single artifact, not a multi-file project. That's exactly why lazy-html packs everything into one self-contained .html that renders live in the artifact preview.",
      zh: "claude.ai 上沒有終端機 —— 沒有 bash、git、Playwright,而且產出是單一 artifact、不是多檔專案。lazy-html 正是為此設計:把所有東西打包進一個自包含的 .html,在 artifact 預覽即時呈現。"
    }
  },
  {
    slug: "bilingual",
    size: "sm",
    icon: "translate",
    title: { en: "Full-page EN / 中", zh: "中英文全頁切換" },
    body: {
      en: "One tap switches the whole page — cards, detail dialogs, chrome, titles — with nothing stuck in the other language.",
      zh: "一鍵把整頁切換語言 —— 卡片、詳情視窗、介面、標題全部一起切,不留任何殘字。"
    }
  },
  {
    slug: "search",
    size: "sm",
    icon: "search",
    title: { en: "Search & filters", zh: "搜尋 + 多軸篩選" },
    body: {
      en: "Instant full-text search plus multi-axis filters (category, year…) and a live result count.",
      zh: "即時全文搜尋,加上多軸篩選(分類、年份…)與即時結果計數。"
    }
  },
  {
    slug: "dark",
    size: "sm",
    icon: "dark_mode",
    title: { en: "Light & dark", zh: "深淺色模式" },
    body: {
      en: "Toggle light/dark in one tap; the choice is remembered via localStorage.",
      zh: "一鍵切換深淺色,選擇會用 localStorage 記住。"
    }
  },
  {
    slug: "deep-link",
    size: "sm",
    icon: "link",
    title: { en: "Modal + deep links", zh: "Modal + 深層連結" },
    body: {
      en: "Tap a card for a detail dialog; every item has a shareable, bookmarkable #slug URL.",
      zh: "點卡片開詳情視窗,每一筆都有可分享、可加書籤的 #slug 連結。"
    }
  },
  {
    slug: "how",
    size: "wide",
    icon: "rocket_launch",
    title: { en: "Three steps to start", zh: "三步驟上手" },
    body: {
      en: "Once the skill is added in claude.ai, you just hand Claude your data.",
      zh: "在 claude.ai 把這個 skill 裝好之後,你只要把資料交給 Claude 就行。"
    },
    points: [
      { en: "① Download lazy-html.skill and add it to your skills in claude.ai settings.",
        zh: "① 下載 lazy-html.skill,到 claude.ai 設定把它加進你的 skills。" },
      { en: "② Tell Claude \"turn this data into a pretty page\" and paste your data.",
        zh: "② 跟 Claude 說「把這份資料做成漂亮的網頁」,然後貼上你的資料。" },
      { en: "③ Claude asks layout & style, then outputs the single-file HTML — just say what to tweak.",
        zh: "③ Claude 會先問版型與風格,確認後產出單檔 HTML;不滿意就直接說怎麼改。" }
    ]
  },
  {
    slug: "deploy",
    size: "md",
    icon: "cloud_upload",
    title: { en: "Go live, no CLI", zh: "免 CLI 一鍵上線" },
    body: {
      en: "Download the generated .html and drag it onto a free host — no commands needed. A single file means there's nothing to build.",
      zh: "下載產出的 .html,拖到免費平台就上線 —— 完全不用下指令。單一檔案,沒有任何東西需要 build。"
    },
    links: [
      { label: { en: "GitHub Pages", zh: "GitHub Pages" }, url: "https://pages.github.com/", icon: "public" },
      { label: { en: "Netlify Drop", zh: "Netlify Drop" }, url: "https://app.netlify.com/drop", icon: "cloud" }
    ]
  },
  {
    slug: "inside",
    size: "md",
    icon: "inventory_2",
    value: "24",
    title: { en: "files, ready to use", zh: "個檔案,打開即用" },
    body: {
      en: "Unzip lazy-html.skill and you'll find: SKILL.md (the full how-to), two ready-to-render single-file templates (single page + single-file multi-view), and references/ (layouts, style guides, a visual self-review checklist, and a no-CLI deploy guide).",
      zh: "解壓 lazy-html.skill 會看到:SKILL.md(完整用法)、兩個可直接渲染的單檔模板(單頁 + 單檔多視圖)、以及 references/(版型、風格指南、視覺自檢清單、免 CLI 部署教學)。"
    }
  },
  {
    slug: "download",
    size: "wide",
    accent: true,
    icon: "download",
    title: { en: "Download & start", zh: "立即下載開始用" },
    body: {
      en: "Grab lazy-html.skill, add it to your skills in claude.ai, and from then on every conversation can turn your data into a pretty page.",
      zh: "拿到 lazy-html.skill,把它加進 claude.ai 的 skills,從此每一次對話都能把你的資料變成漂亮網頁。"
    },
    links: [
      { label: { en: "Download lazy-html.skill", zh: "下載 lazy-html.skill" }, url: "lazy-html.skill", icon: "download", evt: "download" },
      { label: { en: "View on GitHub", zh: "在 GitHub 查看" }, url: "https://github.com/tingwei161803/lazy-html", icon: "code" }
    ]
  }
];
