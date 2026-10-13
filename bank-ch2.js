/* Question bank — Chapter 2 Data transmission & encryption */
window.BANK = window.BANK || {};
Object.assign(window.BANK, {

"2.1a": [
  ["Why is data broken down into packets before it is transmitted?", "Small packets are easier to route, and only lost or damaged packets need to be re-sent", ["Packets make the data encrypted", "Packets stop all errors from happening", "Packets make the file smaller"]],
  ["What are the three main parts of a data packet?", "Header, payload and trailer", ["Header, footer and body", "Address, data and checksum", "Start, middle and end"]],
  ["Which part of a packet contains the actual data being sent?", "Payload", ["Header", "Trailer", "Packet number"], { t: true }],
  ["Which part of a packet contains the destination address?", "Header", ["Payload", "Trailer", "Checksum"], { t: ["packet header", "the header"] }],
  ["Which of these is found in the packet header?", "The packet number", ["The error-checking value", "The marker for the end of the packet", "The actual data"]],
  ["Which of these is NOT found in the packet header?", "The payload data", ["The destination address", "The originator's address", "The packet number"]],
  ["What is the 'originator's address' in a packet header?", "The address of the device that sent the packet", ["The address of the receiving device", "The address of the router", "The address of the next packet"]],
  ["Why does each packet have a packet number?", "So the packets can be put back in the correct order when they arrive", ["So the router knows the speed", "So the packet can be encrypted", "So the payload can be compressed"]],
  ["What does the trailer of a packet contain?", "A way of identifying the end of the packet and an error-checking method", ["The destination address", "The packet number", "The originator's address"]],
  ["Which error-checking method may be included in a packet trailer?", "A cyclic redundancy check (CRC) or checksum", ["A check digit", "A visual check", "A double entry check"]],
  ["The header holds three items. Which list is correct?", "Destination address, packet number, originator's address", ["Payload, trailer, checksum", "Sender name, file name, date", "Router address, speed, size"]],
  ["Which part of a packet helps the receiver detect whether the data was corrupted?", "The trailer", ["The header", "The payload", "The packet number"], { t: true }]
],

"2.1b": [
  ["In packet switching, what decides the route each packet takes?", "Routers", ["The receiving computer", "The keyboard", "The payload"], { t: ["router", "a router"] }],
  ["In packet switching, do all the packets of a file take the same route?", "Not necessarily — each packet can take a different route", ["Yes, always", "Only if the file is small", "Only on wireless networks"]],
  ["Why might packets arrive out of order?", "They travel along different routes, which may be faster or slower", ["Routers shuffle them on purpose", "The sender sends them in random order", "Packets have no numbers"]],
  ["When are the packets put back into the correct order?", "Once the last packet has arrived at the destination", ["Before they are sent", "At the first router", "Every time a packet arrives at a router"]],
  ["What does a router look at to decide where to send a packet?", "The destination address in the header", ["The payload", "The trailer", "The packet's size only"]],
  ["What happens if a packet is lost during packet switching?", "The receiver requests that the missing packet is sent again", ["The whole file is deleted", "The router creates a new packet", "Nothing — the file is fine without it"]],
  ["Which is an advantage of packet switching?", "Packets can be re-routed around busy or broken parts of the network", ["Packets always arrive in order", "No extra data is needed", "There is never any delay"]],
  ["Which is a disadvantage of packet switching?", "Packets may arrive out of order and need reordering, causing a delay", ["Only one user can use a link at a time", "A broken link stops all data", "The whole file must be re-sent if one packet is lost"]],
  ["Why can packet switching be a problem for live video calls?", "Delays while packets are reordered can make the call jerky", ["Video can't be split into packets", "Packets can't carry sound", "Routers block video"]],
  ["Put these in order: (1) packets are reordered (2) data is split into packets (3) packets travel by different routes", "2, 3, 1", ["1, 2, 3", "3, 2, 1", "2, 1, 3"]],
  ["Each step a packet takes from one router to the next is called a…", "hop", ["jump", "cycle", "pulse"], { t: true }]
],

"2.2a": [
  ["What is serial data transmission?", "Data is sent one bit at a time down a single wire", ["Several bits are sent at the same time down several wires", "Data is sent in both directions at once", "Data is sent through the air"]],
  ["What is parallel data transmission?", "Several bits are sent at the same time down several wires", ["Data is sent one bit at a time down one wire", "Data travels in one direction only", "Data is sent in packets over the internet"]],
  ["What is skew?", "When bits sent in parallel arrive at slightly different times", ["When a serial cable is too short", "When a packet is lost", "When two devices send data at the same time"], { t: true }],
  ["Why is serial transmission better than parallel over long distances?", "The bits arrive in order, with no skew and less interference", ["It is always faster", "It uses more wires", "It can only send one byte"]],
  ["Where is parallel transmission typically used?", "Over short distances, such as the internal buses inside a computer", ["Across the internet", "For long cables between buildings", "For USB connections"]],
  ["What is simplex transmission?", "Data travels in one direction only", ["Data travels in both directions at the same time", "Data travels in both directions, but not at the same time", "Data travels down several wires"]],
  ["What is half-duplex transmission?", "Data travels in both directions, but not at the same time", ["Data travels in one direction only", "Data travels in both directions at the same time", "Data is sent one bit at a time"]],
  ["What is full-duplex transmission?", "Data travels in both directions at the same time", ["Data travels in one direction only", "Data travels in both directions, one at a time", "Data travels down a single wire only"]],
  ["A walkie-talkie is an example of…", "half-duplex", ["simplex", "full-duplex", "parallel"], { t: ["half duplex"] }],
  ["A phone call is an example of…", "full-duplex", ["simplex", "half-duplex", "serial only"], { t: ["full duplex"] }],
  ["Sending data from a computer to a printer that never replies is an example of…", "simplex", ["half-duplex", "full-duplex", "parallel"], { t: true }],
  ["A TV broadcast is an example of…", "simplex", ["half-duplex", "full-duplex", "packet switching"], { t: true }],
  ["A video call over the internet would best use…", "serial full-duplex", ["parallel simplex", "serial simplex", "parallel half-duplex"]],
  ["Which is an advantage of parallel transmission?", "It is faster over short distances", ["It has no skew", "It is cheaper over long distances", "It uses a single wire"]],
  ["Which is a disadvantage of parallel transmission?", "Skew and crosstalk make it unreliable over long distances", ["It is too slow over short distances", "It can only send in one direction", "It can't send binary"]],
  ["Interference between the wires in a parallel cable is called…", "crosstalk", ["skew", "latency", "jitter"], { t: true }],
  ["A school needs to connect a printer 20 m away. Which is most suitable?", "Serial transmission", ["Parallel transmission", "Simplex parallel", "No cable is possible"]],
  ["Why is serial usually cheaper than parallel?", "It needs fewer wires", ["It uses fibre optics only", "It does not need a cable", "It sends less data"]]
],

"2.2b": [
  ["What does USB stand for?", "Universal Serial Bus", ["Universal System Board", "United Serial Bridge", "Universal Signal Bus"], { t: true }],
  ["Which type of transmission does USB use?", "Serial", ["Parallel", "Simplex only", "Wireless"], { t: true }],
  ["Which is a benefit of USB?", "Devices are automatically detected and the correct driver is loaded", ["Cables can be any length", "It only works with printers", "It uses parallel transmission"]],
  ["Which is a drawback of USB?", "The standard cable length is limited (about 5 m)", ["Devices must be configured manually", "It can't power devices", "It is not an industry standard"]],
  ["What happens when a USB device is first plugged into a computer?", "The computer detects it and loads (or asks to install) the correct device driver", ["The computer restarts", "The device's files are deleted", "The device is encrypted"]],
  ["Why is it useful that USB is an industry standard?", "Almost all computers and devices support it", ["It can't be copied", "It is the fastest possible connection", "It never needs drivers"]],
  ["What does 'backwards compatible' mean for USB?", "Newer USB ports still work with older USB devices", ["USB cables work in either direction", "USB can send data backwards", "Old ports work faster than new ones"]],
  ["Besides data, what else can a USB cable often supply to a device?", "Power to run or charge it", ["Internet access", "An IP address", "A MAC address"]],
  ["USB connectors can only be plugged in one way (USB-C is reversible). Why is this a benefit?", "It prevents incorrect connection", ["It makes the cable longer", "It increases the speed", "It encrypts the data"]],
  ["What is a device driver?", "Software that lets the operating system communicate with a hardware device", ["A USB cable", "A type of virus", "The person using the computer"]]
],

"2.3a": [
  ["Why is it necessary to check for errors after data transmission?", "Interference can corrupt the data, so it may not arrive exactly as it was sent", ["To make the data smaller", "To encrypt the data", "To speed up the network"]],
  ["What can cause errors during data transmission?", "Interference, such as electrical noise", ["Using hexadecimal", "Using a USB cable", "Compressing the file"]],
  ["Which three types of error can occur during transmission?", "Data loss, data gain and data change", ["Data compression, encryption and decryption", "Syntax, logic and runtime errors", "Overflow, underflow and skew"]],
  ["Bits being flipped from 0 to 1 during transmission is an example of…", "data change", ["data loss", "data gain", "compression"], { t: true }],
  ["Extra bits being added to the data during transmission is an example of…", "data gain", ["data loss", "data change", "encryption"], { t: true }],
  ["Some packets never arriving at the destination is an example of…", "data loss", ["data gain", "data change", "skew"], { t: true }]
],

"2.3b": [
  ["In even parity, the total number of 1s in the byte (including the parity bit) must be…", "even", ["odd", "8", "zero"], { t: true }],
  ["In odd parity, the total number of 1s in the byte (including the parity bit) must be…", "odd", ["even", "1", "7"], { t: true }],
  ["What is a parity bit?", "An extra bit set to make the number of 1s odd or even", ["The last bit of every file", "A bit that stores the packet number", "A bit used for encryption"]],
  ["Which error can a simple parity check NOT detect?", "Two bits being changed in the same byte", ["One bit being changed", "A single bit flipped from 0 to 1", "A single bit flipped from 1 to 0"]],
  ["What extra information does a parity block check give compared with a single parity bit?", "It can locate exactly which bit is wrong, so it can be corrected", ["It encrypts the data", "It compresses the data", "It tells you who sent the data"]],
  ["In a parity block check, what is the parity byte?", "An extra byte made from the parity of each column of bits", ["The first byte of the file", "A byte that stores the checksum", "A byte containing the destination address"]],
  ["How is the incorrect bit found in a parity block check?", "It is where the row and the column with the wrong parity cross", ["It is always the parity bit", "It is the last bit received", "It is found by an echo check"]],
  ["How does a checksum work?", "A value is calculated from the data and sent with it; the receiver recalculates it and compares", ["Every byte is sent twice", "The receiver sends all the data back", "A digit is added by the user"]],
  ["In a checksum, what happens if the receiver's calculated value does not match the one sent?", "An error has occurred and the data is requested again", ["The data is accepted anyway", "The data is encrypted", "The sender is blocked"]],
  ["How does an echo check work?", "The receiver sends a copy of the data back to the sender, who compares it with the original", ["A value is calculated and sent with the data", "A parity bit is added to each byte", "The user types the data twice"]],
  ["What is a weakness of an echo check?", "If there is an error you can't tell whether it happened on the way there or on the way back", ["It can't detect any errors", "It only works for text", "It needs a check digit"]],
  ["Which error-detection method doubles the amount of data being transmitted?", "Echo check", ["Parity check", "Checksum", "Check digit"], { t: true }],
  ["Data is sent using even parity. Which byte has an error?", "10110011", ["10110010", "00000000", "11110000"], { e: "10110011 has five 1s, which is odd — so with even parity it must contain an error. The others have an even number of 1s." }]
],

"2.3c": [
  ["What is a check digit?", "An extra digit calculated from the other digits and added to the end of a number", ["The first digit of a number", "A digit typed twice by the user", "A parity bit for each byte"]],
  ["What kind of errors does a check digit detect?", "Errors in data entry, such as typing or scanning mistakes", ["Errors caused by interference during transmission", "Syntax errors in code", "Overflow errors"]],
  ["Which of these uses a check digit?", "ISBN numbers on books", ["IP addresses", "MAC addresses", "Sound files"]],
  ["Which of these uses a check digit?", "Bar codes on products", ["Email addresses", "Passwords", "Hex colour codes"]],
  ["Two digits being swapped when typing (e.g. 5729 typed as 5279) is called a…", "transposition error", ["parity error", "overflow error", "skew error"], { t: ["transposition"] }],
  ["Which errors can a check digit detect?", "An incorrect digit, two digits swapped, or a missing/extra digit", ["Only spelling mistakes in words", "Only errors in sound files", "Only errors caused by viruses"]],
  ["When a bar code is scanned, what happens to the check digit?", "It is recalculated from the other digits and compared with the scanned check digit", ["It is ignored", "It is added to the price", "It is sent to the manufacturer"]],
  ["In the ISBN-13 method, the first 12 digits are multiplied alternately by…", "1 and 3", ["1 and 2", "2 and 3", "10 and 1"]],
  ["In the ISBN-13 method, if the total MOD 10 is 0, the check digit is…", "0", ["10", "1", "9"], { t: ["zero"] }]
],

"2.3d": [
  ["What does ARQ stand for?", "Automatic Repeat Query (request)", ["Automatic Receive Queue", "Advanced Routing Query", "Automatic Reply Quality"]],
  ["In ARQ, what does the receiver send if the data has arrived correctly?", "A positive acknowledgement", ["A negative acknowledgement", "A timeout", "Nothing at all"], { t: ["positive acknowledgment", "acknowledgement"] }],
  ["In ARQ, what does the receiver send if the data contains an error?", "A negative acknowledgement", ["A positive acknowledgement", "A new checksum", "An echo of the data"], { t: ["negative acknowledgment"] }],
  ["What is a timeout in ARQ?", "A set time the sender waits for an acknowledgement before re-sending the data", ["The time it takes to encrypt data", "The time a router keeps a packet", "The time a user has to type a password"]],
  ["In ARQ, what happens if the sender receives no acknowledgement before the timeout?", "It automatically re-sends the data", ["It deletes the data", "It waits forever", "It sends an echo check"]],
  ["What does ARQ use to find out whether data contains errors?", "An error-detection method, such as a checksum or parity check", ["A check digit typed by the user", "A visual check", "Encryption"]],
  ["When does the ARQ process stop re-sending the data?", "When a positive acknowledgement is received (or after a set number of tries)", ["After exactly one try", "When the data is encrypted", "When the router decides"]]
],

"2.4a": [
  ["What is the purpose of encryption?", "To make data meaningless to anyone who intercepts it without the key", ["To stop data from being intercepted", "To make files smaller", "To detect errors in data"]],
  ["Does encryption stop a hacker from intercepting data?", "No — it only makes the intercepted data unreadable", ["Yes, completely", "Only on wireless networks", "Only for small files"]],
  ["What is plaintext?", "The original, readable data before it is encrypted", ["The encrypted data", "The key used to encrypt", "Text with no formatting"]],
  ["What is ciphertext?", "Encrypted data that can't be understood without the key", ["The original readable data", "A type of font", "A password"]],
  ["What is used together with an encryption algorithm to encrypt data?", "A key", ["A check digit", "A parity bit", "A MAC address"], { t: ["key", "an encryption key"] }],
  ["Why is encryption especially important when sending data over the internet?", "The internet is a public network, so data can easily be intercepted", ["The internet is slower than a LAN", "Data is always compressed online", "Routers delete unencrypted data"]],
  ["Which of these would most need to be encrypted when sent?", "Online banking details", ["A public news web page", "A school's opening times", "A weather forecast"]],
  ["Converting ciphertext back into plaintext is called…", "decryption", ["encryption", "compression", "transmission"], { t: ["decrypting", "decrypt"] }]
],

"2.4b": [
  ["In symmetric encryption, how many keys are used?", "One — the same key encrypts and decrypts", ["Two — a public key and a private key", "Three", "None"]],
  ["What is the main problem with symmetric encryption?", "The secret key has to be shared with the receiver and could be intercepted", ["It can't encrypt text", "It needs two different keys", "It is too slow for any use"]],
  ["In asymmetric encryption, which key is used to encrypt the data?", "The receiver's public key", ["The receiver's private key", "The sender's private key", "A shared secret key"]],
  ["In asymmetric encryption, which key is used to decrypt the data?", "The receiver's private key", ["The receiver's public key", "The sender's public key", "Any key"]],
  ["Who creates the public and private keys in asymmetric encryption?", "The receiver", ["The sender", "The router", "The internet service provider"], { t: true }],
  ["Who can be given the public key?", "Anyone", ["Only the receiver", "Only the government", "No one"], { t: true }],
  ["Which key must never be shared?", "The private key", ["The public key", "Both keys", "Neither key"], { t: ["private", "private key"] }],
  ["How does asymmetric encryption solve the key-distribution problem?", "The private key that decrypts the data never has to be sent to anyone", ["It uses no keys at all", "It sends the key twice", "It compresses the key"]],
  ["Using a shift of 3, what is HELLO encrypted with a Caesar cipher?", "KHOOR", ["IFMMP", "EBIIL", "HELLO3"], { t: true }],
  ["Which type of encryption is used by HTTPS websites to exchange keys safely?", "Asymmetric encryption", ["Symmetric encryption only", "Run-length encoding", "Parity encryption"]],
  ["A Wi-Fi password (pre-shared key) is an example of…", "symmetric encryption", ["asymmetric encryption", "a check digit", "an echo check"], { t: ["symmetric"] }],
  ["Which statement about asymmetric encryption is TRUE?", "Data encrypted with a public key can only be decrypted with the matching private key", ["The public key decrypts the data", "Both people need the same secret key", "The sender's private key is sent with the message"]],
  ["Which is usually faster to process?", "Symmetric encryption", ["Asymmetric encryption", "They are always identical", "Neither can be processed"], { t: ["symmetric"] }],
  ["Why do real encryption systems use keys hundreds of bits long?", "There are so many possible keys that trying them all (brute force) would take too long", ["Long keys make the file smaller", "Short keys can't be stored", "Long keys are easier to remember"]]
]
});
