import Image from "next/image";
import TypeWriter from "../components/TypeWriter";
import Timeline from "../components/Timeline";
import LangSwitcher from "../components/LangSwitcher";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { notFound } from "next/navigation";

const techStack = [
  "Node.js",
  "JavaScript",
  "TypeScript",
  "React",
  "PostgreSQL",
  "AWS",
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:py-20">
      {/* Hero Island */}
      <section className="island relative mx-auto w-full max-w-3xl p-8 md:p-12">
        <div className="absolute right-4 top-4 md:right-6 md:top-6">
          <LangSwitcher lang={lang} />
        </div>
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
          </div>
        </div>
      </section>

      {/* About & Stack Island */}
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold tracking-tight">{dict.about.heading}</h2>
        <p className="mt-4 text-[#fafaf9]/80 leading-relaxed font-[family-name:var(--font-body)]">
          {dict.about.text}
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">{dict.stack.heading}</h2>
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

      {/* Newsletter Island */}
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight">{dict.newsletter.heading}</h2>
          <p className="mt-2 text-[#fafaf9]/60 max-w-md">
            {dict.newsletter.text}
          </p>
          <a
            href="https://juanguzmn.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-[#c2410c] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9a3412]"
          >
            {dict.newsletter.cta}
          </a>
        </div>
      </section>

      {/* Experience Timeline Island */}
      <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">{dict.experience.heading}</h2>
        <Timeline entries={dict.experience.entries} />
      </section>

      {/* Footer Island */}
      <footer className="island mx-auto w-full max-w-3xl p-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* GitHub */}
          <a
            href="https://github.com/juanguzman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fafaf9]/60 transition-colors hover:text-[#c2410c]"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/juanguzman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fafaf9]/60 transition-colors hover:text-[#c2410c]"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.893 20.452H3.781V9h3.112v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/juanguzman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fafaf9]/60 transition-colors hover:text-[#c2410c]"
            aria-label="X"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@juanguzman.co"
            className="text-[#fafaf9]/60 transition-colors hover:text-[#c2410c]"
            aria-label="Email"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-[#fafaf9]/40">
          &copy; {new Date().getFullYear()} Juan Guzman
        </p>
      </footer>
    </div>
  );
}
