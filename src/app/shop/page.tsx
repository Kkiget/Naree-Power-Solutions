'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSolarPanel, FaBatteryFull, FaLightbulb, FaWater, FaPlug } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  discount?: number;
  isHot?: boolean;
}

export default function Shop() {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Amerisolar 275W Poly Solar Panel',
      price: 11000,
      originalPrice: 11550,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: 'High-quality polycrystalline solar panel with 25-year performance warranty',
      discount: 5
    },
    {
      id: '2',
      name: 'Champion Solar Battery 100Ah',
      price: 13950,
      originalPrice: 15000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Batteries',
      description: 'Maintenance-free deep cycle solar battery for reliable energy storage',
      discount: 7
    },
    {
      id: '3',
      name: 'Opti SP Effecto 800W 12VDC Hybrid Inverter',
      price: 11440,
      originalPrice: 13000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: 'Hybrid inverter with built-in solar charge controller for continuous power supply',
      discount: 12
    },
    {
      id: '4',
      name: 'Bural 200L Solar Water Heater',
      price: 69000,
      originalPrice: 75000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Heaters',
      description: 'Flat plate collector solar water heater with 200L capacity for residential use',
      discount: 8,
      isHot: true
    },
    {
      id: '5',
      name: '1.5kW Complete Solar Energy System',
      price: 95000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Complete Systems',
      description: 'All-in-one solar energy solution for homes with panels, batteries, and inverter',
      isHot: true
    },
    {
      id: '6',
      name: '20W Mini Solar Street Light',
      price: 7500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Lighting',
      description: 'Integrated solar street light with motion sensor and dusk to dawn operation'
    },
    {
      id: '7',
      name: 'DSolar-B 120H Solar Water Pump',
      price: 45000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Pumps',
      description: 'DC solar water pump system for agriculture and residential applications'
    },
    {
      id: '8',
      name: '6mm² DC Solar Cables (100m)',
      price: 8500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Accessories',
      description: 'High-quality double insulated solar DC cables for safe and efficient connections'
    }
  ];

  const categories = ['All', 'Solar Panels', 'Batteries', 'Inverters', 'Water Heaters', 'Solar Lighting', 'Complete Systems', 'Water Pumps', 'Accessories'];
  
  const filteredProducts = selectedCategory && selectedCategory !== 'All' 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/beautiful-alternative-energy-plant-with-solar-panels.jpg"
            alt="Solar panels"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Shop <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Power Solutions</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Browse our selection of high-quality renewable energy products for your home or business needs in Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Cart Summary */}
          <div className="flex justify-end mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
              <Link href="/checkout" className="flex items-center space-x-2">
                <span>Cart</span>
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    (selectedCategory === category || (category === 'All' && !selectedCategory))
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {product.discount && (
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isHot && (
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                        Hot
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      {product.originalPrice ? (
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Solutions Banner */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Custom Energy Solutions</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Need a customized power solution for your specific needs? Our experts can help design and implement the perfect system for your home or business in Kenya.
          </p>
          <Link 
            href="/contact-us" 
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            Contact Us For Custom Solutions
          </Link>
        </div>
      </section>
    </main>
  );
}
