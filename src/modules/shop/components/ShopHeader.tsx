'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

export default function ShopHeader() {
  const { 
    cart, 
    setSearchQuery, 
    searchQuery,
    wishlist,
    isAuthenticated,
    currentUser,
    logout
  } = useShop();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const wishlistItemCount = wishlist.length;
  
  // Close mobile menu when window size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setSearchQuery was already called on input change
    setSearchInputVisible(false);
  };
  
  // Handle clicking outside user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 min-w-0 md:flex-none">
            <Link href="/shop" className="text-xl font-bold text-orange-600">
              Naree Shop
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-gray-700 hover:text-orange-600 font-medium">
              Home
            </Link>
            <Link href="/shop/products" className="text-gray-700 hover:text-orange-600 font-medium">
              Products
            </Link>
            <Link href="/shop/about" className="text-gray-700 hover:text-orange-600 font-medium">
              About
            </Link>
            <Link href="/shop/contact" className="text-gray-700 hover:text-orange-600 font-medium">
              Contact
            </Link>
          </nav>
          
          {/* Right Section - Search, Cart, Wishlist, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchInputVisible ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-0 w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) {
                        setSearchInputVisible(false);
                      }
                    }}
                  />
                </form>
              ) : (
                <button
                  onClick={() => setSearchInputVisible(true)}
                  className="p-2 text-gray-600 hover:text-orange-600"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
              )}
            </div>
            
            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-600 hover:text-orange-600 relative">
              <FaHeart />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-orange-600 relative">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* User Account / Sign In */}
            <div className="relative user-dropdown-container">
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="p-2 text-gray-600 hover:text-orange-600 flex items-center"
              >
                <FaUser />
                {isAuthenticated && (
                  <span className="ml-2 hidden sm:inline text-sm">
                    {currentUser?.firstName || 'Account'}
                  </span>
                )}
              </button>
              
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser?.firstName} {currentUser?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account?tab=orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-orange-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/shop"
                  className="block text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/products"
                  className="block text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/about"
                  className="block text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/contact"
                  className="block text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/account"
                      className="block text-gray-700 hover:text-orange-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block text-gray-700 hover:text-orange-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signin"
                      className="block text-gray-700 hover:text-orange-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block text-gray-700 hover:text-orange-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
