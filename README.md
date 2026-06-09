# lazy-html — 介紹頁

> 一頁式介紹網站:用白話告訴大家 **lazy-html** 是什麼、怎麼裝進 Claude,並直接下載。

lazy-html 是一個給 Claude 用的小工具(skill)。裝進 Claude 後,你只要把想整理的東西交給它 —— 一段文字、一份清單、一個檔案,或一個主題 —— 它就會做出一個漂亮、可以點來點去的網頁,而且不用寫程式。本網站就是它的介紹頁與下載入口,對象是一般使用者。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 介紹頁 | <https://lazy-html.peteraim.com/> |
| 📦 下載 | <https://lazy-html.peteraim.com/lazy-html.skill> |

---

## ✨ 內容

- **這是什麼?** — 用白話說明 lazy-html,搭配三個重點(不用寫程式 / 一個檔案 / 漂亮又好用)
- **如何使用?** — 四步驟:下載 → Claude 的 Customize → Skills → 點「+」→ Create skill 匯入 → 在對話裡回答幾個問題,並附上操作截圖
- **下載按鈕** — 直接下載 `lazy-html.skill`(下載點擊已接 GA4 追蹤)
- **中英文全頁切換** + **深色 / 淺色模式**(選擇用 `localStorage` 記住)
- **響應式** + 純靜態(無後端、無建置流程)

---

## 📂 內容結構

```
lazy-html/
├── index.html          # 介紹頁(含 meta / OG / JSON-LD / GA4)
├── assets/
│   ├── styles.css      # MD3 設計 token(深淺色)+ 版面樣式
│   ├── app.js          # 中英文切換、深淺色、下載追蹤
│   ├── customize.png   # 「如何使用」的操作截圖
│   └── og-image.png    # 社群分享預覽圖
├── lazy-html.skill     # ⬇️ 可下載的檔案(約 196 KB)
└── .nojekyll           # 讓 GitHub Pages 略過 Jekyll
```

---

## 🛠 本機預覽

```bash
git clone git@github.com:tingwei161803/lazy-html.git
cd lazy-html
uv run python -m http.server 4173
# 開 http://localhost:4173
```

> 純靜態網站,不需安裝任何依賴。若要跑本機伺服器,一律使用 `uv`。

---

## 📈 流量分析

本網站使用 **Google Analytics 4 (GA4)**(Measurement ID `G-F87CED3TEG`)蒐集匿名流量數據。其中「下載」的點擊會額外送出一個 GA4 `file_download` 事件(因為 `.skill` 不在 GA4 自動追蹤的副檔名清單內,需手動回報)。被廣告攔截器擋下或離線時,追蹤會自動略過,不影響下載與瀏覽。

---

## 📝 聲明

- 介紹頁由 **Peter Chang** 製作 · [LinkedIn](https://www.linkedin.com/in/ai-med/)
- 介紹頁程式碼以 `MIT` 授權釋出;`lazy-html.skill` 內容著作權歸其作者所有。
