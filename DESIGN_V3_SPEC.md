# Enigma Website — V3 Elevated Design Spec

## Context (from user)
Enigma Technical Club is a student-driven technical club of the CSE department at
Ambalika Institute of Management & Technology (AIMT), Lucknow. Founded 2023-24, went
dormant after 6 months, then REBUILT by co-founders (the user and friends) with a new
vision of innovation and adapting to tech change. The website is the club's portfolio:
who Enigma is, current members, leadership (1 club coordinator, CSE HOD, Deputy HOD),
events, learning resources — so juniors/prospects can know the club and join.

## Why v2 fell short
V2 was "clean editorial" but safe/cold — dark charcoal + ivory + gold, static sections,
flat hairlines. User wants something impressive — energy, identity, wow-factor, while
staying classic/refined (their references: offline.club, build.inc, studenttribe.in,
GDG Cloud ND, AI SaaS Dribbble shot).

## V3 Direction: "Bold Identity, Cinematic Story"
Keep the charcoal/ivory/gold discipline (it IS the user's taste from refs) but raise:
1. SCALE & DRAMA — hero fills viewport with a marquee statement, huge display type
   (clamp-based, 8-15vw), layered grain + slow-pan imagery, gold gradient text accents.
2. STORYTELLING — an "Our Story" timeline section: 2023 founded → dormancy →
   2025 rebuilt with new vision. This is the club's unique narrative — make it central.
3. VOICES/LEADERSHIP — HOD, Deputy HOD, Club Coordinator, Founders framed as "The
   guiding force" with quote-style serif treatment.
4. COLOR AMPLITUDE — keep palette but add a deep teal/emerald secondary (AIMT green
   nod) used for section backdrops alongside ivory, so page rhythm = dark → ivory →
   deep teal → dark. Gold stays the single accent.
5. MOTION — magnetic-ish hero, ticker marquee of club values, scroll-driven parallax
   on story imagery, counters with real context (members, events, years), subtle grain.
6. TYPOGRAPHY — keep Instrument Serif italic accents + Archivo display; ADD bigger
   contrast: eyebrow mono labels, 3-tier type scale, drop-cap story opening.

## Concrete changes
- app/globals.css: add teal section tone (section--teal), larger display scale, grain
  animation upgrade, gradient gold text utility.
- components/hero.jsx: full-viewport cinematic hero: giant statement "Where students
  build the future." + subtitle about AIMT CSE club; live ticker of club values; stats
  strip with counters (members, events, since 2023, domains); slow drifting gradient
  orb layers + film grain overlay.
- NEW components/story.jsx: Our Story timeline (2023 founded by students → 6 months
  neutral state → rebuilt with new vision → today) with numbered chapters, serif
  chapter titles, alternating dark/teal rows.
- NEW components/leadership.jsx: "Guiding Force" — HOD, Deputy HOD, Club Coordinator +
  Founders row, serif names, gold roles. (Use existing data: coordinator vipin + alok
  hod images from public: hod-vipin.jpeg, hod-alok.jpeg, coordinator-aehtabr.jpeg)
- components/about.jsx: replace with "Manifesto" style: 3 pillars (Innovation,
  Community, Growth) + club purpose para with drop cap.
- navbar: keep but add "JOIN" button more prominent (gold filled).
- footer: keep v2 flat style.
- Subpages: raise hero intros — page-hero with ticker ribbon; keep all logic.
  - join page: add vision statement block, keep terminal.
  - leaderboard/new-members/resources/blog/explore/alumni: keep v2 flat style (user
    liked overall, wanted more "wow") — only boost page-hero scale.
- Preserve ALL functionality: filters, modals, email form, chat bot, server actions,
  skeleton timeouts.

## Fonts
Instrument Serif, Archivo, JetBrains Mono — keep. Display size scale:
clamp(2.5rem, 9vw, 9rem) for hero; clamp(2rem, 5vw, 4rem) page heroes.

## Images available in public/
enigma-logo.jpeg, enigma.jpg, aimt.jpeg, hod-vipin.jpeg, hod-alok.jpeg,
coordinator-aehtabr.jpeg, member photos (adarsh1, anshu, ansuman, Diya, krishna, lok,
lokesh, raj, sachin, sachin1, satyam, shreya, sparsh, tusar, tushar1, v1, vaishnavi,
vihal, vishal1, yogesh).

## Non-negotiables
- No push. dev branch only.
- 5s skeleton timeouts stay.
- Dev server on :3000, exposed proxy URL unchanged.

## V3 PROGRESS (as of now)
DONE: globals.css v3 utilities (section--teal, text-gold-gradient, display-xxl,
ticker-track, grain-cinema, orb-drift, chapter-num, drop-cap); hero.jsx rewritten
(cinematic hero w/ orbs, grain, giant display-xxl statement, value ticker, stat strip
with border-l cells); story.jsx NEW (Our Story 4 chapters: 2023 Beginning / 2024 Dormant /
Rebirth Rebuilt With Vision teal chapter / Today); leadership.jsx NEW (Guiding Force:
hod-vipin.jpeg, hod-alok.jpeg, coordinator-aehtabr.jpeg + founders band); about.jsx
rewritten (manifesto, 3 pillars, serif statement band).

TODO NEXT:
1. app/page.jsx — insert <Story /> after About, <Leadership /> (teal) after Members or
   before Journey; import from components/story + components/leadership.
2. Subpage hero boosts: add shared page-hero (components/page-hero.jsx?) with
   display-xxl-lite (clamp 2.5-4rem) + eyebrow + border-b stats where fitting:
   explore, blog list, join, leaderboard, new-members, resources, alumni — minimal,
   keep existing content; replace existing page header markup with page-hero component.
3. Build check (npx next build), QA screenshots (scripts/qa_screenshots.py exists;
   may need memory care — kill playwright after), free memory.
4. git add -A && git commit on dev branch — DO NOT PUSH.
5. Message user with preview URL https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer
   + screenshots.

## QA FINDINGS (round 2)
- Member photos + leadership faculty photos DO load (verified by scrolling screenshots
  — earlier dark boxes were lazy-load timing). 7/8 images confirmed naturalWidth>0.
- EVENTS MYSTERY: intercepted fetch of getEvents action shows it returning members data
  (payload 0 = members list!). The 'events' section shows No Events Found.
  getEvents() is called as a server action in events.jsx useEffect. Members action works.
  Likely cause: getEvents returns [] or the action id mapping differs; need to inspect
  what the getEvents action id resolves to — the intercepted body was the MEMBERS list,
  meaning the first action called is getMembers; getEvents call outcome not logged.
  NEXT: log the second intercepted call separately to see its payload.

## EVENTS BUG — RESOLVED (events.jsx)
- Fixed: removed useMemo from filteredEvents (stale SSR cache in React 19/Next 16 dev);
  plain filter+sort each render. Debug logs removed. Build passes clean.
- Dev server restarted (died OOM during build — use `nohup npm run dev > /tmp/next-dev.log 2>&1 &`)

## V4 REWORK — VERIFIED (mostly done)
- Hero verified GOOD: navy band, ivory 'We decode' + gold serif 'future.', gold JOIN
  pill, ticker strip, stat strip. Screenshot: screenshots/v4_hero.png
- Fixes applied since last status: layout.jsx defaultTheme='light' (was 'dark' html class
  breaking colors); .dark-band now overrides --foreground/--card/--muted tokens too;
  :root palette only (removed .dark/.light variants). globals.css done.
- v4_story.png captured (verify light paper + gold chapter nums).
- REMAINING: verify story screenshot, leadership light? (leadership is navy band — fine),
  check members/events light render in contact sheet (already verified light), then
  commit dev branch (NO PUSH) and deliver preview
  https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer with v4_hero.png,
  v4_story.png, qa contact sheet.

## V5 NEON-HORIZON — VERIFIED GOOD
- globals.css V5: white-blue bg #f6f8fc, slate-blue ink #16202f, primary electric blue
  #2563eb, violet #8b5cf6, radius 1rem. .hero-band (aurora gradient dark hero),
  .footer-band (dark slate footer), .glass-card, .btn-brand (gradient pill),
  .text-brand-gradient, .chapter-num gradient, .drop-cap blue, .grad-divider.
- Components converted: hero (hero-band, blue/violet/purple orbs, gradient CTA,
  rounded pills), page-hero (light with gradient orbs + brand highlight), navbar
  (btn-brand gradient JOIN pill), footer (footer-band + btn-brand), leadership
  (light violet-tinted gradient band), story (light with grad-divider + brand
  highlight), SectionHeading brand highlight, repaint.py swept all hexes.
- flat-card -> glass-card in all components via sed. Build passes. Dev server OK.
- QA verified: v5_hero.png (aurora hero excellent), v5_story.png (light with
  gradient chapter nums), v5_leadership.png (members light band), contact sheet all
  pages light + gradient JOIN pill, footer dark slate. Members photos load.
- Preview: https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer
- REMAINING: commit dev (NO PUSH): git add -A && git commit -m "V5 neon-horizon...",
  then deliver with v5_hero.png, v5_story.png, v5_leadership.png, contact sheet.

## V4 REWORK — STATUS (older)
- globals.css V4 light palette DONE; .dark-band DONE.
- hero.jsx navy dark-band + new gold #d4a42a DONE; story/light DONE; leadership navy band DONE;
  about/journey normalized; page-hero light; footer navy dark-band; repaint.py swept hexes.
- Build passes. QA contact sheet verified: light pages everywhere except hero/footer/leadership
  navy bands. Home hero screenshot v4_hero.png: headline appears mid-animation ('future.'
  visible, 'We decode' cut off due to scroll/viewport at capture time) — re-verify after
  scroll to top + 2s settle.

## V4 REWORK IN PROGRESS (user request: no full-dark theme, professional color pattern)
User said: "again you have created the fully dark theme i want some design like which has
some standard and professional colour pattern"

V4 PLAN: light-first professional palette. DONE so far:
- globals.css root palette rewritten: paper white #fbf9f4 bg, ink-navy #1d2340 fg,
  pure white cards, refined gold #d4a42a accent, soft paper grey muted, crisp hairline
  border. New .dark-band utility class = ink-navy band (for hero + footer only, NOT page-wide).

STILL TODO for V4:
1. components/hero.jsx — currently uses dark bg + orbs + grain: wrap hero in .dark-band
   (keep cinematic navy hero; it's professional to have a dark HERO but light rest).
2. components/story.jsx — chapters likely dark bg: switch to paper bg, navy text,
   gold chapter-num (opacity), borders. Keep serif/drop-cap.
3. components/leadership.jsx — section--teal class no longer valid (removed): use
   .dark-band (navy) band for faculty (honor/dark for gravitas) OR paper; choose navy
   band for faculty section.
4. components/about.jsx — was ivory on dark; now natural paper bg.
5. components/members.jsx, events.jsx, skills-courses.jsx, journey.jsx, faq.jsx,
   contact.jsx — all currently rely on dark default bg; after palette change they'll
   automatically be light. Check text contrast on gold headings.
6. components/navbar.jsx, footer.jsx — footer maybe keep dark-band for grounding.
7. page-hero.jsx + subpage heroes (explore/blog/leaderboard/resources/new-members/
   alumni/join page.jsx edits) — check for hardcoded dark classes.
8. Rebuild, QA screenshots (scripts/qa_screenshots.py + scripts/make_qa_sheet.py),
   fix, commit on dev (NO PUSH), deliver preview
   https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer
9. Dev server: nohup npm run dev > /tmp/next-dev.log 2>&1 & (dies under build OOM)

## FINAL QA STATE (pass 3)
- All pages screenshot OK (qa_screenshots.py, v3_contact_sheet.png verified good):
  hero/story/leadership/explore/new-members/blog/leaderboard/resources/alumni/join all
  render with V3 boosts. Events cards now render (Web Development Bootcamp visible).
- Faculty photos load (explore_scroll sheet shows 3 b/w faculty portraits).

## EVENTS DEBUG STATE (round 3 — superseded/resolved)
- Dev log CONFIRMS: per page load, TWO server actions succeed server-side: getMembers()
  AND getEvents() (both 1ms, no errors, no 'Error reading events'). So server returns 6
  events every time. Yet the events section shows 'No Events Found' after hydration.
- The check_events3.py intercept only caught 1 action payload (getMembers) — likely the
  getEvents response arrived and WAS processed, but eventsList set with the data then
  a second render wipes? OR the eventsList useState update happens, BUT filteredEvents
  empty because events' date parsing fails for the date strings? NO — empty-list UI
  ('No Events Found') only shows when filteredEvents.length === 0 after loading.
- KEY SUSPICION: getEvents returns [] client-side? No, server log ran getEvents with
  real data. Unless client gets stale []...
- FILTER BUG CONFIRMED: render log shows 'loading=false list=6 filtered=0' —
  getEvents returns 6 events, but filteredEvents computed as EMPTY. The useMemo
  filter logic has a bug: when activeCategory==='All', the searchQuery check with
  `return matchesTitle || matchesDesc || matchesTags` only runs when query is
  non-empty... wait no. Actually the bug: category 'All' → falls through, then
  if searchQuery.trim() !== '' → else returns true... that's fine.
  REAL BUG: the 'All' path falls through correctly. BUT filtered=0 while list=6.
  Check events.json tag values vs expected lowercased tags. Also NOTE mounted=false
  during effect = effect ran during SSR shell render (dev SSR). Data survives SSR.
  Fix by logging an event's tags; likely events.json has empty tags array or tags
  like 'Web Development' missing from Seminard mapping — but All should include all.
  ROOT CAUSE CONFIRMED: the useMemo filter callback NEVER ran client-side — the
  filter-debug console.log never printed. filteredEvents was the SSR-memoized []
  value, stale through hydration. React 19 / Next 16 dev: useMemo with same deps
  didn't recompute post-hydration for this component (quirk). FIX: replaced
  useMemo with plain computation (no memo) — filter + sort run on every render.
  Filters are cheap (<=20 events). Verify next.
- ROOT CAUSE FOUND (evg_log.py): '[EVG] getEvents called' → resolved 2159 chars (DATA OK)
  → 'effect settled, mounted= false'. setEventsList WAS called with data.
  So after hydration the state should hold events. Yet UI shows No Events Found.
  Hmm — maybe UI IS showing events briefly then Reveal/motion remount? No.
  OR 'No Events Found' renders because eventsList set BUT then a re-render from
  the 5s timeout?? No, timeout only setIsLoading.
  WAIT: check whether the DOM actually shows cards right after 2s (before screenshot
  at 7s). If cards flash then disappear, something resets state. If never shown,
  hydration mismatch causes React to discard client render & use SSR markup (which
  had events SSR-baked? no...). Next: capture DOM card count at t=3s and t=8s.
- NEXT INVESTIGATION: render test — check in browser whether the events section DOM
  contains event cards at any point, and console-log the actual getEvents promise
  resolution inside the page (add temporary console.log in events.jsx useEffect, then
  check log).

## EVENTS DEBUG STATE (round 2 — superseded)
- check_events4.py intercept: only ONE server-action call on home load → id 0096a250 =
  getMembers (payload 880 chars, members list). NO getEvents call observed even though
  events.jsx useEffect calls getEvents() → events list stays [] → 'No Events Found'.
- Dev log: 'ƒ getEvents() in 1ms' entries appear on SSR (POST /) — SSR events action OK,
  but client hydration only calls getMembers? That's weird; members SSR too.
- admin.js lines 7-8: MEMBERS_FILE/EVENTS_FILE = cwd/data/members.json + events.json.
- Hypothesis: events.jsx client effect DOES run getEvents but fetch is deduped? No —
  intercept shows only 1 call. Possibly getEvents action id === getMembers id? No.
  OR the intercept missed it (init script attached before goto — should catch all).
  Actually members.jsx useEffect also runs... hmm, only 1 call total seen.
  WAIT — members SSR returns data baked in; client effect may skip if data already set.
  Same for events: if SSR baked data, client wouldn't call. But screenshot shows EMPTY
  events → SSR data NOT baked for events. So client effect SHOULD call. Investigate:
  check whether events section is hydration or static; check if getEvents returns []
  by directly reading /tmp events path. NEXT: run call_getevents2.py (RSC id extraction).
- Members DO render fine (3 members shown, photos lazy-load ok).

## QA FINDINGS (screenshot pass 1)
- Build passes clean (all routes 200). Hero/story/subpage heroes all render well.
- Screenshots: leadership member-card images + main members section images appear
  DARK/EMPTY — must verify public/ image files exist (maybe Next optimizes lazily and
  screenshots catch them mid-load, or files genuinely missing). Check with curl on
  /hod-vipin.jpeg, /yogesh.jpeg, /vishal1.jpeg, /sparsh.jpeg.

Notes: server on :3000; skeletons fix committed f9c2168; v2 redesign commit 1c3df6c.
Skeleton 5s timeouts already in members.jsx/events.jsx — keep.
Members JSON fixed (/yogesh.jpeg).
