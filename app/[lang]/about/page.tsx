import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Timeline from "../../components/Timeline";
import SubscribeCTA from "../../components/SubscribeCTA";
import { getDictionary, hasLocale } from "../dictionaries";
import { languageAlternates } from "@/lib/seo";
import { techStack } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.aboutPage.title,
    description: dict.aboutPage.description,
    alternates: languageAlternates(lang, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { default: Story } = await import(`@/content/pages/about.${lang}.mdx`);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:py-16">
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <div className="flex items-center gap-5">
          <Image
            src="/portrait.png"
            alt="Juan Guzman"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover ring-2 ring-primary"
            priority
          />
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {dict.aboutPage.title}
          </h1>
        </div>
        <article className="prose prose-invert prose-brand mt-8 max-w-none">
          <Story />
        </article>
      </section>

      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold tracking-tight">{dict.stack.heading}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 px-4 py-1.5 text-sm font-medium text-[#c2410c]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">{dict.experience.heading}</h2>
        <Timeline entries={dict.experience.entries} />
      </section>

      <SubscribeCTA dict={dict.subscribe} />
    </div>
  );
}
