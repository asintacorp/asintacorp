import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Asinta Architects is a design & build firm founded through the partnership of two young Filipino architects united by a shared vision — to deliver contemporary architectural solutions that are innovative, functional, and contextually relevant.";

export const metadata: Metadata = {
  title: "Asinta Corp.",
  description,

  openGraph: {
    title: "Asinta Corp.",
    description,
    url: "https://asintacorp.vercel.app",
    siteName: "Asinta Corp.",
    images: [
      {
        url: "https://asintacorp.vercel.app/img/og_cover.webp",
        width: 1200,
        height: 630,
        alt: "Asinta Corp. Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Asinta Corp.",
    description,
    images: ["https://asintacorp.vercel.app/img/og_cover.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
