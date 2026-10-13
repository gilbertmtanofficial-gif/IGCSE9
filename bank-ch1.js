/* Question bank — Chapter 1 Data representation
   Format: [question, correct answer, [wrong answers], { e: explanation, t: true | [other accepted typed answers], c: code, s: seconds }]
   Calculation questions are also generated randomly in generators.js, so every try is different. */
window.BANK = window.BANK || {};
Object.assign(window.BANK, {

"1.1a": [
  ["Why do computers use binary to represent data?", "They are made of switches (transistors) that have only two states: on and off", ["Binary is easier for humans to read", "Binary uses less electricity than denary", "Binary numbers are always shorter"], { e: "Every transistor is either on (1) or off (0), so all data must be stored as 1s and 0s." }],
  ["Which types of data must be converted to binary before a computer can process them?", "All of them — numbers, text, images, sound and instructions", ["Only numbers", "Only text and numbers", "Only program instructions"]],
  ["Data is processed inside the CPU using…", "logic gates", ["hexadecimal tables", "denary counters", "Unicode characters"], { t: ["logic gate", "gates"] }],
  ["Data being processed by the CPU is held in small, fast memory locations called…", "registers", ["sectors", "packets", "pixels"], { t: ["register"] }],
  ["What is a single binary digit called?", "A bit", ["A byte", "A nibble", "A pixel"], { t: ["bit"] }],
  ["How many bits are there in a nibble?", "4", ["2", "8", "16"], { t: ["four"] }],
  ["How many bits are there in a byte?", "8", ["4", "10", "16"], { t: ["eight"] }],
  ["What base is the binary number system?", "Base 2", ["Base 10", "Base 8", "Base 16"], { t: ["2", "base2"] }],
  ["What base is the denary number system?", "Base 10", ["Base 2", "Base 16", "Base 8"], { t: ["10", "base10"] }],
  ["Which statement about binary is TRUE?", "Each column is worth twice the column to its right", ["Each column is worth ten times the column to its right", "It uses the digits 0 to 9", "It can only represent numbers"]],
  ["A binary number ends in 1. What do you know about it?", "It is an odd number", ["It is an even number", "It is negative", "It is greater than 128"]],
  ["The two states of a binary digit are usually written as…", "1 and 0", ["A and B", "on and true", "yes and maybe"]],
  ["How many different values can be stored using 8 bits?", "256", ["255", "128", "512"], { t: true, e: "2⁸ = 256 different values (0 to 255)." }],
  ["How many different values can be stored using 4 bits?", "16", ["15", "8", "32"], { t: true }],
  ["How many different values can be stored using 16 bits?", "65536", ["65535", "32768", "1024"], { t: ["65,536", "65 536"], e: "2¹⁶ = 65 536 (0 to 65 535)." }]
],

"1.1b": [
  ["What is the place value of the left-most bit in an 8-bit binary number?", "128", ["256", "64", "100"], { t: true }],
  ["What is the place value of the left-most bit in a 16-bit binary number?", "32768", ["65536", "16384", "1024"], { t: ["32,768", "32 768"] }],
  ["What is the largest denary number that can be stored in 8 bits (unsigned)?", "255", ["256", "128", "127"], { t: true }],
  ["What is the largest denary number that can be stored in 16 bits (unsigned)?", "65535", ["65536", "32767", "1023"], { t: ["65,535", "65 535"] }],
  ["What is the smallest number of bits needed to store the denary number 200?", "8", ["7", "9", "6"], { t: ["eight"], e: "7 bits can only reach 127; 8 bits reach 255." }],
  ["What is the smallest number of bits needed to store the denary number 64?", "7", ["6", "8", "5"], { t: ["seven"], e: "64 = 1000000, which has 7 bits." }],
  ["When converting denary to binary by dividing by 2, the remainders are read…", "from the bottom up", ["from the top down", "in any order", "from the middle out"]],
  ["What is 11111111 in denary?", "255", ["256", "128", "127"], { t: true }],
  ["What is 10000000 in denary?", "128", ["1", "64", "256"], { t: true }],
  ["What is 00000001 in denary?", "1", ["0", "128", "2"], { t: true }],
  ["Adding a 0 to the right of a binary number (e.g. 101 → 1010) does what to its value?", "Doubles it", ["Halves it", "Adds 1", "Multiplies it by 10"]],
  ["Which of these is NOT a valid binary number?", "10201", ["10101", "11111", "00000"], { e: "Binary only uses the digits 0 and 1." }],
  ["What is 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128?", "255", ["256", "254", "128"], { t: true, e: "That's every column in a byte switched on: 11111111." }]
],

"1.1c": [
  ["In binary addition, 1 + 1 = ?", "0 carry 1", ["2", "1 carry 0", "1 carry 1"], { e: "1 + 1 = 2, which is 10 in binary: write 0, carry 1." }],
  ["In binary addition, 1 + 1 + 1 = ?", "1 carry 1", ["0 carry 1", "3", "1 carry 0"], { e: "1 + 1 + 1 = 3, which is 11 in binary: write 1, carry 1." }],
  ["In binary addition, 1 + 0 = ?", "1 carry 0", ["0 carry 1", "10", "0 carry 0"]],
  ["What is an overflow error?", "When the result of a calculation needs more bits than the register can hold", ["When a number is negative", "When a program runs out of time", "When two numbers are the same"], { e: "The extra bit has nowhere to go, so the stored result is wrong." }],
  ["In an 8-bit register, an overflow error occurs if the result is greater than…", "255", ["256", "128", "127"], { t: true }],
  ["Binary addition is carried out…", "from right to left, carrying into the next column", ["from left to right", "one byte at a time from the left", "by converting to hex first"]],
  ["Two 8-bit numbers are added and the answer needs 9 bits. What has happened?", "An overflow error", ["An underflow error", "A syntax error", "A parity error"], { t: ["overflow"] }],
  ["Why can a computer not store every possible number?", "Each device has a predefined limit on the number of bits it can store, e.g. 16 bits", ["Computers only store text", "Binary can't show large numbers", "Numbers are stored in hexadecimal"]],
  ["What is the result of 11111111 + 00000001 in an 8-bit register?", "00000000 with an overflow error", ["100000000 stored correctly", "11111111", "00000001"], { e: "255 + 1 = 256 needs 9 bits; only the lower 8 bits (00000000) are kept." }],
  ["Which pair of 8-bit numbers will cause an overflow when added?", "200 and 100", ["100 and 100", "127 and 128", "50 and 200"], { e: "200 + 100 = 300, which is more than 255." }]
],

"1.2a": [
  ["What base is hexadecimal?", "Base 16", ["Base 2", "Base 10", "Base 8"], { t: ["16", "base16"] }],
  ["Which digits and letters does hexadecimal use?", "0–9 and A–F", ["0–9 only", "0–1 only", "A–Z"]],
  ["What is the denary value of hex digit F?", "15", ["16", "14", "6"], { t: true }],
  ["What is the denary value of hex digit A?", "10", ["11", "1", "16"], { t: true }],
  ["What is the denary value of hex digit C?", "12", ["13", "11", "3"], { t: true }],
  ["How many bits does one hexadecimal digit represent?", "4", ["8", "2", "16"], { t: ["four"], e: "One hex digit = one nibble = 4 bits." }],
  ["What are the place values of the two columns in a 2-digit hex number?", "16 and 1", ["10 and 1", "2 and 1", "256 and 16"]],
  ["What is the place value of the third column from the right in hexadecimal?", "256", ["100", "160", "4096"], { t: true }],
  ["When converting binary to hex, you split the binary into groups of 4 starting from the…", "right", ["left", "middle", "most significant bit"], { t: ["right-hand side", "rhs"] }],
  ["What is the largest denary value that can be shown with 2 hex digits?", "255", ["99", "256", "160"], { t: true, e: "FF = 15 × 16 + 15 = 255." }],
  ["What is FF in binary?", "11111111", ["11110000", "10101010", "00001111"], { t: true }],
  ["What is 1111 in hex?", "F", ["E", "15", "A"], { t: true }],
  ["What is the hex digit for the binary 1010?", "A", ["10", "B", "9"], { t: true }],
  ["Which hex value is the biggest?", "F0", ["9F", "AB", "EF"]],
  ["What is 10 in hexadecimal equal to in denary?", "16", ["10", "2", "1"], { t: true, e: "10 in hex means one 16 and no 1s." }]
],

"1.2b": [
  ["Why do computer scientists often use hexadecimal instead of binary?", "It is shorter and easier for humans to read and remember", ["Computers process hex faster than binary", "It uses less storage space in memory", "It is the only way to store colours"]],
  ["Why are people less likely to make mistakes with hex than binary?", "Hex numbers are much shorter, so there are fewer digits to copy", ["Hex never has errors", "Hex is checked by a parity bit", "Hex only uses letters"]],
  ["Does a computer process data in hexadecimal?", "No — it still works in binary; hex is only for humans to read", ["Yes, the CPU works in hex", "Only the GPU works in hex", "Yes, but only for colours"]],
  ["Which of these is a common use of hexadecimal?", "MAC addresses", ["Storing sound samples", "Measuring clock speed", "Calculating file size"]],
  ["#FF0000 is an example of hexadecimal being used for…", "an HTML/CSS colour code", ["a MAC address", "an IP address", "a memory dump"]],
  ["In an HTML colour code like #00FF00, the three pairs of hex digits represent the amounts of…", "red, green and blue", ["cyan, magenta and yellow", "brightness, contrast and hue", "black, white and grey"]],
  ["Which HTML colour code is white?", "#FFFFFF", ["#000000", "#FF0000", "#0000FF"]],
  ["Which HTML colour code is black?", "#000000", ["#FFFFFF", "#00FF00", "#888888"]],
  ["Programmers use hex in error messages and memory dumps because…", "memory addresses are long binary numbers, and hex shows them in a short, readable form", ["memory is stored in hex", "hex can't be read by hackers", "hex is encrypted"]],
  ["Which of these is written in hexadecimal?", "00-1C-B3-4F-25-FE", ["192.168.0.1", "11000000", "www.school.edu"], { e: "This is a MAC address — six pairs of hex digits." }],
  ["IPv6 addresses are written using…", "hexadecimal", ["denary", "binary", "ASCII"], { t: ["hex"] }],
  ["A MAC address identifies…", "a device's network interface card", ["a web page", "a file on a disk", "a user's password"]],
  ["Which is the best reason hex is used for MAC addresses?", "48 bits would be very long in binary, but only 12 digits in hex", ["MAC addresses are made of letters", "Hex addresses are faster to send", "Hex is more secure"]],
  ["In a URL, %20 is hexadecimal for which character?", "A space", ["A full stop", "The letter T", "A slash"]],
  ["Which of these is NOT a typical use of hexadecimal?", "Storing the samples of a sound file", ["HTML colour codes", "MAC addresses", "Memory addresses in error messages"]]
],

"1.3a": [
  ["What does a logical left shift of 1 place do to a positive binary integer?", "Multiplies it by 2", ["Divides it by 2", "Adds 1", "Makes it negative"], { t: ["x2", "times 2", "multiplies by 2", "doubles it"] }],
  ["What does a logical right shift of 1 place do to a positive binary integer?", "Divides it by 2", ["Multiplies it by 2", "Subtracts 1", "Inverts it"], { t: ["divides by 2", "halves it", "/2"] }],
  ["A logical left shift of 3 places multiplies the number by…", "8", ["3", "6", "9"], { t: ["eight"] }],
  ["A logical right shift of 2 places divides the number by…", "4", ["2", "8", "3"], { t: ["four"] }],
  ["During a logical shift, what is shifted in at the opposite end of the register?", "Zeros", ["Ones", "The bits that fell off", "A parity bit"], { t: ["0", "0s", "zero"] }],
  ["What happens to bits shifted off the end of the register?", "They are lost", ["They wrap round to the other end", "They are stored in the accumulator", "They become a parity bit"]],
  ["A right shift loses a 1 from the least significant end. What is the effect?", "The result is no longer exact — the remainder is lost", ["The number becomes negative", "An overflow error always occurs", "The number doubles"]],
  ["A left shift loses a 1 from the most significant end. What is the effect?", "The result is wrong — like an overflow, the value is no longer the number × 2", ["The number is divided by 2", "Nothing — no data is lost", "The number becomes odd"]],
  ["Which bit is lost when an 8-bit register is shifted left by 1?", "The most significant bit (MSB)", ["The least significant bit (LSB)", "The parity bit", "No bit is lost"]],
  ["Which bit is lost when an 8-bit register is shifted right by 1?", "The least significant bit (LSB)", ["The most significant bit (MSB)", "The sign bit only", "No bit is lost"]],
  ["To multiply a positive binary number by 16, shift it…", "left by 4 places", ["right by 4 places", "left by 16 places", "left by 2 places"]],
  ["To divide a positive binary number by 8, shift it…", "right by 3 places", ["left by 3 places", "right by 8 places", "right by 2 places"]]
],

"1.3b": [
  ["In an 8-bit two's complement number, what is the place value of the most significant bit?", "-128", ["128", "-1", "256"], { t: ["−128"] }],
  ["What is the range of numbers that 8-bit two's complement can store?", "-128 to +127", ["0 to 255", "-127 to +127", "-255 to +255"]],
  ["In two's complement, how can you tell a number is negative?", "Its most significant bit is 1", ["Its least significant bit is 1", "It has more 1s than 0s", "It starts with 0"]],
  ["What are the steps to turn a positive binary number into its negative in two's complement?", "Invert all the bits, then add 1", ["Add 1, then shift left", "Change the first bit to 1 only", "Subtract 128"]],
  ["What is the largest positive number in 8-bit two's complement?", "127", ["128", "255", "126"], { t: true }],
  ["What is the most negative number in 8-bit two's complement?", "-128", ["-127", "-255", "-256"], { t: ["−128"] }],
  ["What is 11111111 in 8-bit two's complement?", "-1", ["255", "-127", "-128"], { t: ["−1"], e: "−128 + 127 = −1." }],
  ["What is 10000000 in 8-bit two's complement?", "-128", ["128", "-0", "-1"], { t: ["−128"] }],
  ["What is 01111111 in 8-bit two's complement?", "127", ["-127", "255", "-1"], { t: true }],
  ["How does a positive number like 45 look in two's complement compared with ordinary binary?", "Exactly the same, with a 0 as the most significant bit", ["All the bits are inverted", "It has 1 as the most significant bit", "It is shifted left by 1"]],
  ["Why can't +200 be stored in 8-bit two's complement?", "The largest positive value is +127", ["Two's complement is only for negative numbers", "200 is an even number", "It needs a parity bit"]],
  ["What is 0 in 8-bit two's complement?", "00000000", ["10000000", "11111111", "01111111"], { t: true }]
],

"1.4a": [
  ["What is a character set?", "A defined list of characters that a computer can represent, each with a unique binary code", ["A font such as Arial", "A set of keyboard shortcuts", "A type of compression"]],
  ["What does ASCII stand for?", "American Standard Code for Information Interchange", ["Automatic System Code for Internet Information", "American Simple Computer Information Index", "Advanced Standard Character Input Interface"]],
  ["How many bits per character does standard ASCII use?", "7", ["8", "16", "32"], { t: ["seven"] }],
  ["How many characters can standard (7-bit) ASCII represent?", "128", ["256", "127", "65 536"], { t: true }],
  ["How many characters can extended (8-bit) ASCII represent?", "256", ["128", "512", "1024"], { t: true }],
  ["Why was Unicode introduced?", "ASCII could not represent characters from many languages or emojis", ["ASCII used too many bits", "Unicode is faster to type", "ASCII could not store numbers"]],
  ["Up to how many bits per character can Unicode use?", "32", ["7", "8", "64"], { t: ["thirty-two", "32 bits"] }],
  ["Which character set can represent emojis?", "Unicode", ["ASCII", "Extended ASCII", "Binary-coded decimal"], { t: true }],
  ["Why does a text file stored in Unicode usually take more space than in ASCII?", "Unicode uses more bits per character", ["Unicode stores pictures of each letter", "Unicode adds a check digit to each letter", "Unicode files are not compressed"]],
  ["The first 128 Unicode characters are…", "the same as ASCII", ["all emojis", "Chinese characters", "control codes only"]],
  ["The ASCII code for 'A' is 65. What is the code for 'D'?", "68", ["67", "69", "100"], { t: true }],
  ["The ASCII code for 'a' is 97. What is the code for 'c'?", "99", ["98", "67", "100"], { t: true }],
  ["How much bigger is the ASCII code of a lowercase letter than its uppercase letter?", "32", ["26", "1", "64"], { t: true }],
  ["The ASCII code for 'A' is 65. What is the code for 'a'?", "97", ["66", "91", "33"], { t: true }],
  ["Is the character '5' stored with the same code as the number 5?", "No — the character '5' has its own character code (53 in ASCII)", ["Yes, always", "Only in Unicode", "Only in extended ASCII"]],
  ["Which is an advantage of ASCII over Unicode?", "It uses fewer bits per character, so text files are smaller", ["It supports every language", "It includes emojis", "It has over a million characters"]],
  ["Which is an advantage of Unicode over ASCII?", "It can represent characters from all the world's languages", ["It uses fewer bits per character", "It only needs 7 bits", "It cannot be changed"]],
  ["A computer user in Vietnam wants to type messages with accented letters and emojis. Which character set is needed?", "Unicode", ["7-bit ASCII", "Hexadecimal", "Binary-coded decimal"], { t: true }]
],

"1.5a": [
  ["Natural sound is an example of…", "analogue data", ["digital data", "binary data", "hexadecimal data"]],
  ["What does 'sampling' a sound mean?", "Measuring the amplitude of the sound wave at regular time intervals", ["Recording the sound twice", "Removing background noise", "Converting sound to text"]],
  ["What is the sample rate?", "The number of samples taken per second", ["The number of bits used for each sample", "The length of the recording", "The volume of the sound"]],
  ["What is the sample resolution?", "The number of bits used to store each sample", ["The number of samples per second", "The number of speakers used", "The size of the file in bytes"]],
  ["Sample rate is measured in…", "hertz (Hz)", ["bits", "bytes", "pixels"], { t: ["hz", "hertz"] }],
  ["What is the amplitude of a sound wave related to?", "Its height — how loud the sound is", ["How long the sound lasts", "The number of samples", "The type of microphone"]],
  ["What happens to a recording when the sample rate is increased?", "It is more accurate and the file size increases", ["It is less accurate and the file is smaller", "Nothing changes", "Only the file size changes"]],
  ["What happens to a recording when the sample resolution is increased?", "Each sample is stored more precisely, so accuracy and file size increase", ["Fewer samples are taken each second", "The file becomes smaller", "The sound gets louder"]],
  ["Which device converts sound into an electrical signal?", "A microphone", ["A speaker", "An actuator", "A DAC"], { t: true }],
  ["What converts the microphone's analogue signal into digital data?", "An analogue-to-digital converter (ADC)", ["A digital-to-analogue converter (DAC)", "A compiler", "A router"], { t: ["ADC", "analogue to digital converter"] }],
  ["CD-quality sound uses a sample rate of…", "44 100 Hz", ["8000 Hz", "100 Hz", "1 000 000 Hz"]],
  ["A sample resolution of 16 bits allows how many different amplitude values?", "65 536", ["16", "256", "32"], { e: "2¹⁶ = 65 536." }],
  ["Why can a digital recording never be a perfect copy of the original sound?", "Samples are only taken at intervals, so values between samples are not recorded", ["Digital data is always compressed", "Microphones can't hear quiet sounds", "Binary can't store negative numbers"]],
  ["Which is a disadvantage of using a very high sample rate?", "The file size is much larger", ["The sound is less accurate", "The sound plays more slowly", "The sound becomes mono"]]
],

"1.5b": [
  ["Which formula gives the size of a sound file in bits?", "sample rate × sample resolution × length in seconds", ["sample rate + resolution + length", "sample rate ÷ resolution × length", "length × 8 ÷ sample rate"]],
  ["To change a file size from bits to bytes you…", "divide by 8", ["multiply by 8", "divide by 1024", "multiply by 1024"]],
  ["When calculating sound file sizes in IGCSE, which value is used to convert bytes to KiB?", "1024", ["1000", "8", "100"], { t: true }],
  ["A sound is recorded in stereo instead of mono. What happens to the file size?", "It doubles", ["It halves", "It stays the same", "It increases by 8 bits"]],
  ["Before using the sound file size formula, a track length of 3 minutes must be converted to…", "180 seconds", ["3 seconds", "300 seconds", "0.05 hours"], { t: ["180"] }],
  ["If the sample rate is halved and everything else stays the same, the file size…", "halves", ["doubles", "stays the same", "quarters"]]
],

"1.6a": [
  ["What is a pixel?", "The smallest element of a bitmap image — one coloured dot", ["A unit of storage equal to 8 bits", "A type of compression", "A vector shape"], { t: false }],
  ["What is image resolution?", "The number of pixels in the image (width × height)", ["The number of bits per pixel", "The size of the printed image in cm", "The number of colours"]],
  ["What is colour depth?", "The number of bits used to represent the colour of each pixel", ["The number of pixels in the image", "How bright the image is", "The number of colours on the screen at once"]],
  ["How many colours can be represented with a colour depth of 8 bits?", "256", ["8", "16", "64"], { t: true }],
  ["How many colours can be represented with a colour depth of 1 bit?", "2", ["1", "4", "8"], { t: ["two"] }],
  ["How many colours can be represented with a colour depth of 24 bits?", "16 777 216", ["24", "256", "65 536"]],
  ["What happens to an image when its resolution is increased?", "It has more detail and a larger file size", ["It has fewer colours", "Its file size decreases", "It becomes pixelated"]],
  ["What happens to an image when its colour depth is increased?", "More colours can be shown and the file size increases", ["The image has more pixels", "The file size decreases", "The image becomes black and white"]],
  ["A low-resolution image is enlarged. What does it look like?", "Pixelated — the individual squares can be seen", ["Sharper", "More colourful", "Exactly the same"]],
  ["What number of bits per pixel is needed for 16 colours?", "4", ["16", "8", "2"], { t: ["four"], e: "2⁴ = 16." }],
  ["Why is a real image file usually a bit larger than the calculated size?", "It also stores metadata such as the width, height and colour depth", ["The computer adds extra pixels", "Images are always stored twice", "The calculation uses 1000 instead of 1024"]],
  ["Which statement is correct?", "The file size and quality of an image increase as resolution and colour depth increase", ["Higher resolution always makes the file smaller", "Colour depth has no effect on file size", "Resolution is the number of bits per pixel"]],
  ["Which type of image is made of pixels?", "Bitmap", ["Vector", "Flowchart", "Spreadsheet"], { t: true }],
  ["An image has a colour depth of 2 bits. How many different colours can it contain?", "4", ["2", "8", "16"], { t: ["four"] }]
],

"1.6b": [
  ["Which formula gives the size of a bitmap image in bits?", "width × height × colour depth", ["width + height + colour depth", "width × height ÷ colour depth", "width × height × 8"]],
  ["An image's colour depth is doubled from 8 to 16 bits. What happens to the file size?", "It doubles", ["It halves", "It is multiplied by 4", "It stays the same"]],
  ["An image's width and height are both doubled. What happens to the file size?", "It is multiplied by 4", ["It doubles", "It stays the same", "It is multiplied by 8"]],
  ["What must you do with the answer in bits to give an image size in bytes?", "Divide by 8", ["Multiply by 8", "Divide by 1024", "Divide by 1000"]]
],

"1.7a": [
  ["Which list is in order from smallest to largest?", "bit, nibble, byte, KiB, MiB, GiB", ["byte, bit, nibble, KiB, GiB, MiB", "nibble, bit, byte, MiB, KiB, GiB", "bit, byte, nibble, KiB, MiB, GiB"]],
  ["How many bytes are in a kibibyte (KiB)?", "1024", ["1000", "8", "1048"], { t: true }],
  ["How many mebibytes are in a gibibyte?", "1024", ["1000", "100", "8"], { t: true }],
  ["How many gibibytes are in a tebibyte?", "1024", ["1000", "512", "2048"], { t: true }],
  ["Which unit is 1024 tebibytes?", "Pebibyte (PiB)", ["Exbibyte (EiB)", "Gibibyte (GiB)", "Mebibyte (MiB)"], { t: ["pebibyte", "PiB"] }],
  ["Which unit is 1024 pebibytes?", "Exbibyte (EiB)", ["Tebibyte (TiB)", "Zettabyte", "Gibibyte (GiB)"], { t: ["exbibyte", "EiB"] }],
  ["Which is the largest unit in the IGCSE list?", "Exbibyte (EiB)", ["Pebibyte (PiB)", "Tebibyte (TiB)", "Gibibyte (GiB)"]],
  ["Which unit is 4 bits?", "Nibble", ["Byte", "Bit", "Kibibyte"], { t: true }],
  ["To convert from a smaller unit to a larger unit, you…", "divide", ["multiply", "add 1024", "subtract 8"], { t: true }],
  ["To convert from a larger unit to a smaller unit, you…", "multiply", ["divide", "add 8", "subtract 1024"], { t: true }],
  ["In IGCSE calculations, which number must be used between units from bytes upwards?", "1024", ["1000", "100", "8"], { t: true }],
  ["Why does a new '1 TB' hard drive show less than 1 TiB of space on a computer?", "The manufacturer counts 1000 bytes per KB but the computer uses 1024", ["Part of it is broken", "It stores the operating system twice", "Hard drives always lose 10%"]],
  ["What does the 'bi' in kibibyte and mebibyte tell you?", "The unit is based on powers of 2 (1024)", ["The unit is two bytes", "The unit uses binary-coded decimal", "The unit is bidirectional"]]
],

"1.7b": [
  ["What is the purpose of data compression?", "To reduce the size of a file", ["To increase the quality of a file", "To encrypt a file", "To check a file for errors"]],
  ["Which is a benefit of compressing a file?", "Less storage space is required", ["The file is encrypted", "The file quality always improves", "The file can't be copied"]],
  ["Why does compression reduce transmission time?", "There is less data to send", ["It makes the network faster", "It removes errors", "It sends the data in parallel"]],
  ["Compressed files need less ___ to send over a network.", "bandwidth", ["resolution", "colour depth", "voltage"], { t: true }],
  ["Which of these is a reason a video streaming service compresses its videos?", "So they can be streamed quickly using less bandwidth", ["So they can't be watched offline", "To make them higher resolution", "To add subtitles"]],
  ["A student can't email a 30 MiB photo because the limit is 10 MiB. What could they do?", "Compress the photo before sending it", ["Increase the colour depth", "Change the file name", "Send it in stereo"]],
  ["Which is NOT a benefit of compression?", "The file is automatically backed up", ["Shorter upload and download times", "Less storage space needed", "Less bandwidth needed"]],
  ["Why might a company that stores files in the cloud compress them?", "To reduce storage costs, as they pay for the space used", ["To make files harder to open", "To make them load more slowly", "To check them for viruses"]]
],

"1.7c": [
  ["What is lossy compression?", "Compression that permanently removes some data to reduce file size", ["Compression where no data is lost", "Compression that encrypts data", "Compression that adds a check digit"]],
  ["What is lossless compression?", "Compression that reduces file size without permanently losing any data", ["Compression that deletes unneeded data", "Compression that lowers the resolution", "Compression only used for music"]],
  ["Which is an example of lossless compression?", "Run-length encoding (RLE)", ["Reducing the colour depth", "Reducing the sample rate", "Perceptual music shaping"]],
  ["Which method is a type of lossy compression for images?", "Reducing the resolution or colour depth", ["Run-length encoding", "Adding a parity bit", "Using Unicode"]],
  ["Which method is a type of lossy compression for sound?", "Reducing the sample rate or sample resolution", ["Run-length encoding", "Adding a checksum", "Converting to hexadecimal"]],
  ["Which file type should be compressed using lossless compression?", "A text document or program code", ["A holiday photo for social media", "A music track for streaming", "A video for a website"], { e: "Losing even one character of text or code would change its meaning." }],
  ["Why must a medical X-ray image use lossless compression?", "Any lost detail could lead to a wrong diagnosis", ["Lossy files can't be printed", "Lossless files are smaller", "X-rays are always black and white"]],
  ["How does run-length encoding (RLE) work?", "It replaces a run of identical data with one copy of the data and a count", ["It removes data humans can't see", "It reduces the number of pixels", "It sorts the data into order"]],
  ["When is RLE NOT effective?", "When the data has very few repeated values in a row", ["When the data has long runs of the same value", "When the image has large areas of one colour", "When the file is a black-and-white image"]],
  ["Which file formats normally use lossy compression?", "JPEG and MP3", ["PNG and ZIP", "TXT and CSV", "FLAC and GIF"]],
  ["Which file formats normally use lossless compression?", "PNG and ZIP", ["JPEG and MP3", "MP4 and MP3", "JPEG and MP4"]],
  ["Perceptual music shaping removes…", "sounds that the human ear can't hear or that are drowned out by louder sounds", ["every other sample", "all the bass notes", "the left channel"]],
  ["Can the original file be rebuilt exactly after lossy compression?", "No", ["Yes", "Only for images", "Only if it was stereo"], { t: true }],
  ["Can the original file be rebuilt exactly after lossless compression?", "Yes", ["No", "Only for sound", "Only on the same computer"], { t: true }],
  ["Which compression type usually gives the bigger reduction in file size?", "Lossy", ["Lossless", "They are always the same", "RLE"], { t: true }]
]
});
