import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/posts";
import { hasLocale, locales } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await Promise.all(locales.map((lang) => getPosts(lang)));
  return posts.flat().map(({ lang, slug }) => ({ lang, slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = hasLocale(lang) ? await getPost(lang, slug) : null;
  const title = post?.meta.title ?? SITE_NAME;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1c1917",
          color: "#fafaf9",
          borderBottom: "16px solid #c2410c",
        }}
      >
        <div style={{ fontSize: 32, color: "#c2410c", fontWeight: 700 }}>
          juanguzman.co/blog
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: "rgba(250,250,249,0.6)" }}>{SITE_NAME}</div>
      </div>
    ),
    size
  );
}
