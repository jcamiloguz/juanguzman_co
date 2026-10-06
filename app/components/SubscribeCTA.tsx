import { SUBSTACK_URL } from "@/lib/site";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function SubscribeCTA({
  dict,
  variant = "full",
}: {
  dict: Dictionary["subscribe"];
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <a
        href={`${SUBSTACK_URL}/subscribe`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        {dict.button}
      </a>
    );
  }

  return (
    <section className="island mx-auto w-full max-w-3xl p-8 md:p-12">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tight">{dict.heading}</h2>
        <p className="mt-2 max-w-md text-foreground/60">{dict.text}</p>
        <iframe
          src={`${SUBSTACK_URL}/embed`}
          title={dict.heading}
          loading="lazy"
          className="mt-6 h-[320px] w-full max-w-md rounded-xl border border-white/10 bg-background"
        />
        <a
          href={`${SUBSTACK_URL}/subscribe`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-foreground/50 underline-offset-4 hover:text-primary hover:underline"
        >
          {dict.button} ↗
        </a>
      </div>
    </section>
  );
}
