"""Re-fetch selected scene images with better search terms."""
import json
import os
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "VesperGameBuilder/1.0 (educational game; local build)"}
OUT = "assets/images"
API = "https://images-api.nasa.gov/search"

FIXES = {
    "01_title":      ["pillars of creation nebula", "carina nebula", "deep field galaxies"],
    "04_medbay":     ["space shuttle crew cabin interior", "skylab interior", "spacecraft laboratory module"],
    "05_hydro":      ["plant growth experiment space", "hydroponics", "plants growing greenhouse"],
    "06_signal":     ["deep space network antenna", "radio telescope", "satellite dish antenna"],
    "10_threshold":  ["ISS interior module", "space station interior", "spacecraft crew cabin"],
    "17_loop":       ["spacecraft tunnel", " ISS corridor module", "airlock tunnel structure"],
}


def get_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def pick_jpg(links):
    for needle in ("~medium.jpg", "~small.jpg", "~orig.jpg"):
        for u in links:
            if needle in u.lower():
                return u.replace("http://", "https://")
    return None


def download(url, path):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
        return f.write(r.read())


def main():
    sources_path = "tools/image_sources.json"
    credits = []
    if os.path.exists(sources_path):
        with open(sources_path, encoding="utf-8") as f:
            credits = json.load(f)

    for name, queries in FIXES.items():
        picked, title = None, ""
        for q in queries:
            try:
                data = get_json(API + "?" + urllib.parse.urlencode({
                    "q": q, "media_type": "image", "page_size": 8
                }))
            except Exception as e:
                print("  search err %s (%s): %s" % (name, q, e))
                continue
            for item in data.get("collection", {}).get("items", []):
                href = item.get("href", "")
                if not href:
                    continue
                try:
                    links = get_json(href)
                except Exception:
                    continue
                url = pick_jpg(links)
                if url:
                    picked = url
                    title = (item.get("data") or [{}])[0].get("title", "")
                    break
            if picked:
                break
        if not picked:
            print("STILL MISS %s" % name)
            continue
        path = os.path.join(OUT, name + ".jpg")
        try:
            n = download(picked, path)
            print("OK   %-18s %6dKB  %s" % (name, n // 1024, title[:55]))
            credits = [c for c in credits if c.get("scene") != name]
            credits.append({"scene": name, "query": queries[0], "nasa_title": title,
                            "url": picked, "bytes": n})
        except Exception as e:
            print("FAIL %s: %s" % (name, e))
        time.sleep(0.35)

    with open(sources_path, "w", encoding="utf-8") as f:
        json.dump(credits, f, indent=2, ensure_ascii=False)

    # Rebuild images.js from directory
    manifest = {}
    for f in sorted(os.listdir(OUT)):
        if f.lower().endswith(".jpg"):
            manifest[f[:-4]] = f
    if "01_title" in manifest:
        manifest["title"] = manifest["01_title"]
    with open("js/images.js", "w", encoding="utf-8") as f:
        f.write("/* Generated scene image map — NASA public-domain imagery. */\n")
        f.write("window.VESPER_IMAGES = " + json.dumps(manifest, indent=2, ensure_ascii=False) + ";\n")
    print("\nTotal images now: %d" % (len(manifest) - (1 if "title" in manifest else 0)))


if __name__ == "__main__":
    main()
