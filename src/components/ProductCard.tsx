import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  image: string;
  category: string;
  name: string;
  rating: number;
  originalPrice: string;
  discountedPrice: string;
  discountPercentage?: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  category,
  name,
  rating,
  originalPrice,
  discountedPrice,
  discountPercentage,
  onAddToCart
}) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {discountPercentage && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs uppercase tracking-wider">{category}</p>
        <h3 className="text-lg font-bold mt-2">{name}</h3>
        <div className="flex items-center mt-1" aria-label={`Rating: ${rating} out of 5`}>
          {[...Array(filledStars)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
          {hasHalfStar && (
            <span className="text-yellow-400">½</span>
          )}
          {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
            <span key={i} className="text-gray-300">★</span>
          ))}
        </div>
        <div className="mt-2">
          <span className="line-through text-gray-400 text-sm">{originalPrice}</span>
          <span className="text-red-500 text-xl font-bold ml-2">{discountedPrice}</span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded flex justify-center items-center hover:bg-gray-800 transition-colors duration-200"
          aria-label="Add to cart"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
