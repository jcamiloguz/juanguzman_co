# juanguzman.co

My personal website, blog, and portfolio — a bilingual (English / Spanish) site
built with the Next.js App Router. It has a short intro, a blog written in MDX,
an About page with my story and experience, and my Substack newsletter.

🔗 **Live:** [juanguzman.co](https://juanguzman.co)

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — App Router, React 19, TypeScript (strict mode)
- **[Tailwind CSS 4](https://tailwindcss.com)** — via `@tailwindcss/postcss`, using the `@theme inline` directive
- **Internationalization** — locale-based routing (`/en`, `/es`) with JSON dictionaries
- **Blog** — MDX via `@next/mdx`, with `remark-gfm`, `rehype-slug`, and `rehype-pretty-code` (Shiki)
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
    page.tsx              # Home: intro, latest posts, newsletter
    about/page.tsx        # About: story (MDX), stack, experience timeline
    blog/page.tsx         # Blog index: featured post, tag filter, archive
    blog/[slug]/          # Post page + generated Open Graph image
    blog/rss.xml/         # RSS feed per language
    layout.tsx            # Root layout: fonts, header, footer, metadata
    dictionaries/         # UI copy (en.json, es.json)
  components/             # Header, Footer, PostCard, TagFilter, SubscribeCTA, …
  sitemap.ts, robots.ts
content/
  blog/en/*.mdx           # English posts
  blog/es/*.mdx           # Spanish posts (same slug = translation)
  pages/about.{en,es}.mdx # About page story
lib/                      # posts loader, i18n, site constants, SEO helpers
mdx-components.tsx        # Components available inside MDX (Callout, links, images)
proxy.ts                  # Locale detection & redirect
```

UI copy lives in `app/[lang]/dictionaries/{en,es}.json`; long-form writing lives in `content/`.

## Publishing a post

1. Copy `content/blog/_template/post.mdx` (it shows every component) to `content/blog/<lang>/<slug>.mdx`,
   remove `draft: true`, and fill in the metadata:

   ```mdx
   export const metadata = {
     title: "My post",
     description: "One-sentence summary shown in lists and previews.",
     date: "2026-10-05",
     tags: ["backend"],
     // cover: "/blog/my-post/cover.png",  // optional, put images in public/blog/<slug>/
     // draft: true,                       // hidden in production builds
   }

   Your content here. Use <Callout>…</Callout> for highlighted notes.
   ```

   To translate a post, add a file with the **same slug** in the other language folder.
   The post will show a "Read in …" link and the language switcher will jump between them.

2. Commit and push. The post is live at `/<lang>/blog/<slug>` and in the RSS feed.

### Writing toolkit

Everything from Markdown + GitHub-flavored Markdown works (tables, task lists, strikethrough), plus:

````mdx
<Callout>A highlighted note. Change the icon with emoji="⚠️".</Callout>

```ts title="retry.ts" {2-4}
// Syntax highlighted with Shiki. {2-4} highlights lines 2 to 4,
// and title="…" adds a filename caption.
```

Inline `code`, [internal links](/en/about) and ![images](/blog/my-post/diagram.png "Optional caption")
````

Components available in every post are defined in `mdx-components.tsx`; add new ones there.

### Cross-posting to Substack

The site is the canonical home; Substack delivers posts by email.

1. Wait 1–3 days after publishing on the site so search engines index the original first.
2. Open the live post, copy the rendered article, and paste it into a new Substack post.
   Add at the top: *Originally published at juanguzman.co/&lt;lang&gt;/blog/&lt;slug&gt;*.
3. Publish on Substack, then add `substackUrl: "https://juanguzmn.substack.com/p/…"` to the
   post's metadata and push. The post will show a "Join the discussion on Substack" link.

## Internationalization

Requests without a locale prefix are redirected to the best match by `proxy.ts`,
which reads the `Accept-Language` header and falls back to English. Supported
locales: `en`, `es`.

## License

Personal project — all rights reserved. Feel free to draw inspiration, but please
don't republish the content or assets as your own.
