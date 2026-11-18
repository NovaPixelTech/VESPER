# VESPER — The Last Transmission
### ΕΣΠΕΡΙΑ — Η Τελευταία Μετάδοση

A bilingual (English / Greek) deep-space mystery text adventure with cinematic
scene art, real recorded sound samples, deduction quizzes, an inventory and
codex, a dread meter, and three endings — one of them hidden.

You wake aboard a salvage ship that has drifted too far from everything human.
The crew is gone. A seven-tone signal repeats from a station that should not
exist — and it seems to know your name.

---

## Running the game

**Simplest:** double-click `index.html`. The game runs directly from `file://`
with no build step, no server, and no internet connection.

**Optional local server** (if your browser restricts local files):

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000
```

or any static file server. All assets are bundled locally — nothing is fetched
at runtime.

---

## Requirements

A modern browser with JavaScript enabled and HTML5 audio support
(Chrome, Firefox, Edge, Safari). Headphones are recommended for the layered
sound design and the sound captions.

---

## How to play

- Read the scene, then choose an action from the list on the right.
- Press **1–9** to choose an action quickly.
- Some actions are **locked** until you have found the right clues or items —
  explore the ship and the station, and read the Codex to see what you know.
- **Quizzes** test your deductions. A wrong answer can be retried, but it raises
  your dread. Correct answers can reveal clues, items, or story truths.
- Actions marked **DONE** are one-time and cannot be repeated.
- The **dread meter** in the top bar rises with risky choices and wrong answers.
  Keeping it low matters for the secret ending.
- Your progress saves automatically after every action. Use **Continue** on the
  title screen to resume.

### AI storyteller (optional)

VESPER can optionally use an AI narrator (bring your own OpenAI-compatible API
key) so you can **ask questions and try free-form actions** instead of only
selecting predefined options.

- Open **Settings (☰)** and enable **AI Storyteller**, then enter an API base
  URL (default: `https://api.openai.com/v1`), a model name, and your API key.
  The key is stored locally in your browser and only sent to the endpoint you
  configure.
- The AI reacts in-world to questions and custom actions (you can examine
  things, talk, experiment, etc.), is grounded in the current scene and your
  known facts, and may nudge dread up or down. It can also suggest follow-up
  actions, but it **does not solve puzzles or grant story progress/items/clues/endings**.
  Use the authored choices and quizzes to actually advance the plot.
- Because this is a static site, direct browser calls may be blocked by CORS on
  some providers. If that happens, use a CORS-friendly OpenAI-compatible
  endpoint or proxy (for example OpenRouter or a local/proxy endpoint you
  control).

### Other immersive features

- **Ship Log & Undo:** actions, discoveries, and AI exchanges are recorded in the
  log, and you can step back through recent choices to experiment.
- **Reactive atmosphere:** dread influences visuals and tension; revisiting
  locations and the meta-progression/ending tracker acknowledge that the loop
  remembers.

### Top-bar controls

| Button | Action |
|--------|--------|
| ✎ | Ship Log — a journal of arrivals, actions, discoveries, and AI exchanges |
| ✧ | Codex — clues and patterns you have recognised |
| ▣ | Inventory — items you are carrying |
| ↶ | Undo — step back through recent actions/choices |
| ♫ | Toggle sound on/off |
| EN / ΕΛ | Switch language instantly |
| ☰ | Settings |

### Settings

Language, sound, volume, sound captions, motion effects, and text speed can all
be adjusted. Settings and discovered endings persist across playthroughs.

---

## Content

- **3 acts**, **21 scenes**, **6 deduction quizzes**, **3 endings**
  (`Silent Drift`, `Becoming the Beacon`, and the hidden `The First Dawn`).
- Full English and Greek text for every scene, clue, item, quiz, and ending.
- Sound captions describe every audio cue for players who are deaf, hard of
  hearing, or playing with sound off.

---

## Project structure

```
index.html              App shell and all UI markup
css/theme.css           Design tokens, buttons, panels, modals
css/layout.css          Layout, HUD, choices, AI panel, responsive rules
css/animations.css      Keyframes and motion states
js/i18n.js              English/Greek strings and localized-value resolver
js/content.js           All story data: scenes, quizzes, items, clues, endings
js/engine.js            State machine, saves, requirements, effects, endings
js/ui.js                Rendering, typewriter, modals, captions, settings, AI log
js/ai.js                Optional BYOK AI storyteller (OpenAI-compatible)
js/audio.js             Sample playback layer (no synthesis)
js/scene.js             Cinematic background stage (crossfade, parallax, stars)
js/main.js              Bootstrap
js/images.js            Generated scene-image map
js/audio_files.js       Generated audio-sample map
assets/images/          Public-domain scene imagery (NASA)
assets/audio/           CC0 recorded samples (Freesound / public domain)
tools/                  Asset download helpers used during the build
CREDITS.md              Exact sources and licenses for all art and audio
```

---

## Credits

All imagery is public-domain NASA material. All audio is a real recorded wave
sample under CC0 or public-domain terms — **nothing is synthesized**. Exact
sources, authors, and license links are in **CREDITS.md**.
