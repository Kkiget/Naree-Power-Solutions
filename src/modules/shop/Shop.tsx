'use client';

import { ShopProvider } from './context/ShopContext';
import ShopEcommerceNav from './components/ShopEcommerceNav';
import ShopContent from './components/ShopContent';

export default function Shop() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-100">
        <ShopEcommerceNav />
        <ShopContent />
      </div>
    </ShopProvider>
  );
}
