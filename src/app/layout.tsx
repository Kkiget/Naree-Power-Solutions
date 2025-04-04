import { type Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";
import PathnameProvider from "./components/PathnameProvider";
import { ShopProvider } from '@/modules/shop/context/ShopContext';
import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Naree Power Solutions",
  description: "Empowering Kenya with reliable energy solutions",
  icons: {
    icon: [
      {
        url: "/images/NAREE POWER 3A.svg",
        sizes: "96x96",
      },
      {
        url: "/images/NAREE POWER 3A.svg",
        sizes: "192x192",
      },
      {
        url: "/images/NAREE POWER 3A.svg", 
        sizes: "576x576",
      }
    ],
    apple: {
      url: "/images/NAREE POWER 3A.svg",
      sizes: "180x180",
      type: "image/svg+xml",
    },
    shortcut: { url: "/images/NAREE POWER 3A.svg" },
  },
  manifest: "/manifest.json",
  themeColor: "#FF7A00",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <PathnameProvider>
            <ShopProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </ShopProvider>
          </PathnameProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
