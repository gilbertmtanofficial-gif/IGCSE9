/* Shared helpers: random utilities, SHA-256 and logic-gate / circuit drawings (SVG). */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  window.QUtil = { R, pick, shuffle };

  /* ---------- SHA-256 (works offline and on file://) ---------- */
  window.SHA256 = function (ascii) {
    const rightRotate = (v, n) => (v >>> n) | (v << (32 - n));
    const maxWord = Math.pow(2, 32);
    let result = "", words = [], i, j;
    const str = unescape(encodeURIComponent(ascii));
    const asciiBitLength = str.length * 8;
    const hash = [], k = [];
    let primeCounter = 0; const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (Math.pow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    let s = str + "\x80";
    while (s.length % 64 - 56) s += "\x00";
    for (i = 0; i < s.length; i++) { j = s.charCodeAt(i); words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    let H = hash.slice(0, 8);
    for (j = 0; j < words.length;) {
      const w = words.slice(j, j += 16), oldHash = H;
      H = H.slice(0, 8);
      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const a = H[0], e = H[4];
        const temp1 = H[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & H[5]) ^ ((~e) & H[6])) + k[i] +
          (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
        const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & H[1]) ^ (a & H[2]) ^ (H[1] & H[2]));
        H = [(temp1 + temp2) | 0].concat(H); H[4] = (H[4] + temp1) | 0; H.length = 8;
      }
      for (i = 0; i < 8; i++) H[i] = (H[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { const b = (H[i] >> (j * 8)) & 255; result += ((b < 16) ? "0" : "") + b.toString(16); }
    return result;
  };

  /* ---------- logic gates ---------- */
  const INK = "#16213a";
  function gatePath(op) {
    // body drawn in a 60 x 40 box, inputs on the left, output at (60,20)
    const and = "M0,0 H32 A20,20 0 0 1 32,40 H0 Z";
    const or = "M0,0 Q16,20 0,40 Q38,40 60,20 Q38,0 0,0 Z";
    const not = "M0,2 L46,20 L0,38 Z";
    let d = "", extra = "", out = 60;
    if (op === "AND" || op === "NAND") d = and;
    if (op === "OR" || op === "NOR" || op === "XOR") d = or;
    if (op === "XOR") extra += `<path d="M-8,0 Q8,20 -8,40" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
    if (op === "NOT") { d = not; extra += `<circle cx="51" cy="20" r="5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`; out = 56; }
    if (op === "NAND") { extra += `<circle cx="57" cy="20" r="5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`; out = 62; }
    if (op === "NOR") { extra += `<circle cx="65" cy="20" r="5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`; out = 70; }
    return { body: `<path d="${d}" fill="#fff8e8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>${extra}`, out };
  }
  /* One gate on its own, with input/output lines and labels. */
  function gateSVG(op, opts) {
    opts = opts || {};
    const g = gatePath(op), one = op === "NOT";
    const ins = one ? [20] : [10, 30];
    const labels = one ? ["A"] : ["A", "B"];
    let s = `<svg class="gate-svg" viewBox="-50 -14 ${g.out + 100} 68" width="${opts.w || 190}" role="img" aria-label="${op} gate">`;
    ins.forEach((y, i) => { s += `<line x1="-26" y1="${y}" x2="${op === "XOR" ? -4 : 2}" y2="${y}" stroke="${INK}" stroke-width="2.5"/><text x="-32" y="${y + 5}" font-size="14" font-weight="700" text-anchor="end" fill="${INK}" font-family="Nunito, sans-serif">${labels[i]}</text>`; });
    s += g.body + `<line x1="${g.out}" y1="20" x2="${g.out + 26}" y2="20" stroke="${INK}" stroke-width="2.5"/><text x="${g.out + 32}" y="25" font-size="14" font-weight="700" fill="${INK}" font-family="Nunito, sans-serif">X</text>`;
    if (opts.caption !== false) s += `<text x="${g.out / 2 - 4}" y="${op === "NOT" ? 52 : 54}" font-size="12" font-weight="800" text-anchor="middle" fill="#a87908" font-family="Nunito, sans-serif">${op}</text>`;
    return s + "</svg>";
  }

  /* ---------- expressions ---------- */
  // tree: {in:"A"} | {op:"NOT", a} | {op:"AND"|"OR"|"NAND"|"NOR"|"XOR", a, b}
  const evalTree = (t, env) => {
    if (t.in) return env[t.in];
    const a = evalTree(t.a, env), b = t.b ? evalTree(t.b, env) : 0;
    switch (t.op) { case "NOT": return a ? 0 : 1; case "AND": return a & b; case "OR": return a | b; case "NAND": return (a & b) ? 0 : 1; case "NOR": return (a | b) ? 0 : 1; case "XOR": return a ^ b; }
    return 0;
  };
  const exprText = (t, top) => {
    if (t.in) return t.in;
    if (t.op === "NOT") return "NOT " + (t.a.in || t.a.op === "NOT" ? exprText(t.a) : "(" + exprText(t.a, true) + ")");
    const s = exprText(t.a) + " " + t.op + " " + exprText(t.b);
    return top ? s : "(" + s + ")";
  };
  const inputsOf = t => { const s = new Set(); (function w(n) { if (n.in) s.add(n.in); else { w(n.a); if (n.b) w(n.b); } })(t); return [...s].sort(); };
  function truthRows(t, vars) {
    vars = vars || inputsOf(t); const rows = [];
    for (let m = 0; m < (1 << vars.length); m++) { const env = {}; vars.forEach((v, i) => env[v] = (m >> (vars.length - 1 - i)) & 1); rows.push({ env, x: evalTree(t, env) }); }
    return { vars, rows };
  }
  function truthTableHTML(t, opts) {
    opts = opts || {}; const { vars, rows } = truthRows(t, opts.vars);
    const hide = opts.hide || []; // row indexes whose output shows "?"
    return `<table class="tbl tt"><tr>${vars.map(v => `<th>${v}</th>`).join("")}<th>${opts.outName || "X"}</th></tr>${rows.map((r, i) => `<tr>${vars.map(v => `<td>${r.env[v]}</td>`).join("")}<td><b>${hide.includes(i) ? "?" : r.x}</b></td></tr>`).join("")}</table>`;
  }

  /* ---------- circuit drawing (left = inputs, right = output X) ---------- */
  function circuitSVG(tree, outName) {
    outName = outName || "X";
    const COLW = 120, ROWH = 46;
    let slot = 0;
    const depth = n => n.in ? 0 : 1 + Math.max(depth(n.a), n.b ? depth(n.b) : 0);
    const D = depth(tree);
    // assign positions
    (function place(n, level) {
      if (n.in) { n.y = slot++ * ROWH + 20; n.level = 0; return; }
      place(n.a, level + 1); if (n.b) place(n.b, level + 1);
      n.y = n.b ? (n.a.y + n.b.y) / 2 : n.a.y; n.level = level;
    })(tree, 0);
    const W = 60 + D * COLW + 70, H = slot * ROWH + 10;
    const xOf = n => 40 + (D - n.level) * COLW - 70; // gate left x
    let s = `<svg class="circuit-svg" viewBox="0 0 ${W} ${H}" width="${Math.min(620, W * 1.15)}" role="img" aria-label="Logic circuit for X = ${exprText(tree, true)}">`;
    const line = (x1, y1, x2, y2) => `<polyline points="${x1},${y1} ${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
    const outPoint = n => n.in ? { x: 32, y: n.y } : { x: xOf(n) + gatePath(n.op).out, y: n.y };
    (function draw(n) {
      if (n.in) { s += `<text x="8" y="${n.y + 5}" font-size="15" font-weight="800" fill="${INK}" font-family="Nunito, sans-serif">${n.in}</text>`; return; }
      draw(n.a); if (n.b) draw(n.b);
      const gx = xOf(n), gy = n.y - 20, g = gatePath(n.op);
      const pins = n.b ? [gy + 10, gy + 30] : [gy + 20];
      [n.a, n.b].filter(Boolean).forEach((c, i) => { const o = outPoint(c); s += line(o.x, o.y, gx + (n.op === "XOR" ? -4 : 2), pins[i]); });
      s += `<g transform="translate(${gx},${gy})">${g.body}</g>`;
    })(tree);
    const o = outPoint(tree);
    s += `<line x1="${o.x}" y1="${o.y}" x2="${W - 22}" y2="${o.y}" stroke="${INK}" stroke-width="2.2"/><text x="${W - 16}" y="${o.y + 5}" font-size="15" font-weight="800" fill="${INK}" font-family="Nunito, sans-serif">${outName}</text>`;
    return s + "</svg>";
  }

  window.LOGIC = { gateSVG, circuitSVG, evalTree, exprText, inputsOf, truthRows, truthTableHTML };
})();

/* ---------- flowchart drawings (SVG) ---------- */
(function () {
  const INK = "#16213a", F = "Nunito, sans-serif";
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const txt = (x, y, t, size) => `<text x="${x}" y="${y}" font-size="${size || 13}" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${INK}" font-family="${F}">${esc(t)}</text>`;
  const fit = (w, t, k) => Math.max(w, String(t).length * (k || 7.6) + 34);
  const shape = {
    term: (cx, cy, w, t) => (w = fit(w, t), 0) || `<rect x="${cx - w / 2}" y="${cy - 18}" width="${w}" height="36" rx="18" fill="#e2f6ec" stroke="${INK}" stroke-width="2"/>` + txt(cx, cy, t),
    io: (cx, cy, w, t) => (w = fit(w, t), 0) || `<path d="M${cx - w / 2 + 14},${cy - 18} H${cx + w / 2 + 6} L${cx + w / 2 - 14},${cy + 18} H${cx - w / 2 - 6} Z" fill="#eaf0fa" stroke="${INK}" stroke-width="2"/>` + txt(cx, cy, t),
    proc: (cx, cy, w, t) => (w = fit(w, t), 0) || `<rect x="${cx - w / 2}" y="${cy - 18}" width="${w}" height="36" fill="#fff8e8" stroke="${INK}" stroke-width="2"/>` + txt(cx, cy, t),
    sub: (cx, cy, w, t) => (w = fit(w, t), 0) || `<rect x="${cx - w / 2}" y="${cy - 18}" width="${w}" height="36" fill="#fff8e8" stroke="${INK}" stroke-width="2"/><line x1="${cx - w / 2 + 9}" y1="${cy - 18}" x2="${cx - w / 2 + 9}" y2="${cy + 18}" stroke="${INK}" stroke-width="2"/><line x1="${cx + w / 2 - 9}" y1="${cy - 18}" x2="${cx + w / 2 - 9}" y2="${cy + 18}" stroke="${INK}" stroke-width="2"/>` + txt(cx, cy, t),
    dec: (cx, cy, w, t) => (w = fit(w, t, 9.4), 0) || `<path d="M${cx},${cy - 32} L${cx + w / 2},${cy} L${cx},${cy + 32} L${cx - w / 2},${cy} Z" fill="#fdf4dc" stroke="${INK}" stroke-width="2"/>` + txt(cx, cy, t, 12.5)
  };
  const arrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="2" marker-end="url(#fa)"/>`;
  const defs = `<defs><marker id="fa" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="${INK}"/></marker></defs>`;
  const lbl = (x, y, t) => `<text x="${x}" y="${y}" font-size="12" font-weight="800" fill="#a87908" font-family="${F}">${t}</text>`;

  /* Legend of the standard symbols */
  function legend() {
    let s = `<svg viewBox="0 0 690 120" class="diagram" role="img" aria-label="Flowchart symbols">${defs}`;
    s += shape.term(70, 40, 100, "START / STOP") + shape.io(220, 40, 120, "INPUT / OUTPUT") + shape.proc(355, 40, 100, "Process") + shape.dec(482, 40, 120, "Decision?") + shape.sub(620, 40, 110, "Subroutine");
    s += arrow(20, 98, 90, 98);
    [[70, "Terminator"], [220, "Input/Output"], [355, "Process"], [482, "Decision"], [620, "Subroutine/procedure"]].forEach(([x, t]) => { s += `<text x="${x}" y="88" font-size="11" text-anchor="middle" fill="#4c5873" font-family="${F}">${t}</text>`; });
    return s + `<text x="100" y="102" font-size="11" fill="#4c5873" font-family="${F}">Flow line (shows the order)</text></svg>`;
  }
  /* Selection: Start → INPUT v → decision → yes/no outputs → Stop */
  function selection(o) {
    const W = 460, cx = 160;
    let s = `<svg viewBox="0 0 ${W} 360" class="diagram flow" role="img" aria-label="Flowchart: ${esc(o.cond)}">${defs}`;
    s += shape.term(cx, 24, 100, "START") + arrow(cx, 42, cx, 64);
    s += shape.io(cx, 84, 150, "INPUT " + o.input) + arrow(cx, 102, cx, 128);
    const dw = fit(210, o.cond, 9.4); s += shape.dec(cx, 162, 210, o.cond);
    s += arrow(cx, 194, cx, 226) + lbl(cx + 6, 214, "Yes");
    s += shape.io(cx, 246, 170, o.yes);
    s += `<polyline points="${cx + dw / 2},162 360,162 360,228" fill="none" stroke="${INK}" stroke-width="2" marker-end="url(#fa)"/>` + lbl(cx + dw / 2 + 6, 154, "No");
    s += shape.io(360, 246, 170, o.no);
    s += `<polyline points="${cx},264 ${cx},300 ${cx},318" fill="none" stroke="${INK}" stroke-width="2" marker-end="url(#fa)"/><polyline points="360,264 360,300 ${cx + 2},300" fill="none" stroke="${INK}" stroke-width="2"/>`;
    s += shape.term(cx, 336, 100, "STOP");
    return s + "</svg>";
  }
  /* Loop: init → decision → body boxes → back to decision; "No" exit → output → stop.
     o = { init, cond, body: [[type, text], ...], out } */
  function loop(o) {
    const cx = 230, body = o.body || [], bTop = 232, step = 62;
    const endBody = bTop + (body.length - 1) * step, back = endBody + 40, exitY = back + 26;
    const H = exitY + 108;
    let s = `<svg viewBox="0 0 480 ${H}" class="diagram flow" role="img" aria-label="Flowchart with a loop">${defs}`;
    s += shape.term(cx, 22, 100, "START") + arrow(cx, 40, cx, 58);
    s += shape.proc(cx, 76, 200, o.init) + arrow(cx, 94, cx, 120);
    const dw = fit(200, o.cond, 9.4); s += shape.dec(cx, 154, 200, o.cond);
    s += arrow(cx, 186, cx, 214) + lbl(cx + 6, 204, "Yes");
    body.forEach(([t, txt2], i) => { const y = bTop + i * step; s += shape[t || "proc"](cx, y, 200, txt2); if (i < body.length - 1) s += arrow(cx, y + 18, cx, y + step - 18); });
    s += `<polyline points="${cx},${endBody + 18} ${cx},${back} 24,${back} 24,154 ${cx - dw / 2},154" fill="none" stroke="${INK}" stroke-width="2" marker-end="url(#fa)"/>`;
    s += `<polyline points="${cx + dw / 2},154 456,154 456,${exitY} ${cx},${exitY}" fill="none" stroke="${INK}" stroke-width="2"/>` + lbl(cx + dw / 2 + 6, 146, "No");
    s += arrow(cx, exitY, cx, exitY + 22);
    s += shape.io(cx, exitY + 40, 200, o.out) + arrow(cx, exitY + 58, cx, exitY + 72) + shape.term(cx, exitY + 90, 100, "STOP");
    return s + "</svg>";
  }
  window.FLOW = { legend, selection, loop };
})();
