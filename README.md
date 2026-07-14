# Lavanya — Portfolio Website

A responsive, accessible build of your Figma mockups (phone, tablet, desktop). Built with plain HTML and CSS, plus one small JavaScript file for the hamburger menu only.

## File structure

```
index.html              ← all the page content
css/style.css            ← all styling, organized in numbered sections with comments
js/script.js              ← hamburger menu logic only (open/close/keyboard)
assets/images/            ← placeholder images — swap these for your real files
case-studies/              ← empty folder for your future case study pages
```

## How the responsive layout works

Everything is **mobile-first**: the base CSS (no media query) is the phone layout. Two breakpoints adjust it from there:

- **560px and up** — Creative Lab grid goes from 1 to 2 columns.
- **1024px and up** — the desktop layout kicks in: full nav bar replaces the hamburger, hero text right-aligns, project rows go side-by-side, and the "Meet the Designer" / "What do I bring" sections become two columns.

You don't need separate phone/tablet/desktop files — it's all one `index.html` and one stylesheet that reflows at those two widths.

## Fixed elements (as requested)

- **Nav bar**: `position: fixed` in `.site-header`, so it stays in place on every breakpoint. `.hero` has matching top padding so content doesn't hide behind it.
- **Dot-grid background**: `.dot-grid-bg` is `position: fixed; inset: 0;` with `z-index: -1`, sitting behind all content. Because it's fixed to the viewport (not the page), it never scrolls — exactly like in your mockups.

## The hamburger / slide-in menu

On phone and tablet (below 1024px), the hamburger button toggles `#mobile-menu` open with a `translateX` slide-in transition (see `.mobile-menu` in the CSS). `js/script.js` handles:

- Opening/closing on click
- Closing on the **Escape** key
- Moving keyboard focus into the menu when it opens, and back to the hamburger button when it closes
- Trapping Tab key navigation inside the menu while it's open (so keyboard users can't tab to hidden content behind it)
- Locking page scroll while the menu is open

You shouldn't need to touch this file unless you want to change *how* the menu animates.

## Adding your real images

Every image is a placeholder `<img>` pointing at `assets/images/placeholder.svg` (or `flower-strip-placeholder.svg` for the flower strip). To swap one in:

1. Drop your real file into `assets/images/`
2. Update that `<img>` tag's `src` in `index.html` to your filename
3. Update the `alt` text to describe the image (leave it as `alt=""` only for purely decorative images, which are already marked that way)

The boxes are sized with `aspect-ratio` and `object-fit: cover` in the CSS, so your photos will crop to fit nicely no matter their original dimensions — no layout shift.

**Flower strip**: this is set up as a fixed-height container with `overflow: hidden` and the image set to `object-fit: cover`. Drop your flower gif in and it'll fill the strip. If you'd rather pan a wide strip horizontally with GSAP instead of cropping it, there's a comment in `css/style.css` right above `.flower-strip img` showing the one-line CSS swap to make that possible.

## Case study links

The project headings (Samsung, Soda Shake Race, Boroline) are already wrapped in `<a>` tags pointing to:

```
case-studies/samsung.html
case-studies/soda-shake-race.html
case-studies/boroline.html
```

Those pages don't exist yet — create them in the `case-studies/` folder whenever each case study is ready, using the same `css/style.css` for consistent styling.

## Hooking up GSAP later

Search `js/script.js` and `css/style.css` for the comment **"GSAP HOOK"** — those mark the spots most worth animating:

- Flower strip panning
- Mobile menu open/close transition
- Project cards and Creative Lab items have a `data-gsap` attribute already on them, ready for `gsap.from(...)` scroll-triggered reveals without touching the HTML structure.

Since this is plain HTML/CSS, you can add GSAP at any point by linking the CDN script in `index.html` and writing a separate `js/animations.js` file — no need to restructure anything here.

## Accessibility (WCAG) notes

- Semantic landmarks throughout (`header`, `nav`, `main`, `section`, `article`)
- One `<h1>` per page, with a logical heading order down to `<h2>`/`<h3>`
- A "Skip to main content" link, visible on keyboard focus, for screen-reader and keyboard users
- Visible focus outlines on every link and button (`:focus-visible`)
- Decorative images (flowers, icons) use `alt=""` and `aria-hidden="true"` so screen readers skip them; meaningful images have descriptive `alt` text for you to refine
- The hamburger menu uses `aria-expanded`, `aria-hidden`, `role="dialog"`, focus trapping, and Escape-to-close
- Base font size is 16px (1rem) with `rem`-based scaling throughout, so the page respects a user's browser zoom/text-size settings
- All text/background combinations meet WCAG AA contrast
- `prefers-reduced-motion` is respected — anyone with that OS setting turned on gets all transitions and smooth-scrolling reduced automatically (worth re-checking once you add GSAP, since GSAP timelines don't obey this automatically)

## The one font

`Urbanist` is loaded from Google Fonts in the `<head>` of `index.html` and set as `--font-base` in `css/style.css`. It's the only font referenced anywhere in the project.
