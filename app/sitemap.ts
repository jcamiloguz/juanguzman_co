import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const pages = ["", "/about", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${lang}${page}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${page}`])),
      },
    }))
  );

  const postEntries = (
    await Promise.all(locales.map((lang) => getPosts(lang)))
  ).flatMap((posts) =>
    posts.map((post) => {
      const url = `${SITE_URL}/${post.lang}/blog/${post.slug}`;
      return {
        url,
        lastModified: new Date(post.date),
        alternates: post.hasTranslation
          ? {
              languages: Object.fromEntries(
                locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
              ),
            }
          : undefined,
      };
    })
  );

  return [...staticEntries, ...postEntries];
}
