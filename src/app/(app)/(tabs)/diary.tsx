import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDiaryStore } from '@/store/diaryStore';
import { useGoalsStore } from '@/store/goalsStore';
import { MacroRing } from '@/components/MacroRing';
import { MealSection } from '@/components/MealSection';
import { formatDate } from '@/lib/utils';
import { addDays, format } from 'date-fns';

export default function DiaryScreen() {
  const { logs, dailyTotals, selectedDate, isLoading, fetchDiary, deleteLog, setDate, logsByMeal } = useDiaryStore();
  const { goals, fetchGoals } = useGoalsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDiary();
    fetchGoals();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDiary();
    setRefreshing(false);
  };

  const goToPreviousDay = () => {
    const newDate = addDays(new Date(selectedDate), -1);
    setDate(format(newDate, 'yyyy-MM-dd'));
  };

  const goToNextDay = () => {
    const newDate = addDays(new Date(selectedDate), 1);
    setDate(format(newDate, 'yyyy-MM-dd'));
  };

  const goToToday = () => {
    setDate(new Date().toISOString().split('T')[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const currentCalories = dailyTotals?.total_calories || 0;
  const currentProtein = dailyTotals?.total_protein || 0;
  const currentCarbs = dailyTotals?.total_carbs || 0;
  const currentFat = dailyTotals?.total_fat || 0;

  const calorieGoal = goals?.calorie_goal || 2000;
  const proteinGoal = goals?.protein_goal_g || 150;
  const carbsGoal = goals?.carbs_goal_g || 200;
  const fatGoal = goals?.fat_goal_g || 65;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />
        }
      >
        {/* Date Navigator */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-800">
          <TouchableOpacity onPress={goToPreviousDay} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={goToToday}>
            <Text className="text-white text-lg font-semibold">
              {formatDate(selectedDate)}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={goToNextDay} className="p-2">
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Macro Ring */}
        <View className="items-center py-8">
          <MacroRing current={currentCalories} goal={calorieGoal} />
        </View>

        {/* Macro Breakdown */}
        <View className="flex-row justify-around px-4 pb-6 border-b border-gray-800">
          <View className="items-center">
            <Text className="text-primary text-xs mb-1">PROTEIN</Text>
            <Text className="text-white font-bold text-lg">{currentProtein}g</Text>
            <Text className="text-text-secondary text-xs">/ {proteinGoal}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-amber text-xs mb-1">CARBS</Text>
            <Text className="text-white font-bold text-lg">{currentCarbs}g</Text>
            <Text className="text-text-secondary text-xs">/ {carbsGoal}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-blue text-xs mb-1">FAT</Text>
            <Text className="text-white font-bold text-lg">{currentFat}g</Text>
            <Text className="text-text-secondary text-xs">/ {fatGoal}g</Text>
          </View>
        </View>

        {/* Meal Sections */}
        <View className="p-4">
          <MealSection
            mealType="breakfast"
            logs={logsByMeal.breakfast}
            onDeleteLog={deleteLog}
          />
          <MealSection
            mealType="lunch"
            logs={logsByMeal.lunch}
            onDeleteLog={deleteLog}
          />
          <MealSection
            mealType="dinner"
            logs={logsByMeal.dinner}
            onDeleteLog={deleteLog}
          />
          <MealSection
            mealType="snack"
            logs={logsByMeal.snack}
            onDeleteLog={deleteLog}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      {isToday && (
        <TouchableOpacity
          onPress={() => router.push('/(app)/(tabs)/scan')}
          className="absolute bottom-6 right-6 bg-primary rounded-full w-16 h-16 items-center justify-center shadow-lg"
          style={{
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="camera" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}
