import type { Metadata } from "next";
import { Caveat, Quicksand } from "next/font/google";
import "./globals.css";

const handwritten = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rounded = Quicksand({
  variable: "--font-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "For My Universe ❤️",
  description: "A digital scrapbook made with love. I am truly sorry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${handwritten.variable} ${rounded.variable} h-full antialiased`}
    >
      <body className="min-h-full font-rounded bg-[#FDFBF7] text-[#4A4A4A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

