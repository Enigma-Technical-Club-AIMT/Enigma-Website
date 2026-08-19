"""Call both observed server-action ids and dump payloads."""
import requests

BASE = 'http://localhost:3000'
IDS = ['0096a25070941d764f62', '0072f87d69']  # full second id may be longer; we'll find it

r = requests.get(BASE + '/', timeout=30)
import re
html = r.text
# find action ids pattern: Next.js puts "id":"<hex>" in chunk maps; try regex on raw
ids = set(re.findall(r'"id":"([a-f0-9]{10,})"', html))
print('html ids:', ids)
for aid in ids:
    resp = requests.post(BASE + '/', headers={
        'Content-Type': 'text/plain;charset=UTF-8',
        'next-action': aid, 'x-action': aid, 'Origin': BASE}, data='[]', timeout=30)
    print('---', aid[:12], resp.status_code)
    print(resp.text[:300])
