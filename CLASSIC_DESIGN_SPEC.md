# Enigma Classic Redesign — Design System Specification

Reference DNA (offline.club, gdgcloudnd, build.inc, dribbble AI shot):
editorial minimalism, huge thin display headlines, letter-spaced uppercase
eyebrows, flat alternating sections, one restrained accent, hairline dividers,
photographic hero with dark overlay, subtle restrained motion.

## Palette (charcoal + warm ivory + single gold accent)
- background:        #0c0b0a  (deep charcoal, warm black)
- surface/card:      #151412
- ivory (light section bg): #f7f3ec
- text on dark:      #edeae3  (warm off-white)
- muted:             #a8a296
- accent (gold):     #c9a227 / hover #dfc05a
- hairline:          rgba(255,255,255,0.12)
- hairline on light: rgba(0,0,0,0.12)
- Remove: purple/cyan/violet palette, gradient borders, glow shadows, noise.

## Typography
- display: "Instrument Serif" (italic accent words) — from Google Fonts, gives classic editorial look.
- body/headings sans: "Archivo" (400/500/600) — refined grotesque.
- mono accent (eyebrows only): "IBM Plex Mono" 11-12px, letter-spacing 0.2em uppercase.
- Headlines: huge (clamp 3rem->7rem), font-weight 500, tight leading 1.05.
- Italic serif words inside headlines for rhythm: e.g. "Innovation Meets *Technology*" (Technology in Instrument Serif italic gold).

## Layout language
- Navbar: flat, transparent over hero, becomes ivory/solid on scroll; links small uppercase letter-spaced; thin hairline bottom when scrolled. No pill glass.
- Hero: full viewport, dark photographic texture (subtle grain + radial gradient, NO glassmorphism orbs), tiny eyebrow, giant headline with serif-italic accent, one-line subhead, two buttons (solid gold + outline), stat row with hairline separators (like build.inc trust strip).
- Section pattern: eyebrow (mono uppercase) + big heading + description, then content.
- Dark section: charcoal bg, ivory text, gold accents. Light section: ivory bg, charcoal text (alternate for rhythm, like offline.club burgundy/cream).
- Cards: flat, no borders or hairline 1px only, no gradient borders, no glows. Hover = slight y lift + border color change. Minimal.
- Buttons: rectangle with small radius (6px), uppercase or medium sans, letter-spacing 0.05em.
- Dividers: 1px hairlines, used between sections and in stat rows.
- Motion: fade-up 0.6s ease only (keep framer-motion but slower, subtle). NO bouncing, NO orb floating, NO marquees. Tech marquee replaced by a restrained single-line logo/stack list or removed. Keep FAQ, journey, members, events, contact — restyled.
- Scroll progress + back-to-top: keep but hairline-thin, gold.
- Footer: flat charcoal, 3-col, hairline top, small text.

## Content plan (homepage order)
1. Navbar (dark flat)
2. Hero: "Decode the *Future*." / "We are Enigma." — huge headline, serif-italic gold accent
3. Trust/stats hairline strip (Members, Projects, Events, Years)
4. About (dark): editorial two-column, serif lead paragraph
5. What we do — 3 columns (Learn/Build/Compete) light ivory section
6. Members/coordinators: flat grid cards hairline
7. Events: flat list cards with date chips
8. Member journey: numbered editorial steps (light section)
9. Blog teaser: 3 posts
10. FAQ: hairline accordion (dark)
11. CTA band (ivory): "Ready to decode the enigma?" + button
12. Contact + footer

All existing data (members.json, events.json), EmailJS form, chat bot,
leaderboard/new-members/resources/join/blog/explore/alumni pages restyled
to the same language.

## Status
- Preview: https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer (port 3000 in sandbox)
- Dev server log: /tmp/next-dev.log; install with --legacy-peer-deps
- Dev branch: local only, never push. Commit locally. Do not push until user says.
