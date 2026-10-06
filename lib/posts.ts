import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { locales, otherLocale, type Locale } from "./i18n";

export { formatDate } from "./format";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-10-05"
  tags?: string[];
  cover?: string;
  substackUrl?: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  lang: Locale;
  tags: string[];
  readingTime: number; // minutes
  hasTranslation: boolean;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

function postPath(lang: Locale, slug: string) {
  return path.join(BLOG_DIR, lang, `${slug}.mdx`);
}

function listSlugs(lang: Locale): string[] {
  const dir = path.join(BLOG_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readingTime(lang: Locale, slug: string): number {
  const source = fs.readFileSync(postPath(lang, slug), "utf8");
  const body = source.replace(/export const metadata = \{[\s\S]*?\n\}/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

async function loadModule(lang: Locale, slug: string) {
  return (await import(`@/content/blog/${lang}/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: PostFrontmatter;
  };
}

function isVisible(meta: PostFrontmatter) {
  return !meta.draft || process.env.NODE_ENV !== "production";
}

export function hasTranslation(lang: Locale, slug: string): boolean {
  return fs.existsSync(postPath(otherLocale(lang), slug));
}

async function buildMeta(lang: Locale, slug: string): Promise<PostMeta> {
  const { metadata } = await loadModule(lang, slug);
  return {
    ...metadata,
    tags: metadata.tags ?? [],
    slug,
    lang,
    readingTime: readingTime(lang, slug),
    hasTranslation: hasTranslation(lang, slug),
  };
}

export async function getPosts(lang: Locale): Promise<PostMeta[]> {
  const posts = await Promise.all(
    listSlugs(lang).map((slug) => buildMeta(lang, slug))
  );
  return posts
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(lang: Locale, slug: string) {
  if (!fs.existsSync(postPath(lang, slug))) return null;
  const { default: Component } = await loadModule(lang, slug);
  const meta = await buildMeta(lang, slug);
  if (!isVisible(meta)) return null;
  return { Component, meta };
}

export async function getAdjacentPosts(lang: Locale, slug: string) {
  const posts = await getPosts(lang);
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAllTags(posts: PostMeta[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}

/** Slugs that exist in every locale, used by the language switcher. */
export function getTranslatedSlugs(): string[] {
  const [first, ...rest] = locales.map((lang) => new Set(listSlugs(lang)));
  return [...first].filter((slug) => rest.every((set) => set.has(slug)));
}
