'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopProvider, useShop, Product } from '@/context/ShopContext';
import { FaShoppingCart, FaFilter, FaSearch } from 'react-icons/fa';

// Main Shop Component
export default function Shop() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
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
    <div className="min-h-screen bg-gray-50">
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
              🔍
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
              🛒 Your Cart: KSh {cartTotal}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-black to-gray-800">
        <div className="absolute inset-0">
          <Image 
            src="/solar-panels-roof-solar-cell.jpg"
            alt="Solar Shop Banner"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solar Products Shop
          </h1>
          <p className="text-xl text-white">
            High-quality solar equipment at competitive prices
          </p>
        </div>
      </div>

      {/* Shop Controls */}
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

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
          ))}
        </div>

        {/* Featured Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
            ))}
          </div>
        </div>
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

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, formatPrice }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-3 space-y-2">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-orange-600 font-semibold text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm ml-2 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition-colors flex items-center space-x-2"
          >
            <FaShoppingCart className="text-sm" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
