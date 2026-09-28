/* ── Ajuste estes dois valores ──────────────────────────────── */
var EXAM_DATE = "2026-10-23";   /* data do exame OSCP (AAAA-MM-DD) */
var UPDATED   = "2026-09-28";   /* data da última atualização      */
/* ───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  var HOME = "curriculo";
  var SITE = "Artur Borges";

  var strings = {
    pt: { examOn: "Exame em ", copy: "Copiar", copied: "Copiado", passed: "Exame realizado" },
    en: { examOn: "Exam on ",  copy: "Copy",   copied: "Copied",  passed: "Exam taken" }
  };
  var lang = "pt";

  var views  = document.querySelectorAll(".view");
  var links  = document.querySelectorAll("nav.tree a[href^='#']");
  var rail   = document.getElementById("rail");
  var scrim  = document.getElementById("scrim");
  var burger = document.getElementById("burger");

  /* ── datas ─────────────────────────────────────────────── */

  function parseDay(s) {
    var p = s.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function fmt(d, l) {
    return d.toLocaleDateString(l === "pt" ? "pt-BR" : "en-GB",
      { day: "2-digit", month: "long", year: "numeric" });
  }

  function renderDates() {
    var exam = parseDay(EXAM_DATE);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((exam - today) / 86400000);

    each(document.querySelectorAll("[data-days]"), function (el) {
      el.textContent = days >= 0 ? String(days) : "OK";
    });
    each(document.querySelectorAll("[data-examdate]"), function (el) {
      el.textContent = (days >= 0 ? strings[lang].examOn : strings[lang].passed + " · ") + fmt(exam, lang);
    });
    each(document.querySelectorAll("[data-updated]"), function (el) {
      el.textContent = fmt(parseDay(UPDATED), lang);
    });
  }

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* ── idioma ────────────────────────────────────────────── */

  var i18n = document.querySelectorAll("[data-en]");
  each(i18n, function (el) { el.setAttribute("data-pt", el.textContent); });

  function setLang(next) {
    lang = next;
    each(i18n, function (el) { el.textContent = el.getAttribute("data-" + next); });
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    document.getElementById("btn-pt").setAttribute("aria-pressed", String(next === "pt"));
    document.getElementById("btn-en").setAttribute("aria-pressed", String(next === "en"));
    var copyBtn = document.getElementById("copy");
    if (copyBtn) { copyBtn.textContent = strings[next].copy; }
    renderDates();
    route(current, true);
    try { localStorage.setItem("lang", next); } catch (e) { /* storage bloqueado */ }
  }

  /* ── rotas ─────────────────────────────────────────────── */

  var current = HOME;

  function slugFromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    return document.getElementById("v-" + h) ? h : HOME;
  }

  function route(slug, quiet) {
    current = slug;
    var target = document.getElementById("v-" + slug);

    each(views, function (v) { v.hidden = (v !== target); });

    each(links, function (a) {
      var on = a.getAttribute("href") === "#" + slug;
      a.classList.toggle("on", on);
      if (on) {
        a.setAttribute("aria-current", "page");
        var box = a.closest("details");
        if (box) { box.open = true; }
      } else {
        a.removeAttribute("aria-current");
      }
    });

    var name = target ? target.getAttribute("data-title-" + lang) : null;
    document.title = name ? SITE + " — " + name : SITE;

    closeRail();
    if (!quiet) { window.scrollTo(0, 0); }
  }

  window.addEventListener("hashchange", function () { route(slugFromHash()); });

  /* ── gaveta no mobile ──────────────────────────────────── */

  function openRail() {
    rail.classList.add("open");
    scrim.hidden = false;
    burger.setAttribute("aria-expanded", "true");
  }
  function closeRail() {
    rail.classList.remove("open");
    scrim.hidden = true;
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    if (rail.classList.contains("open")) { closeRail(); } else { openRail(); }
  });
  scrim.addEventListener("click", closeRail);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeRail(); }
  });

  /* ── copiar e-mail ─────────────────────────────────────── */

  var copyBtn = document.getElementById("copy");
  var mail = document.getElementById("mail");
  if (copyBtn && mail) {
    var selectMail = function () {
      var r = document.createRange();
      r.selectNodeContents(mail);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    };
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.textContent = strings[lang].copied;
        setTimeout(function () { copyBtn.textContent = strings[lang].copy; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail.textContent.trim()).then(done, selectMail);
      } else {
        selectMail();
      }
    });
  }

  /* ── início ────────────────────────────────────────────── */

  document.getElementById("btn-pt").addEventListener("click", function () { setLang("pt"); });
  document.getElementById("btn-en").addEventListener("click", function () { setLang("en"); });

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { /* storage bloqueado */ }

  closeRail();
  if (saved === "en") {
    setLang("en");
    route(slugFromHash(), true);
  } else {
    renderDates();
    route(slugFromHash(), true);
  }
})();
