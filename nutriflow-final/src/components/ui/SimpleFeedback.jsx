import React, { useState } from 'react';

/**
 * SimpleFeedback component that allows users to provide feedback on the analysis results
 * 
 * @param {Object} props Component props
 * @param {Function} props.onSubmit Function to call when feedback is submitted
 * @param {string} props.itemName Name of the menu item being rated
 */
const SimpleFeedback = ({ onSubmit, itemName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, itemName });
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-md text-center">
        <p className="text-green-700 font-medium">Thank you for your feedback!</p>
        <p className="text-sm text-green-600">Your input helps us improve our recommendations.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How accurate was our analysis of "{itemName}"?
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <svg 
                className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Additional comments (optional)
        </label>
        <textarea
          id="comment"
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Tell us more about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      
      <button
        type="submit"
        disabled={rating === 0}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          rating > 0 
            ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default SimpleFeedback;
