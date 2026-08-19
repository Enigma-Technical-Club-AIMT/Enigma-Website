import asyncio
from playwright.async_api import async_playwright

PAGES = [
    ('home', '/'),
    ('explore', '/explore'),
    ('blog', '/blog'),
    ('blog-detail', '/blog/building-our-own-rag-system'),
    ('join', '/join'),
    ('leaderboard', '/leaderboard'),
    ('new-members', '/new-members'),
    ('resources', '/resources'),
    ('alumni', '/alumni'),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        for name, path in PAGES:
            try:
                await page.goto(f'http://localhost:3000{path}', wait_until='networkidle', timeout=60000)
                await page.wait_for_timeout(2000)
                await page.screenshot(path=f'screenshots/{name}.png', full_page=True)
                # scroll shot
                await page.evaluate('window.scrollTo(0, Math.min(document.body.scrollHeight, 1500))')
                await page.wait_for_timeout(500)
                await page.screenshot(path=f'screenshots/{name}_scroll.png')
                print(f'OK {name}')
            except Exception as e:
                print(f'FAIL {name}: {e}')
        await browser.close()

asyncio.run(main())
