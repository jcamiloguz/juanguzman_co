import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import { getTranslatedSlugs } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s — ${SITE_NAME}` },
    description: dict.meta.description,
    openGraph: { siteName: SITE_NAME, locale: lang, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header lang={lang} dict={dict} translatedSlugs={getTranslatedSlugs()} />
        <main className="flex flex-1 flex-col">{children}</main>
        <div className="px-4 pb-12">
          <Footer />
        </div>
      </body>
    </html>
  );
}
