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

  function sceneText(scene) {
    if (!scene) return '';
    var t = I18N.tx(scene.text);
    return Array.isArray(t) ? t.join('\n\n') : String(t || '');
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
    var history = (state.aiHistory || []).slice(-8).map(function (h) {
      return (h.role === 'user' ? 'PLAYER' : 'NARRATOR') + ': ' + h.text;
    }).join('\n');

    return [
      'Current location: ' + (scene ? (I18N.tx(scene.kicker) + ' — ' + I18N.tx(scene.title)) : 'Unknown'),
      'Scene description:\n' + sceneText(scene),
      'Dread (0-5): ' + (state.dread || 0),
      'Inventory:\n' + (inv.length ? inv.join('\n') : '(none)'),
      'Clues/patterns known:\n' + (clues.length ? clues.join('\n') : '(none)'),
      history ? ('Recent interaction:\n' + history) : ''
    ].filter(Boolean).join('\n\n');
  }

  function systemPrompt(lang) {
    var langName = lang === 'el' ? 'Greek (Ελληνικά)' : 'English';
    return [
      'You are the reactive narrator/game master for VESPER, a bilingual deep-space mystery text adventure.',
      'The player may ask questions or attempt free-form actions. Respond in-world, grounded in the current scene and known facts.',
      'Goals: be immersive, realistic, and responsive; answer questions about the surroundings, objects, sounds, logs, and implications when plausible; react to attempted actions with believable consequences.',
      'Do NOT spoil puzzle/quiz solutions outright or hand out answers. You may give subtle in-world hints if the player is stuck or asks for help.',
      'Do NOT grant items, clues, flags, or endings, and do NOT move the player to another scene. Actual progression happens via the game\'s choices/quizzes.',
      'If the player attempts something dangerous, impossible, or reckless, describe the outcome realistically and you may increase dread. If they act carefully or find comfort/insight, you may decrease dread.',
      'Keep replies concise but evocative (2-5 short paragraphs max). Stay consistent with established tone: eerie, intimate, sci-fi mystery.',
      'Respond in ' + langName + '.',
      '',
      'Return ONLY a single JSON object with this exact shape:',
      '{"reply":"<your in-world response>","dread_delta":0}',
      'Where dread_delta is an integer: -1, 0, or 1.'
    ].join('\n');
  }

  function extractJSON(text) {
    if (!text) return null;
    var m = text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try { return JSON.parse(m[0]); } catch (e) { return null; }
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
        if (contentText) return { reply: String(contentText).trim(), dread_delta: 0 };
        throw new Error('Empty response');
      }
      var dd = parseInt(parsed.dread_delta, 10);
      if (isNaN(dd) || dd < -1 || dd > 1) dd = 0;
      return { reply: parsed.reply, dread_delta: dd };
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