import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Food } from '@/types/food';

interface FoodCardProps {
  food: Food;
  onPress: () => void;
}

export function FoodCard({ food, onPress }: FoodCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-card rounded-lg p-4 mb-2 flex-row items-center justify-between"
    >
      <View className="flex-1">
        <Text className="text-white font-medium">
          {food.name}
        </Text>
        {food.name_local && (
          <Text className="text-text-secondary text-sm mt-1">
            {food.name_local}
          </Text>
        )}
        {food.brand && (
          <Text className="text-text-secondary text-xs mt-1">
            {food.brand}
          </Text>
        )}
        <View className="flex-row mt-2 space-x-3">
          <Text className="text-xs text-text-secondary">
            {food.serving_size_g}g serving
          </Text>
          <Text className="text-xs text-primary">
            P: {food.protein_g}g
          </Text>
          <Text className="text-xs text-amber">
            C: {food.carbs_g}g
          </Text>
          <Text className="text-xs text-blue">
            F: {food.fat_g}g
          </Text>
        </View>
      </View>
      
      <View className="items-end ml-4">
        <Text className="text-white font-bold text-lg">
          {food.calories}
        </Text>
        <Text className="text-text-secondary text-xs">
          kcal
        </Text>
        {food.verified && (
          <View className="flex-row items-center mt-1">
            <Ionicons name="checkmark-circle" size={12} color="#10b981" />
            <Text className="text-primary text-xs ml-1">Verified</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
