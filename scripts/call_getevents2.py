"""Find action ids in the RSC flight stream (not just HTML) and call getEvents."""
import requests

BASE = 'http://localhost:3000'

# Request RSC flight format
r = requests.get(
    BASE + '/',
    headers={'RSC': '1', 'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22%22%2C%7B%22children%22%3A%5B%22%22%2C%22__PAGE__%22%2C%7B%7D%5D%7D%2C%22%24%22%5D%7D%2C%22%24%22%5D'},
    timeout=30,
)
body = r.text
import re
ids = set(re.findall(r'"id":"([a-f0-9]{20,})"', body))
print('ids:', ids)
for aid in ids:
    resp = requests.post(
        BASE + '/',
        headers={
            'RSC': '1',
            'Content-Type': 'text/plain;charset=UTF-8',
            'next-action': aid,
            'x-action': aid,
            'Origin': BASE,
        },
        data='[]',
        timeout=30,
    )
    print(aid[:8], resp.status_code, resp.text[:150])
