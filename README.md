# IGCSE Computer Science 9 · with Mr. Gilbert

A student learning site for Grade 9 **Cambridge IGCSE Computer Science (0478, exams 2026–2028)**. It is built the same way as the Grade 8 site: plain HTML, CSS and JavaScript, so it runs on GitHub Pages with no build step.

**Pages:** Home · Weekly plan · Assessments (calendar) · Topics · Videos · My results · Help · Teacher tools (`#teacher`)

## What's inside

| Chapter | Topics |
|---|---|
| 1 Data representation | 1.1 Binary · 1.2 Hexadecimal · 1.3 Shifts & two's complement · 1.4 Text (ASCII/Unicode) · 1.5 Sound · 1.6 Images · 1.7 Storage & compression |
| 2 Data transmission & encryption | 2.1 Packets · 2.2 Transmission methods & USB · 2.3 Error detection · 2.4 Encryption |
| 3 Algorithm design & problem-solving | 3.1 Development life cycle · 3.2 Flowcharts · 3.3 Pseudocode · 3.4 Standard algorithms · 3.5 Validation & verification · 3.6 Testing & trace tables · 3.7 Creating & refining algorithms |
| 4 Hardware | 4.1 CPU & Von Neumann · 4.2 Cores, cache, clock, FDE · 4.3 Instruction sets & embedded systems · 4.4 Input/output devices · 4.5 Scanners & cameras · 4.6 Screens, projectors, actuators, speakers · 4.7 Printers · 4.8 Sensors · 4.9 RAM & ROM · 4.10 Magnetic, optical, solid-state · 4.11 Cloud |
| 5 Software | 5.1 Software types & interrupts · 5.2 Hardware, firmware & OS · 5.3 Languages & translators · 5.4 IDEs |
| 6 Boolean logic | 6.1 The six logic gates · 6.2 Truth tables, circuits & expressions |

- Every topic page has a reading written for the syllabus, with textbook page numbers (Hodder, 2nd edition), diagrams (logic gates, circuits, flowcharts and so on), videos where available, and its learning objectives.
- **Questions:** about 800 written questions, plus about 200 random generators. The generators make brand-new questions every try: binary, hexadecimal, shifts, two's complement, ASCII, sound and image file sizes, unit conversions, RLE, parity blocks, ISBN check digits, Caesar ciphers, pseudocode tracing, flowcharts, bubble sort and linear search, test data, logic circuits and truth tables, and key terms.
- **Assessments:** a spot check most Fridays, end-unit tests and mid-semester, end-of-semester and end-of-year exams, following the curriculum overview.

## Secure test mode

Every quiz, test and exam starts with a **full guide** (how it works, what locks the device, what happens next). Students must tick three boxes before the start button unlocks. During the test:

- The page goes **full screen** and the menus disappear.
- Each question has **its own timer**. Normal questions get `secondsPerQuestion` (45 s). Calculations and trace tables get `secondsPerCalculation` (90 s) or more.
- **Copy, cut, paste, right-click, text selection and dragging are blocked on the whole site.** During a test, trying any of them **locks the device**.
- **Leaving the tab or window, opening a new tab, switching apps, leaving full screen, screenshot keys or tools, developer tools, printing, or closing/refreshing the page** locks the device too.
- The screen **goes black** as soon as the window loses focus, the Windows/Cmd key is pressed or a screenshot key is pressed.
- A faint **watermark** (student name, class and time) is printed across every question, so any photo of the screen shows who took it.
- When a device locks, the test is submitted and an alarm sounds. The lock covers the **whole device**, not just one student profile, so refreshing, closing the browser or switching student does not remove it.

### Unlocking a device
- **At the student's device:** click **🔑 Teacher access**, type the teacher password, then click **Unlock this device now**.
- **From your own device:** open `your-site-address/#teacher`, sign in, type the student's 8-character lock code and read out the 6-digit key.

**Default teacher password: `IGCSE9-Teacher`. Change it before students use the site.** Open `#teacher`, sign in, type a new password under *Change the teacher password*, then copy the fingerprint into `js/config.js` → `teacherPasswordHash`. Only the fingerprint is stored in the files, never the password itself.

### Honest limits
This is a strong classroom deterrent, but no website can be cheat-proof:
- A browser **cannot detect a photo taken with a separate phone**. That's why the watermark is there.
- Phone screenshot buttons (power + volume) can't be detected by any website. Most desktop screenshot tools either take focus or use keys the page can see, so those black out the screen and lock the device.
- Everything runs in the student's browser. A student who clears the site's browser data removes the lock, but also wipes all their saved progress. If Google Sheets is connected, the lock is already recorded in your **Integrity** tab.

## 1. Put it on GitHub Pages (about 5 minutes)
1. On github.com click **New repository**. Name it, for example, `IGCSE_CS_Grade9`, set it to **Public** and click **Create**.
2. Click **uploading an existing file**, drag in **everything inside this folder** (`index.html`, `css`, `js`, `images`, `google-apps-script`, `README.md`, `.nojekyll`) and click **Commit changes**.
3. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. After 1–2 minutes the site is live at `https://YOUR-USERNAME.github.io/IGCSE_CS_Grade9/`.

## 2. Connect Google Sheets (to see every student's results and locks)
1. Create a Google Sheet, then go to **Extensions → Apps Script**. Paste in `google-apps-script/Code.gs` and save.
2. Click **Deploy → New deployment → Web app**. Set *Execute as:* **Me** and *Who has access:* **Anyone**, then click **Deploy**.
3. Copy the URL ending in `/exec` into `js/config.js` → `googleSheetsUrl`.

The sheet fills in on its own, with three tabs: **Results** (every try), **Students** (totals per student) and **Integrity** (every lock and unlock).

## 3. Settings (`js/config.js`)
| Setting | What it does |
|---|---|
| `teacherNote` | The message on every student's Home page |
| `classes` | The class list students choose from |
| `semesters[].start` | The Monday of Week 1 for each semester |
| `weeklyPlan` | Which topics go in which week. Each week can have `unitTest`, `test` or `exam`. Add `start: "YYYY-MM-DD"` to move a week (for example after a holiday) |
| `passMark`, `secondsPerQuestion`, `secondsPerCalculation` | Pass mark and timers |
| `questionsPerQuiz / Spot / UnitTest / Exam` | Number of questions (20 / 20 / 30 / 40) |
| `integrity` | Switch each secure-mode rule on or off |
| `topicVideos`, `extraLinks` | Your own videos and links for each topic |

## Adding questions
Open the right `js/bank-ch*.js` file and add a line under the objective:
```js
["Question text?", "Correct answer", ["Wrong 1", "Wrong 2", "Wrong 3"], { e: "Explanation", t: true }],
```
`t: true` lets the question also appear as a typed answer. Add `c: "code"` to show a code box, or `s: 90` to give the question 90 seconds.
