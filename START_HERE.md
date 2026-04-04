# 🎯 START HERE - Get MVP Running in 5 Minutes

## You're Almost There! Just 3 Steps:

### ✅ Step 1: Get Your Supabase Keys (2 min)

Open this link in your browser:

```
https://supabase.com/dashboard/project/nghwumkltrfttybispmr/settings/api
```

Copy these two keys:

1. **anon** **public** key (starts with `eyJh...`)
2. **service_role** **secret** key (starts with `eyJh...`)

### ✅ Step 2: Update .env File (1 min)

Open `calibre-food/.env` in your editor and paste your keys:

```env
EXPO_PUBLIC_SUPABASE_URL=https://nghwumkltrfttybispmr.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_KEY=paste_your_service_role_key_here
```

Save the file.

### ✅ Step 3: Setup Database (2 min)

Open this link:

```
https://supabase.com/dashboard/project/nghwumkltrfttybispmr/editor
```

1. Click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy ALL text from `calibre-food/supabase/migrations/001_food_schema.sql`
4. Paste and click **Run**
5. Should see: "Success. No rows returned"

Then run this to add sample foods:

```sql
INSERT INTO foods (name, name_local, serving_size_g, serving_label, calories, protein_g, carbs_g, fat_g, fiber_g, source, verified) VALUES
('Dal Makhani', 'दाल मखनी', 150, '1 katori', 280, 11, 35, 9, 8, 'ifct', true),
('Roti', 'रोटी', 40, '1 roti', 120, 4, 22, 2, 3, 'ifct', true),
('Rice', 'चावल', 150, '1 cup', 205, 4.3, 45, 0.4, 0.6, 'ifct', true),
('Chicken Breast', 'चिकन', 100, '100g', 165, 31, 0, 3.6, 0, 'ifct', true),
('Paneer', 'पनीर', 100, '100g', 265, 18, 3, 20, 0, 'ifct', true);
```

Click **Run**. Should see: "Success. 5 rows inserted"

---

## 🚀 NOW START THE APP!

```bash
cd calibre-food
npx expo start
```

Scan the QR code with:

- **iPhone**: Camera app → opens in Expo Go
- **Android**: Expo Go app → scan QR

---

## ✨ Test It Works!

1. App opens → see Diary screen
2. Tap "Add food" on Lunch
3. Search "dal" → see Dal Makhani
4. Tap it → Add to Diary
5. See it appear with calories!

---

## 🎉 That's It!

You now have a working MVP. The AI scanning will work once you add a Gemini API key (optional).

**Questions?** Check `GET_STARTED_NOW.md` for detailed troubleshooting.
