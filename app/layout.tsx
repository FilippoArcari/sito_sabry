import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabrina Toso — Fotografa",
  description: "Portfolio fotografico di Sabrina Toso. Concerti, eventi live, sport e motosport. Fotografia professionale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
