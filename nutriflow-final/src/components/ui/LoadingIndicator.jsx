import React from 'react';

/**
 * LoadingIndicator component that shows a visual representation of the loading progress
 * with appropriate status messages for each stage of the process.
 * 
 * @param {Object} props Component props
 * @param {number} props.progress Current progress percentage (0-100)
 * @param {boolean} props.isVisible Whether the loading indicator should be visible
 * @param {string} props.operation The current operation being performed (e.g., "upload", "analysis")
 */
const LoadingIndicator = ({ progress = 0, isVisible = false, operation = "analysis" }) => {
  if (!isVisible) return null;
  
  // Determine the appropriate message based on progress and operation
  const getMessage = () => {
    if (operation === "upload") {
      if (progress < 30) return "📸 Preparing image...";
      if (progress < 60) return "⚙️ Optimizing image size...";
      if (progress < 90) return "📤 Uploading image...";
      return "✅ Upload complete!";
    } else { // analysis
      if (progress < 25) return "⏳ Extracting text from image...";
      if (progress < 50) return "🔍 Identifying menu items...";
      if (progress < 75) return "🧠 Analyzing nutritional content...";
      if (progress < 95) return "📊 Generating recommendations...";
      return "✨ Finalizing results...";
    }
  };
  
  // Determine color based on operation
  const getColor = () => {
    return operation === "upload" ? "bg-blue-600" : "bg-green-600";
  };
  
  return (
    <div className="w-full mt-4 space-y-2">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`${getColor()} h-2.5 rounded-full transition-all duration-300 ease-out`} 
          style={{ width: `${Math.max(5, progress)}%` }} // Minimum 5% width for visibility
        />
      </div>
      
      {/* Status message */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">{getMessage()}</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
