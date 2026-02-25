import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabrina — Fotografa",
  description: "Portfolio fotografico di Sabrina. Concerti, eventi live, sport e motosport. Fotografia professionale.",
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
