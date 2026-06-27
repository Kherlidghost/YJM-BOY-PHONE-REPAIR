import type { Metadata } from "next";
import { AppChrome } from "@/components/AppChrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yjm-boy-phone-repair.vercel.app"),
  title: "YJM BOY Phone Repair and Accessories",
  description:
    "Professional phone repair, quality accessories, and mobile repair tools in Biu, Borno State.",
  keywords: [
    "phone repair Biu",
    "phone accessories Biu",
    "phone repair tools",
    "YJM BOY",
    "screen replacement",
    "battery replacement",
  ],
  openGraph: {
    title: "YJM BOY Phone Repair and Accessories",
    description:
      "Professional phone repair, quality accessories, and mobile repair tools in Biu, Borno State.",
    type: "website",
    siteName: "YJM BOY Phone Repair and Accessories",
    locale: "en_NG",
    url: "https://yjm-boy-phone-repair.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "YJM BOY Phone Repair and Accessories",
    description:
      "Professional phone repair, quality accessories, and mobile repair tools in Biu, Borno State.",
  },
  category: "local business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
