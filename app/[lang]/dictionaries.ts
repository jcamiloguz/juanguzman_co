import "server-only";
import { locales, hasLocale, type Locale } from "@/lib/i18n";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export { locales, hasLocale };
export type { Locale };
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
