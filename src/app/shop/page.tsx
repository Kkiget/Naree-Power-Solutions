'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShopProvider, useShop, Product } from '@/context/ShopContext';
import { FaShoppingCart, FaFilter, FaSearch } from 'react-icons/fa';

export default function Shop() {
  const [isShopPage, setIsShopPage] = useState(false);

  useEffect(() => {
    const pathname = document.querySelector('[data-pathname]')?.getAttribute('data-pathname');
    setIsShopPage(pathname === '/shop');
  }, []);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50">
        {isShopPage && <ShopNavigation />}
        <ShopContent />
      </div>
    </ShopProvider>
  );
}

// Shop Navigation Component
function ShopNavigation() {
  const { 
    cart, 
    cartTotal,
    removeFromCart,
    updateQuantity
  } = useShop();
  
  const [showCart, setShowCart] = useState(false);

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500" />
            <select 
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value=""
            >
              <option value="">All Categories</option>
            </select>
          </div>
          
          {/* Search */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          {/* Cart Button */}
          <button 
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            onClick={() => setShowCart(!showCart)}
          >
            <FaShoppingCart />
            <span>Cart ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Shop Content Component that uses the context
function ShopContent() {
  const { 
    filteredProducts, 
    cart, 
    addToCart, 
    cartTotal,
    removeFromCart,
    updateQuantity
  } = useShop();
  
  const [showCart, setShowCart] = useState(false);

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cart Dropdown */}
      {showCart && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <h4 className="font-semibold">Total:</h4>
                  <p className="font-semibold text-orange-600">{formatPrice(cartTotal)}</p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors mt-4"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

function ProductCard({ product, addToCart, formatPrice }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-orange-600">{formatPrice(product.price)}</p>
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
