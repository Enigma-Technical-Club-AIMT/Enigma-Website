# Bug diagnosis (update)

Facts: After scrolling, the tech marquee renders (it uses CSS-only animate-marquee) and the footer nav bar renders, but ALL framer-motion driven content is invisible: hero (motion.div initial="hidden" -> animate="visible"), Reveal sections, navbar (it appeared only at bottom after scroll — navbar may also use framer-motion).

This pattern = framer-motion animations stuck in "hidden" state. Possible causes in user's My Browser:
1. useReducedMotion returning true (prefers-reduced-motion media query set in their Chrome?) — but hero guards reduce -> visible/opacity1... Actually textVariants: hidden: reduce ? {opacity:1} : {opacity:0,y:25}. If reduce=true, variants=hidden means opacity1 -> fine. So not reduced motion.
2. framer-motion's Presence/MotionConfig issue unlikely.
3. Key suspect: `useReducedMotion` + `animate="visible"` with variants works server-side? framer-motion animations run client-side; should hydrate...
4. IMPORTANT: `motion` components with `initial` + `animate` rely on requestAnimationFrame. They ALWAYS animate eventually. But marquee CSS animation works, text invisible... Wait — maybe it's the CSS: hero text uses .text-gradient (background-clip text, color transparent) — main heading "Innovation Meets" is plain text though; still invisible.
5. Another strong suspect: `.noise::after` with large SVG data URI could... no, only affects ::after.
6. Real suspect: My Browser viewport screenshot shows empty dark area exactly where hero is; content invisible even though in DOM. This matches framer-motion's `hidden` state NOT transitioning because `animate` changes but transition skipped? Framer motion 12 with React 19 has known issues when `initial={false}` not used — but normally animates.
7. Possibly My Browser has an extension (adblock) blocking scripts? Unlikely to break framer-motion specifically while CSS works.

DECISION: Add robust fallback: set initial={{opacity:1}}? That kills animation everywhere. Better: keep animations but add a short JS-free guarantee? Simplest robust fix: In Reveal, use `initial={reduce || undefined}`... Actually the cleanest: use framer-motion's `whileInView` with viewport once + add `inView` check with setTimeout fallback.

Alternative simpler root cause to check: the exposed site works fine in Playwright (CSS-only screenshots show content? Playwright screenshots earlier showed hero fine — but those were taken AFTER scrolling OR content was visible because Playwright triggers in-view). Actually playwright full-page shots of home showed hero visible (contact sheet top shows hero with logo, text, stats). So framer-motion DOES run in headless Chromium. Why not in user's Chrome? Maybe their browser blocks some JS (script-src CSP is restrictive but self only — scripts are self, fine) OR their cache serves old code? They opened the link moments after first message — page should be fresh.

Hmm — OR more likely: the user opened the link in their own Chrome on a phone/different network, sandbox may have hibernated momentarily and the first page load hit a slow/timing-out build that rendered stale? The second browser_view showed navbar appearing only at bottom after scroll (262px above viewport), suggesting partial render.

PRACTICAL FIX: Make critical content visible without waiting on animations for the initial paint: hero content should be server-rendered with visible content and animations only affect transforms... But initial opacity:0 means invisible until JS. Fix: change hero + navbar + reveal initial states to be visible by default and rely on whileInView/additional CSS fade-in classes? That removes the reveal effect quality.

Balanced fix: 
- Reveal: keep animation but add `initial={reduce ? {opacity:1} : undefined}` — no, then framer applies default (from component styles?). If initial is undefined, framer uses static styles (no opacity:0). Animation from initial render styles to animate props still runs. But opacity never set 0. Acceptable and robust.
- Actually simpler global robustness: set CSS: sections that rely on Reveal get `opacity:0` via JS-added class only when mounted. Without JS (blocked), content visible.

DECISION: 
1. Modify Reveal to not force opacity 0 on server/initial: keep framer but with a mounted-state approach: only apply opacity 0 AFTER component mounts (useEffect set mounted) so non-JS/non-hydrated users still see content.
2. Same for hero motion.divs: leave as-is (hero mounts instantly, animation ~0.5s — if JS blocked, stuck). To be safe, add a <noscript>-style CSS fallback is not practical. Instead rely on above; hero animation happens within ~1s usually.
3. Consider testing in Playwright with JS disabled to verify fallback.
