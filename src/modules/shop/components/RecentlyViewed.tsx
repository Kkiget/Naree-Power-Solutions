'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { Product } from '../data/products';
import { formatPrice } from '../data/utils';
import { FaRegClock } from 'react-icons/fa';

const MAX_RECENT_PRODUCTS = 4;

export default function RecentlyViewed() {
  const { products, addToCart, addToWishlist } = useShop();
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Load recently viewed products from localStorage
    const loadRecentlyViewed = () => {
      try {
        const storedIds = localStorage.getItem('recentlyViewedProducts');
        if (storedIds) {
          const ids = JSON.parse(storedIds) as string[];
          const foundProducts = ids
            .map(id => products.find(p => p.id === id))
            .filter((p): p is Product => p !== undefined)
            .slice(0, MAX_RECENT_PRODUCTS);
            
          setRecentProducts(foundProducts);
        }
      } catch (error) {
        console.error('Failed to load recently viewed products:', error);
      }
    };
    
    loadRecentlyViewed();
  }, [products]);
  
  if (recentProducts.length === 0) {
    return null; // Don't show the component if there are no recently viewed products
  }
  
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaRegClock className="mr-2 text-orange-600" />
        Recently Viewed
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recentProducts.map(product => (
          <div 
            key={product.id} 
            className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <Link href={`/shop/product/${product.id}`}>
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-baseline mt-1 mb-2">
                  <span className="text-orange-600 font-semibold">{formatPrice(product.price)}</span>
                  {product.discount && product.discount > 0 && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      {formatPrice(product.price / (1 - product.discount / 100))}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            
            <div className="px-4 pb-4 flex space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-3 rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
