# Nutriflow

AI-powered meal recommendation app. Upload a menu photo to get personalized health insights.

## Features

- **Menu Image Analysis**: Upload photos of restaurant menus for instant nutritional analysis
- **AI-Powered Insights**: Get detailed health scores, nutritional information, and personalized recommendations
- **Health Categorization**: Items are categorized as Healthiest, Balanced, or Indulgent
- **Short & Long-Term Effects**: Understand both immediate and long-term health impacts
- **Personalized Modifications**: Receive suggestions to improve nutritional value based on your preferences
- **Dietary Warnings**: Get alerts about potential allergens or health concerns

## Setup

1. Clone the repo.
2. Install dependencies: `npm install`.
3. Add API keys to `.env.local`:
   ```
   GOOGLE_VISION_API_KEY=your_google_vision_key
   OPENAI_API_KEY=your_openai_key
   ```
4. Run locally: `npm run dev`.
5. Deploy to Vercel: Push to GitHub and link to Vercel.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **OCR Processing**: Google Vision API with Tesseract.js fallback
- **AI Analysis**: OpenAI API integration
- **Deployment**: Vercel

## Deployment

- Vercel auto-deploys from the `main` branch.
- Environment variables must be set in the Vercel dashboard.

## Development

### Project Structure

```
nutriflow/
├── public/                    # Static assets
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ai/                # AI-related components
│   │   ├── ui/                # General UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── ai/                # AI analysis services
│   │   ├── ocr/               # OCR processing services
│   ├── pages/                 # Next.js pages and API routes
│   │   ├── api/               # Backend API routes
│   │   ├── index.js           # Homepage
│   └── styles/                # CSS files
├── .env.local                 # Local environment variables (not in Git)
├── .gitignore                 # Git ignore file
├── package.json               # Node.js dependencies and scripts
├── vercel.json                # Vercel configuration
└── README.md                  # Project documentation
```

### API Routes

- `/api/vision-ocr`: Handles OCR processing of menu images
- `/api/analyze-menu`: Analyzes menu items and provides nutritional insights

## License

MIT
