'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      image: '/images/headphones.jpg'
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 249.99,
      image: '/images/smartwatch.jpg'
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      price: 79.99,
      image: '/images/backpack.jpg'
    }
  ];

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
