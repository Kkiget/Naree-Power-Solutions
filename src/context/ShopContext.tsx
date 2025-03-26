'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, products, categories } from '@/app/shop/data';

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
  // State
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Derived values
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <ShopContext.Provider value={{
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
      cartTotal,
    }}>
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

// Re-export the Product type from data.ts
export type { Product };
