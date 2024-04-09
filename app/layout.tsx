import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "./(main)/header";
import { Toaster } from "@/components/ui/sonner";

const worksans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stickers ai",
  description: "Generated stickers with ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={worksans.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto mt-16 px-4">{children}</main>
        </div>
      </body>
      <Toaster
        icons={{
          success: "✅",
          error: "❌",
        }}
      />
    </html>
  );
}
