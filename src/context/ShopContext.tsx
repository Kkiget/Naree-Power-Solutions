'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  discount?: number;
  isHot?: boolean;
  quantity?: number;
}

// Define the context type
interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  categories: string[];
  cartTotal: number;
}

// Create the context with a default value
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create a provider component
export function ShopProvider({ children }: { children: ReactNode }) {
  // Product data
  const [products] = useState<Product[]>([
    // Solar Panels
    {
      id: 'sp1',
      name: 'Jinko Solar 580W Monocrystalline Panel',
      price: 29000,
      originalPrice: 32000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: 'High-efficiency monocrystalline solar panel with 25-year warranty',
      discount: 9,
      isHot: true
    },
    {
      id: 'sp2',
      name: 'JA Solar 565W Mono Panel',
      price: 28500,
      originalPrice: 30000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Premium quality monocrystalline panel for maximum energy yield',
      discount: 5
    },
    {
      id: 'sp3',
      name: 'Africell 350W Mono Panel',
      price: 17500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Panels',
      description: 'Cost-effective monocrystalline panel for residential use'
    },
    // Inverters
    {
      id: 'inv1',
      name: 'Growatt 5kW Hybrid Inverter',
      price: 85000,
      originalPrice: 95000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Inverters',
      description: 'SPF 5000ES single-phase hybrid inverter',
      discount: 11,
      isHot: true
    },
    {
      id: 'inv2',
      name: 'Deye 8kW 3-Phase Inverter',
      price: 120000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Inverters',
      description: 'SUN-8K-SG03LP1 3-phase string inverter'
    },
    {
      id: 'inv3',
      name: 'Solis 3.6kW Grid-Tie Inverter',
      price: 45000,
      originalPrice: 48000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: 'Mini 4G single-phase grid-tie inverter',
      discount: 6
    },
    // Batteries
    {
      id: 'bat1',
      name: 'Pylontech 3.5kWh Lithium Battery',
      price: 110000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Batteries',
      description: 'US3000C 48V lithium battery with 10-year warranty',
      isHot: true
    },
    {
      id: 'bat2',
      name: 'Freedom 200Ah Deep Cycle Battery',
      price: 35000,
      originalPrice: 40000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Batteries',
      description: 'Maintenance-free gel battery for solar storage',
      discount: 12
    },
    {
      id: 'bat3',
      name: 'Felicity 100Ah Lithium Battery',
      price: 65000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: '12V LiFePO4 battery with BMS'
    },
  ]);

  // State
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Derived values
  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        // Increment quantity if product already exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Context value
  const value = {
    products,
    filteredProducts,
    cart,
    selectedCategory,
    searchQuery,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setSelectedCategory,
    setSearchQuery,
    categories,
    cartTotal
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

// Custom hook to use the shop context
export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
