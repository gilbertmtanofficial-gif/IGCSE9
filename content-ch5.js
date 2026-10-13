/* Chapter 5 — Software (Syllabus section 4 · Textbook chapter 4, pages 147–179)
   Chapter 6 — Boolean logic (Syllabus section 10 · Textbook chapter 10, pages 356–386) */
Object.assign(window.OBJECTIVES, {
  "5.1a": "Describe the difference between system software and application software and give examples of each. (Syllabus 4.1.1)",
  "5.1b": "Describe the role and operation of interrupts: how they are generated and handled with an interrupt service routine (ISR). (Syllabus 4.1.4)",
  "5.2a": "Describe the role and basic functions of an operating system. (Syllabus 4.1.2)",
  "5.2b": "Understand how hardware, firmware and an operating system are required to run application software. (Syllabus 4.1.3)",
  "5.3a": "Explain high-level and low-level languages, with the advantages and disadvantages of each. (Syllabus 4.2.1)",
  "5.3b": "Understand that assembly language is a low-level language using mnemonics, translated by an assembler. (Syllabus 4.2.2)",
  "5.3c": "Describe how compilers and interpreters translate code and report errors, and their advantages and disadvantages. (Syllabus 4.2.3–4.2.4)",
  "5.4a": "Explain the role of an IDE in writing program code and its common functions. (Syllabus 4.2.5)",
  "6.1a": "Identify and use the standard symbols for the logic gates NOT, AND, OR, NAND, NOR and XOR. (Syllabus 10.1)",
  "6.1b": "Define the function of each logic gate and the binary output produced from all possible inputs. (Syllabus 10.2)",
  "6.2a": "Complete a truth table from a problem statement, logic expression or logic circuit. (Syllabus 10.3b)",
  "6.2b": "Write a logic expression from a problem statement, logic circuit or truth table. (Syllabus 10.3c)",
  "6.2c": "Use logic gates to create logic circuits from a problem statement, logic expression or truth table (max. three inputs). (Syllabus 10.3a)"
});

window.UNITS.push({
  id: "u5", semester: 2, num: 5,
  title: "Software",
  blurb: "System and application software, the operating system, interrupts, programming languages, translators and IDEs.",
  topics: [
{
  id: "5.1", title: "Types of software and interrupts", pages: "147–155, 161–165",
  objectives: ["5.1a", "5.1b"],
  summary: "System software runs the computer; application software does the user's tasks. Interrupts get the CPU's attention.",
  reading: `
<h4>System software and application software</h4>
<table class="tbl"><tr><th></th><th>System software</th><th>Application software</th></tr>
<tr><td>Purpose</td><td>Provides the <b>services the computer requires</b> — it runs and manages the hardware and lets other software run.</td><td>Provides the <b>services the user requires</b> — it lets the user carry out a task.</td></tr>
<tr><td>Examples</td><td><b>Operating systems</b> (Windows, macOS, Android, iOS, Linux), <b>utility software</b> (antivirus, defragmentation, backup, compression, disk clean-up), device drivers, compilers</td><td>Word processor, spreadsheet, web browser, photo editor, games, video player, database</td></tr></table>
<h4>Utility software</h4>
<p><b>Utilities</b> are system software that help to <b>maintain and protect</b> the computer:</p>
<ul><li><b>Antivirus</b> – scans files for viruses and quarantines or deletes them.</li>
<li><b>Defragmentation</b> – rearranges file blocks on a hard disk so each file is stored together, making access faster (not needed for SSDs).</li>
<li><b>Backup</b> – copies files so they can be restored if lost.</li>
<li><b>Compression</b> – makes files smaller (e.g. ZIP).</li>
<li><b>Disk clean-up / formatting</b>, <b>screensavers</b>, <b>security</b> (firewalls) and <b>device drivers</b>.</li></ul>

<h4>Interrupts</h4>
<p>An <b>interrupt</b> is a <b>signal</b> sent to the CPU from a device or a program saying that something <b>needs attention</b>. Interrupts let the computer respond quickly to events and allow multitasking.</p>
<table class="tbl"><tr><th>Hardware interrupts</th><th>Software interrupts</th></tr>
<tr><td>Pressing a key on the keyboard · moving or clicking the mouse · printer out of paper or ink · a device being plugged in · a power failure</td><td>Division by zero · two processes trying to access the same memory location · a program asking for input/output · an application crashing</td></tr></table>
<h4>How an interrupt is handled</h4>
<ol><li>A device or program <b>generates</b> an interrupt signal, which is sent to the CPU (along the control bus). Each interrupt has a <b>priority</b>.</li>
<li>At the end of each FDE cycle the CPU <b>checks for interrupts</b>.</li>
<li>If there is an interrupt with a <b>higher priority</b> than the current task, the CPU <b>saves the state</b> of the current task (the contents of its registers) — usually on a stack.</li>
<li>The CPU runs the <b>interrupt service routine (ISR)</b> — the code that handles that interrupt (e.g. read the key that was pressed, show an error message).</li>
<li>When the ISR is finished, the saved state is <b>restored</b> and the original task <b>continues</b> from where it stopped (unless the interrupt caused it to end, e.g. a crash).</li></ol>
<div class="tip"><b>Result of an interrupt:</b> the current task is paused and the interrupt is dealt with; then either the task carries on, or (for some software interrupts such as division by zero) the program shows an error or is stopped.</div>
<div class="keywords"><b>Key words:</b> system software, application software, operating system, utility software, antivirus, defragmentation, backup, device driver, interrupt, hardware interrupt, software interrupt, priority, interrupt service routine (ISR), save state, restore</div>`
},
{
  id: "5.2", title: "Hardware, firmware and the operating system", pages: "155–161",
  objectives: ["5.2a", "5.2b"],
  summary: "What the operating system does, and how hardware, firmware and the OS work together so apps can run.",
  reading: `
<h4>The operating system (OS)</h4>
<p>The <b>operating system</b> is the system software that manages the computer's hardware and software and provides an interface for the user. Its main functions are:</p>
<table class="tbl"><tr><th>Function</th><th>What it means</th></tr>
<tr><td><b>Managing files</b></td><td>Creating, saving, opening, copying, moving, renaming and deleting files and folders; organising storage.</td></tr>
<tr><td><b>Handling interrupts</b></td><td>Responding to interrupt signals and running the correct interrupt service routine.</td></tr>
<tr><td><b>Providing an interface</b></td><td>A way for the user to communicate with the computer: a <b>GUI</b> (windows, icons, menus, pointer) or a <b>CLI</b> (typed commands).</td></tr>
<tr><td><b>Managing peripherals and drivers</b></td><td>Communicating with input/output devices using <b>device drivers</b> — software that translates the OS's commands for a specific device; managing print queues (buffers).</td></tr>
<tr><td><b>Managing memory</b></td><td>Deciding which programs and data are held in RAM, allocating memory to each process so they don't overwrite each other, and using virtual memory when RAM is full.</td></tr>
<tr><td><b>Managing multitasking</b></td><td>Allowing several programs to run "at the same time" by sharing CPU time between processes (scheduling) and handling their priorities.</td></tr>
<tr><td><b>Providing a platform for running applications</b></td><td>Applications use the OS's services (to save files, print, access memory) instead of controlling the hardware directly.</td></tr>
<tr><td><b>Providing system security</b></td><td>Firewalls, antivirus integration, encryption, security updates, privacy settings.</td></tr>
<tr><td><b>Managing user accounts</b></td><td>Different users with their own logins, passwords, files and access rights.</td></tr></table>
<h4>GUI vs CLI</h4>
<p>A <b>GUI</b> (graphical user interface) is easy to learn and needs no commands to be memorised, but uses more memory and processing power. A <b>CLI</b> (command line interface) needs commands to be learned and typed exactly, but gives the user more direct control and uses less memory.</p>

<h4>How an application gets to run</h4>
<p>Software is layered — each layer runs on the one below it:</p>
<svg viewBox="0 0 520 210" class="diagram" role="img" aria-label="Layers: applications run on the operating system, which runs on firmware, which runs on hardware">
${[["Application software","e.g. web browser, game",14,"#fff8e8"],["Operating system","manages hardware & provides services",62,"#eaf0fa"],["Firmware (bootloader / BIOS)","stored in ROM — starts the computer",110,"#fdf4dc"],["Hardware","CPU, RAM, storage, devices",158,"#e2f6ec"]].map(([t,d,y,c])=>`<rect x="40" y="${y}" width="440" height="42" rx="8" fill="${c}" stroke="#16213a" stroke-width="2"/><text x="60" y="${y+20}" font-size="14" font-weight="800" fill="#16213a" font-family="Nunito">${t}</text><text x="60" y="${y+35}" font-size="11.5" fill="#4c5873" font-family="Nunito">${d}</text>`).join("")}
</svg>
<ul><li><b>Applications run on the operating system</b> — they ask the OS to do things such as saving a file or printing.</li>
<li><b>The operating system runs on the firmware</b>.</li>
<li><b>The bootloader (firmware) runs on the hardware</b>.</li></ul>
<p><b>Firmware</b> is software that is permanently stored in <b>ROM</b> (or flash memory) and provides low-level control of the hardware. When the computer is switched on, the <b>bootloader</b> in ROM runs first: it checks the hardware (the power-on self-test) and then <b>loads the operating system</b> from secondary storage into RAM. Then the OS can run applications.</p>
<div class="keywords"><b>Key words:</b> operating system, file management, interrupt handling, interface, GUI, CLI, peripheral, device driver, memory management, multitasking, platform, security, user accounts, firmware, bootloader, BIOS, ROM</div>`
},
{
  id: "5.3", title: "Types of programming language and translators", pages: "165–170",
  objectives: ["5.3a", "5.3b", "5.3c"],
  summary: "High-level vs low-level languages, assembly language and assemblers, and compilers vs interpreters.",
  reading: `
<h4>High-level and low-level languages</h4>
<table class="tbl"><tr><th></th><th>High-level language</th><th>Low-level language</th></tr>
<tr><td>What it is</td><td>Close to <b>human language</b>, e.g. Python, Java, Visual Basic, C++</td><td>Close to <b>machine code</b>: <b>machine code</b> itself (binary) and <b>assembly language</b></td></tr>
<tr><td>Ease of reading and writing</td><td><b>Easy</b> to read, write and understand</td><td><b>Hard</b> to read and write</td></tr>
<tr><td>Debugging</td><td><b>Easier</b> to find and fix errors</td><td><b>Harder</b> to debug</td></tr>
<tr><td>Machine independence</td><td><b>Machine independent</b> (portable) — runs on different types of computer once translated</td><td><b>Machine dependent</b> — written for one type of CPU / instruction set</td></tr>
<tr><td>Hardware control</td><td>Can't directly manipulate the hardware</td><td><b>Direct manipulation of hardware</b> (e.g. specific memory locations and registers)</td></tr>
<tr><td>Other</td><td>One statement = many machine-code instructions; needs a compiler or interpreter</td><td>Can be faster and use less memory; good for device drivers and embedded systems</td></tr></table>
<h4>Assembly language</h4>
<p><b>Assembly language</b> is a <b>low-level language</b> that uses <b>mnemonics</b> — short codes that are easier to remember than binary, such as <code>LDA</code> (load), <code>ADD</code>, <code>STO</code> (store), <code>JMP</code> (jump). Each mnemonic usually matches one machine-code instruction. An <b>assembler</b> is needed to translate an assembly language program into <b>machine code</b>.</p>
<pre class="code">LDA 20     ; load the number at address 20 into the accumulator
ADD 21     ; add the number at address 21
STO 22     ; store the answer at address 22</pre>

<h4>Translators: compilers and interpreters</h4>
<p>A computer can only run <b>machine code</b>, so high-level code must be translated.</p>
<table class="tbl"><tr><th></th><th>Compiler</th><th>Interpreter</th></tr>
<tr><td>How it translates</td><td>Translates the <b>whole program at once</b>, before it is run, producing an <b>executable file</b> (machine code)</td><td>Translates and executes the code <b>one line at a time</b></td></tr>
<tr><td>Errors</td><td>Gives an <b>error report for the whole code</b> after translating; no executable is produced if there are errors</td><td><b>Stops execution when an error is found</b> and reports it; the line can be fixed and run continued</td></tr>
<tr><td>Running the program again</td><td>Executable runs <b>fast</b> without re-translating; the source code isn't needed (and isn't shared)</td><td>Must be translated <b>every time</b> it runs — slower; the interpreter and source code are needed</td></tr>
<tr><td>Best used for</td><td>Translating the <b>final</b> program to give to users</td><td><b>Developing</b> and debugging a program</td></tr></table>
<div class="tip"><b>Summary:</b> an interpreter is mostly used <b>when developing</b> a program (easy to debug line by line); a compiler is used to translate the <b>final</b> program (fast, no source code shared).</div>
<div class="keywords"><b>Key words:</b> high-level language, low-level language, machine code, assembly language, mnemonic, assembler, machine independent, portable, translator, compiler, interpreter, executable file, error report, source code</div>`
},
{
  id: "5.4", title: "The role of an IDE in writing program code", pages: "170–172",
  objectives: ["5.4a"],
  summary: "An integrated development environment brings together the tools a programmer needs.",
  reading: `
<h4>What is an IDE?</h4>
<p>An <b>integrated development environment (IDE)</b> is software that provides all the <b>tools a programmer needs to write, test and debug code</b> in one place. Examples: IDLE and Thonny (Python), Visual Studio, Eclipse, PyCharm, VS Code.</p>
<h4>Common functions of an IDE</h4>
<table class="tbl"><tr><th>Function</th><th>What it does</th></tr>
<tr><td><b>Code editor</b></td><td>A text editor where the program code is written and edited, often with line numbers and <b>syntax highlighting</b> (keywords in colour).</td></tr>
<tr><td><b>Run-time environment</b></td><td>Lets the program be <b>run (executed) and tested</b> inside the IDE, showing the output, and lets the programmer watch it as it runs.</td></tr>
<tr><td><b>Translator</b></td><td>A built-in <b>compiler and/or interpreter</b> so the code can be translated into machine code.</td></tr>
<tr><td><b>Error diagnostics</b></td><td>Identifies errors, shows <b>where</b> they are (e.g. line number, underlining) and explains them; debugging tools such as <b>breakpoints</b>, <b>stepping</b> through code one line at a time and <b>watching variables</b>.</td></tr>
<tr><td><b>Auto-completion</b></td><td>Suggests how to finish a keyword, variable or function name as you type, saving time and reducing spelling errors.</td></tr>
<tr><td><b>Auto-correction</b></td><td>Automatically corrects common mistakes such as misspelt keywords or missing brackets.</td></tr>
<tr><td><b>Prettyprint</b></td><td>Formats the code to make it easier to read: <b>colour-coding</b> keywords, comments and strings, and automatic <b>indentation</b>.</td></tr></table>
<div class="example"><b>Why use an IDE?</b> Programmers can write code faster and with fewer mistakes, find and fix bugs more easily, and test programs without leaving the editor — everything is integrated in one place.</div>
<div class="tip"><b>Exam tip:</b> if asked to "describe two functions of an IDE", name the function <b>and</b> say how it helps: "Auto-completion suggests keywords as the programmer types, which speeds up coding and reduces spelling errors."</div>
<div class="keywords"><b>Key words:</b> integrated development environment (IDE), code editor, syntax highlighting, run-time environment, translator, error diagnostics, breakpoint, stepping, auto-completion, auto-correction, prettyprint, indentation</div>`
}
  ]
});

window.UNITS.push({
  id: "u6", semester: 2, num: 6,
  title: "Boolean logic",
  blurb: "The six logic gates, truth tables, logic circuits and logic expressions.",
  topics: [
{
  id: "6.1", title: "Boolean logic: the six logic gates", pages: "356–360",
  objectives: ["6.1a", "6.1b"],
  summary: "NOT, AND, OR, NAND, NOR and XOR — their symbols, what they do and their truth tables.",
  reading: `
<h4>Logic gates</h4>
<p>A <b>logic gate</b> is an electronic component that takes one or more <b>binary inputs</b> (0 or 1) and produces <b>one binary output</b>. Computers use millions of them to process data. <b>NOT</b> has a <b>single input</b>; all the other gates have <b>two inputs</b>.</p>
<p>A <b>truth table</b> shows the output for <b>every possible combination</b> of inputs. With 2 inputs there are 4 rows; with 3 inputs there are 8 rows.</p>
<div class="gate-grid">
${[["NOT","The output is the opposite (inverse) of the input.","X = NOT A",{op:"NOT",a:{in:"A"}}],
["AND","The output is 1 only if <b>both</b> inputs are 1.","X = A AND B",{op:"AND",a:{in:"A"},b:{in:"B"}}],
["OR","The output is 1 if <b>either or both</b> inputs are 1.","X = A OR B",{op:"OR",a:{in:"A"},b:{in:"B"}}],
["NAND","NOT AND: the output is 0 only if both inputs are 1.","X = A NAND B",{op:"NAND",a:{in:"A"},b:{in:"B"}}],
["NOR","NOT OR: the output is 1 only if both inputs are 0.","X = A NOR B",{op:"NOR",a:{in:"A"},b:{in:"B"}}],
["XOR","Exclusive OR (EOR): the output is 1 if the inputs are <b>different</b>.","X = A XOR B",{op:"XOR",a:{in:"A"},b:{in:"B"}}]
].map(([n,d,e,t])=>`<div class="gate-card"><div class="gate-name">${n}</div>${window.LOGIC.gateSVG(n,{caption:false,w:170})}<p>${d}</p><code>${e}</code>${window.LOGIC.truthTableHTML(t)}</div>`).join("")}
</div>
<div class="tip"><b>Shortcuts:</b> NAND is the opposite of AND, NOR is the opposite of OR — look for the little circle (the "NOT bubble") on the output. XOR has an extra curved line at the back and means "one or the other, but not both".</div>
<h4>Logic in everyday words</h4>
<ul><li>"The alarm sounds if the door is open <b>AND</b> the system is switched on." → AND</li>
<li>"The light comes on if switch A <b>OR</b> switch B is pressed." → OR</li>
<li>"The fan is on if the window is <b>NOT</b> open." → NOT</li>
<li>"The bell rings if <b>exactly one</b> of the two buttons is pressed." → XOR</li></ul>
<div class="keywords"><b>Key words:</b> logic gate, binary input, output, NOT, AND, OR, NAND, NOR, XOR (EOR), truth table, inverse</div>`
},
{
  id: "6.2", title: "Truth tables, logic circuits and logic expressions", pages: "360–386",
  objectives: ["6.2a", "6.2b", "6.2c"],
  summary: "Move between problem statements, logic expressions, logic circuits and truth tables (up to three inputs).",
  reading: `
<p>In the exam you must be able to move between <b>four</b> ways of describing the same logic: a <b>problem statement</b>, a <b>logic expression</b>, a <b>logic circuit</b> and a <b>truth table</b>.</p>
<h4>1. Truth table from a logic expression</h4>
<p>Example: <code>X = (A AND B) OR NOT C</code></p>
<ol><li>List every input combination in binary order: 000, 001, 010 … 111 (8 rows for 3 inputs).</li>
<li>Add <b>working columns</b> for each part: A AND B, then NOT C.</li>
<li>Combine the working columns to get X.</li></ol>
<table class="tbl center tt"><tr><th>A</th><th>B</th><th>C</th><th>A AND B</th><th>NOT C</th><th>X</th></tr>
${[0,1,2,3,4,5,6,7].map(m=>{const a=m>>2&1,b=m>>1&1,c=m&1,p=a&b,q=c?0:1;return `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>${p}</td><td>${q}</td><td><b>${p|q}</b></td></tr>`}).join("")}</table>

<h4>2. Logic circuit from a logic expression</h4>
<p>Draw a gate for each operator. Work from the <b>inputs on the left</b> towards the <b>output on the right</b>. Brackets show which gates come first. Circuits must be drawn <b>without simplifying</b>.</p>
${window.LOGIC.circuitSVG({op:"OR",a:{op:"AND",a:{in:"A"},b:{in:"B"}},b:{op:"NOT",a:{in:"C"}}})}

<h4>3. Logic expression from a logic circuit</h4>
<p>Start at the <b>inputs</b>. Write what comes out of each gate, then feed it into the next gate, using brackets. For the circuit below:</p>
${window.LOGIC.circuitSVG({op:"NAND",a:{op:"XOR",a:{in:"A"},b:{in:"B"}},b:{op:"NOR",a:{in:"B"},b:{in:"C"}}})}
<p>X = <code>(A XOR B) NAND (B NOR C)</code></p>

<h4>4. From a problem statement</h4>
<div class="example"><b>Problem:</b> A water pump (X) is switched on if the tank is <b>not</b> full (T = 0) <b>and</b> either the timer is on (M = 1) <b>or</b> the manual button is pressed (B = 1).<br>
<b>Expression:</b> <code>X = NOT T AND (M OR B)</code></div>
<p>Tips: words like "and", "or", "not" usually map straight onto gates. Write a condition for each input as 1 or 0 ("tank is full" = 1, so "not full" = NOT T).</p>

<h4>5. Logic expression from a truth table</h4>
<p>Find every row where the output is <b>1</b>. For each one, write the inputs joined with AND (use NOT for any input that is 0). Then join the rows with OR.</p>
<table class="tbl center tt"><tr><th>A</th><th>B</th><th>X</th></tr><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td><b>1</b></td></tr><tr><td>1</td><td>0</td><td><b>1</b></td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table>
<p>X = <code>(NOT A AND B) OR (A AND NOT B)</code> — which is the same as <b>A XOR B</b>.</p>
<div class="tip"><b>Exam tips:</b> maximum of three inputs and one output · always list inputs in the standard binary order · use working columns · check each row twice · don't simplify unless asked.</div>
<div class="keywords"><b>Key words:</b> logic expression, logic circuit, truth table, problem statement, working column, input combination, output, brackets, simplify</div>`
}
  ]
});
