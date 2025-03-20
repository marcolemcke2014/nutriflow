import React from 'react';

/**
 * FoodAnalysisResult component displays the analysis results for a menu item
 * 
 * @param {Object} props Component props
 * @param {Object} props.item The analyzed menu item with nutritional information
 * @param {Function} props.onClick Function to call when the item is clicked
 */
const FoodAnalysisResult = ({ item, onClick }) => {
  // Determine the color based on health category
  const getCategoryColor = () => {
    switch (item.healthCategory) {
      case 'Healthiest':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Balanced':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Indulgent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      onClick={() => onClick(item)} 
      className="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
          {item.healthCategory}
        </span>
      </div>
      
      {item.description && (
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
      )}
      
      <div className="flex items-center mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              item.healthScore > 70 ? 'bg-green-600' : 
              item.healthScore > 40 ? 'bg-blue-600' : 'bg-orange-500'
            }`}
            style={{ width: `${item.healthScore}%` }}
          />
        </div>
        <span className="ml-2 text-sm font-medium">{item.healthScore}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="font-medium">Protein:</p>
          <p>{item.nutritionalInfo?.protein || 'Unknown'}</p>
        </div>
        <div>
          <p className="font-medium">Carbs:</p>
          <p>{item.nutritionalInfo?.carbs || 'Unknown'}</p>
        </div>
        <div>
          <p className="font-medium">Fat:</p>
          <p>{item.nutritionalInfo?.fat || 'Unknown'}</p>
        </div>
        <div>
          <p className="font-medium">Calories:</p>
          <p>{item.nutritionalInfo?.calories || 'Unknown'}</p>
        </div>
      </div>
      
      {item.dietaryTags && item.dietaryTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.dietaryTags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <p className="mt-3 text-sm text-gray-500">Click for more details</p>
    </div>
  );
};

export default FoodAnalysisResult;
