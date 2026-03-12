# Website Upgrade Plan: Sam's Homepage 2.0

## Overview

Transform Sam's Hugo-based personal site from a simple avatar + social-links landing page into a sleek, animated, modern personal site with resume and projects sections — while keeping the minimal aesthetic and playful energy.

**Current state:** Custom Hugo site (theme removed) with hero section, blog templates, dark/light mode toggle, light mode default. ~55% of upgrade complete.

**Target state:** A polished single-page site with smooth scroll sections, micro-animations, a resume timeline, a projects showcase, and an upgraded blog — all still powered by Hugo for simplicity.

---

## Phase 1: Foundation — Ditch the Theme, Go Custom ✅ COMPLETE

~~The hugo-coder theme is limiting. Replace it with custom layouts and a modern CSS architecture.~~

All Phase 1 work is done:
- hugo-coder theme submodule removed
- Custom `baseof.html`, `single.html`, `list.html`, `index.html` layouts created
- `assets/css/main.scss` (824 lines) with full design token system (colors, typography, spacing, transitions)
- Font stack: Plus Jakarta Sans (headings), Outfit (body), JetBrains Mono (code)
- Colors: Light mode default (`#f5f2eb` bg), dark mode (`#0a0a0a` bg), accent electric blue (`#3b82f6`)
- 8px spacing grid, `0.3s cubic-bezier(0.4, 0, 0.2, 1)` default transitions
- Dark/light mode toggle with sun/moon SVG icons, localStorage persistence, FOUC prevention
- Mobile-first responsive breakpoints (480px, 768px)

---

## Phase 2: Layout — Single-Page Sections with Smooth Scroll 🔶 PARTIAL

Convert from a simple landing page to a smooth-scrolling single-page layout with distinct sections.

### Done:
- Sticky top nav bar (`position: fixed`) with scroll-triggered background/shadow
- Smooth scroll via `scroll-behavior: smooth`
- Active link hover styles with underline slide-in
- Footer partial with social links

### 2.1 Remaining section structure
Create these sections as Hugo partials and add to homepage:

1. ~~**Hero**~~ ✅ — Done
2. **About** — Short bio paragraph with avatar
3. **Projects** — Showcase of notable work (see Phase 4)
4. **Resume** — Interactive timeline (see Phase 5)
5. **Blog** — Latest posts teaser cards (see Phase 6)
6. ~~**Footer**~~ ✅ — Done

### 2.2 Remaining navigation work
- Active section highlighted in nav based on scroll position (Intersection Observer)
- On mobile: hamburger that opens a full-screen overlay menu with staggered link animations

### 2.3 Smooth scroll + section reveals
- Each section fades/slides in as it enters the viewport using Intersection Observer
- Staggered animation for list items (projects, resume entries, blog cards)

---

## Phase 3: Hero Section — The "Wow" Moment ✅ MOSTLY COMPLETE

~~The hero is the first impression. Make it count.~~

Done:
- Full viewport height (100vh) with centered layout
- Large clamp-sized typography (`clamp(3.2rem, 7.5vw, 6rem)` name, `clamp(1.05rem, 2vw, 1.3rem)` tagline)
- `fadeSlideUp` entrance animations with staggered delays
- Background: SVG fractal noise grain overlay + radial gradient ambient glow
- Circular avatar (3:4 aspect ratio) with subtle blue border, grayscale filter, hover scale effect
- Social links (Twitter, LinkedIn, Soundcloud) with hover lift + color fill
- Scroll indicator with bouncing dot animation
- Two-column grid on desktop, single column on mobile

### 3.x Optional enhancements (nice-to-have)
- Particle/dot grid or mouse parallax background effect
- Avatar pulsing ring / gradient border spin animation

---

## Phase 4: Projects Section ❌ NOT STARTED

### 4.1 Data source
- Create `data/projects.yaml` (or .toml) with structured project data:
  ```yaml
  - title: "Project Name"
    description: "One-liner about what it does"
    tags: ["Go", "Bitcoin", "CLI"]
    url: "https://github.com/..."
    image: "/images/projects/project-name.png"  # optional
    featured: true
  ```

### 4.2 Layout
- Grid of project cards (2-3 columns on desktop, 1 on mobile)
- Each card:
  - Project name (bold)
  - Short description
  - Tech/tag pills
  - Link arrow icon
  - On hover: card lifts with shadow, subtle background shift, arrow slides right
- Featured projects get a slightly larger card or a highlight border

### 4.3 Animations
- Cards stagger-fade-in on scroll (each card delayed 100ms after the previous)
- Tag pills slide in from the left with a spring easing
- Consider a filter bar at the top (e.g., "All | Crypto | Web | Music") — only if there are enough projects to warrant it

---

## Phase 5: Resume Section ❌ NOT STARTED

### 5.1 Data source
- Create `data/resume.yaml`:
  ```yaml
  experience:
    - title: "Software Engineer"
      company: "Company Name"
      period: "2020 - Present"
      description: "Brief description of role and impact"
      highlights:
        - "Key achievement 1"
        - "Key achievement 2"
  education:
    - degree: "B.S. Computer Science"
      school: "University Name"
      period: "2016 - 2020"
  skills:
    - category: "Languages"
      items: ["Go", "Python", "JavaScript", "Rust"]
    - category: "Tools"
      items: ["Docker", "Kubernetes", "Git"]
  ```

### 5.2 Layout — Vertical timeline
- A vertical line down the center (or left-aligned on mobile)
- Experience entries alternate left/right of the line on desktop
- Each entry is a card with: role, company, date range, and a short description
- The timeline line draws itself as you scroll (SVG path animation or clip-path)
- Education section below experience, same style
- Skills shown as a grid of pills grouped by category

### 5.3 Animations
- Timeline line "draws" downward as user scrolls into the section
- Each entry card slides in from its respective side (left entries from left, right from right)
- Date badges pop in with a scale animation
- Skills pills have a staggered fade-in

---

## Phase 6: Blog Section Upgrade 🔶 PARTIAL

### Done:
- **Blog index page** — Card layout with titles, dates, read-time estimates, excerpts (120 chars), hover lift
- **Blog post template** — 720px reading column, post metadata (date, read time, tags), styled tag pills, "Back to blog" link, previous/next navigation, KaTeX support (conditional via `math: true`), styled code blocks, blockquotes, tables, lists

### 6.1 Remaining: Blog cards on homepage
- Show the 3 most recent posts as cards in the Blog section of the homepage
- Each card: title, date, short excerpt, read-time estimate, tags
- "View all posts" link to the full blog index page
- Cards have hover lift effect with a subtle gradient overlay

### 6.x Remaining: Code block copy button
- Styled code blocks exist but are missing the copy-to-clipboard button

---

## Phase 7: Micro-Interactions & Polish 🔶 PARTIAL

### Done:
- Links: underline slides in from the left on hover
- Buttons/social links: subtle scale + shadow on hover
- Dark/light mode toggle: sun/moon icon swap with smooth color transitions (300ms)
- `prefers-reduced-motion` media query: all animations disabled
- Smooth scrolling throughout

### 7.1 Remaining: Nav active indicator
- A small dot or line indicator slides to the active nav link

### 7.2 Remaining: Page transitions
- Smooth cross-fade between pages (homepage <-> blog post) using CSS transitions or View Transitions API

### 7.3 Remaining: Loading
- Minimal skeleton or fade-in on initial page load to prevent flash of unstyled content

### 7.4 Remaining: Easter egg (playful touch)
- Konami code or a hidden click target that triggers a fun animation (confetti, the avatar doing something silly, a sound effect from Soundcloud)
- Keep it subtle and discoverable

---

## Phase 8: Performance & Accessibility 🔶 PARTIAL

### Done:
- All animations use `transform` and `opacity` only (GPU-composited)
- Lazy-load images with `loading="lazy"`
- Vanilla JS only (41 lines total), no frameworks
- SCSS minification + fingerprinting via Hugo Pipes
- Skip-to-content link
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA labels on dark mode toggle, social links, nav
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- `prefers-reduced-motion` fully respected
- Open Graph + Twitter Card meta tags
- Canonical URLs
- Sitemap.xml (Hugo auto-generated)

### 8.1 Remaining: Performance
- Image optimization (WebP/modern formats)
- Asset size audit against < 100KB target
- Lighthouse audit and verification of < 2s load on 3G

### 8.2 Remaining: SEO
- Structured data (JSON-LD) for person/website

---

## Implementation Notes

### Tech decisions (validated)
- **No JS frameworks.** Vanilla JS + CSS animations ✅
- **SCSS** for nesting and variables, compiled by Hugo Pipes ✅
- **Hugo data files** (`data/*.yaml`) for projects and resume — easy to update without touching templates
- **Hugo partials** for each section — clean separation of concerns ✅

### Current file structure
```
layouts/
  _default/
    baseof.html          ✅ Master template (21 lines)
    single.html          ✅ Blog post template (34 lines)
    list.html            ✅ Blog index (18 lines)
  index.html             ✅ Homepage with hero (40 lines)
  partials/
    head.html            ✅ <head> with meta, CSS, fonts
    nav.html             ✅ Sticky navigation
    footer.html          ✅ Footer with socials
    dark-mode.html       ✅ Dark mode toggle + script
    helpers/katex.html   ✅ KaTeX support
  shortcodes/
    rawhtml.html         ✅ Keep existing
assets/
  css/
    main.scss            ✅ All styles (824 lines)
  js/
    main.js              ✅ Scroll observer, nav, dark mode (41 lines)
data/
  projects.yaml          ❌ Not yet created
  resume.yaml            ❌ Not yet created
content/
  posts/                 ✅ 4 blog posts
static/
  images/
    sam_on_beach.jpg     ✅ Avatar photo
```

### Still needed
```
layouts/
  partials/
    about.html           # About section
    projects.html        # Projects grid
    resume.html          # Resume timeline
    blog-preview.html    # Latest posts on homepage
data/
  projects.yaml          # Project entries (Sam to provide real data)
  resume.yaml            # Resume data (Sam to provide real data)
```

### Remaining order of implementation
1. **Phase 4 (Projects)** — new content section, needs `data/projects.yaml` + partial
2. **Phase 5 (Resume)** — new content section, needs `data/resume.yaml` + partial
3. **Phase 2 completion** — Intersection Observer nav, mobile hamburger, section reveals
4. **Phase 6 completion** — Homepage blog preview cards, code block copy button
5. **Phase 7 completion** — Page transitions, easter egg, nav active indicator
6. **Phase 8 completion** — Lighthouse audit, image optimization, JSON-LD

---

## Success Criteria

- [ ] Site loads in < 2 seconds on 3G
- [ ] Lighthouse score > 90 on all categories
- [ ] All sections smoothly animate on scroll
- [x] Dark/light mode works flawlessly with smooth transitions
- [x] Fully responsive from 320px to 2560px
- [x] Keyboard navigable, screen-reader friendly
- [x] `prefers-reduced-motion` disables all animations
- [x] Zero JS framework dependencies
- [ ] Sam looks at it and says "whoa"
