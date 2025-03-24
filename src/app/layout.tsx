import { type Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Naree Power Solutions",
  description: "Empowering Africa with reliable energy solutions",
  icons: {
    icon: "/images/NAREE POWER 3A.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
