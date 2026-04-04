/**
 * Seed script for IFCT 2017 (Indian Food Composition Tables)
 * 
 * Data source: https://www.ifct2017.com/
 * 
 * This script should:
 * 1. Download IFCT 2017 data (CSV/Excel format)
 * 2. Parse and normalize food names
 * 3. Insert into Supabase foods table with source='ifct' and verified=true
 * 
 * Run with: npx tsx scripts/seed-ifct.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function seedIFCT() {
  console.log('Starting IFCT 2017 seed...');
  
  // TODO: Implement IFCT data parsing and insertion
  // Sample structure:
  const sampleFoods = [
    {
      name: 'Dal Makhani',
      name_local: 'दाल मखनी',
      serving_size_g: 150,
      serving_label: '1 katori',
      calories: 280,
      protein_g: 11,
      carbs_g: 35,
      fat_g: 9,
      fiber_g: 8,
      sugar_g: 3,
      sodium_mg: 450,
      source: 'ifct',
      verified: true,
    },
    // Add more foods...
  ];

  const { data, error } = await supabase
    .from('foods')
    .insert(sampleFoods);

  if (error) {
    console.error('Error seeding IFCT:', error);
  } else {
    console.log(`Successfully seeded ${sampleFoods.length} IFCT foods`);
  }
}

seedIFCT();
