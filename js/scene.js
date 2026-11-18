/* VESPER — cinematic background stage */
window.VESPER_SCENE = (function () {
  'use strict';

  var a, b, useA = true, stars, motion = true;

  function init() {
    a = document.getElementById('bg-a');
    b = document.getElementById('bg-b');
    stars = document.getElementById('stars');
    buildStars();
    window.addEventListener('pointermove', onPointer, { passive: true });
  }

  function buildStars() {
    if (!stars) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 90; i++) {
      var s = document.createElement('i');
      s.className = 'star';
      var size = Math.random() < .85 ? 1 : 2;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.setProperty('--tw', (2.5 + Math.random() * 6).toFixed(2) + 's');
      s.style.animationDelay = (-Math.random() * 6).toFixed(2) + 's';
      frag.appendChild(s);
    }
    stars.appendChild(frag);
  }

  function onPointer(e) {
    if (!motion) return;
    var x = (e.clientX / window.innerWidth - .5) * 18;
    var y = (e.clientY / window.innerHeight - .5) * 12;
    var active = useA ? a : b;
    if (!active) return;
    active.style.setProperty('--par-x', (-x).toFixed(1) + 'px');
    active.style.setProperty('--par-y', (-y).toFixed(1) + 'px');
  }

  function urlFor(id) {
    var map = window.VESPER_IMAGES || {};
    var file = map[id] || (id + '.jpg');
    return 'assets/images/' + file;
  }

  function set(id, instant) {
    var url = urlFor(id || 'title');
    var incoming = useA ? b : a;
    var outgoing = useA ? a : b;
    incoming.style.backgroundImage = 'url("' + url + '")';
    incoming.classList.add('active');
    if (instant || !outgoing.style.backgroundImage) {
      incoming.style.transition = 'none';
      incoming.style.opacity = 1;
      outgoing.style.opacity = 0;
      outgoing.classList.remove('active');
      // force reflow then restore transitions
      void incoming.offsetWidth;
      incoming.style.transition = '';
    } else {
      incoming.style.opacity = 1;
      outgoing.style.opacity = 0;
      outgoing.classList.remove('active');
    }
    useA = !useA;
  }

  function glitch() {
    if (!motion) return;
    var el = document.getElementById('game');
    if (!el) return;
    el.classList.remove('glitching');
    void el.offsetWidth;
    el.classList.add('glitching');
  }

  function setMotion(on) {
    motion = !!on;
    document.documentElement.setAttribute('data-motion', motion ? 'on' : 'off');
  }

  function setDread(level) {
    document.body.setAttribute('data-dread', String(level || 0));
  }

  return { init: init, set: set, glitch: glitch, setMotion: setMotion, setDread: setDread, urlFor: urlFor };
})();
