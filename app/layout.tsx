import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { productionSiteUrl, site } from "@/data/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(productionSiteUrl),
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} — Full-Stack Developer`,
  },
  description:
    `I am ${site.name}, a full-stack developer in Pakistan focused on React, Next.js, and TypeScript. Explore personal projects and code.`,
  openGraph: {
    title: `${site.name} — Full-Stack Developer`,
    description: "Full-stack development portfolio featuring independent React, Next.js, and Supabase projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-Stack Developer`,
    description: "Full-stack development portfolio featuring independent React, Next.js, and Supabase projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", geist.variable)} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[200] rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white focus:not-sr-only"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} className="grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}