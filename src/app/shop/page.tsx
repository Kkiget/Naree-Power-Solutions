'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopProvider, useShop } from '@/context/ShopContext';
import { FaShoppingCart, FaSearch, FaSolarPanel, FaBatteryFull, FaPlug, FaTools, FaArrowRight, FaRegLightbulb } from 'react-icons/fa';

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
    updateQuantity,
    products
  } = useShop();
  
  const [showCart, setShowCart] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  // Get featured products (those marked as hot)
  const featuredProducts = products.filter(product => product.isHot);
  
  // Get products with discounts
  const discountedProducts = products.filter(product => product.discount);

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Solar Panels':
        return <FaSolarPanel className="mr-2" />;
      case 'Batteries':
        return <FaBatteryFull className="mr-2" />;
      case 'Inverters':
        return <FaPlug className="mr-2" />;
      default:
        return <FaTools className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-black to-gray-800 py-16">
        <div className="absolute inset-0">
          <Image 
            src="/solar-panels-roof-solar-cell.jpg"
            alt="Solar Shop Banner"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Solar Products Shop
            </h1>
            <p className="text-xl text-white mb-8">
              High-quality solar equipment at competitive prices
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for solar panels, batteries, inverters..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="absolute right-2 top-2 bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Controls */}
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Category Toggle */}
            <button 
              className="md:hidden flex items-center space-x-2 text-gray-700"
              onClick={() => setShowMobileCategories(!showMobileCategories)}
            >
              <span>Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMobileCategories ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            
            {/* Cart Button */}
            <button 
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              onClick={() => setShowCart(!showCart)}
            >
              <FaShoppingCart />
              <span>Cart ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})</span>
            </button>
          </div>
          
          {/* Mobile Categories Dropdown */}
          {showMobileCategories && (
            <div className="md:hidden mt-4 grid grid-cols-2 gap-2">
              <button 
                className={`p-2 rounded flex items-center ${selectedCategory === null ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}
                onClick={() => setSelectedCategory(null)}
              >
                <FaTools className="mr-2" /> All Products
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`p-2 rounded flex items-center ${selectedCategory === category ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)} {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Dropdown */}
      {showCart && (
        <div className="fixed top-20 right-4 z-30 w-96 max-w-[calc(100vw-2rem)]">
          <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-5xl mb-4">🛒</div>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto divide-y">
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
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
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
                      className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
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

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Category Sidebar - Desktop */}
          <div className="hidden md:block w-64 mr-8">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left p-2 rounded flex items-center ${selectedCategory === null ? 'bg-orange-100 text-orange-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <FaTools className="mr-2" /> All Products
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <button 
                      className={`w-full text-left p-2 rounded flex items-center ${selectedCategory === category ? 'bg-orange-100 text-orange-700 font-medium' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {getCategoryIcon(category)} {category}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Why Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <FaRegLightbulb className="text-orange-500" />
                    </div>
                    <span className="text-sm">Quality Products</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <FaRegLightbulb className="text-orange-500" />
                    </div>
                    <span className="text-sm">Expert Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <FaRegLightbulb className="text-orange-500" />
                    </div>
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Product Area */}
          <div className="flex-1">
            {/* Featured Banner */}
            {!selectedCategory && (
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6 mb-8 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
                    <p className="mb-4">Discover our top-rated solar solutions for your home and business</p>
                    <button 
                      className="bg-white text-orange-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Explore All <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                  <div className="md:w-1/3 relative h-40 md:h-auto">
                    <Image 
                      src="/solar-panel-banner.jpg" 
                      alt="Featured Solar Products"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Featured Products Section */}
            {!selectedCategory && featuredProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Featured Products</h2>
                  <Link href="#" className="text-orange-600 hover:text-orange-700 flex items-center">
                    View all <FaArrowRight className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Special Offers Section */}
            {!selectedCategory && discountedProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Special Offers</h2>
                  <Link href="#" className="text-orange-600 hover:text-orange-700 flex items-center">
                    View all <FaArrowRight className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discountedProducts.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Professional Services Banner */}
            {!selectedCategory && (
              <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                    <h2 className="text-2xl font-bold mb-2">Professional Installation Services</h2>
                    <p className="mb-4">Our team of experts can help you install and maintain your solar system</p>
                    <button 
                      className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition-colors inline-flex items-center"
                    >
                      Learn More <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                  <div className="md:w-1/3 relative h-40 md:h-auto">
                    <Image 
                      src="/solar-installation.jpg" 
                      alt="Professional Installation"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Category Products */}
            {selectedCategory ? (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  {getCategoryIcon(selectedCategory)} {selectedCategory}
                </h2>
                {filteredProducts.length === 0 ? (
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-gray-500">No products found in this category</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // All Products by Category
              categories.map(category => {
                const categoryProducts = products.filter(product => product.category === category);
                if (categoryProducts.length === 0) return null;
                
                return (
                  <div key={category} className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold flex items-center">
                        {getCategoryIcon(category)} {category}
                      </h2>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className="text-orange-600 hover:text-orange-700 flex items-center"
                      >
                        View all <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryProducts.slice(0, 3).map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} formatPrice={formatPrice} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    description: string;
    discount?: number;
    isHot?: boolean;
    quantity?: number;
  };
  addToCart: (product: ProductCardProps['product']) => void;
  formatPrice: (price: number) => string;
}

function ProductCard({ product, addToCart, formatPrice }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="relative h-48 w-full">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Category Label */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Hot Badge */}
        {product.isHot && !product.discount && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            HOT
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg text-gray-900">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
