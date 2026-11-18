/* VESPER — bootstrap */
(function () {
  'use strict';

  function boot() {
    VESPER_ENGINE.init();
    VESPER_SCENE.init();
    VESPER_SCENE.set('title', true);

    VESPER_UI.init({
      onNew: function () { VESPER_ENGINE.newGame(); },
      onContinue: function () { VESPER_ENGINE.continueGame(); },
      onTitle: function () { VESPER_ENGINE.toTitle(); },
      onLang: function (lang) { VESPER_ENGINE.setLanguage(lang); },
      onLangToggle: function () { VESPER_ENGINE.toggleLanguage(); },
      onAudio: function (on) { VESPER_ENGINE.setAudio(on); },
      onAudioToggle: function () { VESPER_ENGINE.toggleAudio(); },
      onVolume: function (v) { VESPER_ENGINE.setVolume(v); },
      onMotion: function (on) { VESPER_ENGINE.setMotion(on); },
      onCaptions: function (on) { VESPER_ENGINE.setCaptions(on); },
      onSpeed: function (name) { VESPER_ENGINE.setSpeed(name); },
      onChoice: function (choice) { VESPER_ENGINE.handleChoice(choice); },
      onAnswer: function (id, btn) { VESPER_ENGINE.handleAnswer(id, btn); }
    });

    VESPER_UI.showTitle(VESPER_ENGINE.hasSave());

    function firstGesture() {
      VESPER_AUDIO.unlock();
      VESPER_AUDIO.startMusic();
      document.removeEventListener('pointerdown', firstGesture);
      document.removeEventListener('keydown', firstGesture);
    }
    document.addEventListener('pointerdown', firstGesture);
    document.addEventListener('keydown', firstGesture);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
