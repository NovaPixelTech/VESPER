/* VESPER — game state machine */
window.VESPER_ENGINE = (function () {
  'use strict';

  var SAVE_KEY = 'vesper_save_v1';
  var SET_KEY = 'vesper_settings_v1';
  var END_KEY = 'vesper_endings_v1';

  var C = null;
  var state = null;
  var pending = null;
  var quizAttempts = {};
  var answerTimer = null;

  function defaults() {
    return {
      sceneId: C.start,
      inventory: [], clues: [], flags: [], visited: [], used: [],
      visitCounts: {}, journal: [], historyStack: [],
      dread: 0, choicesMade: 0,
      aiHistory: [], aiSuggestions: [],
      audioOn: true, volume: 0.7, captions: true, motion: true, speed: 'normal'
    };
  }

  function cloneState(s) {
    return JSON.parse(JSON.stringify(s));
  }
  function ensureShape(s) {
    if (!s) return s;
    if (!s.visitCounts) s.visitCounts = {};
    if (!s.journal) s.journal = [];
    if (!s.historyStack) s.historyStack = [];
    if (!s.aiHistory) s.aiHistory = [];
    if (!s.aiSuggestions) s.aiSuggestions = [];
    if (!s.used) s.used = [];
    if (!s.flags) s.flags = [];
    if (!s.visited) s.visited = [];
    if (!s.inventory) s.inventory = [];
    if (!s.clues) s.clues = [];
    return s;
  }
  function pushHistory() {
    var snap = cloneState(state);
    snap.historyStack = []; // don't nest stacks
    state.historyStack.push(snap);
    if (state.historyStack.length > 20) state.historyStack.shift();
  }
  function addJournal(kind, text) {
    if (!text) return;
    state.journal.push({ kind: kind, text: text, sceneId: state.sceneId, t: Date.now() });
    if (state.journal.length > 80) state.journal = state.journal.slice(-80);
  }
  function sceneName(id) {
    var s = C.scenes[id];
    return s ? (I18N.tx(s.title) || id) : id;
  }
  function updateDreadVisuals() {
    document.body.classList.toggle('dread-high', state.dread >= 4);
    document.body.classList.toggle('dread-mid', state.dread >= 2 && state.dread < 4);
    document.body.setAttribute('data-dread', String(state.dread || 0));
  }

  function init() {
    C = VESPER_CONTENT;
    var settings = load(SET_KEY) || {};
    state = defaults();
    if (settings.audioOn !== undefined) state.audioOn = settings.audioOn;
    if (settings.volume !== undefined) state.volume = settings.volume;
    if (settings.captions !== undefined) state.captions = settings.captions;
    if (settings.motion !== undefined) state.motion = settings.motion;
    if (settings.speed !== undefined) state.speed = settings.speed;

    VESPER_AUDIO.setEnabled(state.audioOn);
    VESPER_AUDIO.setVolume(state.volume);
    VESPER_UI.setCaptions(state.captions);
    VESPER_UI.setSpeed(state.speed);
    VESPER_SCENE.setMotion(state.motion);
    VESPER_AUDIO.setCaptionHandler(function (cap) { VESPER_UI.caption(cap); });
  }

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function persistSettings() {
    store(SET_KEY, {
      audioOn: state.audioOn, volume: state.volume, captions: state.captions,
      motion: state.motion, speed: state.speed
    });
  }
  function save() { store(SAVE_KEY, state); }
  function hasSave() { return !!load(SAVE_KEY); }
  function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

  function getState() { return state; }

  /* ---------------------------------------------------------- conditions */
  function satisfies(req, st) {
    if (!req) return true;
    if (req.all) return req.all.every(function (r) { return satisfies(r, st); });
    if (req.any) return req.any.some(function (r) { return satisfies(r, st); });
    if (req.not) return !satisfies(req.not, st);
    switch (req.type) {
      case 'item':     return st.inventory.indexOf(req.id) >= 0;
      case 'clue':     return st.clues.indexOf(req.id) >= 0;
      case 'flag':     return st.flags.indexOf(req.id) >= 0;
      case 'visited':  return st.visited.indexOf(req.id) >= 0;
      case 'dreadMax': return st.dread <= req.value;
      case 'dreadMin': return st.dread >= req.value;
      default: return true;
    }
  }
  function isLocked(req, st) { return !satisfies(req, st || state); }

  /* ------------------------------------------------------------- effects */
  function addUnique(arr, id) { if (arr.indexOf(id) < 0) arr.push(id); }

  function applyEffects(effects, silent) {
    if (!effects) return;
    effects.forEach(function (fx) {
      switch (fx.type) {
        case 'item':
          if (state.inventory.indexOf(fx.id) < 0) {
            state.inventory.push(fx.id);
            if (!silent) VESPER_UI.toast('itemFound');
            var it = C.items[fx.id];
            if (it) addJournal('item', I18N.t('itemFound') + ': ' + I18N.tx(it.name));
          }
          break;
        case 'removeItem':
          var i = state.inventory.indexOf(fx.id);
          if (i >= 0) { state.inventory.splice(i, 1); if (!silent) VESPER_UI.toast('itemLost'); }
          break;
        case 'clue':
          if (state.clues.indexOf(fx.id) < 0) {
            state.clues.push(fx.id);
            if (!silent) VESPER_UI.toast('clueFound');
            var cl = C.clues[fx.id];
            if (cl) addJournal('clue', I18N.t('clueFound') + ': ' + I18N.tx(cl.name));
          }
          break;
        case 'flag': addUnique(state.flags, fx.id); break;
        case 'visited': addUnique(state.visited, fx.id); break;
        case 'dread':
          var before = state.dread;
          state.dread = Math.max(0, Math.min(5, state.dread + fx.value));
          if (state.dread !== before) {
            if (!silent) VESPER_UI.toast(fx.value > 0 ? 'dreadUp' : 'dreadDown');
            updateDreadVisuals();
          }
          break;
      }
    });
    VESPER_AUDIO.setDread(state.dread);
    updateDreadVisuals();
  }

  /* ------------------------------------------------------------ movement */
  function goto(id, opts) {
    var scene = C.scenes[id];
    if (!scene) return;
    opts = opts || {};
    if (answerTimer) { clearTimeout(answerTimer); answerTimer = null; }
    state.sceneId = id;
    addUnique(state.visited, id);
    if (!opts.restore) state.visitCounts[id] = (state.visitCounts[id] || 0) + 1;
    if (!opts.silentLog) addJournal('arrive', I18N.t('arrived') + ': ' + I18N.tx(scene.title));
    state.aiSuggestions = [];
    VESPER_SCENE.glitch();
    VESPER_SCENE.set(scene.image, false);
    VESPER_AUDIO.setBed(scene.bed);
    if (scene.cue) setTimeout(function () { VESPER_AUDIO.playCue(scene.cue); }, 420);
    updateDreadVisuals();
    VESPER_UI.renderScene(scene, state, C);
    save();
  }

  function handleChoice(choice) {
    if (!choice) return;
    pushHistory();
    state.choicesMade++;
    if (choice.once) addUnique(state.used, state.sceneId + ':' + choice.id);
    addJournal('choice', I18N.t('chose') + ': ' + I18N.tx(choice.label));
    if (choice.effects) applyEffects(choice.effects);

    if (choice.quiz) {
      pending = choice;
      VESPER_UI.openQuiz(C.quizzes[choice.quiz], state);
      save();
      return;
    }
    if (choice.ending) { endGame(choice.ending); return; }
    if (choice.goto) goto(choice.goto);
    else { VESPER_UI.renderScene(C.scenes[state.sceneId], state, C); save(); }
  }

  function handleAnswer(optionId, btn) {
    var quizId = pending && pending.quiz;
    var quiz = C.quizzes[quizId];
    if (!quiz) return;
    quizAttempts[quizId] = (quizAttempts[quizId] || 0) + 1;
    var correct = optionId === quiz.answer;

    if (correct) {
      if (btn) btn.classList.add('correct');
      VESPER_AUDIO.playCue('glyph');
      var gotoTarget = pending.goto || null;
      if (quiz.onCorrect) applyEffects(quiz.onCorrect);
      VESPER_UI.quizResult(true, quiz.correct, quizAttempts[quizId]);
      pending = null;
      answerTimer = setTimeout(function () {
        VESPER_UI.closeQuiz();
        answerTimer = null;
        if (gotoTarget) goto(gotoTarget);
        else { VESPER_UI.renderScene(C.scenes[state.sceneId], state, C); save(); }
      }, 1500);
    } else {
      if (btn) btn.classList.add('wrong');
      VESPER_AUDIO.playCue('creak');
      if (quiz.onWrong) applyEffects(quiz.onWrong);
      VESPER_UI.quizResult(false, quiz.wrong, quizAttempts[quizId]);
      VESPER_UI.updateHud(state, (C.scenes[state.sceneId] || {}).act);
      save();
    }
  }

  /* -------------------------------------------------------------- endings */
  function recordEnding(id) {
    var found = load(END_KEY) || [];
    if (found.indexOf(id) < 0) found.push(id);
    store(END_KEY, found);
  }
  function getEndingsFound() { return load(END_KEY) || []; }

  function endGame(id) {
    var ending = C.endings[id];
    if (!ending) return;
    recordEnding(id);
    VESPER_AUDIO.setDread(0);
    VESPER_AUDIO.playCue('ending');
    VESPER_UI.showEnding(ending, state, C);
    clearSave();
  }

  function undo() {
    if (!state.historyStack || !state.historyStack.length) {
      VESPER_UI.toast('undoNone');
      return;
    }
    var snap = state.historyStack.pop();
    var keep = {
      audioOn: state.audioOn, volume: state.volume, captions: state.captions,
      motion: state.motion, speed: state.speed
    };
    state = ensureShape(snap);
    Object.keys(keep).forEach(function (k) { state[k] = keep[k]; });
    pending = null;
    quizAttempts = quizAttempts || {};
    VESPER_AUDIO.setDread(state.dread);
    updateDreadVisuals();
    VESPER_UI.closeQuiz();
    goto(state.sceneId, { silentLog: true, restore: true });
  }

  /* ---------------------------------------------------------- lifecycle */
  function newGame() {
    var settings = {
      audioOn: state.audioOn, volume: state.volume, captions: state.captions,
      motion: state.motion, speed: state.speed
    };
    state = defaults();
    Object.keys(settings).forEach(function (k) { state[k] = settings[k]; });
    quizAttempts = {};
    pending = null;
    VESPER_UI.closeQuiz();
    VESPER_UI.closePanel();
    VESPER_UI.closeSettings();
    VESPER_UI.hideTitle();
    VESPER_SCENE.set('title', true);
    VESPER_AUDIO.unlock();
    VESPER_AUDIO.startMusic();
    VESPER_AUDIO.setDread(0);
    goto(C.start);
  }

  function continueGame() {
    var saved = load(SAVE_KEY);
    if (!saved) { VESPER_UI.toast('noSave'); return; }
    var settings = {
      audioOn: state.audioOn, volume: state.volume, captions: state.captions,
      motion: state.motion, speed: state.speed
    };
    state = ensureShape(saved);
    Object.keys(settings).forEach(function (k) { if (state[k] === undefined) state[k] = settings[k]; });
    pending = null;
    quizAttempts = {};
    VESPER_UI.hideTitle();
    VESPER_AUDIO.unlock();
    VESPER_AUDIO.startMusic();
    VESPER_AUDIO.setDread(state.dread);
    updateDreadVisuals();
    goto(state.sceneId, { silentLog: true, restore: true });
  }

  function toTitle() {
    VESPER_UI.closeQuiz();
    VESPER_UI.closePanel();
    VESPER_UI.closeSettings();
    VESPER_SCENE.set('title', true);
    VESPER_AUDIO.setBed('ship');
    VESPER_AUDIO.setDread(0);
    document.body.classList.remove('dread-high', 'dread-mid');
    document.body.setAttribute('data-dread', '0');
    VESPER_UI.showTitle(hasSave(), getEndingsFound());
  }

  function setLanguage(lang) {
    I18N.setLang(lang);
    VESPER_UI.updateHud(state, (C.scenes[state.sceneId] || {}).act);
    VESPER_UI.refreshLanguage();
    var scene = C.scenes[state.sceneId];
    if (scene && document.getElementById('game').classList.contains('hidden') === false) {
      VESPER_UI.renderScene(scene, state, C);
    }
  }

  /* ---------------------------------------------------------- AI actions */
  function handleAIAction(text) {
    var scene = C.scenes[state.sceneId];
    if (!scene || !window.VESPER_AI) return Promise.resolve();
    if (!VESPER_AI.isReady()) {
      VESPER_UI.setAIStatus(I18N.t('aiNotConfigured'));
      VESPER_UI.setAIEnabled(true);
      return Promise.resolve();
    }
    addJournal('ask', I18N.t('asked') + ': ' + text);
    return VESPER_AI.ask(text, state, scene, C).then(function (res) {
      if (!res) return;
      if (res.error) {
        VESPER_UI.appendAILog('ai', '[' + I18N.t('aiError') + '] ' + res.error);
      } else {
        VESPER_UI.appendAILog('ai', res.reply || '');
        var short = (res.reply || '').replace(/\s+/g, ' ').trim();
        if (short.length > 140) short = short.slice(0, 137) + '...';
        addJournal('ai', I18N.t('journalAI') + ': ' + short);
        if (res.dread_delta) {
          var before = state.dread;
          state.dread = Math.max(0, Math.min(5, state.dread + res.dread_delta));
          if (state.dread !== before) {
            VESPER_AUDIO.setDread(state.dread);
            VESPER_UI.toast(res.dread_delta > 0 ? 'dreadUp' : 'dreadDown');
            updateDreadVisuals();
          }
        }
        state.aiSuggestions = Array.isArray(res.suggestions) ? res.suggestions.slice(0, 3) : [];
        VESPER_UI.renderAISuggestions(state.aiSuggestions);
      }
      VESPER_UI.updateHud(state, scene.act);
      save();
    }).catch(function () {
      VESPER_UI.appendAILog('ai', '[' + I18N.t('aiError') + ']');
      save();
    });
  }
  function toggleLanguage() { setLanguage(I18N.lang === 'en' ? 'el' : 'en'); }

  function setAudio(on) {
    state.audioOn = !!on;
    VESPER_AUDIO.setEnabled(state.audioOn);
    if (on) VESPER_AUDIO.unlock();
    VESPER_UI.updateHud(state, (C.scenes[state.sceneId] || {}).act);
    VESPER_UI.syncSettings(state);
    persistSettings();
    save();
  }
  function toggleAudio() { setAudio(!state.audioOn); }

  function setVolume(v) {
    state.volume = v;
    VESPER_AUDIO.setVolume(v);
    persistSettings();
  }
  function setCaptions(on) {
    state.captions = !!on;
    VESPER_UI.setCaptions(state.captions);
    persistSettings();
  }
  function setMotion(on) {
    state.motion = !!on;
    VESPER_SCENE.setMotion(on);
    persistSettings();
  }
  function setSpeed(name) {
    state.speed = name;
    VESPER_UI.setSpeed(name);
    persistSettings();
  }

  return {
    init: init, getState: getState, isLocked: isLocked, checkRequire: isLocked,
    newGame: newGame, continueGame: continueGame, toTitle: toTitle,
    hasSave: hasSave, goto: goto, handleChoice: handleChoice, handleAnswer: handleAnswer,
    setLanguage: setLanguage, toggleLanguage: toggleLanguage, setAudio: setAudio, toggleAudio: toggleAudio,
    setVolume: setVolume, setCaptions: setCaptions, setMotion: setMotion, setSpeed: setSpeed,
    applyEffects: applyEffects, handleAIAction: handleAIAction, undo: undo, getEndingsFound: getEndingsFound
  };
})();
