import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "政治DNA診断",
  description: "数分であなたに合った政党との一致度を診断します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${rounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
