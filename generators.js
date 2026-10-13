/* Random question generators — brand-new questions with new values every try.
   Each generator returns { q, a, w:[wrongs], c?:code, h?:html, e?:explanation, t?:true|[accepted], s?:seconds }.
   s = seconds allowed for this question (calculations get longer; default comes from config). */
(function () {
  const { R, pick, shuffle } = window.QUtil;
  const CALC = (window.CONFIG && window.CONFIG.secondsPerCalculation) || 90;
  const uniq3 = (ans, list) => { const out = []; list.map(String).forEach(v => { if (v !== String(ans) && !out.includes(v)) out.push(v); }); return out.slice(0, 3); };
  const near = (ans, spread = 3, extra = [], min = 0) => {
    const set = new Set(); extra.forEach(v => { if (v !== ans && v >= min) set.add(v); });
    let guard = 0; while (set.size < 3 && guard++ < 200) { const v = ans + R(-spread, spread); if (v !== ans && v >= min) set.add(v); }
    let k = 1; while (set.size < 3) { set.add(ans + spread + k++); }
    return [...set].slice(0, 3).map(String);
  };
  const bin = (n, bits = 8) => (n >>> 0).toString(2).padStart(bits, "0").slice(-bits);
  const hex = (n, d) => n.toString(16).toUpperCase().padStart(d || 1, "0");
  const flipBit = (s, i) => s.slice(0, i) + (s[i] === "1" ? "0" : "1") + s.slice(i + 1);
  const ones = s => [...s].filter(c => c === "1").length;
  const fmt = n => Number.isInteger(n) ? n.toLocaleString("en-US").replace(/,/g, " ") : String(n);
  const round2 = n => Math.round(n * 100) / 100;
  const binWrong = (ans, bits) => { const w = new Set(); let g = 0; while (w.size < 3 && g++ < 50) { const i = R(0, bits - 1); const v = flipBit(ans, i); if (v !== ans) w.add(v); } return [...w]; };

  const G = [];
  const add = (objs, fn) => G.push({ objs, fn });

  /* ================= 1.1 BINARY ================= */
  add(["1.1b"], () => { const n = R(1, 255), b = bin(n); return { q: `Convert the 8-bit binary number ${b} to denary.`, a: String(n), w: near(n, 12, [n ^ 1, n + 128 > 255 ? n - 64 : n + 128, parseInt(b.split("").reverse().join(""), 2)]), t: true, s: CALC, e: `Add the place values where there is a 1: ${b.split("").map((c, i) => c === "1" ? 2 ** (7 - i) : null).filter(x => x).join(" + ")} = ${n}.` }; });
  add(["1.1b"], () => { const n = R(1, 255), b = bin(n); return { q: `Convert the denary number ${n} to 8-bit binary.`, a: b, w: binWrong(b, 8), t: [b.replace(/^0+/, "")], s: CALC, e: `${n} = ${b.split("").map((c, i) => c === "1" ? 2 ** (7 - i) : null).filter(x => x).join(" + ")}.` }; });
  add(["1.1b"], () => { const n = R(256, 65535), b = bin(n, 16); return { q: `Convert the 16-bit binary number ${b.slice(0, 8)} ${b.slice(8)} to denary.`, a: String(n), w: near(n, 40, [n - 256 > 0 ? n - 256 : n + 512, n & 255, (n >> 8)]), t: true, s: CALC + 30 }; });
  add(["1.1b"], () => { const k = R(3, 12); return { q: `What is the largest denary number that can be stored in ${k} bits?`, a: String(2 ** k - 1), w: uniq3(2 ** k - 1, [2 ** k, 2 ** (k - 1), 2 ** k + 1, k * 8]), t: true, e: `With ${k} bits the largest value is 2^${k} − 1 = ${2 ** k - 1}.` }; });
  add(["1.1b"], () => { const n = R(5, 1000), k = n.toString(2).length; return { q: `What is the smallest number of bits needed to store the denary number ${n}?`, a: String(k), w: near(k, 2, [], 1), t: true, e: `${n} in binary is ${n.toString(2)}, which has ${k} bits.` }; });

  add(["1.1c"], () => { let a, b; do { a = R(1, 200); b = R(1, 200); } while (a + b > 255); const s = bin(a + b); return { q: `Add these two 8-bit binary numbers. Give the 8-bit answer.`, c: `  ${bin(a)}\n+ ${bin(b)}`, a: s, w: uniq3(s, [bin(a | b), bin((a + b) ^ 2), bin((a + b) ^ 16), binWrong(s, 8)[0]]), t: [s.replace(/^0+/, "")], s: CALC, e: `${a} + ${b} = ${a + b} = ${s}.` }; });
  add(["1.1c"], () => { const over = Math.random() < 0.5; let a, b; do { a = R(60, 250); b = R(10, 220); } while (over ? a + b <= 255 : a + b > 255); return { q: `${bin(a)} and ${bin(b)} are added in an 8-bit register. Will an overflow error occur?`, a: over ? `Yes — the answer is ${a + b}, which is greater than 255` : `No — the answer is ${a + b}, which fits in 8 bits`, w: over ? [`No — the answer is ${a + b}, which fits in 8 bits`, "No — overflow only happens with negative numbers", "Yes — every addition causes overflow"] : [`Yes — the answer is ${a + b}, which is greater than 255`, "Yes — every addition causes overflow", "No — overflow can never happen in binary"], s: CALC }; });
  add(["1.1c"], () => { let a, b; do { a = R(130, 250); b = R(130, 250); } while (a + b <= 255); const lo = bin((a + b) & 255); return { q: `${bin(a)} + ${bin(b)} is calculated in an 8-bit register. What 8 bits are left in the register?`, a: lo, w: uniq3(lo, [bin(a + b, 9), "11111111", bin(a | b), bin(((a + b) & 255) ^ 128)]), t: true, s: CALC, e: `${a} + ${b} = ${a + b} = ${bin(a + b, 9)} (9 bits). The 9th bit is lost: overflow, leaving ${lo}.` }; });

  /* ================= 1.2 HEXADECIMAL ================= */
  add(["1.2a"], () => { const n = R(16, 255), h = hex(n); return { q: `Convert the hexadecimal number ${h} to denary.`, a: String(n), w: near(n, 10, [parseInt(h.split("").reverse().join(""), 16), (n >> 4) * 10 + (n & 15)]), t: true, s: CALC, e: `${h} = (${n >> 4} × 16) + (${n & 15} × 1) = ${n}.` }; });
  add(["1.2a"], () => { const n = R(16, 255), h = hex(n); return { q: `Convert the denary number ${n} to hexadecimal.`, a: h, w: uniq3(h, [hex(n ^ 1), h.split("").reverse().join(""), String(Math.floor(n / 16)) + String(n % 16), hex((n + 16) & 255)]), t: true, s: CALC, e: `${n} ÷ 16 = ${n >> 4} remainder ${n & 15} → ${h}.` }; });
  add(["1.2a"], () => { const n = R(1, 255), b = bin(n), h = hex(n, 2); return { q: `Convert the binary number ${b.slice(0, 4)} ${b.slice(4)} to hexadecimal.`, a: h, w: uniq3(h, [hex(n ^ 16, 2), hex(n ^ 1, 2), h.split("").reverse().join(""), String(n)]), t: [hex(n)], s: CALC, e: `${b.slice(0, 4)} = ${h[0]}, ${b.slice(4)} = ${h[1]}.` }; });
  add(["1.2a"], () => { const n = R(16, 255), h = hex(n, 2), b = bin(n); return { q: `Convert the hexadecimal number ${h} to 8-bit binary.`, a: b, w: binWrong(b, 8), t: [b.replace(/^0+/, "")], s: CALC, e: `${h[0]} = ${b.slice(0, 4)} and ${h[1]} = ${b.slice(4)}.` }; });
  add(["1.2a"], () => { const n = R(256, 4095), h = hex(n); return { q: `Convert the hexadecimal number ${h} to denary.`, a: String(n), w: near(n, 30, [(n >> 8) * 100 + ((n >> 4) & 15) * 10 + (n & 15), n - 256]), t: true, s: CALC + 30, e: `${h} = (${n >> 8} × 256) + (${(n >> 4) & 15} × 16) + (${n & 15} × 1) = ${n}.` }; });
  add(["1.2a"], () => { const n = R(4096, 65535), b = bin(n, 16), h = hex(n, 4); return { q: `Convert this 16-bit binary number to hexadecimal: ${b.match(/.{4}/g).join(" ")}`, a: h, w: uniq3(h, [hex(n ^ 0x100, 4), hex(n ^ 0x10, 4), h.split("").reverse().join("")]), t: true, s: CALC }; });
  add(["1.2a"], () => { const d = pick("0123456789ABCDEF".split("")); const v = parseInt(d, 16); return { q: `What is the hex digit ${d} as a 4-bit binary nibble?`, a: bin(v, 4), w: binWrong(bin(v, 4), 4), t: true }; });

  add(["1.2b"], () => { const r = R(0, 255), g = R(0, 255), b2 = R(0, 255), code = "#" + hex(r, 2) + hex(g, 2) + hex(b2, 2); const which = pick([["red", r], ["green", g], ["blue", b2]]); return { q: `An HTML colour code is ${code}. What is the ${which[0]} value in denary?`, a: String(which[1]), w: uniq3(which[1], [r, g, b2, which[1] ^ 16, (which[1] + 32) % 256]), t: true, s: CALC, h: `<div class="swatch" style="background:${code}"></div>` }; });

  /* ================= 1.3 SHIFTS & TWO'S COMPLEMENT ================= */
  add(["1.3a"], () => { const k = R(1, 3); let n; do { n = R(1, 255); } while (Math.random() < 0.7 && (n << k) > 255); const res = (n << k) & 255; const b = bin(res); return { q: `Perform a logical LEFT shift of ${k} place${k > 1 ? "s" : ""} on ${bin(n)}. What is the result?`, a: b, w: uniq3(b, [bin(n >> k), bin((n << (k + 1)) & 255), bin((n << Math.max(1, k - 1)) & 255), binWrong(b, 8)[0]]), t: true, s: CALC, e: (n << k) > 255 ? `Bits shifted off the left are lost, so the answer is not ${n} × ${2 ** k}.` : `${n} × ${2 ** k} = ${res}.` }; });
  add(["1.3a"], () => { const k = R(1, 3), n = R(8, 255), res = n >> k, b = bin(res); return { q: `Perform a logical RIGHT shift of ${k} place${k > 1 ? "s" : ""} on ${bin(n)}. What is the result?`, a: b, w: uniq3(b, [bin((n << k) & 255), bin(n >> (k + 1)), bin(n >> Math.max(1, k - 1) === res ? res ^ 1 : n >> Math.max(1, k - 1)), binWrong(b, 8)[0]]), t: true, s: CALC, e: `${n} ÷ ${2 ** k} = ${n / 2 ** k}; any remainder is lost, giving ${res}.` }; });
  add(["1.3a"], () => { const k = R(1, 4), dir = pick(["left", "right"]); const f = 2 ** k; return { q: `A positive binary integer is given a logical ${dir} shift of ${k} place${k > 1 ? "s" : ""}. What is the effect?`, a: dir === "left" ? `It is multiplied by ${f}` : `It is divided by ${f}`, w: dir === "left" ? uniq3(`It is multiplied by ${f}`, [`It is divided by ${f}`, k > 1 ? `It is multiplied by ${k}` : "It becomes negative", `It is multiplied by ${f * 2}`, "It becomes negative"]) : uniq3(`It is divided by ${f}`, [`It is multiplied by ${f}`, k > 1 ? `It is divided by ${k}` : "It becomes negative", `It is divided by ${f * 2}`, "It becomes negative"]) }; });
  add(["1.3a"], () => { let n, k; do { n = R(1, 60); k = R(1, 2); } while ((n << k) > 255); return { q: `${bin(n)} (denary ${n}) is shifted ${k} place${k > 1 ? "s" : ""} to the left. What is the new value in denary?`, a: String(n << k), w: near(n << k, 6, [n * k, n >> k, n << (k + 1)]), t: true, s: CALC }; });

  add(["1.3b"], () => { const n = R(1, 128); const v = (256 - n) & 255, b = bin(v); return { q: `Convert −${n} into an 8-bit two's complement binary number.`, a: b, w: uniq3(b, ["1" + bin(n, 7), bin(255 - n), bin(n), binWrong(b, 8)[1]]), t: true, s: CALC, e: `+${n} = ${bin(n)} → invert = ${bin(255 - n)} → add 1 = ${b}.` }; });
  add(["1.3b"], () => { const neg = Math.random() < 0.7; const v = neg ? R(128, 255) : R(1, 127); const d = v >= 128 ? v - 256 : v; return { q: `The 8-bit two's complement number ${bin(v)} is converted to denary. What is it?`, a: String(d), w: uniq3(d, [v, -d, d - 1, v - 128, -(v - 128)]), t: true, s: CALC, e: v >= 128 ? `−128 + ${v - 128} = ${d}.` : `The MSB is 0, so it is positive: ${d}.` }; });

  /* ================= 1.4 TEXT ================= */
  add(["1.4a"], () => { const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; const i = R(1, 25); return { q: `The ASCII code for 'A' is 65. What is the ASCII code for '${L[i]}'?`, a: String(65 + i), w: near(65 + i, 3, [64 + i, 97 + i]), t: true }; });
  add(["1.4a"], () => { const L = "abcdefghijklmnopqrstuvwxyz"; const i = R(0, 25); return { q: `The ASCII code for 'a' is 97. What is the ASCII code for '${L[i]}'?`, a: String(97 + i), w: near(97 + i, 3, [65 + i, 96 + i]), t: true }; });
  add(["1.4a"], () => { const up = R(0, 25), ch = String.fromCharCode(65 + up); return { q: `The ASCII code for '${ch}' is ${65 + up}. What is the ASCII code for '${ch.toLowerCase()}'?`, a: String(97 + up), w: uniq3(97 + up, [65 + up + 26, 65 + up + 1, 65 + up - 32, 97]), t: true, e: "Lowercase letters are 32 more than uppercase." }; });
  add(["1.4a"], () => { const w = pick(["HI", "CAT", "BYTE", "CODE", "GAME", "DATA", "BIT", "KEY"]); const codes = [...w].map(c => c.charCodeAt(0)); return { q: `These denary ASCII codes spell a word: ${codes.join(" ")}. What is the word? ('A' = 65)`, a: w, w: uniq3(w, [[...w].map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join(""), [...w].reverse().join(""), [...w].map(c => String.fromCharCode(c.charCodeAt(0) - 1)).join("")]), t: true, s: CALC }; });
  add(["1.4a"], () => { const n = R(5, 40); const bits = pick([8, 8, 16, 32]); const unit = bits === 8 ? "8-bit extended ASCII" : bits === 16 ? "16-bit Unicode" : "32-bit Unicode"; return { q: `A message has ${n} characters (including spaces). How many bytes does it need in ${unit}?`, a: String(n * bits / 8), w: uniq3(n * bits / 8, [n * bits, n, n * bits / 4, n * 7 / 8 * 8 + 1]), t: true, s: CALC }; });
  add(["1.4a"], () => { const ch = pick("ABCDEFGHJKLMNPRSTUVWXYZ".split("")); const c = ch.charCodeAt(0); return { q: `The ASCII code for '${ch}' is ${c}. What is it in 8-bit binary?`, a: bin(c), w: binWrong(bin(c), 8), t: true, s: CALC }; });

  /* ================= 1.5 SOUND ================= */
  const sizeAnswer = (bits, unitIdx) => { // 0 bits, 1 bytes, 2 KiB, 3 MiB
    const div = [1, 8, 8 * 1024, 8 * 1024 * 1024][unitIdx]; const v = bits / div; return Number.isInteger(v) ? v : round2(v);
  };
  const unitName = ["bits", "bytes", "KiB", "MiB"];
  add(["1.5b"], () => {
    const rate = pick([8000, 16000, 22050, 32000, 44100, 48000]), res = pick([8, 16, 24]), secs = pick([2, 5, 10, 20, 30, 60]), ch = pick([1, 1, 2]);
    const bits = rate * res * secs * ch; const u = pick(secs * rate * ch > 200000 ? [1, 2, 2, 3] : [0, 1, 2]);
    const ans = sizeAnswer(bits, u), exact = bits / [1, 8, 8192, 8388608][u];
    const wrongs = [sizeAnswer(bits * 8, u), sizeAnswer(ch === 2 ? bits / 2 : bits * 2, u), round2(bits / [1, 8, 8000, 8000000][u] === exact ? exact * 1.5 : bits / [1, 8, 8000, 8000000][u]), sizeAnswer(bits / 8, u)];
    return { q: `A ${secs}-second ${ch === 2 ? "stereo" : "mono"} sound is recorded with a sample rate of ${fmt(rate)} Hz and a sample resolution of ${res} bits. Calculate the file size in ${unitName[u]}${Number.isInteger(exact) ? "" : " (to 2 decimal places)"}.`,
      a: String(ans), w: uniq3(ans, wrongs), t: Number.isInteger(exact) ? true : [String(exact)], s: CALC + 30,
      e: `${fmt(rate)} × ${res} × ${secs}${ch === 2 ? " × 2" : ""} = ${fmt(bits)} bits${u >= 1 ? ` ÷ 8 = ${fmt(bits / 8)} bytes` : ""}${u >= 2 ? ` ÷ 1024 = ${round2(bits / 8192)} KiB` : ""}${u >= 3 ? ` ÷ 1024 ≈ ${round2(bits / 8388608)} MiB` : ""}.` };
  });
  add(["1.5b"], () => { const rate = pick([8000, 11025, 22050, 44100]), res = pick([8, 16]), mins = R(1, 3); const bits = rate * res * mins * 60; return { q: `A ${mins}-minute mono track uses a sample rate of ${fmt(rate)} Hz and ${res}-bit resolution. What is the size in bytes?`, a: String(bits / 8), w: uniq3(bits / 8, [bits, rate * res * mins / 8, bits / 8 / 1024, bits / 4]), t: true, s: CALC + 30, e: `Convert ${mins} min to ${mins * 60} s first: ${fmt(rate)} × ${res} × ${mins * 60} = ${fmt(bits)} bits ÷ 8 = ${fmt(bits / 8)} bytes.` }; });
  add(["1.5a"], () => { const res = pick([4, 8, 10, 12, 16]); return { q: `How many different amplitude values can be stored with a sample resolution of ${res} bits?`, a: String(2 ** res), w: uniq3(2 ** res, [res * 2, 2 ** res - 1, 2 ** (res - 1), res * res]), t: true }; });
  add(["1.5a"], () => { const r1 = pick([8000, 11025, 22050]), r2 = r1 * 2; return { q: `Recording A uses a sample rate of ${fmt(r1)} Hz. Recording B uses ${fmt(r2)} Hz. Everything else is the same. Which statement is correct?`, a: "B is more accurate and its file is twice as big", w: ["A is more accurate and has a bigger file", "B is more accurate and its file is half the size", "They are equally accurate"] }; });

  /* ================= 1.6 IMAGES ================= */
  add(["1.6b"], () => {
    const w = pick([16, 32, 40, 64, 100, 128, 200, 256, 320, 400, 512, 640, 800, 1024]), h = pick([16, 24, 32, 48, 64, 100, 128, 240, 300, 480, 600, 768]), d = pick([1, 2, 4, 8, 16, 24]);
    const bits = w * h * d; const u = bits < 80000 ? pick([0, 1]) : pick([1, 2, 2, 3]);
    const ans = sizeAnswer(bits, u), exact = bits / [1, 8, 8192, 8388608][u];
    return { q: `An image is ${w} × ${h} pixels with a colour depth of ${d} bit${d > 1 ? "s" : ""}. Calculate its file size in ${unitName[u]}${Number.isInteger(exact) ? "" : " (to 2 decimal places)"}.`,
      a: String(ans), w: uniq3(ans, [sizeAnswer(bits * 8, u), sizeAnswer(bits / d, u), round2(bits / [1, 8, 8000, 8000000][u]) === ans ? sizeAnswer(bits * 2, u) : round2(bits / [1, 8, 8000, 8000000][u]), sizeAnswer(bits / 8, u), sizeAnswer(bits * 2, u)]), t: Number.isInteger(exact) ? true : [String(exact)], s: CALC + 30,
      e: `${w} × ${h} × ${d} = ${fmt(bits)} bits${u >= 1 ? ` ÷ 8 = ${fmt(bits / 8)} bytes` : ""}${u >= 2 ? ` ÷ 1024 = ${round2(bits / 8192)} KiB` : ""}${u >= 3 ? ` ÷ 1024 ≈ ${round2(bits / 8388608)} MiB` : ""}.` };
  });
  add(["1.6a"], () => { const d = pick([1, 2, 3, 4, 5, 6, 7, 8, 16]); return { q: `How many different colours can be represented with a colour depth of ${d} bit${d > 1 ? "s" : ""}?`, a: String(2 ** d), w: uniq3(2 ** d, [d * 2, 2 ** d - 1, 2 ** (d + 1), d * d + 1]), t: true }; });
  add(["1.6a"], () => { const c = pick([2, 4, 8, 16, 32, 64, 128, 256]); const d = Math.log2(c); return { q: `What is the smallest colour depth needed to show ${c} different colours?`, a: `${d} bit${d > 1 ? "s" : ""}`, w: uniq3(`${d} bit${d > 1 ? "s" : ""}`, [`${c} bits`, `${c / 2} bits`, `${d + 1} bits`, `${Math.max(1, d - 1)} bit${d - 1 > 1 ? "s" : ""}`]), t: [String(d)] }; });
  add(["1.6a"], () => { const w = pick([640, 800, 1024, 1280, 1920]), h = pick([480, 600, 768, 720, 1080]); return { q: `How many pixels are in an image with a resolution of ${w} × ${h}?`, a: String(w * h), w: uniq3(w * h, [w + h, (w + h) * 2, w * h * 8, w * h / 2]), t: true, s: CALC }; });
  add(["1.6a"], () => { const d = pick([1, 2, 4, 8]); const W = 8, H = 8; return { q: `An ${W} × ${H} pixel icon has a colour depth of ${d} bit${d > 1 ? "s" : ""}. How many bits are needed to store it?`, a: String(W * H * d), w: uniq3(W * H * d, [W * H, W * H * d / 8, W * H * 8, W + H + d]), t: true, s: CALC }; });

  /* ================= 1.7 STORAGE & COMPRESSION ================= */
  const UNITS = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
  add(["1.7a"], () => { const i = R(1, 5), n = R(2, 12); const ans = n * 1024; return { q: `How many ${UNITS[i - 1]} are there in ${n} ${UNITS[i]}?`, a: String(ans), w: uniq3(ans, [n * 1000, n * 1024 * 1024, n * 8, n * 512]), t: true, s: CALC }; });
  add(["1.7a"], () => { const i = R(1, 4), n = pick([1, 2, 3, 4, 5, 6, 8, 10, 12, 16]); const big = n * 1024; return { q: `Convert ${fmt(big)} ${UNITS[i - 1]} into ${UNITS[i]}.`, a: String(n), w: uniq3(n, [big * 1024, round2(big / 1000), n * 8, n * 2]), t: true, s: CALC }; });
  add(["1.7a"], () => { const n = pick([1, 2, 3, 4, 5]); return { q: `How many bits are there in ${n} KiB?`, a: String(n * 1024 * 8), w: uniq3(n * 8192, [n * 1024, n * 8000, n * 8, n * 1000 * 8]), t: true, s: CALC, e: `${n} × 1024 × 8 = ${fmt(n * 8192)} bits.` }; });
  add(["1.7a"], () => { const n = R(2, 40) * 8; return { q: `How many bytes are there in ${n} bits?`, a: String(n / 8), w: uniq3(n / 8, [n * 8, n / 4, n / 1024, n / 2]), t: true }; });
  add(["1.7a"], () => { const n = R(3, 40) * 4; return { q: `How many nibbles are there in ${n} bits?`, a: String(n / 4), w: uniq3(n / 4, [n / 8, n * 4, n / 2, n]), t: true }; });
  add(["1.7a"], () => { const f = pick([2, 4, 8, 16, 32]), g = pick([1, 2, 4]); return { q: `A memory card holds ${g} GiB. Each photo is ${f} MiB. How many photos fit on the card?`, a: String(g * 1024 / f), w: uniq3(g * 1024 / f, [g * 1000 / f, g * f, Math.round(g * 1024 / f / 2), g * 1024 * f]), t: true, s: CALC }; });

  add(["1.7c"], () => {
    const chars = shuffle("ABCDEFGHWXYZ".split("")).slice(0, R(3, 4)); const runs = chars.map(c => [c, R(1, 9)]);
    const text = runs.map(([c, n]) => c.repeat(n)).join(""), enc = runs.map(([c, n]) => n + c).join(" ");
    return { q: `Use run-length encoding (RLE) to compress: ${text}`, a: enc, w: uniq3(enc, [runs.map(([c, n]) => c + n).join(" "), runs.map(([c, n]) => (n === 9 ? 8 : n + 1) + c).join(" "), runs.slice().reverse().map(([c, n]) => n + c).join(" "), runs.map(([c, n]) => n + c).join(" ").replace(/\d/, d => String((+d % 9) + 1))]), t: [enc.replace(/ /g, "")], s: CALC };
  });
  add(["1.7c"], () => {
    const cols = pick([["W", "B"], ["R", "G"], ["B", "Y"]]); let runs = []; let total = 0, k = 0; while (total < 14) { const n = R(1, 6); runs.push([cols[k % 2], n]); total += n; k++; }
    const enc = runs.map(([c, n]) => n + c).join(" "), dec = runs.map(([c, n]) => c.repeat(n)).join("");
    return { q: `A row of pixels has been compressed with RLE as: ${enc}. How many pixels are in the row?`, a: String(total), w: near(total, 3, [runs.length, runs.length * 2]), t: true, s: CALC, e: `Add the counts: ${runs.map(r => r[1]).join(" + ")} = ${total}. The row is ${dec}.` };
  });
  add(["1.7c"], () => {
    const cols = ["W", "B"]; let runs = []; for (let k = 0; k < R(3, 4); k++) runs.push([cols[k % 2], R(1, 5)]);
    const enc = runs.map(([c, n]) => n + c).join(" "), dec = runs.map(([c, n]) => c.repeat(n)).join("");
    return { q: `Decode this RLE data: ${enc}`, a: dec, w: uniq3(dec, [runs.map(([c, n]) => c.repeat(n === 1 ? 2 : n - 1)).join(""), runs.map(([c, n]) => (c === "W" ? "B" : "W").repeat(n)).join(""), runs.map(([c, n]) => c.repeat(n)).reverse().join("")]), t: true, s: CALC };
  });

  /* ================= 2.2 TRANSMISSION SCENARIOS ================= */
  const DIR = [["a computer sending data to a printer that never replies", "Simplex"], ["a television broadcast to homes", "Simplex"], ["a keyboard sending key presses to a computer", "Simplex"], ["a weather sensor sending readings to a computer", "Simplex"], ["a walkie-talkie conversation", "Half-duplex"], ["a CB radio where users take turns to talk", "Half-duplex"], ["a phone call", "Full-duplex"], ["a video call on a laptop", "Full-duplex"], ["a home broadband connection that downloads and uploads at once", "Full-duplex"], ["an online multiplayer game sending and receiving moves continuously", "Full-duplex"]];
  add(["2.2a"], () => { const [s, a] = pick(DIR); return { q: `Which direction of data transmission is best described by ${s}?`, a, w: ["Simplex", "Half-duplex", "Full-duplex", "Parallel"].filter(x => x !== a).slice(0, 3), t: [a.replace("-", " ")] }; });
  const SP = [["a printer 25 m away in another room", "Serial"], ["sending data across the internet", "Serial"], ["connecting a phone to a laptop with a USB cable", "Serial"], ["data moving between the CPU and RAM along the internal bus", "Parallel"], ["moving data across very short distances inside a computer chip", "Parallel"], ["a cable that runs between two buildings", "Serial"]];
  add(["2.2a"], () => { const [s, a] = pick(SP); return { q: `Which is the most suitable method for ${s}: serial or parallel transmission?`, a, w: [a === "Serial" ? "Parallel" : "Serial"], t: true }; });

  /* ================= 2.3 ERROR DETECTION ================= */
  add(["2.3b"], () => { const d = bin(R(0, 127), 7), even = Math.random() < 0.5; const p = even ? ones(d) % 2 : 1 - ones(d) % 2; return { q: `${even ? "Even" : "Odd"} parity is used. The parity bit is added to the left of the 7 data bits ${d}. What is the complete byte?`, a: p + d, w: uniq3(p + d, [(1 - p) + d, d + p, d + (1 - p)]), t: true, s: CALC, e: `${d} has ${ones(d)} ones. For ${even ? "even" : "odd"} parity the parity bit must be ${p}.` }; });
  add(["2.3b"], () => { const even = Math.random() < 0.5; let byte = bin(R(0, 255)); const ok = (ones(byte) % 2 === 0) === even; return { q: `A byte is received using ${even ? "even" : "odd"} parity: ${byte}. Has an error been detected?`, a: ok ? "No — the number of 1s is " + (even ? "even" : "odd") : "Yes — the number of 1s is " + (even ? "odd" : "even"), w: ok ? ["Yes — the number of 1s is " + (even ? "odd" : "even"), "Yes — there are too many 0s", "It is impossible to tell"] : ["No — the number of 1s is " + (even ? "even" : "odd"), "No — parity can't detect errors", "It is impossible to tell"], s: CALC, e: `${byte} contains ${ones(byte)} ones.` }; });
  add(["2.3b"], () => {
    // parity block: 4 bytes + parity byte, even parity, one flipped bit
    const rows = []; for (let r = 0; r < 4; r++) { const d = bin(R(0, 127), 7); rows.push((ones(d) % 2) + d); }
    const pb = [...Array(8).keys()].map(c => rows.reduce((s, r) => s + +r[c], 0) % 2).join("");
    const er = R(0, 3), ec = R(1, 7); rows[er] = flipBit(rows[er], ec);
    const head = `<tr><th></th><th>P</th>${[1, 2, 3, 4, 5, 6, 7].map(i => `<th>b${i}</th>`).join("")}</tr>`;
    const body = rows.map((r, i) => `<tr><th>Byte ${i + 1}</th>${[...r].map(c => `<td>${c}</td>`).join("")}</tr>`).join("") + `<tr><th>Parity byte</th>${[...pb].map(c => `<td>${c}</td>`).join("")}</tr>`;
    const ans = `Byte ${er + 1}, bit b${ec}`;
    const wr = new Set(); while (wr.size < 3) { const a = `Byte ${R(1, 4)}, bit b${R(1, 7)}`; if (a !== ans) wr.add(a); }
    return { q: "Even parity is used for this block of data, including the parity byte. One bit has been changed during transmission. Which bit is wrong?", h: `<table class="tbl center pblock">${head}${body}</table>`, a: ans, w: [...wr], s: CALC + 60, e: `Byte ${er + 1} has an odd number of 1s, and column b${ec} has an odd number of 1s. They cross at the wrong bit.` };
  });
  add(["2.3c"], () => {
    const digits = [9, 7, R(8, 9)].concat([...Array(9)].map(() => R(0, 9)));
    const sum = digits.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0); const cd = (10 - sum % 10) % 10;
    return { q: `Calculate the ISBN-13 check digit for ${digits.join("")} (multiply digits alternately by 1 and 3, add them, take the remainder ÷ 10 and subtract from 10).`, a: String(cd), w: uniq3(cd, [sum % 10, (cd + 1) % 10, (cd + 3) % 10, (10 - (sum + 2) % 10) % 10]), t: true, s: CALC + 60, e: `Weighted sum = ${sum}. ${sum} MOD 10 = ${sum % 10}. 10 − ${sum % 10} = ${cd === 0 ? "10 → 0" : cd}.` };
  });
  add(["2.3c"], () => {
    const digits = [9, 7, 8].concat([...Array(9)].map(() => R(0, 9))); const sum = digits.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0); const cd = (10 - sum % 10) % 10;
    let isbn = digits.concat([cd]); const valid = Math.random() < 0.5;
    if (!valid) { let i; do { i = R(3, 11); } while (isbn[i] === isbn[i + 1]); [isbn[i], isbn[i + 1]] = [isbn[i + 1], isbn[i]]; }
    const total = isbn.reduce((s, d, i) => s + d * (i % 2 ? 3 : 1), 0);
    return { q: `An ISBN-13 is typed as ${isbn.join("")}. Using weights 1, 3, 1, 3… on all 13 digits, a valid ISBN gives a total that divides exactly by 10. Is this ISBN valid?`, a: total % 10 === 0 ? "Valid" : "Not valid — a typing error has occurred", w: [total % 10 === 0 ? "Not valid — a typing error has occurred" : "Valid", "It can't be checked"], s: CALC + 60, e: `Weighted total = ${total}, which ${total % 10 === 0 ? "divides" : "does not divide"} exactly by 10.` };
  });

  /* ================= 2.4 ENCRYPTION ================= */
  const caesar = (w, k) => [...w].map(c => String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65)).join("");
  add(["2.4b"], () => { const w = pick(["DATA", "CODE", "BYTE", "SECRET", "CIPHER", "LOGIC", "PIXEL", "ROUTER", "PACKET", "BINARY"]), k = R(1, 5); const c = caesar(w, k); return { q: `Encrypt ${w} using a Caesar cipher with a shift of ${k} (A → ${caesar("A", k)}).`, a: c, w: uniq3(c, [caesar(w, k + 1), caesar(w, -k), caesar(w, k - 1 || 6)]), t: true, s: CALC }; });
  add(["2.4b"], () => { const w = pick(["HELLO", "KEYS", "SAFE", "LOCKED", "PUBLIC", "PRIVATE", "SERVER", "VIRUS"]), k = R(1, 5); const c = caesar(w, k); return { q: `This ciphertext was made with a Caesar cipher, shift ${k}: ${c}. Decrypt it.`, a: w, w: uniq3(w, [caesar(c, k), caesar(w, 1), caesar(w, -1)]), t: true, s: CALC }; });

  /* ================= 3.x ALGORITHMS ================= */
  add(["3.3a", "3.6b", "3.4a"], () => { const a = R(1, 3), b = a + R(2, 5), step = pick([1, 1, 2]); let t = 0; for (let i = a; i <= b; i += step) t += i; return { q: "What is output by this pseudocode?", c: `Total ← 0\nFOR i ← ${a} TO ${b}${step > 1 ? " STEP " + step : ""}\n  Total ← Total + i\nNEXT i\nOUTPUT Total`, a: String(t), w: near(t, 4, [t + b, t - a]), t: true, s: CALC }; });
  add(["3.3a", "3.6b"], () => { const a = R(0, 4), b = a + R(2, 7); return { q: `How many times is "Hello" output?`, c: `FOR Count ← ${a} TO ${b}\n  OUTPUT "Hello"\nNEXT Count`, a: String(b - a + 1), w: near(b - a + 1, 2, [b - a, b]), t: true }; });
  add(["3.3a", "3.6b"], () => { const start = R(1, 4), mult = pick([2, 3]), lim = R(20, 80); let x = start, n = 0; while (x < lim) { x *= mult; n++; } return { q: "What is output?", c: `X ← ${start}\nWHILE X < ${lim} DO\n  X ← X * ${mult}\nENDWHILE\nOUTPUT X`, a: String(x), w: near(x, 6, [x / mult, x * mult, lim]), t: true, s: CALC }; });
  add(["3.3a", "3.6b"], () => { const start = R(10, 30), dec = pick([3, 4, 5]); let x = start, c = 0; do { x -= dec; c++; } while (!(x < 0)); return { q: "How many times does the loop run?", c: `Num ← ${start}\nCount ← 0\nREPEAT\n  Num ← Num - ${dec}\n  Count ← Count + 1\nUNTIL Num < 0\nOUTPUT Count`, a: String(c), w: near(c, 2, [c - 1, c + 1]), t: true, s: CALC }; });
  add(["3.3a"], () => { const a = R(10, 99), b = R(2, 9); const op = pick(["MOD", "DIV"]); const ans = op === "MOD" ? a % b : Math.floor(a / b); return { q: `What is the value of ${a} ${op} ${b}?`, a: String(ans), w: uniq3(ans, [op === "MOD" ? Math.floor(a / b) : a % b, round2(a / b), ans + 1, Math.abs(ans - 1)]), t: true, e: op === "MOD" ? `${a} = ${Math.floor(a / b)} × ${b} + ${a % b}, so MOD gives the remainder ${a % b}.` : `${a} ÷ ${b} = ${round2(a / b)}; DIV keeps only the whole number ${ans}.` }; });
  add(["3.3a", "3.3b"], () => { const t1 = R(40, 60), t2 = t1 + R(10, 25), v = R(20, 99); const out = v >= t2 ? "Merit" : v >= t1 ? "Pass" : "Fail"; return { q: `What is output when Mark = ${v}?`, c: `IF Mark >= ${t2}\n  THEN\n    OUTPUT "Merit"\n  ELSE\n    IF Mark >= ${t1}\n      THEN\n        OUTPUT "Pass"\n      ELSE\n        OUTPUT "Fail"\n    ENDIF\nENDIF`, a: out, w: ["Merit", "Pass", "Fail", "Nothing is output"].filter(x => x !== out), t: true }; });
  add(["3.3a"], () => { const ch = R(1, 5); const opts = { 1: "Start game", 2: "Load game", 3: "Settings" }; const out = opts[ch] || "Invalid choice"; return { q: `What is output when Choice = ${ch}?`, c: `CASE OF Choice\n  1 : OUTPUT "Start game"\n  2 : OUTPUT "Load game"\n  3 : OUTPUT "Settings"\n  OTHERWISE OUTPUT "Invalid choice"\nENDCASE`, a: out, w: ["Start game", "Load game", "Settings", "Invalid choice"].filter(x => x !== out).slice(0, 3), t: true }; });
  add(["3.3a"], () => { const w = pick(["Computer", "Science", "Algorithm", "Keyboard", "Network", "Binary", "Variable"]); const kind = pick(["len", "sub", "up"]); if (kind === "len") return { q: `What does LENGTH("${w}") return?`, a: String(w.length), w: near(w.length, 2, [], 1), t: true }; if (kind === "up") return { q: `What does UCASE("${w}") return?`, a: w.toUpperCase(), w: uniq3(w.toUpperCase(), [w.toLowerCase(), w, w[0].toLowerCase() + w.slice(1).toUpperCase(), w.slice(0, -1).toUpperCase()]), t: true, cs: true }; const s = R(1, 3), n = R(2, 4); const ans = w.substr(s - 1, n); return { q: `What does SUBSTRING("${w}", ${s}, ${n}) return? (The first character is position 1.)`, a: ans, w: uniq3(ans, [w.substr(s, n), w.substr(s - 1, n + 1), w.substr(0, n), w.substr(s - 1, n - 1)]), t: true, s: CALC }; });

  add(["3.4b", "3.3b"], () => { const arr = [...Array(6)].map(() => R(1, 99)); const kind = pick(["max", "min", "avg"]); const mx = Math.max(...arr), mn = Math.min(...arr), tot = arr.reduce((a, b) => a + b, 0); const ans = kind === "max" ? mx : kind === "min" ? mn : round2(tot / 6); const code = kind === "avg" ? `Total ← 0\nFOR i ← 1 TO 6\n  Total ← Total + Data[i]\nNEXT i\nOUTPUT Total / 6` : `Result ← Data[1]\nFOR i ← 2 TO 6\n  IF Data[i] ${kind === "max" ? ">" : "<"} Result\n    THEN\n      Result ← Data[i]\n  ENDIF\nNEXT i\nOUTPUT Result`; return { q: `Data = [${arr.join(", ")}]. What is output?${kind === "avg" ? " (to 2 decimal places if needed)" : ""}`, c: code, a: String(ans), w: uniq3(ans, [mx, mn, tot, round2(tot / 6), arr[0], arr[5]]), t: true, s: CALC }; });
  add(["3.4c"], () => { const names = shuffle(["Ali", "Bea", "Cai", "Dev", "Eva", "Fin", "Gus", "Hana", "Ivy", "Jon"]).slice(0, R(6, 8)); const found = Math.random() < 0.75; const target = found ? pick(names) : "Zoe"; const comps = found ? names.indexOf(target) + 1 : names.length; return { q: `Names = [${names.map(n => '"' + n + '"').join(", ")}]. A linear search looks for "${target}". How many items are compared?`, a: String(comps), w: near(comps, 2, [names.length, 1], 1), t: true, s: CALC }; });
  add(["3.4d"], () => { const arr = shuffle([...Array(9).keys()].map(i => i + 1)).slice(0, 5); const a = arr.slice(); let swaps = 0; for (let i = 0; i < a.length - 1; i++) if (a[i] > a[i + 1]) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; swaps++; } const kind = pick(["list", "swaps"]); if (kind === "swaps") return { q: `How many swaps are made in the FIRST pass of an ascending bubble sort on [${arr.join(", ")}]?`, a: String(swaps), w: near(swaps, 2, [], 0), t: true, s: CALC }; const ans = "[" + a.join(", ") + "]"; return { q: `What is the list after the FIRST pass of an ascending bubble sort on [${arr.join(", ")}]?`, a: ans, w: uniq3(ans, ["[" + arr.slice().sort((x, y) => x - y).join(", ") + "]", "[" + arr.join(", ") + "]", "[" + a.slice().reverse().join(", ") + "]", "[" + [a[1], a[0]].concat(a.slice(2)).join(", ") + "]"]), s: CALC + 30 }; });

  add(["3.5a"], () => { const s = pick([["an exam mark must be from 0 to 100", "Range check"], ["a password must have between 8 and 20 characters", "Length check"], ["a phone number must have exactly 10 digits", "Length check"], ["the email field must not be left empty", "Presence check"], ["a date must be in the form DD/MM/YYYY", "Format check"], ["a quantity must be a whole number, not text", "Type check"], ["a product code must be two letters followed by four digits", "Format check"], ["a book's ISBN is checked using its last digit", "Check digit"], ["a student's age must be between 11 and 18", "Range check"], ["a surname must be entered before the form is saved", "Presence check"], ["a price must be a real number", "Type check"], ["a bar code is checked as it is scanned", "Check digit"]]); return { q: `Which validation check makes sure that ${s[0]}?`, a: s[1], w: ["Range check", "Length check", "Type check", "Presence check", "Format check", "Check digit"].filter(x => x !== s[1]).sort(() => Math.random() - .5).slice(0, 3), t: [s[1].replace(" check", "")] }; });
  add(["3.6a"], () => { const lo = R(1, 20), hi = lo + R(10, 80); const mid = R(lo + 2, hi - 2); const kind = pick(["normal", "extreme", "boundary", "abnormal"]); const rng = `whole numbers from ${lo} to ${hi} inclusive`; if (kind === "normal") return { q: `A program accepts ${rng}. Which value is normal test data?`, a: String(mid), w: [String(lo - 1), String(hi + 1), `"${["ten", "abc", "twelve"][R(0, 2)]}"`] }; if (kind === "extreme") return { q: `A program accepts ${rng}. Which pair of values is extreme test data?`, a: `${lo} and ${hi}`, w: [`${lo - 1} and ${hi + 1}`, `${mid} and ${mid + 1}`, `0 and 1000`] }; if (kind === "boundary") return { q: `A program accepts ${rng}. Which set of values is boundary test data?`, a: `${lo - 1}, ${lo}, ${hi}, ${hi + 1}`, w: [`${lo}, ${hi}`, `${lo + 1}, ${mid}, ${hi - 1}`, `${lo - 10}, ${hi + 10}`] }; return { q: `A program accepts ${rng}. Which value is abnormal test data?`, a: String(hi + R(5, 50)), w: [String(lo), String(mid), String(hi)] }; });

  add(["3.2b", "3.2a"], () => { const v = pick([["Mark", 50, 'OUTPUT "Pass"', 'OUTPUT "Fail"', "Pass", "Fail", 0, 100], ["Temp", 30, 'OUTPUT "Too hot"', 'OUTPUT "OK"', "Too hot", "OK", 0, 45], ["Age", 18, 'OUTPUT "Adult"', 'OUTPUT "Child"', "Adult", "Child", 5, 40], ["Speed", 60, 'OUTPUT "Slow down"', 'OUTPUT "Safe"', "Slow down", "Safe", 20, 100]]); const [name, th, yes, no, yo, nout, lo, hi] = v; const op = pick([">", ">="]); const val = Math.random() < 0.3 ? th : R(lo, hi); const res = (op === ">" ? val > th : val >= th) ? yo : nout; return { q: `Follow the flowchart. What is output when ${name} = ${val}?`, h: window.FLOW.selection({ input: name, cond: `${name} ${op} ${th}?`, yes, no }), a: res, w: [res === yo ? nout : yo, "Nothing is output", String(val)], t: true, s: CALC }; });
  add(["3.2b", "3.2a", "3.6b"], () => { const n = R(3, 5); const nums = [...Array(n)].map(() => R(1, 20)); const total = nums.reduce((a, b) => a + b, 0); return { q: `Follow the flowchart. The numbers input are ${nums.join(", ")}. What is output?`, h: window.FLOW.loop({ init: "Total ← 0, Count ← 0", cond: `Count < ${n}?`, body: [["io", "INPUT Number"], ["proc", "Total ← Total + Number"], ["proc", "Count ← Count + 1"]], out: "OUTPUT Total" }), a: String(total), w: near(total, 5, [total - nums[n - 1], nums[n - 1], n]), t: true, s: CALC }; });

  /* ================= 4.2 CLOCK SPEED ================= */
  add(["4.2b"], () => { const g = pick([1.8, 2.4, 2.8, 3.2, 3.6, 4.2]); return { q: `A CPU runs at ${g} GHz. How many clock cycles is that per second?`, a: `${g} billion`, w: [`${g} million`, `${g} thousand`, `${g * 1024} billion`] }; });
  add(["4.2b"], () => { const a = { c: pick([2, 4]), g: pick([2.4, 3.0, 3.6]), k: pick([4, 8]) }; const b = { c: a.c * 2, g: a.g + 0.4, k: a.k * 2 }; return { q: `Computer A: ${a.c} cores, ${a.g} GHz, ${a.k} MiB cache. Computer B: ${b.c} cores, ${b.g.toFixed(1)} GHz, ${b.k} MiB cache. Which computer is likely to perform better, and why?`, a: "B — more cores, a higher clock speed and a larger cache", w: ["A — fewer cores means less waiting", "A — a smaller cache is searched faster, so it is always better", "They will perform exactly the same"] }; });

  /* ================= 6.x BOOLEAN LOGIC ================= */
  const L = window.LOGIC;
  const GATES2 = ["AND", "OR", "NAND", "NOR", "XOR"];
  const gateOut = (g, a, b) => L.evalTree({ op: g, a: { in: "A" }, b: { in: "B" } }, { A: a, B: b });
  add(["6.1b"], () => { const g = pick(GATES2.concat(["NOT"])); const a = R(0, 1), b = R(0, 1); const out = g === "NOT" ? 1 - a : gateOut(g, a, b); return { q: g === "NOT" ? `What is the output of a NOT gate when the input A = ${a}?` : `What is the output of a ${g} gate when A = ${a} and B = ${b}?`, a: String(out), w: [String(1 - out)], t: true }; });
  add(["6.1a", "6.1b"], () => { const g = pick(GATES2.concat(["NOT"])); return { q: "Which logic gate is shown?", h: L.gateSVG(g, { caption: false, w: 210 }), a: g, w: shuffle(GATES2.concat(["NOT"]).filter(x => x !== g)).slice(0, 3), t: g === "XOR" ? ["EOR"] : true }; });
  add(["6.1b"], () => { const g = pick(GATES2); const col = [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => gateOut(g, a, b)).join(", "); return { q: `Which two-input gate gives the outputs ${col} for the inputs 00, 01, 10, 11?`, a: g, w: GATES2.filter(x => x !== g).slice(0, 3), t: g === "XOR" ? ["EOR"] : true }; });

  // random expressions
  function randTree(nv) {
    const vars = ["A", "B", "C"].slice(0, nv); const leaf = () => ({ in: pick(vars) });
    const g2 = () => pick(GATES2);
    const shapes = [
      () => ({ op: g2(), a: { op: g2(), a: { in: "A" }, b: { in: "B" } }, b: { in: "C" } }),
      () => ({ op: g2(), a: { in: "A" }, b: { op: g2(), a: { in: "B" }, b: { in: "C" } } }),
      () => ({ op: g2(), a: { op: g2(), a: { in: "A" }, b: { in: "B" } }, b: { op: "NOT", a: { in: "C" } } }),
      () => ({ op: g2(), a: { op: "NOT", a: { in: "A" } }, b: { op: g2(), a: { in: "B" }, b: { in: "C" } } }),
      () => ({ op: "NOT", a: { op: g2(), a: { in: "A" }, b: { in: "B" } } }),
      () => ({ op: g2(), a: { op: g2(), a: { in: "A" }, b: { in: "B" } }, b: { op: g2(), a: { in: "B" }, b: { in: "C" } } })
    ];
    const t = nv === 2 ? pick([() => ({ op: g2(), a: { op: "NOT", a: { in: "A" } }, b: { in: "B" } }), () => ({ op: "NOT", a: { op: g2(), a: { in: "A" }, b: { in: "B" } } }), () => ({ op: g2(), a: { op: g2(), a: { in: "A" }, b: { in: "B" } }, b: { op: "NOT", a: { in: "B" } } })])() : pick(shapes)();
    return t;
  }
  const mutate = t => { const c = JSON.parse(JSON.stringify(t)); const nodes = []; (function w(n) { if (!n.in) { nodes.push(n); w(n.a); if (n.b) w(n.b); } })(c); const n = pick(nodes.filter(x => x.op !== "NOT")) || nodes[0]; if (n.op !== "NOT") n.op = pick(GATES2.filter(g => g !== n.op)); return c; };
  add(["6.2a"], () => { const nv = pick([2, 3, 3]); const t = randTree(nv); const vars = L.inputsOf(t); const env = {}; vars.forEach(v => env[v] = R(0, 1)); const x = L.evalTree(t, env); return { q: `X = ${L.exprText(t, true)}. What is X when ${vars.map(v => v + " = " + env[v]).join(", ")}?`, a: String(x), w: [String(1 - x)], t: true, s: CALC }; });
  add(["6.2a", "6.2c"], () => { const t = randTree(3); const vars = L.inputsOf(t); const env = {}; vars.forEach(v => env[v] = R(0, 1)); const x = L.evalTree(t, env); return { q: `For this logic circuit, what is the output X when ${vars.map(v => v + " = " + env[v]).join(", ")}?`, h: L.circuitSVG(t), a: String(x), w: [String(1 - x)], t: true, s: CALC }; });
  add(["6.2a"], () => { const t = randTree(pick([2, 3])); const { rows } = L.truthRows(t); const col = rows.map(r => r.x).join(""); const w = new Set(); let g = 0; while (w.size < 3 && g++ < 60) { const m = mutate(t); const c2 = L.truthRows(m, L.inputsOf(t)).rows.map(r => r.x).join(""); if (c2 !== col) w.add(c2); } while (w.size < 3) { const i = R(0, col.length - 1); w.add(col.slice(0, i) + (col[i] === "1" ? "0" : "1") + col.slice(i + 1)); } return { q: `Complete the output column of the truth table for X = ${L.exprText(t, true)}. Inputs are in order ${rows.length === 4 ? "00, 01, 10, 11" : "000, 001 … 111"}. Which output column (top to bottom) is correct?`, a: col, w: [...w].slice(0, 3), t: true, s: CALC + 60 }; });
  add(["6.2b"], () => { const t = randTree(3); const ans = L.exprText(t, true); const w = new Set(); let g = 0; while (w.size < 3 && g++ < 40) { const e = L.exprText(mutate(t), true); if (e !== ans) w.add(e); } return { q: "Which logic expression matches this logic circuit?", h: L.circuitSVG(t), a: "X = " + ans, w: [...w].map(e => "X = " + e), s: CALC }; });
  add(["6.2c"], () => { const t = randTree(3); let n = 0; (function c(x) { if (!x.in) { n++; c(x.a); if (x.b) c(x.b); } })(t); return { q: `How many logic gates are needed to draw X = ${L.exprText(t, true)} without simplifying?`, a: String(n), w: near(n, 2, [], 1), t: true }; });
  add(["6.2c", "6.2b"], () => { const t = randTree(3); return { q: `Which gate produces the final output X in the circuit for X = ${L.exprText(t, true)}?`, a: t.op, w: shuffle(GATES2.concat(["NOT"]).filter(g => g !== t.op)).slice(0, 3), t: true }; });
  add(["6.2b"], () => { const g = pick(GATES2); const rows = [[0, 0], [0, 1], [1, 0], [1, 1]]; const html = `<table class="tbl center tt"><tr><th>A</th><th>B</th><th>X</th></tr>${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td><td><b>${gateOut(g, a, b)}</b></td></tr>`).join("")}</table>`; return { q: "Which logic expression matches this truth table?", h: html, a: `X = A ${g} B`, w: GATES2.filter(x => x !== g).slice(0, 3).map(x => `X = A ${x} B`) }; });

  window.GENERATORS = G;
})();
