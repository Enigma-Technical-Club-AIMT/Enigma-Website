import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        pg.on('console', lambda m: print('[console]', m.type, m.text[:200]) if 'events' in m.text.lower() else None)
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(7000)
        txt = await pg.evaluate("""() => {
            const sec = document.querySelector('#events');
            return sec ? sec.innerText.substring(0, 600) : 'NO #events section';
        }""")
        print('---EVENTS SECTION---')
        print(txt)
        # also check the API route
        resp = await pg.evaluate("async () => { const r = await fetch('/api/events'); return { status: r.status, body: (await r.text()).substring(0, 300) } }")
        print('---/api/events---', resp)
        await b.close()

asyncio.run(main())
