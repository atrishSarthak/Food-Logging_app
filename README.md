# Calibre Food

A standalone React Native / Expo app for food logging and calorie tracking, built to be integrated into the main Calibre fitness app.

## Tech Stack

- **Framework**: Expo SDK 54, Expo Router v4
- **Language**: TypeScript (strict mode)
- **Styling**: NativeWind v4 + Tailwind CSS
- **State**: Zustand v5
- **Database**: Supabase (PostgreSQL)
- **AI Vision**: Gemini 2.0 Flash
- **Charts**: Victory Native XL
- **Camera**: expo-camera v15

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/001_food_schema.sql`
   - Copy your project URL and keys to `.env`

4. Get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key (free tier: 1500 requests/day)
   - Add to `.env`

5. Start the development server:

```bash
npx expo start
```

## Project Structure

```
calibre-food/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── (app)/(tabs)/      # Tab navigation
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities and configs
│   ├── store/                 # Zustand stores
│   └── types/                 # TypeScript types
├── supabase/migrations/       # Database schema
└── scripts/                   # Seed scripts
```

## Features

- 📸 AI-powered meal scanning with Gemini Vision
- 🔍 Fuzzy search for Indian foods (IFCT 2017 database)
- 📊 Macro tracking with visual progress rings
- 📈 Analytics and trends
- 🎯 TDEE calculator and goal setting
- 📱 Barcode scanning for packaged foods

## Integration Notes

This app is designed to be merged into the main Calibre app:

- Uses same routing patterns (Expo Router with nested groups)
- Uses same styling (NativeWind)
- Uses same state management (Zustand)
- Shares Supabase instance with main app
- Auth handled by main app (mock user for standalone)

## Development

- Use `npx expo install` for all Expo packages (not `npm install`)
- SDK 54 is the maximum supported version (Expo Go limitation)
- All styling uses NativeWind classes (no StyleSheet API)
- TypeScript strict mode enforced

## License

Proprietary - Part of Calibre fitness app
