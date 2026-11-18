/* VESPER — sample playback layer.
   Every file is a recorded wave sample. No oscillators and no synthesis. */
window.VESPER_AUDIO = (function () {
  'use strict';

  var FILES = window.VESPER_AUDIO_FILES || {};
  function file(key) { return FILES[key] ? 'assets/audio/' + FILES[key] : 'assets/audio/__missing__'; }

  var BEDS = {
    ship:    { file: file('ship'),    volume: 0.42 },
    station: { file: file('station'), volume: 0.40 },
    garden:  { file: file('garden'),  volume: 0.36 },
    core:    { file: file('core'),    volume: 0.46 }
  };

  var CUES = {
    creak:       { file: file('creak'),       cap: { en: 'Metal contracts somewhere in the dark.', el: 'Μέταλλο συστέλλεται κάπου στο σκοτάδι.' } },
    whisper:     { file: file('whisper'),     cap: { en: 'A whisper with no words, very close.', el: 'Ένας ψίθυρος χωρίς λέξεις, πολύ κοντά.' } },
    glass_chime: { file: file('glass_chime'), cap: { en: 'Something brittle rings once.', el: 'Κάτι εύθραυστο ηχεί μία φορά.' } },
    door:        { file: file('door'),        cap: { en: 'A heavy seal gives way.', el: 'Μια βαριά σφραγίδα υποχωρεί.' } },
    heartbeat:   { file: file('heartbeat'),   cap: { en: 'A slow pulse, not quite your own.', el: 'Ένας αργός παλμός, όχι εντελώς δικός σας.' } },
    pulse:       { file: file('pulse'),       cap: { en: 'Seven tones repeat in the static.', el: 'Επτά τόνοι επαναλαμβάνονται στον θόρυβο.' } },
    glyph:       { file: file('glyph'),       cap: { en: 'A pattern clicks into place.', el: 'Ένα μοτίβο μπαίνει στη θέση του.' } },
    ui:          { file: file('ui'),          cap: null, volume: 0.22 },
    ending:      { file: file('ending'),      cap: null, volume: 0.5 }
  };

  var TENSION_FILE = file('tension');
  var MUSIC_FILE   = file('music');

  var enabled = true;
  var volume = 0.7;
  var unlocked = false;
  var currentBed = null;
  var bedEls = {};
  var tensionEl = null;
  var musicEl = null;
  var missing = {};
  var captionHandler = null;
  var fadeTimers = {};

  function makeEl(file, loop) {
    var a = new Audio(file);
    a.loop = !!loop;
    a.preload = 'auto';
    a.volume = 0;
    a.addEventListener('error', function () { missing[file] = true; });
    return a;
  }

  function effVol(base) { return Math.max(0, Math.min(1, base * volume)); }

  function fade(el, to, ms, onDone) {
    if (!el) return;
    var from = el.volume;
    var start = Date.now();
    if (fadeTimers[el.src]) clearInterval(fadeTimers[el.src]);
    el.volume = from;
    if (ms <= 0) { el.volume = to; if (onDone) onDone(); return; }
    var id = setInterval(function () {
      var p = Math.min(1, (Date.now() - start) / ms);
      el.volume = from + (to - from) * p;
      if (p >= 1) {
        clearInterval(id);
        delete fadeTimers[el.src];
        if (onDone) onDone();
      }
    }, 40);
    fadeTimers[el.src] = id;
  }

  function playSafe(el) {
    if (!el || missing[el.src]) return;
    try {
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  function ensureBed(name) {
    if (!bedEls[name]) bedEls[name] = makeEl(BEDS[name].file, true);
    return bedEls[name];
  }

  function unlock() {
    if (unlocked || !enabled) return;
    unlocked = true;
    if (currentBed) {
      var el = ensureBed(currentBed);
      el.volume = 0;
      playSafe(el);
      fade(el, effVol(BEDS[currentBed].volume), 1800);
    }
    if (tensionEl) playSafe(tensionEl);
    if (musicEl) playSafe(musicEl);
  }

  function setBed(name) {
    if (!BEDS[name]) return;
    if (currentBed === name) return;
    var old = currentBed ? bedEls[currentBed] : null;
    var next = ensureBed(name);
    currentBed = name;
    if (!unlocked) return;
    playSafe(next);
    fade(next, effVol(BEDS[name].volume), 1400);
    if (old) fade(old, 0, 1400, function () { try { old.pause(); } catch (e) {} });
  }

  function playCue(name) {
    var cue = CUES[name];
    if (!cue) return;
    if (captionHandler && cue.cap) captionHandler(cue.cap);
    if (!enabled || !unlocked || missing[cue.file]) return;
    var a = new Audio(cue.file);
    a.volume = effVol(cue.volume || 0.55);
    var p = a.play();
    if (p && p.catch) p.catch(function () {});
  }

  function setDread(level) {
    if (!unlocked || !enabled) return;
    if (!tensionEl) tensionEl = makeEl(TENSION_FILE, true);
    var target = Math.max(0, Math.min(1, (level - 1) / 5)) * 0.5 * volume;
    if (level >= 1) playSafe(tensionEl);
    fade(tensionEl, target, 1200);
    if (musicEl) fade(musicEl, effVol(Math.max(0.06, 0.24 - level * 0.03)), 1200);
  }

  function startMusic() {
    if (!unlocked || !enabled || musicEl) return;
    musicEl = makeEl(MUSIC_FILE, true);
    musicEl.volume = 0;
    playSafe(musicEl);
    fade(musicEl, effVol(0.24), 3000);
  }

  function setEnabled(on) {
    enabled = !!on;
    if (!enabled) {
      Object.keys(bedEls).forEach(function (k) { fade(bedEls[k], 0, 350); });
      if (tensionEl) fade(tensionEl, 0, 350);
      if (musicEl) fade(musicEl, 0, 350);
    } else if (unlocked) {
      if (currentBed && bedEls[currentBed]) fade(bedEls[currentBed], effVol(BEDS[currentBed].volume), 600);
      startMusic();
    }
    return enabled;
  }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    if (!unlocked) return;
    if (currentBed && bedEls[currentBed]) bedEls[currentBed].volume = effVol(BEDS[currentBed].volume);
    if (musicEl) musicEl.volume = effVol(0.24);
  }

  function setCaptionHandler(fn) { captionHandler = fn; }
  function isEnabled() { return enabled; }

  return {
    unlock: unlock, setBed: setBed, playCue: playCue, setDread: setDread,
    startMusic: startMusic, setEnabled: setEnabled, setVolume: setVolume,
    setCaptionHandler: setCaptionHandler, isEnabled: isEnabled,
    get volume() { return volume; }
  };
})();
