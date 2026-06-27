import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VMT26 | Velocity maimai Tournament 2026",
  description:
    "Official landing page for Velocity maimai Tournament 2026."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/vmt24/bg.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
