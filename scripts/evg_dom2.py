import json
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(8000)
        # poll for ANY of the real event titles anywhere in body
        titles = ['AI & Machine Learning Workshop', 'Annual Hackathon 2026', 'Web Development Bootcamp']
        found = await pg.evaluate(f"""() => {{
            return {json.dumps(titles)}.map(t => document.body.innerText.includes(t));
        }}""")
        print('titles found:', dict(zip(titles, found)))
        # check event cards with real titles in h3/h4
        evH = await pg.evaluate("""() => {
            const all = [...document.querySelectorAll('h1,h2,h3,h4,p')].map(e => e.innerText).filter(t => /workshop|hackathon|bootcamp/i.test(t));
            return all.slice(0, 10);
        }""")
        print('matched texts:', evH)
        await b.close()

asyncio.run(main())
