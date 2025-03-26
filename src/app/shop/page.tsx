'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShopProvider, useShop, Product } from '@/context/ShopContext';
import { FaShoppingCart, FaFilter, FaSearch } from 'react-icons/fa';

// Main Shop Component
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
    filteredProducts, 
    cart, 
    addToCart, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    categories,
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
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value === '' ? null : e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    categories,
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
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="divide-y">
                  {cart.map(item => (
                    <div key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16">
                          <Image 
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500">{formatPrice(item.price)} × {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-orange-100"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-orange-100"
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
                        <span className="font-bold">{formatPrice(item.price * (item.quantity || 1))}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                      onClick={() => alert('Checkout functionality coming soon!')}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
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
