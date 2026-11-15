/* Vidyadeepa microsite – behaviour. You normally don't need to edit this file. */
(function () {
  'use strict';

  var CFG = window.VD_CONFIG || {};
  var ACTS = window.VD_ACTIVITIES;
  var WEEKS = window.VD_WEEKS;
  var TXT = window.VD_TEXT;
  var GRADES = ['2-4', '5-8'];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('vd_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('vd_' + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };

  /* ---------- dates ---------- */
  function parseISO(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }
  function getToday() {
    var p = new URLSearchParams(location.search).get('date'); // test with ?date=2026-11-20
    var d = (p && /^\d{4}-\d{2}-\d{2}$/.test(p)) ? parseISO(p) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  var state = {
    lang: store.get('lang', 'kn'),
    grade: store.get('grade', '5-8'),
    today: getToday(),
    cur: 0,
    exact: true,
    viewMonth: null,
    serverPhotos: [],
    slide: 0
  };
  if (!TXT[state.lang]) state.lang = 'kn';
  if (GRADES.indexOf(state.grade) < 0) state.grade = '5-8';

  /* ---------- text helpers ---------- */
  function t(k) { return (TXT[state.lang] && TXT[state.lang][k]) || TXT.en[k] || k; }
  function L(o) { return o ? (o[state.lang] || o.en || '') : ''; }
  function LA(o) { return o ? (o[state.lang] || o.en || []) : []; }
  function locale() { return state.lang === 'kn' ? 'kn-IN' : 'en-IN'; }
  function fmt(d, opt) { try { return new Intl.DateTimeFormat(locale(), opt).format(d); } catch (e) { return d.toDateString(); } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function gradeText(g) { return (g || state.grade).replace('-', '–'); }

  /* ---------- calendar logic ---------- */
  function weekIndexFor(d) { var k = iso(d); for (var i = 0; i < WEEKS.length; i++) { if (k >= WEEKS[i].start && k <= WEEKS[i].end) return i; } return -1; }
  function computeCurrent() {
    var i = weekIndexFor(state.today);
    if (i >= 0) { state.cur = i; state.exact = true; return; }
    var k = iso(state.today), next = -1;
    for (var j = 0; j < WEEKS.length; j++) { if (WEEKS[j].start > k) { next = j; break; } }
    state.cur = next >= 0 ? next : WEEKS.length - 1;
    state.exact = false;
  }
  function actFor(i, g) { var w = WEEKS[i]; return w ? ACTS[w.acts[g || state.grade]] : null; }
  function monthName(w) { return fmt(parseISO(w.month + '-01'), { month: 'long', year: 'numeric' }); }
  function weekLabel(i) { return t('week') + ' ' + WEEKS[i].week + ', ' + monthName(WEEKS[i]); }
  function dateRange(i) {
    var w = WEEKS[i], o = { day: 'numeric', month: 'short' };
    return fmt(parseISO(w.start), o) + ' – ' + fmt(parseISO(w.end), o);
  }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg, ms) {
    var el = $('#toast'); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, ms || 4000);
  }

  /* ---------- modal ---------- */
  var dlg = $('#modal');
  function openModal(html, wide) {
    $('#modalBody').innerHTML = html;
    dlg.classList.toggle('wide', !!wide);
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
    $('#modalBody').scrollTop = 0;
  }
  function closeModal() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  $('#modalClose').addEventListener('click', closeModal);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeModal(); });
  function showInfo(title, msg) { openModal('<h3>' + esc(title) + '</h3><p>' + esc(msg) + '</p>'); }

  /* ---------- i18n ---------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$('[data-lang]').forEach(function (b) { b.classList.toggle('on', b.dataset.lang === state.lang); b.setAttribute('aria-pressed', b.dataset.lang === state.lang); });
    $$('[data-grade]').forEach(function (b) { b.classList.toggle('on', b.dataset.grade === state.grade); b.setAttribute('aria-pressed', b.dataset.grade === state.grade); });
    document.title = t('siteTitle') + ' | ' + t('siteSub');
  }

  /* ---------- day strip ---------- */
  function renderDays() {
    var items = [['yesterday', -1], ['today', 0], ['tomorrow', 1], ['dayAfter', 2]];
    $('#dayStrip').innerHTML = items.map(function (it) {
      var d = addDays(state.today, it[1]), i = weekIndexFor(d), a = i >= 0 ? actFor(i) : null;
      return '<button type="button" class="day ' + (it[1] === 0 ? 'is-today' : 'faded') + '" data-week="' + i + '" data-label="' + it[0] + '">' +
        '<span class="day-label">' + esc(t(it[0])) + '</span>' +
        '<span class="day-date">' + esc(fmt(d, { weekday: 'short', day: 'numeric', month: 'short' })) + '</span>' +
        '<span class="day-icon" aria-hidden="true">' + (a ? a.icon : '🌙') + '</span>' +
        '<span class="day-title">' + esc(a ? L(a.title) : t('noActivity')) + '</span></button>';
    }).join('');
    $$('#dayStrip .day').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.week;
        if (i >= 0) openActivity(i, t(b.dataset.label)); else showInfo(t(b.dataset.label), t('noActivityDay'));
      });
    });
  }

  /* ---------- this week (hero) ---------- */
  var WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';

  function renderHero() {
    var i = state.cur, a = actFor(i), n = actFor(i + 1);
    $('#heroCard').innerHTML =
      (state.exact ? '' : '<p class="note">' + esc(t('nearestNote')) + '</p>') +
      '<div class="hero-top"><span class="pill">' + esc(t('thisWeekLabel')) + '</span><span class="pill soft">' + esc(t('grades')) + ' ' + gradeText() + '</span></div>' +
      '<div class="hero-body"><div class="hero-icon" aria-hidden="true">' + a.icon + '</div><div>' +
      '<p class="meta"><span>' + esc(weekLabel(i)) + '</span><span>' + esc(dateRange(i)) + '</span></p>' +
      '<h2 class="hero-title">' + esc(L(a.title)) + '</h2>' +
      '<p class="theme">' + esc(t('theme')) + ': <b>' + esc(L(a.theme)) + '</b></p>' +
      '<p class="desc">' + esc(L(a.desc)) + '</p>' +
      '<p class="anyday">' + esc(t('anyDay')) + '</p></div></div>' +
      '<div class="hero-actions" id="heroActions">' +
      '<button type="button" class="btn" data-act="res"><span aria-hidden="true">🧺</span> ' + esc(t('resources')) + '</button>' +
      '<button type="button" class="btn" data-act="exp"><span aria-hidden="true">💡</span> ' + esc(t('explain')) + '</button>' +
      '<button type="button" class="btn wa" data-act="wa">' + WA_ICON + ' ' + esc(t('whatsapp')) + '</button></div>' +
      '<p class="next-up">' + esc(t('nextUp')) + ': <b>' + esc(n ? L(n.title) : t('notPublished')) + '</b></p>';
    $('[data-act="res"]').onclick = function () { openModal('<h3>' + esc(L(a.title)) + '</h3>' + resHTML(a)); };
    $('[data-act="exp"]').onclick = function () { openModal('<h3>' + esc(L(a.title)) + '</h3><p class="desc">' + esc(L(a.desc)) + '</p>' + expHTML(a)); };
    $('[data-act="wa"]').onclick = openWhatsApp;
  }

  function resHTML(a) { return '<h4>🧺 ' + esc(t('resources')) + '</h4><ul class="res">' + LA(a.res).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>'; }
  function expHTML(a) { return '<h4>💡 ' + esc(t('explain')) + '</h4><ol class="steps">' + LA(a.steps).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ol>'; }

  function openActivity(i, label) {
    var a = actFor(i);
    openModal('<span class="pill">' + esc(label) + '</span>' +
      '<div class="m-head"><span class="m-icon" aria-hidden="true">' + a.icon + '</span><div>' +
      '<p class="meta"><span>' + esc(weekLabel(i)) + '</span><span>' + esc(dateRange(i)) + '</span><span>' + esc(t('grades')) + ' ' + gradeText() + '</span></p>' +
      '<h3>' + esc(L(a.title)) + '</h3><p class="theme">' + esc(t('theme')) + ': <b>' + esc(L(a.theme)) + '</b></p></div></div>' +
      '<p class="desc">' + esc(L(a.desc)) + '</p>' + resHTML(a) + expHTML(a));
  }

  /* ---------- month calendar ---------- */
  function renderMonth() {
    if (!state.viewMonth) {
      var base = state.exact ? state.today : parseISO(WEEKS[state.cur].month + '-01');
      state.viewMonth = new Date(base.getFullYear(), base.getMonth(), 1);
    }
    var vm = state.viewMonth, y = vm.getFullYear(), m = vm.getMonth();
    $('#monthTitle').textContent = fmt(vm, { month: 'long', year: 'numeric' });
    var monday = new Date(2024, 0, 1), dow = '';
    for (var k = 0; k < 7; k++) dow += '<span>' + esc(fmt(addDays(monday, k), { weekday: 'narrow' })) + '</span>';
    $('#dowRow').innerHTML = dow;

    var lead = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), html = '';
    for (k = 0; k < lead; k++) html += '<span class="cell empty"></span>';
    var todayKey = iso(state.today);
    for (var d = 1; d <= days; d++) {
      var dt = new Date(y, m, d), i = weekIndexFor(dt), cls = ['cell'];
      cls.push(i >= 0 ? 'w' + WEEKS[i].week : 'none');
      if (i === state.cur) cls.push('cur');
      if (iso(dt) === todayKey) cls.push('today');
      var a = i >= 0 ? actFor(i) : null;
      html += '<button type="button" class="' + cls.join(' ') + '" data-week="' + i + '" title="' + esc(a ? L(a.title) : t('noActivity')) + '">' + d + '</button>';
    }
    $('#monthGrid').innerHTML = html;
    $$('#monthGrid .cell[data-week]').forEach(function (b) {
      b.addEventListener('click', function () { var i = +b.dataset.week; if (i >= 0) openActivity(i, b.textContent + ' ' + $('#monthTitle').textContent); });
    });

    var key = y + '-' + pad(m + 1), list = [];
    WEEKS.forEach(function (w, i) { if (w.month === key) list.push(i); });
    $('#monthLegend').innerHTML = list.length ? list.map(function (i) {
      return '<li><button type="button" class="leg w' + WEEKS[i].week + (i === state.cur ? ' cur' : '') + '" data-week="' + i + '"><span class="dot"></span><span>' +
        esc(t('week')) + ' ' + WEEKS[i].week + '</span><b>' + esc(L(actFor(i).title)) + '</b></button></li>';
    }).join('') : '<li class="muted">' + esc(t('noMonth')) + '</li>';
    $$('#monthLegend .leg').forEach(function (b) { b.addEventListener('click', function () { openActivity(+b.dataset.week, weekLabel(+b.dataset.week)); }); });
  }

  /* ---------- WhatsApp ---------- */
  function waMessage() {
    var i = state.cur, a = actFor(i), n = actFor(i + 1), g = gradeText();
    var nextTitle = n ? L(n.title) : t('notPublished');
    var link = /^https?:/.test(location.protocol) ? '\n\n🔗 ' + location.origin + location.pathname : '';
    if (state.lang === 'kn') {
      return '📚 *ವಿದ್ಯಾದೀಪ – ಪೋಷಕರ ವಾರದ ಚಟುವಟಿಕೆ*\n\nಈ ವಾರದ ವಿದ್ಯಾದೀಪ ಚಟುವಟಿಕೆ – ತರಗತಿ: "' + g + '", ವಿಷಯ: "' + L(a.theme) + '", ಚಟುವಟಿಕೆ: "' + L(a.title) + '".\n\n' +
        L(a.desc) + '\n\nಮುಂದಿನ ವಾರದ ಚಟುವಟಿಕೆ ಹೀಗಿದೆ: "' + nextTitle + '".' + link;
    }
    return "📚 *Vidyadeepa – Parents' Weekly Activity*\n\nThis week Vidyadeepa activity is for Grade \"" + g + '" and Theme "' + L(a.theme) + '" and the activity is "' + L(a.title) + '".\n\n' +
      L(a.desc) + '\n\nNext week activity is also as follows: "' + nextTitle + '".' + link;
  }
  function openWhatsApp() {
    openModal('<h3>' + esc(t('whatsapp')) + '</h3>' +
      '<label class="fld">' + esc(t('waNumber')) + '<span class="phone"><span>+91</span><input id="waNum" type="tel" inputmode="numeric" maxlength="10" placeholder="98XXXXXXXX" value="' + esc(store.get('wa', '')) + '"></span></label>' +
      '<label class="fld">' + esc(t('waPreview')) + '<textarea id="waMsg" rows="9">' + esc(waMessage()) + '</textarea></label>' +
      '<p class="hint">' + esc(t('waHint')) + '</p>' +
      '<div class="row"><button type="button" class="btn wa" id="waSend">' + WA_ICON + ' ' + esc(t('waSend')) + '</button>' +
      '<button type="button" class="btn" id="waShare">' + esc(t('waShare')) + '</button></div>' +
      '<p class="err" id="waErr" hidden></p>');
    $('#waSend').onclick = function () {
      var num = $('#waNum').value.replace(/\D/g, '');
      if (num.length === 12 && num.indexOf('91') === 0) num = num.slice(2);
      if (!/^[6-9]\d{9}$/.test(num)) { $('#waErr').textContent = t('waBad'); $('#waErr').hidden = false; return; }
      store.set('wa', num);
      window.open('https://wa.me/91' + num + '?text=' + encodeURIComponent($('#waMsg').value), '_blank');
    };
    $('#waShare').onclick = function () { window.open('https://wa.me/?text=' + encodeURIComponent($('#waMsg').value), '_blank'); };
  }

  /* ---------- certificate ---------- */
  var LOGOS = {};
  [['left', 'assets/vidyadeepa-logo.png'], ['right', 'assets/diet-logo.png']].forEach(function (k) {
    var im = new Image();
    im.onload = function () { LOGOS[k[0]] = im; drawCert(); };
    im.src = k[1];
  });
  function drawLogo(x, im, cx, cy, maxW, maxH) {
    var s = Math.min(maxW / im.width, maxH / im.height), w = im.width * s, h = im.height * s;
    x.drawImage(im, cx - w / 2, cy - h / 2, w, h);
  }

  function openCert() {
    var last = store.get('cert', { school: '', grade: '' });
    var opts = '<option value="">' + esc(t('select')) + '</option>';
    for (var g = 1; g <= 10; g++) opts += '<option' + (String(g) === String(last.grade) ? ' selected' : '') + '>' + g + '</option>';
    openModal('<h3>🏅 ' + esc(t('certTitle')) + '</h3>' +
      '<div class="cert-form">' +
      '<label class="fld">' + esc(t('childName')) + ' *<input id="cName" maxlength="40" autocomplete="off"></label>' +
      '<label class="fld">' + esc(t('schoolName')) + ' *<input id="cSchool" maxlength="70" value="' + esc(last.school) + '"></label>' +
      '<label class="fld">' + esc(t('gradeLbl')) + ' *<select id="cGrade">' + opts + '</select></label></div>' +
      '<canvas id="certCanvas" width="1754" height="1240"></canvas>' +
      '<div class="row"><button type="button" class="btn primary" id="cDl">⬇ ' + esc(t('downloadPng')) + '</button>' +
      '<button type="button" class="btn" id="cPrint">🖨 ' + esc(t('printPdf')) + '</button></div>' +
      '<p class="err" id="cErr" hidden></p>', true);
    ['#cName', '#cSchool', '#cGrade'].forEach(function (s) { $(s).addEventListener('input', drawCert); });
    var ready = document.fonts && document.fonts.load ?
      Promise.all([document.fonts.load('800 60px "Baloo Tamma 2"', 'ಕನ್ನಡ Aa'), document.fonts.load('400 30px "Noto Sans Kannada"', 'ಕನ್ನಡ Aa')]) : Promise.resolve();
    ready.then(drawCert, drawCert);
    drawCert();
    function valid() {
      var ok = $('#cName').value.trim() && $('#cSchool').value.trim() && $('#cGrade').value;
      $('#cErr').textContent = t('needCert'); $('#cErr').hidden = !!ok;
      if (ok) store.set('cert', { school: $('#cSchool').value.trim(), grade: $('#cGrade').value });
      return ok;
    }
    $('#cDl').onclick = function () {
      if (!valid()) return;
      drawCert();
      var a = document.createElement('a');
      a.href = $('#certCanvas').toDataURL('image/png');
      a.download = 'Vidyadeepa_Certificate_' + $('#cName').value.trim().replace(/\s+/g, '_') + '.png';
      document.body.appendChild(a); a.click(); a.remove();
    };
    $('#cPrint').onclick = function () {
      if (!valid()) return;
      drawCert();
      var url = $('#certCanvas').toDataURL('image/png');
      var w = window.open('', '_blank');
      if (!w) { toast(t('popupBlocked')); return; }
      w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(t('certHeading')) + '</title>' +
        '<style>@page{size:A4 landscape;margin:0}html,body{margin:0}img{width:100%;display:block}</style></head>' +
        '<body><img src="' + url + '" onload="setTimeout(function(){print()},300)"></body></html>');
      w.document.close();
    };
  }

  function wrapText(x, text, cx, y, maxW, lh) {
    var words = String(text).split(' '), line = '', lines = [];
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (x.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
    });
    if (line) lines.push(line);
    lines.forEach(function (l, i) { x.fillText(l, cx, y + i * lh); });
    return lines.length;
  }
  function fitText(x, text, cx, y, maxW, weight, size, family) {
    var s = size;
    do { x.font = weight + ' ' + s + 'px ' + family; s -= 4; } while (x.measureText(text).width > maxW && s > 24);
    x.fillText(text, cx, y);
  }

  function drawCert() {
    var c = $('#certCanvas'); if (!c) return;
    var x = c.getContext('2d'), W = c.width, H = c.height;
    var HEAD = '"Baloo Tamma 2", "Noto Sans Kannada", sans-serif', BODY = '"Noto Sans Kannada", "Baloo Tamma 2", sans-serif';
    var name = $('#cName').value.trim() || t('childNamePh');
    var school = $('#cSchool').value.trim() || '__________________';
    var grade = $('#cGrade').value || '____';

    x.clearRect(0, 0, W, H);
    x.fillStyle = '#fffdf6'; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 300, 10, W / 2, 300, 700);
    glow.addColorStop(0, 'rgba(0,174,239,.35)'); glow.addColorStop(1, 'rgba(0,174,239,0)');
    x.fillStyle = glow; x.fillRect(0, 0, W, H);

    x.lineWidth = 28; x.strokeStyle = '#1f3a78'; x.strokeRect(30, 30, W - 60, H - 60);
    x.lineWidth = 6; x.strokeStyle = '#00aeef'; x.strokeRect(70, 70, W - 140, H - 140);
    x.lineWidth = 2; x.strokeRect(86, 86, W - 172, H - 172);
    [[86, 86], [W - 86, 86], [86, H - 86], [W - 86, H - 86]].forEach(function (p) {
      x.save(); x.translate(p[0], p[1]); x.rotate(Math.PI / 4); x.fillStyle = '#0b5e9c'; x.fillRect(-16, -16, 32, 32); x.restore();
    });
    if (LOGOS.left) drawLogo(x, LOGOS.left, 270, 270, 240, 240);
    if (LOGOS.right) drawLogo(x, LOGOS.right, W - 270, 270, 240, 240);

    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    x.fillStyle = '#1f3a78'; x.font = '600 28px ' + BODY;
    wrapText(x, t('org'), W / 2, 200, W - 840, 40);
    x.fillStyle = '#0b5e9c'; x.font = '800 88px ' + HEAD; x.fillText(t('certHeading'), W / 2, 425);
    x.fillStyle = '#444'; x.font = '400 34px ' + BODY; x.fillText(t('certPresented'), W / 2, 500);
    x.fillStyle = '#14213d'; fitText(x, name, W / 2, 615, W - 520, '800', 96, HEAD);
    x.strokeStyle = '#00aeef'; x.lineWidth = 3; x.beginPath(); x.moveTo(W / 2 - 430, 645); x.lineTo(W / 2 + 430, 645); x.stroke();
    x.fillStyle = '#333'; fitText(x, t('gradeLbl') + ': ' + grade + '     ' + t('schoolName') + ': ' + school, W / 2, 712, W - 400, '600', 38, BODY);
    x.fillStyle = '#444'; x.font = '400 34px ' + BODY;
    wrapText(x, t('certBody'), W / 2, 790, W - 560, 50);
    x.fillStyle = '#1f3a78'; x.font = '700 40px ' + HEAD; x.fillText('“' + t('tagline') + '”', W / 2, 965);

    x.strokeStyle = '#666'; x.lineWidth = 2;
    [[430], [W - 430]].forEach(function (p) { x.beginPath(); x.moveTo(p[0] - 200, 1050); x.lineTo(p[0] + 200, 1050); x.stroke(); });
    x.fillStyle = '#333'; x.font = '600 28px ' + BODY;
    x.fillText(t('sigHT'), 430, 1092); x.fillText(t('sigCT'), W - 430, 1092);
    x.fillText(t('dateLbl') + ': ' + fmt(new Date(), { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 1092);
  }

  /* ---------- downloads ---------- */
  var PRINT_CSS = "body{font-family:'Noto Sans Kannada',sans-serif;margin:24px;color:#14213d}" +
    "h1,h2{font-family:'Baloo Tamma 2','Noto Sans Kannada',sans-serif;margin:.1em 0}h1{color:#0b5e9c;font-size:26px}h2{color:#1f3a78;font-size:20px}" +
    ".org{color:#1f3a78;font-weight:700;margin:0;font-size:13px}.tag{color:#0b5e9c;font-weight:700}" +
    "table{width:100%;border-collapse:collapse;margin:10px 0 14px;font-size:12.5px}th,td{border:1px solid #888;padding:7px;vertical-align:top;text-align:left}" +
    "th{background:#1f3a78;color:#fff}td.blank{height:78px}ul{margin:0;padding-left:16px}" +
    ".page{page-break-after:always;padding-bottom:10px}.page:last-child{page-break-after:auto}" +
    ".bar{position:sticky;top:0;text-align:right;margin-bottom:10px;background:#fff;padding:6px 0}" +
    ".bar button{font-size:16px;padding:8px 16px;background:#1f3a78;color:#fff;border:0;border-radius:8px;cursor:pointer}" +
    ".fields{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 24px;margin:14px 0}.fields div{border-bottom:1px solid #555;padding:8px 0 4px;font-weight:600}" +
    "@media print{.bar{display:none}body{margin:12mm}}@page{size:A4 landscape}";

  function printWindow(title, body) {
    var w = window.open('', '_blank');
    if (!w) { toast(t('popupBlocked')); return; }
    w.document.write('<!DOCTYPE html><html lang="' + state.lang + '"><head><meta charset="utf-8"><title>' + esc(title) + '</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@700;800&family=Noto+Sans+Kannada:wght@400;700&display=swap" rel="stylesheet">' +
      '<style>' + PRINT_CSS + '</style></head><body><div class="bar"><button onclick="print()">🖨 ' + esc(t('printPdf')) + '</button></div>' + body + '</body></html>');
    w.document.close();
  }

  function uniqueMonths() { var seen = []; WEEKS.forEach(function (w) { if (seen.indexOf(w.month) < 0) seen.push(w.month); }); return seen; }

  function printFull() {
    var body = '';
    uniqueMonths().forEach(function (mk) {
      GRADES.forEach(function (g) {
        var rows = '';
        WEEKS.forEach(function (w, i) {
          if (w.month !== mk) return;
          var a = actFor(i, g);
          rows += '<tr><td>' + w.week + '</td><td>' + esc(dateRange(i)) + '</td><td><b>' + a.icon + ' ' + esc(L(a.title)) + '</b></td><td>' + esc(L(a.theme)) + '</td><td>' + esc(L(a.desc)) +
            '</td><td><ul>' + LA(a.res).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></td></tr>';
        });
        body += '<section class="page"><p class="org">' + esc(t('org')) + '</p><h1>' + esc(t('calTitle')) + '</h1>' +
          '<h2>' + esc(fmt(parseISO(mk + '-01'), { month: 'long', year: 'numeric' })) + ' – ' + esc(t('grades')) + ' ' + gradeText(g) + '</h2>' +
          '<table><tr><th>' + esc(t('colWeek')) + '</th><th>' + esc(t('colDates')) + '</th><th>' + esc(t('colAct')) + '</th><th>' + esc(t('colTheme')) + '</th><th>' + esc(t('colDesc')) + '</th><th>' + esc(t('colRes')) + '</th></tr>' + rows + '</table>' +
          '<p>' + esc(t('everyWeek')) + '</p><p class="tag">“' + esc(t('tagline')) + '”</p></section>';
      });
    });
    printWindow(t('calTitle'), body);
  }

  function printBlank() {
    var rows = '';
    for (var k = 1; k <= 5; k++) rows += '<tr><td>' + esc(t('week')) + ' ' + k + '</td><td class="blank"></td><td class="blank"></td><td class="blank"></td><td class="blank"></td><td class="blank"></td><td class="blank"></td></tr>';
    var body = '<section class="page"><p class="org">' + esc(t('org')) + '</p><h1>' + esc(t('calTitle')) + '</h1>' +
      '<div class="fields"><div>' + esc(t('fSchool')) + ':</div><div>' + esc(t('fCluster')) + ':</div><div>' + esc(t('fTeacher')) + ':</div>' +
      '<div>' + esc(t('fMonth')) + ':</div><div>' + esc(t('fYear')) + ':</div><div>' + esc(t('fGrade')) + ':</div></div>' +
      '<table><tr><th>' + esc(t('colWeek')) + '</th><th>' + esc(t('colDates')) + '</th><th>' + esc(t('colAct')) + '</th><th>' + esc(t('colTheme')) + '</th><th>' + esc(t('colDesc')) + '</th><th>' + esc(t('colRes')) + '</th><th>' + esc(t('colDone')) + '</th></tr>' + rows + '</table>' +
      '<p>' + esc(t('blankNote')) + '</p><p class="tag">“' + esc(t('tagline')) + '”</p></section>';
    printWindow(t('calTitle'), body);
  }

  function csvCell(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }
  function downloadCSV(name, rows) {
    var text = '\ufeff' + rows.map(function (r) { return r.map(csvCell).join(','); }).join('\r\n');
    var blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function csvHeader() { return [t('colMonth'), t('colGrade'), t('colWeek'), t('colStart'), t('colEnd'), t('colTheme'), t('colAct'), t('colDesc'), t('colRes'), t('colSteps')]; }
  function csvFull() {
    var rows = [csvHeader()];
    GRADES.forEach(function (g) {
      WEEKS.forEach(function (w, i) {
        var a = actFor(i, g);
        rows.push([w.month, gradeText(g), w.week, w.start, w.end, L(a.theme), L(a.title), L(a.desc), LA(a.res).join('; '), LA(a.steps).join(' | ')]);
      });
    });
    downloadCSV('Vidyadeepa_Calendar_' + state.lang + '.csv', rows);
  }
  function csvBlank() {
    var rows = [csvHeader()];
    GRADES.forEach(function (g) { for (var k = 1; k <= 4; k++) rows.push(['', gradeText(g), k, '', '', '', '', '', '', '']); });
    downloadCSV('Vidyadeepa_Blank_Format_' + state.lang + '.csv', rows);
  }
  function openDownload(kind) {
    var full = kind === 'full';
    openModal('<h3>' + (full ? '📅 ' + esc(t('dlCalendar')) : '📝 ' + esc(t('dlFormat'))) + '</h3><p>' + esc(t(full ? 'dlFullHint' : 'dlBlankHint')) + '</p>' +
      '<div class="row"><button type="button" class="btn primary" id="dlPdf">🖨 ' + esc(t('printPdf')) + '</button>' +
      '<button type="button" class="btn" id="dlCsv">📊 ' + esc(t('excelCsv')) + '</button></div>');
    $('#dlPdf').onclick = full ? printFull : printBlank;
    $('#dlCsv').onclick = full ? csvFull : csvBlank;
  }

  /* ---------- photo wall ---------- */
  function placeholder(n) {
    var sky = ['#cfe8ff', '#ffe9c7', '#dff3e4'][n % 3];
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="' + sky + '"/>' +
      '<g fill="#fff"><ellipse cx="110" cy="80" rx="40" ry="18"/><ellipse cx="140" cy="70" rx="30" ry="20"/><ellipse cx="290" cy="60" rx="34" ry="14"/></g>' +
      '<path d="M0 220 Q100 170 200 210 T400 200 V300 H0Z" fill="#a8cf6a"/><path d="M0 250 Q120 210 240 245 T400 240 V300 H0Z" fill="#6f9a2f"/>' +
      '<text x="200" y="160" text-anchor="middle" font-size="44">📷</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function allPhotos() { return state.serverPhotos.concat(store.get('photos', [])); }
  function renderSpots(animate) {
    var spots = $('#spots');
    if (!spots.children.length) {
      spots.innerHTML = [0, 1, 2].map(function (n) { return '<figure class="spot s' + n + '"><img alt=""><figcaption></figcaption></figure>'; }).join('');
    }
    var list = allPhotos(), len = list.length;
    $$('#spots .spot').forEach(function (fig, n) {
      var p = null;
      if (len >= 3) p = list[(state.slide * 3 + n) % len];
      else if (n < len) p = list[(state.slide + n) % len];
      var src = p ? p.src : placeholder(n);
      var cap = p ? '🏫 ' + esc(p.school) + (p.date ? '<small>' + esc(p.date) + '</small>' : '') : esc(t('photoHere'));
      var img = fig.querySelector('img'), fc = fig.querySelector('figcaption');
      if (img.getAttribute('src') === src) { fc.innerHTML = cap; return; }
      var apply = function () { img.src = src; img.alt = p ? p.school : ''; fc.innerHTML = cap; fig.classList.remove('fade'); };
      if (animate) { fig.classList.add('fade'); setTimeout(apply, 350); } else apply();
    });
  }
  function loadServerPhotos() {
    if (!CFG.uploadUrl) return;
    fetch(CFG.uploadUrl + (CFG.uploadUrl.indexOf('?') < 0 ? '?' : '&') + 'action=list')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.ok && j.photos) {
          state.serverPhotos = j.photos.map(function (p) { return { src: p.url, school: p.school, date: String(p.date || '').slice(0, 10) }; });
          renderSpots(true);
        }
      })
      .catch(function (e) { console.warn('Photo list not loaded', e); });
  }
  function compress(file, max, q) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () {
          var s = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
          c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL('image/jpeg', q));
        };
        im.onerror = rej; im.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }
  function openUpload() {
    openModal('<h3>📷 ' + esc(t('upload')) + '</h3>' +
      '<label class="fld">' + esc(t('schoolName')) + ' *<input id="uSchool" maxlength="70" value="' + esc(store.get('school', '')) + '"></label>' +
      '<label class="fld">' + esc(t('yourName')) + '<input id="uName" maxlength="40"></label>' +
      '<label class="fld">' + esc(t('photo')) + ' *<input id="uFile" type="file" accept="image/*"></label>' +
      '<img id="uPrev" class="u-prev" hidden alt="">' +
      '<label class="check"><input type="checkbox" id="uOk"><span>' + esc(t('consent')) + '</span></label>' +
      '<div class="row"><button type="button" class="btn primary" id="uSend">⬆ ' + esc(t('uploadNow')) + '</button></div>' +
      '<p class="hint" id="uMsg"></p>' +
      (CFG.uploadUrl ? '' : '<p class="hint warn">' + esc(t('localOnly')) + '</p>'));
    var dataUrl = null, btn = $('#uSend');
    function say(m) { $('#uMsg').textContent = m; }
    $('#uFile').onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      compress(f, CFG.uploadUrl ? 1280 : 800, CFG.uploadUrl ? 0.8 : 0.7).then(function (d) { dataUrl = d; $('#uPrev').src = d; $('#uPrev').hidden = false; }, function () { say(t('needPhoto')); });
    };
    btn.onclick = function () {
      var school = $('#uSchool').value.trim();
      if (!school) return say(t('needSchool'));
      if (!dataUrl) return say(t('needPhoto'));
      if (!$('#uOk').checked) return say(t('needConsent'));
      store.set('school', school);
      var rec = { school: school, name: $('#uName').value.trim(), grade: state.grade, week: WEEKS[state.cur].start, date: iso(new Date()) };
      if (CFG.uploadUrl) {
        btn.disabled = true; say(t('uploading'));
        rec.mime = 'image/jpeg'; rec.image = dataUrl.split(',')[1];
        fetch(CFG.uploadUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(rec) })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (!j || !j.ok) throw new Error((j && j.error) || 'error');
            say(j.approved ? t('uploadedLive') : t('uploadedReview'));
            if (j.approved) loadServerPhotos();
          })
          .catch(function (err) { say(t('uploadFail') + ' (' + err.message + ')'); btn.disabled = false; });
      } else {
        var local = store.get('photos', []);
        local.unshift({ src: dataUrl, school: school, date: rec.date });
        while (local.length > 8) local.pop();
        while (!store.set('photos', local) && local.length > 1) local.pop();
        say(t('savedLocal')); state.slide = 0; renderSpots(true);
        btn.disabled = true;
      }
    };
  }

  /* ---------- help tour ---------- */
  var TOUR = ['.lang', '#tourGrade', '#tourWeekNav', '#dayStrip', '#heroCard', '#monthPanel', '#downloadPanel', '#photoWall', '#helpBtn'];
  var step = 0;
  function startTour() { step = 0; $('#tour').hidden = false; showStep(); }
  function endTour() { $('#tour').hidden = true; store.set('toured', true); }
  function showStep() {
    var el = $(TOUR[step]); if (!el) return endTour();
    $('#tourText').textContent = t('tour' + (step + 1));
    $('#tourCount').textContent = (step + 1) + ' / ' + TOUR.length;
    $('#tourPrev').textContent = t('tourPrev'); $('#tourPrev').disabled = step === 0;
    $('#tourNext').textContent = step === TOUR.length - 1 ? t('tourDone') : t('tourNext');
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(placeTour, 400);
  }
  function placeTour() {
    if ($('#tour').hidden) return;
    var el = $(TOUR[step]); if (!el) return;
    var r = el.getBoundingClientRect(), pad = 8, hole = $('#tourHole'), tip = $('#tourTip');
    hole.style.top = (r.top - pad) + 'px'; hole.style.left = (r.left - pad) + 'px';
    hole.style.width = (r.width + pad * 2) + 'px'; hole.style.height = (r.height + pad * 2) + 'px';
    var tw = tip.offsetWidth, th = tip.offsetHeight, vh = window.innerHeight, vw = window.innerWidth;
    var top = r.bottom + 16;
    if (top + th > vh - 10) top = r.top - th - 16;
    if (top < 10) top = Math.max(10, vh - th - 10);
    var left = Math.min(Math.max(10, r.left), vw - tw - 10);
    tip.style.top = top + 'px'; tip.style.left = left + 'px';
  }
  $('#tourNext').onclick = function () { if (step < TOUR.length - 1) { step++; showStep(); } else endTour(); };
  $('#tourPrev').onclick = function () { if (step > 0) { step--; showStep(); } };
  $('#tourClose').onclick = endTour;
  window.addEventListener('resize', placeTour);
  window.addEventListener('scroll', placeTour, { passive: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('#tour').hidden) endTour(); });

  /* ---------- wiring ---------- */
  function renderAll() { applyI18n(); renderDays(); renderHero(); renderMonth(); renderSpots(false); }

  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { state.lang = b.dataset.lang; store.set('lang', state.lang); renderAll(); if (!$('#tour').hidden) showStep(); }); });
  $$('[data-grade]').forEach(function (b) { b.addEventListener('click', function () { state.grade = b.dataset.grade; store.set('grade', state.grade); renderAll(); }); });
  $('#lastWeekBtn').onclick = function () { var i = state.cur - 1; if (i < 0) showInfo(t('lastWeek'), t('noPrev')); else openActivity(i, t('lastWeek')); };
  $('#nextWeekBtn').onclick = function () { var i = state.cur + 1; if (i >= WEEKS.length) showInfo(t('nextWeek'), t('noNext')); else openActivity(i, t('nextWeek')); };
  $('#thisWeekBtn').onclick = function () {
    var h = $('#heroCard'); h.scrollIntoView({ block: 'center', behavior: 'smooth' });
    h.classList.remove('pulse'); void h.offsetWidth; h.classList.add('pulse'); h.focus({ preventScroll: true });
  };
  $('#prevMonth').onclick = function () { state.viewMonth = new Date(state.viewMonth.getFullYear(), state.viewMonth.getMonth() - 1, 1); renderMonth(); };
  $('#nextMonth').onclick = function () { state.viewMonth = new Date(state.viewMonth.getFullYear(), state.viewMonth.getMonth() + 1, 1); renderMonth(); };
  $('#dlCalendarBtn').onclick = function () { openDownload('full'); };
  $('#dlFormatBtn').onclick = function () { openDownload('blank'); };
  $('#certBtn').onclick = openCert;
  $('#uploadBtn').onclick = openUpload;
  $('#helpBtn').onclick = startTour;

  computeCurrent();
  renderAll();
  loadServerPhotos();
  setInterval(function () { state.slide++; renderSpots(true); }, (CFG.slideSeconds || 10) * 1000);
  setInterval(loadServerPhotos, 5 * 60 * 1000);
  if (!store.get('toured', false)) setTimeout(function () { toast(t('welcome'), 6000); }, 1200);
})();