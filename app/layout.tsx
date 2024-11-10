import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import MoviesProvider from "../providers/MoviesProvider";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Star Wars Saga",
  description: "Star Wars movies and characters",
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
        <MoviesProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
            {children}
          </Suspense>
        </MoviesProvider>
      </body >
    </html >
  );
}
