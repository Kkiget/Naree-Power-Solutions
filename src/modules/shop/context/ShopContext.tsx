'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, products, Review, productReviews } from '../data/products';
import { getCategories } from '../data/utils';
import { Order, sampleOrders } from '../data/orders';

// Define the context type
interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: Product[];
  wishlist: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  priceRange: [number, number]; 
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void; 
  categories: string[];
  cartTotal: number;
  getProductReviews: (productId: string) => Review[];
  addProductReview: (review: Omit<Review, 'id' | 'helpful'>) => void;
  markReviewHelpful: (reviewId: string) => void;
  getAverageRating: (productId: string) => number;
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  getOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  viewProduct: (product: Product) => void;
  showCart: boolean;
  toggleCart: () => void;
}

// User interface
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// Registration data interface
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// Sample user data (would be stored in a database in a real application)
const sampleUsers = [
  {
    id: 'user-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+254712345678'
  }
];

// Create the context with a default value
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create a provider component
export const ShopProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [reviews, setReviews] = useState<Record<string, Review[]>>(productReviews);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  
  // Calculate min and max prices for initial price range
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  
  const categories = getCategories();

  // Derived values
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPriceRange;
  });

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  // Initial data loading and localStorage interaction
  useEffect(() => {
    // Check if we have cart data in localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    }

    // Always ensure cart is hidden on initial load
    setShowCart(false);
    
    // Check if we have wishlist data in localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist data', e);
      }
    }

    const savedHelpfulReviews = localStorage.getItem('helpfulReviews');
    if (savedHelpfulReviews) {
      try {
        setHelpfulReviews(JSON.parse(savedHelpfulReviews));
      } catch (error) {
        console.error('Failed to parse helpful reviews from localStorage:', error);
      }
    }
    
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Failed to parse reviews from localStorage:', error);
      }
    }
    
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  useEffect(() => {
    localStorage.setItem('helpfulReviews', JSON.stringify(helpfulReviews));
  }, [helpfulReviews]);
  
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);
  
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Listen for cart visibility reset event
  useEffect(() => {
    const handleResetCartVisibility = () => {
      // Force cart to be hidden
      setShowCart(false);
    };
    
    // Add event listener for custom event
    document.addEventListener('resetCartVisibility', handleResetCartVisibility);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('resetCartVisibility', handleResetCartVisibility);
    };
  }, []);

  // Recently viewed products - Track when a user views a product
  const viewProduct = (product: Product) => {
    try {
      const storedIds = localStorage.getItem('recentlyViewedProducts') || '[]';
      const productIds = JSON.parse(storedIds) as string[];
      
      // Remove the product if it already exists (to move it to the front)
      const filteredIds = productIds.filter(id => id !== product.id);
      
      // Add the product to the beginning
      const updatedIds = [product.id, ...filteredIds].slice(0, 8); // Keep max 8 items
      
      localStorage.setItem('recentlyViewedProducts', JSON.stringify(updatedIds));
    } catch (error) {
      console.error('Failed to update recently viewed products:', error);
    }
  };

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };
  
  // Wishlist functions
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(prevWishlist => [...prevWishlist, product]);
    }
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };
  
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };
  
  // Reviews functions
  const getProductReviews = (productId: string): Review[] => {
    return reviews[productId] || [];
  };
  
  const addProductReview = (review: Omit<Review, 'id' | 'helpful'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      helpful: 0
    };
    
    setReviews(prevReviews => {
      const productReviews = prevReviews[review.productId] || [];
      return {
        ...prevReviews,
        [review.productId]: [...productReviews, newReview]
      };
    });
  };
  
  const markReviewHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) return;
    
    setHelpfulReviews(prev => [...prev, reviewId]);
    
    setReviews(prevReviews => {
      const updatedReviews = { ...prevReviews };
      
      // Find the review in all product reviews
      for (const productId in updatedReviews) {
        updatedReviews[productId] = updatedReviews[productId].map(review => 
          review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
        );
      }
      
      return updatedReviews;
    });
  };
  
  const getAverageRating = (productId: string): number => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / productReviews.length).toFixed(1));
  };

  // User authentication functions
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real application, this would make an API call
    // For demo purposes, we're just checking against our sample data
    try {
      const user = sampleUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return false;
      }
      
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };
  
  // Register function
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      return true; // Return success status
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<boolean> => {
    // In a real application, this would send a reset email
    try {
      const userExists = sampleUsers.some(user => user.email === email);
      return userExists;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  // Get all orders
  const getOrders = () => {
    if (!isAuthenticated) return [];
    return orders.filter(order => order.userId === currentUser?.id);
  };
  
  // Get order by ID
  const getOrderById = (orderId: string) => {
    if (!isAuthenticated) return undefined;
    return orders.find(order => order.id === orderId && order.userId === currentUser?.id);
  };

  // Create the context value
  const value = {
    products,
    filteredProducts,
    cart,
    wishlist,
    selectedCategory,
    searchQuery,
    priceRange,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setSelectedCategory,
    setSearchQuery,
    setPriceRange,
    categories,
    cartTotal,
    getProductReviews,
    addProductReview,
    markReviewHelpful,
    getAverageRating,
    getOrders,
    getOrderById,
    isAuthenticated,
    currentUser,
    login,
    logout,
    register,
    forgotPassword,
    viewProduct,
    showCart,
    toggleCart: () => setShowCart(!showCart)
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

// Re-export the Product type from products.ts
export type { Product, Review };
