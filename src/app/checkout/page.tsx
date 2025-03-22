'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

export default function Page() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Product 1', price: 10.99, image: 'https://example.com/product1.jpg' },
    { id: 2, name: 'Product 2', price: 9.99, image: 'https://example.com/product2.jpg' },
  ]);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 15.0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
