'use client';

import Link from 'next/link';
import { useShop } from '../context/ShopContext';

export default function ShopNavigation() {
  const { categories } = useShop();

  return (
    <div className="bg-orange-800 text-white text-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap justify-center md:justify-between items-center">
          {/* Shop categories */}
          <ul className="flex flex-wrap items-center space-x-6">
            <li className="font-semibold">Product Categories:</li>
            {categories.map(category => (
              <li key={category}>
                <Link 
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  className="hover:underline transition-colors"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Shop links */}
          <div className="hidden md:flex items-center space-x-6 mt-2 md:mt-0">
            <Link href="/shop/new-arrivals" className="hover:underline">New Arrivals</Link>
            <Link href="/shop/best-sellers" className="hover:underline">Best Sellers</Link>
            <Link href="/shop/special-offers" className="hover:underline">Special Offers</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
