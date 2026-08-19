import json, re

evs = json.load(open('data/events.json'))
for e in evs[:2]:
    print(json.dumps(e, indent=1))
    print('---')

def parseEventDate(dateString):
    cleanDate = re.sub(r'-[0-9]+', '', dateString)
    return __import__('datetime').datetime.strptime(cleanDate, '%B %d, %Y') if False else None

import datetime
for e in evs:
    clean = re.sub(r'-\d+', '', e['date'])
    try:
        d = datetime.datetime.strptime(clean, '%B %d, %Y')
        print(e['title'], '->', d)
    except Exception as ex:
        print(e['title'], 'PARSE FAIL:', clean, ex)
