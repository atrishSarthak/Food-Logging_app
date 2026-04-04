# Setup Checklist

Use this checklist to get Calibre Food running on your device.

## ☐ Phase 1: Environment Setup (10 minutes)

### ☐ 1.1 Install Dependencies

```bash
cd calibre-food
npm install
```

**Expected**: No errors, ~900 packages installed

### ☐ 1.2 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Enter project name: "calibre-food"
5. Generate strong password
6. Choose region closest to you
7. Click "Create new project"
8. Wait ~2 minutes for provisioning

### ☐ 1.3 Get Supabase Credentials

1. Go to Project Settings > API
2. Copy "Project URL" → save for .env
3. Copy "anon public" key → save for .env
4. Copy "service_role" key → save for .env (keep secret!)

### ☐ 1.4 Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy key → save for .env

### ☐ 1.5 Configure Environment

```bash
cp .env.example .env
nano .env  # or use your editor
```

Paste your keys:

```env
EXPO_PUBLIC_GEMINI_API_KEY=AIza...
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_KEY=eyJh...
```

Save and close.

## ☐ Phase 2: Database Setup (5 minutes)

### ☐ 2.1 Run Migration

1. Go to Supabase project
2. Click "SQL Editor" in sidebar
3. Click "New query"
4. Open `supabase/migrations/001_food_schema.sql`
5. Copy entire contents
6. Paste into SQL Editor
7. Click "Run"

**Expected**: "Success. No rows returned"

### ☐ 2.2 Verify Tables

1. Click "Table Editor" in sidebar
2. Should see these tables:
   - ✓ foods
   - ✓ food_logs
   - ✓ nutrition_goals

### ☐ 2.3 Check RLS Policies

1. Click on "food_logs" table
2. Click "RLS" tab
3. Should see policy: "users see own logs"

## ☐ Phase 3: First Run (5 minutes)

### ☐ 3.1 Start Development Server

```bash
npx expo start
```

**Expected**: QR code appears in terminal

### ☐ 3.2 Install Expo Go

- **iOS**: Download from App Store
- **Android**: Download from Play Store

### ☐ 3.3 Open App

- **iOS**: Open Camera app, scan QR code
- **Android**: Open Expo Go app, scan QR code

**Expected**: App opens, shows Diary tab

### ☐ 3.4 Grant Permissions

When prompted:

- ✓ Allow camera access
- ✓ Allow photo library access (iOS)

## ☐ Phase 4: Test Core Features (10 minutes)

### ☐ 4.1 Test Diary Screen

- ✓ See date navigator
- ✓ See "Today" label
- ✓ See macro ring (0 / 2000 kcal)
- ✓ See four meal sections (empty)
- ✓ See camera FAB (bottom right)

### ☐ 4.2 Test Profile Screen

1. Tap "Profile" tab
2. Tap "Edit" button
3. Change calorie goal to 2200
4. Tap "Save"
5. Go back to Diary tab
6. Macro ring should show "2200 remaining"

### ☐ 4.3 Test Camera

1. Tap camera FAB (or Scan tab)
2. Grant camera permission if prompted
3. Point at any food
4. Tap shutter button
5. Wait for AI analysis (~3-5 seconds)

**Expected**: AI confirm screen with detected items

**Note**: AI may not detect items accurately without real meal photos. This is normal for testing.

### ☐ 4.4 Test Food Search

1. Go to Diary tab
2. Tap "Add food" on any meal
3. Type "rice" in search bar
4. Wait 300ms

**Expected**: Empty results (no data seeded yet)

This is normal! Continue to Phase 5 to add sample data.

## ☐ Phase 5: Add Sample Data (Optional, 10 minutes)

### ☐ 5.1 Add Sample Foods via SQL

1. Go to Supabase SQL Editor
2. Run this query:

```sql
INSERT INTO foods (name, name_local, serving_size_g, serving_label, calories, protein_g, carbs_g, fat_g, fiber_g, source, verified) VALUES
('Basmati Rice (cooked)', 'बासमती चावल', 150, '1 cup', 205, 4.3, 45, 0.4, 0.6, 'ifct', true),
('Dal Makhani', 'दाल मखनी', 150, '1 katori', 280, 11, 35, 9, 8, 'ifct', true),
('Roti (whole wheat)', 'रोटी', 40, '1 roti', 120, 4, 22, 2, 3, 'ifct', true),
('Chicken Breast (grilled)', 'चिकन ब्रेस्ट', 100, '100g', 165, 31, 0, 3.6, 0, 'ifct', true),
('Paneer', 'पनीर', 100, '100g', 265, 18, 3, 20, 0, 'ifct', true);
```

**Expected**: "Success. 5 rows inserted"

### ☐ 5.2 Test Search Again

1. Go back to app
2. Tap "Add food" on any meal
3. Type "dal"
4. Should see "Dal Makhani" result
5. Tap it
6. Adjust portion if desired
7. Select meal type
8. Tap "Add to Diary"

**Expected**: Returns to Diary, food appears in selected meal

### ☐ 5.3 Verify Macro Ring Updates

- Macro ring should show updated calories
- Protein/Carbs/Fat should show values
- Meal section should show logged food

## ☐ Phase 6: Test Complete Flow (5 minutes)

### ☐ 6.1 Log a Complete Meal

1. Add 3-4 different foods to "Lunch"
2. Verify each appears in the meal section
3. Check that total calories update
4. Check that macros update

### ☐ 6.2 Test Delete

1. Tap trash icon on any food item
2. Item should disappear
3. Totals should update

### ☐ 6.3 Test Date Navigation

1. Tap left arrow (previous day)
2. Should show empty diary
3. Tap "Today" to return
4. Should show logged foods again

### ☐ 6.4 Test Analytics

1. Tap "Analytics" tab
2. Should see placeholder charts
3. Should see stats (with sample data)

## ☐ Troubleshooting

### Issue: "Network request failed"

**Fix**:

- Check .env file has correct Supabase URL
- Ensure no typos in credentials
- Try restarting Expo server: `npx expo start -c`

### Issue: "Camera permission denied"

**Fix**:

- iOS: Settings > Expo Go > Camera > Allow
- Android: Settings > Apps > Expo Go > Permissions > Camera > Allow

### Issue: "No results" in search

**Fix**:

- Run Phase 5.1 to add sample data
- Check Supabase Table Editor shows foods

### Issue: AI analysis fails

**Fix**:

- Check Gemini API key in .env
- Verify key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check you haven't exceeded 1500 requests/day

### Issue: TypeScript errors

**Fix**:

```bash
npm install
npx expo start -c
```

### Issue: App won't load

**Fix**:

- Check terminal for errors
- Try: `npx expo start -c` (clear cache)
- Ensure phone and computer on same WiFi
- Try closing and reopening Expo Go

## ☐ Success Criteria

You've successfully set up Calibre Food when:

- ✓ App opens without errors
- ✓ Can search and add foods
- ✓ Diary updates with logged foods
- ✓ Macro ring shows correct totals
- ✓ Can navigate between dates
- ✓ Camera opens and captures
- ✓ Profile goals can be edited

## Next Steps

Now that setup is complete:

1. Read `INTEGRATION.md` for merge instructions
2. Add more sample foods via SQL or seed scripts
3. Test AI meal scanning with real food photos
4. Customize goals in Profile tab
5. Start logging meals!

## Need Help?

- **Expo issues**: [docs.expo.dev](https://docs.expo.dev)
- **Supabase issues**: [supabase.com/docs](https://supabase.com/docs)
- **Gemini issues**: [ai.google.dev](https://ai.google.dev)
- **Project issues**: Check `PROJECT_SUMMARY.md` and `README.md`
