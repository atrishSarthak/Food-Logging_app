import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { AIResultCard } from '@/components/AIResultCard';
import { useDiaryStore } from '@/store/diaryStore';
import type { EnrichedAIItem, MealType } from '@/types/food';

export default function AIConfirmScreen() {
  const { imageBase64, imageUri } = useLocalSearchParams<{ imageBase64: string; imageUri: string }>();
  const [items, setItems] = useState<EnrichedAIItem[]>([]);
  const [mealContext, setMealContext] = useState<MealType>('lunch');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { addLog } = useDiaryStore();

  useEffect(() => {
    analyzeFood();
  }, []);

  const analyzeFood = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await response.json();
      
      if (data.error) {
        Alert.alert('Analysis Failed', data.error);
        router.back();
        return;
      }

      setItems(data.items || []);
      setMealContext(data.meal_context || 'lunch');
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('Error', 'Failed to analyze meal. Please try again.');
      router.back();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddAll = async () => {
    if (items.length === 0) return;

    setIsSaving(true);
    try {
      for (const item of items) {
        await addLog({
          food_id: item.dbMatch?.id || '', // Will need to create AI estimate entries
          meal_type: mealContext,
          quantity_g: item.portion_g,
          calories: item.finalCalories,
          protein_g: item.finalProtein,
          carbs_g: item.finalCarbs,
          fat_g: item.finalFat,
          photo_url: imageUri,
          source: 'ai_scan',
        });
      }

      Alert.alert('Success', 'Meal logged successfully!');
      router.push('/(app)/(tabs)/diary');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save meal. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const totalCalories = items.reduce((sum, item) => sum + item.finalCalories, 0);
  const totalProtein = items.reduce((sum, item) => sum + item.finalProtein, 0);
  const totalCarbs = items.reduce((sum, item) => sum + item.finalCarbs, 0);
  const totalFat = items.reduce((sum, item) => sum + item.finalFat, 0);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Captured Image */}
        <Image
          source={{ uri: imageUri }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {isAnalyzing ? (
          <View className="p-8 items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-white mt-4">Analyzing your meal...</Text>
            <Text className="text-text-secondary text-sm mt-2 text-center">
              Using AI to identify foods and estimate nutrition
            </Text>
          </View>
        ) : (
          <>
            {/* Total Summary */}
            <View className="bg-background-card mx-4 mt-4 rounded-lg p-4">
              <Text className="text-text-secondary text-sm mb-2">Total for this meal</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-bold text-2xl">{totalCalories} kcal</Text>
                <View className="flex-row space-x-4">
                  <View className="items-center">
                    <Text className="text-primary text-xs">P</Text>
                    <Text className="text-white font-medium">{totalProtein}g</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-amber text-xs">C</Text>
                    <Text className="text-white font-medium">{totalCarbs}g</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-blue text-xs">F</Text>
                    <Text className="text-white font-medium">{totalFat}g</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Detected Items */}
            <View className="p-4">
              <Text className="text-white font-semibold mb-3">
                Detected items ({items.length})
              </Text>
              {items.map((item, index) => (
                <AIResultCard
                  key={index}
                  item={item}
                  onEdit={() => {
                    // TODO: Open edit modal
                    Alert.alert('Edit', 'Edit functionality coming soon');
                  }}
                />
              ))}
            </View>

            {/* Meal Type Selector */}
            <View className="px-4 pb-4">
              <Text className="text-text-secondary text-sm mb-3">Add to meal</Text>
              <View className="flex-row flex-wrap gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((meal) => (
                  <TouchableOpacity
                    key={meal}
                    onPress={() => setMealContext(meal)}
                    className={`px-6 py-3 rounded-lg ${
                      mealContext === meal ? 'bg-primary' : 'bg-background-card'
                    }`}
                  >
                    <Text className={`capitalize ${mealContext === meal ? 'text-white font-semibold' : 'text-text-secondary'}`}>
                      {meal}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Add Button */}
      {!isAnalyzing && items.length > 0 && (
        <View className="p-4 border-t border-gray-800">
          <TouchableOpacity
            onPress={handleAddAll}
            disabled={isSaving}
            className="bg-primary rounded-lg py-4 items-center"
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Add all to diary
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
