# lazy-html — 介紹頁

> 一頁式介紹網站:認識 **lazy-html**,並直接下載這個 skill。

lazy-html 是一個給 **claude.ai 網頁版**使用的 Claude skill。把你貼上的文字、上傳的檔案、一個網址、或一個主題交給 Claude,它就整理成「一個漂亮、可互動的單檔 HTML」—— CSS、JS、資料全部 inline 在同一個 `.html`,在 artifact 預覽就能直接互動,下載後用瀏覽器打開也一樣能用。本網站就是它的介紹頁與下載入口。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 介紹頁 | <https://tingwei161803.github.io/lazy-html/> |
| 📦 下載 skill | <https://tingwei161803.github.io/lazy-html/lazy-html.skill> |

> 直接點進去就能看,無需安裝。可用 `https://tingwei161803.github.io/lazy-html/#<slug>` 深連結到特定區塊(例如 `#download`、`#how`)。

---

## ✨ 功能特色

- 🧩 **Bento 版型** — 大小不一的方格,用大數字(0 build / 13 版型 / 24 檔案)建立視覺層次
- 🌏 **中英文全頁切換** — 一鍵把整頁(卡片、詳情、介面、標題)切換,不留殘字
- 🌗 **深色 / 淺色模式** — 一鍵切換,選擇用 `localStorage` 記住
- 🪟 **詳情彈窗** — 點任一方格看完整說明、步驟與相關連結
- 🔗 **深連結** — 每個區塊都有專屬 `#<slug>`,可直接分享
- ⬇️ **一鍵下載** — 直接下載 `lazy-html.skill`,下載行為已接 GA4 追蹤
- 📱 **響應式設計** — 桌機 4 欄 → 平板 2 欄 → 手機 1 欄,375px 不溢出
- ⚡ **純靜態** — 無後端、無 build、載入快、可離線瀏覽

---

## 📂 內容結構

本站內容整理自 **lazy-html skill 的 `SKILL.md`**(這個 skill 本身的官方說明)。

```
lazy-html/
├── index.html          # 入口頁(含 meta / OG / JSON-LD / GA4)
├── assets/
│   ├── styles.css      # MD3 設計 token(深淺色)+ bento 樣式
│   └── app.js          # 渲染、i18n、深淺色、彈窗、深連結、下載追蹤
├── data/
│   └── data.js         # 資料層:SITE_META + SITE_TILES(雙語)
├── lazy-html.skill     # ⬇️ 可下載的 skill 檔(zip,約 196 KB)
└── .nojekyll           # 讓 GitHub Pages 略過 Jekyll
```

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone git@github.com:tingwei161803/lazy-html.git
cd lazy-html

# 2a. 最簡單:直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器(建議,深連結才正常)
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站,不需安裝任何依賴。若要跑本機伺服器,一律使用 `uv`。

---

## 📈 流量分析

本網站使用 **Google Analytics 4 (GA4)**(Measurement ID `G-F87CED3TEG`)蒐集匿名流量數據,用於了解造訪情況。其中「下載 `lazy-html.skill`」的點擊會額外送出一個 GA4 `file_download` 事件(因為 `.skill` 不在 GA4 自動追蹤的副檔名清單內,需手動回報)。若你的受眾位於需要 cookie 同意的地區(如 GDPR / CCPA),請自行評估是否加上同意橫幅。被廣告攔截器擋下或離線時,追蹤會自動略過,不影響下載與瀏覽。

---

## 📝 聲明 / License

- 本站為 lazy-html 的介紹/下載頁;`lazy-html.skill` 內容著作權歸其作者所有。
- 介紹頁程式碼以 `MIT` 授權釋出。
- 如需調整或移除內容,請開 issue 聯絡。
