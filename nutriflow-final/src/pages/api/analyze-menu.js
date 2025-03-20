import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { menuItems, userProfile } = req.body;
  
  if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
    return res.status(400).json({ error: 'Valid menu items are required' });
  }

  try {
    // Start timer to measure performance
    const startTime = performance.now();
    
    // In a production environment, this would call OpenAI API
    // For demo purposes, we'll return sample analysis results
    const analysisResults = analyzeMenuItems(menuItems, userProfile);
    
    // Log performance metrics
    const endTime = performance.now();
    console.log(`Menu analysis completed in ${endTime - startTime}ms`);
    
    return res.status(200).json({ 
      results: analysisResults,
      processingTime: Math.round(endTime - startTime)
    });
  } catch (error) {
    console.error('Error analyzing menu:', error);
    return res.status(500).json({ error: 'Failed to analyze menu items' });
  }
}

// Sample analysis function
function analyzeMenuItems(menuItems, userProfile) {
  return menuItems.map(item => {
    // Extract keywords from menu item name and description
    const itemText = `${item.name} ${item.description || ''}`.toLowerCase();
    
    // Simple scoring based on keywords
    let healthScore = 50; // Default middle score
    let healthCategory = 'Balanced';
    
    // Healthy keywords
    const healthyKeywords = ['salad', 'grilled', 'steamed', 'baked', 'vegetable', 'fruit', 'lean'];
    // Unhealthy keywords
    const unhealthyKeywords = ['fried', 'cream', 'butter', 'sugar', 'sweet', 'chocolate', 'bacon'];
    
    // Adjust score based on keywords
    healthyKeywords.forEach(keyword => {
      if (itemText.includes(keyword)) healthScore += 5;
    });
    
    unhealthyKeywords.forEach(keyword => {
      if (itemText.includes(keyword)) healthScore -= 5;
    });
    
    // Clamp score between 0-100
    healthScore = Math.max(0, Math.min(100, healthScore));
    
    // Determine category based on score
    if (healthScore >= 70) healthCategory = 'Healthiest';
    else if (healthScore <= 30) healthCategory = 'Indulgent';
    
    // Generate dietary tags based on item text
    const dietaryTags = [];
    if (itemText.includes('protein') || itemText.includes('chicken') || itemText.includes('beef') || itemText.includes('fish')) {
      dietaryTags.push('High-Protein');
    }
    if (itemText.includes('salad') || itemText.includes('vegetable')) {
      dietaryTags.push('Nutrient-Dense');
    }
    if (itemText.includes('low') && (itemText.includes('carb') || itemText.includes('calorie'))) {
      dietaryTags.push('Low-Carb');
    }
    
    // Check for allergies
    const warnings = [];
    if (userProfile && userProfile.allergies) {
      userProfile.allergies.forEach(allergy => {
        if (allergy !== 'None' && itemText.includes(allergy.toLowerCase())) {
          warnings.push(`Contains ${allergy}, which you are allergic to`);
        }
      });
    }
    
    if (warnings.length === 0) {
      warnings.push('No specific warnings for your profile');
    }
    
    return {
      ...item,
      healthScore,
      healthCategory,
      nutritionalInfo: {
        protein: '15-20g',
        carbs: '30-40g',
        fat: '10-15g',
        calories: '300-400'
      },
      shortTermEffects: ['Provides moderate energy', 'Typical digestion time'],
      longTermEffects: ['Neutral impact on health goals', 'Balanced nutrient profile'],
      modifications: ['Ask for dressing on the side to reduce calories', 'Request less salt if watching sodium'],
      warnings,
      dietaryTags: dietaryTags.length > 0 ? dietaryTags : ['Balanced']
    };
  });
}
