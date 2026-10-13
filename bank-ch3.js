/* Question bank — Chapter 3 Algorithm design and problem-solving */
window.BANK = window.BANK || {};
Object.assign(window.BANK, {

"3.1a": [
  ["What are the four stages of the program development life cycle in the IGCSE syllabus?", "Analysis, design, coding, testing", ["Plan, build, sell, review", "Input, process, output, storage", "Design, test, code, analyse"]],
  ["In which stage of the life cycle is the problem identified and the requirements decided?", "Analysis", ["Design", "Coding", "Testing"], { t: true }],
  ["In which stage are structure diagrams, flowcharts and pseudocode produced?", "Design", ["Analysis", "Coding", "Testing"], { t: true }],
  ["In which stage is program code written and tested iteratively?", "Coding", ["Analysis", "Design", "Evaluation"], { t: true }],
  ["In which stage is the completed program tested with test data?", "Testing", ["Design", "Analysis", "Coding"], { t: true }],
  ["What is abstraction?", "Removing unnecessary details and keeping only what is important to solve the problem", ["Breaking a problem into smaller parts", "Writing code in a high-level language", "Testing each module as it is written"]],
  ["What is decomposition?", "Breaking a problem down into smaller, more manageable parts", ["Removing unnecessary detail", "Turning code into machine code", "Checking data is sensible"]],
  ["What is iterative testing?", "Testing each part of the program as it is written, fixing errors and testing again", ["Testing the program once at the end", "Asking users to test the final program", "Testing only with extreme data"]],
  ["A metro map shows stations and lines but not buildings or streets. This is an example of…", "abstraction", ["decomposition", "iteration", "validation"], { t: true }],
  ["Identifying what the user needs the program to do is called identifying the…", "requirements", ["test data", "pseudocode", "variables"], { t: ["requirement"] }],
  ["Which stage comes immediately after design?", "Coding", ["Analysis", "Testing", "Maintenance"], { t: true }]
],

"3.1b": [
  ["What is a sub-system?", "A smaller system that is part of a larger system", ["A system with no inputs", "A type of operating system", "A system that only stores data"]],
  ["When a problem is decomposed, which four component parts are identified?", "Inputs, processes, outputs and storage", ["Analysis, design, coding, testing", "Hardware, software, data, users", "Variables, constants, arrays, loops"]],
  ["What does a structure diagram show?", "How a system is broken down into sub-systems, as a hierarchy", ["The order of steps with decisions and loops", "The values of variables as a program runs", "The binary used for each character"]],
  ["In a program that calculates a student's average mark, the five test marks are…", "inputs", ["processes", "outputs", "storage"], { t: true }],
  ["In a program that calculates a student's average mark, adding up the marks and dividing is a…", "process", ["input", "output", "storage"], { t: ["processes", "processing"] }],
  ["In a program that calculates a student's average mark, displaying the average is an…", "output", ["input", "process", "storage"], { t: true }],
  ["Saving a high-score table to a file so it is there next time is an example of…", "storage", ["input", "process", "output"], { t: true }],
  ["Why is decomposition useful?", "Each smaller part is easier to design, code and test, and different people can work on different parts", ["It makes the program run faster", "It removes the need for testing", "It means no variables are needed"]],
  ["Which three methods can be used to design a solution in the IGCSE syllabus?", "Structure diagrams, flowcharts and pseudocode", ["Trace tables, test data and validation", "Compilers, interpreters and assemblers", "Spreadsheets, databases and websites"]],
  ["In a structure diagram, where is the name of the whole system written?", "In the single box at the top", ["In every box", "At the bottom", "In a diamond shape"]]
],

"3.2a": [
  ["What is an algorithm?", "A step-by-step set of instructions to solve a problem", ["A type of programming language", "A diagram of computer hardware", "A list of variables"]],
  ["Which flowchart symbol is used for START and STOP?", "A terminator (rounded rectangle)", ["A diamond", "A parallelogram", "A rectangle"]],
  ["Which flowchart symbol is used for INPUT and OUTPUT?", "A parallelogram", ["A rectangle", "A diamond", "An oval"], { t: true }],
  ["Which flowchart symbol is used for a decision?", "A diamond", ["A rectangle", "A parallelogram", "A circle"], { t: ["rhombus"] }],
  ["Which flowchart symbol is used for a process such as Total ← Total + 1?", "A rectangle", ["A diamond", "A parallelogram", "A terminator"], { t: true }],
  ["How is a subroutine (procedure) shown in a flowchart?", "A rectangle with double lines on each side", ["A diamond with a circle", "A dashed parallelogram", "A triangle"]],
  ["How many exits does a decision box have?", "Two, labelled Yes and No", ["One", "Three", "As many as you like"]],
  ["What shows the order of steps in a flowchart?", "Flow lines with arrows", ["The colour of the boxes", "The size of the boxes", "Numbers inside each box"]],
  ["Which construct means steps are carried out one after another?", "Sequence", ["Selection", "Iteration", "Validation"], { t: true }],
  ["Which construct means a decision chooses which steps happen?", "Selection", ["Sequence", "Iteration", "Abstraction"], { t: true }],
  ["Which construct means steps are repeated?", "Iteration", ["Sequence", "Selection", "Decomposition"], { t: ["looping", "loop", "repetition"] }],
  ["In a flowchart, how is a loop shown?", "A flow line goes back to an earlier step, usually a decision", ["With a special loop symbol", "By drawing the same boxes twice", "With a dotted box"]],
  ["Which condition would be acceptable in an IGCSE exam flowchart?", "Age >= 18?", ["Is the person old enough?", "Age big?", "Check age"]]
],

"3.2b": [
  ["What should you do first when asked to explain the purpose of a flowchart?", "Identify its inputs and outputs and follow it with sample values", ["Count the number of boxes", "Rewrite it in hexadecimal", "Look only at the decision boxes"]],
  ["A flowchart inputs 10 numbers, adds each to Total, then outputs Total. What is its purpose?", "To output the total of 10 numbers", ["To output the largest of 10 numbers", "To count how many numbers are input", "To output each number twice"]],
  ["A flowchart repeatedly inputs a password until it equals \"Secret\". What is its purpose?", "To keep asking for the password until the correct one is entered", ["To store the password in a file", "To encrypt the password", "To count the number of characters"]],
  ["A flowchart inputs Mark and outputs \"Pass\" if Mark >= 50, otherwise \"Fail\". Mark = 50. What is output?", "Pass", ["Fail", "50", "Nothing"], { t: true }]
],

"3.3a": [
  ["In Cambridge pseudocode, what does ← mean?", "Assignment — store the value on the right in the variable on the left", ["Less than or equal to", "Output", "Input from the left"]],
  ["Which pseudocode keyword is used to read a value from the user?", "INPUT", ["OUTPUT", "READLINE", "GET"], { t: true }],
  ["Which pseudocode keyword is used to display a value?", "OUTPUT", ["INPUT", "SHOW", "WRITE"], { t: ["print"] }],
  ["Which operator means 'not equal to' in pseudocode?", "<>", ["!=", "=/", "><"], { t: true }],
  ["What is 17 MOD 5?", "2", ["3", "3.4", "12"], { t: true, e: "MOD gives the remainder: 17 = 3 × 5 + 2." }],
  ["What is 17 DIV 5?", "3", ["2", "3.4", "85"], { t: true, e: "DIV gives the whole-number part of the division." }],
  ["What is 2 ^ 3?", "8", ["6", "5", "9"], { t: true }],
  ["Which loop should be used when you know exactly how many times to repeat?", "FOR … TO … NEXT", ["WHILE … DO … ENDWHILE", "REPEAT … UNTIL", "IF … THEN … ENDIF"]],
  ["Which loop always runs at least once?", "REPEAT … UNTIL (post-condition)", ["WHILE … DO (pre-condition)", "FOR … NEXT", "CASE … OF"]],
  ["Which loop might not run at all?", "WHILE … DO … ENDWHILE (pre-condition)", ["REPEAT … UNTIL", "FOR 1 TO 10", "None of them"]],
  ["A WHILE loop checks its condition…", "before each repetition", ["after each repetition", "only once at the end", "only when the user presses a key"]],
  ["A REPEAT … UNTIL loop checks its condition…", "after each repetition", ["before each repetition", "only at the start", "never"]],
  ["Which statement selects between many fixed values of one variable?", "CASE OF … OTHERWISE … ENDCASE", ["FOR … NEXT", "REPEAT … UNTIL", "DECLARE"]],
  ["In a CASE statement, what does OTHERWISE do?", "Runs when the value doesn't match any of the listed cases", ["Ends the program", "Repeats the CASE", "Declares a variable"]],
  ["Which is the correct way to declare an integer variable in Cambridge pseudocode?", "DECLARE Count : INTEGER", ["INTEGER Count", "Count = INT", "DIM Count AS"]],
  ["What does LENGTH(\"Computer\") return?", "8", ["7", "9", "C"], { t: true }],
  ["What does UCASE(\"hello\") return?", "\"HELLO\"", ["\"Hello\"", "\"hello\"", "5"], { t: ["HELLO"] }],
  ["What does SUBSTRING(\"Computer\", 1, 4) return?", "\"Comp\"", ["\"Computer\"", "\"omp\"", "\"Comput\""], { t: ["comp"] }],
  ["What is output?", "6", ["5", "4", "1 2 3"], { c: "Count ← 0\nFOR i ← 1 TO 3\n  Count ← Count + i\nNEXT i\nOUTPUT Count", t: true }],
  ["How many times is \"Hi\" output?", "4", ["3", "5", "0"], { c: "FOR i ← 2 TO 5\n  OUTPUT \"Hi\"\nNEXT i", t: true }],
  ["What is output when Age = 15?", "Child", ["Adult", "Teen", "Nothing"], { c: "IF Age >= 18\n  THEN\n    OUTPUT \"Adult\"\n  ELSE\n    OUTPUT \"Child\"\nENDIF", t: true }],
  ["Which logical operator is TRUE only when both conditions are TRUE?", "AND", ["OR", "NOT", "MOD"], { t: true }],
  ["Which logical operator is TRUE when at least one condition is TRUE?", "OR", ["AND", "NOT", "DIV"], { t: true }],
  ["What is a constant?", "A named value that does not change while the program runs", ["A variable that changes every loop", "A type of loop", "The output of a program"]]
],

"3.3b": [
  ["What is the purpose of this algorithm?", "To count how many of 20 input numbers are negative", ["To add up 20 numbers", "To find the smallest number", "To output only the negative numbers"], { c: "Count ← 0\nFOR i ← 1 TO 20\n  INPUT Num\n  IF Num < 0\n    THEN\n      Count ← Count + 1\n  ENDIF\nNEXT i\nOUTPUT Count" }],
  ["What is the purpose of this algorithm?", "To keep asking for a mark until one between 0 and 100 is entered", ["To add up marks", "To count marks over 100", "To output the highest mark"], { c: "REPEAT\n  INPUT Mark\nUNTIL Mark >= 0 AND Mark <= 100" }],
  ["What is the purpose of this algorithm?", "To find and output the largest number from 10 inputs", ["To find the smallest number", "To find the average", "To sort the numbers"], { c: "INPUT Largest\nFOR i ← 2 TO 10\n  INPUT Num\n  IF Num > Largest\n    THEN\n      Largest ← Num\n  ENDIF\nNEXT i\nOUTPUT Largest" }],
  ["What is the purpose of this algorithm?", "To output the 7 times table from 7 to 84", ["To add up the numbers 1 to 12", "To output 7 twelve times", "To multiply 7 by 7"], { c: "FOR i ← 1 TO 12\n  OUTPUT i * 7\nNEXT i" }],
  ["What is the purpose of this algorithm?", "To add up numbers until 0 is entered, then output the total", ["To count how many zeros are entered", "To output each number entered", "To stop when a negative number is entered"], { c: "Total ← 0\nINPUT Num\nWHILE Num <> 0 DO\n  Total ← Total + Num\n  INPUT Num\nENDWHILE\nOUTPUT Total" }],
  ["What is the purpose of this algorithm?", "To decide whether a number is even or odd", ["To divide a number by 2", "To find the remainder of any division", "To count even numbers"], { c: "INPUT Number\nIF Number MOD 2 = 0\n  THEN\n    OUTPUT \"Even\"\n  ELSE\n    OUTPUT \"Odd\"\nENDIF" }]
],

"3.4a": [
  ["What value should a total variable be set to before a totalling loop starts?", "0", ["1", "The first input", "-1"], { t: ["zero"] }],
  ["Which line is an example of totalling?", "Total ← Total + Price", ["Count ← Count + 1", "Total ← Price", "OUTPUT Total"]],
  ["Which line is an example of counting?", "Count ← Count + 1", ["Total ← Total + Mark", "Count ← Mark", "Count ← 0 + Mark"]],
  ["What is the difference between totalling and counting?", "Totalling adds each value; counting adds 1 each time something happens", ["They are the same", "Counting adds each value; totalling adds 1", "Totalling only works with decimals"]],
  ["What is output?", "15", ["5", "10", "16"], { c: "Total ← 0\nFOR i ← 1 TO 5\n  Total ← Total + i\nNEXT i\nOUTPUT Total", t: true }],
  ["What is output if the inputs are 4, 7, 2, 9?", "2", ["4", "1", "3"], { c: "Count ← 0\nFOR i ← 1 TO 4\n  INPUT Num\n  IF Num > 5\n    THEN\n      Count ← Count + 1\n  ENDIF\nNEXT i\nOUTPUT Count", t: true }]
],

"3.4b": [
  ["How is an average calculated?", "Total ÷ number of values", ["Largest − smallest", "Total × number of values", "Largest ÷ 2"]],
  ["Why is it safest to set Maximum to the first value in the list before the loop?", "Because the real maximum might be less than any fixed starting value (e.g. all values negative)", ["Because the first value is always the largest", "Because loops can't start at 0", "Because it makes the loop shorter"]],
  ["When finding the maximum, which comparison is used inside the loop?", "IF Value > Maximum THEN Maximum ← Value", ["IF Value < Maximum THEN Maximum ← Value", "IF Value = Maximum THEN Maximum ← 0", "Maximum ← Maximum + Value"]],
  ["When finding the minimum, which comparison is used inside the loop?", "IF Value < Minimum THEN Minimum ← Value", ["IF Value > Minimum THEN Minimum ← Value", "Minimum ← Minimum - Value", "IF Value = 0 THEN Minimum ← Value"]],
  ["If Minimum is started at 0 and all the values are positive, what goes wrong?", "Minimum stays 0, which is not in the list", ["Minimum becomes the largest value", "The loop never ends", "Nothing goes wrong"]],
  ["Where should the average be calculated?", "After the loop has finished adding all the values", ["Before the loop starts", "Inside the loop on the first value", "It doesn't matter"]]
],

"3.4c": [
  ["How does a linear search work?", "It checks each item in order, one at a time, until the item is found or the end is reached", ["It checks the middle item and halves the list", "It sorts the list first", "It checks only the first and last items"]],
  ["Does a linear search need the data to be sorted?", "No", ["Yes", "Only for numbers", "Only for strings"], { t: true }],
  ["A list has 50 items and the item is not there. How many items does a linear search check?", "50", ["1", "25", "49"], { t: true }],
  ["In a linear search, what is the purpose of the Boolean variable Found?", "To stop the search once the item has been found", ["To count the items", "To store the item's value", "To sort the list"]],
  ["Names = [\"Ali\", \"Bea\", \"Cai\", \"Dev\", \"Eva\"]. A linear search looks for \"Dev\". How many comparisons are made?", "4", ["1", "3", "5"], { t: ["four"] }],
  ["What is the main disadvantage of a linear search on a very large list?", "It can be slow because it may have to check every item", ["It only works on sorted lists", "It can't find numbers", "It changes the order of the list"]]
],

"3.4d": [
  ["How does a bubble sort work?", "It compares neighbouring pairs and swaps them if they are in the wrong order, repeating passes until no swaps are made", ["It finds the middle item and splits the list", "It puts each item into a new list in order", "It checks each item against a search value"]],
  ["After the first pass of a bubble sort (ascending), where is the largest value?", "At the end of the list", ["At the start of the list", "In the middle", "It could be anywhere"]],
  ["Why is a temporary variable needed when swapping two values?", "Otherwise one of the values would be overwritten and lost", ["To count the swaps", "To make the sort faster", "To store the length of the list"]],
  ["When does a bubble sort know the list is sorted?", "When a complete pass is made with no swaps", ["After exactly one pass", "When the first item is the smallest", "After 10 passes"]],
  ["What is one complete run through the list in a bubble sort called?", "A pass", ["A swap", "A loop counter", "A search"], { t: true }],
  ["What is the list after the first pass of an ascending bubble sort on [4, 3, 1, 2]?", "[3, 1, 2, 4]", ["[1, 2, 3, 4]", "[3, 4, 1, 2]", "[4, 1, 2, 3]"]],
  ["Which line correctly swaps List[i] and List[i + 1]?", "Temp ← List[i]; List[i] ← List[i + 1]; List[i + 1] ← Temp", ["List[i] ← List[i + 1]; List[i + 1] ← List[i]", "Temp ← List[i]; List[i + 1] ← Temp", "List[i] ← Temp; Temp ← List[i + 1]"]]
],

"3.5a": [
  ["What is validation?", "An automatic check by the computer that data is sensible and reasonable", ["Checking that data has been copied correctly from the original", "Encrypting data", "Testing a program with test data"]],
  ["Can validation prove that data is correct?", "No — it only checks that data is reasonable", ["Yes, always", "Only for numbers", "Only for dates"]],
  ["Which check makes sure a mark is between 0 and 100?", "Range check", ["Length check", "Presence check", "Format check"], { t: true }],
  ["Which check makes sure a field has not been left empty?", "Presence check", ["Range check", "Type check", "Length check"], { t: true }],
  ["Which check makes sure a password has at least 8 characters?", "Length check", ["Range check", "Type check", "Presence check"], { t: true }],
  ["Which check makes sure an age is a whole number and not text?", "Type check", ["Length check", "Range check", "Format check"], { t: true }],
  ["Which check makes sure a date is entered as DD/MM/YYYY?", "Format check", ["Range check", "Presence check", "Length check"], { t: true }],
  ["Which check makes sure a student ID follows the pattern of two letters then four digits (e.g. AB1234)?", "Format check", ["Type check", "Range check", "Presence check"], { t: true }],
  ["Which validation check is used on ISBNs and bar codes?", "Check digit", ["Range check", "Presence check", "Double entry"], { t: true }],
  ["Which check makes sure a phone number has exactly 10 digits?", "Length check", ["Format check", "Range check", "Presence check"], { t: true }],
  ["Which pseudocode is a range check?", "UNTIL Age >= 11 AND Age <= 18", ["UNTIL Name <> \"\"", "UNTIL LENGTH(Code) = 6", "UNTIL Answer = \"Y\" OR Answer = \"N\""]],
  ["Which pseudocode is a presence check?", "UNTIL Name <> \"\"", ["UNTIL Age >= 11", "UNTIL LENGTH(PIN) = 4", "UNTIL Mark <= 100"]],
  ["Why is validation used?", "To stop unreasonable or impossible data from being entered and processed", ["To make data load faster", "To compress the data", "To back up the data"]],
  ["A user types 230 as their age and it is accepted. Which check is missing?", "Range check", ["Presence check", "Length check", "Format check"], { t: true }]
],

"3.5b": [
  ["What is verification?", "Checking that data has been accurately copied or entered — that it matches the original", ["Checking that data is sensible and reasonable", "Checking data with a check digit", "Testing a program with boundary data"]],
  ["Which are the two verification methods in the syllabus?", "Visual check and double entry check", ["Range check and length check", "Parity check and checksum", "Type check and format check"]],
  ["How does a double entry check work?", "The data is entered twice and the computer compares the two entries", ["Two people check the screen", "The computer calculates a check digit", "The data is sent back to the sender"]],
  ["How does a visual check work?", "The user looks at the data on screen and compares it with the original document", ["The computer compares two entries", "A camera scans the data", "The computer checks the range"]],
  ["Entering a new password twice when creating an account is an example of…", "a double entry check", ["a visual check", "a range check", "a presence check"], { t: ["double entry", "double entry check"] }],
  ["Why might a correctly validated date of birth still be wrong?", "Validation only checks it is reasonable, not that it is the person's actual date of birth", ["Dates can't be validated", "Validation always makes mistakes", "Dates must be verified using a check digit"]],
  ["What is a weakness of a visual check?", "The person checking might not notice a mistake", ["It takes no time", "It needs two keyboards", "It can only check numbers"]]
],

"3.6a": [
  ["A program accepts whole numbers from 1 to 10. Which is normal test data?", "6", ["0", "11", "\"six\""], { t: false }],
  ["A program accepts whole numbers from 1 to 10. Which is extreme test data?", "1 and 10", ["0 and 11", "5 and 6", "-1 and 100"]],
  ["A program accepts whole numbers from 1 to 10. Which pairs are boundary test data?", "0 and 1, 10 and 11", ["1 and 10 only", "5 and 6", "-10 and 100"]],
  ["A program accepts whole numbers from 1 to 10. Which is abnormal test data?", "\"ten\"", ["10", "5", "1"]],
  ["What is normal test data?", "Sensible data that the program should accept", ["Data that should be rejected", "The largest and smallest acceptable values", "Data that is just outside the range"]],
  ["What is abnormal (erroneous) test data?", "Data that the program should reject", ["Data that should be accepted", "The largest acceptable value", "Data that is exactly on the limit"]],
  ["What is extreme test data?", "The largest and smallest values that should be accepted", ["Values that are far outside the range", "Random values", "Text instead of numbers"]],
  ["What is boundary test data?", "The largest/smallest acceptable values and the values just outside them that should be rejected", ["Only the values that should be accepted", "Only text values", "Values in the middle of the range"]],
  ["Why is a program tested with different types of test data?", "To check it accepts valid data and rejects invalid data correctly", ["To make it run faster", "To use up all the memory", "To check the spelling"]],
  ["A mark must be from 0 to 100. What is the expected result for test data 101?", "Rejected", ["Accepted", "Rounded to 100", "Converted to 1"], { t: true }],
  ["A mark must be from 0 to 100. What is the expected result for test data 0?", "Accepted", ["Rejected", "Error", "Changed to 1"], { t: true }]
],

"3.6b": [
  ["What is a trace table used for?", "To record the values of variables and outputs at each step when dry-running an algorithm", ["To list the test data for a program", "To show the hierarchy of sub-systems", "To store the results of a program in a file"]],
  ["What is a dry run?", "Working through an algorithm by hand, step by step, without a computer", ["Running a program with no data", "Running a program without a power supply", "Compiling a program"]],
  ["Which columns does a trace table normally have?", "One for each variable, plus the output", ["One for each line of code", "Only one for the output", "One for each test data type"]],
  ["Which type of error is a trace table especially useful for finding?", "Logic errors", ["Syntax errors", "Hardware errors", "Typing errors in the keyboard"], { t: ["logic", "logic error"] }],
  ["Complete the trace: what is the final value of X?", "16", ["8", "4", "32"], { c: "X ← 1\nFOR i ← 1 TO 4\n  X ← X * 2\nNEXT i", t: true }],
  ["What is output?", "10", ["15", "9", "1"], { c: "Total ← 0\nNum ← 1\nWHILE Num < 5 DO\n  Total ← Total + Num\n  Num ← Num + 1\nENDWHILE\nOUTPUT Total", t: true }]
],

"3.7a": [
  ["This algorithm should output the numbers 10 down to 1. What is the error?", "The FOR loop needs STEP -1", ["Count should start at 1", "OUTPUT should be outside the loop", "There is no error"], { c: "FOR Count ← 10 TO 1\n  OUTPUT Count\nNEXT Count" }],
  ["This algorithm should input 5 names and output each one in capitals. What is the error?", "The loop should be FOR i ← 1 TO 5", ["UCASE should be LCASE", "INPUT should be after OUTPUT", "Name should be a number"], { c: "FOR i ← 1 TO 4\n  INPUT Name\n  OUTPUT UCASE(Name)\nNEXT i" }],
  ["This algorithm should find the total of the array Scores[1:10]. What is the error?", "Total ← Total + Scores[i] should be inside the loop, not after it", ["Total should start at 10", "The loop should start at 0", "Scores should be a string"], { c: "Total ← 0\nFOR i ← 1 TO 10\n  OUTPUT Scores[i]\nNEXT i\nTotal ← Total + Scores[i]\nOUTPUT Total" }],
  ["A REPEAT loop should ask for a PIN until 1234 is entered. Which line is wrong?", "UNTIL PIN <> 1234 should be UNTIL PIN = 1234", ["REPEAT should be WHILE", "INPUT PIN should be OUTPUT PIN", "1234 should be in quotes"], { c: "REPEAT\n  OUTPUT \"Enter PIN\"\n  INPUT PIN\nUNTIL PIN <> 1234" }],
  ["This algorithm should total 10 numbers. What is the error?", "Total should be set to 0, not 1", ["The loop should be 0 TO 10", "OUTPUT should be inside the loop", "INPUT should be after the loop"], { c: "Total ← 1\nFOR i ← 1 TO 10\n  INPUT Num\n  Total ← Total + Num\nNEXT i\nOUTPUT Total" }],
  ["This algorithm should output \"Pass\" for marks of 50 or more. What is the error?", "The condition should be Mark >= 50", ["The condition should be Mark < 50", "Pass should be Fail", "INPUT should be OUTPUT"], { c: "INPUT Mark\nIF Mark > 50\n  THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Fail\"\nENDIF" }],
  ["This algorithm should count how many of 20 numbers are positive. What is the error?", "Count ← Count + Num should be Count ← Count + 1", ["The loop should go to 21", "Count should start at 1", "The IF should use < 0"], { c: "Count ← 0\nFOR i ← 1 TO 20\n  INPUT Num\n  IF Num > 0\n    THEN\n      Count ← Count + Num\n  ENDIF\nNEXT i\nOUTPUT Count" }],
  ["This algorithm should find the smallest of 10 numbers. What is the error?", "The comparison should be Num < Smallest", ["Smallest should start at 0", "The loop should start at 0", "OUTPUT should be first"], { c: "INPUT Smallest\nFOR i ← 2 TO 10\n  INPUT Num\n  IF Num > Smallest\n    THEN\n      Smallest ← Num\n  ENDIF\nNEXT i\nOUTPUT Smallest" }],
  ["This algorithm should output the average of 5 numbers. What is the error?", "The average should be calculated after the loop, not inside it", ["Total should start at 1", "The loop should be 1 TO 4", "There is no error"], { c: "Total ← 0\nFOR i ← 1 TO 5\n  INPUT Num\n  Total ← Total + Num\n  Average ← Total / 5\n  OUTPUT Average\nNEXT i" }],
  ["This validation should accept marks from 0 to 100. What is the error?", "AND should be OR in the IF condition", ["0 should be 1", "The loop should be FOR", "100 should be 99"], { c: "REPEAT\n  INPUT Mark\n  IF Mark < 0 AND Mark > 100\n    THEN\n      OUTPUT \"Invalid\"\n  ENDIF\nUNTIL Mark >= 0 AND Mark <= 100" }],
  ["This loop should output the numbers 1 to 10. What is the error?", "Count is never increased, so the loop never ends", ["Count should start at 0", "OUTPUT should be after ENDWHILE", "The condition should be > 10"], { c: "Count ← 1\nWHILE Count <= 10 DO\n  OUTPUT Count\nENDWHILE" }],
  ["What is a logic error?", "An error where the program runs but produces the wrong result", ["An error that stops the program being translated", "An error in the hardware", "An error caused by a virus"]]
],

"3.7b": [
  ["Which loop is best for 'input numbers until -1 is entered'?", "A condition-controlled loop (WHILE or REPEAT)", ["A FOR loop from 1 to 10", "An IF statement", "A CASE statement"]],
  ["Which loop is best for 'input exactly 30 marks'?", "A FOR loop (count-controlled)", ["A WHILE loop", "A REPEAT loop that never ends", "A CASE statement"]],
  ["Which condition is written with the precision needed in an IGCSE exam?", "Score > HighScore", ["Score is bigger than HighScore", "Score beats HighScore", "If score is high"]],
  ["Before a loop that totals values, what must you do?", "Initialise the total to 0", ["Output the total", "Declare the total as a string", "Set the total to the last value"]],
  ["Which is the best identifier for a variable storing a student's total mark?", "TotalMark", ["t", "x1", "Variable"]],
  ["An algorithm should reject ages under 11 or over 18. Which line completes the validation?", "UNTIL Age >= 11 AND Age <= 18", ["UNTIL Age >= 11 OR Age <= 18", "UNTIL Age < 11 AND Age > 18", "UNTIL Age = 11 OR 18"]],
  ["Where should OUTPUT Total be placed when totalling 10 numbers?", "After NEXT, so it only outputs once at the end", ["Inside the loop", "Before the loop", "At the start of the program"]],
  ["How would you check your own algorithm works before coding it?", "Dry-run it with a trace table and test data", ["Count the lines", "Print it out", "Change all the variable names"]]
]
});
