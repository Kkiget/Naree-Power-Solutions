import { products } from './products';

// Get all unique categories from products
export const getCategories = () => [...new Set(products.map(product => product.category))];

// Format price to KSh format
export const formatPrice = (price: number) => {
  return `KSh ${price.toLocaleString()}`;
};

// Filter products by category
export const filterProductsByCategory = (category: string | null) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

// Search products
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return products;
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};
