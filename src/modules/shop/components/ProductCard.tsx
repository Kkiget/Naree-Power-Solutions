'use client';

import Image from 'next/image';
import { Product } from '../data/products';
import { formatPrice } from '../data/utils';
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist, getAverageRating } = useShop();
  const inWishlist = isInWishlist(product.id);
  const rating = getAverageRating(product.id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  // Stock status display
  const getStockStatusDisplay = () => {
    if (!product.stockStatus || product.stockStatus === 'in_stock') {
      return <span className="text-xs text-green-600 font-medium">In Stock</span>;
    } else if (product.stockStatus === 'low_stock') {
      return <span className="text-xs text-orange-600 font-medium">Low Stock</span>;
    } else {
      return <span className="text-xs text-red-600 font-medium">Out of Stock</span>;
    }
  };
  
  return (
    <div className="bg-white rounded-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-orange-300 group">
      {/* Quick Action Buttons - Appear on Hover */}
      <div className="absolute top-2 right-2 z-10 flex-col gap-2 hidden group-hover:flex transition-opacity duration-200">
        <button 
          onClick={handleWishlistToggle}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-orange-50"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? (
            <FaHeart className="text-orange-600" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-orange-600" />
          )}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Functionality for quick view could be added here
          }}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-orange-50"
          aria-label="Quick view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
      
      {/* Product Image */}
      <div className="relative pt-[100%]"> {/* 1:1 Aspect Ratio */}
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
        
        {/* Add to Cart Overlay - Appears on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-md"
          >
            <FaShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
        
        {/* NEW Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              NEW
            </div>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        {product.category && (
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        )}
        
        {/* Product Name */}
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 hover:text-orange-600">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>
              {star <= Math.round(rating) ? (
                <FaStar className="text-orange-500 text-sm" />
              ) : (
                <FaRegStar className="text-gray-300 text-sm" />
              )}
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews || 0})
          </span>
        </div>
        
        {/* Stock status, Hot and Save badges */}
        <div className="flex items-center flex-wrap gap-2 my-3">
          <div className="flex items-center space-x-2">
            {getStockStatusDisplay()}
            
            {product.isHot && (
              <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                HOT
              </div>
            )}
            
            {product.discount && (
              <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                SAVE {product.discount}%
              </div>
            )}
          </div>
        </div>
        
        {/* Pricing */}
        <div className="mt-auto">
          {product.originalPrice ? (
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</span>
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            </div>
          ) : (
            <div className="mb-2">
              <span className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</span>
            </div>
          )}
          
          {/* Add to Cart Button - Only visible on mobile or when not hovering on desktop */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-300"
          >
            <FaShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
