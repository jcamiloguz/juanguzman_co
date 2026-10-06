import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

function Anchor({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

export function Callout({ children, emoji = "💡" }: { children: ReactNode; emoji?: string }) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-foreground/90">
      <span aria-hidden>{emoji}</span>
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
}

const components: MDXComponents = {
  a: Anchor,
  img: ({ alt = "", ...props }) => (
    <Image
      sizes="(max-width: 768px) 100vw, 720px"
      width={1440}
      height={810}
      className="rounded-xl"
      alt={alt}
      {...(props as Omit<ImageProps, "alt">)}
    />
  ),
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
