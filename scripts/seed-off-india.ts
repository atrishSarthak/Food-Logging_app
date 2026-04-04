/**
 * Seed script for Open Food Facts India database
 * 
 * Data source: https://world.openfoodfacts.org/
 * API: https://world.openfoodfacts.org/data
 * 
 * This script should:
 * 1. Fetch Indian packaged foods from Open Food Facts API
 * 2. Filter for foods with barcodes and complete nutrition data
 * 3. Insert into Supabase foods table with source='off' and verified=false
 * 
 * Run with: npx tsx scripts/seed-off-india.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function seedOpenFoodFacts() {
  console.log('Starting Open Food Facts India seed...');
  
  // TODO: Implement OFF API fetching and insertion
  // Sample structure for packaged foods:
  const sampleFoods = [
    {
      name: 'Amul Butter',
      brand: 'Amul',
      barcode: '8901430001234',
      serving_size_g: 100,
      serving_label: '100g',
      calories: 717,
      protein_g: 0.5,
      carbs_g: 0.6,
      fat_g: 81,
      fiber_g: 0,
      sugar_g: 0.6,
      sodium_mg: 625,
      source: 'off',
      verified: false,
    },
    // Add more packaged foods...
  ];

  const { data, error } = await supabase
    .from('foods')
    .insert(sampleFoods);

  if (error) {
    console.error('Error seeding OFF:', error);
  } else {
    console.log(`Successfully seeded ${sampleFoods.length} OFF foods`);
  }
}

seedOpenFoodFacts();
