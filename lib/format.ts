import type { Locale } from "./i18n";

export function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
