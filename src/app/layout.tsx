import type { Metadata } from "next";
import { Playfair_Display, Outfit, Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { AuthProvider } from "@/components/Providers/AuthProvider";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const notoSerif = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ডেইলি মানারাহ | সত্য ও বস্তুনিষ্ঠ সংবাদ",
  description:
    "একটি আধুনিক, নির্ভুল ও নির্ভরযোগ্য সংবাদ মাধ্যম। সত্য খবর, অনুসন্ধানী প্রতিবেদন ও ফ্যাক্ট-চেক রিপোর্ট।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hind.variable} ${notoSerif.variable} ${outfit.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

