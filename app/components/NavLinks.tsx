"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();

  return links.map(({ href, label }) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary ${
          active ? "text-primary" : "text-foreground/70"
        }`}
      >
        {label}
      </Link>
    );
  });
}
