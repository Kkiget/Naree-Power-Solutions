import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Static Website",
  description: "A modern static website built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-800">
                  Your Logo
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/about-us" className="text-gray-600 hover:text-gray-900">About Us</a>
                <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
                <a href="/our-work" className="text-gray-600 hover:text-gray-900">Our Work</a>
                <a href="/news" className="text-gray-600 hover:text-gray-900">News</a>
                <a href="/careers" className="text-gray-600 hover:text-gray-900">Careers</a>
                <a href="/shop" className="text-gray-600 hover:text-gray-900">Shop</a>
                <a href="/contact-us" className="text-gray-600 hover:text-gray-900">Contact Us</a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500"> {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
