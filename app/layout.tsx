import type { Metadata } from "next";
import { Roboto, Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next Blog",
    default: "Next Blog"
  },
  description: "A premium modern blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100`}
      >
        <Providers>
          <Header />
          <main className="grow container mx-auto px-4 py-8 mt-12">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}