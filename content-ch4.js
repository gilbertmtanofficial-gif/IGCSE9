/* Chapter 4 — Hardware (Syllabus section 3.1–3.3 · Textbook chapter 3, pages 75–132) */
Object.assign(window.OBJECTIVES, {
  "4.1a": "Understand the role of the CPU in a computer and what is meant by a microprocessor. (Syllabus 3.1.1)",
  "4.1b": "Understand the purpose of the components in a Von Neumann CPU: ALU, CU, registers (PC, MAR, MDR, CIR, ACC) and buses (address, data, control). (Syllabus 3.1.2a)",
  "4.2a": "Describe the fetch–decode–execute (FDE) cycle, including the role of each component. (Syllabus 3.1.2b)",
  "4.2b": "Understand what is meant by a core, cache and clock in a CPU and how they affect performance. (Syllabus 3.1.3)",
  "4.3a": "Understand the purpose and use of an instruction set for a CPU. (Syllabus 3.1.4)",
  "4.3b": "Describe the purpose and characteristics of an embedded system and identify devices in which they are used. (Syllabus 3.1.5)",
  "4.4a": "Understand what is meant by an input device and why it is required (keyboard, microphone, optical mouse, touch screens). (Syllabus 3.2.1)",
  "4.4b": "Understand what is meant by an output device and why it is required. (Syllabus 3.2.2)",
  "4.5a": "Describe barcode scanners, QR code scanners, digital cameras and 2D/3D scanners. (Syllabus 3.2.1)",
  "4.6a": "Describe LED and LCD screens and DLP and LCD projectors. (Syllabus 3.2.2)",
  "4.6b": "Describe actuators and speakers. (Syllabus 3.2.2)",
  "4.7a": "Describe inkjet printers, laser printers and 3D printers. (Syllabus 3.2.2)",
  "4.8a": "Understand what is meant by a sensor and the type of data each sensor captures. (Syllabus 3.2.3a)",
  "4.8b": "Understand when each sensor would be used and select the most suitable sensor for a given context. (Syllabus 3.2.3b)",
  "4.9a": "Understand what is meant by primary storage, including the role of RAM and ROM and why a computer needs both. (Syllabus 3.3.1)",
  "4.9b": "Describe virtual memory: how it is created and used and why it is necessary. (Syllabus 3.3.4)",
  "4.10a": "Understand what is meant by secondary storage. (Syllabus 3.3.2)",
  "4.10b": "Describe the operation of magnetic, optical and solid-state (flash) storage and give examples of each. (Syllabus 3.3.3)",
  "4.11a": "Understand what is meant by cloud storage. (Syllabus 3.3.5)",
  "4.11b": "Explain the advantages and disadvantages of storing data on the cloud compared with storing it locally. (Syllabus 3.3.6)"
});

window.UNITS.push({
  id: "u4", semester: 2, num: 4,
  title: "Hardware",
  blurb: "Inside the CPU, input and output devices, sensors, primary and secondary storage, and the cloud.",
  topics: [
{
  id: "4.1", title: "Computer architecture: the CPU and its components", pages: "75–80",
  objectives: ["4.1a", "4.1b"],
  summary: "The CPU, microprocessors, and the Von Neumann components: ALU, CU, registers and buses.",
  reading: `
<h4>The central processing unit (CPU)</h4>
<p>The <b>CPU</b> is the part of the computer that <b>processes instructions and data</b> that are input into the computer, so that the result can be output. It carries out (executes) program instructions one after another, extremely quickly.</p>
<p>A <b>microprocessor</b> is a type of <b>integrated circuit on a single chip</b> that contains a CPU. Microprocessors are found in PCs, phones, games consoles and many other devices.</p>

<h4>Von Neumann architecture</h4>
<p>Most computers follow the <b>Von Neumann</b> (stored program) design: <b>programs and data are stored together in memory (RAM)</b>, and instructions are fetched from memory one at a time and executed in sequence.</p>
<svg viewBox="0 0 600 250" class="diagram" role="img" aria-label="Von Neumann architecture: CPU with CU, ALU and registers connected to RAM by address, data and control buses">
<rect x="10" y="10" width="330" height="230" rx="14" fill="#eaf0fa" stroke="#1b3a6b" stroke-width="2"/><text x="22" y="32" font-size="14" font-weight="800" fill="#1b3a6b" font-family="Nunito">CPU</text>
<rect x="28" y="44" width="130" height="50" rx="8" fill="#fff8e8" stroke="#16213a" stroke-width="2"/><text x="93" y="74" font-size="13" font-weight="800" text-anchor="middle" fill="#16213a" font-family="Nunito">Control unit</text>
<rect x="190" y="44" width="130" height="50" rx="8" fill="#fff8e8" stroke="#16213a" stroke-width="2"/><text x="255" y="66" font-size="13" font-weight="800" text-anchor="middle" fill="#16213a" font-family="Nunito">ALU</text><text x="255" y="83" font-size="11" text-anchor="middle" fill="#4c5873" font-family="Nunito">+ Accumulator</text>
${["PC","MAR","MDR","CIR","ACC"].map((r,i)=>`<rect x="${28+i*60}" y="120" width="52" height="34" rx="6" fill="#1b3a6b"/><text x="${54+i*60}" y="142" font-size="12" font-weight="800" text-anchor="middle" fill="#fff" font-family="JetBrains Mono, monospace">${r}</text>`).join("")}
<text x="28" y="176" font-size="11" fill="#4c5873" font-family="Nunito">Registers: tiny, very fast memory locations inside the CPU</text>
<rect x="450" y="40" width="140" height="180" rx="12" fill="#fdf4dc" stroke="#a87908" stroke-width="2"/><text x="520" y="120" font-size="15" font-weight="800" text-anchor="middle" fill="#16213a" font-family="Nunito">Memory</text><text x="520" y="138" font-size="12" text-anchor="middle" fill="#4c5873" font-family="Nunito">(RAM: instructions</text><text x="520" y="153" font-size="12" text-anchor="middle" fill="#4c5873" font-family="Nunito">and data)</text>
${[["Address bus →",70,"#16b981"],["Data bus ↔",130,"#e3b341"],["Control bus ↔",190,"#c9354f"]].map(([t,y,c])=>`<line x1="340" y1="${y}" x2="450" y2="${y}" stroke="${c}" stroke-width="7"/><text x="395" y="${y-8}" font-size="11.5" font-weight="800" text-anchor="middle" fill="#16213a" font-family="Nunito">${t}</text>`).join("")}
</svg>
<h4>Units</h4>
<table class="tbl"><tr><th>Component</th><th>Purpose</th></tr>
<tr><td><b>Control unit (CU)</b></td><td>Controls and coordinates all the other parts. It <b>decodes</b> instructions and sends <b>control signals</b> along the control bus to tell components what to do. It manages the fetch–decode–execute cycle.</td></tr>
<tr><td><b>Arithmetic logic unit (ALU)</b></td><td>Carries out <b>calculations</b> (+ − × ÷) and <b>logical operations</b> (comparisons such as AND, OR, &gt;, =). Results are stored in the accumulator.</td></tr></table>
<h4>Registers</h4>
<table class="tbl"><tr><th>Register</th><th>What it holds</th></tr>
<tr><td><b>Program counter (PC)</b></td><td>The <b>address of the next instruction</b> to be fetched.</td></tr>
<tr><td><b>Memory address register (MAR)</b></td><td>The <b>address</b> of the memory location that is about to be read from or written to.</td></tr>
<tr><td><b>Memory data register (MDR)</b></td><td>The <b>data or instruction</b> that has just been read from memory, or is about to be written to memory.</td></tr>
<tr><td><b>Current instruction register (CIR)</b></td><td>The <b>instruction currently being decoded and executed</b>.</td></tr>
<tr><td><b>Accumulator (ACC)</b></td><td>Temporarily holds the <b>results of calculations</b> done by the ALU.</td></tr></table>
<h4>Buses</h4>
<p>A <b>bus</b> is a set of parallel wires that carries signals between components.</p>
<table class="tbl"><tr><th>Bus</th><th>Carries</th><th>Direction</th></tr>
<tr><td><b>Address bus</b></td><td><b>Memory addresses</b> (from the MAR to memory)</td><td><b>One way</b> (unidirectional): CPU → memory</td></tr>
<tr><td><b>Data bus</b></td><td><b>Data and instructions</b> (between the MDR and memory)</td><td><b>Two way</b> (bidirectional)</td></tr>
<tr><td><b>Control bus</b></td><td><b>Control signals</b> from the CU, e.g. read, write, clock, interrupt</td><td><b>Two way</b> (bidirectional)</td></tr></table>
<div class="tip"><b>Remember:</b> the <b>address</b> bus only goes <b>one way</b> — the CPU tells memory <i>where</i>; memory never needs to send an address back.</div>
<div class="keywords"><b>Key words:</b> CPU, microprocessor, integrated circuit, Von Neumann architecture, stored program, control unit, ALU, register, PC, MAR, MDR, CIR, accumulator, address bus, data bus, control bus</div>`
},
{
  id: "4.2", title: "Cores, cache, clock and the FDE cycle", pages: "77–82",
  objectives: ["4.2a", "4.2b"],
  summary: "How the CPU fetches, decodes and executes instructions, and what makes a CPU faster.",
  reading: `
<h4>The fetch–decode–execute (FDE) cycle</h4>
<p>The CPU repeats this cycle billions of times a second.</p>
<table class="tbl"><tr><th>Stage</th><th>What happens</th></tr>
<tr><td><b>Fetch</b></td><td><ol class="tight"><li>The address in the <b>PC</b> is copied to the <b>MAR</b>.</li><li>The address is sent along the <b>address bus</b> to memory, and a <b>read</b> signal is sent on the <b>control bus</b>.</li><li>The instruction at that address is sent along the <b>data bus</b> to the <b>MDR</b>.</li><li>The instruction is copied from the MDR to the <b>CIR</b>.</li><li>The <b>PC is incremented</b> (+1) so it points to the next instruction.</li></ol></td></tr>
<tr><td><b>Decode</b></td><td>The <b>control unit</b> decodes the instruction in the CIR to work out what it means (using the <b>instruction set</b>).</td></tr>
<tr><td><b>Execute</b></td><td>The instruction is carried out. The CU sends control signals; the <b>ALU</b> may do a calculation and store the result in the <b>accumulator</b>; data may be read from or written to memory using the MAR and MDR.</td></tr></table>
<div class="tip"><b>Memory trick for fetch:</b> PC → MAR → (address bus) → memory → (data bus) → MDR → CIR, then PC + 1.</div>

<h4>What affects CPU performance?</h4>
<table class="tbl"><tr><th>Factor</th><th>What it is</th><th>Effect on performance</th></tr>
<tr><td><b>Clock speed</b></td><td>The CPU has an internal <b>clock</b> that sends out pulses; one FDE cycle step happens per pulse. Measured in <b>hertz</b>: 3.5 GHz = 3.5 billion cycles per second.</td><td>A <b>higher clock speed</b> means <b>more instructions per second</b>. (Too high → overheating; overclocking can make the computer unstable.)</td></tr>
<tr><td><b>Number of cores</b></td><td>A <b>core</b> is an independent processing unit inside the CPU with its own ALU, CU and registers. Dual-core = 2, quad-core = 4.</td><td>More cores can process <b>more instructions at the same time</b>. But doubling the cores does not always double the speed: software must be written to use them, and cores must communicate with each other.</td></tr>
<tr><td><b>Cache size</b></td><td><b>Cache</b> is a small amount of very fast memory <b>inside or very close to the CPU</b> that stores frequently used data and instructions.</td><td>Cache is much faster to access than RAM, so a <b>larger cache</b> means the CPU waits less for data. (But a very large cache takes longer to search.)</td></tr></table>
<div class="example"><b>Exam-style answer:</b> "Computer B will perform better because its clock speed is higher, so it can carry out more FDE cycles per second, and its larger cache means frequently used instructions can be fetched faster than from RAM."</div>
<div class="keywords"><b>Key words:</b> fetch–decode–execute cycle, fetch, decode, execute, increment, clock, clock speed, GHz, overclocking, core, multi-core, cache, performance</div>`
},
{
  id: "4.3", title: "Instruction sets, microprocessors and embedded systems", pages: "82–87",
  objectives: ["4.3a", "4.3b", "4.1a"],
  summary: "An instruction set is the list of machine-code commands a CPU can run. Embedded systems do one dedicated job.",
  reading: `
<h4>Instruction sets</h4>
<p>An <b>instruction set</b> is the <b>list of all the commands that can be processed by a CPU</b>. The commands are in <b>machine code</b> (binary). Each instruction has an <b>opcode</b> (what to do, e.g. ADD, LOAD, STORE, JUMP) and often an <b>operand</b> (the data or address to use).</p>
<pre class="code">Opcode   Operand        Meaning
LDA      20             Load the value at address 20 into the accumulator
ADD      21             Add the value at address 21
STA      22             Store the result at address 22</pre>
<p>Different families of CPU (e.g. x86 in most PCs, ARM in most phones) have <b>different instruction sets</b>. That is why a program compiled for one type of CPU will not run on another.</p>

<h4>Microprocessors</h4>
<p>A <b>microprocessor</b> is an <b>integrated circuit on a single chip</b> that carries out the work of a CPU. It reads instructions from memory, decodes them using its instruction set and executes them. Smaller, cheaper versions called <b>microcontrollers</b> also include memory and input/output ports on the same chip — perfect for embedded systems.</p>

<h4>Embedded systems</h4>
<p>An <b>embedded system</b> is a combination of hardware and software designed to perform a <b>dedicated function</b> (one specific task) inside a larger device. It usually uses a microprocessor or microcontroller, takes input from sensors or buttons, and controls outputs.</p>
<table class="tbl"><tr><th>Embedded system</th><th>General-purpose computer</th></tr>
<tr><td>Performs <b>one dedicated function</b></td><td>Performs <b>many different functions</b></td></tr>
<tr><td>Examples: washing machine, microwave, car engine management, security alarm, central heating, smart lighting, vending machine, traffic lights</td><td>Examples: PC, laptop</td></tr></table>
<table class="tbl"><tr><th>Advantages of embedded systems</th><th>Disadvantages</th></tr>
<tr><td><ul class="tight"><li>Small, so they fit inside devices</li><li>Cheap to mass-produce</li><li>Use very little power</li><li>Fast and reliable at their one task</li><li>Can often be controlled remotely (e.g. a smart oven through an app)</li></ul></td>
<td><ul class="tight"><li>Difficult or impossible to upgrade</li><li>Can't easily be repaired — often the whole unit is replaced</li><li>If connected to the internet, they can be open to hacking</li><li>Only do one job</li></ul></td></tr></table>
<div class="example"><b>How a microwave works:</b> the user presses buttons (input) → the microprocessor runs its program (stored in ROM) → it switches the magnetron on and counts down the timer (output on the display) → when the time reaches 0 it turns off and beeps.</div>
<div class="keywords"><b>Key words:</b> instruction set, machine code, opcode, operand, microprocessor, microcontroller, integrated circuit, embedded system, dedicated function, general-purpose computer</div>`
},
{
  id: "4.4", title: "Input and output devices", pages: "88–101",
  objectives: ["4.4a", "4.4b"],
  summary: "Input devices get data into a computer; output devices show or use the results. Keyboards, mice, microphones and touch screens.",
  reading: `
<h4>Input and output devices</h4>
<p>An <b>input device</b> is hardware that lets data be <b>entered into a computer</b> — it converts something from the real world (key presses, movement, sound, light) into <b>digital data</b> the computer can process. Without input devices there would be no data to process.</p>
<p>An <b>output device</b> takes processed data from the computer and turns it into a form people can understand or use (images, sound, printed paper, movement). Without output devices we couldn't see or use the results.</p>
<table class="tbl"><tr><th>Input devices (syllabus)</th><th>Output devices (syllabus)</th></tr>
<tr><td>barcode scanner, digital camera, keyboard, microphone, optical mouse, QR code scanner, touch screen (resistive, capacitive, infra-red), 2D and 3D scanners</td><td>actuator, DLP projector, inkjet printer, laser printer, LED screen, LCD projector, LCD screen, speaker, 3D printer</td></tr></table>

<h4>Keyboard</h4>
<p>Each key press completes a circuit under the key. A chip in the keyboard works out which key was pressed and sends its <b>character code</b> (e.g. ASCII/Unicode) to the computer. Used for typing text and commands. Slow for large amounts of data; can cause repetitive strain injury (RSI).</p>
<h4>Optical mouse</h4>
<p>A <b>red LED</b> shines light onto the surface; a tiny <b>camera/sensor (CMOS)</b> takes thousands of images per second; a microprocessor compares the images to work out the <b>direction and speed</b> of movement, which moves the pointer. No moving parts, so less dirt problems; doesn't work well on glass or shiny surfaces.</p>
<h4>Microphone</h4>
<p>Sound makes a <b>diaphragm</b> vibrate; the vibration moves a coil near a magnet (or changes a capacitor) and creates an <b>electrical (analogue) signal</b>. An <b>ADC</b> converts this to digital data by sampling. Used for voice recognition, video calls, recording.</p>

<h4>Touch screens</h4>
<table class="tbl"><tr><th>Type</th><th>How it works</th><th>Pros</th><th>Cons</th></tr>
<tr><td><b>Resistive</b></td><td>Two flexible layers separated by a small gap. Pressing pushes the top layer onto the bottom one, completing a circuit; the point of contact is calculated.</td><td>Cheap; works with gloves or a stylus</td><td>Needs pressure; poor visibility in sunlight; easily damaged; usually no multi-touch</td></tr>
<tr><td><b>Capacitive</b></td><td>A conductive layer holds an electric field. A finger (which conducts) changes the <b>capacitance</b> at that point and sensors work out the position.</td><td>Very responsive; multi-touch; durable glass; clear image</td><td>Doesn't work with normal gloves or non-conductive styluses</td></tr>
<tr><td><b>Infra-red</b></td><td>A grid of <b>infra-red beams</b> and sensors around the edge. A finger <b>breaks the beams</b>; the broken beams give the position.</td><td>Works with fingers, gloves or any object; multi-touch; good for large screens</td><td>Expensive; can be affected by bright light or dirt on the frame</td></tr></table>
<div class="tip"><b>Exam tip:</b> when asked "why is an input device needed?" say it <b>converts real-world data into digital data</b> that the computer can process.</div>
<div class="keywords"><b>Key words:</b> input device, output device, keyboard, optical mouse, LED, CMOS sensor, microphone, diaphragm, ADC, touch screen, resistive, capacitive, infra-red, multi-touch</div>`
},
{
  id: "4.5", title: "Scanners and cameras", pages: "88–101",
  objectives: ["4.5a"],
  summary: "Barcode scanners, QR code scanners, digital cameras and 2D and 3D scanners.",
  reading: `
<h4>Barcode scanner</h4>
<p>A <b>barcode</b> is a series of dark and light lines that represents a number (e.g. a product code).</p>
<ol><li>The scanner shines a <b>red laser or LED</b> light across the barcode.</li>
<li>The <b>dark lines reflect less light</b> and the white spaces reflect more.</li>
<li><b>Sensors (photoelectric cells)</b> detect the pattern of reflected light and convert it into binary/a number.</li>
<li>The <b>check digit</b> is recalculated to make sure the barcode was read correctly.</li>
<li>The number is looked up in a database (e.g. the product's price and description; stock is updated).</li></ol>
<p>Used in supermarkets, libraries, warehouses and airport baggage. Faster and more accurate than typing; but damaged or dirty barcodes may not scan.</p>
<h4>QR code scanner</h4>
<p>A <b>QR (quick response) code</b> is a <b>2D matrix of dark and light squares</b>. It can hold far <b>more data</b> than a barcode (thousands of characters, such as a URL, Wi-Fi details or a boarding pass). The three large squares in the corners help the scanner find the code and its orientation, so it can be read from any angle.</p>
<ul><li>A phone camera (or scanner) takes an image of the code; software analyses the pattern of squares and decodes it.</li>
<li>Advantages: more data than a barcode; can be read in any direction; still works if partly damaged (error correction); no special scanner needed — any smartphone camera.</li>
<li>Disadvantages: malicious QR codes can link to fake websites (<b>"attagging"</b>); different formats exist.</li></ul>
<h4>Digital camera</h4>
<ol><li>Light passes through the <b>lens</b> onto an <b>image sensor</b> (CCD or CMOS) made of millions of light-sensitive cells — one per pixel.</li>
<li>Each cell measures the amount and colour of light and converts it into an electrical signal.</li>
<li>A microprocessor converts the signals into binary and stores the image (often compressed as a JPEG) on a memory card.</li></ol>
<p>The number of pixels the sensor has (e.g. 12 megapixels) decides the maximum <b>resolution</b>.</p>
<h4>2D scanner</h4>
<p>Used to scan flat documents and photos. A bright light moves across the document; the reflected light is directed by mirrors and a lens onto a sensor (CCD), which converts it into a digital image. <b>OCR (optical character recognition)</b> software can then turn the image of the text into editable text. Also used at airports to read passports.</p>
<h4>3D scanner</h4>
<p>Used to scan <b>solid objects</b> to make a 3D digital model. Lasers, light or X-rays are used to measure the object from many angles and capture its shape and dimensions as many points. Uses: CT and MRI scanners in hospitals, scanning parts to be copied with a 3D printer, designing prosthetics, archaeology.</p>
<div class="keywords"><b>Key words:</b> barcode, laser, photoelectric cell, reflection, check digit, QR code, 2D matrix, digital camera, image sensor, CCD, CMOS, megapixel, 2D scanner, OCR, 3D scanner, CT scan</div>`
},
{
  id: "4.6", title: "Screens, projectors, actuators and speakers", pages: "101–111",
  objectives: ["4.6a", "4.6b"],
  summary: "LED and LCD screens, DLP and LCD projectors, actuators and speakers.",
  reading: `
<h4>LCD screens</h4>
<p>An <b>LCD (liquid crystal display)</b> screen is made of tiny pixels of <b>liquid crystals</b>. The liquid crystals <b>do not give out light</b> themselves, so the screen needs a <b>backlight</b> (today usually LEDs). Each pixel has red, green and blue filters; the crystals twist to block or let through light, creating the colour of each pixel.</p>
<h4>LED screens</h4>
<p>In a true <b>LED screen</b>, each pixel is made of tiny <b>light-emitting diodes</b> (red, green and blue) that <b>produce their own light</b>. (Many TVs sold as "LED" are actually LCD screens with an LED backlight. <b>OLED</b> screens use organic LEDs, each pixel making its own light — they can be thin and flexible.)</p>
<table class="tbl"><tr><th>LED backlighting / LED screens — advantages</th></tr>
<tr><td><ul class="tight"><li>Reach full brightness almost immediately</li><li>Very bright, vivid colours and higher contrast</li><li>Use much <b>less power</b> and produce less heat than old fluorescent (CCFL) backlights</li><li>Last a long time; very thin screens possible</li></ul></td></tr></table>
<h4>Projectors</h4>
<table class="tbl"><tr><th>Type</th><th>How it works</th><th>Pros</th><th>Cons</th></tr>
<tr><td><b>DLP (digital light processing)</b></td><td>Uses a chip with <b>millions of tiny micromirrors</b>, one per pixel. Each mirror tilts towards or away from the light thousands of times a second to make light or dark pixels. A spinning <b>colour wheel</b> adds the colours.</td><td>High contrast, deep blacks; smaller and lighter; sharp image; reliable, no filters</td><td>Colours can be less vivid; "rainbow effect" for some viewers; colour wheel can be noisy</td></tr>
<tr><td><b>LCD projector</b></td><td>A bright light is split into red, green and blue and passed through <b>three LCD panels</b>; the colours are combined and projected through a lens.</td><td>Brighter, more accurate and saturated colours; sharper image; quieter</td><td>Lower contrast (blacks look grey); visible pixels ("screen door"); bigger; filters need cleaning</td></tr></table>
<h4>Actuators</h4>
<p>An <b>actuator</b> is an output device that <b>creates physical movement</b> when it receives a signal from a computer — e.g. a <b>motor</b>, <b>pump</b>, <b>valve</b>, <b>relay</b> or <b>solenoid</b>. Actuators are used in control systems: opening a window in a greenhouse, turning on a heater, moving a robot arm, locking a door. The computer's digital signal is usually converted by a DAC first.</p>
<h4>Speakers</h4>
<ol><li>Digital sound data is converted to an <b>analogue electrical signal</b> by a <b>DAC</b> (digital-to-analogue converter) and amplified.</li>
<li>The changing current flows through a <b>coil</b> of wire near a <b>permanent magnet</b>, creating a changing magnetic field.</li>
<li>The coil moves in and out, making the <b>cone (diaphragm)</b> vibrate.</li>
<li>The vibrations create <b>sound waves</b> in the air.</li></ol>
<div class="keywords"><b>Key words:</b> LCD, liquid crystal, backlight, LED, OLED, pixel, contrast, DLP, micromirror, colour wheel, LCD projector, actuator, motor, solenoid, relay, speaker, DAC, coil, cone</div>`
},
{
  id: "4.7", title: "Printers: inkjet, laser and 3D", pages: "101–111",
  objectives: ["4.7a"],
  summary: "How inkjet, laser and 3D printers work, and which one suits which job.",
  reading: `
<h4>Inkjet printer</h4>
<ol><li>The data is sent to the printer and stored in a printer <b>buffer</b>.</li>
<li>A <b>print head</b> moves across the paper, firing <b>tiny droplets of liquid ink</b> through nozzles. There are two methods:
<ul class="tight"><li><b>Thermal bubble</b> – a heater makes a bubble of ink that pushes a droplet out.</li><li><b>Piezoelectric</b> – a crystal vibrates when a current is applied, forcing the droplet out.</li></ul></li>
<li>A stepper motor moves the paper up one line at a time and the process repeats.</li></ol>
<p><b>Best for:</b> small numbers of pages and high-quality <b>colour photos</b> at home. Cheap to buy, but ink cartridges run out quickly and are expensive; slower; ink can smudge.</p>
<h4>Laser printer</h4>
<ol><li>The whole page is stored in the printer's <b>memory</b> first.</li>
<li>A rotating printing <b>drum</b> is given a <b>positive charge</b>.</li>
<li>A <b>laser</b> beam scans across the drum, <b>removing the positive charge</b> in certain areas. This leaves negatively charged areas that match the text and images — an <b>electrostatic image</b> of the page.</li>
<li>The drum is coated with positively charged <b>toner</b> (powdered ink). It only sticks to the <b>negatively charged</b> parts of the drum.</li>
<li>A <b>negatively charged sheet of paper</b> is rolled over the drum, so the toner transfers to the paper.</li>
<li>A <b>fuser</b> (heated rollers) melts the toner onto the paper. The drum is discharged ready for the next page.</li></ol>
<p><b>Best for:</b> printing <b>large volumes</b> quickly — offices, schools. Fast, quiet, sharp text, toner lasts a long time, low cost per page. But expensive to buy; colour lasers are costly; toner dust can be a health hazard; uses lots of energy.</p>
<h4>3D printer</h4>
<p>A <b>3D printer</b> makes a solid object from a digital design (made with <b>CAD</b> software or a 3D scan). It is <b>additive manufacturing</b>: the object is built up <b>layer by layer</b>.</p>
<ul><li>The design is sliced into thin horizontal layers by software.</li>
<li>Material such as plastic (from a heated nozzle), powdered metal, resin or even food is deposited or hardened (with a laser or UV light) one layer at a time.</li>
<li>Uses: prototypes, prosthetic limbs, custom parts, dental implants, models, artificial organs (bio-printing).</li>
<li>Advantages: custom one-off items; complex shapes; less waste. Disadvantages: slow; materials can be expensive; risk of printing illegal items or copyright infringement.</li></ul>
<table class="tbl"><tr><th>Scenario</th><th>Best printer</th></tr>
<tr><td>A school printing 500 newsletters</td><td>Laser</td></tr><tr><td>A student printing a few holiday photos at home</td><td>Inkjet</td></tr><tr><td>A hospital making a custom hand prosthetic</td><td>3D printer</td></tr></table>
<div class="keywords"><b>Key words:</b> inkjet, print head, nozzle, thermal bubble, piezoelectric, buffer, laser printer, drum, electrostatic charge, toner, fuser, 3D printer, additive manufacturing, CAD, layer</div>`
},
{
  id: "4.8", title: "Sensors", pages: "111–119",
  objectives: ["4.8a", "4.8b"],
  summary: "Fourteen sensors, what they measure and how to choose the right one.",
  reading: `
<h4>What is a sensor?</h4>
<p>A <b>sensor</b> is an <b>input device</b> that <b>measures a physical property</b> of the environment (e.g. temperature, light, pressure). Most sensors produce an <b>analogue</b> signal, which is converted to digital by an <b>ADC</b> so the microprocessor can process it. Sensors are used in <b>monitoring</b> systems (record and display/alert) and <b>control</b> systems (the computer reacts by using actuators).</p>
<div class="tip"><b>Important:</b> a sensor only <b>sends data</b> — it does not decide anything or switch things on. The <b>microprocessor</b> compares the data with stored values and decides what to do.</div>
<table class="tbl"><tr><th>Sensor</th><th>Measures / detects</th><th>Example uses</th></tr>
<tr><td><b>Acoustic</b></td><td>Sound / noise level</td><td>Detecting breaking glass in burglar alarms; noise monitoring; detecting leaks in pipes</td></tr>
<tr><td><b>Accelerometer</b></td><td>Acceleration, change in speed and direction, tilt</td><td>Phones rotating the screen; airbags in cars; fitness trackers counting steps</td></tr>
<tr><td><b>Flow</b></td><td>Flow rate of a liquid or gas</td><td>Water pipes; fuel flow in engines; respiration in hospitals</td></tr>
<tr><td><b>Gas</b></td><td>Level of a gas, e.g. O₂, CO₂, CO</td><td>Carbon monoxide alarms; greenhouses (CO₂); car engine oxygen sensors</td></tr>
<tr><td><b>Humidity</b></td><td>Amount of water vapour in the air</td><td>Greenhouses; weather stations; air conditioning; museums</td></tr>
<tr><td><b>Infra-red</b></td><td>Infra-red radiation (heat) / a broken IR beam</td><td>Intruder/motion alarms; automatic doors; TV remote receivers</td></tr>
<tr><td><b>Level</b></td><td>How full a tank or container is (liquid level)</td><td>Fuel tanks; washing machines; water tanks; flood warning</td></tr>
<tr><td><b>Light</b></td><td>Light intensity (brightness)</td><td>Automatic street lights; phone screen brightness; greenhouses</td></tr>
<tr><td><b>Magnetic field</b></td><td>Changes in magnetic fields</td><td>Phone compass apps; door/window open detection; anti-lock brakes</td></tr>
<tr><td><b>Moisture</b></td><td>Water content of a material, e.g. soil</td><td>Automatic plant watering; detecting damp in buildings</td></tr>
<tr><td><b>pH</b></td><td>Acidity or alkalinity</td><td>Soil in farms and greenhouses; swimming pools; chemical plants; rivers</td></tr>
<tr><td><b>Pressure</b></td><td>Pressure or force / weight</td><td>Burglar alarm mats; weighing vehicles; car tyre pressure; touch screens</td></tr>
<tr><td><b>Proximity</b></td><td>How close an object is (without touching)</td><td>Car parking sensors; turning off a phone screen near your ear</td></tr>
<tr><td><b>Temperature</b></td><td>Temperature</td><td>Central heating; ovens; greenhouses; fridges; engine overheating</td></tr></table>
<h4>How a sensor-based control system works</h4>
<div class="example"><b>Greenhouse temperature control:</b> a <b>temperature</b> sensor constantly sends readings → the ADC converts them to digital → the microprocessor compares each reading with the stored range (e.g. 20–26 °C) → if it is too low, the microprocessor sends a signal to an actuator to switch on the heater; if too high, an actuator opens the window → this repeats continuously (a feedback loop).</div>
<div class="tip"><b>Choosing a sensor:</b> name the sensor <b>and</b> say what it measures in that situation. "A <b>moisture</b> sensor, to measure how much water is in the soil so the plants are only watered when it is dry."</div>
<div class="keywords"><b>Key words:</b> sensor, physical property, analogue, ADC, microprocessor, monitoring, control, feedback, actuator, stored value, acoustic, accelerometer, flow, gas, humidity, infra-red, level, light, magnetic field, moisture, pH, pressure, proximity, temperature</div>`
},
{
  id: "4.9", title: "Primary storage: RAM and ROM", pages: "120–123, 128–130",
  objectives: ["4.9a", "4.9b"],
  summary: "Primary storage is accessed directly by the CPU. RAM is temporary working memory; ROM holds start-up instructions.",
  reading: `
<h4>Primary storage</h4>
<p><b>Primary storage</b> (main memory) is memory that is <b>directly accessed by the CPU</b>. It includes <b>RAM</b> and <b>ROM</b>.</p>
<table class="tbl"><tr><th></th><th>RAM (random access memory)</th><th>ROM (read only memory)</th></tr>
<tr><td>Volatile?</td><td><b>Volatile</b> — loses its contents when the power is turned off</td><td><b>Non-volatile</b> — keeps its contents without power</td></tr>
<tr><td>Read / write</td><td>Can be <b>read from and written to</b></td><td>Can only be <b>read</b> (contents can't normally be changed)</td></tr>
<tr><td>What it stores</td><td>The <b>data, programs and parts of the operating system currently in use</b></td><td>The <b>start-up instructions</b> (the bootloader / BIOS firmware) needed to boot the computer</td></tr>
<tr><td>Size</td><td>Large (e.g. 8–32 GiB)</td><td>Small</td></tr></table>
<h4>Why does a computer need both?</h4>
<ul><li><b>ROM</b> is needed because when the computer is switched on, RAM is empty. The instructions to start the computer and load the operating system must be stored somewhere that <b>doesn't lose them</b> when the power is off — ROM.</li>
<li><b>RAM</b> is needed because programs and data being used must be stored somewhere the CPU can <b>read and write quickly</b> while they are running. ROM can't be written to.</li></ul>
<p>More RAM means more programs and data can be held at once, so the computer can run more smoothly with many programs open.</p>
<div class="tip"><b>Common mistake:</b> RAM is not where you "save" your work — saving puts it on <b>secondary storage</b>, because RAM is wiped when the power goes off.</div>
<h4>Virtual memory</h4>
<p>When <b>RAM is full</b>, the computer can use part of the <b>secondary storage</b> (hard disk or SSD) as if it were extra RAM. This is <b>virtual memory</b>.</p>
<ol><li>The operating system sets aside an area of the hard disk/SSD (a page file / swap space).</li>
<li>Data is split into blocks called <b>pages</b>.</li>
<li>Pages that are <b>not currently needed</b> are moved from RAM to virtual memory to free up space.</li>
<li>When a page is needed again, it is <b>transferred back into RAM</b> (swapping out another page).</li></ol>
<p><b>Why it's necessary:</b> it stops the computer crashing or refusing to open programs when RAM is full, and lets programs bigger than RAM run.</p>
<p><b>Drawback:</b> secondary storage is much slower than RAM. If the computer keeps swapping pages back and forth, it slows down badly (<b>disk thrashing</b>). Adding more RAM is the real fix.</p>
<div class="keywords"><b>Key words:</b> primary storage, main memory, RAM, ROM, volatile, non-volatile, bootloader, BIOS, firmware, virtual memory, page, swap, disk thrashing</div>`
},
{
  id: "4.10", title: "Secondary storage: magnetic, optical and solid-state", pages: "123–128",
  objectives: ["4.10a", "4.10b"],
  summary: "How hard disks, CDs/DVDs/Blu-ray and SSDs/flash memory store data permanently.",
  reading: `
<h4>Secondary storage</h4>
<p><b>Secondary storage</b> is <b>not directly accessed by the CPU</b>. It is <b>non-volatile</b>, so it is necessary for the <b>more permanent storage</b> of data, files, programs and the operating system. Data must be loaded into RAM before the CPU can use it.</p>
<h4>Magnetic storage — hard disk drive (HDD)</h4>
<ul><li>Data is stored on <b>platters</b> (spinning metal or glass disks) coated with a magnetic material.</li>
<li>Each platter surface is divided into <b>tracks</b> (circles) and <b>sectors</b> (segments of a track).</li>
<li>A <b>read/write head</b> on an actuator arm moves across the spinning platter. Data is written using an <b>electromagnet</b> that magnetises tiny areas in one of two directions (representing 1 and 0); reading detects these magnetic directions.</li>
<li>Pros: large capacity, low cost per GiB, long lifespan. Cons: moving parts — can break if dropped; slower access (latency waiting for the platter to spin); noisy; heavier; uses more power.</li></ul>
<h4>Optical storage — CD, DVD, Blu-ray</h4>
<ul><li>A <b>laser</b> is used to <b>create and read pits and lands</b> on the surface of a spinning disc. The data is stored on a single spiral track.</li>
<li>When reading, the laser light reflects differently from pits and lands; a sensor detects the change and converts it to 1s and 0s.</li>
<li><b>CD</b> (~700 MiB) uses a red laser; <b>DVD</b> (~4.7 GiB) uses a red laser with smaller pits and can be dual-layer; <b>Blu-ray</b> (25–100 GiB) uses a <b>blue-violet laser</b> with a shorter wavelength, so pits are smaller and more data fits.</li>
<li>Pros: cheap, portable, good for distributing films/software. Cons: low capacity; easily scratched; slow; needs an optical drive.</li></ul>
<h4>Solid-state storage — SSD, SD card, USB flash drive</h4>
<ul><li>Uses <b>flash memory</b> with <b>no moving parts</b>. Built using <b>NAND or NOR</b> technology.</li>
<li>Data is stored by <b>transistors</b> that act as <b>control gates</b> and <b>floating gates</b>: electrons are trapped in the floating gate (surrounded by insulation), so the charge — 0 or 1 — stays even without power.</li>
<li>Examples: <b>solid-state drive (SSD)</b>, <b>SD card</b> (cameras, phones), <b>USB flash drive</b>.</li>
<li>Pros: <b>very fast</b> access; no moving parts so <b>more robust</b> (good for laptops and phones); silent; light; low power and little heat. Cons: more expensive per GiB; limited number of write cycles before cells wear out.</li></ul>
<table class="tbl"><tr><th>Scenario</th><th>Best storage</th><th>Why</th></tr>
<tr><td>A server storing huge amounts of backup data cheaply</td><td>Magnetic (HDD)</td><td>Large capacity at low cost per GiB</td></tr>
<tr><td>A thin laptop that is carried every day</td><td>Solid-state (SSD)</td><td>No moving parts, robust, fast, light, low power</td></tr>
<tr><td>Selling a film in shops</td><td>Optical (Blu-ray)</td><td>Cheap to mass-produce, portable</td></tr>
<tr><td>Storing photos in a digital camera</td><td>Solid-state (SD card)</td><td>Small, robust, no moving parts</td></tr></table>
<div class="keywords"><b>Key words:</b> secondary storage, non-volatile, magnetic, hard disk drive, platter, track, sector, read/write head, electromagnet, optical, laser, pits and lands, CD, DVD, Blu-ray, solid-state, flash memory, NAND, NOR, control gate, floating gate, SSD, SD card, USB flash drive</div>`
},
{
  id: "4.11", title: "Cloud storage", pages: "130–132",
  objectives: ["4.11a", "4.11b"],
  summary: "Storing data remotely on servers accessed over the internet — and the pros and cons compared with local storage.",
  reading: `
<h4>What is cloud storage?</h4>
<p><b>Cloud storage</b> means storing data on <b>remote servers</b> owned by a cloud provider, which you access over the <b>internet</b>, instead of storing it <b>locally</b> on your own device. Examples: Google Drive, OneDrive, iCloud, Dropbox.</p>
<ul><li>The "cloud" is not magic — <b>physical servers and storage devices</b> (thousands of hard drives and SSDs in huge <b>data centres</b>) are needed to store the data.</li>
<li>Data is usually <b>copied (mirrored)</b> onto several servers in different places, so it is not lost if one server fails.</li></ul>
<p>There are three types: <b>public</b> cloud (a provider shared by many customers), <b>private</b> cloud (a company's own servers), and <b>hybrid</b> (a mix of both).</p>
<h4>Cloud vs local storage</h4>
<table class="tbl"><tr><th>Advantages of cloud storage</th><th>Disadvantages of cloud storage</th></tr>
<tr><td><ul class="tight"><li>Files can be <b>accessed from anywhere</b>, on any device, at any time, with an internet connection</li><li>Easy to <b>share and collaborate</b> on files with others</li><li>No need to buy or carry your own storage hardware; storage can be increased easily</li><li>The provider handles <b>backups</b> and data recovery — safe if your device is lost or broken</li><li>The provider looks after security updates and maintenance</li></ul></td>
<td><ul class="tight"><li><b>Needs an internet connection</b> — no access offline or with a slow connection</li><li>Uploading/downloading large files can be slow and use a lot of data</li><li><b>Security and privacy</b> risks — data could be hacked, and you rely on the provider's security</li><li>You must <b>pay a subscription</b> for larger amounts of storage</li><li>Loss of control: if the provider has an outage or goes out of business, data may be unavailable or lost</li><li>Data may be stored in another country with different laws</li></ul></td></tr></table>
<div class="tip"><b>Exam tip:</b> always compare with <b>local</b> storage: "With local storage on a hard drive, the files can be opened without an internet connection, but they can only be accessed on that one device."</div>
<div class="keywords"><b>Key words:</b> cloud storage, remote server, data centre, local storage, internet connection, backup, mirror, public cloud, private cloud, hybrid cloud, subscription, security, privacy</div>`
}
  ]
});
