import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline}. ${site.quote} Handcrafted crochet flowers, bouquets, and gifts. ${site.locations.join(" & ")}.`,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.quote,
    type: "website",
  },
  icons: {
    icon: [{ url: "/bloomcraftco_circular_icon.svg", type: "image/svg+xml" }],
    apple: "/bloomcraftco_circular_icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-stone-800 pb-[env(safe-area-inset-bottom,0px)]">
        {children}
      </body>
    </html>
  );
}
