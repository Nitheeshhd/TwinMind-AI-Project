import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TwinMind AI",
  description: "Transcript, suggestions, and chat workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--app-background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
