/* =====================================================================
   IGCSE COMPUTER SCIENCE 9 WITH MR. GILBERT — TEACHER SETTINGS
   This is the only file you normally need to edit.
   ===================================================================== */
window.CONFIG = {
  siteName: "IGCSE CS 9",
  subtitle: "with Mr. Gilbert",
  academicYear: "2026–2027",
  teacherName: "Mr. Gilbert",
  syllabus: "Cambridge IGCSE Computer Science 0478 (exams 2026–2028)",
  textbook: "Cambridge IGCSE & O Level Computer Science, 2nd edition (Watson & Williams, Hodder)",
  classes: ["9B1", "9B2", "9B3", "9B4", "9B5", "9B6", "9B7", "9B8", "9B9"],

  /* Shown on every student's Home page. Change it each week. */
  teacherNote: {
    text: "Welcome to IGCSE Computer Science! Read each topic carefully and watch the videos before you try the quiz. Aim for 70% or more, and retry any quiz you did not pass. Every try gives you new questions. Remember: tests are locked down, so read the rules before you start."
  },

  /* Paste your Google Apps Script Web App URL here (see README.md).
     Leave as "" to save results only in the student's browser. */
  googleSheetsUrl: "",

  passMark: 70,               // % needed to count a topic as "passed"
  secondsPerQuestion: 45,     // timer for a normal question
  secondsPerCalculation: 90,  // timer for calculation / trace questions (binary, file sizes, trace tables…)
  questionsPerQuiz: 20,       // topic quizzes
  questionsPerSpot: 20,       // weekly spot checks
  questionsPerUnitTest: 30,   // unit (chapter) tests
  questionsPerExam: 40,       // mid-semester, end-of-semester and end-of-year exams

  /* Monday of week 1 for each semester (YYYY-MM-DD). */
  semesters: [
    { id: 1, name: "Semester 1", start: "2026-09-07", units: ["u1", "u2", "u3"] },
    { id: 2, name: "Semester 2", start: "2027-01-11", units: ["u4", "u5", "u6"] }
  ],

  /* Weekly plan. Each week lists the topic IDs students must finish.
     Add  start: "YYYY-MM-DD"  to a week to move it (e.g. after a holiday);
     later weeks keep counting from that date.
     On the Friday of each week there is one assessment:
       unitTest: "u1"                         → end-of-chapter test for a whole chapter
       test: { id, title, topics: [...] }     → end-unit test for chosen topics
       exam: { id, title, units: [...] }      → mid-semester / end-of-semester / end-of-year exam
       (nothing)                              → a spot check on that week's topics */
  weeklyPlan: {
    1: [
      { week: 1,  topics: ["1.1"] },
      { week: 2,  topics: ["1.2"] },
      { week: 3,  topics: ["1.3"] },
      { week: 4,  topics: ["1.4"] },
      { week: 5,  topics: ["1.5", "1.6", "1.7"], unitTest: "u1" },
      { week: 6,  topics: ["2.1", "2.2"] },
      { week: 7,  topics: ["2.3", "2.4"], unitTest: "u2" },
      { week: 8,  topics: [], exam: { id: "MID-S1", title: "Mid-semester exam", units: ["u1", "u2"] } },
      { week: 9,  topics: ["3.1"] },
      { week: 10, topics: ["3.2"] },
      { week: 11, topics: ["3.3"] },
      { week: 12, topics: ["3.4"] },
      { week: 13, topics: ["3.5"] },
      { week: 14, topics: ["3.6"] },
      { week: 15, topics: ["3.7"], unitTest: "u3" },
      { week: 16, start: "2027-01-04", topics: [], exam: { id: "END-S1", title: "End of semester exam", units: ["u1", "u2", "u3"] } }
    ],
    2: [
      { week: 1,  topics: ["4.1"] },
      { week: 2,  topics: ["4.2"] },
      { week: 3,  topics: ["4.3"], test: { id: "UT-ARCH", title: "End unit test: Computer architecture", topics: ["4.1", "4.2", "4.3"] } },
      { week: 4,  topics: ["4.4", "4.5"] },
      { week: 5,  topics: ["4.6"] },
      { week: 6,  topics: ["4.7"] },
      { week: 7,  topics: ["4.8"] },
      { week: 8,  topics: ["4.9"] },
      { week: 9,  topics: ["4.10"] },
      { week: 10, topics: ["4.11"], test: { id: "UT-SIO", title: "End unit test: Storage & input/output", topics: ["4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11"] } },
      { week: 11, topics: [], exam: { id: "MID-S2", title: "Mid-semester exam", units: ["u4"] } },
      { week: 12, topics: ["5.1"] },
      { week: 13, topics: ["5.2"] },
      { week: 14, topics: ["5.3"] },
      { week: 15, topics: ["5.4"], unitTest: "u5" },
      { week: 16, topics: ["6.1"] },
      { week: 17, topics: ["6.2"], unitTest: "u6" },
      { week: 18, topics: [], exam: { id: "END-YEAR", title: "End of year exam", units: ["u1", "u2", "u3", "u4", "u5", "u6"] } }
    ]
  },

  /* Spot checks and tests open on their date, OR earlier once the student has
     tried every topic quiz they cover. Exams only open on their date. */
  openSpotEarly: true,

  /* ===================== EXAM INTEGRITY (tests are locked down) =====================
     Any of these during a quiz, test or exam LOCKS this device until you unlock it:
     copying/pasting, leaving the tab or window, opening another tab, leaving full screen,
     screenshot keys, developer tools, printing.
     ---------------------------------------------------------------------------------
     TEACHER PASSWORD: only its SHA-256 fingerprint is stored here, never the password.
     The default password is  IGCSE9-Teacher  — change it before you share the site:
     open the site, go to  #teacher  (add it to the end of the address), sign in,
     type a new password in "Change password" and copy the new fingerprint in here. */
  teacherPasswordHash: "cede0fdcb7f01cd31c67ed38b894d97c56f0aaf2c1675594a6941334fc682721",

  integrity: {
    lockOnTabLeave: true,      // leaving the tab/window or switching apps locks the device
    blurGraceMs: 600,          // ignore focus blips shorter than this (in milliseconds)
    requireFullscreen: true,   // tests run in full screen; leaving full screen locks (where the device supports it)
    blockCopyPaste: true,      // copy, cut, paste, right-click and text selection are off on the whole site
    screenshotShield: true,    // the screen goes black when screenshot keys are pressed or the window loses focus
    lockOnScreenshot: true,    // a screenshot attempt during a test locks the device
    watermark: true            // student name, class and time are printed faintly across every question
  },

  /* Optional extra links per topic, shown on the topic page.
     Example: "1.1": [{ label: "Binary practice game", url: "https://..." }] */
  extraLinks: {},

  /* Your own videos per topic — they appear first, marked "Mr. Gilbert's pick".
     Copy the ID from a YouTube link: youtube.com/watch?v=THIS_PART
     Example: "1.1": [{ id: "abcdefghijk", title: "Binary in 5 minutes" }] */
  topicVideos: {}
};
