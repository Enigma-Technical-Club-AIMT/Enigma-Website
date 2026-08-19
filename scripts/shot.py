"""Screenshot helper: goto, settle, optional scroll-to-element, screenshot.

Usage: python3 scripts/shot.py <out_path> [selector]
"""
import asyncio, sys
from playwright.async_api import async_playwright

async def main():
    out = sys.argv[1]
    sel = sys.argv[2] if len(sys.argv) > 2 else None
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(3500)
        if sel:
            await pg.evaluate(f"document.querySelector('{sel}').scrollIntoView()")
            await pg.wait_for_timeout(1500)
        else:
            await pg.evaluate("window.scrollTo(0, 0)")
            await pg.wait_for_timeout(2000)
        await pg.screenshot(path=out)
        await b.close()

asyncio.run(main())
