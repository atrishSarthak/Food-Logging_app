export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type FoodSource = "ifct" | "off" | "usda" | "community" | "ai_estimate";

export interface Food {
  id: string;
  name: string;
  name_local?: string;
  brand?: string;
  barcode?: string;
  serving_size_g: number;
  serving_label?: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  source: FoodSource;
  verified: boolean;
}

export interface FoodLog {
  id: string;
  user_id: string;
  food_id: string;
  food?: Food; // joined
  meal_type: MealType;
  quantity_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  photo_url?: string;
  source: "manual" | "ai_scan" | "barcode" | "quick_add";
  logged_at: string;
  date: string;
}

export interface DailyTotals {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  total_entries: number;
}

export interface NutritionGoals {
  calorie_goal: number;
  protein_goal_g: number;
  carbs_goal_g: number;
  fat_goal_g: number;
  activity_level: "sedentary" | "light" | "moderate" | "active" | "very_active";
  goal_type: "lose" | "maintain" | "gain";
}

// Returned by Gemini vision API
export interface AIFoodItem {
  dish: string;
  dish_local?: string;
  portion_g: number;
  confidence: number;
  calories_est: number;
  protein_est: number;
  carbs_est: number;
  fat_est: number;
}

export interface AIAnalysisResult {
  items: AIFoodItem[];
  meal_context: MealType;
  low_confidence_flag: boolean;
}

// After cross-referencing with Supabase food DB
export interface EnrichedAIItem extends AIFoodItem {
  dbMatch?: Food;
  finalCalories: number;
  finalProtein: number;
  finalCarbs: number;
  finalFat: number;
  source: FoodSource;
}
