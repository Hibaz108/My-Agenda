import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/DMSans-Regular.ttf",
  variable: "--font-dm-sans",
  display: "swap",
});

const neuton = localFont({
  src: "./fonts/Neuton-Regular.ttf",
  variable: "--font-neuton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My agenda",
  description:
    "Organize your tasks, manage your priorities, and keep track of your daily agenda with My Agenda.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${neuton.variable}`}>
      <body className="min-h-svh antialiased">{children}</body>
    </html>
  );
}
