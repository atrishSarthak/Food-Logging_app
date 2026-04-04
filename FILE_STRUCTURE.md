# Complete File Structure

```
calibre-food/
│
├── Documentation
│   ├── README.md                    # Project overview
│   ├── QUICKSTART.md                # Step-by-step setup guide
│   ├── SETUP_CHECKLIST.md           # Interactive setup checklist
│   ├── INTEGRATION.md               # Merge instructions for main app
│   ├── PROJECT_SUMMARY.md           # Complete feature summary
│   └── FILE_STRUCTURE.md            # This file
│
├── Configuration
│   ├── app.json                     # Expo configuration
│   ├── babel.config.js              # Babel + NativeWind + Reanimated
│   ├── tailwind.config.js           # Tailwind theme (dark-first)
│   ├── tsconfig.json                # TypeScript config with path aliases
│   ├── nativewind-env.d.ts          # NativeWind type definitions
│   ├── package.json                 # Dependencies and scripts
│   ├── .env.example                 # Environment variables template
│   └── .gitignore                   # Git ignore rules
│
├── Entry Point
│   └── index.ts                     # Expo Router entry
│
├── Source Code (src/)
│   │
│   ├── App Screens (src/app/)
│   │   │
│   │   ├── Root Layout
│   │   │   └── _layout.tsx          # Root stack navigator
│   │   │
│   │   ├── App Group (src/app/(app)/)
│   │   │   ├── _layout.tsx          # App stack navigator
│   │   │   │
│   │   │   ├── Tabs (src/app/(app)/(tabs)/)
│   │   │   │   ├── _layout.tsx      # Tab navigator (4 tabs)
│   │   │   │   ├── diary.tsx        # 📱 Home - Macro ring, meal sections
│   │   │   │   ├── scan.tsx         # 📷 Camera for meal photos
│   │   │   │   ├── analytics.tsx    # 📊 Charts and trends
│   │   │   │   └── profile.tsx      # ⚙️  Goals and TDEE calculator
│   │   │   │
│   │   │   ├── Modal Screens
│   │   │   │   ├── food-search.tsx  # 🔍 Fuzzy search with debounce
│   │   │   │   ├── food-detail.tsx  # 🍽️  Portion adjustment, add to diary
│   │   │   │   ├── ai-confirm.tsx   # 🤖 AI result review and editing
│   │   │   │   └── barcode.tsx      # 📱 Barcode scanner
│   │   │
│   │   └── API Routes (src/app/api/)
│   │       ├── analyze-food+api.ts  # Gemini vision + DB cross-reference
│   │       ├── search-food+api.ts   # Trigram fuzzy search
│   │       └── log-meal+api.ts      # CRUD for food logs
│   │
│   ├── Components (src/components/)
│   │   ├── MacroRing.tsx            # SVG donut chart (calories)
│   │   ├── MealSection.tsx          # Breakfast/Lunch/Dinner/Snack
│   │   ├── FoodCard.tsx             # Search result item
│   │   ├── PortionSlider.tsx        # Adjustable serving size
│   │   └── AIResultCard.tsx         # AI-detected food item
│   │
│   ├── Library (src/lib/)
│   │   ├── supabase.ts              # Supabase client + mock user
│   │   ├── gemini.ts                # Gemini vision model + prompt
│   │   ├── foodNormalizer.ts        # Macro scaling, serving presets
│   │   └── utils.ts                 # Date formatting, TDEE calc
│   │
│   ├── State Management (src/store/)
│   │   ├── diaryStore.ts            # Food logs, daily totals (Zustand)
│   │   └── goalsStore.ts            # Nutrition goals (Zustand)
│   │
│   ├── Types (src/types/)
│   │   └── food.ts                  # All TypeScript interfaces
│   │
│   └── Styles (src/)
│       └── global.css               # Tailwind directives
│
├── Database (supabase/)
│   └── migrations/
│       └── 001_food_schema.sql      # Complete DB schema
│           ├── foods table          # Master food database
│           ├── food_logs table      # User meal logs
│           ├── nutrition_goals      # User daily targets
│           ├── daily_totals view    # Aggregated stats
│           ├── Trigram indexes      # Fuzzy search
│           └── RLS policies         # Row-level security
│
└── Scripts (scripts/)
    ├── seed-ifct.ts                 # IFCT 2017 Indian foods seeder
    └── seed-off-india.ts            # Open Food Facts packaged foods
```

## File Count Summary

- **Screens**: 9 (4 tabs + 4 modals + 1 barcode)
- **Components**: 5 reusable UI components
- **API Routes**: 3 server-side endpoints
- **Stores**: 2 Zustand stores
- **Library Files**: 4 utility modules
- **Type Definitions**: 1 comprehensive types file
- **Database Migrations**: 1 complete schema
- **Seed Scripts**: 2 data seeders
- **Config Files**: 7 configuration files
- **Documentation**: 6 markdown guides

**Total**: 40 source files + documentation

## Key Architectural Decisions

### 1. File-Based Routing (Expo Router v4)

```
src/app/(app)/(tabs)/diary.tsx
         │     │       └─ Screen name
         │     └─ Route group (tabs)
         └─ Route group (app)
```

### 2. API Routes Pattern

```
src/app/api/analyze-food+api.ts
            └─ +api.ts suffix = server-side route
```

### 3. Path Aliases

```typescript
import { Food } from '@/types/food';
                     └─ @ = src/
```

### 4. Component Organization

- **Screens**: In `src/app/` (routable)
- **Components**: In `src/components/` (reusable)
- **Layouts**: `_layout.tsx` files (navigation)

### 5. State Management

- **Global State**: Zustand stores in `src/store/`
- **Local State**: React useState in components
- **Server State**: Supabase queries in stores

### 6. Styling Approach

- **All styling**: NativeWind classes
- **No StyleSheet**: Zero StyleSheet.create() calls
- **Theme**: Tailwind config with custom colors
- **Dark-first**: Background #0a0a0a

## Integration Points

When merging into main Calibre app:

### Files to Copy

```
src/app/(app)/(tabs)/diary.tsx     → (tabs)/food.tsx
src/app/(app)/food-*.tsx           → (app)/food-*.tsx
src/app/(app)/ai-confirm.tsx       → (app)/ai-confirm.tsx
src/app/(app)/barcode.tsx          → (app)/barcode.tsx
src/app/api/*                      → api/*
src/components/*                   → components/*
src/lib/gemini.ts                  → lib/gemini.ts
src/lib/foodNormalizer.ts          → lib/foodNormalizer.ts
src/store/diaryStore.ts            → store/diaryStore.ts
src/store/goalsStore.ts            → store/goalsStore.ts
src/types/food.ts                  → types/food.ts
```

### Files to Merge

```
app.json                           → Merge plugins
tailwind.config.js                 → Merge colors
.env                               → Add Gemini key
```

### Files to Run

```
supabase/migrations/001_food_schema.sql → Run in Supabase SQL Editor
```

## Dependencies Added

### Expo Packages (via npx expo install)

- expo-camera@~17.0.10
- expo-barcode-scanner@^13.0.1
- expo-image-manipulator@~14.0.8
- expo-image-picker@~17.0.10
- react-native-reanimated@~4.1.1
- react-native-gesture-handler@~2.28.0
- @react-native-community/slider@5.0.1
- react-native-svg (for MacroRing)

### NPM Packages (via npm install)

- @google/generative-ai@^0.21.0
- @supabase/supabase-js@^2.101.1
- nativewind@^4.2.3
- tailwindcss@^3.4.19
- victory-native@^41.20.2
- zustand@^5.0.12
- date-fns@^3.6.0

## Environment Variables Required

```env
# AI
EXPO_PUBLIC_GEMINI_API_KEY=        # Google AI Studio

# Database
EXPO_PUBLIC_SUPABASE_URL=          # Supabase project URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anon key
SUPABASE_SERVICE_KEY=              # Supabase service key (API routes)
```

## Build Commands

```bash
# Development
npm start                          # Start Expo dev server
npm run android                    # Open on Android
npm run ios                        # Open on iOS

# Database
npm run seed:ifct                  # Seed IFCT 2017 data
npm run seed:off                   # Seed Open Food Facts data

# Type Checking
npx tsc --noEmit                   # Check TypeScript errors

# Linting (if configured)
npm run lint                       # Run ESLint
```

## Next Steps After Setup

1. ✅ Run `npm install`
2. ✅ Create Supabase project
3. ✅ Run database migration
4. ✅ Configure .env file
5. ✅ Start dev server
6. ✅ Test on device
7. ✅ Add sample food data
8. ✅ Test all features
9. ✅ Read INTEGRATION.md
10. ✅ Merge into main app

---

**Status**: ✅ Complete and ready for development testing
