'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

export default function ShopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-orange-700 text-white p-4">
      {/* Top Navigation Links */}
      <div className="bg-orange-800 text-sm text-center p-2">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4">
            <Link href="/" className="hover:underline">HOME</Link>
            <Link href="/about-us" className="hover:underline">ABOUT US</Link>
            <Link href="/services" className="hover:underline">SERVICES</Link>
            <Link href="/news-and-insights" className="hover:underline">NEWS</Link>
            <Link href="/shop" className="hover:underline">SHOP</Link>
            <Link href="/careers" className="hover:underline">CAREERS</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center mt-2">
        {/* Logo and Contact Info */}
        <div className="flex items-center gap-4">
          <Image 
            src="/images/NAREE POWER 3B.png" 
            alt="Naree Power Logo" 
            width={400} 
            height={200}
            className="h-12 w-auto"
          />
          <div>
            <p>Email: sales@nareepower.co.ke</p>
            <p>Call: (+254)722863668 | (+254)722699112</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden w-96">
          <input
            type="text"
            placeholder="I'm shopping for..."
            className="p-2 text-black flex-1 focus:outline-none"
          />
          <button className="bg-black p-2">
            <FaSearch />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:underline">My Account</Link>
          <Link href="/wishlist" className="hover:underline">My Wishlist</Link>
          <div className="relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">0</span>
          </div>
        </div>
      </div>

      {/* Navigation Links with Dropdowns */}
      <div className="bg-orange-800 p-2 mt-2 flex justify-between items-center text-sm">
        <button 
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>Shop by Department</span>
        </button>
        {isMenuOpen && (
          <div className="absolute bg-orange-800 shadow-lg p-4 rounded mt-2">
            <Link href="/solar-panels" className="block py-1 hover:underline">Solar Panels</Link>
            <Link href="/solar-inverters" className="block py-1 hover:underline">Solar Inverters</Link>
            <Link href="/solar-batteries" className="block py-1 hover:underline">Solar Batteries</Link>
            <Link href="/solar-water-heaters" className="block py-1 hover:underline">Solar Water Heaters</Link>
            <Link href="/solar-outdoor-lights" className="block py-1 hover:underline">Solar Outdoor Lights</Link>
            <Link href="/solar-water-pumps" className="block py-1 hover:underline">Solar Water Pumps</Link>
          </div>
        )}
        
        <div className="flex gap-6">
          <div className="relative group">
            <Link href="/solar-panels" className="hover:underline">Solar Panels</Link>
            <div className="absolute hidden group-hover:block bg-orange-800 shadow-lg p-2 rounded mt-2">
              <Link href="/solar-panels/residential" className="block py-1 hover:underline">Residential</Link>
              <Link href="/solar-panels/commercial" className="block py-1 hover:underline">Commercial</Link>
            </div>
          </div>
          
          <div className="relative group">
            <Link href="/solar-inverters" className="hover:underline">Solar Inverters</Link>
            <div className="absolute hidden group-hover:block bg-orange-800 shadow-lg p-2 rounded mt-2">
              <Link href="/solar-inverters/hybrid" className="block py-1 hover:underline">Hybrid</Link>
              <Link href="/solar-inverters/off-grid" className="block py-1 hover:underline">Off-grid</Link>
            </div>
          </div>
          
          <div className="relative group">
            <Link href="/solar-batteries" className="hover:underline">Solar Batteries</Link>
            <div className="absolute hidden group-hover:block bg-orange-800 shadow-lg p-2 rounded mt-2">
              <Link href="/solar-batteries/lithium" className="block py-1 hover:underline">Lithium</Link>
              <Link href="/solar-batteries/lead-acid" className="block py-1 hover:underline">Lead Acid</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
