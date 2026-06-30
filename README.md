# juanguzman.co

My personal website and portfolio — a bilingual (English / Spanish) single-page site
built with the Next.js App Router. It showcases my work as a software engineer:
a short bio, tech stack, an experience timeline, and links to my socials and newsletter.

🔗 **Live:** [juanguzman.co](https://juanguzman.co)

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — App Router, React 19, TypeScript (strict mode)
- **[Tailwind CSS 4](https://tailwindcss.com)** — via `@tailwindcss/postcss`, using the `@theme inline` directive
- **Internationalization** — locale-based routing (`/en`, `/es`) with JSON dictionaries
- **Fonts** — Space Grotesk (headings) + DM Sans (body), via `next/font/google`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to your
preferred locale (`/en` or `/es`) based on your browser's `Accept-Language` header.

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint (core-web-vitals + TS) |

## Project Structure

```
app/
  [lang]/
    page.tsx              # Home page (composed from sections)
    layout.tsx            # Root layout + fonts
    dictionaries.ts       # Loads the active locale dictionary
    dictionaries/
      en.json             # English content
      es.json             # Spanish content
  components/
    LangSwitcher.tsx      # EN / ES toggle
    Timeline.tsx          # Experience timeline
    TypeWriter.tsx        # Animated title rotation
  globals.css             # Tailwind theme + global styles
proxy.ts                  # Locale detection & redirect
brand/                    # Brand assets and guidelines
```

All site copy lives in `app/[lang]/dictionaries/{en,es}.json`, so updating content
(titles, about text, experience entries) doesn't require touching components.

## Internationalization

Requests without a locale prefix are redirected to the best match by `proxy.ts`,
which reads the `Accept-Language` header and falls back to English. Supported
locales: `en`, `es`.

## License

Personal project — all rights reserved. Feel free to draw inspiration, but please
don't republish the content or assets as your own.
