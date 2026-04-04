import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FoodLog, MealType } from '@/types/food';
import { router } from 'expo-router';

interface MealSectionProps {
  mealType: MealType;
  logs: FoodLog[];
  onDeleteLog: (id: string) => void;
}

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

export function MealSection({ mealType, logs, onDeleteLog }: MealSectionProps) {
  const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-lg font-semibold text-white">
            {MEAL_LABELS[mealType]}
          </Text>
          {totalCalories > 0 && (
            <Text className="text-sm text-text-secondary ml-2">
              {totalCalories} kcal
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => router.push('/food-search')}
          className="flex-row items-center"
        >
          <Ionicons name="add-circle-outline" size={20} color="#10b981" />
          <Text className="text-primary ml-1 text-sm">Add food</Text>
        </TouchableOpacity>
      </View>

      {logs.length === 0 ? (
        <TouchableOpacity
          onPress={() => router.push('/food-search')}
          className="bg-background-card rounded-lg p-4 border border-dashed border-gray-700"
        >
          <Text className="text-text-secondary text-center">
            No items logged
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="bg-background-card rounded-lg overflow-hidden">
          {logs.map((log, index) => (
            <View
              key={log.id}
              className={`flex-row items-center justify-between p-4 ${
                index < logs.length - 1 ? 'border-b border-gray-800' : ''
              }`}
            >
              <View className="flex-1">
                <Text className="text-white font-medium">
                  {log.food?.name || 'Unknown food'}
                </Text>
                <Text className="text-text-secondary text-sm mt-1">
                  {log.quantity_g}g
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-white font-semibold mr-3">
                  {log.calories} kcal
                </Text>
                <TouchableOpacity onPress={() => onDeleteLog(log.id)}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
