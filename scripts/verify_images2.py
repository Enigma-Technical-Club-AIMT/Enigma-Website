import asyncio
from playwright.async_api import async_playwright

JS = """
() => {
  const imgs = [...document.querySelectorAll('img')];
  const natural = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
  return { total: imgs.length, natural };
}
"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(6000)
        # scroll to members area to trigger lazy loading
        await pg.evaluate("window.scrollTo(0, 2400)")
        await pg.wait_for_timeout(3000)
        await pg.evaluate("window.scrollTo(0, 3300)")
        await pg.wait_for_timeout(3000)
        stat = await pg.evaluate(JS)
        print("home:", stat)
        await pg.screenshot(path='screenshots/v3_members_check.png', full_page=False)
        await b.close()

asyncio.run(main())
