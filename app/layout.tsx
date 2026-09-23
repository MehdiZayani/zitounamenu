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

export const metadata: Metadata = {
  metadataBase: new URL("https://zitounamenu.vercel.app"),
  title: "Menu Zitouna",
  description: "Menu Zitouna - Café & Restaurant",
  icons: {
    icon: [
      { url: "/logozitouna.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logozitouna.png",
    apple: [
      { url: "/logozitouna.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Menu Zitouna",
    description: "Menu Zitouna - Café & Restaurant",
    images: [{ url: "/logozitouna.png", width: 512, height: 512, alt: "Zitouna" }],
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
