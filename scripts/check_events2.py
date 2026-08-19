import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        logs = []
        pg.on('console', lambda m: logs.append(f"[{m.type}] {m.text}") if 'event' in m.text.lower() or 'reading' in m.text.lower() else None)
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        # scroll to events area to verify what renders after longer settle
        await pg.evaluate("window.scrollTo(0, 4800)")
        await pg.wait_for_timeout(9000)
        cards = await pg.evaluate("document.querySelectorAll('#events [class*=border]').length")
        h3s = await pg.evaluate("""() => {
            const sec = document.querySelector('#events');
            return [...sec.querySelectorAll('h3')].map(h => h.innerText).slice(0, 10);
        }""")
        print('cards:', cards)
        print('h3s:', h3s)
        print('console events:', logs[:5])
        await b.close()

asyncio.run(main())
