'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ShopFilters() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    priceRange,
    setPriceRange
  } = useShop();

  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  // Find min and max prices
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // State to track expanded filter sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: false,
    availability: false
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 flex items-center gap-2">
            <FaFilter className="text-orange-600" />
            Filter Products
          </h3>
          <button 
            className="text-orange-600 text-sm font-medium hover:text-orange-700"
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setPriceRange([minPrice, maxPrice]);
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setSearchQuery('')}
          >
            {searchQuery ? '✕' : '🔍'}
          </button>
        </div>
      </div>
      
      {/* Categories */}
      <div className="border-b border-gray-200">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="font-medium text-gray-700">Categories</h4>
          {expandedSections.categories ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
        
        {expandedSections.categories && (
          <div className="p-4 pt-0">
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === (category === 'All' ? '' : category)}
                      onChange={() => setSelectedCategory(category === 'All' ? '' : category)}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="text-gray-700">{category}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      ({category === 'All' 
                        ? products.length 
                        : products.filter(p => p.category === category).length})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="border-b border-gray-200">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('price')}
        >
          <h4 className="font-medium text-gray-700">Price Range</h4>
          {expandedSections.price ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
        
        {expandedSections.price && (
          <div className="p-4 pt-0">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span>Ksh {priceRange[0].toLocaleString()}</span>
              <span>Ksh {priceRange[1].toLocaleString()}</span>
            </div>
            
            <div className="relative mb-3">
              <div className="absolute h-1 bg-gray-200 top-1/2 left-0 right-0 transform -translate-y-1/2 rounded"></div>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="absolute left-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-600 [&::-moz-range-thumb]:border-0"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="absolute left-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-600 [&::-moz-range-thumb]:border-0"
              />
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="flex-1">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || minPrice, priceRange[1]])}
                  min={minPrice}
                  max={priceRange[1]}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>
              <span className="text-gray-400">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                  min={priceRange[0]}
                  max={maxPrice}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>
            </div>
            
            <button 
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full shadow-sm"
              onClick={() => {
                // Apply price filter logic here
              }}
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>
      
      {/* Availability */}
      <div className="border-b border-gray-200">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('availability')}
        >
          <h4 className="font-medium text-gray-700">Availability</h4>
          {expandedSections.availability ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
        
        {expandedSections.availability && (
          <div className="p-4 pt-0">
            <ul className="space-y-2">
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-orange-600 focus:ring-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-gray-700">In Stock</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-orange-600 focus:ring-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-gray-700">Out of Stock</span>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Discount */}
      <div>
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('rating')}
        >
          <h4 className="font-medium text-gray-700">Discount</h4>
          {expandedSections.rating ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
        
        {expandedSections.rating && (
          <div className="p-4 pt-0">
            <ul className="space-y-2">
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-orange-600 focus:ring-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-gray-700">10% or more</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-orange-600 focus:ring-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-gray-700">20% or more</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-orange-600 focus:ring-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-gray-700">30% or more</span>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
