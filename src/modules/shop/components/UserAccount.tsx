'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaUser, FaShoppingBag, FaHeart, FaCommentAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import OrderHistory from './OrderHistory';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function UserAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'reviews' | 'settings'>(
    (tabFromUrl as any) || 'orders'
  );
  const [showWelcome, setShowWelcome] = useState(false);
  
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    isAuthenticated, 
    currentUser,
    logout
  } = useShop();
  
  // Redirect to sign in page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin?redirect=/account');
    }
  }, [isAuthenticated, router]);
  
  // Show welcome message if user just signed up
  useEffect(() => {
    const justSignedUp = localStorage.getItem('justSignedUp');
    if (justSignedUp) {
      setShowWelcome(true);
      localStorage.removeItem('justSignedUp');
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, []);
  
  // Handle tab changes from URL
  useEffect(() => {
    if (tabFromUrl && ['orders', 'wishlist', 'reviews', 'settings'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl as any);
    }
  }, [tabFromUrl]);
  
  // If not authenticated yet, show loading state
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-100 rounded max-w-md mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {showWelcome && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
          Welcome to your account, {currentUser.firstName}! Let's get started with your shopping journey.
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/images/default-avatar.png"
                  alt="Profile"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/account?tab=orders"
              className={`block px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'orders' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaShoppingBag className="inline-block mr-2" /> Orders
            </Link>
            <Link
              href="/account?tab=wishlist"
              className={`block px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'wishlist' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaHeart className="inline-block mr-2" /> Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/account?tab=reviews"
              className={`block px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'reviews' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaCommentAlt className="inline-block mr-2" /> Reviews
            </Link>
            <Link
              href="/account?tab=settings"
              className={`block px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'settings' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaCog className="inline-block mr-2" /> Settings
            </Link>
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              <OrderHistory />
            </div>
          )}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <FaHeart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Start adding items to your wishlist.</p>
                  <div className="mt-6">
                    <Link
                      href="/shop"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-4">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        <Image
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: 200,
                            height: 200,
                          }}
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{formatPrice(product.price)}</p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
              <div className="text-center py-12">
                <FaCommentAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start reviewing products after making purchases.</p>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={`${currentUser.firstName} ${currentUser.lastName}`}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={currentUser.email}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={currentUser.phone}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
