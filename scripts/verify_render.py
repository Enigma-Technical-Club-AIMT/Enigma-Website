import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 900})
        await page.goto('http://localhost:3000/', wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(7000)  # longer than the 5s timeout fallback
        members = await page.query_selector('#members')
        events = await page.query_selector('#events')
        skills = await page.query_selector('#skills-courses')
        print('members section found:', members is not None)
        print('events section found:', events is not None)
        print('skills section found:', skills is not None)
        if members:
            text = await members.inner_text()
            print('members text head:', text[:200].replace('\n', ' | '))
        # Screenshot after timeout
        await page.evaluate('document.querySelector("#members")?.scrollIntoView()')
        await page.wait_for_timeout(800)
        await page.screenshot(path='screenshots/members_verify.png')
        print('OK')
        await browser.close()

asyncio.run(main())
