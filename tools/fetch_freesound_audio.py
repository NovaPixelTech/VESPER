"""Download CC0 audio samples (real recorded wave files) from Freesound.

Freesound search pages expose low-quality OGG preview URLs in their HTML.
We filter searches to license:"Creative Commons 0" and grab the first preview
per target. Previews are genuine recorded samples — never synthesized.
"""
import json
import os
import re
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "VesperGameBuilder/1.0 (educational game; local build)"}
OUT = "assets/audio"

# key -> (search terms, human description for credits)
TARGETS = {
    "ship":        ("spacecraft engine room hum", "Low mechanical engine hum"),
    "station":     ("howling wind ambience", "Howling wind / station exterior"),
    "garden":      ("water bubbles underwater ambience", "Bubbling water / organic ambience"),
    "core":        ("deep low rumble drone", "Deep rumble / core resonance"),
    "tension":     ("dark ambient drone ominous", "Ominous sustained drone"),
    "music":       ("dark ambient piano atmospheric", "Atmospheric piano bed"),
    "creak":       ("metal creak rusty hinge", "Metal creaking"),
    "whisper":     ("whisper close voice", "Wordless whisper"),
    "glass_chime": ("glass bell chime single", "Brittle bell / chime"),
    "door":        ("metal door open heavy", "Heavy metal door"),
    "heartbeat":   ("heartbeat slow", "Slow heartbeat pulse"),
    "pulse":       ("radio static signal beep", "Signal static / pulse"),
    "glyph":       ("mechanical click typewriter", "Mechanical click / glyph unlock"),
    "ui":          ("soft click switch", "Soft UI click"),
    "ending":      ("gong bell toll deep", "Deep gong / ending stinger"),
}

PREVIEW_RE = re.compile(r'https://cdn\.freesound\.org/previews/[^"\'\s<>]+?\.ogg')


def search(query):
    url = "https://freesound.org/search/?" + urllib.parse.urlencode({
        "q": query, "f": 'license:"Creative Commons 0"'
    })
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8", errors="ignore")


def find_previews(html):
    seen = set()
    out = []
    for u in PREVIEW_RE.findall(html):
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def sound_id(url):
    m = re.search(r"/previews/\d+/(\d+)_", url)
    return m.group(1) if m else "unknown"


def download(url, path):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
        return f.write(r.read())


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    credits = []
    for key, (query, desc) in TARGETS.items():
        previews = []
        try:
            previews = find_previews(search(query))
        except Exception as e:
            print("  search failed for %s: %s" % (key, e))
        if not previews:
            print("MISS %-12s (no preview found)" % key)
            continue
        url = previews[0]
        path = os.path.join(OUT, key + ".ogg")
        try:
            n = download(url, path)
            if n < 3000:
                raise ValueError("too small: %d bytes" % n)
            manifest[key] = key + ".ogg"
            sid = sound_id(url)
            credits.append({
                "key": key, "file": key + ".ogg", "description": desc,
                "freesound_id": sid, "page": "https://freesound.org/s/%s/" % sid,
                "license": "Creative Commons 0 (CC0)", "preview_url": url,
                "bytes": n
            })
            print("OK   %-12s %6dKB  id=%s" % (key, n // 1024, sid))
        except Exception as e:
            print("FAIL %-12s %s" % (key, e))
        time.sleep(0.4)

    with open("js/audio_files.js", "w", encoding="utf-8") as f:
        f.write("/* Generated audio asset map — real CC0 samples from Freesound. */\n")
        f.write("window.VESPER_AUDIO_FILES = " + json.dumps(manifest, indent=2, ensure_ascii=False) + ";\n")
    with open("tools/audio_sources.json", "w", encoding="utf-8") as f:
        json.dump(credits, f, indent=2, ensure_ascii=False)
    print("\nDownloaded %d/%d samples." % (len(manifest), len(TARGETS)))


if __name__ == "__main__":
    main()
