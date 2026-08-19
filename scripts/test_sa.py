"""Call the getEvents server action over the HTTP server-actions endpoint."""
import asyncio
import requests

BASE = 'http://localhost:3000'

async def main():
    # Find the action id from the built page: look for NEXT_ACTION in the home html
    r = requests.get(BASE + '/', timeout=30)
    html = r.text
    # In Next dev, server actions are referenced as data chunks like "$L2" with module ids.
    # Easier: POST to / with the 'next-action' header containing the action id.
    # Extract action id by pattern NEXT_ACTION:<hex> or $S:action-id
    import re
    m = re.search(r'NEXT_ACTION:([a-f0-9]+)', html)
    ids = re.findall(r'"([^"]{20,})"', html)
    print('NEXT_ACTION found:', bool(m), m.group(1) if m else None)
    candidates = [i for i in set(ids) if re.fullmatch(r'[a-f0-9]{40}', i)]
    print('candidate action ids:', candidates[:10])

asyncio.run(main())
