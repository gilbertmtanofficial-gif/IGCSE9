/* Chapter 1 — Data representation (Syllabus section 1 · Textbook chapter 1, pages 2–44) */
window.OBJECTIVES = window.OBJECTIVES || {};
Object.assign(window.OBJECTIVES, {
  "1.1a": "Understand how and why computers use binary to represent all forms of data. (Syllabus 1.1.1)",
  "1.1b": "Understand the denary and binary number systems and convert between positive denary and positive binary (up to 16 bits). (Syllabus 1.1.2)",
  "1.1c": "Add two positive 8-bit binary integers and understand the concept of overflow and why it occurs. (Syllabus 1.1.4)",
  "1.2a": "Understand the hexadecimal number system and convert between denary and hexadecimal, and between hexadecimal and binary. (Syllabus 1.1.2)",
  "1.2b": "Understand how and why hexadecimal is used as a beneficial method of data representation. (Syllabus 1.1.3)",
  "1.3a": "Perform logical left and right binary shifts (including multiple shifts) on a positive 8-bit integer and understand the effect. (Syllabus 1.1.5)",
  "1.3b": "Use the two's complement number system to represent positive and negative 8-bit binary integers. (Syllabus 1.1.6)",
  "1.4a": "Understand how and why a computer represents text, and the use of character sets including ASCII and Unicode. (Syllabus 1.2.1)",
  "1.5a": "Understand how and why a computer represents sound, including the effects of the sample rate and sample resolution. (Syllabus 1.2.2)",
  "1.5b": "Calculate the file size of a sound file using the sample rate, resolution and length of track. (Syllabus 1.3.2)",
  "1.6a": "Understand how and why a computer represents an image, including the effects of the resolution and colour depth. (Syllabus 1.2.3)",
  "1.6b": "Calculate the file size of an image file using the resolution and colour depth. (Syllabus 1.3.2)",
  "1.7a": "Understand how data storage is measured: bit, nibble, byte, KiB, MiB, GiB, TiB, PiB and EiB. (Syllabus 1.3.1)",
  "1.7b": "Understand the purpose of and need for data compression. (Syllabus 1.3.3)",
  "1.7c": "Understand how files are compressed using lossy and lossless methods, including run-length encoding (RLE). (Syllabus 1.3.4)"
});

window.UNITS = window.UNITS || [];
window.UNITS.push({
  id: "u1", semester: 1, num: 1,
  title: "Data representation",
  blurb: "Binary, hexadecimal, shifts, two's complement, and how text, sound and images are stored and compressed.",
  topics: [
{
  id: "1.1", title: "Number systems: the binary system", pages: "2–11, 15–17",
  objectives: ["1.1a", "1.1b", "1.1c"],
  summary: "Why computers use binary, converting between denary and binary, binary addition and overflow.",
  reading: `
<h4>Why do computers use binary?</h4>
<p>A computer is built from billions of tiny electronic switches called <b>transistors</b>. Each switch has only two states: <b>on (1)</b> or <b>off (0)</b>. That is why every type of data — numbers, text, sound, images, video and program instructions — must be converted into <b>binary</b> (1s and 0s) before a computer can process it.</p>
<ul><li>Data is processed using <b>logic gates</b>, which only work with 1s and 0s.</li>
<li>Data is held in <b>registers</b> (small, fast memory inside the CPU) as a fixed number of bits, e.g. 8, 16 or 32 bits.</li></ul>
<p>A single binary digit is called a <b>bit</b>. 4 bits is a <b>nibble</b> and 8 bits is a <b>byte</b>.</p>

<h4>Number bases</h4>
<table class="tbl"><tr><th>System</th><th>Base</th><th>Digits used</th></tr>
<tr><td><b>Denary</b> (decimal)</td><td>10</td><td>0 1 2 3 4 5 6 7 8 9</td></tr>
<tr><td><b>Binary</b></td><td>2</td><td>0 1</td></tr>
<tr><td><b>Hexadecimal</b></td><td>16</td><td>0–9 and A–F (next topic)</td></tr></table>
<p>In denary each column is worth 10 times the one to its right (1, 10, 100…). In binary each column is worth <b>2 times</b> the one to its right.</p>
<table class="tbl center"><tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr></table>

<h4>Binary → denary</h4>
<p>Add up the place values of every column that holds a 1.</p>
<div class="example"><b>Example:</b> 01011001 = 64 + 16 + 8 + 1 = <b>89</b></div>
<p>For 16-bit numbers the place values carry on doubling: 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, then 128 … 1.</p>

<h4>Denary → binary</h4>
<p><b>Method 1 – subtract place values.</b> Start at the left. If the place value fits into the number, write 1 and subtract it; otherwise write 0.</p>
<div class="example"><b>Example: 142</b><br>142 − 128 = 14 → 1 · 64 no → 0 · 32 no → 0 · 16 no → 0 · 14 − 8 = 6 → 1 · 6 − 4 = 2 → 1 · 2 − 2 = 0 → 1 · 1 no → 0<br>142 = <b>10001110</b></div>
<p><b>Method 2 – divide by 2.</b> Keep dividing by 2 and write down each remainder. Read the remainders from the <b>bottom up</b>.</p>
<pre class="code">142 ÷ 2 = 71 r 0
 71 ÷ 2 = 35 r 1
 35 ÷ 2 = 17 r 1
 17 ÷ 2 =  8 r 1
  8 ÷ 2 =  4 r 0
  4 ÷ 2 =  2 r 0
  2 ÷ 2 =  1 r 0
  1 ÷ 2 =  0 r 1     → read upwards: 10001110</pre>
<div class="tip"><b>Useful facts:</b> the biggest 8-bit number is 11111111 = <b>255</b> (2⁸ − 1). The biggest 16-bit number is <b>65 535</b> (2¹⁶ − 1). With <i>n</i> bits you can store 2ⁿ different values. An odd binary number always ends in 1.</div>

<h4>Adding two 8-bit binary numbers</h4>
<table class="tbl"><tr><th>Sum</th><th>Result</th><th>Write</th><th>Carry</th></tr>
<tr><td>0 + 0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0 + 1</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>1 + 1</td><td>2 (10 in binary)</td><td>0</td><td>1</td></tr><tr><td>1 + 1 + 1</td><td>3 (11 in binary)</td><td>1</td><td>1</td></tr></table>
<p>Work from <b>right to left</b>, carrying into the next column, just like denary addition.</p>
<pre class="code">  carry   1 1 1 1
          0 1 0 1 1 1 0 1   (93)
        + 0 0 1 1 0 1 1 1   (55)
          ---------------
          1 0 0 1 0 1 0 0   (148)</pre>

<h4>Overflow</h4>
<p>A register can only hold a fixed number of bits. If the answer to a sum needs <b>more bits than the register has</b>, an <b>overflow error</b> occurs. In an 8-bit register this happens when the result is <b>greater than 255</b> — a 9th bit is created and there is nowhere to store it, so the stored answer is wrong.</p>
<pre class="code">   1 1 0 1 0 0 1 0   (210)
 + 0 1 1 0 0 1 1 0   (102)
 -----------------
 1 0 0 1 1 1 0 0 0   (312 needs 9 bits → overflow!)</pre>
<p>The register keeps only 00111000 (56), which is wrong. Every computer or device has a <b>predefined limit</b> (e.g. 16-bit), and an overflow error happens when a value outside that limit should be returned.</p>
<div class="keywords"><b>Key words:</b> binary, bit, nibble, byte, denary, base 2, base 10, place value, register, logic gate, carry, overflow error</div>`
},
{
  id: "1.2", title: "Hexadecimal", pages: "3–15",
  objectives: ["1.2a", "1.2b"],
  summary: "Base 16: converting between hexadecimal, denary and binary, and where hex is used.",
  reading: `
<h4>What is hexadecimal?</h4>
<p><b>Hexadecimal</b> (hex) is a <b>base 16</b> number system. It needs 16 different digits, so after 0–9 it uses the letters A–F.</p>
<table class="tbl center"><tr><th>Denary</th><td>0–9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
<tr><th>Hex</th><td>0–9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
<tr><th>Binary</th><td>0000–1001</td><td>1010</td><td>1011</td><td>1100</td><td>1101</td><td>1110</td><td>1111</td></tr></table>
<p>Each hex column is worth <b>16 times</b> the column to its right: 4096 · 256 · 16 · 1.</p>

<h4>Hex → denary</h4>
<p>Multiply each digit by its place value and add.</p>
<div class="example"><b>Example:</b> 2F = (2 × 16) + (15 × 1) = 32 + 15 = <b>47</b><br><b>Example:</b> 1A3 = (1 × 256) + (10 × 16) + (3 × 1) = 256 + 160 + 3 = <b>419</b></div>

<h4>Denary → hex</h4>
<p>Divide by 16. The whole-number answer is the 16s digit and the remainder is the 1s digit (use letters for 10–15).</p>
<div class="example"><b>Example: 199</b> → 199 ÷ 16 = 12 remainder 7 → 12 = C → <b>C7</b>.<br>For numbers 256 or more, divide by 256 first, then by 16. Or convert to binary first and then to hex.</div>

<h4>Binary ↔ hex (the easy one!)</h4>
<p>One hex digit is exactly <b>4 bits (one nibble)</b>.</p>
<ul><li><b>Binary → hex:</b> split the binary into groups of 4 <b>starting from the right</b> (add 0s at the front if needed), then convert each group.</li>
<li><b>Hex → binary:</b> write each hex digit as 4 bits.</li></ul>
<pre class="code">1011 0110 1110      →  B 6 E   (B6E)
   3    D    9      →  0011 1101 1001</pre>
<div class="tip"><b>Watch out:</b> 110101 is 6 bits. Group from the right: 11 0101 → 0011 0101 → <b>35</b>. Grouping from the left would give a wrong answer.</div>

<h4>Why use hexadecimal?</h4>
<ul><li>It is much <b>shorter</b> than binary — one hex digit replaces 4 bits — so it is <b>easier for humans</b> to read, write and remember.</li>
<li>Humans make <b>fewer mistakes</b> copying hex than long strings of 1s and 0s.</li>
<li>It converts to and from binary very easily.</li></ul>
<p>The computer itself does <b>not</b> use hex — it still works in binary. Hex is just a friendlier way for people to <i>show</i> binary values.</p>

<h4>Where is hex used?</h4>
<table class="tbl"><tr><th>Use</th><th>Example</th></tr>
<tr><td><b>MAC addresses</b> (identify a device on a network)</td><td>00-1C-B3-4F-25-FE</td></tr>
<tr><td><b>Colour codes</b> in HTML/CSS (red, green, blue values)</td><td>#FF0000 = red, #FFFFFF = white</td></tr>
<tr><td><b>Error messages and memory dumps</b> (memory addresses)</td><td>Error at 0x00FF3A2C</td></tr>
<tr><td><b>IPv6 addresses</b></td><td>2001:0db8:85a3::8a2e:0370:7334</td></tr>
<tr><td><b>Assembly / machine code</b> and debugging</td><td>LDA 3F</td></tr>
<tr><td><b>URLs</b> (special characters)</td><td>%20 = a space</td></tr></table>
<div class="keywords"><b>Key words:</b> hexadecimal, base 16, nibble, MAC address, HTML colour code, memory dump, error code, IPv6</div>`
},
{
  id: "1.3", title: "Binary shifts and two's complement", pages: "17–24",
  objectives: ["1.3a", "1.3b"],
  summary: "Logical shifts multiply or divide by powers of 2; two's complement stores negative numbers.",
  reading: `
<h4>Logical binary shifts</h4>
<p>A <b>logical shift</b> moves every bit in a register a number of places to the <b>left</b> or <b>right</b>.</p>
<ul><li>Bits that fall off the end of the register are <b>lost</b>.</li>
<li><b>Zeros</b> are shifted in at the opposite end.</li></ul>
<table class="tbl"><tr><th>Shift</th><th>Effect on a positive integer</th></tr>
<tr><td><b>Left</b> by 1 place</td><td>× 2 (left by 2 = × 4, left by 3 = × 8 …)</td></tr>
<tr><td><b>Right</b> by 1 place</td><td>÷ 2, any remainder is lost (right by 2 = ÷ 4, right by 3 = ÷ 8 …)</td></tr></table>
<div class="example"><b>Left shift 2 places:</b> 00010110 (22) → 01011000 (88) — that is 22 × 4.<br>
<b>Right shift 3 places:</b> 01101100 (108) → 00001101 (13) — 108 ÷ 8 = 13.5, the .5 is lost because the bits 100 fell off the right.</div>
<h4>When a shift goes wrong</h4>
<ul><li>If a <b>1</b> is shifted off the <b>left</b> (the most significant bit is lost), the answer is no longer the number × 2ⁿ — this is like an overflow. Example: 11000001 (193) shifted left 1 → 10000010 (130), not 386.</li>
<li>If a <b>1</b> is shifted off the <b>right</b> (the least significant bit is lost), the result is rounded down and accuracy is lost.</li></ul>
<div class="tip"><b>Exam tip:</b> always write the full 8 bits before and after a shift, and say which bits were lost.</div>

<h4>Two's complement: storing negative numbers</h4>
<p>In <b>two's complement</b>, the left-most bit (the most significant bit, MSB) has a <b>negative</b> value of <b>−128</b>. All the other columns are positive as usual.</p>
<table class="tbl center"><tr><th>−128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></table>
<ul><li>If the MSB is <b>0</b>, the number is positive. If the MSB is <b>1</b>, the number is negative.</li>
<li>An 8-bit two's complement number can store values from <b>−128 to +127</b>.</li></ul>
<h4>Two's complement → denary</h4>
<div class="example">11010110 = −128 + 64 + 16 + 4 + 2 = <b>−42</b><br>01010110 = 64 + 16 + 4 + 2 = <b>+86</b></div>
<h4>Negative denary → two's complement</h4>
<ol><li>Write the <b>positive</b> number in 8-bit binary.</li>
<li><b>Invert</b> every bit (0 → 1, 1 → 0). This is the one's complement.</li>
<li><b>Add 1</b>.</li></ol>
<pre class="code">−37:   +37      = 0 0 1 0 0 1 0 1
       invert   = 1 1 0 1 1 0 1 0
       add 1    = 1 1 0 1 1 0 1 1   → check: −128+64+16+8+2+1 = −37 ✓</pre>
<p><b>Shortcut:</b> copy the bits from the right up to and including the first 1, then invert all the bits to the left of it.</p>
<p><b>Positive</b> numbers look exactly the same in two's complement as in ordinary binary (the MSB is 0), as long as they are 127 or less.</p>
<div class="keywords"><b>Key words:</b> logical shift, left shift, right shift, most significant bit (MSB), least significant bit (LSB), two's complement, invert, one's complement, sign</div>`
},
{
  id: "1.4", title: "Text: ASCII and Unicode", pages: "25–29",
  objectives: ["1.4a"],
  summary: "Text is stored as binary codes from a character set — ASCII or Unicode.",
  reading: `
<h4>Why text needs codes</h4>
<p>A computer can only store binary, so every character you type — letters, digits, punctuation, spaces and symbols — is given a unique <b>binary code</b>. The full list of characters a computer can represent, with their codes, is called a <b>character set</b>. When you press a key, the code for that character is stored and processed.</p>

<h4>ASCII</h4>
<p>The <b>American Standard Code for Information Interchange (ASCII)</b> was one of the first character sets.</p>
<ul><li>Standard ASCII uses <b>7 bits</b> per character → 2⁷ = <b>128</b> characters (English letters, digits, punctuation and control codes such as delete and carriage return).</li>
<li><b>Extended ASCII</b> uses <b>8 bits</b> → <b>256</b> characters (adds some symbols and accented letters).</li></ul>
<table class="tbl"><tr><th>Character</th><th>Denary code</th><th>Binary (8 bits)</th></tr>
<tr><td>space</td><td>32</td><td>00100000</td></tr><tr><td>'0'</td><td>48</td><td>00110000</td></tr>
<tr><td>'A'</td><td>65</td><td>01000001</td></tr><tr><td>'B'</td><td>66</td><td>01000010</td></tr>
<tr><td>'a'</td><td>97</td><td>01100001</td></tr></table>
<div class="tip"><b>Patterns to remember:</b> letters are in order, so if 'A' = 65 then 'E' = 69. A lowercase letter is always <b>32 more</b> than its uppercase letter ('a' = 97). The <i>character</i> '7' (code 55) is not the same as the <i>number</i> 7.</div>

<h4>Unicode</h4>
<p>ASCII cannot represent most of the world's languages (Chinese, Arabic, Vietnamese, Hindi…) or emojis. <b>Unicode</b> was created to represent <b>every character in every language</b>.</p>
<ul><li>Unicode uses <b>up to 32 bits (4 bytes)</b> per character, so it can represent over a million characters.</li>
<li>It includes different languages, maths symbols and <b>emojis</b> 😀.</li>
<li>The first 128 Unicode characters are the <b>same as ASCII</b>, so it is backwards compatible.</li></ul>

<h4>ASCII vs Unicode</h4>
<table class="tbl"><tr><th></th><th>ASCII</th><th>Unicode</th></tr>
<tr><td>Bits per character</td><td>7 (extended: 8)</td><td>Up to 32 (more than ASCII)</td></tr>
<tr><td>Number of characters</td><td>128 (extended: 256)</td><td>Over 1 million</td></tr>
<tr><td>Languages</td><td>English only</td><td>All world languages + emojis</td></tr>
<tr><td>File size of text</td><td>Smaller</td><td>Larger (more bits per character)</td></tr></table>
<h4>How much storage does text need?</h4>
<p>Size in bits = number of characters × bits per character. Example: "Hello World" has 11 characters (the space counts!). In 8-bit ASCII that is 11 × 8 = 88 bits = <b>11 bytes</b>.</p>
<div class="keywords"><b>Key words:</b> character set, ASCII, extended ASCII, Unicode, emoji, character code, 7-bit, 8-bit, 32-bit</div>`
},
{
  id: "1.5", title: "Sound", pages: "29–30, 33–34",
  objectives: ["1.5a", "1.5b"],
  summary: "Sampling turns an analogue sound wave into binary. Sample rate and resolution affect quality and file size.",
  reading: `
<h4>From sound wave to binary</h4>
<p>Sound is a <b>vibration</b> that travels through the air as a wave. Natural sound is <b>analogue</b> — it changes smoothly and continuously. A computer cannot store a continuous wave, so the wave must be <b>sampled</b> and converted to binary.</p>
<ol><li>A <b>microphone</b> turns the sound vibrations into an electrical (analogue) signal.</li>
<li>An <b>analogue-to-digital converter (ADC)</b> measures the <b>height (amplitude)</b> of the wave at regular time intervals. Each measurement is a <b>sample</b>.</li>
<li>Each sample is stored as a binary number.</li>
<li>To play it back, a digital-to-analogue converter (DAC) and speaker rebuild the wave.</li></ol>
<svg viewBox="0 0 520 160" class="diagram" role="img" aria-label="A sound wave with sample points taken at regular intervals"><line x1="20" y1="80" x2="510" y2="80" stroke="#c9cfdd" stroke-width="1.5"/><path d="M20,80 C60,10 100,10 140,80 S220,150 260,80 S340,10 380,80 S460,150 500,80" fill="none" stroke="#1b3a6b" stroke-width="3"/>${[20,55,90,125,160,195,230,265,300,335,370,405,440,475].map(x=>{const t=(x-20)/240*Math.PI*2;const y=80-Math.sin(t)*52;return `<line x1="${x}" y1="80" x2="${x}" y2="${y.toFixed(1)}" stroke="#e3b341" stroke-width="3"/><circle cx="${x}" cy="${y.toFixed(1)}" r="4.5" fill="#a87908"/>`}).join("")}<text x="20" y="155" font-size="13" fill="#4c5873" font-family="Nunito">Each gold bar = one sample (amplitude measured at regular intervals)</text></svg>

<h4>Sample rate and sample resolution</h4>
<table class="tbl"><tr><th>Term</th><th>Meaning</th><th>Effect of increasing it</th></tr>
<tr><td><b>Sample rate</b></td><td>The number of samples taken <b>per second</b>, measured in hertz (Hz). CD quality = 44 100 Hz.</td><td>The wave is measured more often, so the recording is <b>more accurate</b> and the <b>file is larger</b>.</td></tr>
<tr><td><b>Sample resolution</b> (also called bit depth)</td><td>The number of <b>bits used to store each sample</b>, e.g. 8, 16 or 24 bits.</td><td>Each amplitude is stored more precisely (more possible values: 2ⁿ), so the recording is <b>more accurate</b> and the <b>file is larger</b>.</td></tr></table>
<div class="tip">Both changes improve <b>accuracy/quality</b> but increase the <b>file size</b>. This is the trade-off you must explain in exams.</div>

<h4>Calculating the size of a sound file</h4>
<pre class="code">file size (bits) = sample rate × sample resolution × length (seconds)
                   × number of channels (1 = mono, 2 = stereo)</pre>
<p>Then convert: ÷ 8 → bytes, ÷ 1024 → KiB, ÷ 1024 → MiB. Always use <b>1024</b>, not 1000.</p>
<div class="example"><b>Example:</b> a 10-second mono recording, sample rate 8000 Hz, resolution 8 bits.<br>
8000 × 8 × 10 = 640 000 bits<br>640 000 ÷ 8 = 80 000 bytes<br>80 000 ÷ 1024 = <b>78.125 KiB</b></div>
<div class="example"><b>Example:</b> a 2-minute track at 44 100 Hz, 16-bit, mono.<br>44 100 × 16 × 120 = 84 672 000 bits ÷ 8 = 10 584 000 bytes ÷ 1024 = 10 335.9 KiB ÷ 1024 ≈ <b>10.09 MiB</b></div>
<p>Remember to convert minutes to <b>seconds</b> first. If a question does not mention stereo, assume one channel.</p>
<div class="keywords"><b>Key words:</b> analogue, digital, sound wave, amplitude, sampling, sample, sample rate, hertz (Hz), sample resolution, bit depth, ADC, mono, stereo, file size</div>`
},
{
  id: "1.6", title: "Images", pages: "30–34",
  objectives: ["1.6a", "1.6b"],
  summary: "A bitmap image is a grid of pixels. Resolution and colour depth affect quality and file size.",
  reading: `
<h4>Pixels</h4>
<p>A bitmap image is made of a grid of tiny dots called <b>pixels</b> (picture elements). Each pixel is one colour, and that colour is stored as a <b>binary number</b>.</p>
<svg viewBox="0 0 340 120" class="diagram" role="img" aria-label="A 1-bit image of a smiley face and the binary that stores it">${(()=>{const g=["00111100","01000010","10100101","10000001","10100101","10011001","01000010","00111100"];let s="";g.forEach((r,y)=>[...r].forEach((b,x)=>{s+=`<rect x="${10+x*13}" y="${6+y*13}" width="12" height="12" fill="${b==="1"?"#1b3a6b":"#fff"}" stroke="#c9cfdd"/>`}));g.forEach((r,y)=>{s+=`<text x="140" y="${16+y*13}" font-size="12" font-family="JetBrains Mono, monospace" fill="#16213a">${r}</text>`});return s+`<text x="230" y="60" font-size="12" fill="#4c5873" font-family="Nunito">1 = navy</text><text x="230" y="78" font-size="12" fill="#4c5873" font-family="Nunito">0 = white</text>`})()}</svg>

<h4>Resolution</h4>
<p>The <b>resolution</b> is the <b>number of pixels</b> in the image, usually given as <b>width × height</b>, e.g. 1920 × 1080.</p>
<ul><li>Higher resolution → more pixels → more detail, sharper image, <b>larger file</b>.</li>
<li>Lower resolution → the image looks <b>pixelated</b> (you can see the squares) when enlarged, but the file is smaller.</li></ul>

<h4>Colour depth</h4>
<p>The <b>colour depth</b> is the <b>number of bits used to represent the colour of each pixel</b>.</p>
<table class="tbl"><tr><th>Colour depth</th><th>Number of colours (2ⁿ)</th></tr>
<tr><td>1 bit</td><td>2 (e.g. black and white)</td></tr><tr><td>2 bits</td><td>4</td></tr><tr><td>4 bits</td><td>16</td></tr>
<tr><td>8 bits</td><td>256</td></tr><tr><td>16 bits</td><td>65 536</td></tr><tr><td>24 bits ("true colour")</td><td>16 777 216 (≈ 16.7 million)</td></tr></table>
<ul><li>Higher colour depth → more colours, more realistic image, <b>larger file</b>.</li></ul>

<h4>Calculating the size of an image file</h4>
<pre class="code">file size (bits) = width (pixels) × height (pixels) × colour depth (bits)</pre>
<div class="example"><b>Example:</b> an 800 × 600 image with 24-bit colour depth.<br>800 × 600 × 24 = 11 520 000 bits<br>÷ 8 = 1 440 000 bytes<br>÷ 1024 = 1406.25 KiB<br>÷ 1024 ≈ <b>1.37 MiB</b></div>
<div class="example"><b>Example:</b> how many colours can a 6-bit colour depth show? 2⁶ = <b>64</b> colours.</div>
<div class="tip"><b>Exam tip:</b> "the file size and quality of the image increase as the resolution and colour depth increase." Learn this sentence! Give your answer in the <b>unit the question asks for</b>.</div>
<p><i>Extra:</i> real image files are usually a little bigger than the calculation because the file also stores <b>metadata</b> (width, height, colour depth, date taken…). <b>Vector graphics</b> are different: they store shapes as maths, so they can be enlarged without becoming pixelated (used for logos).</p>
<div class="keywords"><b>Key words:</b> pixel, bitmap, resolution, colour depth, bits per pixel, pixelated, file size, metadata</div>`
},
{
  id: "1.7", title: "Data storage and compression", pages: "32–44",
  objectives: ["1.7a", "1.7b", "1.7c"],
  summary: "Storage units from bit to exbibyte (using 1024), why we compress files, lossy vs lossless and RLE.",
  reading: `
<h4>Measuring data storage</h4>
<table class="tbl"><tr><th>Unit</th><th>Equal to</th></tr>
<tr><td><b>bit</b></td><td>a single 1 or 0</td></tr><tr><td><b>nibble</b></td><td>4 bits</td></tr><tr><td><b>byte</b></td><td>8 bits</td></tr>
<tr><td><b>kibibyte (KiB)</b></td><td>1024 bytes</td></tr><tr><td><b>mebibyte (MiB)</b></td><td>1024 KiB</td></tr>
<tr><td><b>gibibyte (GiB)</b></td><td>1024 MiB</td></tr><tr><td><b>tebibyte (TiB)</b></td><td>1024 GiB</td></tr>
<tr><td><b>pebibyte (PiB)</b></td><td>1024 TiB</td></tr><tr><td><b>exbibyte (EiB)</b></td><td>1024 PiB</td></tr></table>
<p>To change to a <b>bigger</b> unit, <b>divide</b> (bits ÷ 8 → bytes, then ÷ 1024 each step). To change to a <b>smaller</b> unit, <b>multiply</b>.</p>
<div class="example"><b>Examples:</b> 3 MiB = 3 × 1024 = 3072 KiB · 4096 KiB = 4096 ÷ 1024 = 4 MiB · 2 KiB = 2 × 1024 × 8 = 16 384 bits</div>
<div class="tip">In IGCSE calculations always use <b>1024</b>, never 1000. (Hard-drive makers use 1000, which is why a "500 GB" drive shows less space on a computer.)</div>

<h4>Why compress files?</h4>
<p><b>Compression</b> reduces the <b>size of a file</b>. This means:</p>
<ul><li><b>less storage space</b> is needed on a device or server;</li>
<li><b>less bandwidth</b> is needed to send it over a network;</li>
<li><b>shorter transmission time</b> — files upload, download and stream faster;</li>
<li>it can reduce costs (cloud storage, data plans) and help meet email attachment limits.</li></ul>

<h4>Lossy compression</h4>
<p><b>Lossy</b> compression reduces file size by <b>permanently removing data</b>. The original file <b>cannot</b> be rebuilt exactly.</p>
<ul><li>Images: reduce the <b>resolution</b> or the <b>colour depth</b>; JPEG removes detail the eye barely notices.</li>
<li>Sound: reduce the <b>sample rate</b> or <b>sample resolution</b>; MP3 uses <b>perceptual music shaping</b> to remove sounds humans can't hear or that are drowned out by louder sounds.</li>
<li>Examples: JPEG, MP3, MP4. Big size savings, some quality loss.</li></ul>

<h4>Lossless compression</h4>
<p><b>Lossless</b> compression reduces file size <b>without permanently losing any data</b>. The original file can be rebuilt <b>exactly</b>. It is needed for text, program code, spreadsheets and medical images, where losing even one bit would matter. Examples: PNG, GIF, ZIP, FLAC.</p>
<h4>Run-length encoding (RLE)</h4>
<p><b>RLE</b> is a lossless method. It replaces a <b>run</b> of the same repeated data with <b>one copy of the data and a count</b> of how many times it repeats.</p>
<pre class="code">Text:   AAAAABBBCCCCCCCCD   →  5A 3B 8C 1D     (17 characters → 8)
Pixels: W W W W W W B B W W W W   →  6W 2B 4W</pre>
<p>RLE works best when data has <b>long runs</b> of repeats (e.g. simple images with large blocks of one colour). It is <b>not effective</b> when data changes a lot: "ABCD" becomes "1A1B1C1D", which is <b>bigger</b> than the original!</p>
<table class="tbl"><tr><th></th><th>Lossy</th><th>Lossless</th></tr>
<tr><td>Data removed?</td><td>Yes, permanently</td><td>No</td></tr><tr><td>Original restored?</td><td>No</td><td>Yes, exactly</td></tr>
<tr><td>Size reduction</td><td>Larger</td><td>Smaller</td></tr><tr><td>Use for</td><td>Photos, music, video streaming</td><td>Text, code, spreadsheets, medical scans</td></tr></table>
<div class="keywords"><b>Key words:</b> bit, nibble, byte, kibibyte, mebibyte, gibibyte, tebibyte, pebibyte, exbibyte, compression, bandwidth, lossy, lossless, run-length encoding (RLE), perceptual music shaping</div>`
}
  ]
});
