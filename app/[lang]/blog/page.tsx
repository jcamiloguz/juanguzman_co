import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "../../components/PostCard";
import TagFilter from "../../components/TagFilter";
import SubscribeCTA from "../../components/SubscribeCTA";
import { getDictionary, hasLocale } from "../dictionaries";
import { getAllTags, getPosts } from "@/lib/posts";
import { otherLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: {
      ...languageAlternates(lang, "/blog"),
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await getPosts(lang);
  const [featured] = posts;
  const otherLangHasPosts = !featured && (await getPosts(otherLocale(lang))).length > 0;

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:py-16">
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{dict.blog.title}</h1>
            <p className="mt-3 max-w-md leading-relaxed text-foreground/70">{dict.blog.subtitle}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={`/${lang}/blog/rss.xml`}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:border-primary/50 hover:text-primary"
            >
              {dict.blog.rss}
            </a>
            <SubscribeCTA dict={dict.subscribe} variant="compact" />
          </div>
        </div>

        {featured ? (
          <div className="mt-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              {dict.blog.featured}
            </p>
            <PostCard post={featured} minRead={dict.blog.minRead} featured />
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-white/10 p-8 text-center">
            <p className="text-foreground/70">{dict.blog.empty}</p>
            {otherLangHasPosts && (
              <Link
                href={`/${otherLocale(lang)}/blog`}
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                {dict.blog.emptyCta}
              </Link>
            )}
          </div>
        )}
      </section>

      {posts.length > 0 && (
        <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
          <TagFilter
            posts={posts}
            tags={getAllTags(posts)}
            allLabel={dict.blog.allTags}
            minRead={dict.blog.minRead}
          />
        </section>
      )}
    </div>
  );
}
