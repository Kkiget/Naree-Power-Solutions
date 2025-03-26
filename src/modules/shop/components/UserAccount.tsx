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
  
  const handleSignOut = () => {
    logout();
    router.push('/');
  };
  
  const handleTabChange = (tab: 'orders' | 'wishlist' | 'reviews' | 'settings') => {
    setActiveTab(tab);
    router.push(`/account?tab=${tab}`, { scroll: false });
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderHistory />;
        
      case 'wishlist':
        return (
          <div className="py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist</h2>
            
            {wishlist.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                <Link
                  href="/shop"
                  className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors inline-block"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative aspect-square bg-gray-50">
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-orange-600 font-bold mb-3">{formatPrice(product.price)}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => removeFromWishlist(product.id)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'reviews':
        return (
          <div className="py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Reviews</h2>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
              <Link 
                href="/shop"
                className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors inline-block"
              >
                Browse Products to Review
              </Link>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Account Settings</h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={currentUser.firstName}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={currentUser.lastName}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={currentUser.email}
                      className="w-full p-3 border border-gray-300 rounded"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue={currentUser.phone}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
              
              <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Change Password</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
              
              <div className="p-6 bg-red-50 rounded-lg shadow-sm border border-red-100">
                <h3 className="text-xl font-semibold mb-4 text-red-700">Delete Account</h3>
                <p className="text-red-600 mb-4">Warning: This action is permanent and cannot be undone. All your data will be permanently removed.</p>
                <button className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors">
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Calculate account creation date
  const memberSince = new Date(parseInt(currentUser.id.split('-')[1])).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
  
  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="bg-orange-600 text-white py-8 px-4 rounded-b-lg mb-8">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white text-orange-600 flex items-center justify-center text-2xl mr-4">
            <FaUser />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{currentUser.firstName} {currentUser.lastName}</h1>
            <p className="text-orange-100">Member since {memberSince}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <nav>
              <ul>
                {[
                  { id: 'orders', label: 'My Orders', icon: <FaShoppingBag /> },
                  { id: 'wishlist', label: 'My Wishlist', icon: <FaHeart /> },
                  { id: 'reviews', label: 'My Reviews', icon: <FaCommentAlt /> },
                  { id: 'settings', label: 'Account Settings', icon: <FaCog /> }
                ].map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTabChange(item.id as any)}
                      className={`w-full flex items-center px-6 py-4 ${
                        activeTab === item.id
                          ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="mr-3"><FaSignOutAlt /></span>
                    Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
