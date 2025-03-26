'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { formatPrice } from '../data/utils';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductReviews from './ProductReviews';
import RecentlyViewed from './RecentlyViewed';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    products,
    getAverageRating,
    viewProduct
  } = useShop();
  
  const inWishlist = isInWishlist(product.id);
  const rating = getAverageRating(product.id);
  
  // Record this product view when component mounts
  useEffect(() => {
    viewProduct(product);
  }, [product, viewProduct]);
  
  // Get related products (same category, but not the current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Stock status display
  const getStockStatusDisplay = () => {
    if (!product.stockStatus || product.stockStatus === 'in_stock') {
      return <span className="text-green-600">In Stock</span>;
    } else if (product.stockStatus === 'low_stock') {
      return <span className="text-orange-600">Low Stock - Only {product.stockCount || 'a few'} left</span>;
    } else {
      return <span className="text-red-600">Out of Stock</span>;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={onBack}
        className="flex items-center p-4 text-gray-600 hover:text-orange-600 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Products
      </button>
      
      <div className="lg:grid lg:grid-cols-2 gap-8 p-6">
        {/* Product Image */}
        <div className="mb-6 lg:mb-0">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-orange-600">
                  {i < Math.round(rating) ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <span className="text-gray-500">
              {rating > 0 ? `${rating.toFixed(1)} (${product.reviews || 0} reviews)` : 'No reviews yet'}
            </span>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-orange-600 mr-3">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Product Specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="space-y-2">
              {product.brand && (
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Brand:</span>
                  <span>{product.brand}</span>
                </div>
              )}
              {product.model && (
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Model:</span>
                  <span>{product.model}</span>
                </div>
              )}
              {product.warranty && (
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Warranty:</span>
                  <span>{product.warranty}</span>
                </div>
              )}
              <div className="flex">
                <span className="w-24 font-medium text-gray-600">Availability:</span>
                {getStockStatusDisplay()}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
              disabled={product.stockStatus === 'out_of_stock'}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              {inWishlist ? (
                <>
                  <FaHeart className="mr-2 text-orange-600" />
                  In Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart className="mr-2" />
                  Add to Wishlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="border-t border-gray-200 px-6">
        <ProductReviews productId={product.id} />
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 px-6 py-8">
          <h3 className="text-2xl font-bold mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  // Replace current product with the related one
                  onBack();
                  setTimeout(() => {
                    const productElement = document.getElementById(`product-${relatedProduct.id}`);
                    if (productElement) {
                      productElement.scrollIntoView({ behavior: 'smooth' });
                      productElement.click();
                    }
                  }, 100);
                }}
              >
                <div className="relative aspect-square mb-3">
                  <Image 
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="font-medium text-gray-800 mb-1 line-clamp-1">{relatedProduct.name}</h4>
                <p className="text-orange-600 font-bold">{formatPrice(relatedProduct.price)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recently Viewed Products */}
      <div className="px-6">
        <RecentlyViewed />
      </div>
    </div>
  );
}
