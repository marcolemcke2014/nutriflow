import React, { useState } from 'react';

/**
 * FeedbackForm component for collecting user feedback on food analysis
 * 
 * @param {Object} props Component props
 * @param {Object} props.menuItem The analyzed menu item
 * @param {Function} props.onSubmit Function to call when feedback is submitted
 * @param {Function} props.onClose Function to call when the form is closed
 */
const FeedbackForm = ({ menuItem, onSubmit, onClose }) => {
  const [accuracy, setAccuracy] = useState(3);
  const [helpfulness, setHelpfulness] = useState(3);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      accuracy,
      helpfulness,
      comments,
      timestamp: new Date().toISOString()
    });
    
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Thank You!</h3>
          <p className="mt-2 text-gray-600">
            Your feedback helps us improve our analysis for everyone.
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Feedback for: {menuItem.name}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How accurate was our nutritional analysis?
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Not accurate</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAccuracy(value)}
                  className={`w-8 h-8 rounded-full focus:outline-none ${
                    accuracy >= value ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">Very accurate</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How helpful was this information for your decision?
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Not helpful</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setHelpfulness(value)}
                  className={`w-8 h-8 rounded-full focus:outline-none ${
                    helpfulness >= value ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">Very helpful</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            id="comments"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tell us what we could improve..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
