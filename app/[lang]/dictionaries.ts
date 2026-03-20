import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["en", "es"];

export function hasLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
