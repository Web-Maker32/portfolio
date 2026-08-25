import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    template: "%s | Next Portfolio",
    default: "Next Portfolio",
  },
  description: "A personal portfolio showcasing modern full-stack web work.",
  openGraph: {
    title: "Next Portfolio",
    description: "Full-stack developer portfolio built with Next.js.",
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