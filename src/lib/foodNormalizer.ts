import type { Food } from '@/types/food';

/**
 * Normalizes food names for better search matching
 * Handles common Indian food name variations
 */
export function normalizeFoodName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Scales macros based on portion size
 */
export function scaleMacros(
  food: Food,
  portionGrams: number
): {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
} {
  const ratio = portionGrams / food.serving_size_g;
  
  return {
    calories: Math.round(food.calories * ratio),
    protein_g: Math.round(food.protein_g * ratio * 10) / 10,
    carbs_g: Math.round(food.carbs_g * ratio * 10) / 10,
    fat_g: Math.round(food.fat_g * ratio * 10) / 10,
  };
}

/**
 * Common Indian serving size presets
 */
export const SERVING_PRESETS = {
  katori: { label: '1 katori', grams: 150 },
  roti: { label: '1 roti', grams: 40 },
  cup: { label: '1 cup', grams: 240 },
  bowl: { label: '1 bowl', grams: 200 },
  piece: { label: '1 piece', grams: 50 },
  '100g': { label: '100g', grams: 100 },
};
