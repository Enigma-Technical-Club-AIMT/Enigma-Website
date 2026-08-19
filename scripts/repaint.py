"""V5 color sweep: remap old V3/V4 hexes to the neon-horizon palette."""
import pathlib

ROOT = pathlib.Path('/home/ubuntu/Enigma-Website')
FILES = (list(ROOT.glob('components/*.jsx'))
         + list(ROOT.glob('app/**/*.jsx'))
         + [ROOT / 'app/globals.css'])

MAP = {
    # accent: gold -> electric blue (hover variants -> violet)
    '#d4a42a': '#2563eb',
    '#b08a20': '#2563eb',
    '#dfc05a': '#7c3aed',
    '#dfc363': '#7c3aed',
    '#e3b947': '#7c3aed',
    '#ecd074': '#a78bfa',
    # ink text on light: charcoal/ivory/navy -> slate-blue ink
    '#131210': '#16202f',
    '#1a1916': '#16202f',
    '#1c1b18': '#16202f',
    '#181e3c': '#16202f',
    # ivory paper text -> white
    '#f2efe6': '#f6f8fc',
    '#f7f3ec': '#ffffff',
    # old dark hover/card -> muted blue-grey hover
    '#1e1d1a': '#eef1f8',
    '#0c0c0c': '#0f172a',
    '#1a1a1a': '#1e293b',
    '#333': '#475569',
}

for path in FILES:
    src = path.read_text(encoding='utf-8')
    out = src
    for old, new in MAP.items():
        out = out.replace(old, new)
    if out != src:
        path.write_text(out, encoding='utf-8')
        print('updated', path.relative_to(ROOT))
