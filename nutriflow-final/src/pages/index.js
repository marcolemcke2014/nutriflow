import { useState, useRef } from 'react';
import { useMenuAnalysis } from '../hooks/useMenuAnalysis';
import { useImageOptimizer } from '../hooks/useImageOptimizer';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import FoodAnalysisResult from '../components/ai/FoodAnalysisResult';
import FeedbackForm from '../components/ai/FeedbackForm';
import SimpleFeedback from '../components/ui/SimpleFeedback';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const fileInputRef = useRef(null);
  
  const { menuItems, isLoading, progress, error, analyzeMenu } = useMenuAnalysis();
  const { optimizeImage, isProcessing } = useImageOptimizer();
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedItem(null);
    
    try {
      // Optimize image before analysis
      const optimizedImage = await optimizeImage(file);
      
      // Analyze menu
      await analyzeMenu(optimizedImage.file);
    } catch (err) {
      console.error('Error processing image:', err);
    }
  };
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowFeedback(false);
  };
  
  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    setShowFeedback(true);
    setSelectedItem(null);
  };
  
  const handleCloseFeedback = () => {
    setSelectedItem(null);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">NutriFlow</h1>
          <p className="text-gray-500">AI-powered menu analysis for healthier choices</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Upload and preview */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Menu Image</h2>
              
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                
                <button
                  onClick={triggerFileInput}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select Menu Photo
                </button>
                
                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={previewUrl}
                        alt="Menu preview"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
                
                <LoadingIndicator
                  progress={progress}
                  isVisible={isLoading || isProcessing}
                  operation={isProcessing ? "upload" : "analysis"}
                />
                
                {error && (
                  <div className="p-4 bg-red-50 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Middle column - Results */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Menu Analysis</h2>
              
              {menuItems.length > 0 ? (
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <FoodAnalysisResult
                      key={item.id}
                      item={item}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No analysis yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a menu photo to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Details and feedback */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {selectedItem ? (
                <FeedbackForm
                  menuItem={selectedItem}
                  onSubmit={handleFeedbackSubmit}
                  onClose={handleCloseFeedback}
                />
              ) : showFeedback ? (
                <SimpleFeedback
                  onSubmit={(data) => console.log('Simple feedback:', data)}
                  itemName="Analysis"
                />
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Item details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a menu item to see detailed analysis and provide feedback.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} NutriFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
