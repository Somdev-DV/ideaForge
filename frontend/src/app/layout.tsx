import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KrishiSetu AI - Multilingual Agritech & Resource Advisory Assistant",
  description: "Multilingual Agritech & Resource Advisory Assistant for Indian Farmers. Live Agmarknet mandi rates, generic pesticide savings, state govt subsidies, and weather rain guardrails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
