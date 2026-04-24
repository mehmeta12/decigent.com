# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # TypeScript check + production build → dist/
npm run preview   # Serve the dist/ build locally
```

No test runner or linter is configured. `@types/react` and `@types/react-dom` are required devDependencies — they were missing from the initial setup and added later.

## Architecture

Single-page React app (Vite + TypeScript). The entire application lives in **`src/App.tsx`** — there is no router, no separate page files, and no component directory.

### Navigation model
Page state is managed with a `useState<Page>` hook. `Page` is a union type of Turkish string literals (`"Ana Sayfa"`, `"Hizmetler"`, `"Çözümler"`, `"Use Cases"`, `"About"`, `"Blog"`, `"Contact"`). Navigating to `"Hizmetler"`, `"Çözümler"`, or `"Use Cases"` resets state to `"Ana Sayfa"` and smooth-scrolls to the corresponding `id` on the home page. Other pages render their own full-screen `<section>`.

### Internationalisation
All copy is stored in a `copy` object keyed by `Lang = "tr" | "en"`. The active language is persisted to `localStorage` under `"decigent-lang"` and defaults to the browser locale. Data arrays (`services`, `solutions`, `useCasesList`, `blogPosts`) follow the same `{ tr: [...], en: [...] }` shape. When adding new copy, extend both language keys.

### Responsive layout
A `useIsMobile()` hook (defined in `App.tsx`, breakpoint 768px) drives all responsive layout decisions. Every grid that differs between mobile and desktop reads `isMobile` and switches `gridTemplateColumns` inline. Mobile header collapses to logo + lang toggle + hamburger button; the dropdown menu is controlled by `mobileMenuOpen` state.

### Styling
All styles are **inline `style={}`** objects. Tailwind CSS is installed and imported in `index.css` but not used anywhere — do not introduce Tailwind classes. Shared style tokens live in the `styles` object at module level (`styles.card`, `styles.buttonPrimary`, etc.). The IDE will show "CSS inline styles should not be used" warnings — these are expected and ignored by convention.

### Known issues to be aware of
- `framer-motion` and `lucide-react` are installed but unused.
- The `useCasesList` data array is defined but never rendered — the Use Cases section reuses `solutions` data instead.
- There is no URL routing; the browser back/forward buttons do not work and pages cannot be deep-linked.
