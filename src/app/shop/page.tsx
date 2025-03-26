'use client';

import Shop from '@/modules/shop/Shop';
import { useEffect } from 'react';

export default function ShopPage() {
  // Force reset any cart visibility issues when the shop page loads
  useEffect(() => {
    // Create and dispatch a custom event to reset cart visibility
    const event = new Event('resetCartVisibility');
    document.dispatchEvent(event);
    
    // Set a flag in localStorage to indicate we're viewing products
    localStorage.setItem('viewingProducts', 'true');
    
    // Cleanup when unmounting
    return () => {
      localStorage.removeItem('viewingProducts');
    };
  }, []);
  
  return <Shop />;
}
