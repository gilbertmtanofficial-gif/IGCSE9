/* Question bank — Chapter 4 Hardware */
window.BANK = window.BANK || {};
Object.assign(window.BANK, {

"4.1a": [
  ["What is the role of the CPU?", "To process instructions and data that are input into the computer so that the result can be output", ["To store files permanently", "To display images on the screen", "To connect the computer to the internet"]],
  ["What is a microprocessor?", "An integrated circuit on a single chip that does the job of a CPU", ["A very small hard drive", "A program that controls the CPU", "A type of RAM"]],
  ["What does CPU stand for?", "Central processing unit", ["Computer processing unit", "Central program unit", "Control processing utility"], { t: ["central processing unit"] }],
  ["Which of these is the CPU NOT responsible for?", "Storing files permanently when the computer is off", ["Executing program instructions", "Carrying out calculations", "Controlling the flow of data"]],
  ["A microprocessor is a type of…", "integrated circuit", ["hard disk", "sensor", "operating system"], { t: true }]
],

"4.1b": [
  ["In Von Neumann architecture, where are programs and data stored?", "Together in the same memory", ["In separate memories", "Only in the CPU registers", "Only on the hard disk"]],
  ["What is the role of the control unit (CU)?", "It decodes instructions and sends control signals to coordinate the other components", ["It carries out calculations", "It stores the results of calculations", "It holds the address of the next instruction"]],
  ["What is the role of the arithmetic logic unit (ALU)?", "It carries out calculations and logical operations", ["It decodes instructions", "It stores the next instruction's address", "It sends data to memory"]],
  ["Which register holds the address of the next instruction to be fetched?", "Program counter (PC)", ["Memory address register (MAR)", "Memory data register (MDR)", "Accumulator (ACC)"], { t: ["PC", "program counter"] }],
  ["Which register holds the address of the memory location about to be read from or written to?", "Memory address register (MAR)", ["Program counter (PC)", "Current instruction register (CIR)", "Memory data register (MDR)"], { t: ["MAR", "memory address register"] }],
  ["Which register holds the data or instruction just fetched from memory (or about to be written)?", "Memory data register (MDR)", ["Memory address register (MAR)", "Program counter (PC)", "Accumulator (ACC)"], { t: ["MDR", "memory data register"] }],
  ["Which register holds the instruction currently being decoded and executed?", "Current instruction register (CIR)", ["Program counter (PC)", "Memory data register (MDR)", "Memory address register (MAR)"], { t: ["CIR", "current instruction register"] }],
  ["Which register temporarily stores the results of calculations done by the ALU?", "Accumulator (ACC)", ["Program counter (PC)", "Memory address register (MAR)", "Current instruction register (CIR)"], { t: ["ACC", "accumulator"] }],
  ["Which bus carries memory addresses from the CPU to memory?", "Address bus", ["Data bus", "Control bus", "USB"], { t: true }],
  ["Which bus carries data and instructions between the CPU and memory?", "Data bus", ["Address bus", "Control bus", "Serial bus"], { t: true }],
  ["Which bus carries signals such as 'read', 'write' and clock pulses?", "Control bus", ["Address bus", "Data bus", "Instruction bus"], { t: true }],
  ["Which bus is unidirectional (one way only)?", "Address bus", ["Data bus", "Control bus", "All of them"], { t: true }],
  ["Which buses are bidirectional (two way)?", "Data bus and control bus", ["Address bus and data bus", "Only the address bus", "Address bus and control bus"]],
  ["What is a register?", "A very small, very fast memory location inside the CPU", ["A part of the hard disk", "A list of all users", "A type of bus"]],
  ["Why is the address bus one way only?", "The CPU sends addresses to memory, but memory never needs to send an address back", ["It is too thin to carry data both ways", "Addresses are encrypted", "It only carries clock signals"]]
],

"4.2a": [
  ["What are the three stages of the processor cycle?", "Fetch, decode, execute", ["Input, process, output", "Read, write, store", "Load, run, save"]],
  ["At the start of the fetch stage, the address in the PC is copied to the…", "MAR", ["MDR", "CIR", "ACC"], { t: ["memory address register"] }],
  ["During the fetch stage, the instruction travels from memory to the MDR along the…", "data bus", ["address bus", "control bus", "USB"], { t: true }],
  ["During the fetch stage, the instruction is copied from the MDR to the…", "CIR", ["PC", "MAR", "ALU"], { t: ["current instruction register"] }],
  ["What happens to the program counter during the fetch stage?", "It is incremented so it points to the next instruction", ["It is reset to 0", "It stores the result", "Nothing happens to it"]],
  ["Which component decodes the instruction?", "The control unit", ["The ALU", "The MDR", "The address bus"], { t: ["CU", "control unit"] }],
  ["During the execute stage, a calculation is carried out by the…", "ALU", ["CU", "MAR", "PC"], { t: ["arithmetic logic unit"] }],
  ["What is the correct order of the fetch stage?", "PC → MAR → memory → MDR → CIR", ["MDR → PC → CIR → MAR", "CIR → MDR → MAR → PC", "MAR → PC → CIR → MDR"]],
  ["Where are instructions fetched from during the FDE cycle?", "RAM (main memory)", ["The hard disk", "The keyboard", "ROM only"]],
  ["Which signal is sent along the control bus when the CPU wants to fetch an instruction?", "A read signal", ["A write signal", "An interrupt", "A clock reset"]]
],

"4.2b": [
  ["What is the clock speed of a CPU?", "The number of FDE cycles (pulses) the CPU carries out per second", ["The time on the computer's clock", "The speed of the fan", "The number of cores"]],
  ["A CPU has a clock speed of 3.2 GHz. What does this mean?", "It carries out 3.2 billion cycles per second", ["It has 3.2 cores", "It has 3.2 GiB of cache", "It runs for 3.2 hours"]],
  ["What is a core?", "An independent processing unit inside the CPU with its own ALU, CU and registers", ["A type of memory", "The centre of a hard disk", "A part of the power supply"]],
  ["What is cache?", "A small amount of very fast memory inside or close to the CPU that stores frequently used data and instructions", ["The main memory of the computer", "Secondary storage on a hard disk", "A type of bus"]],
  ["Why does more cache improve performance?", "The CPU can get frequently used data from fast cache instead of slower RAM", ["Cache makes the clock faster", "Cache adds more cores", "Cache stores files permanently"]],
  ["Why does a higher clock speed improve performance?", "More instructions can be processed per second", ["The CPU uses less power", "More data can be stored", "The screen refreshes faster"]],
  ["Why does doubling the number of cores not always double the speed?", "Software must be written to use all the cores, and cores spend time communicating", ["Cores can't run at the same time", "Each core is half the speed", "Cores share one register"]],
  ["What is a risk of increasing the clock speed too much (overclocking)?", "The CPU can overheat and the computer can become unstable", ["It reduces the amount of RAM", "It deletes the cache", "It turns off the cores"]],
  ["Which three factors affect CPU performance in the IGCSE syllabus?", "Clock speed, number of cores and cache size", ["Screen size, keyboard and mouse", "RAM colour, case size and fan", "Hard disk, printer and speakers"]],
  ["Computer A: 2.0 GHz, quad-core. Computer B: 2.0 GHz, dual-core. Running software designed for many cores, which is likely to be faster?", "Computer A", ["Computer B", "They are exactly the same", "Neither will work"], { t: ["A"] }],
  ["Clock speed is measured in…", "hertz (e.g. GHz)", ["bytes", "pixels", "bits per pixel"]]
],

"4.3a": [
  ["What is an instruction set?", "The list of all the commands (machine code instructions) that a CPU can process", ["The list of programs installed on a computer", "A set of rules for writing pseudocode", "The menu of an operating system"]],
  ["Instruction-set commands are in…", "machine code", ["Python", "pseudocode", "HTML"], { t: ["binary", "machine code"] }],
  ["In a machine-code instruction, what does the opcode tell the CPU?", "Which operation to carry out (e.g. ADD, LOAD)", ["The address of the next instruction", "The colour of the output", "The speed of the clock"]],
  ["In a machine-code instruction, what is the operand?", "The data or address that the operation uses", ["The type of operation", "The name of the program", "The amount of cache"]],
  ["Why won't a program compiled for one type of CPU always run on another type?", "Different CPU families have different instruction sets", ["Each CPU has a different screen", "Programs only run once", "CPUs use different alphabets"]],
  ["When the CPU decodes an instruction, what does it use to work out what the instruction means?", "Its instruction set", ["The operating system's file manager", "The cache", "The keyboard"]]
],

"4.3b": [
  ["What is an embedded system?", "A computer system built into a device to perform a dedicated function", ["A general-purpose computer such as a laptop", "A program that runs in a web browser", "A type of secondary storage"]],
  ["Which of these is an embedded system?", "The controller in a washing machine", ["A desktop PC", "A laptop", "A games console used for many tasks"]],
  ["How is an embedded system different from a general-purpose computer?", "It performs one dedicated function rather than many different functions", ["It has no processor", "It can't use sensors", "It has a larger screen"]],
  ["Which is an advantage of embedded systems?", "They are small, cheap to produce and use little power", ["They are easy to upgrade", "They can do any task", "They can't be hacked"]],
  ["Which is a disadvantage of embedded systems?", "They are difficult to upgrade or repair", ["They are very large", "They use lots of power", "They are expensive to mass-produce"]],
  ["Which of these devices is LEAST likely to be an embedded system?", "A personal computer", ["A microwave oven", "A car's anti-lock braking system", "A vending machine"]],
  ["Where are the instructions of an embedded system usually stored?", "In ROM or flash memory, so they are not lost when the power is off", ["On a DVD", "In the cloud only", "In the user's head"]],
  ["Give a reason why an embedded system connected to the internet could be a risk.", "It could be hacked", ["It would run too fast", "It would use too little power", "It would need a keyboard"]],
  ["Which of these is an example of an embedded system?", "A security alarm system", ["A spreadsheet", "A web browser", "A word processor"]],
  ["A smart thermostat that you control from a phone app is an example of…", "an embedded system", ["a general-purpose computer", "a compiler", "a 3D scanner"], { t: ["embedded system", "embedded"] }]
],

"4.4a": [
  ["What is an input device?", "Hardware that lets data be entered into a computer, converting it into digital data", ["Hardware that shows the results of processing", "Software that controls hardware", "A device that stores data permanently"]],
  ["Why is an input device needed?", "To convert real-world data into a digital form the computer can process", ["To display output to the user", "To store programs", "To cool the CPU"]],
  ["How does an optical mouse detect movement?", "An LED lights the surface and a sensor takes many images per second, which are compared to find the movement", ["A rubber ball rolls over two rollers", "It uses GPS", "It measures air pressure"]],
  ["How does a keyboard send a key press to the computer?", "Pressing a key completes a circuit; a chip works out which key and sends its character code", ["It sends a photo of the key", "It sends sound waves", "It sends the key's colour"]],
  ["How does a microphone capture sound?", "Sound vibrates a diaphragm, which creates an electrical signal that is converted to digital", ["It takes photos of sound", "It uses a laser", "It measures temperature"]],
  ["How does a resistive touch screen detect a touch?", "Pressing pushes two layers together, completing a circuit at that point", ["A finger changes the electric field", "A finger breaks infra-red beams", "A camera watches the finger"]],
  ["How does a capacitive touch screen detect a touch?", "A finger, which conducts electricity, changes the capacitance at that point", ["Two layers are pressed together", "A finger breaks a laser beam", "It weighs the finger"]],
  ["How does an infra-red touch screen detect a touch?", "The finger breaks a grid of infra-red beams, and the broken beams give the position", ["Two layers touch", "The finger changes the capacitance", "It listens for a tap"]],
  ["Which type of touch screen works with a gloved hand and is cheap, but needs pressure?", "Resistive", ["Capacitive", "Infra-red", "OLED"], { t: true }],
  ["Which type of touch screen is used in most smartphones because it is very responsive and supports multi-touch?", "Capacitive", ["Resistive", "Infra-red", "Pressure"], { t: true }],
  ["Which type of touch screen is good for very large screens and works with any object?", "Infra-red", ["Resistive", "Capacitive", "Magnetic"], { t: ["infrared"] }],
  ["Why might an optical mouse not work well on a glass table?", "The sensor can't detect enough surface texture in the images", ["Glass blocks Bluetooth", "Glass is too cold", "The ball slips"]],
  ["Which of these is an input device?", "Microphone", ["Speaker", "Actuator", "Inkjet printer"], { t: true }],
  ["Which is a disadvantage of a keyboard?", "It is slow for entering large amounts of data and can cause RSI", ["It can't enter numbers", "It needs the internet", "It can only type capital letters"]]
],

"4.4b": [
  ["What is an output device?", "Hardware that takes processed data from the computer and presents it in a form the user can understand or use", ["Hardware that enters data into a computer", "A device that stores data permanently", "Software that translates code"]],
  ["Why is an output device needed?", "So the results of processing can be seen, heard or used", ["To enter data", "To store the operating system", "To speed up the CPU"]],
  ["Which of these is an output device?", "Speaker", ["Microphone", "Barcode scanner", "Keyboard"], { t: true }],
  ["Which of these is an output device?", "Actuator", ["Sensor", "QR code scanner", "Optical mouse"], { t: true }],
  ["Which of these is NOT an output device?", "2D scanner", ["LCD screen", "Laser printer", "DLP projector"]],
  ["A touch screen is both…", "an input and an output device", ["only an input device", "only an output device", "a storage device"]]
],

"4.5a": [
  ["Which device would a library use to read the numbers on book labels quickly at the desk?", "A barcode scanner", ["A 3D scanner", "A microphone", "A DLP projector"]],
  ["Which device could scan a broken part so it can be reproduced with a 3D printer?", "A 3D scanner", ["A barcode scanner", "A 2D scanner", "An optical mouse"]],
  ["Which code could store a website address that a customer scans with a phone?", "A QR code", ["A barcode", "A check digit", "A MAC address"], { t: true }],
  ["Why are 1D barcodes still used in supermarkets?", "They are cheap to print and quick to scan for a short product number", ["They hold more data than QR codes", "They can't be scanned", "They store photos of the product"]],
  ["How does a barcode scanner read a barcode?", "Light is shone on the barcode; dark lines reflect less light, and sensors detect the pattern", ["It takes a high-resolution photo and uses OCR", "It weighs the product", "It reads a magnetic strip"]],
  ["After a barcode is scanned, how is the scan checked for errors?", "The check digit is recalculated and compared", ["The cashier reads it aloud", "A parity bit is added", "It is scanned three times"]],
  ["What is stored in a supermarket's database for each barcode number?", "Details such as the product name, price and stock level", ["The customer's name", "A photo of the barcode", "The barcode's colour"]],
  ["Why can a QR code hold more data than a barcode?", "It is a two-dimensional matrix of squares rather than one row of lines", ["It is printed larger", "It uses colour", "It has a longer check digit"]],
  ["What are the three large squares in the corners of a QR code for?", "To help the scanner find the code and its orientation", ["To store the price", "Decoration only", "To encrypt the data"]],
  ["Which is an advantage of QR codes over barcodes?", "They can be read from any angle and hold more data", ["They can't be copied", "They never link to websites", "They don't need a camera"]],
  ["Which is a risk of QR codes?", "A malicious QR code can link to a fake website (attagging)", ["They can damage the camera", "They delete phone data automatically", "They only work in daylight"]],
  ["In a digital camera, what converts light into electrical signals?", "An image sensor (CCD or CMOS) made of light-sensitive cells", ["The lens", "The memory card", "The flash"]],
  ["What decides the maximum resolution of a digital camera?", "The number of light-sensitive cells (pixels) on the image sensor", ["The size of the memory card", "The brightness of the flash", "The battery life"]],
  ["What is a 2D scanner used for?", "Turning flat documents or photos into digital images", ["Making 3D models of solid objects", "Reading magnetic strips", "Measuring temperature"]],
  ["What software can turn a scanned image of text into editable text?", "OCR (optical character recognition)", ["A compiler", "An antivirus", "A spreadsheet"], { t: ["OCR", "optical character recognition"] }],
  ["What is a 3D scanner used for?", "Scanning solid objects to produce a three-dimensional digital model", ["Scanning flat paper documents", "Reading QR codes", "Printing objects layer by layer"]],
  ["Which of these is an example of a 3D scanner?", "A CT scanner in a hospital", ["A barcode reader", "A webcam", "A photocopier"]],
  ["Which input device would an airport use to read the data page of a passport?", "A 2D scanner", ["A 3D printer", "A microphone", "An accelerometer"]],
  ["Which is a disadvantage of barcode scanners?", "Damaged or dirty barcodes may not scan", ["They are slower than typing", "They can't read numbers", "They need a 3D printer"]]
],

"4.6a": [
  ["Which screen technology needs a backlight because its pixels don't give out their own light?", "LCD", ["LED (OLED)", "DLP", "Laser"], { t: true }],
  ["A school hall needs a projector with high contrast that is small and light. Which type is best?", "DLP projector", ["LCD projector", "Inkjet projector", "3D projector"]],
  ["Which is a disadvantage of LCD projectors?", "Lower contrast, so blacks can look grey", ["They have no colours", "They use micromirrors that break easily", "They can't show video"]],
  ["Why does an LCD screen need a backlight?", "The liquid crystals don't produce light themselves", ["To keep the screen warm", "To make the pixels bigger", "To save power"]],
  ["What is usually used as the backlight in modern LCD screens?", "LEDs", ["Candles", "Lasers", "CRT tubes"], { t: ["LED", "light emitting diodes"] }],
  ["In a true LED screen, how is light produced?", "Each pixel is made of LEDs that produce their own light", ["A single bulb behind the screen", "Liquid crystals glow", "A laser scans the screen"]],
  ["Which is an advantage of LED backlighting?", "It reaches full brightness quickly and uses less power", ["It makes the screen heavier", "It produces more heat", "It needs warming up"]],
  ["How does a DLP projector create an image?", "It uses millions of tiny micromirrors that tilt to make each pixel light or dark, with a colour wheel", ["It uses three LCD panels", "It uses a printer drum", "It uses ink droplets"]],
  ["How does an LCD projector create an image?", "Light is split into red, green and blue and passed through three LCD panels, then combined", ["Using tilting micromirrors", "Using a spinning platter", "Using a laser and toner"]],
  ["Which projector generally gives higher contrast and deeper blacks?", "DLP projector", ["LCD projector", "Both are identical", "Neither"], { t: ["DLP"] }],
  ["Which projector generally gives brighter, more saturated colours?", "LCD projector", ["DLP projector", "Both are identical", "Neither"], { t: ["LCD"] }],
  ["What does LCD stand for?", "Liquid crystal display", ["Light colour diode", "Large computer display", "Liquid colour diode"], { t: ["liquid crystal display"] }],
  ["What does LED stand for?", "Light emitting diode", ["Liquid electronic display", "Large electric diode", "Light energy display"], { t: ["light emitting diode"] }],
  ["What does DLP stand for?", "Digital light processing", ["Digital laser printer", "Direct light projector", "Data link protocol"], { t: ["digital light processing"] }]
],

"4.6b": [
  ["What is an actuator?", "An output device that creates physical movement, such as a motor or valve", ["An input device that measures temperature", "A type of storage", "A screen"]],
  ["Which of these is an example of an actuator?", "A motor that opens a greenhouse window", ["A temperature sensor", "A keyboard", "An SSD"]],
  ["In a speaker, what converts the digital sound data into an analogue signal?", "A digital-to-analogue converter (DAC)", ["An analogue-to-digital converter (ADC)", "A compiler", "An actuator"], { t: ["DAC", "digital to analogue converter"] }],
  ["How does a speaker produce sound?", "A changing current in a coil near a magnet makes a cone vibrate, creating sound waves", ["A laser vibrates the air", "Liquid crystals vibrate", "The CPU vibrates"]],
  ["In a control system, which device actually switches on the heater?", "An actuator", ["The sensor", "The ADC", "The keyboard"], { t: true }],
  ["Which of these is an actuator?", "A solenoid that locks a door", ["A light sensor", "A QR code scanner", "A microphone"]]
],

"4.7a": [
  ["Which printer forms a 3D object by melting plastic filament through a heated nozzle?", "3D printer", ["Laser printer", "Inkjet printer", "DLP projector"], { t: true }],
  ["Which part of a laser printer is scanned by the laser?", "The drum", ["The paper", "The fuser", "The ink cartridge"], { t: ["drum", "printing drum"] }],
  ["Why might an inkjet printer be chosen for a small home office?", "It is cheap to buy and can print good-quality colour", ["It is the cheapest per page for thousands of pages", "It prints solid objects", "It needs no ink"]],
  ["In a piezoelectric inkjet printer, what forces the ink droplet out?", "A crystal that vibrates when a current is applied", ["A heated bubble", "A laser", "A charged drum"]],
  ["How does an inkjet printer put ink on the paper?", "A print head fires tiny droplets of liquid ink through nozzles", ["A laser melts toner onto the paper", "A drum rolls powder onto the paper", "Pins strike an ink ribbon"]],
  ["What are the two ways an inkjet printer forms ink droplets?", "Thermal bubble and piezoelectric", ["Laser and toner", "Magnetic and optical", "Static and dynamic"]],
  ["In a laser printer, what is the drum given at the start?", "A positive charge", ["A coat of ink", "A layer of plastic", "A negative magnetic field"]],
  ["In a laser printer, what does the laser do?", "Removes the positive charge from parts of the drum, leaving an electrostatic image of the page", ["Burns the text into the paper", "Melts the plastic", "Scans the document"]],
  ["What is toner?", "A powdered ink used in laser printers", ["A liquid ink used in inkjet printers", "A plastic filament", "A type of paper"]],
  ["What does the fuser in a laser printer do?", "Uses heat to melt the toner onto the paper", ["Charges the drum", "Cuts the paper", "Cools the printer"]],
  ["Which printer is best for printing 500 copies of a newsletter quickly?", "Laser printer", ["Inkjet printer", "3D printer", "Dot matrix"], { t: ["laser"] }],
  ["Which printer is best for a few high-quality colour photos at home?", "Inkjet printer", ["Laser printer", "3D printer", "Plotter"], { t: ["inkjet"] }],
  ["How does a 3D printer make an object?", "By building it up layer by layer from a digital design", ["By carving a block of material", "By printing a picture of it", "By scanning it"]],
  ["Making an object by adding layers of material is called…", "additive manufacturing", ["subtractive manufacturing", "compression", "rendering"], { t: true }],
  ["Which software is used to design objects for 3D printing?", "CAD (computer-aided design)", ["A spreadsheet", "A web browser", "An antivirus"], { t: ["CAD", "computer aided design"] }],
  ["Which is a use of 3D printing?", "Making custom prosthetic limbs", ["Printing exam papers", "Displaying a presentation", "Storing photos"]],
  ["Why does a laser printer store the whole page in memory before printing?", "The whole page is printed in one go as the drum turns", ["To scan it for viruses", "To compress it", "To translate it into Python"]],
  ["Which is a disadvantage of inkjet printers?", "Ink cartridges run out quickly and are expensive per page", ["They are very expensive to buy", "They can't print colour", "They are too fast"]],
  ["Which is a disadvantage of laser printers?", "They are expensive to buy and toner dust can be a health hazard", ["They can only print photos", "They are slower than inkjets", "They can't print text"]]
],

"4.8a": [
  ["What is a sensor?", "An input device that measures a physical property of the environment", ["An output device that creates movement", "A processor that makes decisions", "A type of storage"]],
  ["Most sensors produce analogue data. What must happen before a computer can use it?", "It must be converted to digital using an ADC", ["It must be printed", "It must be encrypted", "Nothing — computers use analogue"]],
  ["Does a sensor decide when to switch on a heater?", "No — it only sends data; the microprocessor decides", ["Yes, sensors make decisions", "Only temperature sensors do", "Only in greenhouses"]],
  ["Which sensor measures how much water vapour is in the air?", "Humidity", ["Moisture", "Level", "Flow"], { t: ["humidity sensor"] }],
  ["Which sensor measures the water content of soil?", "Moisture", ["Humidity", "pH", "Level"], { t: ["moisture sensor"] }],
  ["Which sensor measures acidity or alkalinity?", "pH", ["Gas", "Moisture", "Light"], { t: ["ph sensor"] }],
  ["Which sensor measures changes in speed or direction, or tilt?", "Accelerometer", ["Proximity", "Pressure", "Flow"], { t: true }],
  ["Which sensor measures sound levels?", "Acoustic", ["Infra-red", "Pressure", "Magnetic field"], { t: ["acoustic sensor", "sound sensor"] }],
  ["Which sensor measures the rate at which a liquid or gas moves through a pipe?", "Flow", ["Level", "Pressure", "Humidity"], { t: ["flow sensor"] }],
  ["Which sensor measures how full a tank is?", "Level", ["Flow", "Pressure", "Proximity"], { t: ["level sensor"] }],
  ["Which sensor detects heat from a body or a broken invisible beam?", "Infra-red", ["Light", "Acoustic", "Gas"], { t: ["infrared", "infra-red sensor"] }],
  ["Which sensor detects how close an object is without touching it?", "Proximity", ["Pressure", "Level", "Accelerometer"], { t: ["proximity sensor"] }],
  ["Which sensor detects changes in a magnetic field?", "Magnetic field", ["Acoustic", "Light", "Pressure"], { t: ["magnetic", "magnetic field sensor"] }],
  ["Which sensor measures the amount of carbon dioxide in a greenhouse?", "Gas", ["Humidity", "Moisture", "Light"], { t: ["gas sensor"] }],
  ["Which sensor measures brightness?", "Light", ["Infra-red", "Proximity", "Acoustic"], { t: ["light sensor"] }],
  ["Which sensor measures weight or force pressing on it?", "Pressure", ["Level", "Flow", "Accelerometer"], { t: ["pressure sensor"] }],
  ["In a sensor control system, what does the microprocessor do with each reading?", "Compares it with stored values and decides whether an actuator should act", ["Prints it", "Deletes it", "Sends it to the sensor"]],
  ["Which device would carry out the action in a sensor control system, such as opening a valve?", "An actuator", ["The sensor", "The ADC", "The monitor"], { t: true }],
  ["What is the difference between a monitoring system and a control system?", "A monitoring system records/displays data or warns; a control system also changes the conditions using actuators", ["They are the same", "Monitoring systems use actuators; control systems don't", "Control systems don't use sensors"]]
],

"4.8b": [
  ["Which sensor would automatically switch on street lights at dusk?", "Light", ["Infra-red", "Temperature", "Proximity"], { t: ["light sensor"] }],
  ["Which sensor would a burglar alarm use to detect someone moving across a room?", "Infra-red", ["pH", "Humidity", "Flow"], { t: ["infrared", "infra-red sensor"] }],
  ["Which sensor would a car use to warn the driver when reversing close to a wall?", "Proximity", ["Light", "Gas", "Humidity"], { t: ["proximity sensor"] }],
  ["Which sensor would make a phone screen rotate when the phone is turned sideways?", "Accelerometer", ["Proximity", "Light", "Magnetic field"], { t: true }],
  ["Which sensor would decide when to water plants in an automatic garden system?", "Moisture", ["Humidity", "pH", "Light"], { t: ["moisture sensor"] }],
  ["Which sensor would detect a dangerous build-up of carbon monoxide in a house?", "Gas", ["Smoke", "Humidity", "Pressure"], { t: ["gas sensor"] }],
  ["Which sensor would control the heating in an office?", "Temperature", ["Light", "Pressure", "Level"], { t: ["temperature sensor"] }],
  ["Which sensor would check that a swimming pool's water is not too acidic?", "pH", ["Moisture", "Level", "Flow"], { t: ["ph sensor"] }],
  ["Which sensor would detect that a fuel tank is almost empty?", "Level", ["Flow", "Pressure", "Gas"], { t: ["level sensor"] }],
  ["Which sensor would detect glass breaking in a security system?", "Acoustic", ["Light", "Moisture", "pH"], { t: ["acoustic sensor"] }],
  ["Which sensor would detect a car driving over a hidden pad at traffic lights?", "Pressure", ["Light", "Humidity", "pH"], { t: ["pressure sensor", "magnetic field"] }],
  ["Which sensor would a phone use for its compass app?", "Magnetic field", ["Proximity", "Light", "Acoustic"], { t: ["magnetic", "magnetic field sensor"] }],
  ["Which sensor would a car's airbag system use to detect a sudden crash?", "Accelerometer", ["Temperature", "Gas", "Light"], { t: true }],
  ["Which sensor would measure how much water a household uses through its water pipe?", "Flow", ["Level", "Moisture", "Humidity"], { t: ["flow sensor"] }],
  ["Which sensor would stop a museum's paintings being damaged by damp air?", "Humidity", ["Moisture", "pH", "Flow"], { t: ["humidity sensor"] }],
  ["Which sensor turns off a phone's screen when it is held to your ear during a call?", "Proximity", ["Accelerometer", "Light", "Pressure"], { t: ["proximity sensor"] }],
  ["Which sensor would detect a door being opened if a magnet is fitted to the door?", "Magnetic field", ["Light", "Humidity", "Gas"], { t: ["magnetic", "magnetic field sensor"] }],
  ["Which sensor would detect a pipe leaking in a factory by listening for hissing?", "Acoustic", ["pH", "Light", "Level"], { t: ["acoustic sensor"] }]
],

"4.9a": [
  ["What is primary storage?", "Memory that is directly accessed by the CPU, such as RAM and ROM", ["Storage that keeps data when the power is off, such as an HDD", "Storage on the internet", "Memory in a USB stick"]],
  ["Which type of memory is volatile?", "RAM", ["ROM", "SSD", "HDD"], { t: true }],
  ["What does 'volatile' mean?", "The contents are lost when the power is switched off", ["The contents can't be changed", "It is very fast", "It is stored in the cloud"]],
  ["Which memory stores the start-up instructions (bootloader) for the computer?", "ROM", ["RAM", "Cache", "Virtual memory"], { t: ["read only memory"] }],
  ["Which memory stores the programs and data currently being used?", "RAM", ["ROM", "DVD", "Cache only"], { t: ["random access memory"] }],
  ["Can ROM normally be written to?", "No — it can only be read", ["Yes, all the time", "Only by the user", "Only when it is full"]],
  ["Why does a computer need ROM?", "To hold the start-up instructions, which must not be lost when the power is off", ["To store the user's photos", "To make the internet faster", "To hold programs currently running"]],
  ["Why does a computer need RAM?", "To hold the programs and data currently in use so the CPU can read and write them quickly", ["To store the bootloader permanently", "To back up files", "To connect to Wi-Fi"]],
  ["What does RAM stand for?", "Random access memory", ["Read and modify", "Rapid action memory", "Random allocated memory"], { t: ["random access memory"] }],
  ["What does ROM stand for?", "Read only memory", ["Random only memory", "Rewritable optical memory", "Run on memory"], { t: ["read only memory"] }],
  ["Which statement about ROM is TRUE?", "It is non-volatile", ["It is volatile", "It holds the user's open documents", "It is usually larger than RAM"]],
  ["Which is usually larger in a PC?", "RAM", ["ROM", "They are always equal", "Cache"], { t: true }],
  ["Why can't you 'save' your work to RAM?", "RAM is volatile, so your work would be lost when the computer is switched off", ["RAM is read only", "RAM is too slow", "RAM is in the cloud"]]
],

"4.9b": [
  ["What is virtual memory?", "Part of the secondary storage used as if it were extra RAM when RAM is full", ["A type of ROM", "Memory inside the CPU", "Storage on the internet"]],
  ["When is virtual memory used?", "When RAM is full", ["When the computer starts up", "When ROM is full", "When the internet is slow"]],
  ["In virtual memory, data is moved between RAM and secondary storage in blocks called…", "pages", ["sectors", "packets", "frames"], { t: ["page"] }],
  ["Why is virtual memory necessary?", "It lets programs keep running even when RAM is full, instead of crashing", ["It makes the computer faster than adding RAM", "It stores the bootloader", "It encrypts files"]],
  ["What is a disadvantage of using virtual memory?", "Secondary storage is much slower than RAM, so the computer slows down", ["It deletes data", "It uses up ROM", "It needs an internet connection"]],
  ["What is disk thrashing?", "When the computer spends so much time swapping pages between RAM and disk that it slows down badly", ["When a hard disk is dropped", "When data is defragmented", "When a virus attacks the disk"]],
  ["What is the best way to reduce the need for virtual memory?", "Install more RAM", ["Use a bigger monitor", "Add more ROM", "Use a faster mouse"]],
  ["Which pages are moved out of RAM into virtual memory?", "Pages that are not currently needed", ["Pages that are being used right now", "The operating system's start-up code", "Only images"]]
],

"4.10a": [
  ["What is secondary storage?", "Non-volatile storage that is not directly accessed by the CPU, used to store data permanently", ["Memory directly accessed by the CPU", "Very fast memory inside the CPU", "Memory that is lost when the power is off"]],
  ["Why is secondary storage needed?", "To keep data, files and programs permanently when the power is off", ["To run the FDE cycle", "To hold the next instruction", "To make RAM volatile"]],
  ["Before the CPU can use a program stored on secondary storage, it must be…", "loaded into RAM", ["printed", "encrypted", "compressed"]],
  ["Which of these is secondary storage?", "Solid-state drive (SSD)", ["RAM", "Cache", "Registers"], { t: ["SSD"] }]
],

"4.10b": [
  ["Which type of storage uses platters divided into tracks and sectors?", "Magnetic (hard disk drive)", ["Optical", "Solid-state", "ROM"]],
  ["How is data written to a hard disk?", "An electromagnet in the read/write head magnetises tiny areas of the platter", ["A laser burns pits", "Electrons are trapped in floating gates", "Ink is sprayed"]],
  ["Which type of storage uses a laser to read pits and lands?", "Optical", ["Magnetic", "Solid-state", "Cloud"], { t: true }],
  ["Which of these is optical storage?", "Blu-ray disc", ["SSD", "SD card", "Hard disk drive"], { t: ["blu-ray", "CD", "DVD"] }],
  ["Why can a Blu-ray disc hold more data than a DVD?", "It uses a blue-violet laser with a shorter wavelength, so the pits can be smaller", ["It spins faster", "It is bigger", "It uses magnets"]],
  ["Which technology is used by solid-state (flash) storage?", "NAND or NOR flash memory", ["Magnetic platters", "Pits and lands", "Ink cartridges"]],
  ["In solid-state storage, what controls whether a cell stores a 1 or a 0?", "Transistors acting as control gates and floating gates, which trap electrons", ["A spinning magnet", "A laser", "A read/write head"]],
  ["Which type of storage has no moving parts?", "Solid-state", ["Magnetic", "Optical", "All of them"], { t: ["SSD", "solid state"] }],
  ["Which of these is solid-state storage?", "USB flash drive", ["DVD", "Hard disk drive", "CD-R"]],
  ["Why is an SSD a good choice for a laptop?", "It has no moving parts so it is robust, fast, light and uses little power", ["It is the cheapest per GiB", "It can be scratched easily", "It needs a laser"]],
  ["Why might a company choose hard disk drives for a large backup server?", "They give a large capacity at a low cost per GiB", ["They have no moving parts", "They are the fastest storage", "They are the lightest storage"]],
  ["Which is a disadvantage of optical storage?", "Low capacity and it can be scratched easily", ["It is volatile", "It is very expensive per disc", "It can't be portable"]],
  ["Which is a disadvantage of a hard disk drive?", "It has moving parts that can be damaged if it is dropped", ["It is volatile", "It holds very little data", "It can't be rewritten"]],
  ["Which is a disadvantage of solid-state storage?", "Higher cost per GiB and a limited number of write cycles", ["It is very slow", "It is very noisy", "It loses data without power"]],
  ["A digital camera usually stores photos on…", "an SD card (solid-state)", ["a hard disk", "a DVD", "ROM"]],
  ["Which storage would be best for selling a film in a shop?", "Optical (Blu-ray)", ["Magnetic (HDD)", "RAM", "Cache"]]
],

"4.11a": [
  ["What is cloud storage?", "Storing data on remote servers that are accessed over the internet", ["Storing data on your own hard drive", "Storing data in RAM", "Storing data on a CD"]],
  ["Does cloud storage need physical hardware?", "Yes — it is stored on physical servers in data centres", ["No — it is stored in the air", "No — it is stored in the user's RAM", "Only for photos"]],
  ["What is 'local' storage?", "Storage on the user's own device, e.g. its hard drive or a USB stick", ["Storage on a remote server", "Storage in a data centre", "Storage in cache"]],
  ["Which of these is an example of a cloud storage service?", "Google Drive", ["A USB flash drive", "An SSD", "A Blu-ray disc"]],
  ["Why do cloud providers often copy data onto several servers?", "So the data isn't lost if one server fails", ["To make files larger", "To slow down hackers", "To use more electricity"]],
  ["A company uses its own servers to store its data for its staff only. This is a…", "private cloud", ["public cloud", "local hard drive", "optical cloud"], { t: ["private"] }]
],

"4.11b": [
  ["A school wants students to open their homework from home and at school. Which storage is most suitable?", "Cloud storage", ["The school's local hard drive only", "A DVD", "ROM"]],
  ["Why might a hospital be careful about using public cloud storage for patient records?", "The data is private and is stored by a third party, so there are security and privacy risks", ["Cloud storage can't store text", "Cloud storage is always slower than paper", "Hospitals don't have internet"]],
  ["Which is an advantage of cloud storage for a business that is growing quickly?", "Storage space can be increased easily without buying new hardware", ["It never needs the internet", "It is always free", "It can't be hacked"]],
  ["Which is an advantage of cloud storage compared with local storage?", "Files can be accessed from any device, anywhere, with an internet connection", ["It works without an internet connection", "It is always free", "It can never be hacked"]],
  ["Which is a disadvantage of cloud storage compared with local storage?", "It needs an internet connection to access the files", ["It can't store photos", "Files can only be opened on one device", "It needs a CD drive"]],
  ["Why is cloud storage useful for group projects?", "Files can easily be shared and edited by several people", ["Each person needs a copy on a USB stick", "Only one person can open it", "It deletes old versions"]],
  ["What happens to files in cloud storage if your laptop is stolen?", "They are still safe on the provider's servers", ["They are lost forever", "They are stolen too", "They are moved to ROM"]],
  ["Which is a security concern with cloud storage?", "Your data is stored by a third party and could be hacked or accessed without permission", ["Files are too small", "It uses too much RAM", "It can't be encrypted"]],
  ["Which is a cost-related disadvantage of cloud storage?", "You may need to pay a subscription for larger amounts of storage", ["You must buy a new computer", "You must pay per keystroke", "It needs special cables"]],
  ["Which is an advantage of local storage over cloud storage?", "Files can be opened without an internet connection", ["Files can be accessed from anywhere", "Files are backed up automatically by a provider", "It's easier to share files with others"]],
  ["A student has a slow internet connection and needs to edit large video files. Which storage is better?", "Local storage", ["Cloud storage", "ROM", "Cache"]],
  ["What could happen if a cloud provider has a technical failure or goes out of business?", "Users may lose access to their data", ["Users' computers stop working", "Data moves to the user's ROM", "Nothing — data is always available"]]
]
});
