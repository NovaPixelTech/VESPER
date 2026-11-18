/* VESPER — AI storyteller / free-form action layer (BYOK, OpenAI-compatible) */
window.VESPER_AI = (function () {
  'use strict';

  var KEY = 'vesper_ai_v1';
  var settings = {
    enabled: false,
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    apiKey: ''
  };

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && typeof saved === 'object') {
        if (typeof saved.enabled === 'boolean') settings.enabled = saved.enabled;
        if (typeof saved.baseUrl === 'string' && saved.baseUrl) settings.baseUrl = saved.baseUrl;
        if (typeof saved.model === 'string' && saved.model) settings.model = saved.model;
        if (typeof saved.apiKey === 'string') settings.apiKey = saved.apiKey;
      }
    } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch (e) {}
  }
  load();

  function getSettings() { return settings; }
  function setSettings(next) {
    if (!next) return;
    if (typeof next.enabled === 'boolean') settings.enabled = next.enabled;
    if (typeof next.baseUrl === 'string') settings.baseUrl = next.baseUrl.replace(/\/+$/, '');
    if (typeof next.model === 'string') settings.model = next.model;
    if (typeof next.apiKey === 'string') settings.apiKey = next.apiKey;
    save();
  }
  function isReady() { return settings.enabled && !!settings.apiKey && !!settings.baseUrl && !!settings.model; }

  var DETAILS = {
    wake: 'Frosted silver corridor on the salvage ship Kestrel. Emergency lights blink slowly. Your suit is intact but helmet recorder stopped mid-word 6 hours ago. Bunks are empty; no blood or struggle. A low seven-tone signal repeats every 11 seconds from somewhere ahead. Exits lead toward the bridge and medical bay.',
    bridge: 'Kestrel command deck. A cup of coffee is frozen mid-surface. All stations dark except comms: a staircase of intervals climbs and collapses (1,1,5,1,3,5,8) with a note "the last interval always returns to the first". Cracked viewport shows the Shade and a thin amber point/structure that should not exist. Flight recorder/datapad may be accessible.',
    medbay: 'Medical bay gurneys show shallow impressions of bodies but no one present. Pale crystalline growth on the wall brightens half a second before each signal repeat. Crew manifest lists six names all marked PRESENT, repeated eleven times in eleven different handwritings.',
    hydroponics: 'Dead grow lights but living grey-green plants with identical ring patterns in stems: eleven growth/death cycles logged, handwriting changes each time and the final entry is yours. Pale spores drift and react to your light.',
    signal: 'Comms array tuned to the repeating signal: seven intervals, a staircase that falls back to its first step. Feels like someone is patiently waiting for you to understand.',
    airlock: 'Forward airlock sealed from inside though Kestrel docked with nothing for 41 days. Maintenance plate shows three override symbols but order scratched away in your own handwriting. Beyond window the amber point is now an impossible unfolding structure (Vesper).',
    departure: 'Autopilot drifts Kestrel toward Vesper Station: black struts and pale membranes. No lights or docking collar, yet an opening forms shaped exactly like your airlock. A second quiet layer like breathing underlies the signal.',
    dock: 'Inside Vesper outer hull: no seam, walls like bone and glass. Kestrel recedes behind. Corridor bends impossibly. A line of light travels the wall, pauses, and pauses again when it reaches you.',
    threshold: 'The Cartographer: light writes a map of the corridor with a mark at your position; the mark moves ahead, turns a corner, and waits. Feels composed/sketched rather than watched.',
    observation: 'Observation window of coloured glass shows a star exploding repeatedly, each time closer and more face-like. The Shade hangs motionless; Vesper does not orbit it. A doorway beyond bears unreadable glyphs.',
    archive: 'Records hang like frozen smoke showing crew in ordinary moments, each marked with glyphs (remember, forget, between). Some "between" scenes show six people in a room meant for seven. A locked record and hints of translation tools/lens exist.',
    xenolab: 'Cold lab of six tanks with human-like shapes; seven faces total, the seventh turned away wearing your expression. A sealed memory cartridge labeled DO NOT PLAY in your handwriting rests on a tray.',
    garden: 'Warm garden of vines/flowers that open like eyes and close when looked at. Signal arrives after light pulses (reversed from Kestrel). Vines tighten at a gap deeper in, repeatedly forming the shape of a vial as a request.',
    mirror: 'No mirror yet you see yourself from every angle; reflection lags as if consulting notes. The Cartographer projects four statements about 03:14 and the signal/boarding to test if you perceive the loop\'s shape.',
    descent: 'Spiral stair cut from pale medbay-like mineral, walls hum with the seventh tone. Footprints appear above you leading down. No way back to the Kestrel.',
    loop: 'Repeating corridor with the same crack at the same height. Marks you make persist across passes, proving the loop.',
    echo: 'A voice ahead speaks your name in your own voice, seconds before you would say it, explaining to the dark; it knows the end.',
    core_approach: 'A rotating mineral ring seals the core chamber; a blank digit awaits. Past answers linger. The harmonic key relates to the signal/crew/garden counts.',
    core: 'No machine: six crew figures and a seventh space stand in a circle. The signal is a rehearsal, not a distress call. Transmission log shows first transmission 03:14 sent from the Kestrel; the station learned to send first.',
    memory: 'The seventh space holds the shape of your choice: noticing a faint interval in static and turning the receiver toward the dark. Vesper rehearsed your curiosity back for eleven loops.',
    verdict: 'The circle opens and the signal gathers for a twelfth transmission. Choices: destroy the beacon, merge/become the seventh voice, or send the true memory back to the beginning (hidden path requiring full understanding and low dread).'
  };

  function sceneText(scene) {
    if (!scene) return '';
    var t = I18N.tx(scene.text);
    return Array.isArray(t) ? t.join('\n\n') : String(t || '');
  }
  function sceneDetails(scene, sceneId) {
    var fromScene = '';
    if (scene && scene.details) {
      var d = I18N.tx(scene.details);
      fromScene = Array.isArray(d) ? d.join('\n') : String(d || '');
    }
    var fallback = (sceneId && DETAILS[sceneId]) ? DETAILS[sceneId] : '';
    if (fromScene && fallback) return fromScene + '\n' + fallback;
    return fromScene || fallback || '';
  }

  function buildContext(state, scene, content, lang) {
    var inv = (state.inventory || []).map(function (id) {
      var it = content.items[id];
      return it ? ('- ' + I18N.tx(it.name) + ': ' + I18N.tx(it.desc)) : null;
    }).filter(Boolean);
    var clues = (state.clues || []).map(function (id) {
      var c = content.clues[id];
      return c ? ('- ' + I18N.tx(c.name) + ': ' + I18N.tx(c.desc)) : null;
    }).filter(Boolean);
    var journal = (state.journal || []).slice(-6).map(function (j) {
      return '- ' + (j.text || '');
    }).filter(Boolean);
    var history = (state.aiHistory || []).slice(-6).map(function (h) {
      return (h.role === 'user' ? 'PLAYER' : 'NARRATOR') + ': ' + h.text;
    }).join('\n');
    var actions = scene && scene.choices ? scene.choices.filter(function (ch) {
      // show non-hidden authored actions as reference
      return ch && ch.label;
    }).map(function (ch) {
      var label = I18N.tx(ch.label);
      var tags = [];
      if (ch.quiz) tags.push('puzzle/quiz');
      if (ch.ending) tags.push('ending choice');
      return '- ' + label + (tags.length ? ' [' + tags.join(', ') + ']' : '');
    }) : [];
    var visits = state.visitCounts && scene ? (state.visitCounts[state.sceneId] || 0) : 0;
    var details = sceneDetails(scene, state.sceneId);

    return [
      'Current location: ' + (scene ? (I18N.tx(scene.kicker) + ' — ' + I18N.tx(scene.title)) : 'Unknown') + (visits > 1 ? ' (visited ' + visits + ' times)' : ''),
      'Scene description:\n' + sceneText(scene),
      details ? ('Notable details and facts (ground your answers in these):\n' + details) : '',
      actions.length ? ('Authored actions available here (do not solve or force them):\n' + actions.join('\n')) : '',
      'Dread (0-5): ' + (state.dread || 0),
      'Inventory:\n' + (inv.length ? inv.join('\n') : '(none)'),
      'Clues/patterns known:\n' + (clues.length ? clues.join('\n') : '(none)'),
      journal.length ? ('Recent log entries:\n' + journal.join('\n')) : '',
      history ? ('Recent interaction:\n' + history) : ''
    ].filter(Boolean).join('\n\n');
  }

  function systemPrompt(lang) {
    var langName = lang === 'el' ? 'Greek (Ελληνικά)' : 'English';
    return [
      'You are the reactive narrator/game master for VESPER, a bilingual deep-space mystery text adventure.',
      'The player may ask questions or attempt free-form actions. Respond in-world, grounded in the current scene, notable details, and known facts/state.',
      'Goals: be immersive, realistic, and responsive; answer questions about surroundings, objects, sounds, logs, atmosphere, and implications when plausible; react to attempted actions with believable consequences.',
      'Do NOT spoil puzzle/quiz solutions or reveal correct answers. Do NOT hand out codes, sequences, or deductions. If the player is stuck or asks for help, give only subtle in-world hints or point their attention to things already present.',
      'Do NOT grant items, clues, flags, or endings, and do NOT move the player to another scene. Actual progression happens via the game\'s authored choices/quizzes.',
      'If the player attempts something dangerous, impossible, or reckless, describe the outcome realistically and you may increase dread. If they act carefully, observe, or find comfort/insight, you may decrease dread.',
      'Keep replies concise but evocative (1-4 short paragraphs). Stay consistent with established tone: eerie, intimate, sci-fi mystery.',
      'Also suggest 1-3 short, natural follow-up actions or questions the player could try next (in-world, non-spoiling, not solutions).',
      'Respond in ' + langName + '.',
      '',
      'Return ONLY a single JSON object with this exact shape:',
      '{"reply":"<your in-world response>","dread_delta":0,"suggestions":["<suggestion 1>","<suggestion 2>"]}',
      'Where dread_delta is an integer: -1, 0, or 1. suggestions must be an array of 0-3 short strings in ' + langName + '.'
    ].join('\n');
  }

  function extractJSON(text) {
    if (!text) return null;
    var m = text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try { return JSON.parse(m[0]); } catch (e) { return null; }
  }

  function normalizeSuggestions(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(function (s) { return String(s || '').trim(); }).filter(Boolean).slice(0, 3);
  }

  function ask(playerText, state, scene, content) {
    if (!isReady()) return Promise.resolve({ error: 'not_configured' });
    var lang = I18N.lang || 'en';
    var body = {
      model: settings.model,
      temperature: 0.8,
      messages: [
        { role: 'system', content: systemPrompt(lang) },
        { role: 'user', content: buildContext(state, scene, content, lang) + '\n\nPLAYER ACTION/QUESTION:\n' + playerText }
      ]
    };
    var url = settings.baseUrl.replace(/\/+$/, '') + '/chat/completions';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + settings.apiKey
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().catch(function () { return ''; }).then(function (t) {
          throw new Error('HTTP ' + res.status + (t ? ': ' + t.slice(0, 200) : ''));
        });
      }
      return res.json();
    }).then(function (data) {
      var contentText = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      var parsed = extractJSON(contentText || '');
      if (!parsed || typeof parsed.reply !== 'string') {
        // fallback: treat whole message as reply
        if (contentText) return { reply: String(contentText).trim(), dread_delta: 0, suggestions: [] };
        throw new Error('Empty response');
      }
      var dd = parseInt(parsed.dread_delta, 10);
      if (isNaN(dd) || dd < -1 || dd > 1) dd = 0;
      return { reply: parsed.reply, dread_delta: dd, suggestions: normalizeSuggestions(parsed.suggestions) };
    }).catch(function (err) {
      return { error: (err && err.message) ? err.message : 'Request failed' };
    });
  }

  return {
    getSettings: getSettings,
    setSettings: setSettings,
    isReady: isReady,
    ask: ask
  };
})();