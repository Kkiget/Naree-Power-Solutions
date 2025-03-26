'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

export default function ShopNavigation() {
  return (
    <>
      {/* Top Support Bar */}
      <div className="bg-orange-600 text-white py-1 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <span>
            Need Quick Support?{' '}
            <a href="mailto:sales@solarshop.co.ke" className="font-bold hover:underline">
              Send Us an Email
            </a>
          </span>
          <span>
            Call Us Now: (+254) 722863668 | (+254) 722699112
          </span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-orange-500">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/images/NAREE POWER 3B.png" 
              alt="Naree Power Logo" 
              width={400} 
              height={200}
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/shop" className="text-white font-bold hover:text-white/80 transition-colors">
              SHOP BY DEPARTMENT
            </Link>
            <Link href="/solar-panels" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR PANELS
            </Link>
            <Link href="/solar-inverters" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR INVERTERS
            </Link>
            <Link href="/solar-batteries" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR BATTERIES
            </Link>
            <Link href="/solar-water-heaters" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR WATER HEATERS
            </Link>
            <Link href="/solar-outdoor-lights" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR OUTDOOR LIGHTS
            </Link>
            <Link href="/solar-water-pumps" className="text-white font-bold hover:text-white/80 transition-colors">
              SOLAR WATER PUMPS
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg p-1">
            <input
              type="text"
              placeholder="I'm shopping for..."
              className="border-none px-2 py-1 outline-none"
            />
            <button className="text-orange-500">
              <FaSearch />
            </button>
          </div>

          {/* Cart Section */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white hover:text-white/80 transition-colors">
              Login | My Account
            </Link>
            <Link href="/wishlist" className="text-white hover:text-white/80 transition-colors">
              Favorite | My Wishlist
            </Link>
            <Link href="/cart" className="text-white hover:text-white/80 transition-colors">
              🛒 Your Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
