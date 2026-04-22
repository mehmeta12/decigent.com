import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grid Background Demo",
  description: "Component integration demo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
