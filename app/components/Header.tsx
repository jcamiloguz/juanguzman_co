import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import NavLinks from "./NavLinks";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export default function Header({
  lang,
  dict,
  translatedSlugs,
}: {
  lang: Locale;
  dict: Dictionary;
  translatedSlugs: string[];
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${lang}`} className="font-heading text-lg font-bold tracking-tight">
          Juan Guzman<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLinks
            links={[
              { href: `/${lang}/blog`, label: dict.nav.blog },
              { href: `/${lang}/about`, label: dict.nav.about },
            ]}
          />
          <LangSwitcher lang={lang} translatedSlugs={translatedSlugs} />
        </nav>
      </div>
    </header>
  );
}
