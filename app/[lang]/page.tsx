import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TypeWriter from "../components/TypeWriter";
import PostCard from "../components/PostCard";
import SubscribeCTA from "../components/SubscribeCTA";
import { getDictionary, hasLocale } from "./dictionaries";
import { getPosts } from "@/lib/posts";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: languageAlternates(lang, "") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const latest = (await getPosts(lang)).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:py-16">
      {/* Hero Island */}
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Portrait */}
          <div className="shrink-0">
            <div className="h-40 w-40 rounded-full ring-4 ring-[#c2410c] ring-offset-4 ring-offset-[#292524] overflow-hidden">
              <Image
                src="/portrait.png"
                alt="Juan Guzman"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Juan Guzman
            </h1>
            <div className="mt-3 text-xl md:text-2xl">
              <TypeWriter strings={dict.titles} />
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-foreground/70">
              {dict.hero.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts Island */}
      {latest.length > 0 && (
        <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{dict.home.latest}</h2>
            <Link href={`/${lang}/blog`} className="text-sm font-medium text-primary hover:underline underline-offset-4">
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} minRead={dict.blog.minRead} />
            ))}
          </div>
        </section>
      )}

      <SubscribeCTA dict={dict.subscribe} />

      {/* About Teaser Island */}
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold tracking-tight">{dict.about.heading}</h2>
        <p className="mt-4 leading-relaxed text-foreground/80">{dict.about.text}</p>
        <p className="mt-2 leading-relaxed text-foreground/60">{dict.home.aboutTeaser}</p>
        <Link
          href={`/${lang}/about`}
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          {dict.home.aboutCta}
        </Link>
      </section>
    </div>
  );
}
