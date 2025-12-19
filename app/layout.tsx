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
  title: "Menu Zitouna",
  description: "Menu Zitouna",
  icons: {
    icon: [
      { url: "/logozitouna.png", type: "image/png", sizes: "512x512" },
      { url: "/logozitouna.jpg", type: "image/jpeg" },
    ],
    shortcut: "/logozitouna.png",
    apple: "/logozitouna.png",
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
