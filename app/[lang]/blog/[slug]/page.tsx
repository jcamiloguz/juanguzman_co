import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMetaLine, TagList } from "../../../components/PostCard";
import SubscribeCTA from "../../../components/SubscribeCTA";
import { getDictionary, hasLocale } from "../../dictionaries";
import { getAdjacentPosts, getPost, getPosts, type PostMeta } from "@/lib/posts";
import { locales, otherLocale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

// Generates lang + slug together: if a parent locale yields no slugs (e.g. a post
// that only exists in English), Next drops the child params for every locale.
export async function generateStaticParams() {
  const posts = await Promise.all(locales.map((lang) => getPosts(lang)));
  return posts.flat().map(({ lang, slug }) => ({ lang, slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getPost(lang, slug);
  if (!post) return {};
  const { meta } = post;
  const url = `/${lang}/blog/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: meta.hasTranslation
        ? { [lang]: url, [otherLocale(lang)]: `/${otherLocale(lang)}/blog/${slug}` }
        : undefined,
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url,
      publishedTime: meta.date,
      authors: [SITE_NAME],
      tags: meta.tags,
      ...(meta.cover && { images: [meta.cover] }),
    },
  };
}

function AdjacentLink({ post, label, align }: { post: PostMeta | null; label: string; align: "left" | "right" }) {
  if (!post) return <div />;
  return (
    <Link
      href={`/${post.lang}/blog/${post.slug}`}
      className={`group rounded-xl border border-white/5 p-4 transition-colors hover:border-primary/40 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">{label}</span>
      <span className="mt-1 block font-medium transition-colors group-hover:text-primary">{post.title}</span>
    </Link>
  );
}

export default async function PostPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const { Component: Post, meta } = post;
  const { newer, older } = await getAdjacentPosts(lang, slug);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:py-16">
      <article className="island mx-auto w-full max-w-3xl p-6 sm:p-8 md:p-12">
        <Link href={`/${lang}/blog`} className="text-sm font-medium text-foreground/60 hover:text-primary">
          {dict.blog.backToBlog}
        </Link>

        <header className="mt-8">
          <TagList tags={meta.tags} />
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">{meta.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">{meta.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-white/5 py-4">
            <div className="flex items-center gap-3">
              <Image src="/portrait.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{SITE_NAME}</p>
                <PostMetaLine post={meta} minRead={dict.blog.minRead} />
              </div>
            </div>
            {meta.hasTranslation && (
              <Link
                href={`/${otherLocale(lang)}/blog/${slug}`}
                hrefLang={otherLocale(lang)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/70 transition-colors hover:border-primary/50 hover:text-primary"
              >
                {dict.blog.readIn}
              </Link>
            )}
          </div>
        </header>

        {meta.cover && (
          <Image
            src={meta.cover}
            alt=""
            width={1440}
            height={810}
            priority
            className="mt-8 aspect-video w-full rounded-xl object-cover"
          />
        )}

        <div className="prose prose-invert prose-brand mt-10 max-w-none">
          <Post />
        </div>

        {meta.substackUrl && (
          <a
            href={meta.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block font-medium text-primary hover:underline underline-offset-4"
          >
            {dict.blog.discussOnSubstack}
          </a>
        )}
      </article>

      <SubscribeCTA dict={dict.subscribe} />

      {(newer || older) && (
        <nav className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          <AdjacentLink post={older} label={dict.blog.older} align="left" />
          <AdjacentLink post={newer} label={dict.blog.newer} align="right" />
        </nav>
      )}
    </div>
  );
}
