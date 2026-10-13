/* Chapter 2 — Data transmission & encryption (Syllabus section 2 · Textbook chapter 2, pages 45–74) */
Object.assign(window.OBJECTIVES, {
  "2.1a": "Understand that data is broken down into packets to be transmitted, and describe the structure of a packet (header, payload, trailer). (Syllabus 2.1.1 a–b)",
  "2.1b": "Describe the process of packet switching. (Syllabus 2.1.1 c)",
  "2.2a": "Describe serial, parallel, simplex, half-duplex and full-duplex transmission and explain the suitability of each for a given scenario. (Syllabus 2.1.2)",
  "2.2b": "Understand the universal serial bus (USB) interface, how it is used to transmit data, and its benefits and drawbacks. (Syllabus 2.1.3)",
  "2.3a": "Understand the need to check for errors after data transmission and how errors can occur (data loss, gain and change). (Syllabus 2.2.1)",
  "2.3b": "Describe parity checks (odd and even, parity byte and parity block), checksum and echo check. (Syllabus 2.2.2)",
  "2.3c": "Describe how a check digit is used to detect data-entry errors, including ISBNs and bar codes. (Syllabus 2.2.3)",
  "2.3d": "Describe how an automatic repeat query (ARQ) uses positive/negative acknowledgements and timeouts. (Syllabus 2.2.4)",
  "2.4a": "Understand the need for and purpose of encryption when transmitting data. (Syllabus 2.3.1)",
  "2.4b": "Understand how data is encrypted using symmetric and asymmetric encryption, including public and private keys. (Syllabus 2.3.2)"
});

window.UNITS.push({
  id: "u2", semester: 1, num: 2,
  title: "Data transmission & encryption",
  blurb: "Packets and packet switching, ways of sending data, USB, error detection and encryption.",
  topics: [
{
  id: "2.1", title: "Data packets and packet switching", pages: "45–49",
  objectives: ["2.1a", "2.1b"],
  summary: "Data is split into packets with a header, payload and trailer. Packet switching sends each one by the best route.",
  reading: `
<h4>Why split data into packets?</h4>
<p>When a file is sent across a network or the internet it is broken down into small units called <b>packets</b> (often 64 KiB or less). Small packets are easier to route, and if one is damaged or lost, <b>only that packet</b> has to be sent again — not the whole file.</p>

<h4>The structure of a packet</h4>
<table class="tbl"><tr><th>Part</th><th>What it contains</th></tr>
<tr><td><b>Packet header</b></td><td><ul class="tight"><li>the <b>destination address</b> (IP address of the receiving device)</li><li>the <b>packet number</b> (so the packets can be put back in order)</li><li>the <b>originator's address</b> (IP address of the sender)</li></ul></td></tr>
<tr><td><b>Payload</b></td><td>The <b>actual data</b> being sent (part of the file, email, video…).</td></tr>
<tr><td><b>Trailer</b></td><td>A way of identifying the <b>end of the packet</b>, and an <b>error-checking</b> method such as a cyclic redundancy check (CRC) or checksum.</td></tr></table>
<svg viewBox="0 0 520 70" class="diagram" role="img" aria-label="Packet: header, payload, trailer"><rect x="5" y="10" width="150" height="46" rx="8" fill="#1b3a6b"/><text x="80" y="38" fill="#fff" font-size="14" font-weight="700" text-anchor="middle" font-family="Nunito">HEADER</text><rect x="160" y="10" width="250" height="46" rx="8" fill="#fff8e8" stroke="#e3b341" stroke-width="2"/><text x="285" y="38" fill="#16213a" font-size="14" font-weight="700" text-anchor="middle" font-family="Nunito">PAYLOAD (the data)</text><rect x="415" y="10" width="100" height="46" rx="8" fill="#a87908"/><text x="465" y="38" fill="#fff" font-size="14" font-weight="700" text-anchor="middle" font-family="Nunito">TRAILER</text></svg>

<h4>Packet switching</h4>
<ol><li>The data is <b>broken down into packets</b>.</li>
<li>Each packet is sent <b>independently</b> and could take a <b>different route</b> across the network.</li>
<li>At each step, a <b>router</b> reads the destination address in the header and decides which route (the next "hop") is best — avoiding busy or broken links.</li>
<li>Because they take different routes, packets may <b>arrive out of order</b>.</li>
<li>Once the <b>last packet has arrived</b>, the receiving device <b>reorders</b> the packets using their packet numbers and rebuilds the data.</li>
<li>If a packet is missing or corrupted, a request is sent for it to be <b>re-sent</b>.</li></ol>
<table class="tbl"><tr><th>Advantages of packet switching</th><th>Disadvantages</th></tr>
<tr><td><ul class="tight"><li>No single route is tied up, so the network is used efficiently.</li><li>Packets can avoid broken or busy routes — very reliable.</li><li>Only damaged/lost packets need re-sending.</li><li>Many users can share the same links at the same time.</li></ul></td>
<td><ul class="tight"><li>Packets can be lost and need re-sending.</li><li>Delays while packets are reordered — can be a problem for real-time video calls.</li><li>Extra data (headers/trailers) has to be sent with every packet.</li></ul></td></tr></table>
<div class="tip"><b>Exam tip:</b> the header holds three things — learn them as <b>D-P-O</b>: Destination address, Packet number, Originator's address.</div>
<div class="keywords"><b>Key words:</b> packet, header, payload, trailer, destination address, originator's address, packet number, packet switching, router, hop, CRC, reorder</div>`
},
{
  id: "2.2", title: "Data transmission methods and USB", pages: "49–54",
  objectives: ["2.2a", "2.2b"],
  summary: "Serial vs parallel, simplex vs half-duplex vs full-duplex, choosing a method, and the USB interface.",
  reading: `
<h4>Serial and parallel transmission</h4>
<table class="tbl"><tr><th></th><th>Serial</th><th>Parallel</th></tr>
<tr><td>How</td><td>Data is sent <b>one bit at a time</b> down a <b>single wire</b>.</td><td><b>Several bits are sent at the same time</b> down <b>several wires</b> (e.g. 8 wires for 8 bits).</td></tr>
<tr><td>Advantages</td><td>Bits arrive <b>in order</b> — reliable over <b>long distances</b>. Less chance of interference. Cheaper (fewer wires).</td><td><b>Faster</b> transfer over short distances.</td></tr>
<tr><td>Disadvantages</td><td>Slower than parallel over short distances.</td><td>Bits can arrive at slightly different times (<b>skew</b>) — unreliable over long distances. More expensive cables. <b>Crosstalk</b> (interference between wires).</td></tr>
<tr><td>Used for</td><td>USB, connecting devices over longer distances, the internet</td><td>Inside the computer: the internal buses and circuits; short-distance links</td></tr></table>

<h4>Direction of transmission</h4>
<table class="tbl"><tr><th>Method</th><th>Meaning</th><th>Example</th></tr>
<tr><td><b>Simplex</b></td><td>Data travels in <b>one direction only</b>.</td><td>Computer → printer; TV broadcast; keyboard → computer</td></tr>
<tr><td><b>Half-duplex</b></td><td>Data travels in <b>both directions, but not at the same time</b>.</td><td>Walkie-talkie; some printers that send "out of paper" signals</td></tr>
<tr><td><b>Full-duplex</b></td><td>Data travels in <b>both directions at the same time</b>.</td><td>Phone or video call; broadband internet connection</td></tr></table>
<p>The two ideas combine: e.g. <b>serial full-duplex</b> (a video call over the internet) or <b>parallel simplex</b>.</p>
<div class="tip"><b>Choosing a method in the exam:</b> give the method <b>and</b> a reason linked to the scenario. "Serial, because the printer is 15 m away and serial does not suffer from skew over long distances."</div>

<h4>USB — Universal Serial Bus</h4>
<p><b>USB</b> is an industry-standard interface for connecting devices to a computer. It uses <b>serial</b> transmission. When a device is plugged in:</p>
<ol><li>The computer detects that a device has been connected (it senses a change in voltage on the data wires).</li>
<li>The device is <b>automatically recognised</b> and the correct <b>driver</b> is loaded (or the user is asked to install one).</li>
<li>Data can then be transmitted. Many USB cables can also <b>supply power</b> / charge the device.</li></ol>
<table class="tbl"><tr><th>Benefits of USB</th><th>Drawbacks of USB</th></tr>
<tr><td><ul class="tight"><li>Devices are automatically detected and drivers loaded</li><li>Connectors only fit one way (USB-C is reversible)</li><li>Industry standard — supported by almost all devices</li><li>Can power or charge devices</li><li>Backwards compatible with older USB versions</li><li>Fast transfer rates</li></ul></td>
<td><ul class="tight"><li>Standard cable length is limited (about 5 m)</li><li>Older USB versions may not be supported / can be slow</li><li>Very old devices may not have USB ports</li></ul></td></tr></table>
<div class="keywords"><b>Key words:</b> serial, parallel, skew, crosstalk, interference, simplex, half-duplex, full-duplex, USB, interface, driver, backwards compatible</div>`
},
{
  id: "2.3", title: "Methods of error detection", pages: "54–63",
  objectives: ["2.3a", "2.3b", "2.3c", "2.3d"],
  summary: "Parity checks, checksums, echo checks, check digits and ARQ — how computers spot errors.",
  reading: `
<h4>Why check for errors?</h4>
<p>During transmission, <b>interference</b> (e.g. electrical noise, a weak signal) can corrupt data. Errors can be:</p>
<ul><li><b>data loss</b> – some bits or packets go missing;</li><li><b>data gain</b> – extra bits are added;</li><li><b>data change</b> – bits are flipped (a 0 becomes 1 or a 1 becomes 0).</li></ul>
<p>So the receiver must check the data arrived <b>exactly</b> as it was sent.</p>

<h4>Parity check</h4>
<p>The sender and receiver agree on <b>even</b> or <b>odd</b> parity. One bit of each byte (usually the left-most) is used as a <b>parity bit</b>, set so that the byte has the right number of 1s.</p>
<ul><li><b>Even parity:</b> the total number of 1s (including the parity bit) must be <b>even</b>.</li>
<li><b>Odd parity:</b> the total number of 1s must be <b>odd</b>.</li></ul>
<div class="example">Data 1011001 has four 1s.<br>Even parity → parity bit <b>0</b> → <b>0</b>1011001 · Odd parity → parity bit <b>1</b> → <b>1</b>1011001</div>
<p>The receiver counts the 1s. If the parity is wrong, an error has happened. <b>Limitation:</b> if <b>two</b> bits are changed, the count is still even/odd and the error is <b>not detected</b>. A simple parity check also can't say <i>which</i> bit is wrong.</p>
<h4>Parity byte and parity block check</h4>
<p>Data is sent as a <b>block</b> of bytes. Each byte has a parity bit, <b>and</b> an extra <b>parity byte</b> is sent at the end, made from the parity of each <b>column</b>. If one bit is wrong, the faulty <b>row</b> (byte) and faulty <b>column</b> both have the wrong parity — where they cross is the incorrect bit, so it can be <b>corrected</b>.</p>
<table class="tbl center pblock"><tr><th></th><th>P</th><th>b1</th><th>b2</th><th>b3</th><th>b4</th><th>b5</th><th>b6</th><th>b7</th></tr>
<tr><th>Byte 1</th><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><th>Byte 2</th><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr class="bad-row"><th>Byte 3</th><td>0</td><td>0</td><td>0</td><td class="bad-cell">1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
<tr><th>Byte 4</th><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><th>Parity byte</th><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table>
<p class="small">Even parity is used. Byte 3 has five 1s (odd ✗), so that row is wrong. Column b3 (including the parity byte) has three 1s (odd ✗), so that column is wrong. They cross at <b>Byte 3, b3</b>: that bit was flipped from 0 to 1, so the receiver can correct it.</p>

<h4>Checksum</h4>
<ol><li>The sender calculates a value (the <b>checksum</b>) from the block of data using an agreed algorithm.</li>
<li>The checksum is sent <b>with</b> the data.</li>
<li>The receiver <b>recalculates</b> the checksum from the data it received.</li>
<li>If the two values are <b>different</b>, an error has occurred and the data is requested again.</li></ol>

<h4>Echo check</h4>
<p>The receiver sends a <b>copy of the data back</b> to the sender. The sender compares it with the original. If they are different, the data is sent again. <b>Limitation:</b> if they differ, you can't tell whether the error happened on the way <b>there</b> or on the way <b>back</b> — and it doubles the amount of data sent.</p>

<h4>Check digits (errors in data entry)</h4>
<p>A <b>check digit</b> is an extra digit added to the end of a number such as an <b>ISBN</b> (book number) or a <b>bar code</b>. It is <b>calculated from the other digits</b>. When the number is typed or scanned, the check digit is recalculated; if it doesn't match, the number was entered wrongly. It catches: a wrong digit, two digits swapped (<b>transposition</b>), a missing or extra digit.</p>
<div class="example"><b>ISBN-13 method:</b> multiply the first 12 digits alternately by 1 and 3, add them, find the remainder ÷ 10, then subtract it from 10 (a result of 10 becomes 0).<br>
978030640615? → 9×1 + 7×3 + 8×1 + 0×3 + 3×1 + 0×3 + 6×1 + 4×3 + 0×1 + 6×3 + 1×1 + 5×3 = 93 · 93 MOD 10 = 3 · 10 − 3 = <b>7</b> → ISBN 9780306406157</div>
<div class="tip">Parity, checksum and echo check detect errors in <b>transmission</b>. A check digit detects errors in <b>data entry</b> (typing or scanning).</div>

<h4>Automatic Repeat Query (ARQ)</h4>
<ol><li>The sender sends the data and starts a <b>timer</b>.</li>
<li>The receiver checks the data using an error-detection method.</li>
<li>If it is correct, the receiver sends a <b>positive acknowledgement</b>. If it has an error, it sends a <b>negative acknowledgement</b> — and the data is re-sent.</li>
<li>If the sender gets <b>no acknowledgement</b> before the <b>timeout</b> runs out, it assumes the data was lost and <b>re-sends</b> it automatically.</li>
<li>This repeats until a positive acknowledgement is received (or a set number of tries).</li></ol>
<div class="keywords"><b>Key words:</b> interference, data loss, data gain, data change, parity bit, even parity, odd parity, parity byte, parity block, checksum, echo check, check digit, ISBN, bar code, transposition error, ARQ, positive acknowledgement, negative acknowledgement, timeout</div>`
},
{
  id: "2.4", title: "Encryption", pages: "63–74",
  objectives: ["2.4a", "2.4b"],
  summary: "Encryption makes intercepted data meaningless. Symmetric uses one key; asymmetric uses a public and a private key.",
  reading: `
<h4>Why encrypt data?</h4>
<p>Data sent over a network (especially the internet, a <b>public</b> network) can be <b>intercepted</b> by a hacker or eavesdropper. <b>Encryption</b> scrambles the data so that, if it is intercepted, it is <b>meaningless</b> and cannot be understood without the key.</p>
<div class="tip"><b>Common mistake:</b> encryption does <b>not stop</b> data being intercepted, hacked or deleted. It only makes the intercepted data <b>unreadable</b>.</div>
<table class="tbl"><tr><th>Term</th><th>Meaning</th></tr>
<tr><td><b>Plaintext</b></td><td>The original, readable data before encryption.</td></tr>
<tr><td><b>Ciphertext</b></td><td>The scrambled, unreadable data after encryption.</td></tr>
<tr><td><b>Encryption algorithm</b></td><td>The method (set of rules) used to scramble the data.</td></tr>
<tr><td><b>Key</b></td><td>A value used by the algorithm to encrypt or decrypt the data.</td></tr></table>
<p>Plaintext → <b>encryption algorithm + key</b> → ciphertext → <b>decryption with the key</b> → plaintext</p>

<h4>Symmetric encryption</h4>
<p>Uses the <b>same secret key</b> to encrypt <b>and</b> decrypt the data. The sender and receiver must both have it.</p>
<div class="example"><b>Caesar cipher (a very simple example):</b> key = shift each letter 3 places. HELLO → <b>KHOOR</b>. The receiver shifts back 3 to decrypt.</div>
<ul><li><b>Problem — key distribution:</b> the secret key has to be sent to the receiver first. If it is intercepted, anyone can decrypt every message.</li>
<li>Real systems use keys of 256 bits — 2²⁵⁶ possible keys — so guessing (brute force) is practically impossible.</li>
<li>Used for: Wi-Fi passwords (pre-shared key), password-protected ZIP files, encrypted hard drives.</li></ul>

<h4>Asymmetric encryption</h4>
<p>Uses <b>two different but matching keys</b>, both created by the <b>receiver</b>:</p>
<ul><li>a <b>public key</b> — given to anyone; it is used to <b>encrypt</b> data;</li>
<li>a <b>private key</b> — kept secret by the receiver; it is the only key that can <b>decrypt</b> data that was encrypted with the matching public key.</li></ul>
<ol><li>The receiver (e.g. Tom) sends his <b>public key</b> to the sender (Meera).</li>
<li>Meera <b>encrypts</b> her message with Tom's public key.</li>
<li>The ciphertext is sent. Even if it is intercepted, the public key cannot decrypt it.</li>
<li>Tom <b>decrypts</b> it with his <b>private key</b>, which never leaves his computer.</li></ol>
<div class="example"><b>Padlock analogy:</b> Tom hands out open padlocks (public keys). Anyone can snap one shut on a box, but only Tom has the key (private key) to open it.</div>
<p>This <b>solves the key-distribution problem</b> — the private key never has to be sent. It is used for <b>HTTPS</b> websites, online banking and secure email. It is slower than symmetric encryption, so in practice it is often used to share a symmetric key safely.</p>
<table class="tbl"><tr><th></th><th>Symmetric</th><th>Asymmetric</th></tr>
<tr><td>Keys</td><td>1 shared secret key</td><td>2 keys: public + private</td></tr>
<tr><td>Encrypt with</td><td>the shared key</td><td>the receiver's public key</td></tr>
<tr><td>Decrypt with</td><td>the same shared key</td><td>the receiver's private key</td></tr>
<tr><td>Main problem</td><td>sharing the key safely</td><td>slower to process</td></tr></table>
<div class="keywords"><b>Key words:</b> encryption, decryption, interception, plaintext, ciphertext, algorithm, key, symmetric, asymmetric, public key, private key, key distribution, brute force, HTTPS</div>`
}
  ]
});
