import type { Metadata } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--f-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--f-jet",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geist = Geist({
  variable: "--f-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--f-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--f-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Josh Karol",
  description: "Co-founder + CTO @ CrowdVolt. Design engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&f[]=general-sans@300,400,500,600&f[]=satoshi@300,400,500,700&display=swap"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${geist.variable} ${geistMono.variable} ${inter.variable} antialiased bg-deep text-primary`}
        style={
          {
            "--font-display": "'Satoshi', sans-serif",
            "--font-mono": "'Satoshi', sans-serif",
          } as React.CSSProperties
        }
      >
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
