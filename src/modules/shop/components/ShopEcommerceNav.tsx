'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaHeart, FaUserCircle, FaBars, FaChevronDown, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

export default function ShopEcommerceNav() {
  const { cart, toggleCart, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useShop();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Implement scroll tracking directly in the component
  const [scrollY, setScrollY] = useState<number>(0);
  const isScrolled = scrollY > 80;
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler right away to set initial state
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent, dropdown: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const cartItemCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);

  // Category data with subcategories
  const categoryData = [
    {
      name: 'Solar Panels',
      subcategories: ['Monocrystalline', 'Polycrystalline', 'Thin Film']
    },
    {
      name: 'Inverters',
      subcategories: ['Grid-Tie', 'Off-Grid', 'Hybrid']
    },
    {
      name: 'Batteries',
      subcategories: ['Lithium-Ion', 'Lead Acid', 'Gel']
    },
    {
      name: 'Accessories',
      subcategories: ['Mounting Systems', 'Connectors', 'Charge Controllers']
    }
  ];

  return (
    <header className={`bg-white w-full z-30 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-orange-500" />
              <span className="text-sm">+254 712 345 678</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-orange-500" />
              <span className="text-sm">info@nareepowersolutions.co.ke</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/about-us" className="text-sm hover:text-orange-400 transition-colors">About Us</Link>
            <Link href="/contact-us" className="text-sm hover:text-orange-400 transition-colors">Contact Us</Link>
            <Link href="/delivery" className="text-sm hover:text-orange-400 transition-colors">Delivery & Return</Link>
            <Link href="/faqs" className="text-sm hover:text-orange-400 transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/NAREE POWER 3B.png"
                alt="Naree Power Solutions"
                width={200}
                height={50}
                className="w-auto h-12 object-contain"
              />
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                <FaSearch />
              </button>
            </div>
          </div>
          
          {/* Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/account" className="flex flex-col items-center p-2 transition-colors hover:text-orange-600">
              <FaUserCircle size={20} />
              <span className="text-xs mt-1">Account</span>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center p-2 relative transition-colors hover:text-orange-600">
              <FaHeart size={20} />
              <span className="text-xs mt-1">Wishlist</span>
            </Link>
            <button 
              onClick={toggleCart}
              className="flex flex-col items-center p-2 relative transition-colors hover:text-orange-600"
            >
              <div className="relative">
                <FaShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">Cart</span>
            </button>
          </div>
          
          {/* Mobile Menu & Search Toggles */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 text-gray-600 hover:text-orange-600"
            >
              <FaSearch size={20} />
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-600 hover:text-orange-600 relative"
            >
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 hover:text-orange-600"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600">
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Category Navigation */}
      <nav className={`border-t border-gray-200 bg-gray-50 transition-all duration-300 ${isScrolled ? 'sticky top-0 shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex">
            {/* All Departments (Shop By Category) */}
            <li className="relative">
              <button 
                className="flex items-center px-4 py-3 font-medium text-gray-800 hover:text-orange-600 bg-orange-100 text-orange-800"
                onClick={(e) => handleDropdownToggle(e, 'departments')}
              >
                <FaBars className="mr-2" />
                <span>Shop By Category</span>
                <FaChevronDown className="ml-2" />
              </button>
              
              {activeDropdown === 'departments' && (
                <div className="absolute left-0 top-full z-10 w-60 bg-white shadow-lg rounded-b-md overflow-hidden border border-gray-200">
                  <ul className="py-2">
                    {categoryData.map(category => (
                      <li key={category.name} className="relative group">
                        <Link 
                          href={`/shop?category=${encodeURIComponent(category.name)}`}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center justify-between px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <span>{category.name}</span>
                          {category.subcategories.length > 0 && (
                            <FaChevronDown className="text-gray-400 group-hover:text-orange-600" />
                          )}
                        </Link>
                        
                        {category.subcategories.length > 0 && (
                          <div className="absolute left-full top-0 w-60 bg-white shadow-lg hidden group-hover:block border border-gray-200">
                            <ul className="py-2">
                              {category.subcategories.map(sub => (
                                <li key={sub}>
                                  <Link 
                                    href={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            
            {/* Product Categories */}
            <li className="group relative">
              <Link href="/shop?category=Solar%20Panels" 
                className="block px-4 py-3 font-medium text-gray-800 hover:text-orange-600"
                onClick={() => setSelectedCategory('Solar Panels')}
              >
                Solar Panels
              </Link>
              <div className="absolute left-0 top-full z-10 w-60 bg-white shadow-lg rounded-b-md overflow-hidden border border-gray-200 hidden group-hover:block">
                <ul className="py-2">
                  <li>
                    <Link href="/shop?category=Solar%20Panels&subcategory=Monocrystalline" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Monocrystalline
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Solar%20Panels&subcategory=Polycrystalline" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Polycrystalline
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Solar%20Panels&subcategory=Thin%20Film" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Thin Film
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="group relative">
              <Link href="/shop?category=Inverters" 
                className="block px-4 py-3 font-medium text-gray-800 hover:text-orange-600"
                onClick={() => setSelectedCategory('Inverters')}
              >
                Inverters
              </Link>
              <div className="absolute left-0 top-full z-10 w-60 bg-white shadow-lg rounded-b-md overflow-hidden border border-gray-200 hidden group-hover:block">
                <ul className="py-2">
                  <li>
                    <Link href="/shop?category=Inverters&subcategory=Grid-Tie" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Grid-Tie
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Inverters&subcategory=Off-Grid" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Off-Grid
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Inverters&subcategory=Hybrid" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Hybrid
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="group relative">
              <Link href="/shop?category=Batteries" 
                className="block px-4 py-3 font-medium text-gray-800 hover:text-orange-600"
                onClick={() => setSelectedCategory('Batteries')}
              >
                Batteries
              </Link>
              <div className="absolute left-0 top-full z-10 w-60 bg-white shadow-lg rounded-b-md overflow-hidden border border-gray-200 hidden group-hover:block">
                <ul className="py-2">
                  <li>
                    <Link href="/shop?category=Batteries&subcategory=Lithium-Ion" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Lithium-Ion
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Batteries&subcategory=Lead%20Acid" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Lead Acid
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Batteries&subcategory=Gel" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">
                      Gel
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href="/shop?category=Water%20Heaters" 
                className="block px-4 py-3 font-medium text-gray-800 hover:text-orange-600"
                onClick={() => setSelectedCategory('Water Heaters')}
              >
                Water Heaters
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Accessories" 
                className="block px-4 py-3 font-medium text-gray-800 hover:text-orange-600"
                onClick={() => setSelectedCategory('Accessories')}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <button
                  className="flex items-center justify-between w-full py-2 text-gray-800"
                  onClick={(e) => handleDropdownToggle(e, 'mobile-categories')}
                >
                  <span>All Categories</span>
                  <FaChevronDown className={`transition-transform duration-200 ${activeDropdown === 'mobile-categories' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobile-categories' && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {categoryData.map(category => (
                      <li key={category.name}>
                        <Link 
                          href={`/shop?category=${encodeURIComponent(category.name)}`}
                          className="block py-2 text-gray-600 hover:text-orange-600"
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setShowMobileMenu(false);
                          }}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link 
                  href="/shop?category=Solar%20Panels"
                  className="block py-2 text-gray-800"
                  onClick={() => {
                    setSelectedCategory('Solar Panels');
                    setShowMobileMenu(false);
                  }}
                >
                  Solar Panels
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?category=Inverters"
                  className="block py-2 text-gray-800"
                  onClick={() => {
                    setSelectedCategory('Inverters');
                    setShowMobileMenu(false);
                  }}
                >
                  Inverters
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?category=Batteries"
                  className="block py-2 text-gray-800"
                  onClick={() => {
                    setSelectedCategory('Batteries');
                    setShowMobileMenu(false);
                  }}
                >
                  Batteries
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?category=Water%20Heaters"
                  className="block py-2 text-gray-800"
                  onClick={() => {
                    setSelectedCategory('Water Heaters');
                    setShowMobileMenu(false);
                  }}
                >
                  Water Heaters
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?category=Accessories"
                  className="block py-2 text-gray-800"
                  onClick={() => {
                    setSelectedCategory('Accessories');
                    setShowMobileMenu(false);
                  }}
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  href="/about-us"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact-us"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/delivery"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Delivery & Return
                </Link>
              </li>
              <li>
                <Link 
                  href="/faqs"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link 
                  href="/wishlist"
                  className="block py-2 text-gray-800"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
