import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { PortionSlider } from '@/components/PortionSlider';
import { supabase } from '@/lib/supabase';
import { scaleMacros, SERVING_PRESETS } from '@/lib/foodNormalizer';
import { useDiaryStore } from '@/store/diaryStore';
import type { Food, MealType } from '@/types/food';

export default function FoodDetailScreen() {
  const { foodId } = useLocalSearchParams<{ foodId: string }>();
  const [food, setFood] = useState<Food | null>(null);
  const [portion, setPortion] = useState(100);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { addLog } = useDiaryStore();

  useEffect(() => {
    loadFood();
  }, [foodId]);

  const loadFood = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('foods')
      .select('*')
      .eq('id', foodId)
      .single();
    
    if (data) {
      setFood(data as Food);
      setPortion(data.serving_size_g);
    }
    setIsLoading(false);
  };

  const handleAddToDiary = async () => {
    if (!food) return;
    
    setIsSaving(true);
    const macros = scaleMacros(food, portion);
    
    await addLog({
      food_id: food.id,
      meal_type: selectedMeal,
      quantity_g: portion,
      calories: macros.calories,
      protein_g: macros.protein_g,
      carbs_g: macros.carbs_g,
      fat_g: macros.fat_g,
      source: 'manual',
    });
    
    setIsSaving(false);
    router.back();
  };

  if (isLoading || !food) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const macros = scaleMacros(food, portion);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Food Info */}
        <View className="p-6 border-b border-gray-800">
          <Text className="text-white text-2xl font-bold">{food.name}</Text>
          {food.name_local && (
            <Text className="text-text-secondary text-lg mt-1">{food.name_local}</Text>
          )}
          {food.brand && (
            <Text className="text-text-secondary mt-2">{food.brand}</Text>
          )}
        </View>

        {/* Calories */}
        <View className="items-center py-8 border-b border-gray-800">
          <Text className="text-6xl font-bold text-white">{macros.calories}</Text>
          <Text className="text-text-secondary mt-2">calories</Text>
        </View>

        {/* Macros */}
        <View className="flex-row justify-around py-6 border-b border-gray-800">
          <View className="items-center">
            <Text className="text-primary text-xs mb-1">PROTEIN</Text>
            <Text className="text-white font-bold text-2xl">{macros.protein_g}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-amber text-xs mb-1">CARBS</Text>
            <Text className="text-white font-bold text-2xl">{macros.carbs_g}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-blue text-xs mb-1">FAT</Text>
            <Text className="text-white font-bold text-2xl">{macros.fat_g}g</Text>
          </View>
        </View>

        {/* Portion Slider */}
        <View className="px-6 py-4 border-b border-gray-800">
          <PortionSlider value={portion} onChange={setPortion} max={500} />
          
          {/* Serving Presets */}
          <View className="flex-row flex-wrap gap-2 mt-4">
            {Object.entries(SERVING_PRESETS).map(([key, preset]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setPortion(preset.grams)}
                className={`px-4 py-2 rounded-lg ${
                  portion === preset.grams ? 'bg-primary' : 'bg-background-card'
                }`}
              >
                <Text className={portion === preset.grams ? 'text-white' : 'text-text-secondary'}>
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Meal Type Selector */}
        <View className="px-6 py-4">
          <Text className="text-text-secondary text-sm mb-3">Add to meal</Text>
          <View className="flex-row flex-wrap gap-2">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((meal) => (
              <TouchableOpacity
                key={meal}
                onPress={() => setSelectedMeal(meal)}
                className={`px-6 py-3 rounded-lg ${
                  selectedMeal === meal ? 'bg-primary' : 'bg-background-card'
                }`}
              >
                <Text className={`capitalize ${selectedMeal === meal ? 'text-white font-semibold' : 'text-text-secondary'}`}>
                  {meal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View className="p-4 border-t border-gray-800">
        <TouchableOpacity
          onPress={handleAddToDiary}
          disabled={isSaving}
          className="bg-primary rounded-lg py-4 items-center"
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-lg">Add to Diary</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
