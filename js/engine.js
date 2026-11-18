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
      dread: 0, choicesMade: 0,
      audioOn: true, volume: 0.7, captions: true, motion: true, speed: 'normal'
    };
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

  function applyEffects(effects) {
    if (!effects) return;
    effects.forEach(function (fx) {
      switch (fx.type) {
        case 'item':
          if (state.inventory.indexOf(fx.id) < 0) {
            state.inventory.push(fx.id);
            VESPER_UI.toast('itemFound');
          }
          break;
        case 'removeItem':
          var i = state.inventory.indexOf(fx.id);
          if (i >= 0) { state.inventory.splice(i, 1); VESPER_UI.toast('itemLost'); }
          break;
        case 'clue':
          if (state.clues.indexOf(fx.id) < 0) {
            state.clues.push(fx.id);
            VESPER_UI.toast('clueFound');
          }
          break;
        case 'flag': addUnique(state.flags, fx.id); break;
        case 'visited': addUnique(state.visited, fx.id); break;
        case 'dread':
          var before = state.dread;
          state.dread = Math.max(0, Math.min(5, state.dread + fx.value));
          if (state.dread !== before) VESPER_UI.toast(fx.value > 0 ? 'dreadUp' : 'dreadDown');
          break;
      }
    });
    VESPER_AUDIO.setDread(state.dread);
  }

  /* ------------------------------------------------------------ movement */
  function goto(id) {
    var scene = C.scenes[id];
    if (!scene) return;
    if (answerTimer) { clearTimeout(answerTimer); answerTimer = null; }
    state.sceneId = id;
    addUnique(state.visited, id);
    VESPER_SCENE.glitch();
    VESPER_SCENE.set(scene.image, false);
    VESPER_AUDIO.setBed(scene.bed);
    if (scene.cue) setTimeout(function () { VESPER_AUDIO.playCue(scene.cue); }, 420);
    VESPER_UI.renderScene(scene, state, C);
    save();
  }

  function handleChoice(choice) {
    if (!choice) return;
    state.choicesMade++;
    if (choice.once) addUnique(state.used, state.sceneId + ':' + choice.id);
    if (choice.effects) applyEffects(choice.effects);

    if (choice.quiz) {
      pending = choice;
      VESPER_UI.openQuiz(C.quizzes[choice.quiz], state);
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
    }
  }

  /* -------------------------------------------------------------- endings */
  function recordEnding(id) {
    var found = load(END_KEY) || [];
    if (found.indexOf(id) < 0) found.push(id);
    store(END_KEY, found);
  }

  function endGame(id) {
    var ending = C.endings[id];
    if (!ending) return;
    recordEnding(id);
    VESPER_AUDIO.setDread(0);
    VESPER_AUDIO.playCue('ending');
    VESPER_UI.showEnding(ending, state, C);
    clearSave();
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
    state = saved;
    Object.keys(settings).forEach(function (k) { if (state[k] === undefined) state[k] = settings[k]; });
    pending = null;
    quizAttempts = {};
    VESPER_UI.hideTitle();
    VESPER_AUDIO.unlock();
    VESPER_AUDIO.startMusic();
    VESPER_AUDIO.setDread(state.dread);
    goto(state.sceneId);
  }

  function toTitle() {
    VESPER_UI.closeQuiz();
    VESPER_UI.closePanel();
    VESPER_UI.closeSettings();
    VESPER_SCENE.set('title', true);
    VESPER_AUDIO.setBed('ship');
    VESPER_AUDIO.setDread(0);
    VESPER_UI.showTitle(hasSave());
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
    applyEffects: applyEffects
  };
})();
