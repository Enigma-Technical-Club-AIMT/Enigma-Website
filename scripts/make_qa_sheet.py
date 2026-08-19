from PIL import Image, ImageDraw
import os

files = ['screenshots/home.png', 'screenshots/explore.png', 'screenshots/blog.png',
         'screenshots/blog-detail.png', 'screenshots/join.png', 'screenshots/leaderboard.png',
         'screenshots/new-members.png', 'screenshots/resources.png', 'screenshots/alumni.png']
imgs = []
W = 1000
for f in files:
    im = Image.open(f).convert('RGB')
    im = im.resize((W, int(im.height * W / im.width)))
    imgs.append((os.path.basename(f), im))


def make_sheet(items, out, cols=2, maxh=900):
    tiles = []
    for name, im in items:
        if im.height > maxh:
            im = im.resize((int(im.width * maxh / im.height), maxh))
        tiles.append((name, im))
    th = max(im.height for _, im in tiles) + 40
    tw = max(im.width for _, im in tiles)
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * tw + (cols + 1) * 10, rows * th + (rows + 1) * 10), (40, 40, 40))
    d = ImageDraw.Draw(sheet)
    for i, (name, im) in enumerate(tiles):
        r, c = divmod(i, cols)
        x = 10 + c * (tw + 10)
        y = 10 + r * (th + 10)
        d.text((x + 5, y + 5), name, fill=(200, 200, 200))
        sheet.paste(im, (x, y + 30))
    sheet.save(out)
    print(out, sheet.size)


make_sheet(imgs[:5], 'screenshots/qa_sheet1.png')
make_sheet(imgs[5:], 'screenshots/qa_sheet2.png')

# Contact sheet from top-of-page viewport crops (scroll screenshots)
PAGES = ['home_scroll', 'explore_scroll', 'new-members_scroll', 'blog_scroll',
         'leaderboard_scroll', 'resources_scroll', 'alumni_scroll', 'join_scroll']
W = 600
H = int(W * 800 / 1280)
tiles = []
for name in PAGES:
    p = os.path.join('screenshots', f'{name}.png')
    try:
        im = Image.open(p).convert('RGB').crop((0, 0, 1280, 800)).resize((W, H))
        tiles.append((name, im))
    except Exception as e:
        print('skip', name, e)
make_sheet(tiles, 'screenshots/v3_contact_sheet.png', cols=2, maxh=H)
