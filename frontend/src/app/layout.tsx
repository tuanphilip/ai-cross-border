import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Product Opportunity Hub | Printway R&D",
  description: "AI-Powered Product Opportunity & R&D Intelligence Platform for Print On Demand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className={`${lexend.variable} font-sans min-h-screen antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
