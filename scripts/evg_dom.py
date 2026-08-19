import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        for t in [1000, 2500, 4000, 6000, 8000, 10000]:
            await pg.wait_for_timeout(1500)
            cnt = await pg.evaluate("""() => {
                const sec = document.querySelector('#events');
                if (!sec) return 'no #events';
                const cards = sec.querySelectorAll('[class*=border]').length;
                const noEvents = sec.innerText.includes('No Events Found');
                const h3s = [...sec.querySelectorAll('h3')].map(h => h.innerText);
                return { cards, noEvents, h3s };
            }""")
            print(f't={t}ms', cnt)
        await b.close()

asyncio.run(main())
