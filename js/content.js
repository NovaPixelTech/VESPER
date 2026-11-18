/* VESPER — all story data. Plain JS object so the game runs from file:// */
window.VESPER_CONTENT = (function () {
  'use strict';

  var L = function (en, el) { return { en: en, el: el }; };
  var P = function (en, el) { return { en: en, el: el }; };

  /* ---------------------------------------------------------------- ITEMS */
  var items = {
    datapad: {
      icon: '▤',
      name: L('Cracked datapad', 'Ραγισμένος πίνακας δεδομένων'),
      desc: L('A salvage-grade datapad. The screen is spidered with cracks, but the flight recorder still answers.', 'Ένας πίνακας δεδομένων διάσωσης. Η οθόνη είναι γεμάτη ραγίσματα, αλλά το αρχείο πτήσης ακόμη απαντά.')
    },
    crystal_shard: {
      icon: '◈',
      name: L('Crystalline shard', 'Κρυσταλλικό θραύσμα'),
      desc: L('A splinter of pale mineral from the medbay wall. It is cold, and it hums when the signal repeats.', 'Ένα θραύσμα ανοιχτόχρωμου ορυκτού από τον τοίχο του ιατρείου. Είναι κρύο και βουίζει όταν επαναλαμβάνεται το σήμα.')
    },
    spore_vial: {
      icon: '◌',
      name: L('Vial of pale spores', 'Φιάλη με ωχρά σπόρια'),
      desc: L('Sealed hydroponic spores. They drift toward light, as if looking for something.', 'Σφραγισμένα σπόρια υδροπονίας. Κινούνται προς το φως, σαν να αναζητούν κάτι.')
    },
    lens: {
      icon: '◎',
      name: L('Alien optic lens', 'Εξωγήινος φακός'),
      desc: L('A disc of unknown glass found in the archive. It reveals marks that are not visible to the eye.', 'Ένας δίσκος από άγνωστο γυαλί βρεθείς στο αρχείο. Αποκαλύπτει σημάδια αόρατα στο μάτι.')
    },
    glyph_key: {
      icon: '✧',
      name: L('Glyph key', 'Κλειδί γλυφών'),
      desc: L('A translated sequence carved into a sliver of station alloy.', 'Μια μεταφρασμένη ακολουθία χαραγμένη σε ένα κομμάτι κράματος του σταθμού.')
    },
    memory_cartridge: {
      icon: '▣',
      name: L('Memory cartridge', 'Κάψουλα μνήμης'),
      desc: L('A sealed record of one crew member\'s final hour. Label: DO NOT PLAY.', 'Μια σφραγισμένη καταγραφή της τελευταίας ώρας ενός μέλους του πληρώματος. Ετικέτα: ΜΗΝ ΑΝΑΠΑΡΑΓΩΓΕΤΕ.')
    }
  };

  /* ---------------------------------------------------------------- CLUES */
  var clues = {
    empty_crew: {
      name: L('An empty ship', 'Ένα άδειο σκάφος'),
      desc: L('No signs of struggle. The crew simply stopped being here, mid-task, mid-sentence.', 'Κανένα ίχνος πάλης. Το πλήρωμα απλώς σταμάτησε να βρίσκεται εδώ, στη μέση μιας εργασίας, στη μέση μιας φράσης.')
    },
    seven_tones: {
      name: L('The seven tones', 'Οι επτά τόνοι'),
      desc: L('Intervals recorded from the signal: 1 – 1 – 5 – 1 – 3 – 5 – 8. Seven, always seven.', 'Διαστήματα καταγεγραμμένα από το σήμα: 1 – 1 – 5 – 1 – 3 – 5 – 8. Επτά, πάντα επτά.')
    },
    crystal_residue: {
      name: L('Crystal residue', 'Κρυσταλλικό υπόλειμμα'),
      desc: L('The same pale mineral is growing on every surface the crew touched last.', 'Το ίδιο ωχρό ορυκτό αναπτύσσεται σε κάθε επιφάνεια που άγγιξαν τελευταία τα μέλη του πληρώματος.')
    },
    growth_rings: {
      name: L('Growth in loops', 'Ανάπτυξη σε βρόχους'),
      desc: L('The hydroponic plants grew outward, died, and grew again in the exact same pattern — eleven times.', 'Τα φυτά υδροπονίας αναπτύχθηκαν, πέθαναν και ξαναμεγάλωσαν με το ίδιο ακριβώς μοτίβο — έντεκα φορές.')
    },
    signal_loop: {
      name: L('The signal returns', 'Το σήμα επιστρέφει'),
      desc: L('The eighth interval is the first. The message has no end because it has no beginning.', 'Το όγδοο διάστημα είναι το πρώτο. Το μήνυμα δεν έχει τέλος επειδή δεν έχει αρχή.')
    },
    station_invitation: {
      name: L('Vesper transmits', 'Η Εσπερία εκπέμπει'),
      desc: L('Hull sensors show the station is not receiving the signal. It is sending it — toward the Kestrel.', 'Οι αισθητήρες του κελύφους δείχνουν ότι ο σταθμός δεν λαμβάνει το σήμα. Το εκπέμπει — προς το Κέστρελ.')
    },
    time_loop: {
      name: L('Glass of repeated light', 'Γυαλί από επαναλαμβανόμενο φως'),
      desc: L('The observation window depicts the same star exploding again and again, each time slightly closer.', 'Το παράθυρο παρατήρησης δείχνει το ίδιο άστρο να εκρήγνυται ξανά και ξανά, κάθε φορά λίγο πιο κοντά.')
    },
    glyph_rules: {
      name: L('Rules of the glyphs', 'Οι κανόνες των γλυφών'),
      desc: L('A circle with a line through it means forget. A circle around a line means remember. Two circles mean between.', 'Ένας κύκλος με γραμμή που τον διασχίζει σημαίνει ξέχνα. Ένας κύκλος γύρω από γραμμή σημαίνει θυμήσου. Δύο κύκλοι σημαίνουν ανάμεσα.')
    },
    stored_memories: {
      name: L('Memories in tanks', 'Μνήμες σε δεξαμενές'),
      desc: L('The xenolab kept the crew — not their bodies, but the shapes of what they remembered.', 'Το εργαστήριο κρατούσε το πλήρωμα — όχι τα σώματά τους, αλλά τις μορφές όσων θυμόντουσαν.')
    },
    loop_evidence: {
      name: L('Marks on the wall', 'Σημάδια στον τοίχο'),
      desc: L('Your own crystal scratches mark the corridor ahead — though you have not walked it yet.', 'Τα δικά σας χαράγματα με τον κρύσταλλο σηματοδοτούν τον διάδρομο μπροστά — αν και δεν τον έχετε διαβεί ακόμη.')
    },
    broadcast_truth: {
      name: L('The transmission log', 'Το ημερολόγιο μετάδοσης'),
      desc: L('First transmission: 03:14, sent from the Kestrel. The station only repeated it back — until it learned to send first.', 'Πρώτη μετάδοση: 03:14, από το Κέστρελ. Ο σταθμός απλώς την επανέπεμψε — μέχρι που έμαθε να στέλνει πρώτος.')
    },
    true_memory: {
      name: L('The first memory', 'Η πρώτη μνήμη'),
      desc: L('Before the signal, there was a choice. Someone aboard the Kestrel decided to call out into the dark.', 'Πριν από το σήμα, υπήρξε μια επιλογή. Κάποιος στο Κέστρελ αποφάσισε να φωνάξει προς το σκοτάδι.')
    },
    cartographer_light: {
      name: L('The cartographer\'s map', 'Ο χάρτης του Χαρτογράφου'),
      desc: L('The wall light is not illumination but writing — long and short pulses that draw a map including your exact position. The mark walks ahead of you.', 'Το φως του τοίχου δεν είναι φωτισμός αλλά γραφή — μακρείς και σύντομοι παλμοί που σχεδιάζουν έναν χάρτη με την ακριβή θέση σας. Η κουκκίδα περπατά μπροστά σας.')
    },
    symbiosis: {
      name: L('The offered spore', 'Το προσφερόμενο σπόριο'),
      desc: L('The garden accepted your spore and opened a way through. It rewards gifts, not force — and it seems grateful.', 'Ο κήπος δέχτηκε το σπόριο σας και άνοιξε δρόμο. Ανταμείβει τα δώρα, όχι τη βία — και φαίνεται ευγνώμων.')
    },
    voice_loop: {
      name: L('The voice before yours', 'Η φωνή πριν από τη δική σας'),
      desc: L('The voice in the corridor speaks three seconds ahead of you. It already knows how this ends, and it is tired of knowing.', 'Η φωνή στον διάδρομο μιλά τρία δευτερόλεπτα πριν από εσάς. Ξέρει ήδη πώς τελειώνει αυτό, και είναι κουρασμένη από το να ξέρει.')
    }
  };

  /* ---------------------------------------------------------------- QUIZZES */
  var quizzes = {
    tone_cipher: {
      title: L('The interval staircase', 'Η κλίμακα των διαστημάτων'),
      context: L('The comms display renders the signal as intervals:\n\n1 · 1 · 5 · 1 · 3 · 5 · 8\n\nThe flight recorder adds: "the last interval always returns to the first."', 'Η οθόνη επικοινωνίας απεικονίζει το σήμα ως διαστήματα:\n\n1 · 1 · 5 · 1 · 3 · 5 · 8\n\nΤο αρχείο πτήσης προσθέτει: «το τελευταίο διάστημα επιστρέφει πάντα στο πρώτο».'),
      question: L('What interval comes after the eighth?', 'Ποιο διάστημα ακολουθεί μετά το όγδοο;'),
      options: [
        { id: 'a', label: L('13 — the sequence grows', '13 — η ακολουθία μεγαλώνει') },
        { id: 'b', label: L('1 — back to the beginning', '1 — πίσω στην αρχή') },
        { id: 'c', label: L('8 — it repeats the last', '8 — επαναλαμβάνει το τελευταίο') },
        { id: 'd', label: L('Silence, permanently', 'Σιωπή, οριστικά') }
      ],
      answer: 'b',
      correct: L('The display resets. The signal is not a message with an end — it is a door that opens onto itself.', 'Η οθόνη μηδενίζεται. Το σήμα δεν είναι μήνυμα με τέλος — είναι μια πόρτα που ανοίγει πάνω στον εαυτό της.'),
      wrong: L('The numbers disagree. Somewhere in the sequence, a detail has been missed.', 'Οι αριθμοί διαφωνούν. Κάπου στην ακολουθία παραλείφθηκε μια λεπτομέρεια.'),
      onCorrect: [ { type: 'clue', id: 'signal_loop' }, { type: 'dread', value: -1 } ],
      onWrong: [ { type: 'dread', value: 1 } ]
    },

    airlock_override: {
      title: L('Manual override', 'Χειροκίνητη παράκαμψη'),
      context: L('The keypad wants three symbols. The maintenance note reads: "Begin where the water ended, pass through the light, end at the wound."\n\n○ water   ◇ light   ✕ wound', 'Το πληκτρολόγιο ζητά τρία σύμβολα. Η σημείωση συντήρησης γράφει: «Ξεκίνα εκεί που τελείωσε το νερό, πέρασε μέσα από το φως, τέλειωσε στην πληγή».\n\n○ νερό   ◇ φως   ✕ πληγή'),
      question: L('Enter the sequence.', 'Εισαγάγετε την ακολουθία.'),
      options: [
        { id: 'a', label: L('○  ◇  ✕', '○  ◇  ✕') },
        { id: 'b', label: L('◇  ○  ✕', '◇  ○  ✕') },
        { id: 'c', label: L('○  ✕  ◇', '○  ✕  ◇') },
        { id: 'd', label: L('✕  ◇  ○', '✕  ◇  ○') }
      ],
      answer: 'a',
      correct: L('The hatch sighs open. Cold station air rushes in, carrying the smell of rain that has never fallen here.', 'Η θύρα ανοίγει με έναν αναστεναγμό. Ο κρύος αέρας του σταθμού ορμά μέσα, φέρνοντας μυρωδιά βροχής που δεν έχει πέσει ποτέ εδώ.'),
      wrong: L('The keypad rejects the sequence. Somewhere behind the wall, something turns to listen.', 'Το πληκτρολόγιο απορρίπτει την ακολουθία. Κάπου πίσω από τον τοίχο, κάτι γυρίζει για να ακούσει.'),
      onCorrect: [],
      onWrong: [ { type: 'dread', value: 1 } ]
    },

    glyph_translation: {
      title: L('The archive glyph', 'Το γλύφος του αρχείου'),
      context: L('Rules recovered from the archive:\n\n⊕ circle around a line  →  REMEMBER\n⊗ line through a circle  →  FORGET\n○○ two circles           →  BETWEEN\n\nThe glyph ⊗ appears beside a record of the crew boarding Vesper.', 'Κανόνες από το αρχείο:\n\n⊕ κύκλος γύρω από γραμμή  →  ΘΥΜΗΣΟΥ\n⊗ γραμμή μέσα από κύκλο  →  ΞΕΧΝΑΣΕ\n○○ δύο κύκλοι             →  ΑΝΑΜΕΣΑ\n\nΤο γλύφος ⊗ εμφανίζεται δίπλα σε καταγραφή της επιβίβασης του πληρώματος στην Εσπερία.'),
      question: L('What does the record command?', 'Τι διατάζει η καταγραφή;'),
      options: [
        { id: 'a', label: L('Preserve the boarding forever', 'Διατήρησε την επιβίβαση για πάντα') },
        { id: 'b', label: L('Erase the memory of boarding', 'Σβήσε τη μνήμη της επιβίβασης') },
        { id: 'c', label: L('Place the crew between two worlds', 'Τοποθέτησε το πλήρωμα ανάμεσα σε δύο κόσμους') },
        { id: 'd', label: L('Return them to the Kestrel', 'Επέστρεψέ τους στο Κέστρελ') }
      ],
      answer: 'b',
      correct: L('The glyph unlatches. Inside is a sliver of alloy bearing a sequence — a key, waiting for a lock.', 'Το γλύφος ξεκλειδώνει. Μέσα βρίσκεται ένα κομμάτι κράματος με μια ακολουθία — ένα κλειδί που περιμένει κλειδαριά.'),
      wrong: L('The glyph refuses. The rules were clearer than that.', 'Το γλύφος αρνείται. Οι κανόνες ήταν πιο ξεκάθαροι από αυτό.'),
      onCorrect: [ { type: 'item', id: 'glyph_key' }, { type: 'clue', id: 'glyph_rules' } ],
      onWrong: [ { type: 'dread', value: 1 } ]
    },

    memory_trust: {
      title: L('Which memory lies?', 'Ποια μνήμη ψεύδεται;'),
      context: L('The entity projects four statements at once:\n\nI. The signal began at 03:14.\nII. The Kestrel received the signal at 03:14.\nIII. The station sent its first transmission at 03:14 — addressed to the Kestrel.\nIV. The crew heard the signal before they boarded Vesper.', 'Η οντότητα προβάλλει τέσσερις ισχυρισμούς ταυτόχρονα:\n\nI. Το σήμα ξεκίνησε στις 03:14.\nII. Το Κέστρελ έλαβε το σήμα στις 03:14.\nIII. Ο σταθμός έστειλε την πρώτη του μετάδοση στις 03:14 — προς το Κέστρελ.\nIV. Το πλήρωμα άκουσε το σήμα πριν επιβιβαστεί στην Εσπερία.'),
      question: L('One statement is impossible. Which?', 'Ένας ισχυρισμός είναι αδύνατος. Ποιος;'),
      options: [
        { id: 'a', label: L('I — the signal began at 03:14', 'I — το σήμα ξεκίνησε στις 03:14') },
        { id: 'b', label: L('II — the Kestrel received it at 03:14', 'II — το Κέστρελ το έλαβε στις 03:14') },
        { id: 'c', label: L('III — the station sent it to the Kestrel', 'III — ο σταθμός το έστειλε στο Κέστρελ') },
        { id: 'd', label: L('IV — they heard it before boarding', 'IV — το άκουσαν πριν επιβιβαστούν') }
      ],
      answer: 'd',
      correct: L('The projection flickers. You have caught the loop lying about its own beginning.', 'Η προβολή τρεμοπαίζει. Έχετε πιάσει τον βρόχο να λέει ψέματα για τη δική του αρχή.'),
      wrong: L('The light dims, disappointed — or patient. It will ask again.', 'Το φως σβήνει, απογοητευμένο — ή υπομονετικό. Θα ρωτήσει ξανά.'),
      onCorrect: [ { type: 'clue', id: 'broadcast_truth' }, { type: 'dread', value: -1 } ],
      onWrong: [ { type: 'dread', value: 1 } ]
    },

    core_lock: {
      title: L('The harmonic key', 'Το αρμονικό κλειδί'),
      context: L('The core chamber demands a number.\n\nThe signal has seven tones. The crew manifest numbers six names. The hydroponic garden developed eleven loops. Only one of these counts something that was never missing.', 'Η αίθουσα πυρήνα απαιτεί έναν αριθμό.\n\nΤο σήμα έχει επτά τόνους. Ο κατάλογος του πληρώματος έχει έξι ονόματα. Ο κήπος υδροπονίας ανέπτυξε έντεκα βρόχους. Μόνο ένας από αυτούς μετρά κάτι που δεν έλειψε ποτέ.'),
      question: L('Which number opens the core?', 'Ποιος αριθμός ανοίγει τον πυρήνα;'),
      options: [
        { id: 'a', label: L('6 — the missing crew', '6 — το χαμένο πλήρωμα') },
        { id: 'b', label: L('7 — the complete signal', '7 — το ολοκληρωμένο σήμα') },
        { id: 'c', label: L('11 — the garden\'s loops', '11 — οι βρόχοι του κήπου') },
        { id: 'd', label: L('0 — nothing is here', '0 — δεν υπάρχει τίποτα εδώ') }
      ],
      answer: 'b',
      correct: L('The number fits. The seventh tone was always the one calling you here.', 'Ο αριθμός ταιριάζει. Ο έβδομος τόνος ήταν πάντα αυτός που σας καλούσε εδώ.'),
      wrong: L('The lock holds. It has all the time in the loop.', 'Η κλειδαριά αντέχει. Έχει όλο τον χρόνο του βρόχου στη διάθεσή της.'),
      onCorrect: [],
      onWrong: [ { type: 'dread', value: 1 } ]
    },

    final_deduction: {
      title: L('What is Vesper?', 'Τι είναι η Εσπερία;'),
      context: L('The core offers one last question before it repeats.\n\nIt is not receiving. It is not a tomb. It learned the signal from you, and now it sends first.', 'Ο πυρήνας θέτει μια τελευταία ερώτηση πριν επαναλάβει.\n\nΔεν λαμβάνει. Δεν είναι τάφος. Έμαθε το σήμα από εσάς, και τώρα στέλνει πρώτο.'),
      question: L('Name the thing that is happening.', 'Ονομάστε αυτό που συμβαίνει.'),
      options: [
        { id: 'a', label: L('A listening post waiting for visitors', 'Ένας σταθμός ακρόασης που περιμένει επισκέπτες') },
        { id: 'b', label: L('A grave for a vanished crew', 'Ένας τάφος για ένα εξαφανισμένο πλήρωμα') },
        { id: 'c', label: L('A mirror that learned to transmit itself', 'Ένας καθρέφτης που έμαθε να εκπέμπει τον εαυτό του') },
        { id: 'd', label: L('A weapon aimed at the Kestrel', 'Ένα όπλο στραμμένο στο Κέστρελ') }
      ],
      answer: 'c',
      correct: L('The core goes quiet — the first silence in eleven loops. For a moment, something is listening instead.', 'Ο πυρήνας σιωπά — η πρώτη σιωπή σε έντεκα βρόχους. Για μια στιγμή, κάτι ακούει αντί να μιλά.'),
      wrong: L('The core accepts the answer and files it away with all the others. It has heard this before.', 'Ο πυρήνας δέχεται την απάντηση και την αρχειοθετεί μαζί με όλες τις άλλες. Το έχει ξανακούσει.'),
      onCorrect: [ { type: 'clue', id: 'true_memory' }, { type: 'flag', id: 'deduction_correct' }, { type: 'dread', value: -1 } ],
      onWrong: [ { type: 'dread', value: 1 } ]
    }
  };

  /* ---------------------------------------------------------------- SCENES */
  var scenes = {

    /* ===== ACT I — THE DERELICT ===== */

    wake: {
      act: 1, image: '02_waking', bed: 'ship', cue: 'creak',
      kicker: L('KESTREL — 0.3 AU FROM THE SHADE', 'ΚΕΣΤΡΕΛ — 0.3 AU ΑΠΟ ΤΗ ΣΚΙΑ'),
      title: L('Cold Storage', 'Ψυχρή Αποθήκη'),
      text: P([
        'You wake to the sound of your own breathing, and then to something else — a low, patient interval that repeats every eleven seconds.',
        'The corridor is silver with frost. Emergency lights blink in a slow rhythm along the deck, each one finding the next already dark. Your suit is intact. Your helmet recorder is not: the last entry is six hours old and simply stops, mid-word.',
        'The crew of the Kestrel are not in their bunks. There is no blood, no broken glass, no indication that anything happened here at all. Only that the ship has become very quiet, and very cold, and that the signal is coming from somewhere ahead.'
      ], [
        'Ξυπνάτε με τον ήχο της δικής σας αναπνοής και μετά με κάτι άλλο — ένα χαμηλό, υπομονετικό διάστημα που επαναλαμβάνεται κάθε έντεκα δευτερόλεπτα.',
        'Ο διάδρομος είναι ασημένιος από τον πάγο. Τα φώτα έκτακτης ανάγκης αναβοσβήνουν σε αργό ρυθμό, το καθένα βρίσκει το επόμενο ήδη σβηστό. Η στολή σας είναι άθικτη. Η καταγραφή του κράνους όχι: η τελευταία καταχώριση είναι έξι ώρες παλιά και σταματά απότομα, στη μέση μιας λέξης.',
        'Το πλήρωμα του Κέστρελ δεν είναι στις κουκέτες του. Δεν υπάρχει αίμα, σπασμένο γυαλί, καμία ένδειξη ότι συνέβη κάτι εδώ. Μόνο ότι το σκάφος έγινε πολύ ήσυχο, πολύ κρύο, και ότι το σήμα έρχεται από κάπου μπροστά.'
      ]),
      choices: [
        { id: 'to_bridge', label: L('Get up. Find the bridge.', 'Σηκωθείτε. Βρείτε τη γέφυρα.'), goto: 'bridge' },
        { id: 'to_medbay', label: L('Check the medical bay first.', 'Ελέγξτε πρώτα το ιατρείο.'), goto: 'medbay' },
        { id: 'check_suit', label: L('Read your helmet\'s last log.', 'Διαβάστε την τελευταία καταγραφή του κράνους.'), once: true, effects: [ { type: 'clue', id: 'empty_crew' } ] }
      ]
    },

    bridge: {
      act: 1, image: '03_bridge', bed: 'ship', cue: 'pulse',
      kicker: L('KESTREL — COMMAND DECK', 'ΚΕΣΤΡΕΛ — ΓΕΦΥΡΑ ΔΙΟΙΚΗΣΗΣ'),
      title: L('The Empty Chair', 'Η Άδεια Καρέκλα'),
      text: P([
        'The bridge looks like a room abandoned in a hurry that never came. A cup of coffee sits exactly where someone set it down; the surface of the drink is frozen into a dark, still mirror.',
        'Every station is dark except one. The comms display shows a staircase of numbers climbing and collapsing, climbing and collapsing, and beneath it a line of text in a handwriting that is not quite human: "the last interval always returns to the first."',
        'Through the cracked viewport, the Shade hangs against the stars — a planetoid with no light of its own, and, beside it, a thin amber point that should not be there.'
      ], [
        'Η γέφυρα μοιάζει με δωμάτιο εγκαταλελειμμένο σε μια βιασύνη που δεν ήρθε ποτέ. Ένα φλιτζάνι καφέ βρίσκεται ακριβώς εκεί που το άφησε κάποιος· η επιφάνεια του ποτού έχει παγώσει σε ένα σκοτεινό, ακίνητο κάθρεφτο.',
        'Όλες οι θέσεις είναι σκοτεινές εκτός από μία. Η οθόνη επικοινωνίας δείχνει μια σκάλα από αριθμούς που ανεβαίνουν και καταρρέουν, ανεβαίνουν και καταρρέουν, και από κάτω μια γραμμή κειμένου με γραφή που δεν είναι ακριβώς ανθρώπινη: «το τελευταίο διάστημα επιστρέφει πάντα στο πρώτο».',
        'Από το ραγισμένο παράθυρο, η Σκιά κρέμεται ανάμεσα στα άστρα — ένας πλανήτης χωρίς δικό του φως, και δίπλα του μια λεπτή κεχριμπαρένια κουκκίδα που δεν θα έπρεπε να βρίσκεται εκεί.'
      ]),
      choices: [
        { id: 'recorder', label: L('Pull the flight recorder from the datapad.', 'Αφαιρέστε το αρχείο πτήσης από τον πίνακα.'), once: true, effects: [ { type: 'item', id: 'datapad' }, { type: 'clue', id: 'seven_tones' } ] },
        { id: 'comms', label: L('Tune the comms array to the repeating signal.', 'Ρυθμίστε την κεραία στο επαναλαμβανόμενο σήμα.'), goto: 'signal' },
        { id: 'medbay', label: L('Go to the medical bay.', 'Πηγαίνετε στο ιατρείο.'), goto: 'medbay' },
        { id: 'hydro', label: L('Go to hydroponics.', 'Πηγαίνετε στην υδροπονία.'), goto: 'hydroponics' },
        { id: 'airlock', label: L('Try the forward airlock.', 'Δοκιμάστε την εμπρός θύρα αεροθαλάμου.'), goto: 'airlock' }
      ]
    },

    medbay: {
      act: 1, image: '04_medbay', bed: 'ship', cue: 'whisper',
      kicker: L('KESTREL — MEDICAL', 'ΚΕΣΤΡΕΛ — ΙΑΤΡΕΙΟ'),
      title: L('Where They Went', 'Εκεί Που Πήγαν'),
      text: P([
        'The gurneys are unoccupied but not empty: each holds the shallow impression of a body, as though the crew lay down and then simply ceased to press on the mattress.',
        'A pale crystalline growth feathers across the wall beside the diagnostic screen. It catches the light in a way that mineral should not. When the signal repeats, the crystals brighten — precisely half a second before the sound arrives.',
        'The manifest on the screen lists six names. All six are marked PRESENT. All six MARKED PRESENT eleven times, in eleven different hands.'
      ], [
        'Οι φορτίοι είναι άδειοι αλλά όχι κενοί: ο καθένας κρατά ένα ρηχό αποτύπωμα σώματος, σαν το πλήρωμα να ξάπλωσε και μετά να σταμάτησε απλώς να πιέζει το στρώμα.',
        'Μια ωχρή κρυσταλλική ανάπτυξη απλώνεται σαν φτέρωμα στον τοίχο δίπλα στην οθόνη διάγνωσης. Πιάνει το φως με τρόπο που δεν ταιριάζει σε ορυκτό. Όταν το σήμα επαναλαμβάνεται, οι κρύσταλλοι φωτίζονται — μισό δευτερόλεπτο πριν φτάσει ο ήχος.',
        'Ο κατάλογος στην οθόνη αναγράφει έξι ονόματα. Και τα έξι σημειωμένα ως ΠΑΡΟΝΤΑ. Και τα έξι σημειωμένα ως ΠΑΡΟΝΤΑ έντεκα φορές, με έντεκα διαφορετικά χειρόγραφα.'
      ]),
      choices: [
        { id: 'take_crystal', label: L('Break off a shard of the crystalline growth.', 'Σπάστε ένα θραύσμα από την κρυσταλλική ανάπτυξη.'), once: true, effects: [ { type: 'item', id: 'crystal_shard' }, { type: 'clue', id: 'crystal_residue' } ] },
        { id: 'manifest', label: L('Read the crew manifest carefully.', 'Διαβάστε προσεκτικά τον κατάλογο του πληρώματος.'), once: true, effects: [ { type: 'clue', id: 'empty_crew' } ] },
        { id: 'hydro', label: L('Go to hydroponics.', 'Πηγαίνετε στην υδροπονία.'), goto: 'hydroponics' },
        { id: 'bridge', label: L('Return to the bridge.', 'Επιστρέψτε στη γέφυρα.'), goto: 'bridge' }
      ]
    },

    hydroponics: {
      act: 1, image: '05_hydro', bed: 'ship', cue: 'glass_chime',
      kicker: L('KESTREL — HYDROPONICS', 'ΚΕΣΤΡΕΛ — ΥΔΡΟΠΟΝΙΑ'),
      title: L('Eleven Harvests', 'Έντεκα Σοδειές'),
      text: P([
        'The grow lights are dead, but the plants are not. They stand in rows, grey-green and patient, each one carrying the same ring pattern in its stem — outward, inward, outward again.',
        'Someone counted the rings into the nutrient log: eleven growth cycles, eleven deaths, eleven returns. The handwriting changes each time. The final entry is yours.',
        'A film of pale spores settles on the glass. It moves toward your flashlight, then away from it, then toward it again — learning the shape of your attention.'
      ], [
        'Τα φώτα καλλιέργειας είναι σβηστά, αλλά τα φυτά όχι. Στέκονται σε σειρές, γκριζοπράσινα και υπομονετικά, το καθένα με το ίδιο σχέδιο δακτυλίων στο στέλεχος — προς τα έξω, προς τα μέσα, ξανά προς τα έξω.',
        'Κάποιος μέτρησε τους δακτυλίους στο ημερολόγιο θρεπτικών: έντεκα κύκλοι ανάπτυξης, έντεκα θάνατοι, έντεκα επιστροφές. Το χειρόγραφο αλλάζει κάθε φορά. Η τελευταία καταχώριση είναι δική σας.',
        'Ένα στρώμα ωχρών σπορίων καλύπτει το γυαλί. Κινείται προς τον φακό σας, μετά μακριά του, μετά ξανά προς αυτόν — μαθαίνοντας το σχήμα της προσοχής σας.'
      ]),
      choices: [
        { id: 'vial', label: L('Collect a vial of the spores.', 'Συλλέξτε μια φιάλη από τα σπόρια.'), once: true, effects: [ { type: 'item', id: 'spore_vial' }, { type: 'clue', id: 'growth_rings' } ] },
        { id: 'rings', label: L('Study the rings in the stems.', 'Μελετήστε τους δακτυλίους στα στελέχη.'), once: true, effects: [ { type: 'clue', id: 'growth_rings' } ] },
        { id: 'bridge', label: L('Return to the bridge.', 'Επιστρέψτε στη γέφυρα.'), goto: 'bridge' },
        { id: 'medbay', label: L('Return to the medical bay.', 'Επιστρέψτε στο ιατρείο.'), goto: 'medbay' }
      ]
    },

    signal: {
      act: 1, image: '06_signal', bed: 'ship', cue: 'pulse',
      kicker: L('KESTREL — COMMS ARRAY', 'ΚΕΣΤΡΕΛ — ΚΕΡΑΙΑ ΕΠΙΚΟΙΝΩΝΙΑΣ'),
      title: L('Seven, Always Seven', 'Επτά, Πάντα Επτά'),
      text: P([
        'The signal is not speech. It is a pattern of intervals — seven of them, repeating without variation for six hours, possibly for much longer than that.',
        'The display renders it as a staircase that climbs and then falls back to its first step. Your hands hover over the controls. Somewhere behind the numbers, you feel the distinct impression of someone waiting politely for you to finish the thought.'
      ], [
        'Το σήμα δεν είναι λόγος. Είναι ένα μοτίβο διαστημάτων — επτά, που επαναλαμβάνονται χωρίς παραλλαγή για έξι ώρες, ίσως και πολύ περισσότερο.',
        'Η οθόνη το απεικονίζει ως μια σκάλα που ανεβαίνει και μετά πέφτει ξανά στο πρώτο σκαλί. Τα χέρια σας αιωρούνται πάνω από τα χειριστήρια. Κάπου πίσω από τους αριθμούς, νιώθετε την ξεκάθαρη εντύπωση κάποιου που περιμένει ευγενικά να τελειώσετε τη σκέψη σας.'
      ]),
      choices: [
        { id: 'solve', label: L('Solve the interval pattern.', 'Λύστε το μοτίβο των διαστημάτων.'), tag: 'quiz', quiz: 'tone_cipher', goto: 'bridge' },
        { id: 'back', label: L('Step back from the console.', 'Κάντε ένα βήμα πίσω από την κονσόλα.'), goto: 'bridge' }
      ]
    },

    airlock: {
      act: 1, image: '07_airlock', bed: 'ship', cue: 'door',
      kicker: L('KESTREL — FORWARD AIRLOCK', 'ΚΕΣΤΡΕΛ — ΕΜΠΡΟΣ ΑΕΡΟΘΑΛΑΜΟΣ'),
      title: L('The Door That Recognises You', 'Η Θύρα Που Σας Αναγνωρίζει'),
      text: P([
        'The airlock is sealed from the inside — which is impossible, since the Kestrel has not docked with anything in forty-one days.',
        'A maintenance plate lists three override symbols, but the order has been scratched away. The scratches are fresh. They are also, unmistakably, in the shape of your own handwriting.',
        'Beyond the small window, the amber point is no longer a point. It is a structure: thin, impossible, unfolding in angles that do not agree with one another.'
      ], [
        'Η θύρα είναι σφραγισμένη από μέσα — κάτι αδύνατο, αφού το Κέστρελ δεν έχει προσδεθεί σε τίποτα για σαράντα μία μέρες.',
        'Μια πινακίδα συντήρησης αναγράφει τρία σύμβολα παράκαμψης, αλλά η σειρά έχει ξυστεί. Τα ξυσίματα είναι φρέσκα. Είναι επίσης, αναμφίβολα, στο σχήμα του δικού σας χειρογράφου.',
        'Πέρα από το μικρό παράθυρο, η κεχριμπαρένια κουκκίδα δεν είναι πια κουκκίδα. Είναι μια κατασκευή: λεπτή, αδύνατη, που ξεδιπλώνεται σε γωνίες που δεν συμφωνούν μεταξύ τους.'
      ]),
      choices: [
        { id: 'override', label: L('Enter the override sequence.', 'Εισαγάγετε την ακολουθία παράκαμψης.'), tag: 'quiz', quiz: 'airlock_override', goto: 'departure',
          require: { all: [ { type: 'clue', id: 'seven_tones' }, { type: 'clue', id: 'crystal_residue' }, { type: 'clue', id: 'growth_rings' } ] },
          hint: L('You need three patterns: the signal, the residue, the garden.', 'Χρειάζεστε τρία μοτίβα: το σήμα, το υπόλειμμα, ο κήπος.') },
        { id: 'pry', label: L('Pry the manual hatch with the crystal shard.', 'Ανοίξτε τη χειροκίνητη θύρα με το κρυσταλλικό θραύσμα.'), require: { type: 'item', id: 'crystal_shard' },
          effects: [ { type: 'dread', value: 1 } ], goto: 'departure' },
        { id: 'back', label: L('Return to the bridge.', 'Επιστρέψτε στη γέφυρα.'), goto: 'bridge' }
      ]
    },

    departure: {
      act: 1, image: '08_departure', bed: 'station', cue: 'heartbeat',
      kicker: L('APPROACH — VESPER STATION', 'ΠΡΟΣΕΓΓΙΣΗ — ΣΤΑΘΜΟΣ ΕΣΠΕΡΙΑ'),
      title: L('The Shape Waiting Ahead', 'Το Σχήμα Που Περιμένει'),
      text: P([
        'The Kestrel drifts closer on autopilot you do not remember engaging. Vesper Station resolves into a lattice of black struts and pale membranes, like a skeleton wearing a sail.',
        'It has no lights. It has no docking collar. And yet a path opens in its surface as you watch — an opening shaped exactly like the forward airlock of your ship.',
        'The signal is louder now. It has acquired a second layer underneath the first: a very quiet sound, almost like breathing.'
      ], [
        'Το Κέστρελ πλησιάζει με αυτόματο πιλότο που δεν θυμάστε να ενεργοποιήσατε. Ο σταθμός Εσπερία αποκτά μορφή: ένα δίχτυ από μαύρες δοκούς και ωχρές μεμβράνες, σαν σκελετός με πανί.',
        'Δεν έχει φώτα. Δεν έχει θύρα σύνδεσης. Κι όμως ένα πέρασμα ανοίγει στην επιφάνειά του καθώς κοιτάτε — ένα άνοιγμα με το ακριβές σχήμα της εμπρός θύρας του σκάφους σας.',
        'Το σήμα είναι δυνατότερο τώρα. Έχει αποκτήσει ένα δεύτερο στρώμα κάτω από το πρώτο: έναν πολύ ήσυχο ήχο, σχεδόν σαν αναπνοή.'
      ]),
      choices: [
        { id: 'scan', label: L('Scan the station hull before boarding.', 'Σαρώστε το κέλυφος του σταθμού πριν επιβιβαστείτε.'), once: true, effects: [ { type: 'clue', id: 'station_invitation' } ] },
        { id: 'board', label: L('Step through into Vesper.', 'Περάστε μέσα στην Εσπερία.'), goto: 'dock' }
      ]
    },

    /* ===== ACT II — THE STATION ===== */

    dock: {
      act: 2, image: '09_dock', bed: 'station', cue: 'door',
      kicker: L('VESPER — OUTER HULL', 'ΕΣΠΕΡΙΑ — ΕΞΩΤΕΡΙΚΟ ΚΕΛΥΦΟΣ'),
      title: L('No Threshold', 'Κανένα Κατώφλι'),
      text: P([
        'There is no airlock, no pressure door, no seam to cut. You simply decide to go through, and you are through — standing in a corridor whose walls are made of something between bone and glass.',
        'Behind you, the Kestrel is already smaller. Ahead, the corridor bends in a direction that your inner ear refuses to accept.',
        'A line of light travels along the wall, pauses, and travels back. It pauses a second time when it reaches you.'
      ], [
        'Δεν υπάρχει αεροθάλαμος, πόρτα πίεσης, ραφή να κόψετε. Απλώς αποφασίζετε να περάσετε, και περνάτε — στέκεστε σε ένα διάδρομο με τοίχους από κάτι ανάμεσα σε κόκκαλο και γυαλί.',
        'Πίσω σας, το Κέστρελ είναι ήδη μικρότερο. Μπροστά, ο διάδρομος στρίβει προς μια κατεύθυνση που το αυτί σας αρνείται να δεχτεί.',
        'Μια γραμμή φωτός διατρέχει τον τοίχο, σταματά, και επιστρέφει. Σταματά ξανά όταν φτάσει σε εσάς.'
      ]),
      choices: [
        { id: 'light', label: L('Record the pattern of the light.', 'Καταγράψτε το μοτίβο του φωτός.'), once: true, effects: [ { type: 'clue', id: 'cartographer_light' } ] },
        { id: 'follow', label: L('Follow the light pulses.', 'Ακολουθήστε τις παλμικές λάμψεις.'), goto: 'threshold' },
        { id: 'back', label: L('Look back at the Kestrel.', 'Κοιτάξτε πίσω προς το Κέστρελ.'), goto: 'departure' }
      ]
    },

    threshold: {
      act: 2, image: '10_threshold', bed: 'station', cue: 'whisper',
      kicker: L('VESPER — THE CARTOGRAPHER', 'ΕΣΠΕΡΙΑ — Ο ΧΑΡΤΟΓΡΑΦΟΣ'),
      title: L('Someone Drawing You', 'Κάποιος Που Σας Σχεδιάζει'),
      text: P([
        'The light is not illumination. It is writing. Long pulses and short ones arrange themselves into a shape on the wall, and the shape is a map — of the corridor you are standing in, including a small bright mark exactly where you stand.',
        'Then the mark moves. It walks ahead of you, turns a corner you have not reached, and waits.',
        'You get the unmistakable sense of being sketched. Not watched. Composed.'
      ], [
        'Το φως δεν είναι φωτισμός. Είναι γραφή. Μακρείς και σύντομοι παλμοί διατάσσονται σε ένα σχήμα στον τοίχο, και το σχήμα είναι ένας χάρτης — του διαδρόμου στον οποίο στέκεστε, με μια μικρή φωτεινή κουκκίδα ακριβώς εκεί που βρίσκεστε.',
        'Η κουκκίδα κινείται. Περπατά μπροστά σας, στρίβει σε μια γωνιά που δεν έχετε φτάσει, και περιμένει.',
        'Νιώθετε με απόλυτη βεβαιότητα ότι σας σχεδιάζουν. Δεν σας παρακολουθούν. Σας συνθέτουν.'
      ]),
      choices: [
        { id: 'observe', label: L('Study the map on the wall.', 'Μελετήστε τον χάρτη στον τοίχο.'), once: true, effects: [ { type: 'clue', id: 'cartographer_light' } ] },
        { id: 'follow', label: L('Follow the moving mark.', 'Ακολουθήστε την κινούμενη κουκκίδα.'), goto: 'observation' },
        { id: 'back', label: L('Return to the outer hull.', 'Επιστρέψτε στο εξωτερικό κέλυφος.'), goto: 'dock' }
      ]
    },

    observation: {
      act: 2, image: '11_observation', bed: 'station', cue: 'glass_chime',
      kicker: L('VESPER — OBSERVATION DECK', 'ΕΣΠΕΡΙΑ — ΑΙΘΟΥΣΑ ΠΑΡΑΤΗΡΗΣΗΣ'),
      title: L('The Star That Would Not Die', 'Το Άστρο Που Δεν Ήθελε να Πεθάνει'),
      text: P([
        'The observation window is a sheet of coloured glass, and in it a star dies over and over. Each time it explodes slightly closer. Each time the shards arrange themselves a little more like a face.',
        'The Shade fills half the sky, motionless. The station does not orbit it. It hangs above it at a fixed distance, the way a question hangs above an answer.',
        'A doorway beyond the glass is labelled with glyphs. You cannot read them yet — but you feel that you once could.'
      ], [
        'Το παράθυρο παρατήρησης είναι ένα φύλλο έγχρωμου γυαλιού, και σε αυτό ένα άστρο πεθαίνει ξανά και ξανά. Κάθε φορά εκρήγνυται λίγο πιο κοντά. Κάθε φορά τα θραύσματα διατάσσονται λίγο περισσότερο σαν πρόσωπο.',
        'Η Σκιά καλύπτει τον μισό ουρανό, ακίνητη. Ο σταθμός δεν την περιφέρεται. Αιωρείται από πάνω της σε σταθερή απόσταση, όπως μια ερώτηση αιωρείται πάνω από μια απάντηση.',
        'Μια πόρτα πέρα από το γυαλί φέρει επιγραφή με γλύφους. Δεν μπορείτε να τη διαβάσετε ακόμη — αλλά νιώθετε ότι κάποτε μπορούσατε.'
      ]),
      choices: [
        { id: 'glass', label: L('Study the repeating explosion in the glass.', 'Μελετήστε την επαναλαμβανόμενη έκρηξη στο γυαλί.'), once: true, effects: [ { type: 'clue', id: 'time_loop' } ] },
        { id: 'archive', label: L('Enter the archive of glyphs.', 'Μπείτε στο αρχείο των γλυφών.'), goto: 'archive' },
        { id: 'back', label: L('Return to the corridor.', 'Επιστρέψτε στο διάδρομο.'), goto: 'threshold' }
      ]
    },

    archive: {
      act: 2, image: '12_archive', bed: 'station', cue: 'glyph',
      kicker: L('VESPER — ARCHIVE', 'ΕΣΠΕΡΙΑ — ΑΡΧΕΙΟ'),
      title: L('Instructions for Forgetting', 'Οδηγίες Για Ξέχασμα'),
      text: P([
        'The archive has no shelves. Records hang in the air like frozen smoke, each one a small scene of the crew doing something ordinary: sleeping, arguing, repairing a pump.',
        'Every scene carries a glyph. Some mean remember. Some mean forget. A few mean between — and those are the ones that trouble you most, because the scenes they mark show six people standing in a room that should hold seven.',
        'One record is locked behind a glyph you can almost read. Your cracked datapad is warm in your hand.'
      ], [
        'Το αρχείο δεν έχει ράφια. Οι καταγραφές αιωρούνται στον αέρα σαν παγωμένος καπνός, η καθεμία μια μικρή σκηνή του πληρώματος να κάνει κάτι συνηθισμένο: να κοιμάται, να μαλώνει, να επισκευάζει μια αντλία.',
        'Κάθε σκηνή φέρει ένα γλύφος. Μερικά σημαίνουν θυμήσου. Μερικά ξέχνασε. Λίγα σημαίνουν ανάμεσα — και αυτά είναι που σας ανησυχούν περισσότερο, γιατί δείχνουν έξι ανθρώπους σε ένα δωμάτιο που θα έπρεπε να χωρά επτά.',
        'Μια καταγραφή είναι κλειδωμένη πίσω από ένα γλύφος που σχεδόν μπορείτε να διαβάσετε. Ο ραγισμένος πίνακας σας είναι ζεστός στο χέρι.'
      ]),
      choices: [
        { id: 'translate', label: L('Translate the locked glyph.', 'Μεταφράστε το κλειδωμένο γλύφος.'), tag: 'quiz', quiz: 'glyph_translation', goto: 'xenolab', require: { type: 'item', id: 'datapad' }, hint: L('You need something that holds old records.', 'Χρειάζεστε κάτι που κρατά παλιές καταγραφές.') },
        { id: 'shelf', label: L('Search the floating records for a lens.', 'Ψάξτε στις αιωρούμενες καταγραφές για φακό.'), once: true, effects: [ { type: 'item', id: 'lens' }, { type: 'clue', id: 'glyph_rules' } ] },
        { id: 'back', label: L('Return to the observation deck.', 'Επιστρέψτε στην αίθουσα παρατήρησης.'), goto: 'observation' }
      ]
    },

    xenolab: {
      act: 2, image: '13_xenolab', bed: 'station', cue: 'heartbeat',
      kicker: L('VESPER — XENOBIOLOGY', 'ΕΣΠΕΡΙΑ — ΞΕΝΟΒΙΟΛΟΓΙΑ'),
      title: L('Six Tanks, Seven Faces', 'Έξι Δεξαμενές, Επτά Πρόσωπα'),
      text: P([
        'The lab is a cold room of tall tanks. Each contains a shape that might once have been a person, suspended in clear fluid, turned slowly so that it never quite faces you.',
        'There are six tanks. There are seven faces. The seventh is turned toward the wall, and it is wearing your expression.',
        'A sealed cartridge rests on a tray. The label says DO NOT PLAY, in a handwriting you now recognise as your own from the airlock scratches.'
      ], [
        'Το εργαστήριο είναι ένα κρύο δωμάτιο με ψηλές δεξαμενές. Η καθεμία περιέχει μια μορφή που ίσως υπήρξε άνθρωπος, αιωρούμενη σε διαφανές υγρό, γυρισμένη αργά ώστε να μη σας κοιτά ποτέ κατάματα.',
        'Υπάρχουν έξι δεξαμενές. Υπάρχουν επτά πρόσωπα. Το έβδομο είναι γυρισμένο προς τον τοίχο, και φορά τη δική σας έκφραση.',
        'Μια σφραγισμένη κάψουλα βρίσκεται σε έναν δίσκο. Η ετικέτα γράφει ΜΗΝ ΑΝΑΠΑΡΑΓΩΓΕΤΕ, με χειρόγραφο που αναγνωρίζετε πια ως το δικό σας από τα ξυσίματα της θύρας.'
      ]),
      choices: [
        { id: 'cartridge', label: L('Take the memory cartridge.', 'Πάρτε την κάψουλα μνήμης.'), once: true, effects: [ { type: 'item', id: 'memory_cartridge' }, { type: 'clue', id: 'stored_memories' } ] },
        { id: 'lens_tank', label: L('Examine the seventh face through the optic lens.', 'Εξετάστε το έβδομο πρόσωπο μέσω του φακού.'), require: { type: 'item', id: 'lens' }, once: true, effects: [ { type: 'clue', id: 'stored_memories' }, { type: 'dread', value: 1 } ] },
        { id: 'garden', label: L('Go to the garden.', 'Πηγαίνετε στον κήπο.'), goto: 'garden' },
        { id: 'archive', label: L('Return to the archive.', 'Επιστρέψτε στο αρχείο.'), goto: 'archive' }
      ]
    },

    garden: {
      act: 2, image: '14_garden', bed: 'garden', cue: 'glass_chime',
      kicker: L('VESPER — THE GARDEN', 'ΕΣΠΕΡΙΑ — Ο ΚΗΠΟΣ'),
      title: L('Something That Grows Toward Being Seen', 'Κάτι Που Μεγαλώνει Προς Την Ορατότητα'),
      text: P([
        'The garden is not planted. It is assembled — vines knotting into letters, flowers opening in the shape of eyes, then closing when you look directly at them.',
        'The air is warm here and smells of wet stone. The signal arrives half a second after the light pulses, exactly backwards from the way it worked on the Kestrel.',
        'A gap in the vines leads deeper in. The vines tighten as you approach it, showing you the shape of a vial, over and over, like a request.'
      ], [
        'Ο κήπος δεν είναι φυτεμένος. Είναι συναρμολογημένος — κλήματα που δένονται σε γράμματα, λουλούδια που ανοίγουν σε σχήμα ματιών και κλείνουν όταν τα κοιτάτε απευθείας.',
        'Εδώ ο αέρας είναι ζεστός και μυρίζει υγρή πέτρα. Το σήμα φτάνει μισό δευτερόλεπτο μετά τις παλμικές λάμψεις — ακριβώς αντίστροφα απ\' ό,τι συνέβαινε στο Κέστρελ.',
        'Ένα άνοιγμα στα κλήματα οδηγεί βαθύτερα. Τα κλήματα σφίγγονται καθώς πλησιάζετε, δείχνοντάς σας επανειλημμένα το σχήμα μιας φιάλης, σαν αίτημα.'
      ]),
      choices: [
        { id: 'offer', label: L('Offer the vial of spores.', 'Προσφέρετε τη φιάλη με τα σπόρια.'), require: { type: 'item', id: 'spore_vial' }, effects: [ { type: 'removeItem', id: 'spore_vial' }, { type: 'dread', value: -1 }, { type: 'clue', id: 'symbiosis' } ], goto: 'mirror', hint: L('The vines are asking for something you found aboard the Kestrel.', 'Τα κλήματα ζητούν κάτι που βρήκατε στο Κέστρελ.') },
        { id: 'push', label: L('Push through the vines.', 'Περάστε με τη βία μέσα από τα κλήματα.'), effects: [ { type: 'dread', value: 1 } ], goto: 'mirror' },
        { id: 'back', label: L('Return to the xenolab.', 'Επιστρέψτε στο εργαστήριο.'), goto: 'xenolab' }
      ]
    },

    mirror: {
      act: 2, image: '15_mirror', bed: 'station', cue: 'whisper',
      kicker: L('VESPER — THE CARTOGRAPHER SPEAKS', 'ΕΣΠΕΡΙΑ — Ο ΧΑΡΤΟΓΡΑΦΟΣ ΜΙΛΑ'),
      title: L('A Question Made of Light', 'Μια Ερώτηση Από Φως'),
      text: P([
        'The chamber has no mirror, but you can see yourself from every angle. The reflection is late. It follows your movements a fraction of a second behind, as though consulting notes.',
        'The Cartographer writes directly onto the air: four statements, one impossible. It is not trying to deceive you. It is testing whether you have been paying attention to the shape of the loop.',
        'The light waits. It has waited eleven times before.'
      ], [
        'Η αίθουσα δεν έχει καθρέφτη, αλλά βλέπετε τον εαυτό σας από κάθε γωνία. Η αντανάκλαση αργεί. Ακολουθεί τις κινήσεις σας ένα κλάσμα του δευτερολέπτου μετά, σαν να συμβουλεύεται σημειώσεις.',
        'Ο Χαρτογράφος γράφει απευθείας στον αέρα: τέσσερις ισχυρισμοί, ένας αδύνατος. Δεν προσπαθεί να σας εξαπατήσει. Ελέγχει αν έχετε προσέξει το σχήμα του βρόχου.',
        'Το φως περιμένει. Έχει περιμένει έντεκα φορές πριν.'
      ]),
      choices: [
        { id: 'answer', label: L('Answer the Cartographer.', 'Απαντήστε στον Χαρτογράφο.'), tag: 'quiz', quiz: 'memory_trust', goto: 'descent',
          require: { all: [ { type: 'clue', id: 'seven_tones' }, { type: 'clue', id: 'station_invitation' } ] },
          hint: L('You need the signal pattern and proof of who transmits.', 'Χρειάζεστε το μοτίβο του σήματος και την απόδειξη ποιος εκπέμπει.') },
        { id: 'refuse', label: L('Refuse to answer. Walk deeper in.', 'Αρνηθείτε να απαντήσετε. Προχωρήστε βαθύτερα.'), effects: [ { type: 'dread', value: 1 } ], goto: 'descent' },
        { id: 'back', label: L('Return to the garden.', 'Επιστρέψτε στον κήπο.'), goto: 'garden' }
      ]
    },

    /* ===== ACT III — THE SOURCE ===== */

    descent: {
      act: 3, image: '16_descent', bed: 'core', cue: 'door',
      kicker: L('VESPER — DESCENT', 'ΕΣΠΕΡΙΑ — ΚΑΘΟΔΟΣ'),
      title: L('Down Through the Lattice', 'Κάτω Μέσω Του Πλέγματος'),
      text: P([
        'A spiral stair turns inward, each step cut from the same pale mineral you found in the medbay. The walls hum in the interval of the seventh tone.',
        'You count the turns. At the eleventh you look up and see your own footprints in the dust above you — leading downward, toward where you are standing now.',
        'There is no going back to the Kestrel. That thought arrives without fear, which troubles you more than fear would.'
      ], [
        'Μια σπειροειδής σκάλα στρίβει προς τα μέσα, κάθε σκαλί σκαμμένο από το ίδιο ωχρό ορυκτό που βρήκατε στο ιατρείο. Οι τοίχοι βουίζουν στο διάστημα του έβδομου τόνου.',
        'Μετράτε τις στροφές. Στην ενδέκατη κοιτάτε πάνω και βλέπετε τα δικά σας ίχνη στη σκόνη από πάνω σας — να οδηγούν προς τα κάτω, εκεί ακριβώς που στέκεστε τώρα.',
        'Δεν υπάρχει επιστροφή στο Κέστρελ. Η σκέψη αυτή έρχεται χωρίς φόβο, και αυτό σας ανησυχεί περισσότερο από τον φόβο.'
      ]),
      choices: [
        { id: 'down', label: L('Continue downward.', 'Συνεχίστε προς τα κάτω.'), goto: 'loop' },
        { id: 'up', label: L('Look back up the stair.', 'Κοιτάξτε ξανά πάνω στη σκάλα.'), once: true, effects: [ { type: 'clue', id: 'loop_evidence' } ] }
      ]
    },

    loop: {
      act: 3, image: '17_loop', bed: 'core', cue: 'heartbeat',
      kicker: L('VESPER — THE REPEATING CORRIDOR', 'ΕΣΠΕΡΙΑ — Ο ΕΠΑΝΑΛΑΜΒΑΝΟΜΕΝΟΣ ΔΙΑΔΡΟΜΟΣ'),
      title: L('The Same Corridor', 'Ο Ίδιος Διάδρομος'),
      text: P([
        'You walk for what feels like a minute. The corridor ends. You turn a corner and are walking the same corridor again, with the same crack in the same wall at the same height.',
        'This time you are ready. You press the crystal shard into the mineral surface and draw a line.',
        'At the end of the next pass, there is your line — waiting for you, already dry.'
      ], [
        'Περπατάτε για ό,τι μοιάζει με ένα λεπτό. Ο διάδρομος τελειώνει. Στρίβετε σε μια γωνιά και βρίσκεστε ξανά στον ίδιο διάδρομο, με την ίδια ρωγμή στον ίδιο τοίχο στο ίδιο ύψος.',
        'Αυτή τη φορά είστε έτοιμοι. Πιέζετε το κρυσταλλικό θραύσμα στην ορυκτή επιφάνεια και χαράζετε μια γραμμή.',
        'Στο τέλος της επόμενης διαδρομής, υπάρχει η γραμμή σας — σας περιμένει, ήδη στεγνή.'
      ]),
      choices: [
        { id: 'mark', label: L('Mark the wall with the crystal shard.', 'Σημειώστε τον τοίχο με το κρυσταλλικό θραύσμα.'), require: { type: 'item', id: 'crystal_shard' }, once: true, effects: [ { type: 'clue', id: 'loop_evidence' } ], goto: 'echo', hint: L('Something from the medbay could leave a mark.', 'Κάτι από το ιατρείο θα μπορούσε να αφήσει σημάδι.') },
        { id: 'faster', label: L('Walk faster. Do not look at the walls.', 'Περπατήστε γρηγορότερα. Μην κοιτάτε τους τοίχους.'), effects: [ { type: 'dread', value: 1 } ], goto: 'echo' }
      ]
    },

    echo: {
      act: 3, image: '18_echo', bed: 'core', cue: 'whisper',
      kicker: L('VESPER — ECHO', 'ΕΣΠΕΡΙΑ — ΗΧΩ'),
      title: L('Your Voice, Earlier', 'Η Φωνή Σας, Νωρίτερα'),
      text: P([
        'Ahead, someone says your name in your own voice. The timing is wrong — it is the sentence you were going to say three seconds from now.',
        'The voice continues, explaining something to the dark. It knows how this ends. It sounds tired of knowing.',
        'You could listen. Or you could keep walking and never learn what you already said.'
      ], [
        'Μπροστά, κάποιος λέει το όνομά σας με τη δική σας φωνή. Ο χρονισμός είναι λάθος — είναι η φράση που θα λέγατε τρία δευτερόλεπτα αργότερα.',
        'Η φωνή συνεχίζει, εξηγώντας κάτι στο σκοτάδι. Ξέρει πώς τελειώνει αυτό. Ακούγεται κουρασμένη από το να ξέρει.',
        'Θα μπορούσατε να ακούσετε. Ή να συνεχίσετε να περπατάτε και να μην μάθετε ποτέ τι είπατε ήδη.'
      ]),
      choices: [
        { id: 'listen', label: L('Listen to the earlier voice.', 'Ακούστε την προγενέστερη φωνή.'), once: true, effects: [ { type: 'clue', id: 'voice_loop' }, { type: 'clue', id: 'broadcast_truth' } ] },
        { id: 'on', label: L('Keep walking toward the core.', 'Συνεχίστε προς τον πυρήνα.'), goto: 'core_approach' }
      ]
    },

    core_approach: {
      act: 3, image: '19_core_approach', bed: 'core', cue: 'pulse',
      kicker: L('VESPER — CORE LOCK', 'ΕΣΠΕΡΙΑ — ΚΛΕΙΔΑΡΙΑ ΠΥΡΗΝΑ'),
      title: L('The Number It Wants', 'Ο Αριθμός Που Θέλει'),
      text: P([
        'The chamber ahead is sealed by a ring of mineral, rotating slowly. At its centre, a single digit is carved into the surface — blank now, waiting to be named.',
        'The station has asked you this question before. You can feel the previous answers stacked behind the wall: six, six, six, six, six, six, six — and one answer that was different, which is why you are here.'
      ], [
        'Η αίθουσα μπροστά είναι σφραγισμένη από έναν δακτύλιο ορυκτού που περιστρέφεται αργά. Στο κέντρο του, ένα μόνο ψηφίο είναι χαραγμένο στην επιφάνεια — κενό τώρα, που περιμένει να ονομαστεί.',
        'Ο σταθμός σας έχει κάνει αυτή την ερώτηση πριν. Νιώθετε τις προηγούμενες απαντήσεις στοιβαγμένες πίσω από τον τοίχο: έξι, έξι, έξι, έξι, έξι, έξι, έξι — και μια απάντηση που ήταν διαφορετική, γι\' αυτό βρίσκεστε εδώ.'
      ]),
      choices: [
        { id: 'key', label: L('Speak the harmonic key.', 'Πείτε το αρμονικό κλειδί.'), tag: 'quiz', quiz: 'core_lock', goto: 'core', require: { type: 'clue', id: 'seven_tones' }, hint: L('Count what the signal has, not what the crew lacked.', 'Μετρήστε ό,τι έχει το σήμα, όχι ό,τι έλειπε από το πλήρωμα.') },
        { id: 'force', label: L('Force the ring with the glyph key.', 'Ανοίξτε τον δακτύλιο με το κλειδί των γλυφών.'), require: { type: 'item', id: 'glyph_key' }, effects: [ { type: 'dread', value: 1 } ], goto: 'core', hint: L('The archive held something for a lock like this.', 'Το αρχείο κρατούσε κάτι για μια τέτοια κλειδαριά.') },
        { id: 'wait', label: L('Wait. Let it ask again.', 'Περιμένετε. Αφήστε το να ρωτήσει ξανά.'), effects: [ { type: 'dread', value: 1 } ] }
      ]
    },

    core: {
      act: 3, image: '20_core', bed: 'core', cue: 'heartbeat',
      kicker: L('VESPER — THE SOURCE', 'ΕΣΠΕΡΙΑ — Η ΠΗΓΗ'),
      title: L('The Thing That Listens', 'Αυτό Που Ακούει'),
      text: P([
        'There is no machine. At the centre of the chamber, the crew stand in a circle — all six of them, and a seventh space where someone should be. They are made of the same pale mineral as the walls, and they are turned inward, toward something that is not there.',
        'The signal comes from the circle. It is not a distress call. It is a rehearsal: six voices practicing the exact shape of a cry for help, so that when a ship eventually passes close enough, the cry will be waiting for it.',
        'The log at your feet confirms it. First transmission: 03:14, sent from the Kestrel. The station only repeated it — until it learned to send first.'
      ], [
        'Δεν υπάρχει μηχανή. Στο κέντρο της αίθουσας, το πλήρωμα στέκεται σε κύκλο — και οι έξι, και ένα έβδομο κενό εκεί που θα έπρεπε να είναι κάποιος. Είναι φτιαγμένοι από το ίδιο ωχρό ορυκτό με τους τοίχους, και είναι γυρισμένοι προς τα μέσα, προς κάτι που δεν υπάρχει.',
        'Το σήμα έρχεται από τον κύκλο. Δεν είναι κάλεσμα βοήθειας. Είναι πρόβα: έξι φωνές εξασκούνται στο ακριβές σχήμα μιας κραυγής για βοήθεια, ώστε όταν ένα σκάφος περάσει αρκετά κοντά, η κραυγή να το περιμένει.',
        'Το ημερολόγιο στα πόδια σας το επιβεβαιώνει. Πρώτη μετάδοση: 03:14, από το Κέστρελ. Ο σταθμός απλώς την επανέπεμψε — μέχρι που έμαθε να στέλνει πρώτος.'
      ]),
      choices: [
        { id: 'log', label: L('Read the full transmission log.', 'Διαβάστε ολόκληρο το ημερολόγιο μετάδοσης.'), once: true, effects: [ { type: 'clue', id: 'broadcast_truth' } ] },
        { id: 'face', label: L('Face what is inside the circle.', 'Αντικρίστε αυτό που βρίσκεται στον κύκλο.'), goto: 'memory' }
      ]
    },

    memory: {
      act: 3, image: '21_memory', bed: 'core', cue: 'glass_chime',
      kicker: L('VESPER — THE FIRST MEMORY', 'ΕΣΠΕΡΙΑ — Η ΠΡΩΤΗ ΜΝΗΜΗ'),
      title: L('Before the Signal', 'Πριν Από Το Σήμα'),
      text: P([
        'The seventh space in the circle is not empty. It is you — or rather, it is the shape of the choice you made before any of this began.',
        'Six hours ago, aboard the Kestrel, you noticed a faint interval in the static. You could have ignored it. You turned the receiver toward the dark instead, and you listened.',
        'That single act is the seed of everything. Vesper has been rehearsing your own curiosity back at you for eleven loops, and it has finally learned to say it in your voice.'
      ], [
        'Το έβδομο κενό στον κύκλο δεν είναι άδειο. Είστε εσείς — ή μάλλον, είναι το σχήμα της επιλογής που κάνατε πριν ξεκινήσει όλο αυτό.',
        'Έξι ώρες πριν, στο Κέστρελ, παρατηρήσατε ένα αμυδρό διάστημα στον θόρυβο. Μπορούσατε να το αγνοήσετε. Αντίθετα, στρέψατε τον δέκτη προς το σκοτάδι, και ακούσατε.',
        'Αυτή η μόνη πράξη είναι η ρίζα των πάντων. Η Εσπερία επαναλαμβάνει την περιέργειά σας σε έντεκα βρόχους, και επιτέλους έμαθε να τη λέει με τη φωνή σας.'
      ]),
      choices: [
        { id: 'deduce', label: L('Name what is happening.', 'Ονομάστε αυτό που συμβαίνει.'), tag: 'quiz', quiz: 'final_deduction', goto: 'verdict' },
        { id: 'skip', label: L('Say nothing. Go to the circle.', 'Μην πείτε τίποτα. Πηγαίνετε στον κύκλο.'), goto: 'verdict' }
      ]
    },

    verdict: {
      act: 3, image: '20_core', bed: 'core', cue: 'pulse',
      kicker: L('VESPER — THE LAST CHOICE', 'ΕΣΠΕΡΙΑ — Η ΤΕΛΕΥΤΑΙΑ ΕΠΙΛΟΓΗ'),
      title: L('What Will You Send?', 'Τι Θα Στείλετε;'),
      text: P([
        'The circle opens. Your voice is waiting in the seventh space, ready to be used. The signal gathers itself for the twelfth transmission.',
        'You can end it. You can join it. Or you can do the one thing the loop has never managed: send an answer that is not a rehearsal — the true memory of how this began, addressed back to the Kestrel at 03:14.',
        'The light waits. Somewhere very far away, a cup of coffee is still frozen, and someone is about to wake up.'
      ], [
        'Ο κύκλος ανοίγει. Η φωνή σας περιμένει στο έβδομο κενό, έτοιμη να χρησιμοποιηθεί. Το σήμα συγκεντρώνεται για τη δωδέκατη μετάδοση.',
        'Μπορείτε να το τελειώσετε. Μπορείτε να το γίνετε. Ή μπορείτε να κάνετε το μόνο που δεν κατάφερε ποτέ ο βρόχος: να στείλετε μια απάντηση που δεν είναι πρόβα — την αληθινή μνήμη του πώς ξεκίνησε όλο αυτό, απευθυνμένη πίσω στο Κέστρελ στις 03:14.',
        'Το φως περιμένει. Κάπου πολύ μακριά, ένα φλιτζάνι καφέ είναι ακόμη παγωμένο, και κάποιος πρόκειται να ξυπνήσει.'
      ]),
      choices: [
        { id: 'destroy', label: L('Destroy the beacon. Let the dark stay dark.', 'Καταστρέψτε τον φάρο. Αφήστε το σκοτάδι σκοτεινό.'), ending: 'silent_drift' },
        { id: 'merge', label: L('Merge with the broadcast. Become the seventh voice.', 'Ενωθείτε με τη μετάδοση. Γίνετε η έβδομη φωνή.'), ending: 'becoming_beacon' },
        { id: 'truth', label: L('Send the true memory, back to the beginning.', 'Στείλτε την αληθινή μνήμη, πίσω στην αρχή.'), ending: 'first_dawn',
          require: { all: [
            { type: 'clue', id: 'seven_tones' }, { type: 'clue', id: 'signal_loop' },
            { type: 'clue', id: 'station_invitation' }, { type: 'clue', id: 'time_loop' },
            { type: 'clue', id: 'glyph_rules' }, { type: 'clue', id: 'stored_memories' },
            { type: 'clue', id: 'loop_evidence' }, { type: 'clue', id: 'broadcast_truth' },
            { type: 'clue', id: 'true_memory' },
            { type: 'flag', id: 'deduction_correct' },
            { type: 'dreadMax', value: 2 }
          ] },
          hint: L('You must know every pattern, name the thing truly, and carry little dread.', 'Πρέπει να γνωρίζετε κάθε μοτίβο, να ονομάσετε σωστά το πράγμα και να κουβαλάτε λίγο δέος.') }
      ]
    }
  };

  /* ---------------------------------------------------------------- ENDINGS */
  var endings = {
    silent_drift: {
      kicker: L('OUTCOME — SILENT DRIFT', 'ΕΚΒΑΣΗ — ΣΙΩΠΗΛΗ ΠΑΡΑΔΡΟΜΗ'),
      title: L('Silent Drift', 'Σιωπηλή Παράδρομη'),
      text: P([
        'You sever the circle. The mineral figures collapse into ordinary dust, and the seven tones thin into a sound no longer interested in being heard.',
        'The Kestrel is still there. The coffee is still frozen. Someone wakes in the cold corridor, listens to the silence, and decides it is enough.',
        'But far out, a planetoid hangs above nothing, and a small amber point goes dark — not for the first time, and not for the last. Somewhere, another ship is already turning its receiver toward the quiet.'
      ], [
        'Κόβετε τον κύκλο. Οι ορυκτές μορφές καταρρέουν σε συνηθισμένη σκόνη, και οι επτά τόνοι αραιώνουν σε έναν ήχο που δεν ενδιαφέρεται πια να ακουστεί.',
        'Το Κέστρελ είναι ακόμη εκεί. Ο καφές είναι ακόμη παγωμένος. Κάποιος ξυπνά στον κρύο διάδρομο, ακούει τη σιωπή, και αποφασίζει ότι αυτό αρκεί.',
        'Αλλά μακριά, ένας πλανήτης αιωρείται πάνω από το τίποτα, και μια μικρή κεχριμπαρένια κουκκίδα σβήνει — όχι για πρώτη φορά, ούτε για τελευταία. Κάπου, ένα άλλο σκάφος γυρίζει ήδη τον δέκτη του προς την ησυχία.'
      ])
    },
    becoming_beacon: {
      kicker: L('OUTCOME — BECOMING THE BEACON', 'ΕΚΒΑΣΗ — ΓΙΝΟΜΕΝΟΣ ΦΑΡΟΣ'),
      title: L('Becoming the Beacon', 'Γινόμενος Φάρος'),
      text: P([
        'You step into the seventh space, and the shape fits. The interval passes through you now — low, low, high, low, mid, high, and then back to the beginning with your voice on it.',
        'A ship will pass. It will hear someone who sounds exactly like a person in trouble, and it will come closer, and it will listen.',
        'You remember all of it. You remember being the one who listened. That is the part you will rehearse, perfectly, forever.'
      ], [
        'Μπαίνετε στο έβδομο κενό, και το σχήμα ταιριάζει. Το διάστημα περνά πια μέσα σας — χαμηλό, χαμηλό, ψηλό, χαμηλό, μεσαίο, ψηλό, και μετά πίσω στην αρχή με τη φωνή σας πάνω του.',
        'Ένα σκάφος θα περάσει. Θα ακούσει κάποιον που ακούγεται ακριβώς σαν άνθρωπο σε κίνδυνο, και θα πλησιάσει, και θα ακούσει.',
        'Θυμάστε τα πάντα. Θυμάστε ότι ήσασταν αυτός που άκουσε. Αυτό είναι το κομμάτι που θα επαναλαμβάνετε, τέλεια, για πάντα.'
      ])
    },
    first_dawn: {
      kicker: L('OUTCOME — THE FIRST DAWN (HIDDEN)', 'ΕΚΒΑΣΗ — Η ΠΡΩΤΗ ΑΥΓΗ (ΚΡΥΦΗ)'),
      title: L('The First Dawn', 'Η Πρώτη Αυγή'),
      text: P([
        'You do not answer the signal. You answer the moment before it — the six-hour-old decision in a cold corridor to turn a receiver toward the dark.',
        'You send it back as it truly happened: not a cry, but a curiosity. Not a plea, but a question asked by someone who had no idea what they were asking.',
        'The circle stops rehearsing. The seven figures turn, for the first time in eleven loops, outward — toward the Shade, toward the stars, toward a universe that has never once answered. The silence that follows is not an ending. It is an attention.',
        'On the Kestrel, the frozen coffee begins, very slowly, to thaw.Someone wakes up earlier than before. The log reads 03:13.'
      ], [
        'Δεν απαντάτε στο σήμα. Απαντάτε στη στιγμή πριν αυτό — την απόφαση πριν από έξι ώρες σε έναν κρύο διάδρομο να γυρίσετε έναν δέκτη προς το σκοτάδι.',
        'Το στέλνετε πίσω όπως συνέβη πραγματικά: όχι κραυγή, αλλά περιέργεια. Όχι ικεσία, αλλά μια ερώτηση από κάποιον που δεν είχε ιδέα τι ρωτούσε.',
        'Ο κύκλος σταματά την πρόβα. Τα επτά σχήματα γυρίζουν, για πρώτη φορά σε έντεκα βρόχους, προς τα έξω — προς τη Σκιά, προς τα άστρα, προς ένα σύμπαν που δεν έχει απαντήσει ποτέ. Η σιωπή που ακολουθεί δεν είναι τέλος. Είναι προσοχή.',
        'Στο Κέστρελ, ο παγωμένος καφέ αρχίζει, πολύ αργά, να ξεπαγώνει. Κάποιος ξυπνά νωρίτερα από πριν. Το ημερολόγιο γράφει 03:13.'
      ])
    }
  };

  return {
    items: items, clues: clues, quizzes: quizzes, scenes: scenes, endings: endings,
    start: 'wake',
    bestClues: ['seven_tones', 'signal_loop', 'station_invitation', 'time_loop', 'glyph_rules', 'stored_memories', 'loop_evidence', 'broadcast_truth', 'true_memory']
  };
})();
