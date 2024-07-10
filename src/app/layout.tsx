import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Lucid",
  description: "(im)proved dream journal",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["lucid", "dream journal", "ai", "dreams"],
  authors: [
    { name: "Jason Korol" },
    {
      name: "Jason Korol",
      url: "https://www.linkedin.com/in/ejkorol"
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-right"/>
            {children}
        </Providers>
      </body>
    </html>
  );
}
