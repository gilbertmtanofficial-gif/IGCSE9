/* Question bank — Chapter 5 Software and Chapter 6 Boolean logic */
window.BANK = window.BANK || {};
Object.assign(window.BANK, {

"5.1a": [
  ["What is system software?", "Software that provides the services the computer requires, such as the operating system and utilities", ["Software the user needs to complete a task", "Any program that is free", "Hardware inside the CPU"]],
  ["What is application software?", "Software that provides the services the user requires to carry out a task", ["Software that runs the hardware", "The bootloader", "A device driver"]],
  ["Which of these is application software?", "A word processor", ["An operating system", "Antivirus software", "A device driver"]],
  ["Which of these is system software?", "An operating system", ["A spreadsheet", "A web browser", "A photo editor"]],
  ["Which of these is utility software?", "Defragmentation software", ["A video game", "A word processor", "A web browser"]],
  ["What does defragmentation software do?", "Rearranges the parts of files on a hard disk so each file is stored together, making access faster", ["Removes viruses", "Compresses files", "Backs up files to the cloud"]],
  ["Why is defragmentation not needed on an SSD?", "SSDs have no moving read/write head, so file location doesn't slow access", ["SSDs can't store files", "SSDs are always full", "SSDs defragment themselves every second"]],
  ["What does antivirus software do?", "Scans files for viruses and quarantines or deletes infected files", ["Speeds up the CPU", "Translates code", "Compresses images"]],
  ["What does backup software do?", "Makes copies of files so they can be restored if the originals are lost or damaged", ["Deletes old files", "Encrypts emails", "Defragments the disk"]],
  ["Which type of software is a web browser?", "Application software", ["System software", "Utility software", "Firmware"], { t: ["application"] }],
  ["Which type of software is antivirus?", "Utility (system) software", ["Application software", "Firmware", "Hardware"], { t: ["utility", "system", "system software", "utility software"] }],
  ["Which of these is NOT system software?", "A spreadsheet", ["A device driver", "An operating system", "Backup software"]]
],

"5.1b": [
  ["What is an interrupt?", "A signal sent to the CPU from a device or program saying that something needs attention", ["A program that stops viruses", "A type of bus", "A broken piece of hardware"]],
  ["Which of these is a hardware interrupt?", "Pressing a key on the keyboard", ["Division by zero", "Two processes trying to use the same memory location", "A program requesting more memory"]],
  ["Which of these is a software interrupt?", "Division by zero", ["Moving the mouse", "A printer running out of paper", "Pressing a key"]],
  ["Which of these is a software interrupt?", "Two processes trying to access the same memory location", ["Clicking the mouse", "Plugging in a USB stick", "Pressing the power button"]],
  ["Which of these is a hardware interrupt?", "A printer running out of paper", ["Division by zero", "A program crashing", "A program asking for data"]],
  ["What is an interrupt service routine (ISR)?", "The code that runs to handle a particular interrupt", ["The list of all interrupts", "The program that generated the interrupt", "A hardware component that stores interrupts"]],
  ["When does the CPU check for interrupts?", "At the end of each fetch–decode–execute cycle", ["Only when the computer starts", "Once a day", "Only when the user asks it to"]],
  ["What does the CPU do before running the ISR?", "Saves the state (register contents) of the current task", ["Deletes the current task", "Restarts the computer", "Clears the RAM"]],
  ["What happens after the ISR has finished?", "The saved state is restored and the original task continues", ["The computer shuts down", "The task starts again from the beginning", "All programs close"]],
  ["Why do interrupts have priorities?", "So that more important interrupts are handled first", ["So they run in alphabetical order", "To make them slower", "So only one can ever happen"]],
  ["Along which bus are interrupt signals sent to the CPU?", "Control bus", ["Address bus", "Data bus", "USB"], { t: true }],
  ["Why are interrupts useful?", "The computer can respond quickly to events without constantly checking every device", ["They make programs smaller", "They stop viruses", "They save electricity"]]
],

"5.2a": [
  ["Which of these is a function of an operating system?", "Managing memory", ["Editing photos", "Writing essays", "Browsing the web"]],
  ["Which of these is NOT a function of an operating system?", "Writing a letter for the user", ["Managing files", "Handling interrupts", "Managing user accounts"]],
  ["What is meant by the OS 'managing multitasking'?", "Sharing CPU time between several programs so they appear to run at the same time", ["Running one program only", "Letting several users type at once", "Printing many copies"]],
  ["What is a device driver?", "Software that allows the operating system to communicate with a specific hardware device", ["A person who fixes computers", "A USB cable", "A type of interrupt"]],
  ["What is a GUI?", "A graphical user interface using windows, icons, menus and a pointer", ["A typed command interface", "A type of hard disk", "A programming language"]],
  ["Which is an advantage of a command line interface (CLI) over a GUI?", "It uses less memory and gives more direct control", ["It is easier for beginners", "It needs no commands to be learned", "It shows pictures"]],
  ["Which is an advantage of a GUI over a CLI?", "It is easy to learn — users don't have to memorise commands", ["It uses less memory", "It is faster for experts typing commands", "It needs no screen"]],
  ["How does the operating system manage memory?", "It decides which programs and data are held in RAM and stops them overwriting each other", ["It deletes RAM every second", "It stores everything in ROM", "It compresses all programs"]],
  ["Which OS function lets different people log in with their own files and settings?", "Managing user accounts", ["Handling interrupts", "Managing peripherals", "Providing a platform"]],
  ["What does 'providing a platform for running applications' mean?", "Applications use the OS's services (e.g. saving files, printing) instead of controlling the hardware directly", ["The OS is a train platform", "The OS runs applications in the cloud", "Applications don't need an OS"]],
  ["Which OS function includes firewalls and security updates?", "Providing system security", ["Managing files", "Managing multitasking", "Providing an interface"]],
  ["Which of these is an operating system?", "Android", ["Microsoft Word", "Google Chrome", "Photoshop"]],
  ["Copying, moving, renaming and deleting files is part of which OS function?", "Managing files", ["Managing memory", "Handling interrupts", "Managing multitasking"]]
],

"5.2b": [
  ["What is firmware?", "Software permanently stored in ROM (or flash) that provides low-level control of the hardware", ["Hardware that is very firm", "An application downloaded from the internet", "A type of virus"]],
  ["What is the bootloader?", "Firmware that runs when the computer is switched on and loads the operating system", ["The program that shuts down the computer", "A type of application", "A cable for booting"]],
  ["Applications run on…", "the operating system", ["the firmware directly", "the keyboard", "the bootloader only"]],
  ["The operating system runs on…", "the firmware", ["the applications", "the user", "the internet"]],
  ["The bootloader runs on…", "the hardware", ["the applications", "the operating system", "the cloud"]],
  ["Put these layers in order from the bottom up.", "Hardware → firmware → operating system → applications", ["Applications → OS → firmware → hardware", "Firmware → hardware → applications → OS", "OS → hardware → applications → firmware"]],
  ["Where is the bootloader stored?", "In ROM", ["In RAM", "On a DVD", "In the cloud"], { t: true }],
  ["Why can't the operating system be loaded without firmware?", "The firmware contains the instructions to start the hardware and load the OS from storage", ["The OS is stored in firmware", "Firmware deletes the OS", "The OS is too small"]],
  ["Why is the bootloader stored in ROM rather than RAM?", "ROM is non-volatile, so the instructions are still there when the computer is switched on", ["ROM is faster than RAM", "RAM can't hold programs", "ROM is larger than RAM"]]
],

"5.3a": [
  ["What is a high-level language?", "A programming language that is close to human language, such as Python or Java", ["Machine code made of 1s and 0s", "A language using mnemonics such as LDA", "A language used only by the CPU"]],
  ["What is a low-level language?", "A language close to machine code, such as assembly language or machine code", ["A language for beginners only", "A language like Python", "A spoken language"]],
  ["Which is an advantage of a high-level language?", "It is easier to read, write and debug", ["It can directly manipulate the hardware", "It needs no translator", "It is machine dependent"]],
  ["Which is an advantage of a low-level language?", "It can directly manipulate the hardware, such as specific registers and memory", ["It is easy to read", "It is machine independent", "It is easy to debug"]],
  ["What does 'machine independent' mean?", "The program can run on different types of computer (after translation)", ["It needs no machine to run", "It only runs on one CPU type", "It can't be translated"]],
  ["Which type of language is machine dependent?", "Low-level language", ["High-level language", "Pseudocode", "English"], { t: ["low-level", "low level"] }],
  ["Which of these is a high-level language?", "Python", ["Assembly language", "Machine code", "Binary"], { t: true }],
  ["Why might a programmer writing a device driver use a low-level language?", "It allows direct control of the hardware and efficient, fast code", ["It is easier to read", "It works on every type of computer", "It needs no testing"]],
  ["Which type of language is easier to debug?", "High-level language", ["Low-level language", "Machine code", "They are equally difficult"], { t: ["high-level", "high level"] }],
  ["What is the only language a CPU can execute directly?", "Machine code", ["Python", "Assembly language", "Pseudocode"], { t: ["machine code", "binary"] }]
],

"5.3b": [
  ["What is assembly language?", "A low-level language that uses mnemonics", ["A high-level language similar to English", "A language for building furniture", "A language made only of 1s and 0s"]],
  ["What is a mnemonic in assembly language?", "A short code for an instruction, such as LDA or ADD", ["A variable name", "A type of loop", "A comment"]],
  ["Which translator converts assembly language into machine code?", "An assembler", ["A compiler", "An interpreter", "A linker"], { t: true }],
  ["Which of these is an assembly language instruction?", "ADD 21", ["print(21)", "x = x + 21", "FOR i ← 1 TO 21"]],
  ["Each assembly language instruction usually matches…", "one machine-code instruction", ["one line of Python", "many machine-code instructions", "one whole program"]]
],

"5.3c": [
  ["How does a compiler translate a program?", "It translates the whole program at once before it is run, producing an executable file", ["It translates and runs one line at a time", "It translates assembly language only", "It translates machine code into English"]],
  ["How does an interpreter translate a program?", "It translates and executes the program one line at a time", ["It translates the whole program at once", "It produces an executable file", "It only translates assembly language"]],
  ["How does a compiler report errors?", "It gives an error report for the whole program after trying to translate it", ["It stops at the first error during execution", "It doesn't report errors", "It fixes them automatically"]],
  ["How does an interpreter report errors?", "It stops execution when it finds an error and reports it", ["It lists every error at the end", "It ignores errors", "It deletes the line"]],
  ["Which translator produces an executable file?", "A compiler", ["An interpreter", "An IDE", "A text editor"], { t: true }],
  ["Which translator is usually used while developing and debugging a program?", "An interpreter", ["A compiler", "An assembler", "A defragmenter"], { t: true }],
  ["Which translator is usually used to translate the final program for users?", "A compiler", ["An interpreter", "An assembler", "An antivirus"], { t: true }],
  ["Why does a compiled program run faster than an interpreted one?", "It has already been translated, so it doesn't need translating every time it runs", ["Compilers use more cores", "Interpreted programs are longer", "Compiled programs skip instructions"]],
  ["Why might a company prefer to give users a compiled program?", "Users don't get the source code, so it can't easily be copied or changed", ["It is easier to edit", "It needs an interpreter", "It works on every CPU"]],
  ["Which is a disadvantage of an interpreter?", "The program must be translated every time it runs, so it runs more slowly", ["It can't find errors", "It produces large executable files", "It can't run Python"]],
  ["Which is a disadvantage of a compiler?", "You can't see where an error happens while the program runs; all errors must be fixed before it can run", ["It translates line by line", "It must be present every time the program runs", "It shares the source code"]],
  ["What is a translator?", "A program that converts code into machine code", ["A person who speaks two languages", "A type of input device", "A device driver"]]
],

"5.4a": [
  ["Which IDE feature would highlight a missing bracket on line 12?", "Error diagnostics", ["Prettyprint", "Run-time environment", "Auto-completion"], { t: ["error diagnostics"] }],
  ["Which IDE feature lets a programmer step through code one line at a time while watching variables?", "Debugging tools in the run-time environment", ["Prettyprint", "Auto-correction", "The code editor's font"]],
  ["Which IDE feature makes keywords appear in colour?", "Prettyprint / syntax highlighting", ["Auto-correction", "Translator", "Run-time environment"]],
  ["Why is an IDE useful for a beginner programmer?", "It shows errors clearly and helps them write and test code in one place", ["It writes the whole program for them", "It makes programs run without translation", "It stops all logic errors"]],
  ["Which IDE feature translates the code so it can be run?", "The translator (compiler or interpreter)", ["Prettyprint", "Auto-completion", "Code editor"]],
  ["What happens when a programmer types 'pri' and the IDE offers 'print()'?", "Auto-completion", ["Auto-correction", "Prettyprint", "Error diagnostics"], { t: ["auto completion", "autocomplete"] }],
  ["What does IDE stand for?", "Integrated development environment", ["Internal data editor", "Interactive design engine", "Integrated debugging editor"], { t: ["integrated development environment"] }],
  ["What is an IDE?", "Software that provides the tools needed to write, translate, test and debug code in one place", ["A type of hard drive", "A programming language", "An operating system"]],
  ["Which IDE feature suggests how to finish a keyword or variable name as you type?", "Auto-completion", ["Prettyprint", "Run-time environment", "Error diagnostics"], { t: ["auto completion", "autocomplete", "autocompletion"] }],
  ["Which IDE feature automatically fixes common mistakes like misspelt keywords?", "Auto-correction", ["Auto-completion", "Prettyprint", "Translator"], { t: ["auto correction", "autocorrect", "autocorrection"] }],
  ["Which IDE feature colour-codes and indents the code to make it easier to read?", "Prettyprint", ["Run-time environment", "Auto-completion", "Translator"], { t: ["pretty print", "prettyprinting"] }],
  ["Which IDE feature shows where errors are and explains them?", "Error diagnostics", ["Prettyprint", "Auto-completion", "Code editor"], { t: ["error diagnostic", "diagnostics"] }],
  ["Which IDE feature lets the program be run and tested inside the IDE?", "Run-time environment", ["Code editor", "Prettyprint", "Auto-correction"], { t: ["runtime environment", "run time environment"] }],
  ["Which IDE feature lets the programmer type and edit their code?", "Code editor", ["Translator", "Error diagnostics", "Run-time environment"], { t: ["editor"] }],
  ["Which IDE feature converts the code into machine code?", "Translator (compiler or interpreter)", ["Prettyprint", "Code editor", "Auto-completion"], { t: ["translator", "compiler", "interpreter"] }],
  ["What is a breakpoint?", "A point where the program pauses so the programmer can check the values of variables", ["The end of a program", "A syntax error", "A type of loop"]],
  ["Which is a benefit of auto-completion?", "Faster coding with fewer spelling mistakes", ["The program runs faster", "Files are compressed", "Code is encrypted"]],
  ["Which of these is an example of an IDE?", "Thonny or Visual Studio", ["Windows 11", "Google Chrome", "Microsoft Excel"]]
],

"6.1a": [
  ["Which logic gate has only one input?", "NOT", ["AND", "OR", "XOR"], { t: true }],
  ["What does the small circle (bubble) on the output of a gate symbol mean?", "The output is inverted (NOT)", ["The gate has three inputs", "The gate is switched off", "The output is always 1"]],
  ["Which gate symbol has a curved back and a pointed front, with an extra curved line at the back?", "XOR", ["OR", "AND", "NAND"], { t: ["EOR"] }],
  ["Which gate symbol is a D shape with a flat back and a round front?", "AND", ["OR", "NOT", "XOR"], { t: true }],
  ["Which gate symbol is a triangle with a small circle on the point?", "NOT", ["NAND", "NOR", "AND"], { t: true }],
  ["Which gate symbol is an AND shape with a circle on the output?", "NAND", ["NOR", "XOR", "NOT"], { t: true }],
  ["Which gate symbol is an OR shape with a circle on the output?", "NOR", ["NAND", "XOR", "OR"], { t: true }],
  ["How many inputs do the AND, OR, NAND, NOR and XOR gates have in IGCSE?", "Two", ["One", "Three", "Any number"], { t: ["2"] }]
],

"6.1b": [
  ["An AND gate outputs 1 when…", "both inputs are 1", ["either input is 1", "both inputs are 0", "the inputs are different"]],
  ["An OR gate outputs 1 when…", "at least one input is 1", ["both inputs are 1 only", "both inputs are 0", "the inputs are the same"]],
  ["A NOT gate outputs…", "the opposite of its input", ["the same as its input", "always 1", "always 0"]],
  ["A NAND gate outputs 0 only when…", "both inputs are 1", ["both inputs are 0", "the inputs are different", "either input is 1"]],
  ["A NOR gate outputs 1 only when…", "both inputs are 0", ["both inputs are 1", "either input is 1", "the inputs are different"]],
  ["An XOR gate outputs 1 when…", "the inputs are different", ["the inputs are the same", "both inputs are 1", "both inputs are 0"]],
  ["What is the output of A AND B when A = 1 and B = 0?", "0", ["1"], { t: true }],
  ["What is the output of A OR B when A = 1 and B = 0?", "1", ["0"], { t: true }],
  ["What is the output of A XOR B when A = 1 and B = 1?", "0", ["1"], { t: true }],
  ["What is the output of A NAND B when A = 1 and B = 1?", "0", ["1"], { t: true }],
  ["What is the output of A NOR B when A = 0 and B = 0?", "1", ["0"], { t: true }],
  ["What is the output of NOT A when A = 1?", "0", ["1"], { t: true }],
  ["How many rows does a truth table for a two-input gate have?", "4", ["2", "3", "8"], { t: ["four"] }],
  ["How many rows does a truth table for three inputs have?", "8", ["3", "6", "9"], { t: ["eight"] }],
  ["\"The alarm sounds if the door is open and the system is switched on.\" Which gate?", "AND", ["OR", "XOR", "NOR"], { t: true }],
  ["\"The light comes on if switch A or switch B is pressed.\" Which gate?", "OR", ["AND", "NAND", "NOT"], { t: true }],
  ["\"The bell rings if exactly one of the two buttons is pressed.\" Which gate?", "XOR", ["OR", "AND", "NOR"], { t: ["EOR"] }],
  ["Which gate is equivalent to an AND gate followed by a NOT gate?", "NAND", ["NOR", "XOR", "OR"], { t: true }],
  ["Which gate is equivalent to an OR gate followed by a NOT gate?", "NOR", ["NAND", "XOR", "AND"], { t: true }],
  ["Which two-input gate has the truth-table output column 0, 1, 1, 1 (for inputs 00, 01, 10, 11)?", "OR", ["AND", "XOR", "NAND"], { t: true }],
  ["Which two-input gate has the truth-table output column 0, 0, 0, 1?", "AND", ["OR", "NOR", "NAND"], { t: true }],
  ["Which two-input gate has the truth-table output column 0, 1, 1, 0?", "XOR", ["OR", "NAND", "NOR"], { t: ["EOR"] }],
  ["Which two-input gate has the truth-table output column 1, 1, 1, 0?", "NAND", ["NOR", "OR", "AND"], { t: true }],
  ["Which two-input gate has the truth-table output column 1, 0, 0, 0?", "NOR", ["NAND", "AND", "XOR"], { t: true }]
],

"6.2a": [
  ["What order should the input rows of a three-input truth table be written in?", "Binary counting order: 000, 001, 010 … 111", ["Any order", "111 first, then random", "Only the rows where the output is 1"]],
  ["Why are working columns useful when completing a truth table?", "They show the output of each part of the expression, making mistakes less likely", ["They are needed to add more inputs", "They replace the output column", "They show the gate symbols"]]
],

"6.2b": [
  ["When writing a logic expression from a truth table, which rows do you use?", "The rows where the output is 1", ["The rows where the output is 0", "Only the first row", "Every row"]],
  ["For a truth-table row where A = 0, B = 1 gives an output of 1, which term is written?", "(NOT A AND B)", ["(A AND B)", "(A OR NOT B)", "(NOT A OR NOT B)"]],
  ["A heater (X) comes on if it is cold (C = 1) AND it is NOT the weekend (W = 1 means weekend). Which expression is correct?", "X = C AND NOT W", ["X = C OR W", "X = NOT C AND W", "X = C AND W"]],
  ["A door opens (X) if the button is pressed (B) OR a card is scanned (S). Which expression is correct?", "X = B OR S", ["X = B AND S", "X = NOT B OR S", "X = B XOR S"]]
],

"6.2c": [
  ["How many gates are needed to draw the circuit for X = (A AND B) OR C, without simplifying?", "2", ["1", "3", "4"], { t: ["two"] }],
  ["How many gates are needed to draw the circuit for X = NOT (A OR B) AND C, without simplifying?", "3", ["2", "4", "1"], { t: ["three"] }],
  ["In the IGCSE exam, should you simplify a logic expression before drawing its circuit?", "No — draw the circuit exactly as the expression is given", ["Yes, always", "Only if it has NOT gates", "Only for three inputs"]],
  ["What is the maximum number of inputs a logic circuit will have in the IGCSE exam?", "3", ["2", "4", "8"], { t: ["three"] }],
  ["Which gate is drawn first (nearest the inputs) for X = (A OR B) AND C?", "The OR gate", ["The AND gate", "A NOT gate", "Both at the same time"]]
]
});
