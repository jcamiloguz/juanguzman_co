"use client";

import { useEffect, useRef } from "react";

export interface TimelineEntry {
  title: string;
  company: string;
  period: string;
  location: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = container.querySelectorAll(".timeline-entry");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative ml-4">
      {/* Vertical line */}
      <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#c2410c] via-[#c2410c]/40 to-transparent" />

      <div className="flex flex-col gap-8">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="timeline-entry relative pl-8"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Dot */}
            <div className="timeline-dot absolute left-0 top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-[#c2410c] border-2 border-[#292524]" />

            <h3 className="text-lg font-bold text-[#fafaf9]">
              {entry.title}
            </h3>
            <p className="text-[#c2410c] font-medium">{entry.company}</p>
            <p className="text-sm text-[#fafaf9]/60">
              {entry.period} &middot; {entry.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
