/* VESPER — DOM rendering, typewriter, modals */
window.VESPER_UI = (function () {
  'use strict';

  var H = {};
  var typeTimer = null;
  var typeTarget = null;
  var typeFull = null;
  var captionTimer = null;
  var toastTimer = null;
  var currentQuiz = null;
  var quizLocked = false;
  var captionEnabled = true;
  var speed = 24; // ms per character batch

  var SPEEDS = { slow: 42, normal: 24, fast: 10 };

  function $(id) { return document.getElementById(id); }

  function init(handlers) {
    H = handlers || {};
    applyStaticStrings();

    $('btn-new').addEventListener('click', function () { H.onNew && H.onNew(); });
    $('btn-continue').addEventListener('click', function () { H.onContinue && H.onContinue(); });
    $('btn-title-settings').addEventListener('click', function () { openSettings(); });
    $('btn-title-credits').addEventListener('click', function () { openPanel('credits'); });
    $('btn-title-lang').addEventListener('click', function () { H.onLangToggle && H.onLangToggle(); });

    $('btn-codex').addEventListener('click', function () { openPanel('codex'); });
    $('btn-inventory').addEventListener('click', function () { openPanel('inventory'); });
    $('btn-audio').addEventListener('click', function () { H.onAudioToggle && H.onAudioToggle(); });
    $('btn-lang').addEventListener('click', function () { H.onLangToggle && H.onLangToggle(); });
    $('btn-menu').addEventListener('click', function () { openSettings(); });

    $('btn-quiz-close').addEventListener('click', closeQuiz);
    $('btn-panel-close').addEventListener('click', closePanel);
    $('btn-settings-close').addEventListener('click', closeSettings);

    $('btn-play-again').addEventListener('click', function () { H.onNew && H.onNew(); });
    $('btn-ending-title').addEventListener('click', function () { H.onTitle && H.onTitle(); });

    $('seg-lang').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang]');
      if (btn) H.onLang && H.onLang(btn.dataset.lang);
    });
    $('seg-audio').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-audio]');
      if (btn) H.onAudio && H.onAudio(btn.dataset.audio === 'on');
    });
    $('seg-captions').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-caps]');
      if (btn) { setCaptions(btn.dataset.caps === 'on'); H.onCaptions && H.onCaptions(btn.dataset.caps === 'on'); syncSettings(); }
    });
    $('seg-motion').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-motion]');
      if (btn) { H.onMotion && H.onMotion(btn.dataset.motion === 'on'); syncSettings(); }
    });
    $('seg-speed').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-speed]');
      if (btn) { setSpeed(btn.dataset.speed); H.onSpeed && H.onSpeed(btn.dataset.speed); syncSettings(); }
    });
    $('volume').addEventListener('input', function (e) {
      H.onVolume && H.onVolume(e.target.value / 100);
    });

    $('narrative').addEventListener('click', skipTyping);

    document.addEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!document.getElementById('game').classList.contains('hidden') && /^[1-9]$/.test(e.key)) {
      var btns = document.querySelectorAll('#choices .choice');
      var el = btns[parseInt(e.key, 10) - 1];
      if (el && !el.classList.contains('locked')) { e.preventDefault(); el.click(); }
    }
    if (e.key === 'Escape') {
      closeQuiz(); closePanel(); closeSettings();
    }
  }

  function applyStaticStrings() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = I18N.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = I18N.t(el.getAttribute('data-i18n-title'));
    });
  }

  function showTitle(hasSave) {
    $('title-screen').classList.remove('hidden');
    $('game').classList.add('hidden');
    $('hud').classList.add('hidden');
    $('ending-screen').classList.add('hidden');
    $('btn-continue').disabled = !hasSave;
    $('btn-continue').style.opacity = hasSave ? 1 : .4;
    applyStaticStrings();
  }

  function hideTitle() {
    $('title-screen').classList.add('hidden');
    $('game').classList.remove('hidden');
    $('hud').classList.remove('hidden');
    $('ending-screen').classList.add('hidden');
  }

  function updateHud(state, act) {
    var keys = { 1: 'act1', 2: 'act2', 3: 'act3' };
    $('hud-act').textContent = I18N.t(keys[act] || '');
    $('btn-lang').textContent = I18N.lang === 'en' ? 'EN' : 'ΕΛ';
    $('dread-num').textContent = state.dread;
    $('dread-fill').style.width = (state.dread / 5 * 100) + '%';
    $('btn-audio').classList.toggle('off', !state.audioOn);
    document.body.classList.toggle('dread-high', state.dread >= 4);
  }

  function stopTyping() {
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
  }

  function skipTyping() {
    if (!typeTimer || !typeTarget) return;
    stopTyping();
    typeTarget.innerHTML = '';
    typeFull.forEach(function (para) {
      var p = document.createElement('p');
      p.textContent = para;
      typeTarget.appendChild(p);
    });
    typeTarget = null;
  }

  function renderScene(scene, state, content) {
    stopTyping();
    $('scene-kicker').textContent = I18N.tx(scene.kicker);
    $('scene-title').textContent = I18N.tx(scene.title);

    var paras = I18N.tx(scene.text);
    if (!Array.isArray(paras)) paras = [paras];
    var el = $('scene-text');
    el.innerHTML = '';
    typeFull = paras;
    typeTarget = el;
    typeText();

    var footParts = [];
    if (scene.cue) footParts.push(I18N.t('skipHint'));
    $('scene-foot').textContent = footParts.join('  ·  ');

    renderChoices(scene, state, content);
    updateHud(state, scene.act);
  }

  function typeText() {
    if (!typeTarget) return;
    var all = typeFull.join('\n\n');
    var chars = Array.from(all);
    var idx = 0;
    var el = typeTarget;
    el.innerHTML = '';
    var p = document.createElement('p');
    el.appendChild(p);
    var caret = document.createElement('span');
    caret.className = 'caret';
    el.appendChild(caret);

    function step() {
      if (!typeTarget) return;
      var batch = speed <= 12 ? 3 : 1;
      var chunk = chars.slice(idx, idx + batch).join('');
      idx += batch;
      for (var j = 0; j < chunk.length; j++) {
        var ch = chunk[j];
        if (ch === '\n') {
          if (p.textContent.length > 0) {
            var np = document.createElement('p');
            el.insertBefore(np, caret);
            p = np;
          }
        } else {
          p.textContent += ch;
        }
      }
      if (idx < chars.length) {
        typeTimer = setTimeout(step, speed);
      } else {
        stopTyping();
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        typeTarget = null;
      }
    }
    step();
  }

  function renderChoices(scene, state, content) {
    var wrap = $('choices');
    wrap.innerHTML = '';
    (scene.choices || []).forEach(function (choice, i) {
      var locked = VESPER_ENGINE.checkRequire(choice.require, state, content);
      var used = choice.once && state.used.indexOf(state.sceneId + ':' + choice.id) >= 0;
      var btn = document.createElement('button');
      btn.className = 'choice' + (locked ? ' locked' : '') + (used ? ' used' : '');
      btn.disabled = !!locked || !!used;
      btn.style.animationDelay = (i * 0.07) + 's';

      var num = document.createElement('span');
      num.className = 'choice-num';
      num.textContent = locked ? '×' : String(i + 1).padStart(2, '0');
      var label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = I18N.tx(choice.label);
      var tag = document.createElement('span');
      tag.className = 'choice-tag';
      tag.textContent = used ? I18N.t('onceTag') : locked ? I18N.t('locked') :
        choice.quiz ? I18N.t('quizTag') : choice.ending ? '◇' : '';
      btn.appendChild(num);
      btn.appendChild(label);
      btn.appendChild(tag);

      if (locked && choice.hint) {
        var hint = document.createElement('span');
        hint.className = 'choice-hint';
        hint.textContent = I18N.tx(choice.hint);
        btn.appendChild(hint);
      }

      if (!locked && !used) {
        btn.addEventListener('click', function () {
          VESPER_AUDIO.playCue('ui');
          H.onChoice && H.onChoice(choice);
        });
      }
      wrap.appendChild(btn);
    });
  }

  /* ------------------------------------------------------------------ QUIZ */
  function openQuiz(quiz, state) {
    currentQuiz = quiz;
    quizLocked = false;
    $('quiz-title').textContent = I18N.tx(quiz.title);
    $('quiz-context').textContent = I18N.tx(quiz.context);
    $('quiz-feedback').textContent = '';
    $('quiz-feedback').className = 'quiz-feedback';
    $('quiz-attempts').textContent = '';
    var wrap = $('quiz-options');
    wrap.innerHTML = '';
    (quiz.options || []).forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      var letter = document.createElement('span');
      letter.className = 'q-letter';
      letter.textContent = String.fromCharCode(65 + i);
      var text = document.createElement('span');
      text.textContent = I18N.tx(opt.label);
      btn.appendChild(letter);
      btn.appendChild(text);
      btn.addEventListener('click', function () {
        if (quizLocked) return;
        quizLocked = true;
        wrap.querySelectorAll('.quiz-option').forEach(function (o) { o.disabled = true; });
        H.onAnswer && H.onAnswer(opt.id, btn);
      });
      wrap.appendChild(btn);
    });
    $('quiz-modal').classList.remove('hidden');
  }

  function quizResult(correct, message, attempts) {
    var fb = $('quiz-feedback');
    fb.textContent = I18N.tx(message);
    fb.className = 'quiz-feedback' + (correct ? '' : ' bad');
    $('quiz-attempts').textContent = (attempts ? I18N.t('attempts') + ': ' + attempts : '');
    if (!correct) {
      quizLocked = false;
      $('quiz-options').querySelectorAll('.quiz-option').forEach(function (o) { o.disabled = false; });
    }
  }

  function closeQuiz() {
    $('quiz-modal').classList.add('hidden');
    currentQuiz = null;
  }
  function closePanel() { $('panel-modal').classList.add('hidden'); }
  function closeSettings() { $('settings-modal').classList.add('hidden'); }

  /* ----------------------------------------------------------------- PANELS */
  function openPanel(type, state, content) {
    content = content || window.VESPER_CONTENT;
    state = state || (window.VESPER_ENGINE && VESPER_ENGINE.getState());
    var kicker = $('panel-kicker'), title = $('panel-title'), body = $('panel-body');
    body.innerHTML = '';

    if (type === 'inventory') {
      kicker.textContent = I18N.t('inventory');
      title.textContent = I18N.t('invTitle');
      var grid = document.createElement('div');
      grid.className = 'item-grid';
      var items = state ? state.inventory : [];
      if (!items.length) grid.appendChild(emptyNote(I18N.t('invEmpty')));
      items.forEach(function (id) {
        var item = content.items[id];
        if (!item) return;
        var card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = '<div class="item-icon">' + (item.icon || '◇') + '</div><div>' +
          '<div class="item-name">' + esc(I18N.tx(item.name)) + '</div>' +
          '<div class="item-desc">' + esc(I18N.tx(item.desc)) + '</div></div>';
        grid.appendChild(card);
      });
      body.appendChild(grid);
    } else if (type === 'codex') {
      kicker.textContent = I18N.t('codex');
      title.textContent = I18N.t('codexTitle');
      var list = document.createElement('div');
      list.className = 'clue-list';
      var found = state ? state.clues : [];
      if (!found.length) list.appendChild(emptyNote(I18N.t('codexEmpty')));
      found.forEach(function (id) {
        var clue = content.clues[id];
        if (!clue) return;
        var card = document.createElement('div');
        card.className = 'clue-card';
        card.innerHTML = '<div><div class="clue-name">' + esc(I18N.tx(clue.name)) + '</div>' +
          '<div class="clue-desc">' + esc(I18N.tx(clue.desc)) + '</div></div>';
        card.style.gridTemplateColumns = '1fr';
        list.appendChild(card);
      });
      body.appendChild(list);
    } else {
      kicker.textContent = I18N.t('credits');
      title.textContent = I18N.t('creditTitle');
      [['creditArt', 'creditAudio'], ['creditBuild']].forEach(function (group) {
        group.forEach(function (key) {
          var d = document.createElement('div');
          d.className = 'credit-block';
          d.innerHTML = '<b>◆</b> ' + esc(I18N.t(key));
          body.appendChild(d);
        });
      });
    }
    $('panel-modal').classList.remove('hidden');
  }

  function emptyNote(text) {
    var d = document.createElement('div');
    d.className = 'empty-note';
    d.textContent = text;
    return d;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* -------------------------------------------------------------- SETTINGS */
  function openSettings() { $('settings-modal').classList.remove('hidden'); syncSettings(); }

  function syncSettings(state) {
    state = state || (window.VESPER_ENGINE && VESPER_ENGINE.getState());
    setSeg('seg-lang', 'lang', I18N.lang);
    setSeg('seg-audio', 'audio', state && state.audioOn === false ? 'off' : 'on');
    setSeg('seg-captions', 'caps', captionEnabled ? 'on' : 'off');
    setSeg('seg-motion', 'motion', document.documentElement.getAttribute('data-motion') === 'off' ? 'off' : 'on');
    setSeg('seg-speed', 'speed', currentSpeedName);
    $('volume').value = Math.round((state ? state.volume : VESPER_AUDIO.volume) * 100);
  }

  var currentSpeedName = 'normal';
  function setSeg(id, attr, value) {
    var wrap = $(id);
    if (!wrap) return;
    wrap.querySelectorAll('.seg-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-' + attr) === value);
    });
  }
  function setSpeed(name) { currentSpeedName = SPEEDS[name] ? name : 'normal'; speed = SPEEDS[currentSpeedName]; }

  function setCaptions(on) { captionEnabled = !!on; }
  function getCaptions() { return captionEnabled; }

  /* --------------------------------------------------------------- ENDING */
  function showEnding(ending, state, content) {
    content = content || VESPER_CONTENT;
    stopTyping();
    $('ending-kicker').textContent = I18N.tx(ending.kicker);
    $('ending-title').textContent = I18N.tx(ending.title);
    var box = $('ending-text');
    box.innerHTML = '';
    var paras = I18N.tx(ending.text);
    if (!Array.isArray(paras)) paras = [paras];
    paras.forEach(function (p) {
      var el = document.createElement('p');
      el.textContent = p;
      box.appendChild(el);
    });
    $('ending-stats').innerHTML =
      '<span>' + I18N.t('statsClues') + ' <b>' + state.clues.length + '</b></span>' +
      '<span>' + I18N.t('statsDread') + ' <b>' + state.dread + '</b></span>' +
      '<span>' + I18N.t('statsEnding') + ' <b>' + esc(I18N.tx(ending.title)) + '</b></span>';
    $('game').classList.add('hidden');
    $('hud').classList.add('hidden');
    $('ending-screen').classList.remove('hidden');
    VESPER_AUDIO.playCue('ending');
  }

  /* ----------------------------------------------------------------- MISC */
  function caption(value) {
    if (!captionEnabled) return;
    var el = $('caption');
    el.textContent = '「 ' + I18N.tx(value) + ' 」';
    el.classList.add('show');
    if (captionTimer) clearTimeout(captionTimer);
    captionTimer = setTimeout(function () { el.classList.remove('show'); }, 3400);
    var flash = $('cue-flash');
    flash.classList.remove('fire');
    void flash.offsetWidth;
    flash.classList.add('fire');
  }

  function toast(key) {
    var el = $('toast');
    el.textContent = I18N.t(key);
    el.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function refreshLanguage() {
    applyStaticStrings();
    syncSettings();
  }

  return {
    init: init, showTitle: showTitle, hideTitle: hideTitle, updateHud: updateHud,
    renderScene: renderScene, openQuiz: openQuiz, quizResult: quizResult, closeQuiz: closeQuiz,
    openPanel: openPanel, closePanel: closePanel, openSettings: openSettings, closeSettings: closeSettings,
    syncSettings: syncSettings, showEnding: showEnding, caption: caption, toast: toast,
    refreshLanguage: refreshLanguage, setSpeed: setSpeed, setCaptions: setCaptions,
    getCaptions: function () { return captionEnabled; }, getSpeed: function () { return currentSpeedName; }
  };
})();
