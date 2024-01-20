import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { details } from "../../details";

const montSerrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: details.title,
  description: details.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montSerrat.className}>{children}</body>
    </html>
  );
}
