"""POST to the server-action ids observed in browser and log the response bodies."""
import asyncio
from playwright.async_api import async_playwright

IDS = {
    '0096a25070941d764f62': 'getMembers?',
    '0072f87d69': 'unknown-2',
}

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 800})
        for aid, label in IDS.items():
            body = await pg.evaluate(f"""() => {{
                return new Promise((resolve, reject) => {{
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '/');
                    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
                    xhr.setRequestHeader('next-action', '{aid}');
                    xhr.setRequestHeader('x-action', '{aid}');
                    xhr.onload = () => resolve(xhr.status + '::' + xhr.responseText.slice(0, 400));
                    xhr.onerror = () => reject(new Error('xhr fail ' + xhr.status));
                    xhr.send('[]');
                }});
            }}""")
            print('===', aid[:12], label, len(body))
            print(body[:250])
            print()
        await b.close()

asyncio.run(main())
