# 🚀 Get Started NOW - 5 Minutes to MVP

## Step 1: Get Your Supabase Keys (2 minutes)

You already have your Supabase project! Now get the correct keys:

1. Go to: https://supabase.com/dashboard/project/nghwumkltrfttybispmr/settings/api

2. You'll see two keys:
   - **Project API keys** section:
     - `anon` `public` - Copy this (starts with `eyJh...`)
     - `service_role` `secret` - Copy this (starts with `eyJh...`)

## Step 2: Update .env File (1 minute)

Open `calibre-food/.env` and replace:

```env
# Replace this line:
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# With your actual anon key from Supabase dashboard

# Replace this line:
SUPABASE_SERVICE_KEY=your_supabase_service_role_key_here

# With your actual service_role key from Supabase dashboard
```

Your .env should look like:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
EXPO_PUBLIC_SUPABASE_URL=https://nghwumkltrfttybispmr.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naHd1bWtsdHJmdHR5YmlzcG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU0NzcsImV4cCI6MjA1MjI1MTQ3N30.YOUR_ACTUAL_ANON_KEY_HERE
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_SERVICE_KEY_HERE
```

## Step 3: Setup Database (2 minutes)

1. Go to: https://supabase.com/dashboard/project/nghwumkltrfttybispmr/editor

2. Click **SQL Editor** in left sidebar

3. Click **New query**

4. Copy the ENTIRE contents of `calibre-food/supabase/migrations/001_food_schema.sql`

5. Paste into SQL Editor

6. Click **Run** (or press Cmd+Enter)

7. You should see: ✅ "Success. No rows returned"

## Step 4: Add Sample Food Data (1 minute)

Still in SQL Editor, run this query:

```sql
INSERT INTO foods (name, name_local, serving_size_g, serving_label, calories, protein_g, carbs_g, fat_g, fiber_g, source, verified) VALUES
('Basmati Rice (cooked)', 'बासमती चावल', 150, '1 cup', 205, 4.3, 45, 0.4, 0.6, 'ifct', true),
('Dal Makhani', 'दाल मखनी', 150, '1 katori', 280, 11, 35, 9, 8, 'ifct', true),
('Roti (whole wheat)', 'रोटी', 40, '1 roti', 120, 4, 22, 2, 3, 'ifct', true),
('Chicken Breast (grilled)', 'चिकन ब्रेस्ट', 100, '100g', 165, 31, 0, 3.6, 0, 'ifct', true),
('Paneer', 'पनीर', 100, '100g', 265, 18, 3, 20, 0, 'ifct', true),
('Curd (plain)', 'दही', 100, '1 cup', 60, 3.5, 4.5, 3, 0, 'ifct', true),
('Banana', 'केला', 120, '1 medium', 105, 1.3, 27, 0.3, 3, 'ifct', true),
('Egg (boiled)', 'अंडा', 50, '1 egg', 78, 6.3, 0.6, 5.3, 0, 'ifct', true);
```

Click **Run**. You should see: ✅ "Success. 8 rows inserted"

## Step 5: Get Gemini API Key (Optional - for AI scanning)

1. Go to: https://makersuite.google.com/app/apikey

2. Sign in with Google

3. Click **Create API Key**

4. Copy the key

5. Add to `.env`:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...your_key_here
   ```

**Note**: You can skip this for now and test without AI scanning. The rest of the app will work!

## Step 6: Start the App! 🎉

```bash
cd calibre-food
npx expo start
```

You'll see a QR code in the terminal.

## Step 7: Open on Your Phone

### iPhone:

1. Download **Expo Go** from App Store
2. Open Camera app
3. Scan the QR code
4. App opens in Expo Go

### Android:

1. Download **Expo Go** from Play Store
2. Open Expo Go app
3. Scan the QR code
4. App opens

## Step 8: Test the MVP! ✅

Once the app opens:

1. **See the Diary screen** with macro ring showing "2000 remaining"

2. **Tap "Add food"** on any meal section

3. **Search for "dal"** - you should see "Dal Makhani"

4. **Tap it** → adjust portion → select meal → **Add to Diary**

5. **Go back to Diary** - you should see:
   - Dal Makhani in your meal
   - Macro ring updated
   - Calories and macros showing

6. **Test Profile tab** - change your calorie goal

7. **Test Scan tab** - camera should open (grant permission)

## Troubleshooting

### "Network request failed"

- Make sure you updated the `.env` file with your actual keys
- Restart the Expo server: `npx expo start -c`

### "No results" when searching

- Make sure you ran Step 4 (insert sample foods)
- Check Supabase Table Editor shows the foods

### Can't scan QR code

- Make sure phone and computer are on same WiFi
- Try pressing `w` in terminal to open in web browser first

### App crashes on open

- Check terminal for errors
- Try: `npx expo start -c` (clear cache)

## What You Can Test Without Gemini Key

✅ Food search and add to diary
✅ Macro tracking and ring
✅ Date navigation
✅ Delete foods
✅ Edit goals
✅ Profile and TDEE calculator

❌ AI meal scanning (needs Gemini key)

## Next Steps After Testing

1. Add more foods via SQL queries
2. Get Gemini key to test AI scanning
3. Customize your goals
4. Read INTEGRATION.md when ready to merge

---

**Need help?** Check the terminal output for errors or re-read this guide.
