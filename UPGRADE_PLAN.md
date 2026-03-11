# Website Upgrade Plan: Sam's Homepage 2.0

## Overview

Transform Sam's Hugo-based personal site from a simple avatar + social-links landing page into a sleek, animated, modern personal site with resume and projects sections — while keeping the minimal aesthetic and playful energy.

**Current state:** Hugo + hugo-coder theme, single landing page with avatar/name/social links, 4 blog posts (Bitcoin/crypto), dark mode, Firebase hosting.

**Target state:** A polished single-page site with smooth scroll sections, micro-animations, a resume timeline, a projects showcase, and an upgraded blog — all still powered by Hugo for simplicity.

---

## Phase 1: Foundation — Ditch the Theme, Go Custom

The hugo-coder theme is limiting. Replace it with custom layouts and a modern CSS architecture.

### 1.1 Remove hugo-coder theme dependency
- Delete the `themes/hugo-coder` submodule
- Move any needed partials (dark mode, head, etc.) into the project's own `layouts/`
- Create a fresh `baseof.html` layout as the master template

### 1.2 Set up modern CSS
- Use a single `assets/css/main.scss` with CSS custom properties for theming
- Define a design token system:
  - **Colors:** Near-black background (`#0a0a0a`) for dark mode as default, warm off-white (`#f5f2eb`) for light. Accent color: electric blue (`#3b82f6`) or a vibrant gradient
  - **Typography:** Inter or Space Grotesk (sans-serif) for headings, Inter for body — modern, geometric, techy
  - **Spacing:** 8px grid system
  - **Transitions:** Default `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for all interactive elements
- Mobile-first responsive breakpoints: 480px, 768px, 1024px, 1280px

### 1.3 Dark mode (default) with toggle
- Default to dark mode (fits the sleek/techy vibe)
- Keep the toggle but restyle it as a minimal sun/moon icon with a smooth morph animation
- Use CSS custom properties for instant theme switching with a fade transition on `<body>`

---

## Phase 2: Layout — Single-Page Sections with Smooth Scroll

Convert from a simple landing page to a smooth-scrolling single-page layout with distinct sections.

### 2.1 Section structure
Create these sections in order, each as a Hugo partial:

1. **Hero** — Full-viewport intro with name, title, and a hook
2. **About** — Short bio paragraph with avatar
3. **Projects** — Showcase of notable work
4. **Resume** — Interactive timeline of experience and education
5. **Blog** — Latest posts teaser cards
6. **Footer** — Social links, contact, copyright

### 2.2 Navigation
- Sticky top nav bar that appears after scrolling past the hero
- Nav links scroll smoothly to each section (`scroll-behavior: smooth` + JS for offset)
- Active section highlighted in nav based on scroll position (Intersection Observer)
- On mobile: hamburger that opens a full-screen overlay menu with staggered link animations

### 2.3 Smooth scroll + section reveals
- Each section fades/slides in as it enters the viewport using Intersection Observer
- Staggered animation for list items (projects, resume entries, blog cards)

---

## Phase 3: Hero Section — The "Wow" Moment

The hero is the first impression. Make it count.

### 3.1 Layout
- Full viewport height (`100vh`)
- Name in large, bold typography (clamp-sized for responsiveness)
- Subtitle/tagline below: something like "Developer. Builder. Curious mind." with a typing/reveal animation
- Subtle call-to-action: a down-arrow or "scroll" indicator that gently bobs

### 3.2 Animated background
- **Option A (Recommended): Particle/dot grid** — A subtle animated canvas or CSS-only dot grid in the background that reacts slightly to mouse movement (parallax). Lightweight, techy, memorable
- **Option B: Gradient mesh** — Slowly morphing gradient blobs using CSS `@keyframes` and `filter: blur()`. No JS needed, very performant
- Pick one. Keep it subtle — it should enhance, not distract

### 3.3 Avatar
- Circular avatar with a subtle glowing border animation (pulsing ring or gradient border spin)
- On hover: slight scale-up with shadow lift

### 3.4 Social links
- Move to the footer or keep as small icons in the hero
- On hover: icon lifts with color fill and a tooltip

---

## Phase 4: Projects Section

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

## Phase 5: Resume Section

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

## Phase 6: Blog Section Upgrade

### 6.1 Blog cards on homepage
- Show the 3 most recent posts as cards in the Blog section
- Each card: title, date, short excerpt (first 120 chars), read-time estimate, tags
- "View all posts" link to the full blog index page
- Cards have hover lift effect with a subtle gradient overlay

### 6.2 Blog index page
- Clean list/card layout for all posts
- Each entry shows title, date, excerpt, tags
- Maintain KaTeX support for math-heavy posts

### 6.3 Blog post template
- Wider reading column (max 720px)
- Improved typography: larger body text, better heading hierarchy
- Styled code blocks with copy button
- Estimated reading time in header
- "Back to blog" link at top
- Previous/Next post navigation at bottom

---

## Phase 7: Micro-Interactions & Polish

These small details separate a good site from a great one.

### 7.1 Cursor & hover effects
- Links: underline slides in from the left on hover (CSS `background-size` trick)
- Buttons: subtle scale + shadow on hover/active
- Nav links: a small dot or line indicator slides to the active link

### 7.2 Page transitions
- Smooth cross-fade between pages (homepage <-> blog post) using CSS transitions or View Transitions API if targeting modern browsers

### 7.3 Loading
- Minimal skeleton or fade-in on initial page load to prevent flash of unstyled content
- `prefers-reduced-motion` media query: disable all animations for users who prefer it

### 7.4 Dark/light mode toggle animation
- Sun/moon icon morphs between states (SVG path animation or icon swap with rotation)
- Background and text colors transition smoothly (300ms)

### 7.5 Easter egg (playful touch)
- Konami code or a hidden click target that triggers a fun animation (confetti, the avatar doing something silly, a sound effect from Soundcloud)
- Keep it subtle and discoverable

---

## Phase 8: Performance & Accessibility

### 8.1 Performance
- All animations use `transform` and `opacity` only (GPU-composited, no layout thrashing)
- Lazy-load images with `loading="lazy"`
- Minimize JS: prefer CSS animations, use vanilla JS only where needed (Intersection Observer, scroll tracking, dark mode)
- No heavy frameworks — keep the Hugo static site advantage
- Target < 100KB total page weight (excluding images)

### 8.2 Accessibility
- All interactive elements keyboard-navigable
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA labels on icon-only buttons (dark mode toggle, social links)
- Sufficient color contrast in both themes (WCAG AA minimum)
- `prefers-reduced-motion` respected throughout
- Skip-to-content link

### 8.3 SEO
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for person/website
- Sitemap.xml (Hugo generates this)
- Canonical URLs

---

## Implementation Notes

### Tech decisions
- **No JS frameworks.** Vanilla JS + CSS animations. The site is static and should stay fast
- **SCSS** for nesting and variables, compiled by Hugo Pipes
- **Hugo data files** (`data/*.yaml`) for projects and resume — easy to update without touching templates
- **Hugo partials** for each section — clean separation of concerns
- **Canvas for hero background** (if particle option chosen) — single small JS file, no dependencies

### File structure after upgrade
```
layouts/
  _default/
    baseof.html          # Master template
    single.html          # Blog post template
    list.html            # Blog index
  partials/
    head.html            # <head> with meta, CSS, fonts
    nav.html             # Sticky navigation
    hero.html            # Hero section
    about.html           # About section
    projects.html        # Projects grid
    resume.html          # Resume timeline
    blog-preview.html    # Latest posts section
    footer.html          # Footer with socials
    dark-mode.html       # Dark mode toggle + script
  shortcodes/
    rawhtml.html         # Keep existing
assets/
  css/
    main.scss            # All styles (or split into partials)
  js/
    main.js              # Scroll observer, nav, dark mode, hero bg
data/
  projects.yaml          # Project entries
  resume.yaml            # Resume data
content/
  posts/                 # Existing blog posts (keep as-is)
  _index.md              # Homepage content (bio text, tagline)
static/
  images/
    sam_on_beach.jpg     # Existing avatar
    projects/            # Project screenshots (if any)
```

### Placeholder content
- Sam will need to fill in real data for `projects.yaml` and `resume.yaml`
- Use realistic placeholder content during implementation so the design can be evaluated
- Mark all placeholder content with `<!-- TODO: Replace with real content -->` comments

### Order of implementation
1. Phase 1 (Foundation) — must come first, everything builds on it
2. Phase 3 (Hero) — immediate visual impact, validates the new direction
3. Phase 2 (Layout + Nav) — ties sections together
4. Phase 4 (Projects) — new content section
5. Phase 5 (Resume) — new content section
6. Phase 6 (Blog) — upgrade existing
7. Phase 7 (Polish) — micro-interactions
8. Phase 8 (Performance) — final optimization pass

---

## Success Criteria

- [ ] Site loads in < 2 seconds on 3G
- [ ] Lighthouse score > 90 on all categories
- [ ] All sections smoothly animate on scroll
- [ ] Dark/light mode works flawlessly with smooth transitions
- [ ] Fully responsive from 320px to 2560px
- [ ] Keyboard navigable, screen-reader friendly
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Zero JS framework dependencies
- [ ] Sam looks at it and says "whoa"
