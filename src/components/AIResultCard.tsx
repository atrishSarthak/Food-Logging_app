import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { EnrichedAIItem } from '@/types/food';

interface AIResultCardProps {
  item: EnrichedAIItem;
  onEdit: () => void;
}

export function AIResultCard({ item, onEdit }: AIResultCardProps) {
  const isLowConfidence = item.confidence < 0.7;
  
  return (
    <View className="bg-background-card rounded-lg p-4 mb-3">
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-white font-semibold text-base">
            {item.dish}
          </Text>
          {item.dish_local && (
            <Text className="text-text-secondary text-sm mt-1">
              {item.dish_local}
            </Text>
          )}
        </View>
        
        <TouchableOpacity onPress={onEdit} className="ml-2">
          <Ionicons name="create-outline" size={20} color="#10b981" />
        </TouchableOpacity>
      </View>

      {isLowConfidence && (
        <View className="flex-row items-center bg-amber/20 rounded px-2 py-1 mb-2">
          <Ionicons name="warning-outline" size={14} color="#f59e0b" />
          <Text className="text-amber text-xs ml-1">
            AI is unsure — tap to edit
          </Text>
        </View>
      )}

      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row space-x-4">
          <View>
            <Text className="text-text-secondary text-xs">Portion</Text>
            <Text className="text-white font-medium">{item.portion_g}g</Text>
          </View>
          <View>
            <Text className="text-text-secondary text-xs">Calories</Text>
            <Text className="text-white font-medium">{item.finalCalories}</Text>
          </View>
        </View>
        
        <View className="flex-row space-x-3">
          <View className="items-center">
            <Text className="text-primary text-xs">P</Text>
            <Text className="text-white text-sm font-medium">{item.finalProtein}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-amber text-xs">C</Text>
            <Text className="text-white text-sm font-medium">{item.finalCarbs}g</Text>
          </View>
          <View className="items-center">
            <Text className="text-blue text-xs">F</Text>
            <Text className="text-white text-sm font-medium">{item.finalFat}g</Text>
          </View>
        </View>
      </View>

      {item.dbMatch && (
        <View className="flex-row items-center mt-2 pt-2 border-t border-gray-800">
          <Ionicons name="checkmark-circle" size={12} color="#10b981" />
          <Text className="text-primary text-xs ml-1">
            Matched with verified database
          </Text>
        </View>
      )}
    </View>
  );
}
