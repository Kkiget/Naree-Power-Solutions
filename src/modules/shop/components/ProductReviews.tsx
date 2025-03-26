'use client';

import { useState } from 'react';
import { useShop, Review } from '../context/ShopContext';
import { FaStar, FaRegStar, FaCheck, FaThumbsUp } from 'react-icons/fa';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { 
    getProductReviews, 
    addProductReview, 
    markReviewHelpful, 
    getAverageRating 
  } = useShop();
  
  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    userName: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProductReview({
      productId,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      userName: newReview.userName,
      date: new Date().toISOString().split('T')[0],
      verified: true
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setNewReview({
        rating: 5,
        title: '',
        comment: '',
        userName: ''
      });
    }, 3000);
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-orange-600">
        {i < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  };
  
  const renderRatingStats = () => {
    if (reviews.length === 0) return null;
    
    const ratingCounts = Array(5).fill(0);
    reviews.forEach(review => {
      ratingCounts[5 - review.rating]++;
    });
    
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Rating Distribution</h4>
        {ratingCounts.map((count, i) => {
          const stars = 5 - i;
          const percentage = (count / reviews.length) * 100;
          
          return (
            <div key={stars} className="flex items-center mb-1">
              <div className="flex items-center w-20">
                <span className="text-sm">{stars} stars</span>
              </div>
              <div className="flex-1 h-3 mx-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-600 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-10 text-xs text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
        </div>
      </div>
      
      {renderRatingStats()}
      
      {!showForm && !submitted && (
        <button 
          onClick={() => setShowForm(true)}
          className="mb-8 bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors"
        >
          Write a Review
        </button>
      )}
      
      {showForm && !submitted && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Rating*</label>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className="text-2xl"
                >
                  {i < newReview.rating ? (
                    <FaStar className="text-orange-600" />
                  ) : (
                    <FaRegStar className="text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="reviewName" className="block text-gray-700 mb-2">Your Name*</label>
            <input
              type="text"
              id="reviewName"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={newReview.userName}
              onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="reviewTitle" className="block text-gray-700 mb-2">Review Title*</label>
            <input
              type="text"
              id="reviewTitle"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="reviewComment" className="block text-gray-700 mb-2">Review*</label>
            <textarea
              id="reviewComment"
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            ></textarea>
          </div>
          
          <div className="flex">
            <button 
              type="submit"
              className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition-colors mr-2"
            >
              Submit Review
            </button>
            <button 
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {submitted && (
        <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
          <FaCheck className="mr-2" />
          Thank you for your review! It has been submitted successfully.
        </div>
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="flex mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <h4 className="font-semibold text-lg">{review.title}</h4>
                </div>
                <div className="text-sm text-gray-500">
                  {review.date}
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">
                  {review.userName}
                </span>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              <button 
                onClick={() => markReviewHelpful(review.id)}
                className="flex items-center text-sm text-gray-600 hover:text-orange-600"
              >
                <FaThumbsUp className="mr-1" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">This product doesn't have any reviews yet.</p>
          <p className="text-gray-700">Be the first to share your experience with this product!</p>
        </div>
      )}
    </div>
  );
}
