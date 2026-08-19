from playwright.sync_api import sync_playwright
import os, time

OUT = "/home/ubuntu/Enigma-Website/screenshots"
os.makedirs(OUT, exist_ok=True)
pages = [
    ("/", "home_scroll"),
    ("/explore", "explore_scroll"),
    ("/resources", "resources_scroll"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    for path, name in pages:
        try:
            page.goto(f"http://localhost:3000{path}", wait_until="networkidle", timeout=60000)
            time.sleep(2)
            height = page.evaluate("document.body.scrollHeight")
            shots = []
            step = 800
            y = 0
            while y < height:
                page.evaluate(f"window.scrollTo(0, {y})")
                time.sleep(0.4)
                page.screenshot(path=f"{OUT}/{name}_{y}.png")
                shots.append(y)
                y += step
            print(f"OK {name} height={height} shots={shots}")
        except Exception as e:
            print(f"ERR {name}: {e}")
    browser.close()
