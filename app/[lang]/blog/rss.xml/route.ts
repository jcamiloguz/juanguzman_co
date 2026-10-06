import { getDictionary, hasLocale, locales } from "../../dictionaries";
import { getPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });

  const dict = await getDictionary(lang);
  const posts = await getPosts(lang);
  const blogUrl = `${SITE_URL}/${lang}/blog`;

  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${SITE_NAME} — ${dict.blog.title}`)}</title>
    <link>${blogUrl}</link>
    <description>${escape(dict.blog.subtitle)}</description>
    <language>${lang}</language>
    <atom:link href="${blogUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
