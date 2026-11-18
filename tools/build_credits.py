"""Generate CREDITS.md from the asset source manifests."""
import json

with open("tools/audio_sources.json", encoding="utf-8") as f:
    audio = json.load(f)
with open("tools/image_sources.json", encoding="utf-8") as f:
    images = json.load(f)

out = []
out.append("# Credits & Sources\n")
out.append("All assets in this game are bundled locally. Nothing is downloaded at runtime.\n")
out.append("## Audio — recorded wave samples (no synthesis)\n")
out.append(
    "Every sound and music bed is a **real recorded audio sample** obtained from "
    "Freesound.org under the **Creative Commons 0 (CC0)** license (public-domain "
    "dedication). The files bundled here are the low-bitrate OGG previews served "
    "by Freesound's CDN. No oscillators, tone generators, or synthesizers were "
    "used anywhere in the app.\n"
)
out.append("| Key | Used for | Freesound | License |")
out.append("|-----|----------|-----------|---------|")
for a in sorted(audio, key=lambda x: x["key"]):
    out.append("| `%s` | %s | [#%s](%s) | CC0 |" %
               (a["key"], a["description"], a["freesound_id"], a["page"]))
out.append("")
out.append(
    "CC0 license reference: <https://creativecommons.org/publicdomain/zero/1.0/>\n"
)
out.append("## Imagery — public domain\n")
out.append(
    "All 21 scene images are **public-domain NASA imagery**, retrieved through "
    "the [NASA Image and Video Library](https://images.nasa.gov/) API "
    "(`images-api.nasa.gov`). NASA material is generally not protected by "
    "copyright (see [NASA media guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)). "
    "The included JPEGs are medium-resolution versions.",
)
out.append("| Scene | NASA title | Source |")
out.append("|-------|-----------|--------|")
for im in sorted(images, key=lambda x: x["scene"]):
    title = (im.get("nasa_title") or "").replace("|", "\\|").strip()
    out.append("| `%s` | %s | [image](%s) |" % (im["scene"], title, im["url"]))
out.append("")
out.append("## Build\n")
out.append(
    "The game itself is original work: HTML, CSS, and vanilla JavaScript with no "
    "frameworks, no external dependencies, and no network calls. Source-text "
    "imagery (nebulae, stations, antennas) is used purely as atmospheric backdrop "
    "and is recoloured in CSS to keep a consistent cinematic grade.\n"
)

with open("CREDITS.md", "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("Wrote CREDITS.md (%d audio, %d image sources)" % (len(audio), len(images)))
