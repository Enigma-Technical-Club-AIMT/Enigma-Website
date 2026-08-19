"""Find the getEvents action id in the SSR RSC payload and call it directly."""
import requests
import re

BASE = 'http://localhost:3000'

r = requests.get(BASE + '/', timeout=30)
html = r.text

# In dev RSC, server actions appear as {"id":"<action-id>",...} entries in module maps.
ids = set(re.findall(r'"id":"([a-f0-9]{20,})"', html))
ids |= set(re.findall(r'"([a-f0-9]{20,})"', html))
ids = [i for i in ids if re.fullmatch(r'[a-f0-9]{20,}', i)]
print('found ids:', len(ids))

for aid in ids:
    body = json_body = '[]'
    try:
        resp = requests.post(
            BASE + '/',
            headers={
                'Content-Type': 'text/plain;charset=UTF-8',
                'next-action': aid,
                'x-action': aid,
                'Origin': BASE,
                'Host': 'localhost:3000',
            },
            data=body,
            timeout=30,
        )
        if resp.status_code == 200 and resp.text and '"AI' in resp.text[:200] or 'Machine Learning' in resp.text:
            print('MATCH:', aid, resp.text[:300])
            break
    except Exception as e:
        print(aid, 'ERR', e)
else:
    print('no matching action found among', ids[:10])
