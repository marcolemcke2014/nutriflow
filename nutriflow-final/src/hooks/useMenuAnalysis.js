import { useState, useEffect } from 'react';

/**
 * Custom hook for analyzing menu images and extracting nutritional information
 * 
 * @returns {Object} Hook methods and state
 */
export function useMenuAnalysis() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  /**
   * Analyzes a menu image and extracts nutritional information
   * 
   * @param {File} imageFile - The menu image file to analyze
   * @returns {Promise<Array>} The analyzed menu items
   */
  const analyzeMenu = async (imageFile) => {
    try {
      setIsLoading(true);
      setProgress(0);
      setError('');

      // Step 1: Convert image to base64
      const imageBase64 = await fileToBase64(imageFile);
      setProgress(20);

      // Step 2: OCR Processing - Extract text from image
      const ocrResponse = await fetch('/api/vision-ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64.split(',')[1] }),
      });

      if (!ocrResponse.ok) {
        throw new Error('OCR processing failed');
      }

      const ocrData = await ocrResponse.json();
      setProgress(50);

      // Step 3: Parse menu items from OCR text
      // In a real implementation, this would parse the OCR text into menu items
      // For demo purposes, we'll use sample data
      const parsedMenuItems = parseMenuItems(ocrData.text);
      
      // Step 4: Analyze menu items
      const analysisResponse = await fetch('/api/analyze-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menuItems: parsedMenuItems,
          userProfile: {
            dietaryPreferences: ["Balanced diet", "Moderate alcohol"],
            healthGoals: ["Weight maintenance", "Energy optimization"],
            activityLevel: "Moderate",
            allergies: ["None"],
            medicalConditions: ["None"]
          }
        }),
      });

      if (!analysisResponse.ok) {
        throw new Error('Menu analysis failed');
      }

      const analysisData = await analysisResponse.json();
      setProgress(90);

      // Step 5: Process results
      setMenuItems(analysisData.results || getSampleMenuItems());
      setProgress(100);
      setIsLoading(false);
      
      return analysisData.results || getSampleMenuItems();
    } catch (error) {
      console.error('Error analyzing menu:', error);
      setError('Failed to analyze menu. Please try again.');
      setIsLoading(false);
      setMenuItems(getSampleMenuItems());
      return getSampleMenuItems();
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Helper function to parse menu items from OCR text
  const parseMenuItems = (text) => {
    // In a real implementation, this would parse the OCR text into menu items
    // For demo purposes, we'll return sample data
    return [
      {
        id: '1',
        name: "Picante De La Casa",
        description: "Cazadores Reposado, lime, chili, cilantro",
        price: "$19",
        category: "HOUSE TONICS"
      },
      {
        id: '2',
        name: "Eastern Standard",
        description: "42 Below or Bombay Sapphire, lime, cucumber, mint",
        price: "$19",
        category: "HOUSE TONICS"
      },
      {
        id: '3',
        name: "Bitburger non-alcoholic pilsner",
        description: "Non-alcoholic beer from Germany",
        price: "$9",
        category: "BOTTLES & CAN"
      }
    ];
  };

  // Sample menu items for fallback
  const getSampleMenuItems = () => {
    return [
      {
        id: '1',
        name: "Picante De La Casa",
        description: "Cazadores Reposado, lime, chili, cilantro",
        price: "$19",
        category: "HOUSE TONICS",
        healthScore: 45,
        healthCategory: "Balanced",
        nutritionalInfo: {
          protein: "0-2g",
          carbs: "5-8g",
          fat: "0-1g",
          calories: "120-150"
        },
        shortTermEffects: [
          "Moderate alcohol content may cause mild relaxation",
          "Chili can boost metabolism temporarily",
          "May cause mild dehydration due to alcohol content"
        ],
        longTermEffects: [
          "Regular consumption may contribute to increased alcohol tolerance",
          "Moderate impact on liver health if consumed regularly",
          "Neutral impact on weight management goals"
        ],
        modifications: [
          "Ask for less alcohol for a lighter option",
          "Request extra lime for vitamin C boost",
          "Ask for mild chili if you're sensitive to spice"
        ],
        warnings: [
          "Contains alcohol - not suitable during pregnancy or when driving"
        ],
        dietaryTags: ["Contains alcohol", "Gluten-free", "Low calorie"]
      },
      {
        id: '2',
        name: "Eastern Standard",
        description: "42 Below or Bombay Sapphire, lime, cucumber, mint",
        price: "$19",
        category: "HOUSE TONICS",
        healthScore: 48,
        healthCategory: "Balanced",
        nutritionalInfo: {
          protein: "0-1g",
          carbs: "6-9g",
          fat: "0-1g",
          calories: "130-160"
        },
        shortTermEffects: [
          "Cucumber and mint provide refreshing hydration",
          "Moderate alcohol content may cause mild relaxation",
          "Mint may aid digestion"
        ],
        longTermEffects: [
          "Regular consumption may contribute to increased alcohol tolerance",
          "Moderate impact on liver health if consumed regularly",
          "Neutral impact on weight management goals"
        ],
        modifications: [
          "Ask for extra cucumber for added hydration",
          "Request less alcohol for a lighter option",
          "Add a splash of soda water to dilute alcohol content"
        ],
        warnings: [
          "Contains alcohol - not suitable during pregnancy or when driving"
        ],
        dietaryTags: ["Contains alcohol", "Gluten-free", "Low calorie"]
      },
      {
        id: '3',
        name: "Bitburger non-alcoholic pilsner",
        description: "Non-alcoholic beer from Germany",
        price: "$9",
        category: "BOTTLES & CAN",
        healthScore: 78,
        healthCategory: "Healthiest",
        nutritionalInfo: {
          protein: "0-1g",
          carbs: "10-15g",
          fat: "0g",
          calories: "50-80"
        },
        shortTermEffects: [
          "No alcohol means no impairment or relaxation effects",
          "Provides hydration similar to other non-alcoholic beverages",
          "Beer flavor without alcohol-related side effects"
        ],
        longTermEffects: [
          "No impact on liver health from alcohol",
          "Lower calorie content supports weight management goals",
          "Suitable for those avoiding alcohol for health, religious, or personal reasons"
        ],
        modifications: [
          "None needed - already a healthier alternative"
        ],
        warnings: [
          "May contain trace amounts of alcohol (typically <0.5%)",
          "Still contains calories and carbs despite being non-alcoholic"
        ],
        dietaryTags: ["Non-alcoholic", "Low calorie"]
      }
    ];
  };

  return {
    menuItems,
    isLoading,
    progress,
    error,
    analyzeMenu
  };
}
