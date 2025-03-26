'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'News', href: '/news' },
    { name: 'Careers', href: '/careers' },
  ];

  const shopNavigation = [
    { name: 'Shop by Department', href: '/shop', hasDropdown: true },
    { name: 'Solar Panels', href: '/solar-panels', hasDropdown: true },
    { name: 'Solar Inverters', href: '/solar-inverters', hasDropdown: true },
    { name: 'Solar Batteries', href: '/solar-batteries', hasDropdown: true },
    { name: 'Solar Water Heaters', href: '/solar-water-heaters', hasDropdown: true },
    { name: 'Solar Outdoor Lights', href: '/solar-outdoor-lights', hasDropdown: true },
    { name: 'Solar Water Pumps', href: '/solar-water-pumps', hasDropdown: true },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/NAREE POWER 3A.svg"
                alt="Naree Power Solutions"
                width={100}
                height={100}
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Shop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {shopNavigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary-600"
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="absolute hidden group-hover:block mt-2 bg-white shadow-lg rounded-md">
                    {item.name === 'Shop by Department' ? (
                      <div className="p-2">
                        <Link href="/solar-panels" className="block px-3 py-1 hover:bg-gray-100">Solar Panels</Link>
                        <Link href="/solar-inverters" className="block px-3 py-1 hover:bg-gray-100">Solar Inverters</Link>
                        <Link href="/solar-batteries" className="block px-3 py-1 hover:bg-gray-100">Solar Batteries</Link>
                        <Link href="/solar-water-heaters" className="block px-3 py-1 hover:bg-gray-100">Solar Water Heaters</Link>
                        <Link href="/solar-outdoor-lights" className="block px-3 py-1 hover:bg-gray-100">Solar Outdoor Lights</Link>
                        <Link href="/solar-water-pumps" className="block px-3 py-1 hover:bg-gray-100">Solar Water Pumps</Link>
                      </div>
                    ) : (
                      <div className="p-2">
                        {item.name === 'Solar Panels' ? (
                          <>
                            <Link href="/solar-panels/residential" className="block px-3 py-1 hover:bg-gray-100">Residential</Link>
                            <Link href="/solar-panels/commercial" className="block px-3 py-1 hover:bg-gray-100">Commercial</Link>
                          </>
                        ) : item.name === 'Solar Inverters' ? (
                          <>
                            <Link href="/solar-inverters/hybrid" className="block px-3 py-1 hover:bg-gray-100">Hybrid</Link>
                            <Link href="/solar-inverters/off-grid" className="block px-3 py-1 hover:bg-gray-100">Off-grid</Link>
                          </>
                        ) : item.name === 'Solar Batteries' ? (
                          <>
                            <Link href="/solar-batteries/lithium" className="block px-3 py-1 hover:bg-gray-100">Lithium</Link>
                            <Link href="/solar-batteries/lead-acid" className="block px-3 py-1 hover:bg-gray-100">Lead Acid</Link>
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search and Cart */}
          <div className="flex items-center">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden w-96">
              <input
                type="text"
                placeholder="I'm shopping for..."
                className="p-2 text-black flex-1 focus:outline-none"
              />
              <button className="bg-primary-600 p-2">
                <FaSearch color="white" />
              </button>
            </div>

            {/* Cart */}
            <div className="ml-4 relative">
              <FaShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">0</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
