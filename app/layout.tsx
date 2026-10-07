import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { productionSiteUrl } from "@/data/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(productionSiteUrl),
  title: {
    template: "%s | Web Maker",
    default: "Web Maker — Next.js websites",
  },
  description:
    "A personal web development portfolio featuring independent projects built while learning Next.js and full-stack development.",
  openGraph: {
    title: "Web Maker — Personal Web Development Portfolio",
    description: "Independent projects, experiments, and learning in web development.",
    type: "website",
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
          <Header />
          <main className="grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}