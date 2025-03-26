'use client';

import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import ShopFilters from './ShopFilters';
import { formatPrice } from '../data/utils';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaStar, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import { Product } from '../data/products';
import Image from 'next/image';

export default function ShopContent() {
  const { 
    filteredProducts, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    cartTotal,
    setSearchQuery,
    setSelectedCategory,
    showCart,
    toggleCart
  } = useShop();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePromo, setActivePromo] = useState(0);

  // Featured products (hardcoded for demo)
  const featuredProducts = filteredProducts.filter(p => p.isHot).slice(0, 3);
  
  // Promotions data
  const promotions = [
    {
      title: "Premium Solar Panels",
      description: "High efficiency, long-lasting performance",
      cta: "Shop Now",
      bgImage: "/images/beautiful-alternative-energy-plant-with-solar-panels.jpg",
      link: "/shop?category=Solar Panels"
    },
    {
      title: "Quality Inverters",
      description: "Convert solar energy efficiently",
      cta: "View Collection",
      bgImage: "/images/photovoltaics-solar-power-station-energy-from-natural.jpg",
      link: "/shop?category=Inverters"
    },
    {
      title: "Premium Batteries",
      description: "Store energy for when you need it",
      cta: "Explore",
      bgImage: "/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg",
      link: "/shop?category=Batteries"
    }
  ];

  // Cycle through promotions automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromo(prev => (prev + 1) % promotions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  // Use this to ensure products are always shown when coming from another page
  useEffect(() => {
    // This ensures products are always displayed when the shop page loads directly
    setSelectedProduct(null);
    
    // Immediately force display of products when the component loads
    const forceProductsDisplay = () => {
      if (selectedProduct) {
        setSelectedProduct(null);
      }
    };
    
    forceProductsDisplay();
    
    // Check if we have a flag to return directly to products (after checkout)
    const returnToProducts = localStorage.getItem('returnToProducts');
    if (returnToProducts === 'true') {
      // Clear the flag after using it
      localStorage.removeItem('returnToProducts');
    }
  }, [selectedProduct]);
  
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      case 'newest':
        return (new Date(b.dateAdded || Date.now())).getTime() - (new Date(a.dateAdded || Date.now())).getTime();
      default: // featured or any other case
        return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
    }
  });
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Cart Toggle Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-orange-600 text-white rounded-full p-4 shadow-lg hover:bg-orange-700 transition-colors"
        onClick={toggleCart}
        aria-label="Toggle cart"
      >
        <div className="relative">
          <FaShoppingCart className="text-xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
            </span>
          )}
        </div>
      </button>
      
      {/* Cart Sidebar - Only render when showCart is true */}
      {showCart && (
        <div className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-full max-w-md transform transition-transform duration-300 ease-in-out ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-orange-600">Your Cart</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleCart}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <FaShoppingCart className="text-5xl mb-4 text-orange-500" />
                <p className="text-xl">Your cart is empty</p>
                <button 
                  className="mt-6 bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors"
                  onClick={() => {
                    toggleCart();
                    // Force a re-render to ensure products are shown
                    setSelectedProduct(null);
                  }}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b border-gray-200 py-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-orange-600 font-bold">{formatPrice(item.price)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <FaMinus />
                          </button>
                          <span className="mx-2 border border-gray-300 px-3 py-1 rounded min-w-[40px] text-center">
                            {item.quantity || 1}
                          </span>
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold text-orange-600">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Link 
                      href="/checkout"
                      className="bg-orange-600 text-white py-3 px-4 rounded font-medium hover:bg-orange-700 transition-colors text-center"
                    >
                      Proceed to Checkout
                    </Link>
                    <button 
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      ) : (
        <>
          {/* Breadcrumb Navigation */}
          <div className="bg-white p-3 rounded-md shadow-sm mb-4">
            <div className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-orange-600 font-medium">Shop</span>
            </div>
          </div>

          {/* Hero Slider/Banner */}
          <div className="mb-8 relative overflow-hidden rounded-lg shadow-md h-80">
            {promotions.map((promo, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === activePromo ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${promo.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex flex-col items-start justify-center h-full p-8 text-white">
                  <h2 className="text-4xl font-bold mb-2">{promo.title}</h2>
                  <p className="text-xl mb-6">{promo.description}</p>
                  <Link 
                    href={promo.link} 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md"
                  >
                    {promo.cta}
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Slider Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePromo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activePromo ? 'bg-orange-600' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                <Link href="/shop?featured=true" className="text-orange-600 hover:text-orange-700 font-medium">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)} 
                    className="cursor-pointer"
                  >
                    <ProductCard 
                      product={product} 
                      addToCart={(p) => {
                        addToCart(p);
                        event?.stopPropagation();
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        
          {/* Main Content with Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <ShopFilters />
            </div>
            
            {/* Products Area */}
            <div className="lg:w-3/4">
              {/* Product Controls - Sort and View Options */}
              <div className="bg-white p-4 rounded-md shadow-sm mb-5">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-700">{sortedProducts.length}</span> products
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex items-center gap-2 border-r border-gray-300 pr-4">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                        aria-label="Grid view"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                        aria-label="List view"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="8" y1="6" x2="21" y2="6" />
                          <line x1="8" y1="12" x2="21" y2="12" />
                          <line x1="8" y1="18" x2="21" y2="18" />
                          <line x1="3" y1="6" x2="3.01" y2="6" />
                          <line x1="3" y1="12" x2="3.01" y2="12" />
                          <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Sort Options */}
                    <div className="flex items-center">
                      <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
                      <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-300 rounded text-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="name-a-z">Name: A to Z</option>
                        <option value="name-z-a">Name: Z to A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products Grid */}
              {sortedProducts && sortedProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                      <div 
                        key={product.id} 
                        id={`product-${product.id}`}
                        onClick={() => setSelectedProduct(product)} 
                        className="cursor-pointer"
                      >
                        <ProductCard 
                          product={product} 
                          addToCart={(p) => {
                            addToCart(p);
                            // Don't navigate to detail when add to cart is clicked
                            event?.stopPropagation();
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {sortedProducts.map(product => (
                      <div 
                        key={product.id} 
                        id={`product-${product.id}`}
                        onClick={() => setSelectedProduct(product)} 
                        className="cursor-pointer bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Product Image */}
                          <div className="md:w-1/4 relative pt-[80%] md:pt-0">
                            <Image 
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 25vw"
                              className="object-contain md:object-cover group-hover:scale-105 transition-transform duration-500"
                              priority
                            />
                            {product.discount && (
                              <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                SAVE {product.discount}%
                              </div>
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-4 md:w-3/4 flex flex-col">
                            <h3 className="font-medium text-gray-800 mb-1 group-hover:text-orange-700 transition-colors">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                  {star <= Math.round(product.rating || 0) ? (
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
                            
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {product.description || "No description available."}
                            </p>
                            
                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                              <div>
                                {product.originalPrice ? (
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</span>
                                    <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</span>
                                )}
                              </div>
                              
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                              >
                                <FaShoppingCart size={14} />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-white rounded-md p-10 text-center shadow-sm">
                  <div className="text-6xl text-gray-300 mb-4 mx-auto">🔍</div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                    className="bg-orange-600 text-white py-3 px-6 rounded hover:bg-orange-700 transition-colors shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subscription Banner */}
          <div className="mt-12 mb-6 bg-orange-600 text-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:w-2/3">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="mb-6">Subscribe to our newsletter for the latest products, offers and solar energy tips.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="p-3 rounded focus:outline-none flex-1 text-black"
                  />
                  <button className="bg-black hover:bg-gray-900 text-white p-3 rounded font-medium transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="hidden md:block md:w-1/3 bg-orange-700">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌞</div>
                    <p className="text-lg font-bold">Solar power for a brighter future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
