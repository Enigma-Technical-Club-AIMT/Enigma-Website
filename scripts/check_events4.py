import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        await pg.add_init_script("""
            window.__calls = [];
            const orig = window.fetch;
            window.fetch = function(url, opts) {
                if (opts && opts.headers && opts.headers['next-action']) {
                    const id = opts.headers['next-action'];
                    const r = orig.call(this, url, opts);
                    r.then(res => res.text()).then(t => {
                        window.__calls.push({ id: id.slice(0, 8), len: t.length, head: t.slice(0, 120) });
                    }).catch(e => window.__calls.push({ id: id.slice(0, 8), err: String(e) }));
                    return r;
                }
                return orig.apply(this, arguments);
            };
        """)
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.evaluate("window.scrollTo(0, 4700)")
        await pg.wait_for_timeout(9000)
        calls = await pg.evaluate('window.__calls')
        for c in calls:
            print(c)
        await b.close()

asyncio.run(main())
