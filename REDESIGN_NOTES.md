# Enigma Website — Design Audit & Redesign Notes (internal)

## Current state observations (from screenshots)
- Dark theme, purple primary (#a855f7), orange secondary, gold accent. Decent but dated feel.
- Body font is plain Arial — biggest professional touch missing. No display font pairing.
- Hero: centered, basic, blob gradients; lacks visual depth, no grid pattern, no terminal/tech motif, cards are plain.
- Cards: flat, low-contrast borders, thin hover effects; spacing inconsistent; section backgrounds all same color (no rhythm).
- No scroll-reveal section headers (only hero animates). Long page with no visual anchors.
- Navbar: functional, okay.
- Events: "No Events Found" shows — filter defaults to past dates? Actually events dates are 2026 (some past like April 2026 vs current Aug 2026) — upcoming filter hides them. Fine.
- Join page: terminal/onboarding gimmick, fun but rough.
- Leaderboard: plain table-like cards; could be a trophy podium + animated bars.
- Alumni: minimal list, sparse.
- Blog: small cards, could be modern magazine grid.
- Resources: long list of cards.
- Contact: basic form.
- Footer: dense text.

## Redesign direction
Theme: "Enigma" = mystery + tech. Premium dark aesthetic with:
- Fonts: Space Grotesk (display) + Inter (body) via next/font.
- Refined palette: deep near-black background with subtle noise/grid texture; violet/indigo primary (263 70% 50% family), cyan accent instead of gold-orange clash; keep 3-color discipline; muted-foreground softer.
- Glassmorphism cards: bg-white/5, border-white/10, hover glow with gradient borders.
- Bento-grid homepage: feature grid of stats, latest event, blog preview.
- Animated gradient mesh hero, code/matrix terminal motif, floating tech icons.
- Scroll reveal everywhere via a small Reveal component (IntersectionObserver + framer-motion).
- Gradient section divider / big gradient text section headers with eyebrow labels.
- Marquee of tech stack logos (lucide icons).

## New features to add
1. Stats counter animation (framer-motion springs on scroll into view).
2. "Latest Events" highlights on home + upcoming events section redesign.
3. Gallery/projects showcase section ("Our Projects") with hover tilt.
4. FAQ accordion section.
5. Testimonials/club highlights quotes strip.
6. Roadmap/timeline: "Journey at Enigma" — how members grow (onboarding → skills → projects → events → alumni).
7. Enhanced join page: steps/timeline + requirements + FAQ.
8. Leaderboard upgrade: top-3 podium + progress bars + rank colors.
9. Alumni page: richer cards with tenure/role + search.
10. Blog: featured post hero + magazine grid.
11. Resources: categorized tabs (frontend/backend/AI/tools) + search.
12. Site-wide: scroll progress bar, back-to-top, improved footer with newsletter/quick CTA.
13. EnigmaBot restyle.
14. Events: category pills + search kept, add countdown badges.

## Constraints
- Keep next.config.mjs images remotePatterns; keep EmailJS form intact (do not break form logic).
- Keep admin panel working (JSON file CRUD).
- Data: members.json only 3 members; events.json has ~6 events.
- Existing API routes /api/chat, /api/leaderboard, /api/register, /api/certificates.
