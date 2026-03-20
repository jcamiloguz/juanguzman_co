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
- **Fonts**: Geist Sans + Geist Mono loaded via `next/font/google`
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

Single-layout App Router project. All pages live under `app/` with a shared root layout (`app/layout.tsx`). Global styles in `app/globals.css` define CSS custom properties consumed by Tailwind's `@theme inline` block.
