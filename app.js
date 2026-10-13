/* IGCSE Computer Science 9 with Mr. Gilbert — app logic (no frameworks, works on GitHub Pages)
   Based on the Grade 8 Computing site, with locked-down tests (see EXAM INTEGRITY below). */
(function () {
  "use strict";
  const C = window.CONFIG, UNITS = window.UNITS, BANK = window.BANK, GENS = window.GENERATORS, OBJ = window.OBJECTIVES;
  const { shuffle, pick } = window.QUtil;
  const $ = s => document.querySelector(s);
  const view = $("#view");
  const AV = window.TEACHER_AVATAR || "mr-gilbert.png";
  const T = C.teacherName || "Mr. Gilbert";
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- dates ---------------- */
  const parseD = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const dayKey = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = () => startOfDay(new Date());
  const fmtD = (d, o) => d.toLocaleDateString(undefined, o || { day: "numeric", month: "short" });
  const fmtDT = iso => new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const fmtTime = secs => { secs = Math.round(secs || 0); const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60); return h ? `${h} h ${m} min` : m ? `${m} min` : `${secs % 60} s`; };
  const hours = secs => (secs / 3600).toFixed(1);

  /* ---------------- content index ---------------- */
  const TOPICS = {}; const UNIT_OF = {};
  UNITS.forEach(u => u.topics.forEach(t => { TOPICS[t.id] = t; UNIT_OF[t.id] = u; }));
  const unitById = id => UNITS.find(u => u.id === id);
  const semUnits = sem => UNITS.filter(u => u.semester === sem);
  const semTopics = sem => semUnits(sem).flatMap(u => u.topics);

  /* ---------------- storage ---------------- */
  const KEY = "igcse9_tracker_v1";
  let DB = { profiles: {}, current: null };
  try { DB = JSON.parse(localStorage.getItem(KEY)) || DB; } catch (e) { /* private mode */ }
  let P = null; // current profile
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { } };
  const newProfile = (name, cls) => ({ id: "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, cls, created: new Date().toISOString(), attempts: [], read: {}, tasks: [], time: { days: {}, topics: {}, total: 0 }, outbox: [], lastSync: null, sem: null, active: null });
  function useProfile(id) { DB.current = id; P = DB.profiles[id]; if (P) { P.time = P.time || { days: {}, topics: {}, total: 0 }; P.outbox = P.outbox || []; } save(); }

  /* ---------------- schedule ---------------- */
  function schedule(sem) {
    const s = C.semesters.find(x => x.id === sem); if (!s) return [];
    let prev = null;
    return (C.weeklyPlan[sem] || []).map(w => {
      const start = w.start ? parseD(w.start) : prev ? addDays(prev, 7) : parseD(s.start); prev = start;
      const fri = addDays(start, 4); let assess;
      if (w.exam) { const us = w.exam.units.map(unitById).filter(Boolean); assess = { id: w.exam.id, kind: "exam", title: w.exam.title, sub: "Covers " + us.map(u => "Chapter " + u.num).join(", "), date: fri, topics: us.flatMap(u => u.topics.map(t => t.id)), n: w.exam.n || C.questionsPerExam, sem }; }
      else if (w.test) { assess = { id: w.test.id, kind: "unit", title: w.test.title, sub: w.test.topics.map(id => TOPICS[id] ? id + " " + TOPICS[id].title : id).join(" · "), date: fri, topics: w.test.topics, n: w.test.n || C.questionsPerUnitTest, sem }; }
      else if (w.unitTest) { const u = unitById(w.unitTest); assess = { id: "UT-" + w.unitTest, kind: "unit", title: `End of chapter ${u.num} test`, sub: u.title, date: fri, topics: u.topics.map(t => t.id), n: C.questionsPerUnitTest, sem }; }
      else assess = { id: `SC-${sem}-${w.week}`, kind: "spot", title: `Week ${w.week} spot check`, sub: w.topics.map(id => TOPICS[id] ? TOPICS[id].title : id).join(" · "), date: fri, topics: w.topics, n: C.questionsPerSpot, sem };
      return Object.assign({}, w, { start, end: addDays(start, 6), fri, assess, sem });
    });
  }
  const allAssess = () => [1, 2].flatMap(s => schedule(s).map(w => w.assess));
  const assessById = id => allAssess().find(a => a.id === id);
  function currentWeek(sem) {
    const ws = schedule(sem), t = today(); if (!ws.length) return null;
    if (t < ws[0].start) return Object.assign({ state: "before" }, ws[0]);
    const w = ws.find(w => t >= w.start && t <= w.end); if (w) return Object.assign({ state: "now" }, w);
    const past = ws.filter(w => w.start <= t); return Object.assign({ state: "after" }, past[past.length - 1] || ws[ws.length - 1]);
  }
  function defaultSem() { const s2 = C.semesters.find(s => s.id === 2); return s2 && today() >= addDays(parseD(s2.start), -14) ? 2 : 1; }
  const sem = () => (P && P.sem) || defaultSem();

  /* ---------------- progress helpers ---------------- */
  const attemptsFor = q => (P ? P.attempts.filter(a => a.quiz === q) : []);
  const best = q => { const a = attemptsFor(q); return a.length ? Math.max(...a.map(x => x.pct)) : null; };
  const passed = topicId => { const b = best("T:" + topicId); return b != null && b >= C.passMark; };
  function topicState(id) { const b = best("T:" + id); if (b == null) return P && P.read[id] ? "read" : "new"; return b >= C.passMark ? "passed" : "retry"; }
  const stateTag = id => { const s = topicState(id), b = best("T:" + id); return s === "passed" ? `<span class="tag sm good">✓ Passed ${b}%</span>` : s === "retry" ? `<span class="tag sm warn">Best ${b}% · retry</span>` : s === "read" ? `<span class="tag sm">Read · quiz next</span>` : `<span class="tag sm">Not started</span>`; };
  function assessOpen(a) { if (today() >= startOfDay(a.date)) return true; return a.kind !== "exam" && C.openSpotEarly && a.topics.every(id => attemptsFor("T:" + id).length > 0); }
  function weekStatus(w) { const t = today(); const done = w.topics.length ? w.topics.every(passed) : attemptsFor("A:" + w.assess.id).length > 0; if (done) return "done"; if (w.end < t) return "overdue"; if (w.start <= t) return "current"; return "upcoming"; }
  const kindName = k => k === "unit" ? "End-unit test" : k === "exam" ? "Exam" : k === "topic" ? "Topic quiz" : "Spot check";
  function trend(vals) {
    const n = vals.length; if (n < 2) return { slope: 0, at: i => vals[0] || 0 };
    const xs = vals.map((_, i) => i), mx = (n - 1) / 2, my = vals.reduce((a, b) => a + b, 0) / n;
    let num = 0, den = 0; xs.forEach((x, i) => { num += (x - mx) * (vals[i] - my); den += (x - mx) ** 2; });
    const slope = den ? num / den : 0, b = my - slope * mx; return { slope, at: i => Math.max(0, Math.min(100, b + slope * i)) };
  }
  const trendLabel = s => s > 2 ? `<span class="up">▲ Improving</span>` : s < -2 ? `<span class="down">▼ Declining</span>` : `<span class="flat">● Steady</span>`;

  /* ---------------- time tracking ---------------- */
  let lastActive = Date.now(), activeSinceBeat = 0, lastVideo = 0;
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach(ev => window.addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (!P || document.visibilityState !== "visible" || (Date.now() - lastActive > 120000 && Date.now() - lastVideo > 1200000)) return;
    const k = dayKey(new Date()); P.time.days[k] = (P.time.days[k] || 0) + 10; P.time.total = (P.time.total || 0) + 10;
    const m = location.hash.match(/^#(?:topic|quiz\/T)\/(.+)$/); if (m) { const id = decodeURIComponent(m[1]); P.time.topics[id] = (P.time.topics[id] || 0) + 10; }
    activeSinceBeat += 10; if (activeSinceBeat >= 600) { activeSinceBeat = 0; queueActivity(); }
    save();
  }, 10000);

  /* ---------------- Google Sheets sync ---------------- */
  let flushing = false;
  function summary() {
    const all = P.attempts; const avg = all.length ? Math.round(all.reduce((a, b) => a + b.pct, 0) / all.length) : 0;
    const passedCount = Object.keys(TOPICS).filter(passed).length;
    return { studentId: P.id, name: P.name, cls: P.cls, totalHours: +hours(P.time.total || 0), attemptsCount: all.length, averagePct: avg, topicsPassed: passedCount, topicsTotal: Object.keys(TOPICS).length };
  }
  function queue(item) { if (!C.googleSheetsUrl) return; P.outbox.push(item); save(); flush(); }
  function queueActivity() { if (!C.googleSheetsUrl || !P) return; P.outbox = P.outbox.filter(o => o.type !== "activity"); queue(Object.assign({ type: "activity", date: new Date().toISOString() }, summary())); }
  async function flush() {
    if (!C.googleSheetsUrl || flushing || !P || !navigator.onLine) { syncDot(); return; } flushing = true;
    while (P.outbox.length) {
      try { await fetch(C.googleSheetsUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(P.outbox[0]) }); P.outbox.shift(); P.lastSync = new Date().toISOString(); save(); }
      catch (e) { break; }
    }
    flushing = false; syncDot();
  }
  function syncDot() { $("#syncDot").hidden = !(P && P.outbox && P.outbox.length); }
  window.addEventListener("online", flush);
  window.addEventListener("pagehide", () => { if (C.googleSheetsUrl && P && navigator.sendBeacon) { try { navigator.sendBeacon(C.googleSheetsUrl, new Blob([JSON.stringify(Object.assign({ type: "activity", date: new Date().toISOString() }, summary()))], { type: "text/plain" })); } catch (e) { } } });

  /* ---------------- UI helpers ---------------- */
  function toast(msg, ms = 3200) { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }
  function modal(html, onMount) { const o = document.createElement("div"); o.className = "overlay"; o.innerHTML = `<div class="modal">${html}</div>`; document.body.appendChild(o); const close = () => o.remove(); onMount && onMount(o, close); return close; }
  const tip = $("#tooltip");
  document.addEventListener("mouseover", e => { const el = e.target.closest("[data-tip]"); if (!el) { tip.style.display = "none"; return; } tip.innerHTML = el.getAttribute("data-tip"); tip.style.display = "block"; });
  document.addEventListener("mousemove", e => { if (tip.style.display === "block") { tip.style.left = Math.min(e.clientX + 14, innerWidth - 250) + "px"; tip.style.top = (e.clientY + 14) + "px"; } });
  const initials = n => n.split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join("") || "?";

  function chrome(route) {
    $("#brandName").textContent = C.siteName; $("#brandSub").textContent = C.subtitle;
    document.querySelectorAll("img.mr-g").forEach(i => { if (i.getAttribute("src") !== AV) i.src = AV; });
    $("#syncBtn").hidden = !C.googleSheetsUrl;
    document.querySelectorAll("#menu a").forEach(a => a.classList.toggle("on", a.dataset.r === route));
    $("#semToggle").innerHTML = C.semesters.map(s => `<button data-sem="${s.id}" class="${sem() === s.id ? "on" : ""}">${esc(s.name)}</button>`).join("");
    if (P) { $("#avatar").textContent = initials(P.name); $("#whoName").textContent = P.name; $("#whoRole").textContent = "Student · " + P.cls; }
    $("#sidebar").classList.remove("open"); syncDot();
  }
  $("#semToggle").addEventListener("click", e => { const b = e.target.closest("button"); if (!b || !P) return; if (QZ && !QZ.done) return toast("Finish your quiz first."); P.sem = +b.dataset.sem; save(); render(); });
  $("#hamburger").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#sideFoot").addEventListener("click", profileModal);
  $("#syncBtn").addEventListener("click", syncModal);

  /* ---------------- router ---------------- */
  let QZ = null, ignoreHash = false;
  let quizHash = "";
  window.addEventListener("hashchange", () => {
    if (ignoreHash) { ignoreHash = false; return; }
    if (QZ && !QZ.done && location.hash !== quizHash) { ignoreHash = true; location.hash = quizHash; toast("Finish the test first — you can't leave it part-way."); return; }
    render();
  });
  window.addEventListener("beforeunload", e => { if (QZ && !QZ.done) { e.preventDefault(); e.returnValue = ""; } });

  function render() {
    const h = decodeURIComponent(location.hash.slice(1) || "home"); const [r, a, b] = h.split("/");
    if (r === "teacher") { chrome("teacher"); $("#crumb").textContent = "Teacher tools"; return vTeacher(); }
    if (!P) { loginModal(); return; }
    window.scrollTo(0, 0);
    const crumb = t => $("#crumb").textContent = t;
    switch (r) {
      case "plan": chrome("plan"); crumb("Weekly plan"); return vPlan();
      case "calendar": chrome("calendar"); crumb("Assessments"); return vCalendar(a);
      case "resources": chrome("resources"); crumb("Topics"); return vResources();
      case "topic": chrome("resources"); crumb("Topics / " + a); return vTopic(a);
      case "quiz": chrome(a === "T" ? "resources" : "calendar"); crumb("Quiz"); quizHash = location.hash; return vQuiz(a, b);
      case "results": chrome("results"); crumb("My results"); return vResults(a);
      case "videos": chrome("videos"); crumb("Videos"); return vVideos();
      case "help": chrome("help"); crumb("Help"); return vHelp();
      default: chrome("home"); crumb("Home"); return vHome();
    }
  }

  /* ================= HOME ================= */
  function pendingItems() {
    const s = sem(), ws = schedule(s), t = today(), items = [];
    ws.filter(w => w.start <= t || w === ws[0]).forEach(w => w.topics.forEach(id => {
      if (!TOPICS[id] || passed(id)) return;
      const b = best("T:" + id), overdue = w.end < t;
      items.push({ ic: overdue ? "⏰" : "📖", cls: overdue ? "accent" : "", tt: `${id.replace(/^R/, "")} · ${TOPICS[id].title}`, ds: `Week ${w.week}${overdue ? " · overdue" : ""} · ${b == null ? (P.read[id] ? "Read — now take the quiz" : "Read the topic, then pass the quiz") : `Best ${b}% — reach ${C.passMark}%`}`,
        act: `<a class="btn sm" href="#topic/${encodeURIComponent(id)}">Read</a><a class="btn sm primary" href="#quiz/T/${encodeURIComponent(id)}">Quiz</a>` });
    }));
    ws.map(w => w.assess).filter(a => assessOpen(a) && !attemptsFor("A:" + a.id).length).forEach(a => items.push({ ic: "📝", cls: "accent", tt: a.title, ds: `${kindName(a.kind)} · due ${fmtD(a.date, { weekday: "short", day: "numeric", month: "short" })}`, act: `<a class="btn sm accent" href="#quiz/A/${a.id}">Start</a>` }));
    return items;
  }
  function vHome() {
    const s = sem(), first = P.name.split(" ")[0], hr = new Date().getHours();
    const greet = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
    const pend = pendingItems(), tasks = P.tasks.filter(t => !t.done), open = pend.length + tasks.length;
    const topics = semTopics(s), pct = topics.length ? Math.round(topics.filter(t => passed(t.id)).length / topics.length * 100) : 0;
    const objs = new Set(topics.flatMap(t => t.objectives)), objDone = new Set(topics.filter(t => passed(t.id)).flatMap(t => t.objectives));
    const ws = schedule(s), t = today(), cw = currentWeek(s);
    const upcoming = ws.map(w => w.assess).filter(a => !attemptsFor("A:" + a.id).length && (assessOpen(a) || (a.date >= t && a.date <= addDays(t, 14)))).length;
    const openWeeks = ws.filter(w => w.start <= t && !w.topics.every(passed)).length;
    const wk = Object.entries(P.time.days).filter(([k]) => parseD(k) >= addDays(t, -6)).reduce((a, [, v]) => a + v, 0);
    const sName = esc(C.semesters.find(x => x.id === s).name);
    const nextA = ws.map(w => w.assess).find(a => !attemptsFor("A:" + a.id).length && (assessOpen(a) || a.date >= t));
    view.innerHTML = `
      <div class="hero-row"><div><div class="eyebrow">${sName} · ${esc(P.cls)}</div><h1 class="h-xl">${greet}, ${esc(first)}! 👋</h1><div class="sub">Here's everything you need for Computing this week.</div></div></div>
      <div class="section bubble-wrap"><div class="bubble-face"><img src="${AV}" alt="${esc(T)}"></div><div class="bubble"><div class="who">${esc(T)} says…</div><p>${esc(C.teacherNote.text)}</p></div></div>
      <div class="section grid4">
        <div class="card stat"><div class="head"><span class="ico">🎯</span><a class="link" href="#plan">Plan →</a></div><div class="num">${pct}%</div><div class="lbl">Topics passed</div><div class="cap">${objDone.size} of ${objs.size} objectives covered</div></div>
        <div class="card stat c2"><div class="head"><span class="ico">📝</span><a class="link" href="#calendar">See all →</a></div><div class="num">${upcoming}</div><div class="lbl">Assessments</div><div class="cap">${nextA ? "Next: " + esc(nextA.title) + " · " + fmtD(nextA.date, { weekday: "short", day: "numeric", month: "short" }) : "Open now or due soon"}</div></div>
        <div class="card stat c3"><div class="head"><span class="ico">⏱️</span><a class="link" href="#results">Results →</a></div><div class="num">${hours(P.time.total || 0)}h</div><div class="lbl">Study time</div><div class="cap">${fmtTime(wk)} in the last 7 days</div></div>
        <div class="card stat c4"><div class="head"><span class="ico">🏆</span><a class="link" href="#results">Results →</a></div><div class="num">${P.attempts.length ? Math.max(...P.attempts.map(a => a.pct)) + "%" : "—"}</div><div class="lbl">Best score</div><div class="cap">${P.attempts.length} quiz tr${P.attempts.length === 1 ? "y" : "ies"} so far</div></div>
      </div>
      ${cw ? `<div class="section"><div class="section-head"><div><div class="eyebrow">This week</div><h2 class="h-lg">${cw.state === "before" ? "Coming up first" : cw.state === "after" ? "Last scheduled week" : "What we're learning now"}</h2></div><a class="link" href="#plan">Full plan →</a></div>${nowCard(cw)}</div>` : ""}
      <div class="section card">
        <div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="eyebrow">My to-do list</div><h2 class="h-lg">${open ? open + " thing" + (open === 1 ? "" : "s") + " to do" : "All done! 🎉"}</h2><div class="sub small">Topics to pass, open assessments and your own reminders.</div></div>${open ? `<div class="count-badge">${open}</div>` : ""}</div>
        <form class="task-row" id="taskForm"><input class="input" id="taskIn" placeholder="Add your own reminder (e.g. revise trace tables)" maxlength="120"><button class="btn" type="submit">＋ Add</button></form>
        <div class="items">${pend.map((i, n) => `<div class="item" ${n >= 5 ? 'data-more hidden' : ""}><div class="ic ${i.cls}">${i.ic}</div><div><div class="tt">${esc(i.tt)}</div><div class="ds">${esc(i.ds)}</div></div><div class="act">${i.act}</div></div>`).join("")}
        ${pend.length > 5 ? `<button class="btn sm more-btn" id="moreBtn">Show all ${pend.length} ▾</button>` : ""}
        ${P.tasks.map(tk => `<div class="item ${tk.done ? "done" : ""}"><input type="checkbox" class="chk" data-task="${tk.id}" ${tk.done ? "checked" : ""} aria-label="Done"><div><div class="tt">${esc(tk.text)}</div><div class="ds">My reminder</div></div><div class="act"><button class="btn sm" data-del="${tk.id}" aria-label="Delete">✕</button></div></div>`).join("")}
        ${open === 0 ? `<div class="item"><div class="ic good">✓</div><div><div class="tt">You're all caught up</div><div class="ds">Nice work! Add a reminder whenever you need one.</div></div></div>` : ""}</div>
      </div>
      ${recentMini()}`;
    const mb = $("#moreBtn"); if (mb) mb.onclick = () => { view.querySelectorAll("[data-more]").forEach(x => x.hidden = false); mb.remove(); };
    $("#taskForm").onsubmit = e => { e.preventDefault(); const v = $("#taskIn").value.trim(); if (!v) return; P.tasks.unshift({ id: Date.now().toString(36), text: v, done: false }); save(); vHome(); };
    view.querySelectorAll("[data-task]").forEach(c => c.onchange = () => { const tk = P.tasks.find(x => x.id === c.dataset.task); tk.done = c.checked; save(); vHome(); });
    view.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { P.tasks = P.tasks.filter(x => x.id !== b.dataset.del); save(); vHome(); });
  }
  function nowCard(w) {
    const u = UNIT_OF[w.topics[0]] || null;
    return `<div class="now"><div class="now-head"><div class="now-badge">W${w.week}</div><div style="flex:1"><div class="lbl">${u ? "Chapter " + u.num : "Assessment week"} · ${fmtD(w.start)} – ${fmtD(addDays(w.start, 4))}</div><h3>${esc(u ? u.title : w.assess.title)}</h3></div></div>
      <div class="now-body">${w.topics.map(id => TOPICS[id] ? `<div class="now-topic"><span class="code">${id.replace(/^R/, "")}</span><span class="nm">${esc(TOPICS[id].title)}</span>${stateTag(id)}<a class="btn sm" href="#topic/${encodeURIComponent(id)}">Open →</a></div>` : "").join("")}
      <div class="now-topic"><span class="code">FRI</span><span class="nm">${esc(w.assess.title)}</span>${attemptsFor("A:" + w.assess.id).length ? `<span class="tag sm good">Done ${best("A:" + w.assess.id)}%</span>` : assessOpen(w.assess) ? `<a class="btn sm" href="#quiz/A/${w.assess.id}">Start →</a>` : `<span class="tag sm">Opens ${fmtD(w.assess.date)}</span>`}</div></div></div>`;
  }
  function recentMini() {
    const a = P.attempts.slice(-5).reverse(); if (!a.length) return "";
    return `<div class="section"><div class="section-head"><div><div class="eyebrow">Recent results</div><h2 class="h-lg">My last quiz tries</h2></div><a class="link" href="#results">All results →</a></div>
      <div class="card"><div class="table-wrap"><table class="data-table"><tr><th>Quiz</th><th>Score</th><th>When</th></tr>${a.map(x => `<tr><td>${esc(x.title)}</td><td class="n"><b>${x.pct}%</b> <span class="muted small">(${x.score}/${x.total})</span></td><td class="small muted">${fmtDT(x.date)}</td></tr>`).join("")}</table></div></div></div>`;
  }

  /* ================= WEEKLY PLAN ================= */
  function vPlan() {
    const s = sem(), ws = schedule(s), cw = currentWeek(s);
    const label = { done: '<span class="tag sm good">✓ Complete</span>', overdue: '<span class="tag sm bad">Overdue</span>', current: '<span class="tag sm accent">This week</span>', upcoming: '<span class="tag sm">Upcoming</span>' };
    view.innerHTML = `<div class="eyebrow">${esc(C.semesters.find(x => x.id === s).name)}</div><h1 class="h-xl">Weekly plan 🗓️</h1><div class="sub">What to finish each week: read the topic, watch the videos, then pass its quiz (${C.passMark}% or more). Every Friday there is a spot check, an end-unit test or an exam.</div>
      <div class="section">${ws.map(w => {
        const st = weekStatus(w), done = w.topics.filter(passed).length, isCur = cw && cw.week === w.week && cw.state === "now";
        const u = UNIT_OF[w.topics[0]];
        return `<div class="week ${isCur ? "current open" : ""} ${w.assess.kind === "exam" ? "exam-week" : ""}" data-week><div class="week-h"><div class="week-n">Week ${w.week}</div><div class="week-d"><b>${esc(u ? "Chapter " + u.num + " · " + u.title : "📝 " + w.assess.title)}</b><br>${fmtD(w.start, { weekday: "short", day: "numeric", month: "short" })} – ${fmtD(addDays(w.start, 4), { weekday: "short", day: "numeric", month: "short" })}</div>
          <div class="progress" title="${done}/${w.topics.length} passed"><i style="width:${w.topics.length ? done / w.topics.length * 100 : (st === "done" ? 100 : 0)}%"></i></div>${label[st]}</div>
          <div class="week-b">${w.topics.map(id => { const t = TOPICS[id]; if (!t) return ""; return `<div class="trow"><span class="code">${id.replace(/^R/, "")}</span><div><div class="nm">${esc(t.title)}${t.project ? " 👷" : ""}</div><div class="ob">${t.objectives.slice(0, 6).join(" · ")}${t.objectives.length > 6 ? " …" : ""}${t.pages ? " · pages " + t.pages : ""}</div></div>${stateTag(id)}<div class="acts"><a class="btn sm" href="#topic/${encodeURIComponent(id)}">Read</a><a class="btn sm primary" href="#quiz/T/${encodeURIComponent(id)}">Quiz</a></div></div>`; }).join("")}
          <div class="trow"><span class="code">FRI</span><div><div class="nm">${esc(w.assess.title)} <span class="tag sm ${w.assess.kind === "exam" ? "accent" : ""}">${kindName(w.assess.kind)}</span></div><div class="ob">${w.assess.n} questions · ${esc(w.assess.sub)}</div></div>${attemptsFor("A:" + w.assess.id).length ? `<span class="tag sm good">Best ${best("A:" + w.assess.id)}%</span>` : assessOpen(w.assess) ? '<span class="tag sm accent">Open</span>' : `<span class="tag sm">Opens ${fmtD(w.assess.date)}</span>`}<div class="acts">${assessOpen(w.assess) ? `<a class="btn sm accent" href="#quiz/A/${w.assess.id}">${attemptsFor("A:" + w.assess.id).length ? "Retake" : "Start"}</a>` : ""}</div></div></div></div>`;
      }).join("")}</div>`;
    view.querySelectorAll(".week-h").forEach(h => h.onclick = () => h.parentElement.classList.toggle("open"));
  }

  /* ================= CALENDAR ================= */
  let calMonth = null;
  function vCalendar() {
    const s = sem(), ws = schedule(s);
    if (!calMonth) { const t = today(), first = ws[0] ? ws[0].start : t, last = ws.length ? ws[ws.length - 1].end : t; const base = t < first ? first : t > last ? last : t; calMonth = new Date(base.getFullYear(), base.getMonth(), 1); }
    const y = calMonth.getFullYear(), m = calMonth.getMonth(), firstDow = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    const events = {};
    const push = (d, html) => { const k = dayKey(d); (events[k] = events[k] || []).push(html); };
    [1, 2].forEach(sx => schedule(sx).forEach(w => {
      if (w.topics.length) push(w.start, `<a class="ev topic" href="#plan" data-tip="${esc("Week " + w.week + ": " + w.topics.map(id => TOPICS[id] ? TOPICS[id].title : id).join(", "))}">W${w.week}: ${w.topics.map(id => id.replace(/^R/, "")).join(", ")}</a>`);
      const a = w.assess, done = attemptsFor("A:" + a.id).length;
      push(a.date, `<a class="ev ${done ? "done" : a.kind}" href="${assessOpen(a) ? "#quiz/A/" + a.id : "#calendar"}" data-tip="${esc(a.title + " — " + a.sub)}">${done ? "✓ " : ""}${a.kind === "unit" ? "Unit test" : a.kind === "exam" ? esc(a.title) : "Spot check"}</a>`);
    }));
    let cells = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < firstDow; i++) cells += `<div class="day out"></div>`;
    const tk = dayKey(today());
    for (let d = 1; d <= days; d++) { const k = dayKey(new Date(y, m, d)); cells += `<div class="day ${k === tk ? "today" : ""}"><div class="dn">${d}</div>${(events[k] || []).join("")}</div>`; }
    const list = ws.map(w => w.assess);
    view.innerHTML = `<div class="eyebrow">Calendar</div><h1 class="h-xl">Assessments 📝</h1><div class="sub">Spot checks test that week's topics. End-unit tests cover a whole unit, and exams cover several chapters. Each one opens on its date${C.openSpotEarly ? " (spot checks and tests can open earlier, once you've tried every topic quiz they cover)" : ""}. All of them run in <b>secure test mode</b>.</div>
      <div class="section card"><div class="cal-head"><button class="btn sm" id="prevM" aria-label="Previous month">←</button><h3>${calMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</h3><button class="btn sm" id="todayM">Today</button><button class="btn sm" id="nextM" aria-label="Next month">→</button></div>
        <div class="cal">${cells}</div>
        <div class="legend"><span><i style="background:var(--chip)"></i>Topics start</span><span><i style="background:var(--accent-l)"></i>Spot check</span><span><i style="background:var(--gold)"></i>Unit test</span><span><i style="background:var(--bad)"></i>Exam</span><span><i style="background:var(--good-l)"></i>Completed</span></div></div>
      <div class="section"><div class="eyebrow">${esc(C.semesters.find(x => x.id === s).name)}</div><h2 class="h-lg">Assessment list</h2>
      <div class="card mt"><div class="table-wrap"><table class="data-table"><tr><th>Date</th><th>Assessment</th><th>Covers</th><th>Status</th><th></th></tr>
      ${list.map(a => { const at = attemptsFor("A:" + a.id), op = assessOpen(a); return `<tr><td class="small" style="white-space:nowrap">${fmtD(a.date, { weekday: "short", day: "numeric", month: "short" })}</td><td><b>${esc(a.title)}</b><div class="small muted">${kindName(a.kind)} · ${a.n} questions · timed</div></td><td class="small">${esc(a.sub)}</td>
        <td>${at.length ? `<span class="tag sm good">Best ${best("A:" + a.id)}% · ${at.length} tr${at.length === 1 ? "y" : "ies"}</span>` : op ? '<span class="tag sm accent">Open</span>' : '<span class="tag sm">Locked</span>'}</td>
        <td>${op ? `<a class="btn sm ${at.length ? "" : "accent"}" href="#quiz/A/${a.id}">${at.length ? "Retake" : "Start"}</a>` : ""}</td></tr>`; }).join("")}</table></div></div></div>`;
    $("#prevM").onclick = () => { calMonth = new Date(y, m - 1, 1); vCalendar(); };
    $("#nextM").onclick = () => { calMonth = new Date(y, m + 1, 1); vCalendar(); };
    $("#todayM").onclick = () => { calMonth = new Date(today().getFullYear(), today().getMonth(), 1); vCalendar(); };
  }

  /* ================= RESOURCES ================= */
  function vResources() {
    const s = sem();
    view.innerHTML = `<div class="eyebrow">Library</div><h1 class="h-xl">Topics 📚</h1><div class="sub">Every topic from the Cambridge IGCSE 0478 syllabus, with textbook page references. Read it, watch the videos, then take the quiz.</div>
      <div class="section row"><input class="input search" id="q" placeholder="Search topics, e.g. parity, hexadecimal, sensors…" aria-label="Search topics"><span class="muted small" id="qinfo"></span></div>
      <div class="section" id="units"></div>`;
    const draw = term => {
      term = (term || "").toLowerCase().trim();
      const units = term ? UNITS : semUnits(s); let shown = 0;
      $("#units").innerHTML = units.map(u => {
        const ts = u.topics.filter(t => !term || (t.title + " " + t.summary + " " + t.id + " " + t.objectives.join(" ") + " " + t.reading.replace(/<[^>]+>/g, " ")).toLowerCase().includes(term));
        shown += ts.length; if (!ts.length) return "";
        return `<div class="card unit-card"><div class="uh"><div class="unit-num ${u.id}">${u.num}</div><div><div class="eyebrow">Chapter ${u.num} · Semester ${u.semester}</div><h2 class="h-md">${esc(u.title)}</h2><div class="sub small">${esc(u.blurb)}</div></div></div>
          <div class="topic-list">${ts.map(t => `<a class="tcard" href="#topic/${encodeURIComponent(t.id)}"><span class="code">${t.id.replace(/^R/, "")}${t.pages ? " · p. " + t.pages : ""}</span><span class="nm">${esc(t.title)}${t.project ? " 👷" : ""}</span><span class="ds">${esc(t.summary)}</span><span class="ft">${stateTag(t.id)}<span class="tag sm">${t.objectives.length} LO${t.objectives.length > 1 ? "s" : ""}</span>${topicVideos(t).length ? `<span class="tag sm accent">🎬 ${topicVideos(t).length}</span>` : ""}</span></a>`).join("")}</div></div>`;
      }).join("") || `<div class="empty">No topics match “${esc(term)}”.</div>`;
      $("#qinfo").textContent = term ? `${shown} topic${shown === 1 ? "" : "s"} found (both semesters)` : "";
    };
    draw(); $("#q").oninput = e => draw(e.target.value);
  }
  /* ================= VIDEOS ================= */
  const VID = window.VIDEOS || {}, VSEARCH = window.VIDEO_SEARCH || {};
  function topicVideos(t) {
    const out = [], seen = new Set(), add = (v, obj) => { if (v && v.id && !seen.has(v.id)) { seen.add(v.id); out.push(Object.assign({ obj }, v)); } };
    ((C.topicVideos || {})[t.refId || t.id] || []).forEach(v => add({ id: v.id, title: v.title || "Video", by: v.by || C.teacherName }, "★"));
    t.objectives.forEach(o => (VID[o] || []).forEach(v => add({ id: v[0], title: v[1], by: v[2] }, o)));
    return out;
  }
  const ytSearch = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  function videoCard(v) {
    const w = P.watched && P.watched[v.id];
    return `<div class="vcard"><button class="vthumb" data-play="${esc(v.id)}" aria-label="Play video: ${esc(v.title)}" style="background-image:url('https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg')"><span class="vplay">▶</span></button>
      <div class="vmeta"><div class="row" style="gap:6px"><span class="tag sm ${v.obj === "★" ? "good" : "accent"}">${v.obj === "★" ? "★ " + esc(T) + "'s pick" : esc(v.obj)}</span>${w ? '<span class="tag sm good">✓ Watched</span>' : ""}</div><div class="vtitle">${esc(v.title)}</div><div class="small muted">${esc(v.by || "")}</div></div></div>`;
  }
  view.addEventListener("click", e => {
    const b = e.target.closest("[data-play]"); if (!b) return;
    const id = b.dataset.play; const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`;
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"; f.allowFullscreen = true; f.title = "Video"; f.className = "vframe";
    b.replaceWith(f); lastVideo = Date.now(); lastActive = Date.now();
    P.watched = P.watched || {}; if (!P.watched[id]) { P.watched[id] = new Date().toISOString(); save(); }
  });
  function videoSection(t, limit) {
    const vs = topicVideos(t), missing = t.objectives.filter(o => !(VID[o] || []).length);
    const shown = limit ? vs.slice(0, limit) : vs;
    return `<div class="card vsection"><div class="row" style="justify-content:space-between"><div><div class="eyebrow">🎬 Watch &amp; learn</div><h2 class="h-md">${vs.length ? `${vs.length} video${vs.length === 1 ? "" : "s"} for this topic` : "Videos for this topic"}</h2></div>
        <a class="btn sm" href="${ytSearch(t.title + " IGCSE computer science 0478")}" target="_blank" rel="noopener">🔎 Find more videos ↗</a></div>
      ${vs.length ? `<p class="small muted" style="margin:6px 0 0">Watch these alongside the reading. Each one is linked to a learning objective. Focus on the parts that match the objective.</p><div class="vgrid">${shown.map(videoCard).join("")}</div>${limit && vs.length > limit ? `<button class="btn sm more-btn mt-s" id="moreVids">Show all ${vs.length} videos ▾</button>` : ""}` : ""}
      ${missing.length ? `<div class="small mt-s">${missing.map(o => `<a class="link small" href="${ytSearch(VSEARCH[o] || OBJ[o])}" target="_blank" rel="noopener">🔎 Search videos for ${o} ↗</a>`).join(" &nbsp; ")}</div>` : ""}</div>`;
  }
  function vVideos() {
    const s = sem(), units = semUnits(s);
    const objs = [...new Set(units.flatMap(u => u.topics.flatMap(t => t.objectives)))];
    const total = new Set(objs.flatMap(o => (VID[o] || []).map(v => v[0]))), watched = [...total].filter(id => P.watched && P.watched[id]).length;
    view.innerHTML = `<div class="eyebrow">${esc(C.semesters.find(x => x.id === s).name)}</div><h1 class="h-xl">Videos 🎬</h1><div class="sub">Short video lessons for every learning objective. You've watched <b>${watched}</b> of ${total.size} this semester.</div>
      <div class="section row"><input class="input search" id="vq" placeholder="Search, e.g. binary, parity, CPU…" aria-label="Search videos"></div>
      <div class="section" id="vlist"></div>`;
    const draw = term => {
      term = (term || "").toLowerCase().trim();
      $("#vlist").innerHTML = objs.map(o => {
        const vs = (VID[o] || []).map(v => ({ id: v[0], title: v[1], by: v[2], obj: o }));
        const txt = (o + " " + OBJ[o] + " " + vs.map(v => v.title).join(" ")).toLowerCase(); if (term && !txt.includes(term)) return "";
        return `<div class="card unit-card"><div class="obj" style="border:0;padding:0"><b>${o}</b><span>${esc(OBJ[o] || "")}</span></div>
          ${vs.length ? `<div class="vgrid">${vs.map(videoCard).join("")}</div>` : `<div class="mt-s"><a class="btn sm" href="${ytSearch(VSEARCH[o] || OBJ[o])}" target="_blank" rel="noopener">🔎 Find videos on YouTube ↗</a></div>`}</div>`;
      }).join("") || `<div class="empty">Nothing matches “${esc(term)}”.</div>`;
    };
    draw(); $("#vq").oninput = e => draw(e.target.value);
  }

  function vTopic(id) {
    const t = TOPICS[id]; if (!t) { view.innerHTML = `<div class="empty">Topic not found. <a href="#resources">Back to topics</a></div>`; return; }
    const u = UNIT_OF[id], idx = u.topics.indexOf(t), prev = u.topics[idx - 1], next = u.topics[idx + 1];
    const at = attemptsFor("T:" + id), links = C.extraLinks[t.refId || id] || [];
    const s1best = t.refId ? best("T:" + t.refId) : null;
    view.innerHTML = `<a class="link" href="#resources">← All topics</a>
      <div class="hero-row mt"><div><div class="eyebrow">Chapter ${u.num} · Topic ${id}${t.pages ? " · Textbook pages " + t.pages : ""}</div><h1 class="h-xl">${esc(t.title)}</h1><div class="sub">${esc(t.summary)}</div></div>${stateTag(id)}</div>
      <div class="section reader"><div>
        ${t.revisit ? `<div class="banner">Revisit week — your Semester 1 best on this topic was ${s1best == null ? "not recorded" : s1best + "%"}. Can you beat it?</div>` : ""}
        ${videoSection(t, 4)}
        <article class="card reading mt">${t.reading}</article>
        <div class="row mt"><button class="btn" id="readBtn">${P.read[id] ? "✓ Marked as read" : "Mark as read"}</button><a class="btn primary" href="#quiz/T/${encodeURIComponent(id)}">Take the quiz (${C.questionsPerQuiz} questions) →</a></div>
        <div class="row mt">${prev ? `<a class="link" href="#topic/${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : ""}<span style="flex:1"></span>${next ? `<a class="link" href="#topic/${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : ""}</div>
      </div>
      <aside class="side-panel">
        <div class="card"><div class="eyebrow">Learning objectives (syllabus)</div><div class="mt-s">${t.objectives.map(o => `<div class="obj"><b>${o}</b><span>${esc(OBJ[o] || "")}</span></div>`).join("")}</div></div>
        <div class="card"><div class="eyebrow">My progress</div><div class="mt-s small">Quiz tries: <b>${at.length}</b><br>Best score: <b>${at.length ? best("T:" + id) + "%" : "—"}</b><br>Latest: <b>${at.length ? at[at.length - 1].pct + "%" : "—"}</b><br>Time on this topic: <b>${fmtTime(P.time.topics[id] || 0)}</b><br>Videos watched: <b>${topicVideos(t).filter(v => P.watched && P.watched[v.id]).length}/${topicVideos(t).length}</b></div>${at.length > 1 ? `<div class="mt-s small">Trend: ${trendLabel(trend(at.map(a => a.pct)).slope)}</div>` : ""}<a class="link small" href="#results/T:${encodeURIComponent(id)}">See my graph →</a></div>
        ${links.length ? `<div class="card"><div class="eyebrow">Extra links</div>${links.map(l => `<div class="mt-s"><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a></div>`).join("")}</div>` : ""}
      </aside></div>`;
    const mv = $("#moreVids"); if (mv) mv.onclick = () => { mv.closest(".vsection").outerHTML = videoSection(t, 0); };
    $("#readBtn").onclick = () => { if (P.read[id]) delete P.read[id]; else P.read[id] = new Date().toISOString(); save(); vTopic(id); };
  }

  /* ================= QUIZ ENGINE ================= */
  const norm = s => String(s).toLowerCase().trim().replace(/^["'“”‘’]+|["'“”‘’.]+$/g, "").replace(/[\s,]+/g, " ").trim();
  const normNum = s => norm(s).replace(/ /g, "");
  const isCodey = s => /\n|^[=\w.]+\(.*\)|\[|←|==|^def |^for |^if /.test(s);
  function toItem(raw, obj) { const [q, a, w, x] = raw; return Object.assign({ q, a, w: w || [], obj }, x || {}); }
  const itemKey = it => it.q + "|" + (it.c || "") + "|" + (it.h || "");

  // Builds a fresh set of questions. Questions seen in the student's last two tries of this quiz are used last.
  function buildQuestions(objectives, n, quizId) {
    const seenBefore = new Set(((P.seen || {})[quizId] || []));
    const seen = new Set(), pool = [];
    objectives.forEach(o => (BANK[o] || []).forEach(r => { const it = toItem(r, o); const k = itemKey(it); if (!seen.has(k)) { seen.add(k); pool.push(it); } }));
    const gens = GENS.filter(g => g.objs.some(o => objectives.includes(o)));
    let gCount = gens.length ? Math.min(Math.round(n * 0.35), gens.length * 3) : 0;
    if (pool.length < n - gCount) gCount = n - pool.length;
    // fresh questions first, then ones seen in the last tries
    const sp = shuffle(pool.filter(it => !seenBefore.has(itemKey(it)))).concat(shuffle(pool.filter(it => seenBefore.has(itemKey(it)))));
    // for multi-topic tests, spread the questions across objectives
    let chosen = [];
    if (objectives.length > 3) {
      const byObj = {}; sp.forEach(it => (byObj[it.obj] = byObj[it.obj] || []).push(it));
      const order = shuffle(Object.keys(byObj)); let i = 0, guard = 0;
      while (chosen.length < n - gCount && guard++ < 5000) { const list = byObj[order[i++ % order.length]]; if (list.length) chosen.push(list.shift()); if (order.every(o => !byObj[o].length)) break; }
    } else chosen = sp.slice(0, n - gCount);
    const used = new Set(chosen.map(itemKey));
    const spare = sp.filter(it => !used.has(itemKey(it)));
    const gSeen = new Set(); let guard = 0, gi = 0; const gOrder = shuffle(gens);
    while (chosen.length < n && gens.length && guard++ < 600) {
      const g = gOrder[gi++ % gOrder.length]; let it; try { it = g.fn(); } catch (e) { continue; }
      const k = itemKey(it); if (gSeen.has(k)) continue; gSeen.add(k); it.obj = g.objs.find(o => objectives.includes(o)); it.gen = true; chosen.push(it);
    }
    while (chosen.length < n && spare.length) chosen.push(spare.shift()); // generators ran out of new questions
    // turn items into rendered questions with a random type
    let qs = chosen.map(it => {
      const wrong = [...new Set(it.w.map(String))].filter(x => x !== String(it.a));
      const typable = !!it.t && String(it.a).length <= 30 && !/of these|which statement|which list|which line|which pair|which set/i.test(it.q);
      const r = Math.random(); let type = "mcq";
      if (typable) type = r < 0.45 ? "mcq" : r < 0.65 ? "tf" : "typed"; else type = r < 0.75 ? "mcq" : "tf";
      if (!wrong.length) type = typable ? "typed" : "mcq";
      const acc = [String(it.a)].concat(Array.isArray(it.t) ? it.t : []);
      const secs = it.s || C.secondsPerQuestion;
      const base = { obj: it.obj, prompt: it.q, code: it.c, html: it.h, answer: String(it.a), expl: it.e, typable, accept: acc, cs: !!it.cs, secs, key: it.gen ? null : itemKey(it) };
      if (type === "mcq") return Object.assign(base, { type, options: shuffle([String(it.a)].concat(shuffle(wrong).slice(0, 3))) });
      if (type === "tf") { const showRight = Math.random() < 0.5; return Object.assign(base, { type, shown: showRight ? String(it.a) : pick(wrong), truth: showRight ? "True" : "False" }); }
      return Object.assign(base, { type: "typed", secs: Math.max(secs, C.secondsPerQuestion + 15) });
    });
    let typedN = qs.filter(q => q.type === "typed").length;
    shuffle(qs.map((q, i) => i)).forEach(i => { if (typedN < 3 && qs[i].typable && qs[i].type !== "typed") { qs[i] = Object.assign({}, qs[i], { type: "typed", secs: Math.max(qs[i].secs, C.secondsPerQuestion + 15) }); typedN++; } });
    // up to 2 match-up questions from spare short static items
    const short = spare.filter(it => !it.c && !it.h && String(it.a).length <= 42 && it.q.length <= 120);
    for (let m = 0; m < 2 && short.length >= 3 && qs.length >= 6; m++) {
      const trio = []; const usedA = new Set();
      while (short.length && trio.length < 3) { const it = short.shift(); if (!usedA.has(String(it.a))) { usedA.add(String(it.a)); trio.push(it); } }
      if (trio.length < 3) break;
      const at = qs.findIndex(q => q.type === "mcq" && !q.code && !q.html && !q.matchReplaced);
      if (at < 0) break;
      qs[at] = { type: "match", obj: trio[0].obj, prompt: "Match each question to its correct answer.", pairs: trio.map(it => ({ q: it.q, a: String(it.a) })), options: shuffle(trio.map(it => String(it.a))), matchReplaced: true, secs: C.secondsPerQuestion + 30, keys: trio.map(itemKey) };
    }
    const types = new Set(qs.map(q => q.type));
    if (types.size < 3) { const i = qs.findIndex(q => q.type === "mcq" && q.options && q.options.length > 1); if (i >= 0 && !types.has("tf")) { const q = qs[i]; const w = q.options.filter(o => o !== q.answer); const sr = Math.random() < .5; qs[i] = Object.assign({}, q, { type: "tf", shown: sr ? q.answer : pick(w), truth: sr ? "True" : "False" }); } }
    return shuffle(qs);
  }
  function rememberSeen(quizId, qs) {
    P.seen = P.seen || {};
    const keys = qs.flatMap(q => q.keys || (q.key ? [q.key] : []));
    const prev = (P.seen[quizId] || []).slice(-60);
    P.seen[quizId] = prev.concat(keys).slice(-120); // roughly the last two tries
    save();
  }

  function quizMeta(kind, id) {
    if (kind === "T") { const t = TOPICS[id]; if (!t) return null; return { title: `${id} ${t.title}`, objectives: t.objectives, n: C.questionsPerQuiz, qkind: "topic", back: "#topic/" + encodeURIComponent(id) }; }
    const a = assessById(id); if (!a) return null;
    return { a, title: a.title + (a.kind === "unit" ? "" : a.kind === "exam" ? " · " + a.sub : " · " + a.sub), objectives: [...new Set(a.topics.flatMap(tid => TOPICS[tid] ? TOPICS[tid].objectives : []))], n: a.n, qkind: a.kind, back: "#calendar" };
  }

  /* The full guide students must read and accept before every quiz, test or exam */
  function vQuiz(kind, id) {
    const m = quizMeta(kind, id);
    if (!m) { view.innerHTML = `<div class="empty">Quiz not found.</div>`; return; }
    if (m.a && !assessOpen(m.a)) { view.innerHTML = `<div class="card empty"><h2 class="h-lg">Not open yet</h2><p>${esc(m.a.title)} opens on ${fmtD(m.a.date, { weekday: "long", day: "numeric", month: "long" })}${C.openSpotEarly && m.a.kind !== "exam" ? ", or as soon as you have tried every topic quiz it covers" : ""}.</p><a class="btn" href="#calendar">Back to calendar</a></div>`; return; }
    if (QZ && !QZ.done && QZ.quiz === kind + ":" + id) return drawQ();
    if (lockActive()) { showLockOverlay(); return; }
    const prev = attemptsFor(kind + ":" + id), I = C.integrity || {};
    const fsOK = !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
    view.innerHTML = `<div class="quiz-wrap guide"><a class="link" href="${m.back}">← Back</a>
      <div class="card mt guide-card">
        <div class="eyebrow">${kindName(m.qkind)} · read everything before you start</div><h1 class="h-lg mt-s">${esc(m.title)}</h1>
        <div class="guide-facts">
          <div><b>${m.n}</b><span>questions</span></div>
          <div><b>${C.secondsPerQuestion}–${C.secondsPerCalculation + 60}s</b><span>timer on each question</span></div>
          <div><b>${C.passMark}%</b><span>pass mark</span></div>
          <div><b>${prev.length}</b><span>tries so far${prev.length ? " · best " + best(kind + ":" + id) + "%" : ""}</span></div>
        </div>
        <h3 class="h-md mt">1. How the test works</h3>
        <ul class="guide-list">
          <li>⏱ Every question has <b>its own countdown timer</b>. Short questions get ${C.secondsPerQuestion} seconds; calculations, trace tables and typed answers get more. When the timer reaches 0 the question is marked <b>wrong</b> and you move on.</li>
          <li>➡️ You <b>cannot skip</b> or go back. Choose or type your answer and press <b>Submit answer</b>, then <b>Next question</b>.</li>
          <li>🔀 Every try gives <b>different questions</b>, different numbers and different question types, so you can't memorise answers — you have to understand the topic.</li>
          <li>✍️ Question types: <b>multiple choice</b> (pick one), <b>true or false</b> (is the proposed answer correct?), <b>type your answer</b> (spelling matters, capitals usually don't) and <b>match up</b> (all three must be right).</li>
          <li>🧮 No calculator is allowed, just like the real Cambridge Paper 1. Have a pen and scrap paper ready for working out.</li>
        </ul>
        <h3 class="h-md mt">2. Secure test mode — these actions <span class="danger-txt">lock your device</span></h3>
        <ul class="guide-list rules">
          ${I.lockOnTabLeave !== false ? `<li>🚫 Leaving this tab, switching to another app or window, or opening a new tab.</li>` : ""}
          ${I.requireFullscreen !== false && fsOK ? `<li>🚫 Leaving full screen (pressing Esc or F11).</li>` : ""}
          <li>🚫 Copying, cutting or pasting anything, or right-clicking.</li>
          ${I.lockOnScreenshot !== false ? `<li>🚫 Taking a screenshot or screen recording (Print Screen, Windows + Shift + S, Cmd + Shift + 3/4/5, Snipping Tool, three-finger screenshot).</li>` : ""}
          <li>🚫 Opening developer tools, printing, or refreshing / closing the page before you finish.</li>
        </ul>
        <div class="banner warn-banner"><b>If your device locks:</b> the test is submitted straight away (unanswered questions count as wrong), an alarm sounds, and the screen stays locked until <b>${esc(T)}</b> unlocks it. The lock is recorded${C.googleSheetsUrl ? " and sent to your teacher" : ""}. Refreshing, closing the browser or switching student will <b>not</b> remove it.</div>
        ${I.screenshotShield !== false ? `<p class="small muted mt-s">The questions are hidden behind a black screen whenever the page loses focus or a screenshot key is pressed. ${I.watermark !== false ? `Your name, class and the time are printed faintly across every question, so any photo of the screen shows who took it.` : ""}</p>` : ""}
        <h3 class="h-md mt">3. Before you start</h3>
        <ul class="guide-list"><li>Close every other tab and app. Turn off notifications if you can.</li><li>Make sure your device is charged and the Wi-Fi is working.</li><li>Sit where your teacher can see your screen.</li></ul>
        <div class="agree mt">
          <label><input type="checkbox" class="agree-chk"><span>I have read the rules. I understand that leaving this tab, opening another app or tab, copying, pasting or taking screenshots will <b>lock my device</b>.</span></label>
          <label><input type="checkbox" class="agree-chk"><span>I will work on my own, without notes, other people, websites or AI tools.</span></label>
          <label><input type="checkbox" class="agree-chk"><span>I am ready: other tabs and apps are closed and I have pen and paper for working out.</span></label>
        </div>
        <button class="btn primary mt big-start" id="startQ" disabled>🔒 Start ${prev.length ? "a new try" : kindName(m.qkind).toLowerCase()}${I.requireFullscreen !== false && fsOK ? " in full screen" : ""} →</button>
        <p class="small muted mt-s">Tick all three boxes to unlock the start button.</p>
      </div></div>`;
    const chks = [...view.querySelectorAll(".agree-chk")], btn = $("#startQ");
    chks.forEach(c => c.onchange = () => { btn.disabled = !chks.every(x => x.checked); });
    btn.onclick = async () => {
      if (lockActive()) return showLockOverlay();
      const ok = await enterSecureMode();
      if (!ok) return;
      QZ = { quiz: kind + ":" + id, kind: m.qkind, title: m.title, back: m.back, qs: buildQuestions(m.objectives, m.n, kind + ":" + id), i: 0, score: 0, answers: [], started: Date.now(), done: false };
      rememberSeen(QZ.quiz, QZ.qs);
      P.active = { quiz: QZ.quiz, title: m.title, kind: m.qkind, total: QZ.qs.length, score: 0, answered: 0, started: new Date().toISOString() }; save();
      drawQ();
    };
  }

  let timerId = null;
  function drawQ() {
    const q = QZ.qs[QZ.i], N = QZ.qs.length, L = "ABCD", SECS = q.secs || C.secondsPerQuestion;
    const typeName = { mcq: "Multiple choice", tf: "True or false", typed: "Type your answer", match: "Match up" }[q.type];
    let body = "";
    if (q.type === "mcq") body = `<div class="opts">${q.options.map((o, k) => `<button class="opt ${isCodey(o) ? "codey" : ""}" data-v="${esc(o)}"><span class="ltr">${L[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    if (q.type === "tf") body = `<div class="proposed">Proposed answer: <b class="${isCodey(q.shown) ? "codey" : ""}">${esc(q.shown)}</b></div><div class="small muted mt-s">Is the proposed answer correct?</div><div class="opts tf"><button class="opt" data-v="True">✓ True</button><button class="opt" data-v="False">✗ False</button></div>`;
    if (q.type === "typed") body = `<div class="typed"><input class="input" id="typedIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type your answer…" aria-label="Your answer"></div><div class="small muted mt-s">${q.cs ? "Capitals matter for this answer." : "Spelling matters, capitals don't."} Press Enter to submit.</div>`;
    if (q.type === "match") body = `<div class="match">${q.pairs.map((p, k) => `<div class="mrow" data-row="${k}"><span class="mq">${esc(p.q)}</span><div class="mopts">${q.options.map(o => `<button class="mopt" data-k="${k}" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`).join("")}</div>`;
    view.innerHTML = `<div class="quiz-wrap">
      <div class="quiz-top"><div class="qprog"><div class="row" style="justify-content:space-between"><b>Question ${QZ.i + 1} of ${N}</b><span class="small muted">${esc(QZ.title)}</span></div><div class="bar"><i style="width:${QZ.i / N * 100}%"></i></div></div>
      <div class="timer" id="timer"><svg width="70" height="70"><circle cx="35" cy="35" r="30" fill="none" stroke="var(--chip)" stroke-width="6"/><circle id="tring" cx="35" cy="35" r="30" fill="none" stroke="var(--navy)" stroke-width="6" stroke-linecap="round" stroke-dasharray="188.5" stroke-dashoffset="0"/></svg><div class="tnum" id="tnum">${SECS}</div></div></div>
      <div class="card qcard"><div class="qtype"><span class="tag sm">${typeName}</span> <span class="tag sm accent">${q.obj || ""}</span> <span class="tag sm">⏱ ${SECS}s</span></div>
        <div class="qtext">${esc(q.prompt)}</div>${q.code ? `<pre class="q-code">${esc(q.code)}</pre>` : ""}${q.html ? `<div class="table-wrap q-html">${q.html}</div>` : ""}
        ${body}<div id="fb"></div>
        <div class="qfoot"><span class="hint" id="hint">No skipping — answer to continue.</span><button class="btn primary" id="go" disabled>Submit answer</button></div>
        ${watermarkHTML()}</div></div>`;
    let sel = null; const go = $("#go");
    view.querySelectorAll(".opt").forEach(b => b.onclick = () => { if (QZ.locked) return; view.querySelectorAll(".opt").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = b.dataset.v; go.disabled = false; });
    const ti = $("#typedIn"); if (ti) { ti.focus(); ti.oninput = () => { sel = ti.value; go.disabled = !ti.value.trim(); }; ti.onkeydown = e => { if (e.key === "Enter" && !go.disabled) go.click(); }; }
    if (q.type === "match") { sel = q.pairs.map(() => ""); view.querySelectorAll(".mopt").forEach(b => b.onclick = () => { if (QZ.locked) return; const k = +b.dataset.k; view.querySelectorAll(`.mopt[data-k="${k}"]`).forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel[k] = b.dataset.v; go.disabled = sel.some(x => !x); }); }
    QZ.locked = false; QZ.qStart = Date.now(); QZ.qSecs = SECS;
    go.onclick = () => { if (!QZ.locked) lock(sel); else nextQ(); };
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!QZ || QZ.locked) return clearInterval(timerId);
      const left = QZ.qSecs - (Date.now() - QZ.qStart) / 1000;
      const tn = $("#tnum"), ring = $("#tring"); if (!tn) return clearInterval(timerId);
      tn.textContent = Math.max(0, Math.ceil(left)); ring.setAttribute("stroke-dashoffset", String(188.5 * (1 - Math.max(0, left) / QZ.qSecs)));
      $("#timer").classList.toggle("low", left <= 10); ring.setAttribute("stroke", left <= 10 ? "var(--bad)" : "var(--navy)");
      if (left <= 0) lock(null, true);
    }, 200);
  }
  function check(q, v) {
    if (v == null) return false;
    if (q.type === "mcq") return v === q.answer;
    if (q.type === "tf") return v === q.truth;
    if (q.type === "typed") { if (q.cs) return q.accept.some(x => String(x).trim() === String(v).trim().replace(/^"|"$/g, "")); const a = norm(v), an = normNum(v); return q.accept.some(x => norm(x) === a || normNum(x) === an); }
    if (q.type === "match") return q.pairs.every((p, k) => v[k] === p.a);
    return false;
  }
  function lock(v, timedOut) {
    if (QZ.locked) return; QZ.locked = true; clearInterval(timerId);
    const q = QZ.qs[QZ.i], ok = check(q, v); if (ok) QZ.score++;
    QZ.answers.push({ q, v, ok, timedOut: !!timedOut, secs: Math.round((Date.now() - QZ.qStart) / 1000) });
    P.active.score = QZ.score; P.active.answered = QZ.answers.length; save();
    view.querySelectorAll(".opt").forEach(b => { b.disabled = true; const val = b.dataset.v; const good = q.type === "mcq" ? val === q.answer : val === q.truth; if (good) b.classList.add("right"); else if (val === v) b.classList.add("wrong"); });
    const ti = $("#typedIn"); if (ti) ti.disabled = true;
    if (q.type === "match") view.querySelectorAll(".mrow").forEach(r => { const k = +r.dataset.row; r.classList.add(v && v[k] === q.pairs[k].a ? "right" : "wrong"); r.querySelectorAll(".mopt").forEach(b => { b.disabled = true; if (b.dataset.v === q.pairs[k].a) b.classList.add("right"); }); });
    const correctTxt = q.type === "match" ? q.pairs.map(p => `${esc(p.q)} → <b>${esc(p.a)}</b>`).join("<br>") : q.type === "tf" ? `The proposed answer was <b>${q.truth === "True" ? "correct" : "wrong"}</b>. The correct answer is <b>${esc(q.answer)}</b>.` : `Correct answer: <b class="${isCodey(q.answer) ? "codey" : ""}">${esc(q.answer)}</b>`;
    $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}">${timedOut ? "<b>⏱ Time's up!</b> " : ok ? "<b>✓ Correct!</b> " : "<b>✗ Not quite.</b> "}${ok && q.type !== "match" ? "" : correctTxt}${q.expl ? `<div class="mt-s">${esc(q.expl)}</div>` : ""}</div>`;
    const go = $("#go"); go.disabled = false; go.textContent = QZ.i + 1 < QZ.qs.length ? "Next question →" : "See my score →"; $("#hint").textContent = `Score so far: ${QZ.score}/${QZ.answers.length}`; go.focus();
  }
  function nextQ() { QZ.i++; if (QZ.i >= QZ.qs.length) finishQuiz(false, true); else drawQ(); }

  function confetti() {
    const box = document.createElement("div"); box.className = "confetti"; const cols = ["#e3b341", "#f6d77a", "#1b3a6b", "#ffffff", "#a87908", "#3b5f9a"];
    for (let i = 0; i < 90; i++) { const c = document.createElement("i"); c.style.left = Math.random() * 100 + "%"; c.style.background = cols[i % cols.length]; c.style.animationDuration = (1.8 + Math.random() * 1.8) + "s"; c.style.animationDelay = Math.random() * .6 + "s"; c.style.transform = `rotate(${Math.random() * 360}deg)`; box.appendChild(c); }
    document.body.appendChild(box); setTimeout(() => box.remove(), 4500);
  }
  function recordAttempt(quiz, title, kind, score, total, secs, incomplete, lockReason) {
    const pct = Math.round(score / total * 100);
    const att = { id: Date.now().toString(36), quiz, title, kind, score, total, pct, secs, date: new Date().toISOString() };
    if (incomplete) att.incomplete = true; if (lockReason) att.locked = lockReason;
    P.attempts.push(att); P.active = null; save();
    queue(Object.assign({ type: "result", quiz, title, kind, score, total, pct, secs, incomplete: !!incomplete, locked: lockReason || "", attemptNo: attemptsFor(quiz).length, date: att.date }, summary()));
    return att;
  }
  function finishQuiz(abandoned, show, lockReason) {
    clearInterval(timerId); if (!QZ || QZ.done) return; QZ.done = true;
    const secs = Math.round((Date.now() - QZ.started) / 1000);
    const att = recordAttempt(QZ.quiz, QZ.title, QZ.kind, QZ.score, QZ.qs.length, secs, abandoned, lockReason);
    exitSecureMode();
    if (show) showScore(att); else if (!lockReason) toast(`Quiz submitted: ${att.score}/${att.total} (${att.pct}%)`);
  }
  function showScore(att) {
    const tries = attemptsFor(att.quiz), prevT = tries[tries.length - 2], tr = trend(tries.map(t => t.pct));
    const pass = att.pct >= C.passMark, diff = prevT ? att.pct - prevT.pct : null, proj = tries.length >= 2 ? Math.round(tr.at(tries.length)) : null;
    const [k, id] = att.quiz.split(":");
    if (pass) confetti();
    view.innerHTML = `<div class="quiz-wrap"><div class="card score-hero"><div class="score-face"><img src="${AV}" alt="${esc(T)}"></div><div class="eyebrow">${esc(QZ.title)}</div><div class="score-big">${att.pct}%</div><div class="h-md">${att.score} out of ${att.total} correct</div>
      <p class="mt">${pass ? `<span class="tag good">🎉 Passed! ${esc(T)} is proud of you!</span>` : `<span class="tag warn">💪 Keep going — you need ${C.passMark}% to pass. You've got this!</span>`}</p>
      <p class="sub">${diff == null ? "This is your first try. Your next try will have new questions." : `${diff > 0 ? "▲ " + diff + " points better than" : diff < 0 ? "▼ " + (-diff) + " points lower than" : "The same as"} your last try.`} ${proj != null ? ` Trend: ${tr.slope > 2 ? "improving" : tr.slope < -2 ? "declining" : "steady"} · projected next try ≈ <b>${proj}%</b>.` : ""}</p>
      <div class="row mt" style="justify-content:center"><a class="btn primary" href="#quiz/${k}/${encodeURIComponent(id)}" id="again">Try again (new questions)</a><a class="btn" href="${QZ.back}">Back</a><a class="btn" href="#results/${encodeURIComponent(att.quiz)}">My progress graph</a></div></div>
      <div class="card mt"><h3 class="h-md">Review your answers</h3>${QZ.answers.map((a, i) => `<div class="review-item"><div class="q">${a.ok ? '<span class="up">✓</span>' : '<span class="down">✗</span>'} ${i + 1}. ${esc(a.q.prompt)}</div>${a.q.code ? `<pre class="q-code">${esc(a.q.code)}</pre>` : ""}
        <div class="a">${a.timedOut ? "Ran out of time. " : a.q.type === "match" ? "" : `Your answer: ${esc(Array.isArray(a.v) ? a.v.join(", ") : a.v == null ? "—" : a.q.type === "tf" ? a.v + " (proposed: " + a.q.shown + ")" : a.v)}. `}${a.ok ? "" : `Correct: <b>${a.q.type === "match" ? a.q.pairs.map(p => esc(p.a)).join(" · ") : esc(a.q.answer)}</b>`}</div></div>`).join("")}</div></div>`;
    $("#again").onclick = e => { e.preventDefault(); QZ = null; const h = `#quiz/${k}/${encodeURIComponent(id)}`; if (location.hash === h) render(); else location.hash = h; };
  }

  /* ================= RESULTS ================= */
  function lineChart(vals, labels) {
    const W = 720, H = 270, l = 40, r = 20, t = 18, b = 34, n = vals.length, ext = n >= 2 ? 3 : 0;
    const X = i => l + (n + ext <= 1 ? (W - l - r) / 2 : i * (W - l - r) / (n + ext - 1)), Y = v => t + (100 - v) * (H - t - b) / 100;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Scores per try with trend line">`;
    [0, 25, 50, 75, 100].forEach(v => { s += `<line x1="${l}" x2="${W - r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${l - 8}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}%</text>`; });
    s += `<line x1="${l}" x2="${W - r}" y1="${Y(C.passMark)}" y2="${Y(C.passMark)}" stroke="var(--good)" stroke-width="1.5" stroke-dasharray="4 4"/><text x="${W - r}" y="${Y(C.passMark) - 6}" text-anchor="end" font-size="11" fill="var(--good)" font-weight="700">Pass ${C.passMark}%</text>`;
    if (n >= 2) { const tr = trend(vals); s += `<line x1="${X(0)}" y1="${Y(tr.at(0))}" x2="${X(n - 1)}" y2="${Y(tr.at(n - 1))}" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/><line x1="${X(n - 1)}" y1="${Y(tr.at(n - 1))}" x2="${X(n - 1 + ext)}" y2="${Y(tr.at(n - 1 + ext))}" stroke="var(--accent)" stroke-width="2" stroke-dasharray="3 5"/>`;
      for (let k = 1; k <= ext; k++) { const v = Math.round(tr.at(n - 1 + k)); s += `<circle cx="${X(n - 1 + k)}" cy="${Y(v)}" r="5" fill="#fff" stroke="var(--accent)" stroke-width="2" data-tip="Projected try ${n + k}: ≈${v}%"/>`; }
      s += `<text x="${X(n - 1 + ext)}" y="${Y(tr.at(n - 1 + ext)) - 12}" text-anchor="end" font-size="11.5" fill="var(--accent)" font-weight="700">Projection</text>`; }
    if (n) s += `<polyline fill="none" stroke="var(--navy)" stroke-width="2.5" stroke-linejoin="round" points="${vals.map((v, i) => X(i) + "," + Y(v)).join(" ")}"/>`;
    vals.forEach((v, i) => { s += `<circle cx="${X(i)}" cy="${Y(v)}" r="5.5" fill="var(--navy)" stroke="#fff" stroke-width="2" data-tip="${esc(labels[i])}"/><circle cx="${X(i)}" cy="${Y(v)}" r="14" fill="transparent" data-tip="${esc(labels[i])}"/>`; });
    for (let i = 0; i < n + ext; i++) if (n + ext <= 16 || i % Math.ceil((n + ext) / 12) === 0) s += `<text x="${X(i)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="var(--muted)">${i < n ? "Try " + (i + 1) : "+" + (i - n + 1)}</text>`;
    if (n) s += `<text x="${X(n - 1)}" y="${Y(vals[n - 1]) - 12}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">${vals[n - 1]}%</text>`;
    return s + "</svg>";
  }
  function barChart() {
    const W = 720, H = 210, l = 40, r = 10, t = 14, b = 34, days = [...Array(14).keys()].map(i => addDays(today(), i - 13));
    const vals = days.map(d => Math.round((P.time.days[dayKey(d)] || 0) / 60)), max = Math.max(30, ...vals), top = Math.ceil(max / 30) * 30;
    const bw = (W - l - r) / 14, Y = v => t + (top - v) * (H - t - b) / top;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Minutes of study per day, last 14 days">`;
    [0, top / 2, top].forEach(v => { s += `<line x1="${l}" x2="${W - r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${l - 8}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}m</text>`; });
    vals.forEach((v, i) => { const x = l + i * bw + 3, h = Y(0) - Y(v); const tipTxt = `${fmtD(days[i], { weekday: "short", day: "numeric", month: "short" })}: ${v} min`;
      if (v > 0) s += `<path d="M${x},${Y(0)} V${Y(v) + Math.min(4, h)} q0,-4 4,-4 h${bw - 14} q4,0 4,4 V${Y(0)} Z" fill="var(--navy)" data-tip="${tipTxt}"/>`;
      s += `<rect x="${x}" y="${t}" width="${bw - 6}" height="${H - t - b}" fill="transparent" data-tip="${tipTxt}"/><text x="${x + (bw - 6) / 2}" y="${H - 12}" text-anchor="middle" font-size="10.5" fill="var(--muted)">${days[i].getDate()}</text>`; });
    return s + "</svg>";
  }
  function vResults(sel) {
    const all = P.attempts, quizzes = [...new Set(all.map(a => a.quiz))];
    sel = sel && quizzes.includes(sel) ? sel : "all";
    const series = sel === "all" ? all : attemptsFor(sel);
    const vals = series.map(a => a.pct), labels = series.map((a, i) => `Try ${i + 1}: ${a.pct}% — ${a.title}<br>${fmtDT(a.date)}`), tr = trend(vals);
    const avg = all.length ? Math.round(all.reduce((x, y) => x + y.pct, 0) / all.length) : 0;
    const wk = Object.entries(P.time.days).filter(([k]) => parseD(k) >= addDays(today(), -6)).reduce((a, [, v]) => a + v, 0);
    const rows = quizzes.map(q => { const a = attemptsFor(q), v = a.map(x => x.pct), t = trend(v); return { q, title: a[a.length - 1].title, n: a.length, first: v[0], last: v[v.length - 1], best: Math.max(...v), slope: t.slope, proj: a.length >= 2 ? Math.round(t.at(a.length)) : null, time: q.startsWith("T:") ? P.time.topics[q.slice(2)] || 0 : null }; });
    view.innerHTML = `<div class="hero-row"><div><div class="eyebrow">Personal tracker</div><h1 class="h-xl">My results 📈</h1><div class="sub">Every quiz try, your trend, a projection of your next scores, and the time you've put in.</div></div>
      <div class="row no-print"><button class="btn sm" id="csv">Export CSV</button>${C.googleSheetsUrl ? '<button class="btn sm" id="syncNow">Sync to teacher</button>' : ""}<button class="btn sm" onclick="window.print()">Print</button></div></div>
      <div class="section grid4">
        <div class="card stat top"><div class="lbl">Quiz tries</div><div class="num">${all.length}</div><div class="cap">${quizzes.length} different quizzes</div></div>
        <div class="card stat"><div class="lbl">Average score</div><div class="num">${all.length ? avg + "%" : "—"}</div><div class="cap">Across all tries</div></div>
        <div class="card stat"><div class="lbl">Overall trend</div><div class="num" style="font-size:22px">${all.length > 1 ? trendLabel(trend(all.map(a => a.pct)).slope) : "—"}</div><div class="cap">${all.length > 1 ? `${trend(all.map(a => a.pct)).slope >= 0 ? "+" : ""}${trend(all.map(a => a.pct)).slope.toFixed(1)} points per try` : "Needs 2+ tries"}</div></div>
        <div class="card stat"><div class="lbl">Hours put in</div><div class="num">${hours(P.time.total || 0)} h</div><div class="cap">${fmtTime(wk)} in the last 7 days</div></div>
      </div>
      <div class="section card chart-card"><div class="chart-tools"><h2 class="h-md" style="flex:1">Progress per try</h2><select class="input" id="sel" aria-label="Choose quiz"><option value="all">All quizzes (in order)</option>${quizzes.map(q => `<option value="${esc(q)}" ${q === sel ? "selected" : ""}>${esc(attemptsFor(q)[0].title)}</option>`).join("")}</select></div>
        ${vals.length ? `<div class="small muted" style="margin-bottom:6px">Navy line = your scores · grey dashes = trend · orange = projected next 3 tries. ${vals.length > 1 ? "Status: " + trendLabel(tr.slope) : ""}</div>${lineChart(vals, labels)}` : `<div class="empty">No tries yet. Take a topic quiz and your graph will appear here.</div>`}</div>
      <div class="section card chart-card"><h2 class="h-md">Study time · last 14 days</h2><div class="small muted" style="margin:4px 0 8px">Active minutes on this site each day (counted only while you're using the page).</div>${barChart()}</div>
      <div class="section card"><h2 class="h-md">By quiz</h2>${rows.length ? `<div class="table-wrap mt-s"><table class="data-table"><tr><th>Quiz</th><th>Tries</th><th>First</th><th>Latest</th><th>Best</th><th>Trend</th><th>Next (proj.)</th><th>Topic time</th></tr>
        ${rows.map(r => `<tr><td><a href="#results/${encodeURIComponent(r.q)}">${esc(r.title)}</a></td><td class="n">${r.n}</td><td class="n">${r.first}%</td><td class="n">${r.last}%</td><td class="n"><b>${r.best}%</b> ${r.best >= C.passMark ? "✓" : ""}</td><td>${r.n > 1 ? trendLabel(r.slope) : '<span class="flat">—</span>'}</td><td class="n">${r.proj == null ? "—" : r.proj + "%"}</td><td class="small">${r.time == null ? "—" : fmtTime(r.time)}</td></tr>`).join("")}</table></div>` : `<div class="empty">Nothing yet.</div>`}</div>
      <div class="section card"><h2 class="h-md">All tries</h2>${all.length ? `<div class="table-wrap mt-s"><table class="data-table"><tr><th>When</th><th>Quiz</th><th>Type</th><th>Score</th><th>Time taken</th></tr>${all.slice().reverse().map(a => `<tr><td class="small">${fmtDT(a.date)}</td><td>${esc(a.title)}${a.incomplete && !a.locked ? ' <span class="tag sm warn">left early</span>' : ""}</td><td class="small">${kindName(a.kind)}${a.locked ? ' <span class="tag sm bad">locked</span>' : ""}</td><td class="n"><b>${a.pct}%</b> (${a.score}/${a.total})</td><td class="small">${fmtTime(a.secs)}</td></tr>`).join("")}</table></div>` : `<div class="empty">Nothing yet.</div>`}</div>`;
    $("#sel").onchange = e => { location.hash = e.target.value === "all" ? "#results" : "#results/" + encodeURIComponent(e.target.value); };
    $("#csv").onclick = exportCSV;
    const sn = $("#syncNow"); if (sn) sn.onclick = () => { queueActivity(); toast("Sending your results to your teacher…"); };
  }
  function download(name, text, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  function exportCSV() {
    const q = v => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [["Name", "Class", "Date", "Quiz", "Type", "Score", "Total", "Percent", "Seconds", "Left early"].join(",")].concat(P.attempts.map(a => [P.name, P.cls, a.date, a.title, a.kind, a.score, a.total, a.pct, a.secs, a.incomplete ? "yes" : ""].map(q).join(",")));
    lines.push(""); lines.push(q("Total study hours") + "," + hours(P.time.total || 0));
    download(`${P.name.replace(/\s+/g, "_")}_${P.cls}_results.csv`, lines.join("\n"), "text/csv");
  }

  /* ================= HELP ================= */
  function vHelp() {
    view.innerHTML = `<div class="eyebrow">Help</div><h1 class="h-xl">How this site works 💬</h1>
      <div class="section card help">
        <h4>1. Follow your weekly plan</h4><p>Each week lists the topics you must finish. Open a topic in <b>Topics</b>, read it carefully (the textbook pages are shown too), and press <b>Mark as read</b>.</p>
        <h4>🎬 Watch the videos</h4><p>Topics have short videos linked to the syllabus objectives. Find them on the topic page or in <b>Videos</b>. Watching counts towards your study time.</p>
        <h4>2. Pass the topic quiz</h4><p>Every topic has a ${C.questionsPerQuiz}-question quiz. You need <b>${C.passMark}%</b> to pass. Each question has its <b>own timer</b> (longer for calculations) and you <b>can't skip</b>. Every try gives <b>new questions, new numbers and different question types</b>, so retrying is real practice.</p>
        <h4>3. Spot checks, end-unit tests and exams</h4><p>Most Fridays there is a spot check on that week's topics. At the end of a unit there is a ${C.questionsPerUnitTest}-question end-unit test, and there are ${C.questionsPerExam}-question mid-semester, end-of-semester and end-of-year exams. Find them all in <b>Assessments</b>.</p>
        <h4>🔒 Secure test mode</h4><p>Every quiz, test and exam runs in secure test mode. Before you start you will see the full rules and must tick that you agree. During the test:</p>
        <ul><li>Stay on the test tab. Leaving the tab, switching app or window, or opening a new tab <b>locks your device</b>.</li><li>Copying, pasting, right-clicking, screenshots, developer tools, printing and leaving full screen also lock your device.</li><li>The questions go black if the page loses focus or a screenshot key is pressed, and your name is printed faintly across each question.</li><li>A locked device can only be unlocked by ${esc(T)}. Refreshing or closing the browser does not unlock it.</li></ul>
        <h4>4. Track your progress</h4><p><b>My results</b> shows a graph of every try, whether you're <span class="up">improving</span> or <span class="down">declining</span>, a projection of your next scores, and how many hours you've studied. Parents can look at this page too, or press <b>Print</b> for a report.</p>
        <h4>Question types</h4><ul><li><b>Multiple choice</b> — pick one answer.</li><li><b>True or false</b> — decide whether the proposed answer is correct.</li><li><b>Type your answer</b> — spelling matters, capitals usually don't.</li><li><b>Match up</b> — choose the right answer for each of three questions. All three must be right.</li></ul>
        <h4>Where is my data saved?</h4><p>Your progress is saved in <b>this browser on this device</b>. Use the same device and browser each time. ${C.googleSheetsUrl ? "Your quiz results and study time are also sent to your teacher automatically." : ""} If you change device, open your name (bottom left) → <b>Download backup</b>, then <b>Restore backup</b> on the new device.</p>
        <h4>Need help?</h4><p>Ask ${esc(T)} in class — that's what he's there for! 😊</p>
      </div>`;
  }

  /* ================= PROFILES ================= */
  function loginModal() {
    if (document.querySelector(".overlay")) return;
    const ps = Object.values(DB.profiles);
    modal(`<div style="text-align:center"><div class="welcome-face"><img src="${AV}" alt="${esc(T)}"></div><h2>Hi, welcome! 👋</h2><p class="sub small">I'm ${esc(T)}. This is your IGCSE Computer Science space — topics, videos, quizzes and your own progress tracker. ${C.googleSheetsUrl ? "Your results are shared with me." : "Your progress is saved in this browser."}</p></div>
      ${ps.length ? `<div class="mt"><div class="lbl" style="color:var(--ink-2)">Continue as</div>${ps.map(p => `<button class="profile-btn" data-p="${p.id}"><span class="avatar">${esc(initials(p.name))}</span><span><b>${esc(p.name)}</b><br><span class="small muted">${esc(p.cls)} · ${p.attempts.length} quiz tries</span></span></button>`).join("")}</div><div class="lbl mt" style="color:var(--ink-2)">Or add a new student</div>` : ""}
      <form id="newP"><div class="field"><label for="nm">Full name</label><input class="input" id="nm" required maxlength="40" placeholder="e.g. Ana Reyes" autocomplete="name"></div>
      <div class="field"><label for="cl">Class</label><select class="input" id="cl">${C.classes.map(c => `<option>${esc(c)}</option>`).join("")}</select></div>
      <button class="btn primary mt" style="width:100%" type="submit">Let's go →</button></form>`, (o, close) => {
      o.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { useProfile(b.dataset.p); close(); afterLogin(); });
      o.querySelector("#newP").onsubmit = e => { e.preventDefault(); const name = o.querySelector("#nm").value.trim().replace(/\s+/g, " "); if (!name) return; const p = newProfile(name, o.querySelector("#cl").value); DB.profiles[p.id] = p; useProfile(p.id); close(); queueActivity(); afterLogin(); };
    });
  }
  function profileModal() {
    if (!P) return loginModal(); if (QZ && !QZ.done) return toast("Finish your quiz first.");
    modal(`<div class="row"><span class="avatar" style="width:48px;height:48px;font-size:17px">${esc(initials(P.name))}</span><div><h2 style="font-size:22px">${esc(P.name)}</h2><div class="small muted">${esc(P.cls)} · since ${fmtD(new Date(P.created), { day: "numeric", month: "short", year: "numeric" })}</div></div></div>
      <div class="field"><label for="cl2">Class</label><select class="input" id="cl2">${C.classes.map(c => `<option ${c === P.cls ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
      <div class="items mt">
        <button class="btn" id="bk">⬇ Download backup (to move to another device)</button>
        <label class="btn" style="cursor:pointer">⬆ Restore backup<input type="file" id="rs" accept=".json,application/json" hidden></label>
        <button class="btn" id="sw">⇄ Switch student</button>
        <button class="btn" id="cls">Close</button>
      </div>`, (o, close) => {
      o.querySelector("#cl2").onchange = e => { P.cls = e.target.value; save(); chrome(); };
      o.querySelector("#bk").onclick = () => download(`igcse9_backup_${P.name.replace(/\s+/g, "_")}.json`, JSON.stringify(P), "application/json");
      o.querySelector("#rs").onchange = e => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { try { const d = JSON.parse(rd.result); if (!d.id || !Array.isArray(d.attempts)) throw 0; delete d.locked; DB.profiles[d.id] = d; useProfile(d.id); close(); toast("Backup restored for " + d.name); render(); } catch (err) { toast("That file is not a backup from this site."); } }; rd.readAsText(f); };
      o.querySelector("#sw").onclick = () => { close(); DB.current = null; P = null; save(); loginModal(); };
      o.querySelector("#cls").onclick = close;
    });
  }
  function syncModal() {
    if (!P) return;
    modal(`<h2 style="font-size:22px">Saving &amp; syncing</h2>
      <p class="sub small">Your progress is always saved in this browser.</p>
      ${C.googleSheetsUrl ? `<div class="item mt"><div class="ic ${P.outbox.length ? "accent" : "good"}">${P.outbox.length ? "!" : "✓"}</div><div><div class="tt">${P.outbox.length ? P.outbox.length + " update(s) waiting to send" : "All results sent to your teacher"}</div><div class="ds">Last sent: ${P.lastSync ? fmtDT(P.lastSync) : "not yet"}</div></div></div>
        <div class="row mt"><button class="btn primary" id="sn">Sync now</button><button class="btn" id="cx">Close</button></div>` : `<div class="item mt"><div class="ic">i</div><div class="ds">Teacher sync is not switched on for this site. Use <b>My results → Export CSV</b> to send your results.</div></div><button class="btn mt" id="cx">Close</button>`}`, (o, close) => {
      const sn = o.querySelector("#sn"); if (sn) sn.onclick = () => { queueActivity(); close(); toast("Syncing…"); };
      o.querySelector("#cx").onclick = close;
    });
  }
  function afterLogin() {
    if (P.active) { const a = P.active; recordAttempt(a.quiz, a.title, a.kind, a.score, a.total, Math.round((Date.now() - new Date(a.started)) / 1000), true); toast(`Your unfinished quiz “${a.title}” was submitted: ${a.score}/${a.total}.`, 5000); }
    render(); flush();
    if (lockActive()) showLockOverlay();
  }

  /* ================= EXAM INTEGRITY ================= */
  /* What this does during a quiz, test or exam ("secure test mode"):
       • the page goes full screen and the menus are hidden;
       • copy, cut, paste, right-click, text selection and dragging are blocked on the whole site;
       • leaving the tab/window, switching apps, opening a new tab, leaving full screen, screenshot keys,
         developer-tool keys, printing or closing/refreshing the page LOCK THE DEVICE;
       • the questions turn black whenever the window loses focus or a screenshot key is pressed,
         and a faint watermark (name, class, time) is printed across each question.
     The lock is stored for the whole device (not just the student profile), so switching student,
     refreshing or closing the browser does not remove it. Only the teacher can unlock it:
       – on the student's device: "Teacher access" → teacher password → "Unlock now", or
       – from anywhere: open #teacher, sign in, type the student's lock code and read out the 6-digit key.

     HONEST LIMITS (please read): this is a strong classroom deterrent, not unbreakable security.
       – A web page cannot detect a photo taken with a separate phone or camera. The watermark makes
         any photo traceable to the student instead.
       – Phone screenshot buttons (power + volume) and some OS screenshot tools can't be detected by
         any website. Most desktop screenshot tools take focus or use keys we can see, so the screen
         blacks out and the device locks.
       – Everything runs in the student's browser. A student who clears this site's browser data
         loses the lock — but also loses all of their saved progress, and if Google Sheets is
         connected you will already have the lock in your sheet.
       – Only a SHA-256 fingerprint of the teacher password is stored in the site's files. */
  const I = Object.assign({ lockOnTabLeave: true, blurGraceMs: 600, requireFullscreen: true, blockCopyPaste: true, screenshotShield: true, lockOnScreenshot: true, watermark: true }, C.integrity || {});
  const LOCK_KEY = "igcse9_device_lock";
  const LOCK_CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I so it is easy to read aloud
  const sha = s => window.SHA256(String(s));
  const randomLockCode = () => { const p = () => LOCK_CODE_CHARS[Math.floor(Math.random() * LOCK_CODE_CHARS.length)]; return [0, 0, 0, 0].map(p).join("") + "-" + [0, 0, 0, 0].map(p).join(""); };
  // the unlock key for a lock code = 6 digits taken from SHA-256(code + teacher password fingerprint)
  function deriveUnlockKey(code, hash) { const h = sha(String(code).toUpperCase().trim() + "::" + (hash || C.teacherPasswordHash)); const n = parseInt(h.slice(0, 12), 16) % 1000000; return String(n).padStart(6, "0").replace(/(\d{3})(\d{3})/, "$1-$2"); }
  const normalizeKey = k => String(k || "").replace(/[^0-9]/g, "");
  const teacherOK = pw => sha(pw) === C.teacherPasswordHash;

  function readLock() { try { return JSON.parse(localStorage.getItem(LOCK_KEY)) || null; } catch (e) { return null; } }
  function writeLock(L) { try { if (L) localStorage.setItem(LOCK_KEY, JSON.stringify(L)); else localStorage.removeItem(LOCK_KEY); } catch (e) { } try { if (L) sessionStorage.setItem(LOCK_KEY, JSON.stringify(L)); else sessionStorage.removeItem(LOCK_KEY); } catch (e) { } }
  function lockActive() { let L = readLock(); if (!L) { try { L = JSON.parse(sessionStorage.getItem(LOCK_KEY)); if (L) writeLock(L); } catch (e) { } } return L; }

  /* ---- loud alarm (generated tone, no audio file needed) ---- */
  let audioCtx = null;
  function playAlarmSound() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain(); osc.type = "square";
        osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 660, now + i * 0.3);
        gain.gain.setValueAtTime(0.0001, now + i * 0.3); gain.gain.exponentialRampToValueAtTime(0.8, now + i * 0.3 + 0.03); gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.3 + 0.28);
        osc.connect(gain); gain.connect(audioCtx.destination); osc.start(now + i * 0.3); osc.stop(now + i * 0.3 + 0.3);
      }
    } catch (e) { /* audio blocked until the student interacts — the lock screen still shows */ }
  }

  /* ---- secure test mode ---- */
  let secure = false, fsEntered = false, leavingFsOnPurpose = false;
  const isQuizActive = () => !!(QZ && !QZ.done);
  async function enterSecureMode() {
    secure = true; document.body.classList.add("secure");
    $("#examBar").hidden = false; $("#examWho").textContent = P ? `${P.name} · ${P.cls}` : "";
    const el = document.documentElement, req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (I.requireFullscreen && req) {
      try { await req.call(el); fsEntered = true; } catch (e) { fsEntered = false; }
      if (!fsEntered && !document.fullscreenElement && !document.webkitFullscreenElement) {
        // the browser refused full screen (e.g. some tablets) — carry on without it
        toast("Full screen isn't available on this device — stay on this tab.", 4000);
      }
    }
    try { window.focus(); } catch (e) { }
    return true;
  }
  function exitSecureMode() {
    secure = false; document.body.classList.remove("secure"); $("#examBar").hidden = true; hideShield(true);
    if (document.fullscreenElement || document.webkitFullscreenElement) { leavingFsOnPurpose = true; try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) { } setTimeout(() => { leavingFsOnPurpose = false; }, 1200); }
    fsEntered = false;
  }
  function watermarkHTML() {
    if (!I.watermark || !P) return "";
    const txt = esc(`${P.name} · ${P.cls} · ${new Date().toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`);
    return `<div class="watermark" aria-hidden="true">${Array.from({ length: 14 }, () => `<span>${txt}</span>`).join("")}</div>`;
  }

  /* ---- privacy shield (black screen) ---- */
  let shieldReasons = new Set();
  function showShield(reason) { if (!I.screenshotShield || !isQuizActive()) return; shieldReasons.add(reason); $("#shield").hidden = false; }
  function hideShield(reason) { if (reason === true) shieldReasons.clear(); else shieldReasons.delete(reason); if (!shieldReasons.size) $("#shield").hidden = true; }

  /* ---- locking ---- */
  let lockOverlayEl = null, lockMode = "locked";
  function triggerLock(reason) {
    if (!isQuizActive() && !secure) return;
    if (lockActive()) { showLockOverlay(); return; }
    const code = randomLockCode(), at = new Date().toISOString();
    const L = { code, reason, at, profileId: P && P.id, name: P && P.name, cls: P && P.cls, quiz: QZ && QZ.title };
    writeLock(L);
    if (P) { P.lockHistory = P.lockHistory || []; P.lockHistory.push({ code, reason, at, quiz: L.quiz }); save(); }
    if (QZ && !QZ.done) { try { finishQuiz(true, false, reason); } catch (e) { } }
    exitSecureMode();
    if (P) queue(Object.assign({ type: "lock", reason, code, quizTitle: L.quiz || "", date: at }, summary()));
    playAlarmSound(); lockMode = "locked"; showLockOverlay();
  }
  function showLockOverlay() {
    if (!lockOverlayEl) { lockOverlayEl = document.createElement("div"); lockOverlayEl.id = "lockOverlay"; document.body.appendChild(lockOverlayEl); }
    document.body.classList.add("locked"); renderLockOverlay();
  }
  function hideLockOverlay() { if (lockOverlayEl) { lockOverlayEl.remove(); lockOverlayEl = null; } document.body.classList.remove("locked"); }
  function unlockDevice(by) {
    const L = lockActive(); writeLock(null);
    if (L && DB.profiles[L.profileId]) { const p = DB.profiles[L.profileId]; const h = (p.lockHistory || []).find(x => x.code === L.code); if (h) { h.unlockedAt = new Date().toISOString(); h.unlockedBy = by; } save(); }
    if (P && L) queue(Object.assign({ type: "unlock", code: L.code, reason: L.reason, by, date: new Date().toISOString() }, summary()));
    hideLockOverlay(); toast("Device unlocked. Welcome back!"); render();
  }
  function renderLockOverlay() {
    if (!lockOverlayEl) return;
    const L = lockActive() || { code: "----", reason: "This device is locked." };
    if (lockMode === "teacherAuth") {
      lockOverlayEl.innerHTML = `<div class="lock-card"><div class="lock-ic">🔑</div><h2>Teacher access</h2><p class="sub small">Enter the teacher password.</p>
        <input class="input" id="teacherPw" type="password" placeholder="Teacher password" autocomplete="off">
        <div class="row mt" style="justify-content:center"><button class="btn primary" id="pwGo">Enter</button><button class="btn" id="pwBack">← Back</button></div>
        <div class="lock-err" id="pwErr" hidden>Incorrect password.</div></div>`;
      const pw = lockOverlayEl.querySelector("#teacherPw"); pw.focus();
      const go = () => { if (teacherOK(pw.value)) { lockMode = "teacherPanel"; renderLockOverlay(); } else { lockOverlayEl.querySelector("#pwErr").hidden = false; pw.value = ""; pw.focus(); } };
      lockOverlayEl.querySelector("#pwGo").onclick = go; pw.onkeydown = e => { if (e.key === "Enter") go(); };
      lockOverlayEl.querySelector("#pwBack").onclick = () => { lockMode = "locked"; renderLockOverlay(); };
      return;
    }
    if (lockMode === "teacherPanel") {
      lockOverlayEl.innerHTML = `<div class="lock-card"><div class="lock-ic">🔑</div><h2>Teacher panel</h2>
        <div class="lock-detail"><div><b>Student:</b> ${esc(L.name || "—")} ${L.cls ? "(" + esc(L.cls) + ")" : ""}</div><div><b>Test:</b> ${esc(L.quiz || "—")}</div><div><b>Reason:</b> ${esc(L.reason || "")}</div><div><b>When:</b> ${L.at ? fmtDT(L.at) : "—"}</div><div><b>Lock code:</b> <code>${esc(L.code)}</code></div></div>
        <button class="btn primary mt" id="unlockNow" style="width:100%">✓ Unlock this device now</button>
        <div class="small muted mt-s">Or give the student this key: <b class="lock-key-inline">${deriveUnlockKey(L.code)}</b></div>
        <div class="row mt" style="justify-content:center"><button class="btn" id="pwBack2">← Back</button></div></div>`;
      lockOverlayEl.querySelector("#unlockNow").onclick = () => { lockMode = "locked"; unlockDevice("teacher on device"); };
      lockOverlayEl.querySelector("#pwBack2").onclick = () => { lockMode = "locked"; renderLockOverlay(); };
      return;
    }
    lockOverlayEl.innerHTML = `<div class="lock-card"><div class="lock-ic">⛔</div><h2>Device locked</h2>
      <p class="sub small">${esc(L.reason || "A rule of secure test mode was broken.")}</p>
      ${L.quiz ? `<p class="small">Your test <b>${esc(L.quiz)}</b> has been submitted.</p>` : ""}
      <div class="lock-code-label">Show this code to ${esc(T)}</div><div class="lock-code">${esc(L.code)}</div>
      <div class="field mt"><label for="unlockIn">Unlock key from your teacher</label><input class="input" id="unlockIn" placeholder="e.g. 123-456" autocomplete="off" inputmode="numeric"></div>
      <button class="btn primary" id="unlockGo" style="width:100%">Unlock</button>
      <div class="lock-err" id="unlockErr" hidden>That key doesn't match. Check it with your teacher.</div>
      <button type="button" id="teacherLink" class="lock-teacher-link">🔑 Teacher access</button></div>`;
    const inp = lockOverlayEl.querySelector("#unlockIn"); inp.focus();
    const tryUnlock = () => {
      if (normalizeKey(inp.value).length === 6 && normalizeKey(inp.value) === normalizeKey(deriveUnlockKey(L.code))) unlockDevice("unlock key");
      else { lockOverlayEl.querySelector("#unlockErr").hidden = false; const c = lockOverlayEl.querySelector(".lock-card"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); inp.value = ""; inp.focus(); }
    };
    lockOverlayEl.querySelector("#unlockGo").onclick = tryUnlock; inp.onkeydown = e => { if (e.key === "Enter") tryUnlock(); };
    lockOverlayEl.querySelector("#teacherLink").onclick = () => { lockMode = "teacherAuth"; renderLockOverlay(); };
  }
  // if another tab of this site gets locked, lock this one too
  window.addEventListener("storage", e => { if (e.key === LOCK_KEY) { if (e.newValue) showLockOverlay(); else hideLockOverlay(); } });

  /* ---- teacher page (#teacher) ---- */
  let teacherSession = false;
  function vTeacher() {
    if (!teacherSession) {
      view.innerHTML = `<div class="quiz-wrap"><div class="card"><div class="eyebrow">Teacher</div><h1 class="h-lg mt-s">Teacher tools 🔑</h1><p class="sub">Sign in with the teacher password to unlock students' devices from your own device.</p>
        <div class="field mt"><label for="tpw">Teacher password</label><input class="input" id="tpw" type="password" autocomplete="off"></div><button class="btn primary" id="tgo">Sign in</button><div class="lock-err" id="terr" hidden>Incorrect password.</div></div></div>`;
      const go = () => { if (teacherOK($("#tpw").value)) { teacherSession = true; vTeacher(); } else $("#terr").hidden = false; };
      $("#tgo").onclick = go; $("#tpw").onkeydown = e => { if (e.key === "Enter") go(); };
      return;
    }
    const hist = Object.values(DB.profiles).flatMap(p => (p.lockHistory || []).map(h => Object.assign({ name: p.name, cls: p.cls }, h))).sort((a, b) => b.at.localeCompare(a.at));
    view.innerHTML = `<div class="eyebrow">Teacher</div><h1 class="h-xl">Teacher tools 🔑</h1>
      <div class="section grid2">
        <div class="card"><h2 class="h-md">Unlock key generator</h2><p class="small muted">Type the 8-character code shown on the student's locked screen. Read the 6-digit key back to the student. Each code has its own key.</p>
          <div class="field"><label for="tcode">Student's lock code</label><input class="input" id="tcode" placeholder="e.g. AB3K-7F2Q" style="text-transform:uppercase"></div><button class="btn primary" id="tgen">Generate unlock key</button><div class="lock-key" id="tout" hidden></div></div>
        <div class="card"><h2 class="h-md">Change the teacher password</h2><p class="small muted">Type a new password to get its fingerprint, then paste it into <code>js/config.js</code> → <code>teacherPasswordHash</code> and commit. Unlock keys change with the password.</p>
          <div class="field"><label for="tnew">New password</label><input class="input" id="tnew" type="text" autocomplete="off" placeholder="at least 10 characters"></div><button class="btn" id="thash">Make fingerprint</button><div class="hash-out" id="thashOut" hidden></div></div>
      </div>
      <div class="section card"><h2 class="h-md">Locks on this device</h2>${hist.length ? `<div class="table-wrap mt-s"><table class="data-table"><tr><th>When</th><th>Student</th><th>Test</th><th>Reason</th><th>Code</th><th>Unlocked</th></tr>${hist.map(h => `<tr><td class="small">${fmtDT(h.at)}</td><td>${esc(h.name)} <span class="muted small">${esc(h.cls)}</span></td><td class="small">${esc(h.quiz || "")}</td><td class="small">${esc(h.reason)}</td><td><code>${esc(h.code)}</code></td><td class="small">${h.unlockedAt ? fmtDT(h.unlockedAt) + " · " + esc(h.unlockedBy || "") : "—"}</td></tr>`).join("")}</table></div>` : `<div class="empty">No locks recorded on this device.</div>`}
        ${C.googleSheetsUrl ? `<p class="small muted mt-s">Locks from every student are also in the <b>Integrity</b> tab of your Google Sheet.</p>` : `<p class="small muted mt-s">Connect Google Sheets (see README) to see locks from every student's device in one place.</p>`}</div>
      <div class="row mt"><button class="btn" id="tout2">Sign out</button></div>`;
    $("#tgen").onclick = () => { const c = $("#tcode").value.trim().toUpperCase(); if (!c) return; const o = $("#tout"); o.textContent = deriveUnlockKey(c); o.hidden = false; };
    $("#thash").onclick = () => { const v = $("#tnew").value; if (v.length < 10) return toast("Use at least 10 characters."); const o = $("#thashOut"); o.innerHTML = `teacherPasswordHash: "<b>${sha(v)}</b>",`; o.hidden = false; };
    $("#tout2").onclick = () => { teacherSession = false; location.hash = "#home"; };
  }

  /* ---- detecting rule breaks during an active quiz ---- */
  const typing = el => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
  // copy / cut / paste / right-click / select / drag: blocked everywhere, lock during a quiz
  ["copy", "cut"].forEach(ev => document.addEventListener(ev, e => {
    if (lockOverlayEl && e.target.closest && e.target.closest(".lock-card")) return; // teacher can copy a code
    if (!I.blockCopyPaste && !isQuizActive()) return;
    e.preventDefault(); try { e.clipboardData && e.clipboardData.setData("text/plain", ""); } catch (x) { }
    if (isQuizActive()) triggerLock(ev === "copy" ? "Copying was attempted during a test." : "Cutting text was attempted during a test.");
    else toast("Copying is turned off on this site.", 2000);
  }));
  document.addEventListener("paste", e => {
    if (lockOverlayEl) return;
    if (!I.blockCopyPaste && !isQuizActive()) return;
    e.preventDefault();
    if (isQuizActive()) triggerLock("Pasting was attempted during a test — outside help, including AI tools, is not allowed.");
    else toast("Pasting is turned off on this site.", 2000);
  });
  document.addEventListener("contextmenu", e => { if (I.blockCopyPaste || isQuizActive()) e.preventDefault(); });
  document.addEventListener("dragstart", e => { if (I.blockCopyPaste || isQuizActive()) e.preventDefault(); });
  document.addEventListener("selectstart", e => { if ((I.blockCopyPaste || isQuizActive()) && !typing(e.target)) e.preventDefault(); });

  document.addEventListener("keydown", e => {
    const k = (e.key || "").toLowerCase(), combo = e.ctrlKey || e.metaKey;
    if (lockOverlayEl && !typing(e.target) && !(e.key === "Enter")) { if (k !== "tab") e.preventDefault(); }
    // blocked shortcuts anywhere on the site
    if (combo && (["c", "x", "v", "a", "s", "p", "u"].includes(k) || (isQuizActive() && ["f", "g"].includes(k))) && !(typing(e.target) && k === "a")) {
      e.preventDefault();
      if (isQuizActive() && ["c", "x", "v", "p", "u"].includes(k)) { triggerLock(k === "p" ? "Printing was attempted during a test." : k === "u" ? "Viewing the page source was attempted during a test." : "A copy/paste shortcut was used during a test."); }
      return;
    }
    if (!isQuizActive()) return;
    if (k === "f12" || (combo && e.shiftKey && ["i", "j", "c", "k"].includes(k)) || (e.metaKey && e.altKey && ["i", "j", "c"].includes(k))) { e.preventDefault(); triggerLock("Developer tools were opened during a test."); return; }
    if (k === "printscreen" || k === "snapshot") { e.preventDefault(); showShield("ps"); scrubClipboard(); if (I.lockOnScreenshot) triggerLock("A screenshot was attempted during a test."); return; }
    if (e.metaKey && e.shiftKey && ["3", "4", "5", "s", "#", "$", "%"].includes(k)) { e.preventDefault(); showShield("meta"); if (I.lockOnScreenshot) triggerLock("A screenshot shortcut was used during a test."); return; }
    if (k === "meta" || k === "os" || k === "super") showShield("meta"); // Windows / Cmd key: hide questions straight away
    if ((e.altKey && k === "tab") || (combo && ["t", "n", "w", "tab"].includes(k))) { e.preventDefault(); }
    if (k === "escape" || k === "f11") e.preventDefault();
  }, true);
  document.addEventListener("keyup", e => {
    const k = (e.key || "").toLowerCase();
    if (k === "printscreen" || k === "snapshot") { if (isQuizActive()) { showShield("ps"); scrubClipboard(); if (I.lockOnScreenshot) triggerLock("A screenshot was attempted during a test."); } return; }
    if (k === "meta" || k === "os" || k === "super") hideShield("meta");
  }, true);
  function scrubClipboard() { try { navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText("Screenshots are not allowed during tests.").catch(() => { }); } catch (e) { } }

  // leaving the tab / window / app
  let blurTimer = null;
  window.addEventListener("blur", () => {
    if (!isQuizActive()) return;
    showShield("blur");
    if (!I.lockOnTabLeave) return;
    clearTimeout(blurTimer);
    blurTimer = setTimeout(() => { if (isQuizActive() && !document.hasFocus()) triggerLock("You left the test window (another app, window, tab or screenshot tool was opened)."); }, I.blurGraceMs);
  });
  window.addEventListener("focus", () => { clearTimeout(blurTimer); hideShield("blur"); hideShield("meta"); hideShield("ps"); });
  document.addEventListener("visibilitychange", () => {
    if (!isQuizActive()) return;
    if (document.visibilityState === "hidden") { showShield("hidden"); if (I.lockOnTabLeave) triggerLock("You left the test tab (switched tab, app or closed the page)."); }
    else hideShield("hidden");
  });
  window.addEventListener("pagehide", () => { if (isQuizActive() && I.lockOnTabLeave) triggerLock("The test page was closed or refreshed before the test was finished."); });
  // leaving full screen
  ["fullscreenchange", "webkitfullscreenchange"].forEach(ev => document.addEventListener(ev, () => {
    const inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (inFs) { fsEntered = true; return; }
    if (fsEntered && isQuizActive() && !leavingFsOnPurpose && I.requireFullscreen) triggerLock("You left full screen during a test.");
  }));
  // mouse leaving the page (towards another window or a snipping tool): hide the questions
  document.documentElement.addEventListener("mouseleave", () => { if (isQuizActive()) showShield("mouse"); });
  document.documentElement.addEventListener("mouseenter", () => hideShield("mouse"));
  // three-finger screenshot gesture on some phones/tablets
  document.addEventListener("touchstart", e => { if (isQuizActive() && e.touches && e.touches.length >= 3) { e.preventDefault(); showShield("touch"); if (I.lockOnScreenshot) triggerLock("A three-finger screenshot gesture was detected during a test."); } }, { passive: false });
  // printing
  window.addEventListener("beforeprint", () => { if (isQuizActive()) triggerLock("Printing was attempted during a test."); });

  /* ---------------- init ---------------- */
  $("#shield").addEventListener("click", () => { if (document.hasFocus()) hideShield(true); });
  if (lockActive()) showLockOverlay();
  if (DB.current && DB.profiles[DB.current]) { useProfile(DB.current); afterLogin(); }
  else if (location.hash.startsWith("#teacher")) render();
  else { chrome("home"); if (!lockActive()) loginModal(); }
  window.__app = { buildQuestions: (o, n) => buildQuestions(o, n, "test"), TOPICS, schedule, deriveUnlockKey }; // for testing
})();
