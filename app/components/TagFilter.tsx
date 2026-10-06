"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import Link from "next/link";

export default function TagFilter({
  posts,
  tags,
  allLabel,
  minRead,
}: {
  posts: PostMeta[];
  tags: string[];
  allLabel: string;
  minRead: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  // Restore ?tag= on load without forcing the page to render dynamically.
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get("tag");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL is only possible after hydration
    if (tag && tags.includes(tag)) setActive(tag);
  }, [tags]);

  function select(tag: string | null) {
    setActive(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    window.history.replaceState(null, "", url);
  }

  const visible = active ? posts.filter((post) => post.tags.includes(active)) : posts;
  const byYear = new Map<string, PostMeta[]>();
  for (const post of visible) {
    const year = post.date.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  const chip = (selected: boolean) =>
    `rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
      selected
        ? "border-primary bg-primary text-white"
        : "border-white/10 text-foreground/70 hover:border-primary/50 hover:text-primary"
    }`;

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group">
          <button type="button" className={chip(active === null)} onClick={() => select(null)} aria-pressed={active === null}>
            {allLabel}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={chip(active === tag)}
              onClick={() => select(tag)}
              aria-pressed={active === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-10">
        {[...byYear].map(([year, yearPosts]) => (
          <section key={year}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-foreground/40">{year}</h2>
            <ul className="divide-y divide-white/5">
              {yearPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.lang}/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <time dateTime={post.date} className="shrink-0 text-sm text-foreground/50 sm:w-28">
                      {formatDate(post.date, post.lang)}
                    </time>
                    <span className="flex-1">
                      <span className="block font-medium transition-colors group-hover:text-primary">{post.title}</span>
                      <span className="mt-1 block text-sm text-foreground/60">{post.description}</span>
                    </span>
                    <span className="shrink-0 text-sm text-foreground/40">
                      {post.readingTime} {minRead}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
