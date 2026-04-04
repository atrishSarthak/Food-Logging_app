import { create } from 'zustand';
import { supabase, MOCK_USER_ID } from '@/lib/supabase';
import type { NutritionGoals } from '@/types/food';

interface GoalsState {
  goals: NutritionGoals | null;
  isLoading: boolean;

  fetchGoals: () => Promise<void>;
  updateGoals: (goals: Partial<NutritionGoals>) => Promise<void>;
}

const DEFAULT_GOALS: NutritionGoals = {
  calorie_goal: 2000,
  protein_goal_g: 150,
  carbs_goal_g: 200,
  fat_goal_g: 65,
  activity_level: 'moderate',
  goal_type: 'maintain',
};

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: DEFAULT_GOALS,
  isLoading: false,

  fetchGoals: async () => {
    set({ isLoading: true });

    const { data } = await supabase
      .from('nutrition_goals')
      .select('*')
      .eq('user_id', MOCK_USER_ID)
      .maybeSingle();

    set({
      goals: (data as NutritionGoals) ?? DEFAULT_GOALS,
      isLoading: false,
    });
  },

  updateGoals: async (updates) => {
    const currentGoals = get().goals ?? DEFAULT_GOALS;
    const newGoals = { ...currentGoals, ...updates };

    const { data } = await supabase
      .from('nutrition_goals')
      .upsert({
        user_id: MOCK_USER_ID,
        ...newGoals,
      })
      .select()
      .single();

    if (data) {
      set({ goals: data as NutritionGoals });
    }
  },
}));
