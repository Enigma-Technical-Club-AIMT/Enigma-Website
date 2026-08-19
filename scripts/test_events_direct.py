"""Instrument console to capture the React flight response of getEvents by monkey-patching
the resolved action registry — simpler: hook Next.js server action invoker via performance entries."""
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        # Capture ALL fetch responses including server actions
        responses = []
        pg.on('response', lambda r: responses.append({'u': r.url, 's': r.status, 't': r.request.headers.get('next-action', '')[:10]}) if 'action' in r.url or 'next-action' in r.request.headers else None)
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(6000)
        print('fetches w/ next-action header:')
        for r in responses:
            print(r)
        # Now directly invoke getEvents via the action registry used by the page
        out = await pg.evaluate("""async () => {
            try {
                // find the bound server action function: look in the modules via window chunk
                const w = window;
                // Try to find __next_require__-style registry entries
                let keys = Object.keys(w).filter(k => k.startsWith('__next_') || k.startsWith('__ncc_'));
                return { keys: keys.slice(0, 20), nResponses: responses.length };
            } catch(e) { return { err: String(e) }; }
        }""")
        print(out)
        await b.close()

asyncio.run(main())
