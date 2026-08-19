import asyncio
from playwright.async_api import async_playwright

JS = """
async () => {
  const resp = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      'next-action': 'PLACEHOLDER',
      'x-action': 'PLACEHOLDER',
    },
  });
  return resp.status;
}
"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        # Instrument fetch to log getEvents result
        await pg.add_init_script("""
            window.__evLog = [];
            const origFetch = window.fetch;
            window.fetch = function(url, opts) {
                if (opts && typeof opts === 'object' && opts.headers && opts.headers['next-action']) {
                    const id = opts.headers['next-action'];
                    const resp = origFetch.call(this, url, opts);
                    resp.then(r => r.text()).then(t => {
                        window.__evLog.push({ id: id.slice(0, 20), status: true, body: t.slice(0, 400) });
                    }).catch(() => {});
                    return resp;
                }
                return origFetch.apply(this, arguments);
            };
        """)
        await pg.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await pg.wait_for_timeout(8000)
        log = await pg.evaluate('window.__evLog')
        for e in log[:8]:
            print(e)
        await b.close()

asyncio.run(main())
