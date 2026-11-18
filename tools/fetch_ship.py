"""Fetch the one missing 'ship' ambient sample from Freesound CC0."""
import json
import re
import urllib.parse
import urllib.request

UA = {"User-Agent": "VesperGameBuilder/1.0 (educational game; local build)"}
QUERIES = [
    "engine hum",
    "machine room ambience",
    "air conditioning hum",
    "spaceship ambience",
    "low mechanical hum",
]
PREVIEW_RE = re.compile(r'https://cdn\.freesound\.org/previews/[^"\'\s<>]+?\.ogg')


def search(query):
    url = "https://freesound.org/search/?" + urllib.parse.urlencode({
        "q": query, "f": 'license:"Creative Commons 0"'
    })
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8", errors="ignore")


def main():
    for q in QUERIES:
        try:
            html = search(q)
        except Exception as e:
            print("search err (%s): %s" % (q, e))
            continue
        urls = []
        for u in PREVIEW_RE.findall(html):
            if u not in urls:
                urls.append(u)
        if not urls:
            print("no previews for", q)
            continue
        url = urls[0]
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=90) as r, open("assets/audio/ship.ogg", "wb") as f:
                n = f.write(r.read())
            print("OK ship from '%s': %d bytes (%s)" % (q, n, url))
            sid = re.search(r"/previews/\d+/(\d+)_", url)
            sid = sid.group(1) if sid else "unknown"
            with open("tools/audio_sources.json", encoding="utf-8") as f:
                credits = json.load(f)
            credits.append({
                "key": "ship", "file": "ship.ogg", "description": "Ship engine hum ambience",
                "freesound_id": sid, "page": "https://freesound.org/s/%s/" % sid,
                "license": "Creative Commons 0 (CC0)", "preview_url": url, "bytes": n
            })
            with open("tools/audio_sources.json", "w", encoding="utf-8") as f:
                json.dump(credits, f, indent=2, ensure_ascii=False)
            with open("js/audio_files.js", encoding="utf-8") as f:
                txt = f.read()
            txt = txt.replace('  "station": "station.ogg",', '  "ship": "ship.ogg",\n  "station": "station.ogg",')
            with open("js/audio_files.js", "w", encoding="utf-8") as f:
                f.write(txt)
            return
        except Exception as e:
            print("download err (%s): %s" % (q, e))
    print("FAILED to fetch ship sample")


if __name__ == "__main__":
    main()
