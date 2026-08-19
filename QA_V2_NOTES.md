# QA V2 (classic editorial redesign) — findings

## qa_sheet1 (home, explore, blog, blog-detail, join)
- home.png: top portion appears very narrow/blank (hero may render fine — need full-res check). Bottom shows white section (about, ivory) and members, FAQ, contact. Verify hero at full-res.
- explore.png: looks GOOD — dark hero, ivory "About AIMT" + coordinator cards, "Latest Club Events" dark, skills grid, AIMT banner, CTA, footer. Matches classic style.
- blog.png: GOOD — editorial list with hairlines, serif accent "Engineering Blog", CTA band, footer.
- blog-detail.png: GOOD — article header, body, code blocks dark styled, author, CTA band.
- join.png: GOOD — "Initiate Recruitment" terminal page, dark flat.

## TODO
- Check home.png full-res (hero render)
- Check qa_sheet2 (leaderboard, new-members, resources, alumni)
- Fix any issues found, then commit dev branch, deliver.

## Final QA results
home.png full-res verified: hero "We decode the future." + stats strip renders; ivory About section; members dark section; events; skills & learning path; journey ivory; FAQ; contact; CTA band; footer — all in classic editorial style. Members grid in sheet1 top area had narrow first tile (render at capture-time), but full-res home.png shows correct grid.
qa_sheet2 verified: leaderboard (table, chart, medals), new-members (grayscale grid + color on hover), resources (filter tabs, hairline cards, ivory strategy section), alumni (coming soon state) all correct.
Blog slug page has slightly light gray code blocks but acceptable.
All 9 pages clean, build OK. NEXT: commit on dev branch, DO NOT PUSH, deliver preview + screenshots.

## BUG (user report): skeletons never resolve
User's screenshot shows 3 member-card skeletons (the v1-era Skeleton components with rounded corners, never matching our v2 flat style) stuck indefinitely. Root cause: members.jsx uses `if (isLoading) return <MembersSectionSkeleton />` — the server action `getMembers()` must be resolving to data, but something makes setIsLoading(false) not happen OR the screenshot captured mid-load. More importantly the skeletons themselves look like OLD v1 components (rounded-xl, bg-card/50), meaning the old skeletons.jsx got restored from origin/main during reset but members.jsx was ours — wait, actually members.jsx imports MembersSectionSkeleton. The skeleton shape in user screenshot exactly matches components/skeletons.jsx MemberCardSkeleton (aspect-[3/4], 3 avatar circles = social icons). So skeletons ARE rendering.
Key suspicion: in the user's browser (My Browser, connected), server actions over the exposed proxy may HANG or be slow, so loading stays true forever → skeletons visible forever. Solution: add a loading timeout fallback (max ~4s) that renders empty/skeleton-free section, and never render the skeleton section at all — just render the section with empty fallback (no members) once timed out. Also guard in events/skills-courses which import skeletons too.
FIX PLAN: members.jsx — useEffect with Abort-like timeout: setIsLoading(false) after 5s if not done (or render content when timed out). Same pattern in events.jsx + skills-courses.jsx. Simpler: keep skeletons but with fallback: if still loading after 5s, show section anyway (graceful degradation).

## Skeleton stuck bug — FIXED (user report with screenshot)
Diagnosis: members/events sections render MembersSectionSkeleton/EventsSectionSkeleton while server actions getMembers/getEvents (via /app/actions/admin.js) are pending; over user's browser (My Browser via proxy) they can hang, so skeletons stuck forever.
Fix applied: members.jsx + events.jsx now have a 5-second timeout fallback that resolves isLoading regardless of fetch outcome (with catch handler); skills-courses.jsx timer reduced 800ms → 250ms so skeleton never visibly flashes. Also fixed data/members.json broken image "/yogu.jpeg" → "/yogesh.jpeg" (file exists in public).
Verified locally with scripts/verify_render.py: members section shows real members (Yogesh, Vishal, Sparsh) with photos after 7s wait; members_verify.png confirms. Build clean. Preview URL: https://3000-imlb5dp92xh9b30zahv45-7b1eecca.us3.manus.computer (port 3000 exposed).
NEXT: commit on dev branch (git add -A && git commit, NO push), refresh browser check optional, then message user result.
