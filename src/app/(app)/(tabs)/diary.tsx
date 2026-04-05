import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDiaryStore } from '@/store/diaryStore';
import { useGoalsStore } from '@/store/goalsStore';

export default function DiaryScreen() {
  const { dailyTotals, fetchDiary } = useDiaryStore();
  const { goals, fetchGoals } = useGoalsStore();

  useEffect(() => {
    fetchDiary();
    fetchGoals();
  }, []);

  const currentCalories = dailyTotals?.total_calories || 0;
  const currentProtein = dailyTotals?.total_protein || 0;
  const currentCarbs = dailyTotals?.total_carbs || 0;
  const currentFat = dailyTotals?.total_fat || 0;

  const calorieGoal = goals?.calorie_goal || 2000;
  const proteinGoal = goals?.protein_goal_g || 150;
  const carbsGoal = goals?.carbs_goal_g || 250;
  const fatGoal = goals?.fat_goal_g || 65;

  const caloriesLeft = calorieGoal - currentCalories;
  const proteinLeft = proteinGoal - currentProtein;
  const carbsLeft = carbsGoal - currentCarbs;
  const fatLeft = fatGoal - currentFat;

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-16 pb-4">
          <Text className="text-text-secondary text-sm">TODAY</Text>
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-white text-4xl font-bold">CalTrack</Text>
            <View className="bg-[#1a1a1a] rounded-full px-4 py-2 flex-row items-center">
              <Ionicons name="flame" size={16} color="#ff6b35" />
              <Text className="text-white ml-1 font-semibold">15</Text>
            </View>
          </View>
        </View>

        {/* Main Calorie Card */}
        <View className="mx-6 mb-6 bg-[#1a1a1a] rounded-3xl p-6">
          <Text className="text-white text-6xl font-bold">{caloriesLeft.toLocaleString()}</Text>
          <Text className="text-text-secondary text-base mt-2">calories left</Text>
          <View className="flex-row items-center mt-3">
            <Ionicons name="restaurant-outline" size={16} color="#6b7280" />
            <Text className="text-text-secondary text-sm ml-1">{currentCalories} eaten</Text>
            <Ionicons name="flame-outline" size={16} color="#6b7280" className="ml-4" />
            <Text className="text-text-secondary text-sm ml-1">{calorieGoal} goal</Text>
          </View>
        </View>

        {/* Macro Cards */}
        <View className="flex-row px-6 gap-3 mb-6">
          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-[#10b981]" />
              <Text className="text-text-secondary text-xs ml-2">PROTEIN</Text>
            </View>
            <Text className="text-white text-3xl font-bold">{proteinLeft}g</Text>
            <Text className="text-text-secondary text-sm mt-1">left</Text>
          </View>

          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <Text className="text-text-secondary text-xs ml-2">CARBS</Text>
            </View>
            <Text className="text-white text-3xl font-bold">{carbsLeft}g</Text>
            <Text className="text-text-secondary text-sm mt-1">left</Text>
          </View>

          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              <Text className="text-text-secondary text-xs ml-2">FAT</Text>
            </View>
            <Text className="text-white text-3xl font-bold">{fatLeft}g</Text>
            <Text className="text-text-secondary text-sm mt-1">left</Text>
          </View>
        </View>

        {/* Recently Uploaded */}
        <View className="px-6">
          <Text className="text-white text-xl font-semibold mb-4">Recently uploaded</Text>
          
          {currentCalories === 0 ? (
            <View className="items-center py-16">
              <Ionicons name="camera-outline" size={64} color="#374151" />
              <Text className="text-white text-xl font-semibold mt-4">No meals today</Text>
              <Text className="text-text-secondary text-center mt-2">
                Take a photo of your meal to get started
              </Text>
            </View>
          ) : (
            <View className="bg-[#1a1a1a] rounded-2xl p-4">
              <Text className="text-white">Meals will appear here</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
