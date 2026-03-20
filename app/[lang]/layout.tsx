import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "./dictionaries";
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

export const metadata: Metadata = {
  title: "Juan Guzman — Software Engineer",
  description:
    "Software Engineer specializing in backend development, microservices architecture, and cloud infrastructure.",
};

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

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
