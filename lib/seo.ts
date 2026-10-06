import { locales } from "./i18n";

/**
 * Canonical + hreflang alternates for a path that exists in every locale.
 * `path` is relative to the locale prefix, e.g. "/blog".
 */
export function languageAlternates(lang: string, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  };
}
