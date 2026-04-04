# Integration Guide: Calibre Food → Main Calibre App

This document outlines the exact steps to merge the standalone Calibre Food app into the main Calibre fitness app.

## Pre-Integration Checklist

- [ ] Main Calibre app uses Expo SDK 54 (or compatible)
- [ ] Main Calibre app uses Expo Router v4
- [ ] Main Calibre app uses NativeWind v4
- [ ] Main Calibre app uses Zustand for state
- [ ] Main Calibre app has Supabase configured
- [ ] Main Calibre app has auth working

## Step 1: Database Migration

### 1.1 Run Food Schema Migration

In your main Calibre app's Supabase project:

```sql
-- Run the contents of supabase/migrations/001_food_schema.sql
-- This adds: foods, food_logs, nutrition_goals tables
-- Plus: daily_totals view and RLS policies
```

### 1.2 Verify Tables Created

Check that these tables exist:

- `foods`
- `food_logs`
- `nutrition_goals`
- `daily_totals` (view)

## Step 2: Install Dependencies

Add these to main app's `package.json` (if not already present):

```bash
npx expo install expo-camera expo-barcode-scanner expo-image-manipulator expo-image-picker
npm install @google/generative-ai@^0.21.0 victory-native@^41.0.0 @react-native-community/slider
```

## Step 3: Merge Configuration Files

### 3.1 app.json

Add to `plugins` array:

```json
[
  "expo-camera",
  {
    "cameraPermission": "Allow Calibre to access your camera to scan meals"
  }
],
[
  "expo-barcode-scanner",
  {
    "cameraPermission": "Allow Calibre to scan barcodes on packaged foods"
  }
]
```

Add to iOS `infoPlist`:

```json
"NSCameraUsageDescription": "Calibre needs camera access to scan your meals for nutrition tracking",
"NSPhotoLibraryUsageDescription": "Calibre needs photo library access to select meal photos"
```

### 3.2 tailwind.config.js

Merge color definitions:

```js
colors: {
  primary: {
    DEFAULT: '#10b981', // green for protein
    dark: '#059669',
  },
  amber: {
    DEFAULT: '#f59e0b', // carbs
  },
  blue: {
    DEFAULT: '#3b82f6', // fat
  },
  // ... keep existing colors
}
```

### 3.3 Environment Variables

Add to main app's `.env`:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
```

## Step 4: Copy Source Files

### 4.1 Types

Copy `src/types/food.ts` → `src/types/food.ts`

### 4.2 Library Files

Copy these to main app's `src/lib/`:

- `gemini.ts` (new)
- `foodNormalizer.ts` (new)
- Update `supabase.ts` if needed (should already exist)
- Merge `utils.ts` functions

### 4.3 Zustand Stores

Copy to main app's `src/store/`:

- `diaryStore.ts`
- `goalsStore.ts`

### 4.4 Components

Copy all components to main app's `src/components/`:

- `MacroRing.tsx`
- `MealSection.tsx`
- `FoodCard.tsx`
- `PortionSlider.tsx`
- `AIResultCard.tsx`

### 4.5 API Routes

Copy to main app's `src/app/api/`:

- `analyze-food+api.ts`
- `search-food+api.ts`
- `log-meal+api.ts`

### 4.6 Screens

Copy to main app's `src/app/(app)/`:

- `food-search.tsx`
- `food-detail.tsx`
- `ai-confirm.tsx`
- `barcode.tsx`

## Step 5: Integrate Tab Navigation

### Option A: Add Food as New Tab

In main app's `(tabs)/_layout.tsx`, add:

```tsx
<Tabs.Screen
  name="food"
  options={{
    title: "Food",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="restaurant-outline" size={size} color={color} />
    ),
  }}
/>
```

Then copy `diary.tsx` → `(tabs)/food.tsx`

### Option B: Merge into Existing Home Tab

If main app already has a home/dashboard tab, add a "Food Diary" section that navigates to the diary screen.

## Step 6: Update Auth Integration

### 6.1 Remove Mock User

In all copied files, replace:

```typescript
import { MOCK_USER_ID } from '@/lib/supabase';
// ... later
.eq('user_id', MOCK_USER_ID)
```

With:

```typescript
import { useAuth } from '@/hooks/useAuth'; // or wherever main app's auth is
// ... in component
const { user } = useAuth();
// ... later
.eq('user_id', user.id)
```

### 6.2 Update Stores

In `diaryStore.ts` and `goalsStore.ts`, replace `MOCK_USER_ID` with actual user ID from auth context.

## Step 7: Update Navigation

### 7.1 Update Food Search Navigation

In `MealSection.tsx`, update the "Add food" button to navigate to the correct path in your main app's routing structure.

### 7.2 Update Camera FAB

In `diary.tsx`, ensure the camera FAB navigates to the correct scan screen path.

## Step 8: Test Integration

### 8.1 Test Checklist

- [ ] Food search works
- [ ] Can add food to diary
- [ ] Diary shows logged foods
- [ ] Camera scan works
- [ ] AI analysis works
- [ ] Barcode scan works
- [ ] Goals can be set
- [ ] Analytics shows data
- [ ] RLS policies work (users only see their own data)

### 8.2 Common Issues

**Issue**: API routes not found

- **Fix**: Ensure API routes are in `src/app/api/` with `+api.ts` suffix

**Issue**: Supabase RLS blocking queries

- **Fix**: Check that auth.uid() is properly set in Supabase

**Issue**: Camera not working

- **Fix**: Rebuild app (camera requires native build, not Expo Go)

**Issue**: Styles not applying

- **Fix**: Ensure NativeWind is configured in babel.config.js

## Step 9: Data Seeding

### 9.1 Seed IFCT 2017 Data

Run the seed script to populate Indian foods:

```bash
npm run seed:ifct
```

### 9.2 Seed Open Food Facts

Run the seed script for packaged foods:

```bash
npm run seed:off
```

## Step 10: Production Considerations

### 10.1 Environment Variables

Ensure production environment has:

- `EXPO_PUBLIC_GEMINI_API_KEY` (production key)
- `SUPABASE_SERVICE_KEY` (keep secret, server-side only)

### 10.2 Rate Limiting

Gemini free tier: 1500 requests/day

- Consider caching AI results
- Add rate limiting on API routes
- Upgrade to paid tier if needed

### 10.3 Image Storage

Currently images are stored as base64 in params.
For production:

- Upload to Supabase Storage
- Store URL in `food_logs.photo_url`
- Update `ai-confirm.tsx` to handle upload

### 10.4 Error Tracking

Add error tracking to:

- `analyze-food+api.ts` (AI failures)
- `search-food+api.ts` (search failures)
- Camera capture errors

## Step 11: Feature Flags (Optional)

Consider adding a feature flag to gradually roll out food tracking:

```typescript
const FOOD_FEATURE_ENABLED = process.env.EXPO_PUBLIC_FOOD_ENABLED === 'true';

// In tab layout
{FOOD_FEATURE_ENABLED && (
  <Tabs.Screen name="food" ... />
)}
```

## Rollback Plan

If integration causes issues:

1. Remove food tab from navigation
2. Comment out food-related API routes
3. Keep database tables (data preserved)
4. Re-enable when issues resolved

## Post-Integration Tasks

- [ ] Update main app README with food features
- [ ] Add food tracking to onboarding flow
- [ ] Create user documentation
- [ ] Add analytics tracking for food features
- [ ] Monitor Gemini API usage
- [ ] Collect user feedback
- [ ] Plan v2 features (meal plans, recipes, etc.)

## Support

For integration issues:

- Check main Calibre app's architecture docs
- Review Expo Router migration guide
- Test in isolation before full integration
- Use feature flags for gradual rollout
