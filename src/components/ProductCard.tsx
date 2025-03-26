'use client';

import Image from 'next/image';
import { Product, formatPrice } from '@/app/shop/data';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        {product.isHot && (
          <div className="absolute top-2 left-2 bg-orange-800 text-white text-xs font-semibold px-2 py-1 rounded">
            Hot Deal
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center">
          <p className="text-xl font-bold text-orange-600">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="ml-2 text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
        <button 
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
