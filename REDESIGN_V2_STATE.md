# CLASSIC REDESIGN v2 — Progress State (DO NOT PUSH until user says "push it")

## Task
Complete UI redesign of Enigma Website in classic editorial style per user refs
(offline.club, gdgcloudnd.in, build.inc, studenttribe.in, Dribbble AI SaaS shot).
Spec: /home/ubuntu/Enigma-Website/CLASSIC_DESIGN_SPEC.md
Reference analysis: /home/ubuntu/ref_shots/REFERENCE_ANALYSIS.md

## Palette/Type (implemented in app/globals.css)
- bg charcoal #131210 (hsl 40 12% 7%), ivory #f7f3ec (light), ivory text #f2efe6
- accent gold #c9a227 (hsl 78 58% 48%), hairline hsl(55 12% 20%)
- fonts: --font-serif=Instrument Serif (italic accents via .font-serif-accent),
  --font-sans=Archivo (.font-display medium/tight), --font-mono=IBM Plex Mono (.eyebrow, .font-mono-accent)
- eyebrow: mono 0.72rem uppercase tracking 0.22em + gold dash before
- flat-card: bg-card 1px border, hover y=-3 + gold border; NO glass/gradient-border/glow

## Status of files (DONE so far)
- [x] app/layout.jsx — fonts updated (Instrument Serif, Archivo, IBM Plex Mono)
- [x] app/globals.css — rewritten design tokens + utilities (hero-vignette, grain, eyebrow, flat-card)
- [x] components/reveal.jsx — Reveal (no-JS safe) + SectionHeading (eyebrow+medium headline+serif italic gold highlight)
- [x] components/navbar.jsx — flat editorial bar, uppercase tracking links, gold outline CTA
- [x] components/hero.jsx — vignette hero, "We decode the future." serif-italic gold accent, hairline stat strip (4 stats: 100+,50+,20+,5+)
- [x] app/page.jsx — TechMarquee import removed (still has Hero, About, Members, Events, SkillsCourses, Journey, Faq, Contact, Footer)
- [x] components/about.jsx — ivory section (#f7f3ec bg, #1c1b18 text), 3 numbered flat columns + serif lead + 2-col mission text
- [x] components/members.jsx — flat cards, grayscale photo hover colorize, hairline info cards, restrained modal

## Remaining TODO
DONE so far (v2 classic): hero, navbar (ThemeToggle removed), about, members, events, skills-courses, journey (ivory section bg #f7f3ec), faq (left-aligned align prop used), contact, footer, scroll-progress, back-to-top, enigma-bot. globals.css + layout fonts done.
REMAINING (join DONE, explore DONE, blog+slug DONE):
- [ ] app/explore/page.jsx — full rewrite needed (heavy v1 glass style; 530 lines, has coordinators/skillsData/aimtPrograms arrays to preserve). Layout: hero (aimt.jpeg logo + heading), About AIMT (stats 2000+/50+/95%/6+), About Enigma (coordinators 3 cards with images /coordinator-aehtabr.jpeg /hod-alok.jpeg /hod-vipin.jpeg), skills grid, AIMT programs banner (enigma.jpg image), CTA Get in Touch -> /#contact
- [ ] app/blog/page.jsx, app/blog/[slug]/page.jsx — restyle list cards + article (check file for existing structure)
- [ ] app/join/page.jsx — restyle terminal style minimally (dark flat)
- [ ] app/leaderboard/page.jsx — restyle
- [ ] app/new-members/page.jsx — restyle
- [ ] app/resources/page.jsx — restyle
- [ ] app/alumni/page.jsx — restyle
- [ ] Visual QA via playwright screenshots (script: /home/ubuntu/Enigma-Website/scripts/screenshots.py; run `playwright install chromium` first if missing; capture contact sheet)
- [ ] Commit locally on dev branch (git add -A, commit "classic redesign v2")
- [ ] DO NOT push. Preview URL: https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer (port 3000). Dev server: cd /home/ubuntu/Enigma-Website && npm run dev
- [ ] Ask user: tweaks? push?

## Env notes
- Dev server: cd /home/ubuntu/Enigma-Website && npm run dev (log /tmp/next-dev.log); install via npm install --legacy-peer-deps
- Sandboxes reset periodically; if repo files vanish: re-clone, checkout origin/main for non-redesigned files (package.json, data, hooks, lib, public, styles, ui components, app/actions, app/admin, app/api, skeletons, theme-provider, theme-toggle), keep components/app redesign files.
- git repo currently has local dev branch with snapshot commit 4d50838.
- screenshots dir: /home/ubuntu/Enigma-Website/screenshots (script scripts/screenshots.py)

## UPDATE — Phase 4 complete (all subpages rewritten v2 classic)
DONE additionally: app/leaderboard, app/new-members, app/resources, app/alumni, app/blog, app/blog/[slug], app/join, app/explore. All build clean (npx next build OK). Dev server on :3000 (200). Preview: https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer
Phase 5 (QA) IN PROGRESS: script scripts/qa_screenshots.py captures full-page + scroll shots of all 9 pages into screenshots/. Next: create contact sheet (PIL, 2-col grid), review home.png + scroll sheets, fix issues, then commit locally (dev branch, no push), deliver.
Remaining classic-style rules used: charcoal #131210 bg, ivory #f7f3ec section, gold #c9a227 accent (CTAs bg-[#c9a227] text-[#131210], hover bg-[#dfc05a]; links border border-[#c9a227]); typography font-display (Archivo), font-serif-accent (Instrument Serif italic gold), font-mono-accent uppercase tracking labels; flat hairline borders border-t border-border grids; grayscale photos colorize on hover; eyebrow className "eyebrow" (uppercase tracking gold-ish label); hero-vignette bg.
After QA: git add -A && git commit on dev branch (branch may need recreate: git checkout -b dev origin/main if missing; check `git branch`). DO NOT PUSH. Then message user for review.
