/* ── Ajuste estes dois valores ──────────────────────────────── */
var EXAM_DATE = "2026-10-23";   /* data do exame OSCP (AAAA-MM-DD) */
var UPDATED   = "2026-09-28";   /* data da última atualização      */
/* ───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  var strings = {
    pt: { examOn: "Exame em ", copy: "Copiar", copied: "Copiado", passed: "Exame realizado" },
    en: { examOn: "Exam on ",  copy: "Copy",   copied: "Copied",  passed: "Exam taken" }
  };
  var lang = "pt";

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

    document.getElementById("days").textContent = days >= 0 ? String(days) : "OK";
    document.getElementById("exam-date").textContent =
      (days >= 0 ? strings[lang].examOn : strings[lang].passed + " · ") + fmt(exam, lang);
    document.getElementById("updated").textContent = fmt(parseDay(UPDATED), lang);
  }

  var nodes = document.querySelectorAll("[data-en]");
  Array.prototype.forEach.call(nodes, function (el) {
    el.setAttribute("data-pt", el.textContent);
  });

  function setLang(next) {
    lang = next;
    Array.prototype.forEach.call(nodes, function (el) {
      el.textContent = el.getAttribute("data-" + next);
    });
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    document.getElementById("btn-pt").setAttribute("aria-pressed", String(next === "pt"));
    document.getElementById("btn-en").setAttribute("aria-pressed", String(next === "en"));
    document.getElementById("copy").textContent = strings[next].copy;
    renderDates();
    try { localStorage.setItem("lang", next); } catch (e) { /* storage bloqueado */ }
  }

  document.getElementById("btn-pt").addEventListener("click", function () { setLang("pt"); });
  document.getElementById("btn-en").addEventListener("click", function () { setLang("en"); });

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { /* storage bloqueado */ }
  if (saved === "en") { setLang("en"); } else { renderDates(); }

  var copyBtn = document.getElementById("copy");
  var mail = document.getElementById("mail");

  function selectMail() {
    var r = document.createRange();
    r.selectNodeContents(mail);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
  }

  copyBtn.addEventListener("click", function () {
    function done() {
      copyBtn.textContent = strings[lang].copied;
      setTimeout(function () { copyBtn.textContent = strings[lang].copy; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail.textContent.trim()).then(done, selectMail);
    } else {
      selectMail();
    }
  });
})();
