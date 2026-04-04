# Calibre Food - Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Expo Go app on your phone (iOS/Android)
- Supabase account (free tier)
- Google AI Studio account (free tier)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd calibre-food
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to Project Settings > API
4. Copy your project URL and anon key
5. Go to Project Settings > Database and copy the service role key
6. Go to SQL Editor and run the migration:
   - Copy contents of `supabase/migrations/001_food_schema.sql`
   - Paste and run in SQL Editor

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (free tier: 1500 requests/day)

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

### 5. Start Development Server

```bash
npx expo start
```

This will show a QR code. Scan it with:

- iOS: Camera app
- Android: Expo Go app

### 6. Test the App

The app will open in Expo Go on your phone. You should see:

- Diary tab (home screen) with date navigator
- Empty meal sections (no data yet)
- Scan tab with camera access request
- Analytics tab with placeholder charts
- Profile tab with goals

## Seeding Data (Optional)

To add sample food data:

```bash
# Edit scripts/seed-ifct.ts with sample Indian foods
npm run seed:ifct

# Edit scripts/seed-off-india.ts with packaged foods
npm run seed:off
```

## Common Issues

### "Camera permission denied"

- Go to phone Settings > Expo Go > Permissions
- Enable Camera access

### "Network request failed"

- Check that your .env file has correct Supabase URL
- Ensure you're on the same network as your development machine
- Try restarting the Expo server

### "Module not found"

- Run `npm install` again
- Clear cache: `npx expo start -c`

### API routes not working

- API routes only work in production builds or with Expo Router v4+
- For development, you may need to test API calls separately

## Next Steps

1. Add sample foods to Supabase manually via SQL Editor
2. Test the food search functionality
3. Try scanning a meal with the camera
4. Set your nutrition goals in Profile tab
5. Log some meals and see the diary update

## Development Tips

- Use `npx expo install` for all Expo packages (not `npm install`)
- Hot reload works - save files to see changes instantly
- Shake phone to open developer menu
- Press `r` in terminal to reload app
- Press `m` to toggle menu

## Integration with Main Calibre App

When ready to merge:

1. Copy `src/` folder contents to main app
2. Merge `app.json` plugins
3. Merge `tailwind.config.js`
4. Update main app's Supabase to include food tables
5. Replace mock user ID with real auth

## Support

For issues specific to:

- Expo: [docs.expo.dev](https://docs.expo.dev)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Gemini: [ai.google.dev](https://ai.google.dev)
