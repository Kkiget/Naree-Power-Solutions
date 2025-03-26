'use client';

import { FaShieldAlt, FaClock, FaCreditCard } from 'react-icons/fa';
import { Checkout } from '@/modules/shop/components/CheckoutFlow';
import { ShopProvider } from '@/modules/shop/context/ShopContext';

export default function CheckoutPage() {
  return (
    <ShopProvider>
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-orange-700 via-orange-800 to-black py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Secure Checkout
            </h1>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Checkout />
            
            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaShieldAlt,
                  title: "Secure Payment",
                  description: "Your payment information is protected"
                },
                {
                  icon: FaClock,
                  title: "Quick Process",
                  description: "Fast and efficient checkout experience"
                },
                {
                  icon: FaCreditCard,
                  title: "Multiple Options",
                  description: "Various payment methods accepted"
                }
              ].map((badge, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl text-orange-500 mr-4">
                    <badge.icon />
                  </div>
                  <div>
                    <h3 className="font-semibold">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ShopProvider>
  );
}
