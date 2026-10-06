# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, core-web-vitals + typescript)
- No test framework is configured yet

## Tech Stack

- **Next.js 16.2** with App Router (React 19, TypeScript, strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss` plugin (uses `@theme inline` directive in globals.css)
- **Fonts**: Space Grotesk (headings) + DM Sans (body) loaded via `next/font/google`
- **MDX** via `@next/mdx` (plugins passed as strings for Turbopack); posts export `metadata` instead of frontmatter
- Path alias: `@/*` maps to project root

## Brand Guidelines (brand/brand.md)

| Role | Value |
|------|-------|
| Primary terracotta | `#c2410c` |
| Dark terracotta | `#9a3412` |
| Background dark | `#1c1917` |
| Background dark alt | `#292524` |
| Light neutral | `#fafaf9` |
| Headings font | Space Grotesk 700 |
| Body font | DM Sans 400/500 |

Brand images: `brand/portrait.png`, `brand/experience.png`

## Architecture

The root layout is `app/[lang]/layout.tsx` (there is no `app/layout.tsx`); it renders the shared Header/Footer. `proxy.ts` redirects locale-less paths to `/en` or `/es`. Locales live in `lib/i18n.ts`, UI copy in `app/[lang]/dictionaries/*.json`.

Blog posts are `content/blog/<lang>/<slug>.mdx`; `lib/posts.ts` lists them with `fs` and dynamically imports each module for its `metadata` export. A matching slug in both language folders marks a translation. All blog routes, RSS feeds, and OG images are statically generated.

Global styles in `app/globals.css` define CSS custom properties consumed by Tailwind's `@theme inline` block; long-form content uses `prose prose-invert prose-brand` (`@tailwindcss/typography`).
