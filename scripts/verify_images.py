import asyncio
from playwright.async_api import async_playwright

JS = """
() => {
  const imgs = [...document.querySelectorAll('img')];
  const bad = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src || i.getAttribute('src'));
  const natural = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
  return { total: imgs.length, natural, broken: bad.slice(0, 20) };
}
"""

async def check(page, url, label):
    await page.goto(url, wait_until='networkidle', timeout=60000)
    await page.wait_for_timeout(4500)
    stat = await page.evaluate(JS)
    print(f"{label}: {stat['natural']}/{stat['total']} loaded; broken={stat['broken']}")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await check(pg, 'http://localhost:3000/', 'home (members+leadership)')
        await check(pg, 'http://localhost:3000/members', 'members page' if False else 'alumni page? (skip)')
        await b.close()

asyncio.run(main())
