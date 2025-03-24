'use client';

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Bars3Icon } from "@/components/icons";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/our-work" },
    { name: "News", href: "/news-and-insights" },
    { name: "Careers", href: "/careers" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
                <Image
                  src="/images/NAREE POWER 3A.svg"
                  alt="Naree Power Logo"
                  width={60}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
                <span className="text-2xl font-semibold text-gray-900">NAREE POWER</span>
              </a>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="/contact-us"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Contact Us
              </a>
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
