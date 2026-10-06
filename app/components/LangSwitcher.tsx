"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  en: "EN",
  es: "ES",
};

export default function LangSwitcher({
  lang,
  translatedSlugs,
}: {
  lang: string;
  translatedSlugs: string[];
}) {
  const pathname = usePathname();
  const otherLang = lang === "en" ? "es" : "en";
  let newPath = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${otherLang}`);

  // Posts may not exist in the other language; fall back to the blog index.
  const post = pathname.match(/^\/[^/]+\/blog\/([^/]+)$/);
  if (post && !translatedSlugs.includes(post[1])) {
    newPath = `/${otherLang}/blog`;
  }

  return (
    <Link
      href={newPath}
      hrefLang={otherLang}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-[#fafaf9]/60 transition-colors hover:border-[#c2410c]/50 hover:text-[#c2410c]"
    >
      {labels[otherLang]}
    </Link>
  );
}
