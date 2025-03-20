import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    // Start timer to measure performance
    const startTime = performance.now();
    
    // In a production environment, this would call Google Vision API
    // For demo purposes, we'll simulate OCR processing
    const text = await simulateOCR(image);
    
    // Log performance metrics
    const endTime = performance.now();
    console.log(`OCR processing completed in ${endTime - startTime}ms`);
    
    return res.status(200).json({ 
      text,
      processingTime: Math.round(endTime - startTime)
    });
  } catch (error) {
    console.error('Error processing OCR:', error);
    return res.status(500).json({ error: 'Failed to process image' });
  }
}

// Simulate OCR processing
async function simulateOCR(imageBase64) {
  // In a real implementation, this would call Google Vision API
  // For demo purposes, we'll return sample text
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `SOHO WAREHOUSE

HOUSE TONICS
Picante De La Casa, Cazadores Reposado, lime, chili, cilantro - 19
Eastern Standard, 42 Below or Bombay Sapphire, lime, cucumber, mint - 19

BOTTLES & CAN
Bitburger non-alcoholic pilsner - 9
Modelo Especial - 9
Peroni - 9`;
}

// In a production environment, this would be the actual Google Vision API call
async function callGoogleVisionAPI(imageBase64) {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;
  
  const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: imageBase64
          },
          features: [
            {
              type: 'TEXT_DETECTION'
            }
          ]
        }
      ]
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  
  const data = await response.json();
  
  if (!data.responses || !data.responses[0] || !data.responses[0].textAnnotations) {
    throw new Error('No text detected in image');
  }
  
  return data.responses[0].textAnnotations[0].description;
}
