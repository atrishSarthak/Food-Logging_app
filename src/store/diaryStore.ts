import { create } from 'zustand';
import { supabase, MOCK_USER_ID } from '@/lib/supabase';
import type { FoodLog, DailyTotals, MealType } from '@/types/food';

interface DiaryState {
  logs: FoodLog[];
  dailyTotals: DailyTotals | null;
  selectedDate: string;
  isLoading: boolean;

  fetchDiary: (date?: string) => Promise<void>;
  addLog: (log: Omit<FoodLog, 'id' | 'user_id' | 'logged_at' | 'date'>) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
  setDate: (date: string) => void;

  // Derived — logs grouped by meal
  logsByMeal: Record<MealType, FoodLog[]>;
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  logs: [],
  dailyTotals: null,
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,
  logsByMeal: { breakfast: [], lunch: [], dinner: [], snack: [] },

  setDate: (date) => {
    set({ selectedDate: date });
    get().fetchDiary(date);
  },

  fetchDiary: async (date) => {
    const targetDate = date ?? get().selectedDate;
    set({ isLoading: true });

    const { data: logs } = await supabase
      .from('food_logs')
      .select('*, food:foods(*)')
      .eq('user_id', MOCK_USER_ID)
      .eq('date', targetDate)
      .order('logged_at');

    const { data: totals } = await supabase
      .from('daily_totals')
      .select('*')
      .eq('user_id', MOCK_USER_ID)
      .eq('date', targetDate)
      .maybeSingle();

    const grouped = {
      breakfast: [] as FoodLog[],
      lunch: [] as FoodLog[],
      dinner: [] as FoodLog[],
      snack: [] as FoodLog[],
    };

    logs?.forEach((log) => {
      grouped[log.meal_type as MealType].push(log as FoodLog);
    });

    set({
      logs: (logs as FoodLog[]) ?? [],
      dailyTotals: totals as DailyTotals,
      logsByMeal: grouped,
      isLoading: false,
    });
  },

  addLog: async (logData) => {
    const { data } = await supabase
      .from('food_logs')
      .insert({ ...logData, user_id: MOCK_USER_ID })
      .select('*, food:foods(*)')
      .single();

    if (data) {
      get().fetchDiary(); // refresh totals
    }
  },

  deleteLog: async (id) => {
    await supabase.from('food_logs').delete().eq('id', id);
    get().fetchDiary();
  },
}));
