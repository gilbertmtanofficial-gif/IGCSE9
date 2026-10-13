/* Chapter 3 — Algorithm design and problem-solving (Syllabus section 7 · Textbook chapter 7, pages 258–298) */
Object.assign(window.OBJECTIVES, {
  "3.1a": "Understand the program development life cycle: analysis, design, coding and testing, and the tasks in each stage. (Syllabus 7.1)",
  "3.1b": "Understand that systems are made of sub-systems, decompose a problem into inputs, processes, outputs and storage, and use structure diagrams. (Syllabus 7.2)",
  "3.2a": "Use flowcharts, with the standard symbols, to design and construct a solution to a problem. (Syllabus 7.2c, 7.9)",
  "3.2b": "Explain the purpose of a given algorithm shown as a flowchart and describe the processes involved. (Syllabus 7.3)",
  "3.3a": "Use pseudocode — assignment, input/output, selection (IF, CASE) and iteration (FOR, WHILE, REPEAT) with operators — to design solutions. (Syllabus 7.2c, 7.9)",
  "3.3b": "Explain the purpose of a given pseudocode algorithm and describe the processes involved. (Syllabus 7.3)",
  "3.4a": "Understand and use totalling and counting. (Syllabus 7.4)",
  "3.4b": "Understand and use finding the maximum, minimum and average values. (Syllabus 7.4)",
  "3.4c": "Understand and use a linear search. (Syllabus 7.4)",
  "3.4d": "Understand and use a bubble sort. (Syllabus 7.4)",
  "3.5a": "Understand the need for validation checks: range, length, type, presence, format and check digit. (Syllabus 7.5a)",
  "3.5b": "Understand the need for verification checks: visual check and double entry check. (Syllabus 7.5b)",
  "3.6a": "Suggest and apply suitable test data: normal, abnormal, extreme and boundary. (Syllabus 7.6)",
  "3.6b": "Complete a trace table to document a dry run of an algorithm (variables, outputs, user prompts). (Syllabus 7.7)",
  "3.7a": "Identify errors in given algorithms and suggest ways of correcting them. (Syllabus 7.8)",
  "3.7b": "Write and amend algorithms for given problems using pseudocode and flowcharts, with precision. (Syllabus 7.9)"
});

window.UNITS.push({
  id: "u3", semester: 1, num: 3,
  title: "Algorithm design & problem-solving",
  blurb: "The development life cycle, flowcharts, pseudocode, standard algorithms, validation, testing and trace tables.",
  topics: [
{
  id: "3.1", title: "The program development life cycle", pages: "258–271",
  objectives: ["3.1a", "3.1b"],
  summary: "Analysis, design, coding and testing — and breaking a big problem into smaller sub-systems.",
  reading: `
<h4>The four stages</h4>
<p>The <b>program development life cycle (PDLC)</b> is the sequence of stages followed when creating a program.</p>
<table class="tbl"><tr><th>Stage</th><th>What happens</th></tr>
<tr><td><b>1. Analysis</b></td><td>Understand and <b>identify the problem</b> and the <b>requirements</b> (what the program must do). Use <b>abstraction</b> — keep the important details, remove the unnecessary ones — and <b>decomposition</b> — break the problem into smaller parts.</td></tr>
<tr><td><b>2. Design</b></td><td>Plan <i>how</i> the program will work using <b>decomposition</b>, <b>structure diagrams</b>, <b>flowcharts</b> and <b>pseudocode</b>.</td></tr>
<tr><td><b>3. Coding</b></td><td>Write the <b>program code</b> in a programming language, with <b>iterative testing</b> — testing each part (module) as it is written, fixing it and testing again.</td></tr>
<tr><td><b>4. Testing</b></td><td>Test the complete program with <b>test data</b> to check it works as required and has no errors.</td></tr></table>
<div class="tip"><b>Abstraction example:</b> a map of the metro shows stations and lines but not streets or buildings — only what the traveller needs.</div>

<h4>Systems and sub-systems</h4>
<p>Every computer system is made up of <b>sub-systems</b>, which are made up of further sub-systems. For example, an online shop has sub-systems for searching, the basket, payment and delivery; payment has its own sub-systems for card checking and receipts.</p>

<h4>Decomposing a problem</h4>
<p>Any problem can be broken down into its component parts:</p>
<table class="tbl"><tr><th>Part</th><th>Example: a program that works out a student's average mark</th></tr>
<tr><td><b>Inputs</b> – data going in</td><td>the student's name and five test marks</td></tr>
<tr><td><b>Processes</b> – what is done to the data</td><td>add up the marks, divide by 5, decide on a grade</td></tr>
<tr><td><b>Outputs</b> – results produced</td><td>the average mark and the grade</td></tr>
<tr><td><b>Storage</b> – data that must be kept</td><td>marks saved in a file for next time</td></tr></table>

<h4>Structure diagrams</h4>
<p>A <b>structure diagram</b> shows a system broken down into sub-systems as a <b>hierarchy</b>, from the top level downwards. Each box can be split further.</p>
<svg viewBox="0 0 560 170" class="diagram" role="img" aria-label="Structure diagram for an alarm app">
<rect x="200" y="8" width="160" height="40" rx="6" fill="#1b3a6b"/><text x="280" y="33" fill="#fff" font-size="14" font-weight="700" text-anchor="middle" font-family="Nunito">Alarm app</text>
<line x1="280" y1="48" x2="280" y2="66" stroke="#16213a" stroke-width="2"/><line x1="90" y1="66" x2="470" y2="66" stroke="#16213a" stroke-width="2"/>
${[[90,"Set alarm"],[280,"Check time"],[470,"Sound alarm"]].map(([x,t])=>`<line x1="${x}" y1="66" x2="${x}" y2="84" stroke="#16213a" stroke-width="2"/><rect x="${x-75}" y="84" width="150" height="36" rx="6" fill="#fff8e8" stroke="#16213a" stroke-width="2"/><text x="${x}" y="107" font-size="13" font-weight="700" text-anchor="middle" fill="#16213a" font-family="Nunito">${t}</text>`).join("")}
<line x1="470" y1="120" x2="470" y2="132" stroke="#16213a" stroke-width="2"/><line x1="410" y1="132" x2="530" y2="132" stroke="#16213a" stroke-width="2"/>
${[[410,"Play tone"],[530,"Snooze"]].map(([x,t])=>`<line x1="${x}" y1="132" x2="${x}" y2="140" stroke="#16213a" stroke-width="2"/><rect x="${x-52}" y="140" width="104" height="26" rx="5" fill="#eaf0fa" stroke="#16213a" stroke-width="1.5"/><text x="${x}" y="158" font-size="12" font-weight="700" text-anchor="middle" fill="#16213a" font-family="Nunito">${t}</text>`).join("")}
</svg>
<div class="tip">Decomposition makes a big problem easier to solve: each small part can be designed, coded and tested separately, and different programmers can work on different parts at the same time.</div>
<div class="keywords"><b>Key words:</b> program development life cycle, analysis, design, coding, testing, iterative testing, requirements, abstraction, decomposition, sub-system, structure diagram, inputs, processes, outputs, storage</div>`
},
{
  id: "3.2", title: "Algorithms and flowcharts", pages: "261–271",
  objectives: ["3.2a", "3.2b"],
  summary: "An algorithm is a set of steps. Flowcharts show those steps with standard symbols.",
  reading: `
<h4>What is an algorithm?</h4>
<p>An <b>algorithm</b> is a <b>step-by-step set of instructions</b> to solve a problem or complete a task. Algorithms can be shown as <b>flowcharts</b> (diagrams) or <b>pseudocode</b> (structured text) before they are turned into program code.</p>
<p>Every algorithm is built from three <b>constructs</b>:</p>
<ul><li><b>Sequence</b> – steps carried out one after another, in order.</li>
<li><b>Selection</b> – a decision: different steps happen depending on a condition (Yes/No).</li>
<li><b>Iteration</b> – steps are repeated (a loop).</li></ul>

<h4>Flowchart symbols</h4>
${window.FLOW.legend()}

<h4>Example 1 – selection</h4>
<p>This flowchart asks for a test mark and decides whether the student passed.</p>
${window.FLOW.selection({ input: "Mark", cond: "Mark >= 50?", yes: 'OUTPUT "Pass"', no: 'OUTPUT "Fail"' })}

<h4>Example 2 – iteration (a loop)</h4>
<p>This flowchart inputs 5 numbers and outputs their total. The arrow going <b>back up</b> to the decision box makes the loop.</p>
${window.FLOW.loop({ init: "Total ← 0, Count ← 0", cond: "Count < 5?", body: [["io", "INPUT Number"], ["proc", "Total ← Total + Number"], ["proc", "Count ← Count + 1"]], out: "OUTPUT Total" })}

<h4>Explaining the purpose of an algorithm</h4>
<p>In the exam you may be given a flowchart and asked to <b>state its purpose</b> and <b>describe the processes</b>. Work through it with some sample values:</p>
<ol><li>Look at the <b>inputs</b> — what data goes in?</li><li>Follow every arrow and decision with your sample values.</li><li>Look at the <b>outputs</b> — what is produced?</li><li>Write one clear sentence: "The algorithm inputs five numbers and outputs their total."</li></ol>
<div class="tip"><b>Exam rules for flowcharts:</b> every flowchart has one START and at least one STOP; a decision box always has exactly two exits labelled <b>Yes</b> and <b>No</b>; use flow lines with arrows; use precise conditions like <code>Mark >= 50</code>, not "mark is big enough".</div>
<div class="keywords"><b>Key words:</b> algorithm, flowchart, terminator, input/output, process, decision, subroutine, flow line, sequence, selection, iteration, purpose</div>`
},
{
  id: "3.3", title: "Algorithms and pseudocode", pages: "261–271",
  objectives: ["3.3a", "3.3b"],
  summary: "Cambridge-style pseudocode: assignment, input/output, IF, CASE, FOR, WHILE and REPEAT.",
  reading: `
<p><b>Pseudocode</b> is a way of writing an algorithm in structured English that looks like code but does not follow the strict rules of one programming language. Cambridge uses the style below — keywords in CAPITALS, identifiers in MixedCase.</p>
<h4>Variables, constants and assignment</h4>
<pre class="code">DECLARE Total : INTEGER
DECLARE Name : STRING
CONSTANT VAT ← 0.2
Total ← 0                     // ← means "is assigned the value"
Total ← Total + 5</pre>
<p>Data types: INTEGER, REAL, CHAR, STRING, BOOLEAN.</p>
<h4>Input and output</h4>
<pre class="code">OUTPUT "Enter your age"
INPUT Age
OUTPUT "You are ", Age, " years old"</pre>
<h4>Operators</h4>
<table class="tbl"><tr><th>Arithmetic</th><th>Relational (comparison)</th><th>Logical</th></tr>
<tr><td>+ − * /<br>^ (power)<br>MOD (remainder): 17 MOD 5 = 2<br>DIV (whole-number division): 17 DIV 5 = 3</td><td>= &nbsp; &lt;&gt; (not equal)<br>&lt; &nbsp; &lt;=<br>&gt; &nbsp; &gt;=</td><td>AND<br>OR<br>NOT</td></tr></table>
<h4>Selection: IF and CASE</h4>
<pre class="code">IF Mark >= 70
  THEN
    OUTPUT "Merit"
  ELSE
    IF Mark >= 50
      THEN
        OUTPUT "Pass"
      ELSE
        OUTPUT "Fail"
    ENDIF
ENDIF

CASE OF Choice
  1 : OUTPUT "Start game"
  2 : OUTPUT "Load game"
  3 : OUTPUT "Quit"
  OTHERWISE OUTPUT "Invalid choice"
ENDCASE</pre>
<h4>Iteration: three types of loop</h4>
<table class="tbl"><tr><th>Loop</th><th>When to use it</th><th>Example</th></tr>
<tr><td><b>FOR … TO … NEXT</b><br>count-controlled</td><td>You know <b>how many times</b> to repeat.</td><td><pre class="code mini">FOR Count ← 1 TO 10
  OUTPUT Count * 2
NEXT Count</pre></td></tr>
<tr><td><b>WHILE … DO … ENDWHILE</b><br>pre-condition</td><td>Condition checked <b>before</b> each loop, so the loop may run <b>zero</b> times.</td><td><pre class="code mini">INPUT Number
WHILE Number <> 0 DO
  Total ← Total + Number
  INPUT Number
ENDWHILE</pre></td></tr>
<tr><td><b>REPEAT … UNTIL</b><br>post-condition</td><td>Condition checked <b>after</b> each loop, so it always runs <b>at least once</b>.</td><td><pre class="code mini">REPEAT
  OUTPUT "Enter PIN"
  INPUT PIN
UNTIL PIN = 1234</pre></td></tr></table>
<p>A FOR loop can count in steps: <code>FOR i ← 10 TO 0 STEP -2</code> gives 10, 8, 6, 4, 2, 0.</p>
<h4>Useful string and library routines</h4>
<pre class="code">LENGTH("Hello")          → 5
UCASE("abc")             → "ABC"
LCASE("ABC")             → "abc"
SUBSTRING("Computer", 1, 3)  → "Com"   (start position, number of characters)
ROUND(3.14159, 2)        → 3.14
RANDOM()                 → a random number between 0 and 1</pre>
<h4>Explaining the purpose of pseudocode</h4>
<pre class="code">Count ← 0
FOR Index ← 1 TO 30
  INPUT Height
  IF Height > 1.5
    THEN
      Count ← Count + 1
  ENDIF
NEXT Index
OUTPUT Count</pre>
<p><b>Purpose:</b> it inputs 30 heights and <b>counts</b> how many are over 1.5 m, then outputs that count.</p>
<div class="keywords"><b>Key words:</b> pseudocode, variable, constant, assignment (←), INPUT, OUTPUT, IF, CASE, FOR, WHILE, REPEAT, count-controlled, pre-condition, post-condition, MOD, DIV, AND, OR, NOT</div>`
},
{
  id: "3.4", title: "Standard algorithms", pages: "272–276",
  objectives: ["3.4a", "3.4b", "3.4c", "3.4d"],
  summary: "Totalling, counting, maximum, minimum, average, linear search and bubble sort.",
  reading: `
<p>Some algorithms appear again and again. You must be able to <b>write</b>, <b>trace</b> and <b>explain</b> each of these. The examples use an array <code>Marks[1:10]</code> of 10 marks.</p>
<h4>Totalling and counting</h4>
<p><b>Totalling</b> keeps a running total by adding each value. <b>Counting</b> adds 1 each time something happens. Both variables must start at <b>0</b>.</p>
<pre class="code">Total ← 0
PassCount ← 0
FOR Index ← 1 TO 10
  Total ← Total + Marks[Index]          // totalling
  IF Marks[Index] >= 50
    THEN
      PassCount ← PassCount + 1         // counting
  ENDIF
NEXT Index</pre>
<h4>Maximum, minimum and average</h4>
<pre class="code">Maximum ← Marks[1]          // start with the first value (or a very small number)
Minimum ← Marks[1]          // start with the first value (or a very large number)
Total ← 0
FOR Index ← 1 TO 10
  IF Marks[Index] > Maximum THEN Maximum ← Marks[Index] ENDIF
  IF Marks[Index] < Minimum THEN Minimum ← Marks[Index] ENDIF
  Total ← Total + Marks[Index]
NEXT Index
Average ← Total / 10</pre>
<div class="tip">If you start Maximum at 0 and every value is negative, the answer will be wrong — that's why starting with the first item is safest.</div>
<h4>Linear search</h4>
<p>A <b>linear search</b> checks each item <b>one at a time, in order</b>, until the item is found or the end of the list is reached. It works on <b>unsorted</b> data.</p>
<pre class="code">INPUT SearchName
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 10 DO
  IF Names[Index] = SearchName
    THEN
      Found ← TRUE
    ELSE
      Index ← Index + 1
  ENDIF
ENDWHILE
IF Found = TRUE
  THEN OUTPUT SearchName, " found at position ", Index
  ELSE OUTPUT SearchName, " not found"
ENDIF</pre>
<h4>Bubble sort</h4>
<p>A <b>bubble sort</b> puts a list in order. It <b>compares each pair of neighbouring items</b> and <b>swaps</b> them if they are in the wrong order. One run through the list is a <b>pass</b>. After each pass the largest remaining value has "bubbled" to the end. It keeps going until a pass makes <b>no swaps</b>.</p>
<pre class="code">Top ← 9                                 // last pair to check
REPEAT
  Swap ← FALSE
  FOR Index ← 1 TO Top
    IF List[Index] > List[Index + 1]
      THEN
        Temp ← List[Index]              // swap using a temporary variable
        List[Index] ← List[Index + 1]
        List[Index + 1] ← Temp
        Swap ← TRUE
    ENDIF
  NEXT Index
  Top ← Top - 1
UNTIL Swap = FALSE OR Top = 0</pre>
<div class="example"><b>One pass on [5, 2, 8, 1, 4]:</b> 5>2 swap → [2,5,8,1,4] · 5<8 no · 8>1 swap → [2,5,1,8,4] · 8>4 swap → [2,5,1,4,<b>8</b>]. The 8 is now in its final place.</div>
<div class="keywords"><b>Key words:</b> totalling, counting, running total, maximum, minimum, average, linear search, bubble sort, pass, swap, temporary variable, array, index</div>`
},
{
  id: "3.5", title: "Validation and verification", pages: "276–281",
  objectives: ["3.5a", "3.5b"],
  summary: "Validation checks data is sensible; verification checks it was copied or typed correctly.",
  reading: `
<h4>Validation</h4>
<p><b>Validation</b> is an <b>automatic check</b> by the computer that input data is <b>sensible and reasonable</b> before it is accepted. It <b>cannot</b> check that data is <i>correct</i> — a valid date of birth might still be the wrong one!</p>
<table class="tbl"><tr><th>Check</th><th>What it checks</th><th>Example</th></tr>
<tr><td><b>Range check</b></td><td>The value is between a lower and an upper limit.</td><td>A mark is from 0 to 100</td></tr>
<tr><td><b>Length check</b></td><td>The data has an exact number of characters, or is within a minimum/maximum length.</td><td>A password has 8–20 characters; a phone number has exactly 10 digits</td></tr>
<tr><td><b>Type check</b></td><td>The data is the correct data type.</td><td>Age must be a whole number (integer), not "twelve"</td></tr>
<tr><td><b>Presence check</b></td><td>Data has been entered — the field is not left empty.</td><td>Email address must be filled in</td></tr>
<tr><td><b>Format check</b></td><td>The characters follow a set pattern.</td><td>A date in the form DD/MM/YYYY; a student ID like AB1234</td></tr>
<tr><td><b>Check digit</b></td><td>The final digit, calculated from the others, matches.</td><td>ISBNs and bar codes</td></tr></table>
<pre class="code">REPEAT
  OUTPUT "Enter a mark from 0 to 100"
  INPUT Mark
  IF Mark < 0 OR Mark > 100
    THEN
      OUTPUT "Invalid – please re-enter"
  ENDIF
UNTIL Mark >= 0 AND Mark <= 100          // range check</pre>
<pre class="code">REPEAT
  INPUT Password
UNTIL LENGTH(Password) >= 8              // length check

REPEAT
  INPUT Name
UNTIL Name <> ""                         // presence check</pre>

<h4>Verification</h4>
<p><b>Verification</b> checks that data has been <b>accurately copied or entered</b> — that it matches the original.</p>
<table class="tbl"><tr><th>Check</th><th>How it works</th></tr>
<tr><td><b>Visual check</b></td><td>The user looks at the data on screen and compares it with the original document (or the computer shows it and asks "Is this correct?").</td></tr>
<tr><td><b>Double entry check</b></td><td>The data is entered <b>twice</b> and the computer compares the two. If they don't match, the data must be re-entered. Example: "Confirm your new password".</td></tr></table>
<div class="tip"><b>Validation</b> = is it <b>reasonable</b>? (computer checks rules) · <b>Verification</b> = is it <b>what was meant</b>? (checks against the original)</div>
<div class="keywords"><b>Key words:</b> validation, range check, length check, type check, presence check, format check, check digit, verification, visual check, double entry check</div>`
},
{
  id: "3.6", title: "Testing and trace tables", pages: "281–285",
  objectives: ["3.6a", "3.6b"],
  summary: "Normal, abnormal, extreme and boundary test data, and dry-running algorithms with trace tables.",
  reading: `
<h4>Test data</h4>
<p>A program must be tested with different kinds of data to prove it works. Imagine a program that accepts an exam mark from <b>0 to 100</b>:</p>
<table class="tbl"><tr><th>Type</th><th>Meaning</th><th>Examples (0–100)</th><th>Expected result</th></tr>
<tr><td><b>Normal</b></td><td>Sensible data that should be <b>accepted</b>.</td><td>45, 72, 18</td><td>Accepted</td></tr>
<tr><td><b>Abnormal</b> (erroneous)</td><td>Data that should be <b>rejected</b> — wrong type or out of range.</td><td>−20, 150, "ten"</td><td>Rejected with a message</td></tr>
<tr><td><b>Extreme</b></td><td>The <b>largest and smallest acceptable</b> values.</td><td>0 and 100</td><td>Accepted</td></tr>
<tr><td><b>Boundary</b></td><td>The largest/smallest acceptable value <b>and</b> the value just outside it, which should be rejected.</td><td>0 and −1 · 100 and 101</td><td>0, 100 accepted · −1, 101 rejected</td></tr></table>
<div class="tip">For a whole-number range, the boundary pairs are <b>(lowest − 1, lowest)</b> and <b>(highest, highest + 1)</b>.</div>

<h4>Trace tables</h4>
<p>A <b>trace table</b> records the value of every <b>variable</b>, every <b>output</b> and any <b>user prompts</b> at each step of an algorithm. Working through it by hand is called a <b>dry run</b>. It helps find <b>logic errors</b> and shows what an algorithm does.</p>
<pre class="code">Total ← 0
FOR Count ← 1 TO 4
  INPUT Number
  IF Number > 10
    THEN
      Total ← Total + Number
  ENDIF
NEXT Count
OUTPUT Total</pre>
<p>Inputs: 12, 5, 20, 10</p>
<table class="tbl center"><tr><th>Count</th><th>Number</th><th>Total</th><th>OUTPUT</th></tr>
<tr><td></td><td></td><td>0</td><td></td></tr><tr><td>1</td><td>12</td><td>12</td><td></td></tr>
<tr><td>2</td><td>5</td><td></td><td></td></tr><tr><td>3</td><td>20</td><td>32</td><td></td></tr>
<tr><td>4</td><td>10</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>32</td></tr></table>
<p>Only numbers <b>greater than</b> 10 are added, so 10 is not included — a trace table makes that easy to see.</p>
<div class="tip"><b>Trace table rules:</b> one column per variable plus OUTPUT; write a new value only when it changes; move down a row each time; read the code line by line exactly as the computer would.</div>
<div class="keywords"><b>Key words:</b> test data, normal, abnormal, erroneous, extreme, boundary, expected result, trace table, dry run, variable, output, logic error</div>`
},
{
  id: "3.7", title: "Creating and refining algorithms", pages: "285–298",
  objectives: ["3.7a", "3.7b"],
  summary: "Find and fix errors in algorithms, then write and amend your own with precision.",
  reading: `
<h4>Finding errors in algorithms</h4>
<p>Exam questions often give you an algorithm with <b>errors</b> and ask you to find them and suggest a correction. Look for these common mistakes:</p>
<table class="tbl"><tr><th>Common error</th><th>Wrong</th><th>Correct</th></tr>
<tr><td>Variable not initialised (or wrong start value)</td><td><code>Total ← 1</code></td><td><code>Total ← 0</code></td></tr>
<tr><td>Wrong comparison operator</td><td><code>IF Mark > 50</code> (50 should pass)</td><td><code>IF Mark >= 50</code></td></tr>
<tr><td>Loop runs the wrong number of times</td><td><code>FOR i ← 1 TO 9</code> for 10 items</td><td><code>FOR i ← 1 TO 10</code></td></tr>
<tr><td>Counter not updated / wrong update</td><td><code>Count ← Count</code></td><td><code>Count ← Count + 1</code></td></tr>
<tr><td>Wrong logic in a condition</td><td><code>UNTIL Mark < 0 AND Mark > 100</code></td><td><code>UNTIL Mark >= 0 AND Mark <= 100</code></td></tr>
<tr><td>Output in the wrong place (inside the loop)</td><td>OUTPUT Total each time round</td><td>OUTPUT Total after NEXT</td></tr>
<tr><td>Average calculated inside the loop or divided by the wrong number</td><td><code>Average ← Total / Count</code> before the loop ends</td><td>after the loop</td></tr></table>
<div class="example"><b>Example:</b> this should output the largest of 20 numbers.
<pre class="code mini">Largest ← 999
FOR Count ← 1 TO 20
  INPUT Number
  IF Number < Largest THEN Largest ← Number ENDIF
NEXT Count
OUTPUT Largest</pre>
<b>Errors:</b> line 1 should be <code>Largest ← -999</code> (or the first number); line 4 should use <code>Number > Largest</code>.</div>

<h4>Writing and amending algorithms</h4>
<ol><li><b>Read the question twice.</b> Underline the inputs, the processes, the outputs and any limits ("between 1 and 50", "until −1 is entered").</li>
<li>Choose the right <b>loop</b>: a fixed number of times → FOR; until a condition → REPEAT or WHILE.</li>
<li><b>Initialise</b> totals and counters before the loop.</li>
<li>Add <b>validation</b> if data must be checked.</li>
<li>Put <b>outputs</b> in the right place and include helpful messages.</li>
<li><b>Dry run</b> it with a trace table to check it works.</li></ol>
<div class="tip"><b>Precision matters:</b> <code>x > y</code> is acceptable but "x is greater than y" is not. Use meaningful variable names such as <code>TotalMark</code>, not <code>t</code>.</div>
<div class="example"><b>Task:</b> input temperatures until −999 is entered, then output the average.
<pre class="code mini">Total ← 0
Count ← 0
INPUT Temp
WHILE Temp <> -999 DO
  Total ← Total + Temp
  Count ← Count + 1
  INPUT Temp
ENDWHILE
IF Count > 0
  THEN OUTPUT "Average: ", Total / Count
ENDIF</pre></div>
<div class="keywords"><b>Key words:</b> error, correction, initialise, logic error, off-by-one, condition, amend, refine, dry run, meaningful identifier, precision</div>`
}
  ]
});
