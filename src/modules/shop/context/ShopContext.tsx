'use client';

import { createContext, useState, useContext, useEffect, ReactNode, useMemo } from 'react';
import { Product, products, Review, productReviews } from '../data/products';
import { getCategories } from '../data/utils';
import { Order, sampleOrders } from '../data/orders';

// Cart item interface
interface CartItem extends Product {
  quantity: number;
}

// Define the context type
interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  wishlist: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  priceRange: [number, number];
  addToCart: (product: Product, quantity?: number) => void;
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
  cartItemCount: number;
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

interface AuthUser extends User {
  password: string;
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
const sampleUsers: AuthUser[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+254712345678',
    password: 'hashedPassword123' // In real app, this would be properly hashed
  }
];

// Create the context with a default value
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create a provider component
export const ShopProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [reviews, setReviews] = useState<Record<string, Review[]>>(productReviews);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Calculate min and max prices for initial price range
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  
  const categories = getCategories();

  // Derived values
  const filteredProducts = useMemo(() => 
    products.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPriceRange;
    }),
    [selectedCategory, searchQuery, priceRange]
  );

  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cart]
  );

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
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
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
        item.id === productId 
          ? { ...item, quantity: quantity }
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
  
  // Review functions
  const getProductReviews = (productId: string): Review[] => {
    return reviews[productId] || [];
  };

  // Review validation schema
  const reviewSchema = {
    minRating: 1,
    maxRating: 5,
    minCommentLength: 10,
    maxCommentLength: 500
  };

  // Review functions
  const addProductReview = async (review: Omit<Review, 'id' | 'helpful'>) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to leave a review');
    }

    if (review.rating < reviewSchema.minRating || review.rating > reviewSchema.maxRating) {
      throw new Error(`Rating must be between ${reviewSchema.minRating} and ${reviewSchema.maxRating}`);
    }

    if (review.comment.length < reviewSchema.minCommentLength) {
      throw new Error(`Review must be at least ${reviewSchema.minCommentLength} characters long`);
    }

    if (review.comment.length > reviewSchema.maxCommentLength) {
      throw new Error(`Review cannot exceed ${reviewSchema.maxCommentLength} characters`);
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...review,
          userId: currentUser?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview = await response.json();
      
      setReviews(prevReviews => ({
        ...prevReviews,
        [review.productId]: [...(prevReviews[review.productId] || []), newReview]
      }));

      return newReview;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to submit review: ${error.message}`);
      }
      throw new Error('Failed to submit review');
    }
  };

  const markReviewHelpful = async (reviewId: string) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to mark a review as helpful');
    }

    if (helpfulReviews.includes(reviewId)) {
      throw new Error('You have already marked this review as helpful');
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark review as helpful');
      }

      setHelpfulReviews(prev => [...prev, reviewId]);
      
      setReviews(prevReviews => {
        const updatedReviews = { ...prevReviews };
        
        for (const productId in updatedReviews) {
          updatedReviews[productId] = updatedReviews[productId].map(review => 
            review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
          );
        }
        
        return updatedReviews;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to mark review as helpful: ${error.message}`);
      }
      throw new Error('Failed to mark review as helpful');
    }
  };

  const getAverageRating = (productId: string): number => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / productReviews.length;
    
    // Round to nearest 0.5
    return Math.round(average * 2) / 2;
  };

  // User authentication functions
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      const { user } = data;
      
      if (!user) {
        return false;
      }

      setCurrentUser(user);
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const { user } = await response.json();
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Registration failed. ${error.message}`);
      }
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
    return sampleOrders.filter(order => order.userId === currentUser?.id);
  };
  
  // Get order by ID
  const getOrderById = (orderId: string) => {
    if (!isAuthenticated) return undefined;
    return sampleOrders.find(order => order.id === orderId && order.userId === currentUser?.id);
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
    cartItemCount,
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
