/* =====================================================================
   VIDYADEEPA – SETTINGS + CALENDAR DATA
   This is the ONLY file you need to edit for new months.
   ===================================================================== */

window.VD_CONFIG = {
  // Paste your Google Apps Script Web App URL between the quotes (Step 5).
  // Leave empty "" and photos are saved only on the device that uploads them.
  uploadUrl: "",
  slideSeconds: 10
};

/* ---------------------------------------------------------------------
   WEEKS: one line per week. Dates are YYYY-MM-DD (start and end inclusive).
   acts: which activity (from VD_ACTIVITIES below) each grade group does.
   --------------------------------------------------------------------- */
window.VD_WEEKS = [
  { month: "2026-11", week: 1, start: "2026-11-02", end: "2026-11-08", acts: { "2-4": "culture24", "5-8": "folkArts" } },
  { month: "2026-11", week: 2, start: "2026-11-09", end: "2026-11-15", acts: { "2-4": "remedy", "5-8": "sound" } },
  { month: "2026-11", week: 3, start: "2026-11-16", end: "2026-11-22", acts: { "2-4": "money", "5-8": "culture58" } },
  { month: "2026-11", week: 4, start: "2026-11-23", end: "2026-11-30", acts: { "2-4": "familyTree", "5-8": "remedy" } },
  { month: "2026-12", week: 1, start: "2026-12-01", end: "2026-12-06", acts: { "2-4": "tourist", "5-8": "tourist" } },
  { month: "2026-12", week: 2, start: "2026-12-07", end: "2026-12-13", acts: { "2-4": "saving", "5-8": "saving" } },
  { month: "2026-12", week: 3, start: "2026-12-14", end: "2026-12-20", acts: { "2-4": "measure", "5-8": "tradArts" } },
  { month: "2026-12", week: 4, start: "2026-12-21", end: "2026-12-27", acts: { "2-4": "greeting", "5-8": "ecoTransport" } }
];

/* ---------------------------------------------------------------------
   ACTIVITIES: title, theme, description (from the DIET handbook),
   resources (things needed) and steps (explanation).
   --------------------------------------------------------------------- */
window.VD_ACTIVITIES = {
  folkArts: {
    icon: "🥁",
    theme: { kn: "ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ", en: "Culture & Heritage" },
    title: { kn: "ಜಾನಪದ ಕಲೆಗಳ ಪರಿಚಯ", en: "Introduction to Folk Arts" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಗ್ರಾಮದ ಜಾನಪದ ಕಲೆಗಳ ಪರಿಚಯವನ್ನು ಮಕ್ಕಳಿಗೆ ತಿಳಿಸಿಕೊಡುವರು. ಅದರ ವಿಶೇಷತೆ ಮತ್ತು ಇತಿಹಾಸದ ಬಗ್ಗೆಯೂ ಮನವರಿಕೆ ಮಾಡುವರು.",
      en: "Parents introduce their children to the folk arts of their village and explain what is special about each art and its history."
    },
    res: {
      kn: ["ಜಾನಪದ ಹಾಡು ಅಥವಾ ಕಥೆ (ಅಜ್ಜ-ಅಜ್ಜಿಯರಿಂದ)", "ಮೊಬೈಲ್‌ನಲ್ಲಿ ಕಲೆಯ ವಿಡಿಯೋ (ಐಚ್ಛಿಕ)", "ನೋಟ್‌ಬುಕ್ ಮತ್ತು ಪೆನ್ಸಿಲ್"],
      en: ["A folk song or story (from grandparents)", "A video of the art form on a phone (optional)", "Notebook and pencil"]
    },
    steps: {
      kn: ["ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಕಾಣುವ ಒಂದು ಜಾನಪದ ಕಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ (ಉದಾ: ಡೊಳ್ಳು ಕುಣಿತ, ಯಕ್ಷಗಾನ, ಜಾನಪದ ಹಾಡು).", "ಆ ಕಲೆ ಯಾವ ಸಂದರ್ಭದಲ್ಲಿ ಪ್ರದರ್ಶನವಾಗುತ್ತದೆ, ಯಾರು ಪ್ರದರ್ಶಿಸುತ್ತಾರೆ ಎಂದು ಮಗುವಿಗೆ ಹೇಳಿ.", "ಸಾಧ್ಯವಾದರೆ ಒಂದು ಹಾಡು ಹಾಡಿ ಅಥವಾ ವಿಡಿಯೋ ತೋರಿಸಿ.", "ಮಗು ತಾನು ಕಲಿತದ್ದನ್ನು 3–4 ವಾಕ್ಯಗಳಲ್ಲಿ ಹೇಳಲಿ ಅಥವಾ ಬರೆಯಲಿ."],
      en: ["Choose one folk art seen in your area (e.g. Dollu Kunitha, Yakshagana, a folk song).", "Tell your child when it is performed and who performs it.", "If you can, sing a song or show a short video.", "Let your child say or write 3–4 sentences about what they learnt."]
    }
  },
  sound: {
    icon: "🦜",
    theme: { kn: "ಆಲಿಸುವಿಕೆ ಮತ್ತು ವೀಕ್ಷಣೆ", en: "Listening & Observation" },
    title: { kn: "ಧ್ವನಿ ಅನುಕರಣೆ", en: "Sound Imitation" },
    desc: {
      kn: "ಪೋಷಕರು ಮಕ್ಕಳೊಡನೆ ಕುಳಿತು ವಿವಿಧ ರೀತಿಯ ಪ್ರಾಣಿ, ಪಕ್ಷಿಗಳ ಧ್ವನಿ ಅನುಕರಣೆ ಮಾಡಬೇಕು. ಮಕ್ಕಳು ಅದನ್ನು ಗುರುತಿಸಬೇಕು.",
      en: "Parents sit with their children and imitate the sounds of different animals and birds. The children guess which one it is."
    },
    res: {
      kn: ["ಪ್ರಾಣಿ-ಪಕ್ಷಿಗಳ ಚಿತ್ರಗಳು (ಐಚ್ಛಿಕ)", "ಕಾಗದ ಮತ್ತು ಪೆನ್ಸಿಲ್"],
      en: ["Pictures of animals and birds (optional)", "Paper and pencil"]
    },
    steps: {
      kn: ["ಮನೆಯವರೆಲ್ಲ ವೃತ್ತಾಕಾರದಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳಿ.", "ಪೋಷಕರು ಒಂದು ಪ್ರಾಣಿ ಅಥವಾ ಪಕ್ಷಿಯ ಧ್ವನಿ ಮಾಡಲಿ (ಉದಾ: ಹಸು, ಕಾಗೆ, ನಾಯಿ, ಕೋಗಿಲೆ).", "ಮಗು ಆ ಪ್ರಾಣಿ/ಪಕ್ಷಿಯ ಹೆಸರು ಹೇಳಲಿ; ನಂತರ ಪಾತ್ರ ಬದಲಿಸಿ.", "ಕೊನೆಗೆ ಗುರುತಿಸಿದ ಪ್ರಾಣಿ-ಪಕ್ಷಿಗಳ ಪಟ್ಟಿಯನ್ನು ಮಗು ಬರೆಯಲಿ."],
      en: ["Sit together in a circle at home.", "A parent makes the sound of an animal or bird (e.g. cow, crow, dog, cuckoo).", "The child names it, then swap roles.", "At the end, the child writes a list of the animals and birds they guessed."]
    }
  },
  culture58: {
    icon: "🪷",
    theme: { kn: "ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ", en: "Culture & Heritage" },
    title: { kn: "ನಮ್ಮ ಸಂಸ್ಕೃತಿ ಪರಿಚಯ", en: "Knowing Our Culture" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಮನೆ, ಕುಟುಂಬ, ಊರು/ಗ್ರಾಮದ ವಿಶೇಷತೆ, ಜನರ ವೇಷಭೂಷಣ, ಆಹಾರ ಪದ್ಧತಿ ಮತ್ತು ಆಚರಣೆಗಳ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ತಮ್ಮ ಮಕ್ಕಳಿಗೆ ತಿಳಿಸಿಕೊಡುವುದು.",
      en: "Parents tell their children about what is special about their home, family and village, and about local clothing, food habits and celebrations."
    },
    res: {
      kn: ["ಕುಟುಂಬದ ಹಳೆಯ ಫೋಟೋಗಳು (ಐಚ್ಛಿಕ)", "ಡ್ರಾಯಿಂಗ್ ಹಾಳೆ ಮತ್ತು ಬಣ್ಣಗಳು"],
      en: ["Old family photos (optional)", "Drawing sheet and colours"]
    },
    steps: {
      kn: ["ನಿಮ್ಮ ಊರಿನ ಒಂದು ಹಬ್ಬ ಅಥವಾ ಆಚರಣೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.", "ಆ ದಿನ ತೊಡುವ ಉಡುಪು, ಮಾಡುವ ಅಡುಗೆ ಮತ್ತು ಆಚರಣೆಯ ಕಾರಣವನ್ನು ವಿವರಿಸಿ.", "ಮಗು ಆ ಹಬ್ಬದ ಒಂದು ಚಿತ್ರ ಬಿಡಿಸಲಿ.", "ಶಾಲೆಯಲ್ಲಿ ಗೆಳೆಯರಿಗೆ ಹೇಳಲು ಮಗು 3 ವಿಷಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಲಿ."],
      en: ["Choose one festival or celebration from your village.", "Explain the clothes worn, the food cooked and why it is celebrated.", "Let your child draw a picture of the festival.", "Your child lists 3 things to tell friends at school."]
    }
  },
  culture24: {
    icon: "🪷",
    theme: { kn: "ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ", en: "Culture & Heritage" },
    title: { kn: "ನಮ್ಮ ಸಂಸ್ಕೃತಿ ಪರಿಚಯ", en: "Knowing Our Culture" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಜಿಲ್ಲೆಯ ವಿಶೇಷತೆ, ಜನರ ವೇಷಭೂಷಣ, ಆಹಾರ ಪದ್ಧತಿ ಮತ್ತು ಆಚರಣೆಗಳ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ತಮ್ಮ ಮಕ್ಕಳಿಗೆ ತಿಳಿಸಿಕೊಡುವುದು.",
      en: "Parents tell their children what is special about their district – its clothing, food habits and celebrations."
    },
    res: {
      kn: ["ಕುಟುಂಬದ ಹಳೆಯ ಫೋಟೋಗಳು (ಐಚ್ಛಿಕ)", "ಡ್ರಾಯಿಂಗ್ ಹಾಳೆ ಮತ್ತು ಬಣ್ಣಗಳು"],
      en: ["Old family photos (optional)", "Drawing sheet and colours"]
    },
    steps: {
      kn: ["ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಒಂದು ಪ್ರಸಿದ್ಧ ಸ್ಥಳ, ಆಹಾರ ಅಥವಾ ಹಬ್ಬದ ಬಗ್ಗೆ ಹೇಳಿ.", "ಆ ಹಬ್ಬದಲ್ಲಿ ತೊಡುವ ಉಡುಪು ಮತ್ತು ಮಾಡುವ ಅಡುಗೆಯನ್ನು ವಿವರಿಸಿ.", "ಮಗು ಇಷ್ಟವಾದ ಒಂದು ವಿಷಯದ ಚಿತ್ರ ಬಿಡಿಸಲಿ.", "ಮಗು ಚಿತ್ರದ ಬಗ್ಗೆ 2 ವಾಕ್ಯ ಹೇಳಲಿ."],
      en: ["Tell your child about one famous place, food or festival of your district.", "Describe the clothes worn and the food cooked for it.", "Let your child draw the part they liked best.", "Your child says 2 sentences about the drawing."]
    }
  },
  remedy: {
    icon: "🌿",
    theme: { kn: "ಆರೋಗ್ಯ ಮತ್ತು ಸ್ವಾಸ್ಥ್ಯ", en: "Health & Wellbeing" },
    title: { kn: "ಮನೆ ಮದ್ದು", en: "Home Remedies" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಮಕ್ಕಳಿಗೆ ಸಾಧಾರಣ ರೋಗಗಳಿಗೆ ಮನೆಯಲ್ಲೇ ಮಾಡಿಕೊಳ್ಳುವ ಔಷಧಗಳ ಕುರಿತು ತಿಳಿಸುವುದು ಮತ್ತು ಸ್ಥಳೀಯವಾಗಿ ಸಿಗುವ ಔಷಧಿ ಸಸ್ಯಗಳ ಪರಿಚಯ ಮಾಡಿಕೊಡುವುದು.",
      en: "Parents tell their children about simple home remedies for common minor illnesses and introduce medicinal plants found nearby."
    },
    res: {
      kn: ["ತುಳಸಿ, ಬೇವು, ಅರಿಶಿನ, ಶುಂಠಿ ಮುಂತಾದ ಸಸ್ಯಗಳು", "ನೋಟ್‌ಬುಕ್ ಮತ್ತು ಪೆನ್ಸಿಲ್"],
      en: ["Plants such as tulsi, neem, turmeric, ginger", "Notebook and pencil"]
    },
    steps: {
      kn: ["ಮನೆಯ ಸುತ್ತ ಸಿಗುವ 3–4 ಔಷಧಿ ಸಸ್ಯಗಳನ್ನು ತೋರಿಸಿ (ಉದಾ: ತುಳಸಿ, ಅರಿಶಿನ, ಶುಂಠಿ, ಬೇವು).", "ಪ್ರತಿ ಸಸ್ಯದ ಹೆಸರು ಮತ್ತು ಉಪಯೋಗವನ್ನು ಸರಳವಾಗಿ ಹೇಳಿ.", "ಮಗು ಎಲೆಗಳನ್ನು ಗುರುತಿಸಿ, ಹೆಸರು ಬರೆಯಲಿ ಅಥವಾ ಚಿತ್ರ ಬಿಡಿಸಲಿ.", "ಸೂಚನೆ: ಮನೆ ಮದ್ದು ಸಣ್ಣ ತೊಂದರೆಗಳಿಗೆ ಮಾತ್ರ. ಜ್ವರ ಅಥವಾ ಕಾಯಿಲೆ ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ. ಮಕ್ಕಳು ತಾವಾಗಿ ಯಾವುದೇ ಔಷಧ ತಯಾರಿಸಬಾರದು."],
      en: ["Show 3–4 medicinal plants found near home (e.g. tulsi, turmeric, ginger, neem).", "Say each plant's name and its use in simple words.", "Your child identifies the leaves and writes the names or draws them.", "Note: home remedies are only for minor problems. If a fever or illness continues, see a doctor. Children should never prepare any medicine on their own."]
    }
  },
  money: {
    icon: "🪙",
    theme: { kn: "ದೈನಂದಿನ ಗಣಿತ", en: "Everyday Maths" },
    title: { kn: "ಹಣದ ಮೌಲ್ಯ ತಿಳಿಯೋಣ", en: "Let's Learn the Value of Money" },
    desc: {
      kn: "ಪೋಷಕರು ಹಣದ ನಾಣ್ಯ ಮತ್ತು ನೋಟಿನ ನಿರ್ದಿಷ್ಟ ಮೌಲ್ಯವನ್ನು ವಿವರಿಸುವರು ಮತ್ತು ಆ ಮೌಲ್ಯಕ್ಕೆ ಪ್ರಸ್ತುತ ಯಾವ ವಸ್ತು ಖರೀದಿಸಬಹುದು ಎಂದು ತಿಳಿಸುವುದು.",
      en: "Parents explain the value of each coin and note, and what can be bought today for that amount."
    },
    res: {
      kn: ["ನಾಣ್ಯಗಳು ಮತ್ತು ನೋಟುಗಳು", "ಮನೆಯ ಸಣ್ಣ ವಸ್ತುಗಳು (ಆಟದ ಅಂಗಡಿಗೆ)", "ಬೆಲೆ ಚೀಟಿಗೆ ಕಾಗದ"],
      en: ["Coins and notes", "Small household items (for a pretend shop)", "Paper for price tags"]
    },
    steps: {
      kn: ["ಮನೆಯಲ್ಲಿರುವ ₹1, ₹2, ₹5, ₹10 ನಾಣ್ಯಗಳು ಮತ್ತು ₹10, ₹20, ₹50 ನೋಟುಗಳನ್ನು ತೋರಿಸಿ.", "ಪ್ರತಿಯೊಂದರ ಮೌಲ್ಯವನ್ನು ಮಗು ಗುರುತಿಸಲಿ.", "ಆಟದ ಅಂಗಡಿ ಮಾಡಿ: ಮನೆಯ ವಸ್ತುಗಳಿಗೆ ಬೆಲೆ ಇಟ್ಟು, ಮಗು ಖರೀದಿಸಿ ಚಿಲ್ಲರೆ ಲೆಕ್ಕ ಹಾಕಲಿ.", "ಮುಂದಿನ ಬಾರಿ ಅಂಗಡಿಗೆ ಹೋದಾಗ ಮಗುವಿನಿಂದ ಹಣ ಕೊಡಿಸಿ."],
      en: ["Show ₹1, ₹2, ₹5, ₹10 coins and ₹10, ₹20, ₹50 notes from home.", "Let your child identify the value of each one.", "Play shop: put prices on home items; your child buys and works out the change.", "Next time you visit a shop, let your child pay."]
    }
  },
  familyTree: {
    icon: "🌳",
    theme: { kn: "ಕುಟುಂಬ ಮತ್ತು ಸಮುದಾಯ", en: "Family & Community" },
    title: { kn: "ವಂಶವೃಕ್ಷ ರಚಿಸೋಣ!", en: "Let's Make a Family Tree!" },
    desc: {
      kn: "ಪೋಷಕರು ಮಕ್ಕಳೊಂದಿಗೆ ಸೇರಿ ಅಜ್ಜ-ಅಜ್ಜಿ, ತಂದೆ-ತಾಯಿ, ಅಣ್ಣ-ತಮ್ಮ, ಅಕ್ಕ-ತಂಗಿಯರ ಹೆಸರುಗಳೊಂದಿಗೆ ಕುಟುಂಬದ ವಂಶವೃಕ್ಷವನ್ನು ತಯಾರಿಸುವುದು.",
      en: "Parents and children make a family tree together with the names of grandparents, parents, brothers and sisters."
    },
    res: {
      kn: ["ಡ್ರಾಯಿಂಗ್ ಹಾಳೆ", "ಬಣ್ಣದ ಪೆನ್ಸಿಲ್‌ಗಳು", "ಕುಟುಂಬದ ಫೋಟೋಗಳು (ಐಚ್ಛಿಕ)", "ಅಂಟು"],
      en: ["Drawing sheet", "Colour pencils", "Family photos (optional)", "Glue"]
    },
    steps: {
      kn: ["ಒಂದು ಹಾಳೆಯಲ್ಲಿ ಮರದ ಚಿತ್ರ ಬಿಡಿಸಿ.", "ಕೆಳಗೆ ಅಜ್ಜ-ಅಜ್ಜಿ, ಮಧ್ಯದಲ್ಲಿ ತಂದೆ-ತಾಯಿ, ಮೇಲೆ ಮಕ್ಕಳ ಹೆಸರು ಬರೆಯಿರಿ.", "ಪ್ರತಿಯೊಬ್ಬರ ಬಗ್ಗೆ ಒಂದು ಕಥೆ ಅಥವಾ ನೆನಪನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.", "ವಂಶವೃಕ್ಷವನ್ನು ಮನೆಯ ಓದುವ ಮೂಲೆಯಲ್ಲಿ ಅಂಟಿಸಿ."],
      en: ["Draw a tree on a sheet of paper.", "Write grandparents' names at the bottom, parents in the middle and children at the top.", "Share one story or memory about each person.", "Stick the family tree in your home reading corner."]
    }
  },
  tourist: {
    icon: "🏞️",
    theme: { kn: "ಪ್ರವಾಸ ಮತ್ತು ಅಭಿವ್ಯಕ್ತಿ", en: "Travel & Expression" },
    title: { kn: "ನೆಚ್ಚಿನ ಪ್ರವಾಸಿ ತಾಣ", en: "Our Favourite Tourist Place" },
    desc: {
      kn: "ಪೋಷಕರು ಮತ್ತು ಮಕ್ಕಳು ತಾವು ಈ ಹಿಂದೆ ಭೇಟಿ ನೀಡಿದ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲಿ ಅವರಿಗೆ ಇಷ್ಟವಾದ ಸ್ಥಳದ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ, ಒಂದು ಚಿತ್ರ ಬಿಡಿಸುವುದು.",
      en: "Parents and children talk about their favourite place among those they have visited, and draw a picture of it."
    },
    res: {
      kn: ["ಡ್ರಾಯಿಂಗ್ ಹಾಳೆ", "ಬಣ್ಣಗಳು", "ಪ್ರವಾಸದ ಫೋಟೋಗಳು (ಐಚ್ಛಿಕ)"],
      en: ["Drawing sheet", "Colours", "Trip photos (optional)"]
    },
    steps: {
      kn: ["ಕುಟುಂಬದವರು ಭೇಟಿ ನೀಡಿದ ಸ್ಥಳಗಳನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಿ (ದೇವಸ್ಥಾನ, ಉದ್ಯಾನ, ಜಲಪಾತ, ಕೋಟೆ).", "ಎಲ್ಲರಿಗೂ ಇಷ್ಟವಾದ ಒಂದು ಸ್ಥಳ ಆಯ್ಕೆ ಮಾಡಿ; ಅಲ್ಲಿ ಏನು ನೋಡಿದಿರಿ, ಹೇಗೆ ಹೋದಿರಿ ಎಂದು ಚರ್ಚಿಸಿ.", "ಮಗು ಆ ಸ್ಥಳದ ಚಿತ್ರ ಬಿಡಿಸಿ ಬಣ್ಣ ಹಚ್ಚಲಿ.", "ಚಿತ್ರದ ಕೆಳಗೆ ಸ್ಥಳದ ಹೆಸರು ಮತ್ತು ಒಂದು ವಾಕ್ಯ ಬರೆಯಲಿ."],
      en: ["Remember the places your family has visited (temple, park, waterfall, fort).", "Pick one everyone liked; talk about what you saw and how you travelled.", "Your child draws and colours the place.", "Below the drawing, write the place's name and one sentence."]
    }
  },
  saving: {
    icon: "🐷",
    theme: { kn: "ಹಣ ಮತ್ತು ಮೌಲ್ಯಗಳು", en: "Money & Values" },
    title: { kn: "ಮನೆಯಲ್ಲೇ ಉಳಿತಾಯ", en: "Saving at Home" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಮಕ್ಕಳಲ್ಲಿ ಚಿಕ್ಕ ವಯಸ್ಸಿನಿಂದಲೇ ಉಳಿತಾಯ ಮನೋಭಾವವನ್ನು ಬೆಳೆಸುವುದು ಮತ್ತು ಅಗತ್ಯ ಸಹಕಾರವನ್ನು ನೀಡುವುದು.",
      en: "Parents build the habit of saving in their children from a young age and give them the support they need."
    },
    res: {
      kn: ["ಖಾಲಿ ಡಬ್ಬಿ ಅಥವಾ ಹುಂಡಿ", "ಬಣ್ಣದ ಕಾಗದ", "ಉಳಿತಾಯ ದಾಖಲೆ ಹಾಳೆ"],
      en: ["An empty box or piggy bank", "Coloured paper", "A savings record sheet"]
    },
    steps: {
      kn: ["ಒಂದು ಡಬ್ಬಿ ಅಥವಾ ಹುಂಡಿಯನ್ನು ಮಗುವಿನೊಂದಿಗೆ ಅಲಂಕರಿಸಿ.", "ಪ್ರತಿ ದಿನ ಅಥವಾ ವಾರ ಸಣ್ಣ ಮೊತ್ತವನ್ನು ಉಳಿಸುವ ಗುರಿ ಇಡಿ.", "ನೀರು, ವಿದ್ಯುತ್, ಆಹಾರ ಉಳಿಸುವುದೂ ಉಳಿತಾಯವೇ ಎಂದು ತಿಳಿಸಿ.", "ವಾರದ ಕೊನೆಯಲ್ಲಿ ಉಳಿಸಿದ್ದನ್ನು ಒಟ್ಟಿಗೆ ಎಣಿಸಿ."],
      en: ["Decorate a box or piggy bank with your child.", "Set a small daily or weekly saving goal.", "Explain that saving water, electricity and food is also saving.", "Count the savings together at the end of the week."]
    }
  },
  tradArts: {
    icon: "🎨",
    theme: { kn: "ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ", en: "Culture & Heritage" },
    title: { kn: "ನಮ್ಮ ಪಾರಂಪರಿಕ ಕಲೆಗಳು", en: "Our Traditional Arts" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಮಕ್ಕಳಿಗೆ ಕುಟುಂಬದಲ್ಲಿ ಪಾಲಿಸಿಕೊಂಡು ಬಂದ ಪಾರಂಪರಿಕ ಕಲೆಗಳ ಪರಿಚಯ ಮಾಡಿಸುವುದು. ಜೊತೆಗೆ ಅವುಗಳ ಮಹತ್ವ, ಇತಿಹಾಸ ಮತ್ತು ವಿಶೇಷತೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿಕೊಡುವುದು.",
      en: "Parents introduce their children to the traditional arts practised in the family, and explain their importance, history and special features."
    },
    res: {
      kn: ["ರಂಗೋಲಿ ಪುಡಿ / ದಾರ / ಮಣ್ಣು (ಆಯ್ದ ಕಲೆಗೆ ತಕ್ಕಂತೆ)", "ಹಳೆಯ ಕಲಾಕೃತಿಗಳು (ಐಚ್ಛಿಕ)"],
      en: ["Rangoli powder / thread / clay (depending on the art chosen)", "Old artworks from the family (optional)"]
    },
    steps: {
      kn: ["ಕುಟುಂಬದಲ್ಲಿ ಮಾಡುವ ಒಂದು ಕಲೆ ಆಯ್ಕೆ ಮಾಡಿ (ರಂಗೋಲಿ, ಕಸೂತಿ, ಬುಟ್ಟಿ ಹೆಣೆಯುವುದು, ಮಣ್ಣಿನ ಕೆಲಸ, ಹಾಡು).", "ಅದನ್ನು ಯಾರಿಂದ ಕಲಿತಿರಿ ಎಂಬ ಕಥೆ ಹೇಳಿ.", "ಮಗುವಿನೊಂದಿಗೆ ಸೇರಿ ಸಣ್ಣ ಮಾದರಿ ಮಾಡಿ.", "ಮಗು ಮಾಡಿದ ಕಲಾಕೃತಿಯ ಫೋಟೋವನ್ನು ಶಾಲೆಯೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ."],
      en: ["Choose one art your family practises (rangoli, embroidery, basket weaving, clay work, songs).", "Tell the story of who you learnt it from.", "Make a small piece together with your child.", "Share a photo of your child's artwork with the school."]
    }
  },
  ecoTransport: {
    icon: "🚲",
    theme: { kn: "ಪರಿಸರ", en: "Environment" },
    title: { kn: "ಪರಿಸರ ಸ್ನೇಹಿ ಸಾರಿಗೆ", en: "Eco-friendly Transport" },
    desc: {
      kn: "ಪರಿಸರ ಸ್ನೇಹಿ ಸಾರಿಗೆಗಳಾದ ಸೈಕಲ್, ಕಾಲ್ನಡಿಗೆ, ಎಲೆಕ್ಟ್ರಿಕ್ ಬಸ್, ರೈಲುಗಳ ಬಗ್ಗೆ ಮಕ್ಕಳಿಗೆ ಪರಿಚಯಿಸುವುದು. ಯಾವ ವಾಹನಗಳಿಂದ ಮಾಲಿನ್ಯ ಹೆಚ್ಚು, ಯಾವುದರಿಂದ ಕಡಿಮೆ ಎಂದು ಸರಳವಾಗಿ ವಿವರಿಸುವುದು.",
      en: "Introduce children to eco-friendly transport like cycling, walking, electric buses and trains, and explain simply which vehicles pollute more and which pollute less."
    },
    res: {
      kn: ["ನೋಟ್‌ಬುಕ್ ಮತ್ತು ಪೆನ್ಸಿಲ್", "ವಾಹನಗಳ ಚಿತ್ರಗಳು (ಐಚ್ಛಿಕ)"],
      en: ["Notebook and pencil", "Pictures of vehicles (optional)"]
    },
    steps: {
      kn: ["ಪೋಷಕರ ಜೊತೆ ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿ ನಿಂತು 10 ನಿಮಿಷ ಕಾಣುವ ವಾಹನಗಳನ್ನು ಮಗು ಎಣಿಸಲಿ.", "ಹೊಗೆ ಬಿಡುವ ಮತ್ತು ಹೊಗೆ ಬಿಡದ ವಾಹನಗಳೆಂದು ಎರಡು ಪಟ್ಟಿ ಮಾಡಿ.", "ಸೈಕಲ್, ನಡಿಗೆ, ಬಸ್, ರೈಲು ಏಕೆ ಪರಿಸರಕ್ಕೆ ಒಳ್ಳೆಯದು ಎಂದು ಚರ್ಚಿಸಿ.", "ಈ ವಾರ ಒಂದು ಸಣ್ಣ ಪ್ರಯಾಣವನ್ನು ನಡೆದು ಅಥವಾ ಸೈಕಲ್‌ನಲ್ಲಿ ಮಾಡಿ."],
      en: ["Standing with a parent in a safe spot, your child counts the vehicles that pass in 10 minutes.", "Make two lists: vehicles that give out smoke and those that don't.", "Talk about why cycling, walking, buses and trains are good for the environment.", "This week, make one short trip on foot or by cycle."]
    }
  },
  measure: {
    icon: "📏",
    theme: { kn: "ದೈನಂದಿನ ಗಣಿತ", en: "Everyday Maths" },
    title: { kn: "ಅಳತೆ ಮಾಡು ಜಾಣ!", en: "Measure It, Smart One!" },
    desc: {
      kn: "ಪೋಷಕರು ತಮ್ಮ ಮನೆಯಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಅನೌಪಚಾರಿಕ ಮಾಪನದ ವಿಧಗಳಾದ ಗೇಣು, ಮಾರು, ಮೊಳ, ಅಡಿಗಳ ಪರಿಕಲ್ಪನೆಯನ್ನು ಅರ್ಥ ಮಾಡಿಸಬಹುದು ಅಥವಾ ಸ್ಕೇಲ್‌ನಂತಹ ಪರಿಕರ ಬಳಸಿ ಅಳತೆ ಮಾಡುವುದನ್ನು ಕಲಿಸಬಹುದು.",
      en: "At home, parents explain informal measures like the hand-span (gena), arm-length (mola), arm-span (maaru) and foot, or teach measuring with a scale."
    },
    res: {
      kn: ["ಸ್ಕೇಲ್ ಅಥವಾ ಅಳತೆ ಟೇಪ್", "ದಾರ", "ನೋಟ್‌ಬುಕ್"],
      en: ["Scale or measuring tape", "String", "Notebook"]
    },
    steps: {
      kn: ["ಗೇಣು, ಮೊಳ, ಮಾರು, ಅಡಿ ಎಂದರೇನು ಎಂದು ಕೈ-ಕಾಲಿನಿಂದ ತೋರಿಸಿ.", "ಮೇಜು, ಬಾಗಿಲು, ಚಾಪೆಯನ್ನು ಗೇಣಿನಿಂದ ಅಳೆಯಿರಿ. ಪೋಷಕರ ಮತ್ತು ಮಗುವಿನ ಉತ್ತರ ಏಕೆ ಬೇರೆ ಎಂದು ಚರ್ಚಿಸಿ.", "ನಂತರ ಸ್ಕೇಲ್ ಅಥವಾ ಟೇಪ್‌ನಿಂದ ಅಳೆದು ಹೋಲಿಸಿ.", "ಅಳತೆಗಳನ್ನು ಒಂದು ಸರಳ ಕೋಷ್ಟಕದಲ್ಲಿ ಬರೆಯಿರಿ."],
      en: ["Show what a hand-span, arm-length, arm-span and foot are, using hands and feet.", "Measure a table, door and mat in hand-spans. Discuss why the parent's and child's answers differ.", "Then measure with a scale or tape and compare.", "Write the measurements in a simple table."]
    }
  },
  greeting: {
    icon: "💌",
    theme: { kn: "ಕೃತಜ್ಞತೆ ಮತ್ತು ಸೃಜನಶೀಲತೆ", en: "Gratitude & Creativity" },
    title: { kn: "ಶಿಕ್ಷಕರಿಗೊಂದು ಶುಭಾಶಯ ಪತ್ರ", en: "A Greeting Card for the Teacher" },
    desc: {
      kn: "ಮಗುವಿಗೆ ಇಷ್ಟವಾದ ಕಾಗದದ ವಿನ್ಯಾಸವನ್ನು ಮಾಡಿಸಿ, ವಿವಿಧ ಬಣ್ಣಗಳಿಂದ ಅಲಂಕಾರ ಮಾಡಿ, ಮಕ್ಕಳಿಂದ ಶಿಕ್ಷಕರಿಗೆ ಒಂದು ಶುಭಾಶಯ ಪತ್ರವನ್ನು ಬರೆಯಲು ಸಹಾಯ ಮಾಡುವುದು.",
      en: "Help your child make a paper design they like, decorate it with colours, and write a greeting card for their teacher."
    },
    res: {
      kn: ["ಬಣ್ಣದ ಕಾಗದ ಅಥವಾ ಹಾಳೆ", "ಬಣ್ಣಗಳು, ಸ್ಕೆಚ್ ಪೆನ್", "ಒಣ ಹೂ ಅಥವಾ ಎಲೆಗಳು (ಐಚ್ಛಿಕ)", "ಅಂಟು"],
      en: ["Coloured paper or a sheet", "Colours, sketch pens", "Dry flowers or leaves (optional)", "Glue"]
    },
    steps: {
      kn: ["ಹಾಳೆಯನ್ನು ಅರ್ಧಕ್ಕೆ ಮಡಚಿ ಕಾರ್ಡ್ ಮಾಡಿ.", "ಮುಂಭಾಗವನ್ನು ಹೂ, ಎಲೆ, ಬಣ್ಣಗಳಿಂದ ಅಲಂಕರಿಸಿ.", "ಒಳಗೆ ಮಗು ತನ್ನ ಮಾತಿನಲ್ಲಿ ಧನ್ಯವಾದ ಸಂದೇಶ ಬರೆಯಲಿ. ಪೋಷಕರು ಅಕ್ಷರ ತಿದ್ದಲು ಮಾತ್ರ ಸಹಾಯ ಮಾಡಲಿ.", "ಮಗು ಕಾರ್ಡ್ ಅನ್ನು ಶಾಲೆಯಲ್ಲಿ ಶಿಕ್ಷಕರಿಗೆ ಕೊಡಲಿ."],
      en: ["Fold a sheet in half to make a card.", "Decorate the front with flowers, leaves and colours.", "Inside, your child writes a thank-you message in their own words. Parents only help with spelling.", "Your child gives the card to the teacher at school."]
    }
  }
};