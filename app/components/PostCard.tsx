import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

export function PostMetaLine({ post, minRead }: { post: PostMeta; minRead: string }) {
  return (
    <p className="text-sm text-foreground/50">
      <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time> &middot;{" "}
      {post.readingTime} {minRead}
    </p>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function PostCard({
  post,
  minRead,
  featured = false,
}: {
  post: PostMeta;
  minRead: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/${post.lang}/blog/${post.slug}`}
      className="group block rounded-xl border border-white/5 bg-background/40 p-5 transition-colors hover:border-primary/40"
    >
      {featured && post.cover && (
        <Image
          src={post.cover}
          alt=""
          width={1440}
          height={810}
          className="mb-5 aspect-video w-full rounded-lg object-cover"
        />
      )}
      <h3
        className={`font-bold tracking-tight transition-colors group-hover:text-primary ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>
      <p className="mt-2 leading-relaxed text-foreground/70">{post.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <PostMetaLine post={post} minRead={minRead} />
        <TagList tags={post.tags} />
      </div>
    </Link>
  );
}
