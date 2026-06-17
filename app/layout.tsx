import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VMT26 Registration Portal",
  description: "Register for the VMT26 maimai tournament."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
