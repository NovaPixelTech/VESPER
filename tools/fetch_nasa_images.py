"""Download 21 public-domain scene images from NASA's image API.

For every scene we query images-api.nasa.gov, read the returned collection.json
and grab a medium-sized JPEG. All NASA imagery is public domain.
"""
import json
import os
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "VesperGameBuilder/1.0 (educational game; local build)"}
OUT = "assets/images"
API = "https://images-api.nasa.gov/search"

# (output base name, search query)
SCENES = [
    ("01_title",         "deep space nebula colorful"),
    ("02_waking",        "astronaut inside spacecraft"),
    ("03_bridge",        "mission control console"),
    ("04_medbay",        "space laboratory science experiment"),
    ("05_hydro",         "plant growth chamber greenhouse"),
    ("06_signal",        "radio telescope dish antenna"),
    ("07_airlock",       "space shuttle hatch airlock"),
    ("08_departure",     "space station earth orbit"),
    ("09_dock",          "international space station"),
    ("10_threshold",     "space station interior corridor"),
    ("11_observation",   "supernova remnant star explosion"),
    ("12_archive",       "voyager golden record"),
    ("13_xenolab",       "laboratory microscope science"),
    ("14_garden",        "greenhouse plants growth"),
    ("15_mirror",        "optical lens reflection light"),
    ("16_descent",       "spiral galaxy arms"),
    ("17_loop",          "tunnel corridor structure"),
    ("18_echo",          "dark nebula dust"),
    ("19_core_approach", "nebula glowing core"),
    ("20_core",          "black hole accretion disk"),
    ("21_memory",        "earth sunrise from space"),
]


def search(query):
    url = API + "?" + urllib.parse.urlencode({
        "q": query, "media_type": "image", "page_size": 6
    })
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def collection(href):
    req = urllib.request.Request(href, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def download(url, path):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
        return f.write(r.read())


def pick_jpg(links):
    for needle in ("~medium.jpg", "~small.jpg", "~orig.jpg"):
        for u in links:
            if needle in u.lower():
                return u.replace("http://", "https://")
    for u in links:
        if u.lower().endswith(".jpg") or ".jpg?" in u.lower():
            return u.replace("http://", "https://")
    return None


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    credits = []
    for name, query in SCENES:
        picked = None
        title = ""
        try:
            data = search(query)
            for item in data.get("collection", {}).get("items", []):
                href = item.get("href", "")
                rec = (item.get("data") or [{}])[0]
                if not href:
                    continue
                try:
                    links = collection(href)
                except Exception:
                    continue
                url = pick_jpg(links)
                if url:
                    picked = url
                    title = rec.get("title", "")
                    break
        except Exception as e:
            print("  search failed for %s: %s" % (name, e))
        if not picked:
            print("MISS %-18s (%s)" % (name, query))
            continue
        path = os.path.join(OUT, name + ".jpg")
        try:
            n = download(picked, path)
            if n < 5000:
                raise ValueError("too small: %d bytes" % n)
            manifest[name] = name + ".jpg"
            credits.append({"scene": name, "query": query, "nasa_title": title,
                            "url": picked, "bytes": n})
            print("OK   %-18s %6dKB  %s" % (name, n // 1024, (title or "")[:48]))
        except Exception as e:
            print("FAIL %-18s %s" % (name, e))
        time.sleep(0.35)

    # Title screen uses the 'title' key in scene.js
    if "01_title" in manifest:
        manifest["title"] = manifest["01_title"]

    with open("js/images.js", "w", encoding="utf-8") as f:
        f.write("/* Generated scene image map — NASA public-domain imagery. */\n")
        f.write("window.VESPER_IMAGES = " + json.dumps(manifest, indent=2, ensure_ascii=False) + ";\n")
    with open("tools/image_sources.json", "w", encoding="utf-8") as f:
        json.dump(credits, f, indent=2, ensure_ascii=False)
    print("\nDownloaded %d/%d images." % (len(manifest) - (1 if "title" in manifest else 0), len(SCENES)))


if __name__ == "__main__":
    main()
