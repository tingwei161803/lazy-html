/* =========================================================================
   lazy-html intro page — vanilla, no build.
   Only: bilingual (zh/en) full-page switch, light/dark, GA4 download event.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- UI text. These are TRUSTED literals authored here (never user
       input), so applyLang can safely use innerHTML — which lets the step
       text keep its <b> emphasis when switching language. ---------- */
  var I18N = {
    en: {
      pageTitle: "lazy-html — turn your data into a pretty web page",
      eyebrow: "An add-on for Claude",
      subtitle: "Turn your data into a pretty, clickable web page. No coding needed.",
      download: "Download lazy-html",
      heroNote: "Free · after downloading, follow the steps below to add it to Claude",
      whatTitle: "What is it?",
      whatLead: "lazy-html is a small add-on for Claude (Claude calls it a “skill”). Once it’s set up, just hand Claude whatever you want to organize — a piece of text, a list, a file, or even just a topic — and it builds you a pretty, clickable web page.",
      whatLead2: "The result is a single file: save it and open it in any browser, send it to a friend, or put it online to share. You never write a single line of code.",
      b1t: "No coding", b1d: "Just chat to get it done",
      b2t: "One file", b2d: "Opens anywhere, easy to share",
      b3t: "Pretty & handy", b3d: "Bilingual & dark mode built in",
      howTitle: "How to use it",
      howIntro: "Set it up once, then use it in any chat with Claude. Just four steps:",
      step1: "<b>Download</b> lazy-html (the “Download” button above).",
      step2: "Open Claude, go to <b>Customize</b> → <b>Skills</b>, click the <b>+</b> at the top right, and choose <b>Create skill</b>.",
      step3: "Import the <b>lazy-html</b> file you just downloaded.",
      step4: "Done! From now on, just tell Claude “<b>turn this into a web page</b>” and answer a few quick questions (layout, style) — it does the rest.",
      shotAlt: "In Claude’s Customize → Skills, click the plus at top right and choose Create skill",
      shotCap: "In Claude’s Customize → Skills, click “+” → Create skill to import."
    },
    zh: {
      pageTitle: "lazy-html — 把資料變成漂亮的網頁",
      eyebrow: "給 Claude 用的小工具",
      subtitle: "把你的資料,變成一個漂亮、可以點來點去的網頁。不用寫程式。",
      download: "下載 lazy-html",
      heroNote: "免費 · 下載後依下方步驟裝進 Claude",
      whatTitle: "這是什麼?",
      whatLead: "lazy-html 是一個給 Claude 用的小工具(在 Claude 裡叫做「skill」)。裝好之後,你只要把想整理的東西交給 Claude —— 一段文字、一份清單、一個檔案,或只是一個主題 —— 它就會幫你做出一個漂亮、可以點來點去的網頁。",
      whatLead2: "做好的網頁就是一個檔案,存下來用瀏覽器打開就能看,也可以傳給朋友,或放上網路分享。整個過程你都不用寫任何程式。",
      b1t: "不用寫程式", b1d: "用聊天的方式就能完成",
      b2t: "一個檔案", b2d: "到處都能打開、好分享",
      b3t: "漂亮又好用", b3d: "中英文、深色模式都內建",
      howTitle: "如何使用?",
      howIntro: "只要設定一次,之後每次跟 Claude 聊天都能用。照著下面四步做就好:",
      step1: "<b>下載</b> lazy-html(按上面的「下載」按鈕)。",
      step2: "打開 Claude,進到 <b>Customize</b>(自訂)→ <b>Skills</b>,點右上角的 <b>+</b>,選 <b>Create skill</b>。",
      step3: "把剛剛下載的 <b>lazy-html</b> 檔案匯入進去。",
      step4: "完成!之後在對話裡跟 Claude 說「<b>幫我把這份資料做成網頁</b>」,再回答它問的幾個小問題(想要的版型、風格),就會幫你做好。",
      shotAlt: "在 Claude 的 Customize → Skills,點右上角的加號,選 Create skill",
      shotCap: "在 Claude 的 Customize → Skills,點右上角「+」→ Create skill,即可匯入。"
    }
  };

  /* ---------- safe localStorage (sandbox-friendly) ---------- */
  function lsGet(k){ try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch (e) {} }

  var state = { lang: lsGet("lang") || "zh", theme: lsGet("theme") || "light" };
  var $ = function (id) { return document.getElementById(id); };
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }

  /* ---------- theme ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = $("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    lsSet("theme", state.theme);
  }

  /* ---------- language: full-page switch ---------- */
  function applyLang() {
    document.documentElement.setAttribute("lang", state.lang);
    lsSet("lang", state.lang);
    var label = $("langLabel");
    if (label) label.textContent = state.lang === "en" ? "EN" : "中";
    document.title = ui("pageTitle");
    [].forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var val = (I18N[state.lang] || {})[el.getAttribute("data-i18n")];
      if (val == null) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, val);   // e.g. image alt text
      else el.innerHTML = val;                 // trusted literal (see note above)
    });
  }

  /* ---------- GA4: track lazy-html downloads ----------
     GA4 Enhanced Measurement only auto-tracks file_download for a fixed
     extension list (pdf/zip/doc…); ".skill" is NOT on it, so we fire the
     recommended file_download event manually. Guarded so the page still
     works (and the file still downloads) when gtag is blocked/offline. */
  function trackDownload(a) {
    if (typeof window.gtag !== "function") return;   // GA blocked → no-op
    window.gtag("event", "file_download", {
      file_name: "lazy-html.skill",
      file_extension: "skill",
      link_url: (a && a.href) ? a.href : "lazy-html.skill",
      link_text: ui("download")
    });
  }

  /* ---------- wiring ---------- */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });
    $("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLang();
    });
    // Delegated download tracking: catches both download buttons.
    document.addEventListener("click", function (e) {
      var a = e.target.closest &&
              e.target.closest('a[data-evt="download"], a[href$="lazy-html.skill"]');
      if (a) trackDownload(a);
    });
  }

  function init() { applyTheme(); applyLang(); wire(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
