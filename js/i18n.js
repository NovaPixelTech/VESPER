/* VESPER — localization layer. No fetch, works from file:// */
window.I18N = (function () {
  'use strict';

  var STRINGS = {
    en: {
      brand: 'VESPER', brandSub: 'THE LAST TRANSMISSION', dread: 'DREAD',
      codex: 'Codex', inventory: 'Inventory', sound: 'Sound', menu: 'Menu',
      quizKicker: 'DEDUCTION REQUIRED', stepBack: 'STEP BACK', close: 'CLOSE',
      settings: 'SETTINGS', settingsTitle: 'SHIP SYSTEMS', language: 'LANGUAGE / ΓΛΩΣΣΑ',
      on: 'ON', off: 'OFF', volume: 'VOLUME', captions: 'SOUND CAPTIONS',
      motion: 'MOTION', typeSpeed: 'TEXT SPEED', slow: 'SLOW', normal: 'NORMAL', fast: 'FAST',
      titleEyebrow: 'A SIGNAL FROM THE EDGE OF EVERYTHING',
      titleSubtitle: 'THE LAST TRANSMISSION',
      titleBlurb: 'You wake aboard a salvage ship that has drifted too far from everything human. The crew is gone. A seven-tone signal repeats from a station that should not exist — and it seems to know your name.',
      newGame: 'NEW TRANSMISSION', continue: 'CONTINUE', titleHint: 'HEADPHONES RECOMMENDED',
      credits: 'CREDITS', playAgain: 'NEW TRANSMISSION', titleBtn: 'TITLE',

      act1: 'ACT I — THE DERELICT', act2: 'ACT II — THE STATION', act3: 'ACT III — THE SOURCE',
      invTitle: 'CARGO MANIFEST', invEmpty: 'Nothing but the clothes on your back.',
      codexTitle: 'THE CODEX', codexEmpty: 'No patterns recognised yet.',
      creditTitle: 'SOURCES & CREDITS',
      creditArt: 'Scene imagery is public-domain or CC0 material from NASA and Wikimedia Commons, colour-graded for atmosphere. See CREDITS.md.',
      creditAudio: 'Every sound is a recorded wave sample — no synthesis. Sources are CC0 / public domain and listed in CREDITS.md.',
      creditBuild: 'Built as a zero-dependency web app. All assets are bundled locally; the game works offline.',

      locked: 'LOCKED', quizTag: 'DEDUCE', onceTag: 'DONE', itemTag: 'ITEM',
      itemFound: 'ACQUIRED', clueFound: 'PATTERN RECOGNISED', itemLost: 'CONSUMED',
      dreadUp: 'DREAD INCREASES', dreadDown: 'THE DARKNESS EASES',
      quizCorrectLabel: 'CORRECT', quizWrongLabel: 'INCORRECT',
      attempts: 'ATTEMPTS', noSave: 'No transmission to continue.',
      saved: 'PROGRESS STORED', audioOn: 'SOUND ON', audioOff: 'SOUND OFF',
      skipHint: 'CLICK TO REVEAL INSTANTLY', endAct: 'TRANSMISSION INTERRUPTED',
      statsClues: 'CLUES', statsDread: 'DREAD', statsEnding: 'OUTCOME',
      endingFound: 'ENDING DISCOVERED', restartHint: 'The loop remembers. Try again.',
      aiSettings: 'AI STORYTELLER (OPTIONAL)', aiEnable: 'ENABLE AI',
      aiBaseUrl: 'API BASE URL', aiModel: 'MODEL', aiKey: 'API KEY (STORED LOCALLY)',
      aiNote: 'Bring your own OpenAI-compatible API key to ask questions and try custom actions. Your key stays in this browser. AI can react and answer in-world but will not solve puzzles or grant progress.',
      aiPlaceholder: 'Ask a question or try a custom action...', aiSend: 'SEND',
      aiThinking: 'The station listens...', aiYou: 'YOU', aiVesper: 'VESPER',
      aiError: 'AI error', aiNotConfigured: 'Enable AI and add your API key in Settings to ask questions or try custom actions.',
      log: 'Log', logTitle: 'SHIP LOG', logEmpty: 'No entries yet.',
      undo: 'Undo', undoNone: 'Nothing to undo.', revisit: 'You have stood here before.',
      suggestLabel: 'SUGGESTIONS', endingsFound: 'Endings found', loopRemembers: 'The loop remembers.',
      arrived: 'Arrived', chose: 'Action', asked: 'Asked', journalAI: 'Transmission'
    },

    el: {
      brand: 'ΕΣΠΕΡΙΑ', brandSub: 'Η ΤΕΛΕΥΤΑΙΑ ΜΕΤΑΔΟΣΗ', dread: 'ΔΕΟΣ',
      codex: 'Κώδικας', inventory: 'Εξοπλισμός', sound: 'Ήχος', menu: 'Μενού',
      quizKicker: 'ΑΠΑΙΤΕΙΤΑΙ ΣΥΛΛΟΓΙΣΜΟΣ', stepBack: 'ΠΙΣΩ', close: 'ΚΛΕΙΣΙΜΟ',
      settings: 'ΡΥΘΜΙΣΕΙΣ', settingsTitle: 'ΣΥΣΤΗΜΑΤΑ ΣΚΑΦΟΥΣ', language: 'LANGUAGE / ΓΛΩΣΣΑ',
      on: 'ΝΑΙ', off: 'ΟΧΙ', volume: 'ΕΝΤΑΣΗ', captions: 'ΛΕΖΑΝΤΕΣ ΗΧΟΥ',
      motion: 'ΚΙΝΗΣΗ', typeSpeed: 'ΤΑΧΥΤΗΤΑ ΚΕΙΜΕΝΟΥ', slow: 'ΑΡΓΑ', normal: 'ΚΑΝΟΝΙΚΑ', fast: 'ΓΡΗΓΟΡΑ',
      titleEyebrow: 'ΕΝΑ ΣΗΜΑ ΑΠΟ ΤΟ ΑΚΡΟ ΤΩΝ ΠΑΝΤΩΝ',
      titleSubtitle: 'Η ΤΕΛΕΥΤΑΙΑ ΜΕΤΑΔΟΣΗ',
      titleBlurb: 'Ξυπνάτε σε ένα σκάφος διάσωσης που έχει παρασυρθεί πολύ μακριά από κάθε τι ανθρώπινο. Το πλήρωμα έχει εξαφανιστεί. Ένα επτάτονο σήμα επαναλαμβάνεται από έναν σταθμό που δεν θα έπρεπε να υπάρχει — και φαίνεται να ξέρει το όνομά σας.',
      newGame: 'ΝΕΑ ΜΕΤΑΔΟΣΗ', continue: 'ΣΥΝΕΧΕΙΑ', titleHint: 'ΣΥΝΙΣΤΑΤΑΙ Η ΧΡΗΣΗ ΑΚΟΥΣΤΙΚΩΝ',
      credits: 'ΕΥΧΑΡΙΣΤΙΕΣ', playAgain: 'ΝΕΑ ΜΕΤΑΔΟΣΗ', titleBtn: 'ΤΙΤΛΟΣ',

      act1: 'ΠΡΑΞΗ I — ΤΟ ΕΓΚΑΤΑΛΕΛΕΙΜΜΕΝΟ', act2: 'ΠΡΑΞΗ II — Ο ΣΤΑΘΜΟΣ', act3: 'ΠΡΑΞΗ III — Η ΠΗΓΗ',
      invTitle: 'ΚΑΤΑΛΟΓΟΣ ΦΟΡΤΙΟΥ', invEmpty: 'Τίποτα πάνω σας εκτός από τα ρούχα σας.',
      codexTitle: 'Ο ΚΩΔΙΚΑΣ', codexEmpty: 'Δεν έχουν αναγνωριστεί ακόμη μοτίβα.',
      creditTitle: 'ΠΗΓΕΣ & ΕΥΧΑΡΙΣΤΙΕΣ',
      creditArt: 'Οι εικόνες των σκηνών προέρχονται από τη NASA και τα Wikimedia Commons (δημόσιο τομέα / CC0) και έχουν χρωματική επεξεργασία για ατμόσφαιρα. Δείτε το CREDITS.md.',
      creditAudio: 'Κάθε ήχος είναι μια ηχογραφημένη ψηφιακή λήψη κύματος — χωρίς σύνθεση. Οι πηγές είναι CC0 / δημόσιου τομέα και αναγράφονται στο CREDITS.md.',
      creditBuild: 'Δημιουργήθηκε ως διαδικτυακή εφαρμογή χωρίς εξαρτήσεις. Όλα τα αρχεία είναι τοπικά· το παιχνίδι λειτουργεί εκτός σύνδεσης.',

      locked: 'ΚΛΕΙΔΩΜΕΝΟ', quizTag: 'ΣΥΛΛΟΓΙΣΜΟΣ', onceTag: 'ΟΛΟΚΛΗΡΩΘΗΚΕ', itemTag: 'ΑΝΤΙΚΕΙΜΕΝΟ',
      itemFound: 'ΑΠΟΚΤΗΘΗΚΕ', clueFound: 'ΑΝΑΓΝΩΡΙΣΤΗΚΕ ΜΟΤΙΒΟ', itemLost: 'ΧΡΗΣΙΜΟΠΟΙΗΘΗΚΕ',
      dreadUp: 'ΤΟ ΔΕΟΣ ΑΥΞΑΝΕΤΑΙ', dreadDown: 'ΤΟ ΣΚΟΤΑΔΙ ΥΠΟΧΩΡΕΙ',
      quizCorrectLabel: 'ΣΩΣΤΟ', quizWrongLabel: 'ΛΑΘΟΣ',
      attempts: 'ΠΡΟΣΠΑΘΕΙΕΣ', noSave: 'Δεν υπάρχει μετάδοση για συνέχεια.',
      saved: 'Η ΠΡΟΟΔΟΣ ΑΠΟΘΗΚΕΥΤΗΚΕ', audioOn: 'ΗΧΟΣ ΕΝΕΡΓΟΣ', audioOff: 'ΗΧΟΣ ΑΝΕΝΕΡΓΟΣ',
      skipHint: 'ΚΑΝΤΕ ΚΛΙΚ ΓΙΑ ΑΜΕΣΗ ΑΠΟΚΑΛΥΨΗ', endAct: 'Η ΜΕΤΑΔΟΣΗ ΔΙΕΚΟΠΗ',
      statsClues: 'ΣΤΟΙΧΕΙΑ', statsDread: 'ΔΕΟΣ', statsEnding: 'ΕΚΒΑΣΗ',
      endingFound: 'ΑΝΑΚΑΛΥΦΘΗΚΕ ΤΕΛΟΣ', restartHint: 'Ο βρόχος θυμάται. Δοκιμάστε ξανά.',
      aiSettings: 'ΑΦΗΓΗΤΗΣ AI (ΠΡΟΑΙΡΕΤΙΚΟ)', aiEnable: 'ΕΝΕΡΓΟΠΟΙΗΣΗ AI',
      aiBaseUrl: 'URL ΒΑΣΗΣ API', aiModel: 'ΜΟΝΤΕΛΟ', aiKey: 'ΚΛΕΙΔΙ API (ΑΠΟΘΗΚΕΥΕΤΑΙ ΤΟΠΙΚΑ)',
      aiNote: 'Χρησιμοποιήστε το δικό σας κλειδί API συμβατό με OpenAI για να κάνετε ερωτήσεις και να δοκιμάσετε δικές σας ενέργειες. Το κλειδί μένει σε αυτό το πρόγραμμα περιήγησης. Η AI μπορεί να αντιδρά και να απαντά, αλλά δεν θα λύσει γρίφους ούτε θα δώσει πρόοδο.',
      aiPlaceholder: 'Κάντε μια ερώτηση ή δοκιμάστε μια δική σας ενέργεια...', aiSend: 'ΑΠΟΣΤΟΛΗ',
      aiThinking: 'Ο σταθμός ακούει...', aiYou: 'ΕΣΕΙΣ', aiVesper: 'ΕΣΠΕΡΙΑ',
      aiError: 'Σφάλμα AI', aiNotConfigured: 'Ενεργοποιήστε την AI και προσθέστε το κλειδί API στις Ρυθμίσεις για να κάνετε ερωτήσεις ή να δοκιμάσετε δικές σας ενέργειες.',
      log: 'Ημερολόγιο', logTitle: 'ΗΜΕΡΟΛΟΓΙΟ ΣΚΑΦΟΥΣ', logEmpty: 'Δεν υπάρχουν καταχωρήσεις ακόμη.',
      undo: 'Αναίρεση', undoNone: 'Τίποτα προς αναίρεση.', revisit: 'Έχετε σταθεί ξανά εδώ.',
      suggestLabel: 'ΠΡΟΤΑΣΕΙΣ', endingsFound: 'Τέλη που βρέθηκαν', loopRemembers: 'Ο βρόχος θυμάται.',
      arrived: 'Άφιξη', chose: 'Ενέργεια', asked: 'Ερώτηση', journalAI: 'Μετάδοση'
    }
  };

  var lang = 'en';
  try {
    var saved = localStorage.getItem('vesper_lang');
    if (saved === 'el' || saved === 'en') lang = saved;
  } catch (e) {}

  function setLang(next) {
    lang = next === 'el' ? 'el' : 'en';
    try { localStorage.setItem('vesper_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    return lang;
  }
  setLang(lang);

  function t(key) {
    var table = STRINGS[lang] || STRINGS.en;
    return table[key] !== undefined ? table[key] : (STRINGS.en[key] !== undefined ? STRINGS.en[key] : key);
  }

  /** Resolve a localized value: {en, el} object, plain string, or array of either. */
  function tx(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.map(tx);
    if (typeof value === 'object') {
      if (value[lang] !== undefined) return value[lang];
      if (value.en !== undefined) return value.en;
      var first = Object.keys(value)[0];
      return first ? value[first] : '';
    }
    return String(value);
  }

  return { t: t, tx: tx, setLang: setLang, get lang() { return lang; }, strings: STRINGS };
})();
