import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // The site's own domain, so link previews and canonical URLs use it.
  metadataBase: new URL("https://www.studioshivdev.com"),
  alternates: { canonical: "./" },
  title: {
    default: "Studio Shivdev · Independent music label",
    template: "%s · Studio Shivdev",
  },
  description:
    "Studio Shivdev is an independent music label. Discover our artists and latest releases.",
  openGraph: {
    siteName: "Studio Shivdev",
    type: "website",
  },
};

// White browser bar on phones, to match the light pages.
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main" className="ds-skip">
          Skip to content
        </a>
        <SiteHeader />
        <main
          id="main"
          tabIndex={-1}
          className="w-full flex-1 outline-none"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
