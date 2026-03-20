"use client";

import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  en: "EN",
  es: "ES",
};

export default function LangSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const otherLang = lang === "en" ? "es" : "en";
  const newPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  return (
    <a
      href={newPath}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-[#fafaf9]/60 transition-colors hover:border-[#c2410c]/50 hover:text-[#c2410c]"
    >
      {labels[otherLang]}
    </a>
  );
}
