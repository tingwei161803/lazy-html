/* =========================================================================
   bento/app.js  (vanilla, no build)
   Reads:
     window.SITE_META  -> { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_TILES -> [{ slug, size:"sm"|"md"|"lg"|"wide"|"tall",
                             title:{en,zh}, value?:"42%", body:{en,zh},
                             icon?:"<material symbol>", accent?:true }]
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var META  = (window.SITE_META && typeof window.SITE_META === "object") ? window.SITE_META : {};
  var TILES = Array.isArray(window.SITE_TILES) ? window.SITE_TILES : [];
  var SIZES = { sm: 1, md: 1, lg: 1, wide: 1, tall: 1 };

  /* ---------- i18n strings (UI chrome only) ---------- */
  var I18N = {
    en: { empty: "No tiles.",
          footer: "Static, no build step.",
          eyebrow: "A skill for claude.ai (web)",
          download: "Download lazy-html.skill",
          github: "View on GitHub",
          heroNote: "~196 KB · unzip & go · drop it in Claude's skills folder" },
    zh: { empty: "沒有內容。",
          footer: "純靜態,無建置流程。",
          eyebrow: "claude.ai 網頁版 skill",
          download: "下載 lazy-html.skill",
          github: "在 GitHub 查看",
          heroNote: "約 196 KB · 解壓即用 · 放進 Claude 的 skills 資料夾" }
  };

  /* ---------- safe localStorage (sandbox-friendly) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- global state ---------- */
  var state = {
    lang:  lsGet("lang")  || "zh",     // default language: zh
    theme: lsGet("theme") || "light"
  };

  /* ---------- dom refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var bento      = $("bento");
  var empty      = $("empty");
  var dialog     = $("dialog");
  var dialogBody = $("dialogBody");

  /* ---------- helpers ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function sizeClass(size) {
    return SIZES.hasOwnProperty(size) ? size : "sm";
  }

  /* ---------- render tiles ---------- */
  function render() {
    bento.innerHTML = "";

    TILES.forEach(function (item) {
      var sz = sizeClass(item.size);
      var tile = document.createElement("article");
      // class `tile` + `card` (so layout-agnostic checks see a .card),
      // plus the size modifier and optional accent.
      tile.className = "tile card tile--" + sz + (item.accent ? " tile--accent" : "");
      tile.tabIndex = 0;
      tile.setAttribute("data-item", "");
      tile.dataset.slug = item.slug;

      var html = "";
      if (item.icon) {
        html += '<span class="material-symbols-rounded tile__icon">' +
                escapeHtml(item.icon) + "</span>";
      }
      if (item.value != null && item.value !== "") {
        html += '<p class="tile__value">' + escapeHtml(item.value) + "</p>";
      }
      html += '<h3 class="tile__title">' + escapeHtml(t(item.title)) + "</h3>";
      // spacer pushes body to the bottom on tall/large tiles for nicer hierarchy
      if (sz === "lg" || sz === "tall") html += '<span class="tile__spacer"></span>';
      if (t(item.body)) {
        html += '<p class="tile__body">' + escapeHtml(t(item.body)) + "</p>";
      }
      tile.innerHTML = html;

      tile.addEventListener("click", function () { openDialog(item.slug); });
      tile.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDialog(item.slug); }
      });
      bento.appendChild(tile);
    });

    empty.hidden = TILES.length !== 0;
    empty.textContent = ui("empty");
  }

  /* ---------- dialog + deep links ---------- */
  function openDialog(slug) {
    var item = TILES.find(function (d) { return d.slug === slug; });
    if (!item) return;
    var html = "";
    if (item.icon) {
      html += '<span class="material-symbols-rounded dialog__icon">' +
              escapeHtml(item.icon) + "</span>";
    }
    if (item.value != null && item.value !== "") {
      html += '<p class="dialog__value">' + escapeHtml(item.value) + "</p>";
    }
    html += "<h2>" + escapeHtml(t(item.title)) + "</h2>";
    if (t(item.body)) html += "<p>" + escapeHtml(t(item.body)) + "</p>";

    // optional step/feature list
    if (Array.isArray(item.points) && item.points.length) {
      html += '<ol class="dialog__points">';
      item.points.forEach(function (p) {
        html += "<li>" + escapeHtml(t(p)) + "</li>";
      });
      html += "</ol>";
    }

    // optional supplementary links (e.g. download, deploy targets)
    if (Array.isArray(item.links) && item.links.length) {
      html += '<div class="dialog__links">';
      item.links.forEach(function (lnk) {
        if (!lnk || !lnk.url) return;
        var isDownload = lnk.evt === "download";
        var rel = ' rel="noopener"';
        var extra = isDownload
          ? ' download data-evt="download"'
          : ' target="_blank"';
        var icon = lnk.icon
          ? '<span class="material-symbols-rounded">' + escapeHtml(lnk.icon) + "</span>"
          : "";
        html += '<a class="dialog__link" href="' + escapeHtml(lnk.url) + '"' +
                extra + rel + ">" + icon + escapeHtml(t(lnk.label)) + "</a>";
      });
      html += "</div>";
    }

    dialogBody.innerHTML = html;

    if (!dialog.open) dialog.showModal();
    if (location.hash.slice(1) !== slug) {
      history.replaceState(null, "", "#" + slug);
    }
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  /* ---------- chrome text (title + subtitle) ---------- */
  function applyMeta() {
    var titleStr = t(META.title);
    var subStr   = t(META.subtitle);
    var brand = $("brandName");
    var hTitle = $("heroTitle");
    var hSub = $("heroSubtitle");
    if (titleStr) {
      if (brand)  brand.textContent  = titleStr;
      if (hTitle) hTitle.textContent = titleStr;
      // keep brand/hero short ("lazy-html") but give <title> a descriptive,
      // language-aware form for SEO / share previews.
      document.title = t(META.pageTitle) || titleStr;
    }
    if (subStr && hSub) hSub.textContent = subStr;
  }

  /* ---------- theme + lang ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = $("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    lsSet("theme", state.theme);
  }
  function applyLang() {
    document.documentElement.setAttribute("lang", state.lang);
    lsSet("lang", state.lang);
    var label = $("langLabel");
    if (label) label.textContent = state.lang === "en" ? "EN" : "中";
    // translate chrome marked with data-i18n
    [].forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var key = el.getAttribute("data-i18n");
      if (!I18N[state.lang] || I18N[state.lang][key] == null) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, ui(key));
      else el.textContent = ui(key);
    });
    applyMeta();
  }

  /* ---------- GA4: track .skill downloads ----------
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

  /* ---------- event wiring ---------- */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });
    $("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLang();
      render();
      // full-page switch: if the detail dialog is open, repaint it too
      var open = location.hash.slice(1);
      if (dialog.open && open) openDialog(open);
    });
    $("dialogClose").addEventListener("click", closeDialog);

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog();   // backdrop click closes
    });
    dialog.addEventListener("close", function () {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    });

    window.addEventListener("hashchange", syncFromHash);

    // Delegated download tracking: catches the hero CTA and any in-dialog
    // download link (both point at the .skill file) with one listener.
    document.addEventListener("click", function (e) {
      var a = e.target.closest &&
              e.target.closest('a[data-evt="download"], a[href$="lazy-html.skill"]');
      if (a) trackDownload(a);
    });
  }

  /* deep link: open dialog matching #slug on load / hashchange */
  function syncFromHash() {
    var slug = location.hash.slice(1);
    if (slug && TILES.some(function (d) { return d.slug === slug; })) {
      openDialog(slug);
    } else if (!slug && dialog.open) {
      dialog.close();
    }
  }

  /* ---------- init ---------- */
  function init() {
    applyTheme();
    applyLang();   // also calls applyMeta()
    render();
    wire();
    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
