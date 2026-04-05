import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGoalsStore } from '@/store/goalsStore';

export default function ProfileScreen() {
  const { goals, fetchGoals, updateGoals } = useGoalsStore();
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [proteinGoal, setProteinGoal] = useState('150');
  const [carbsGoal, setCarbsGoal] = useState('250');
  const [fatGoal, setFatGoal] = useState('65');

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (goals) {
      setCalorieGoal(goals.calorie_goal.toString());
      setProteinGoal(goals.protein_goal_g.toString());
      setCarbsGoal(goals.carbs_goal_g.toString());
      setFatGoal(goals.fat_goal_g.toString());
    }
  }, [goals]);

  const handleSave = async () => {
    await updateGoals({
      calorie_goal: parseInt(calorieGoal),
      protein_goal_g: parseInt(proteinGoal),
      carbs_goal_g: parseInt(carbsGoal),
      fat_goal_g: parseInt(fatGoal),
    });
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-16 pb-6">
          <Text className="text-white text-4xl font-bold">Settings</Text>
        </View>

        {/* Daily Goals Section */}
        <View className="px-6 mb-6">
          <Text className="text-text-secondary text-sm mb-4">DAILY GOALS</Text>
          
          <View className="bg-[#1a1a1a] rounded-3xl p-6">
            {/* Calories */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-[#ff6b35] mr-3" />
                <Text className="text-white text-lg">Calories</Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  value={calorieGoal}
                  onChangeText={setCalorieGoal}
                  keyboardType="numeric"
                  className="text-white text-xl font-semibold text-right mr-2"
                  style={{ minWidth: 80 }}
                />
                <Text className="text-text-secondary">kcal</Text>
              </View>
            </View>

            {/* Protein */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-[#10b981] mr-3" />
                <Text className="text-white text-lg">Protein</Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  value={proteinGoal}
                  onChangeText={setProteinGoal}
                  keyboardType="numeric"
                  className="text-white text-xl font-semibold text-right mr-2"
                  style={{ minWidth: 80 }}
                />
                <Text className="text-text-secondary">g</Text>
              </View>
            </View>

            {/* Carbs */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-[#f59e0b] mr-3" />
                <Text className="text-white text-lg">Carbs</Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  value={carbsGoal}
                  onChangeText={setCarbsGoal}
                  keyboardType="numeric"
                  className="text-white text-xl font-semibold text-right mr-2"
                  style={{ minWidth: 80 }}
                />
                <Text className="text-text-secondary">g</Text>
              </View>
            </View>

            {/* Fat */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-[#3b82f6] mr-3" />
                <Text className="text-white text-lg">Fat</Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  value={fatGoal}
                  onChangeText={setFatGoal}
                  keyboardType="numeric"
                  className="text-white text-xl font-semibold text-right mr-2"
                  style={{ minWidth: 80 }}
                />
                <Text className="text-text-secondary">g</Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-[#ff6b35] rounded-2xl py-5 mt-4 flex-row items-center justify-center"
          >
            <Ionicons name="save-outline" size={24} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-3">Save Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View className="px-6 mb-6">
          <Text className="text-text-secondary text-sm mb-4">INFO</Text>
          
          <View className="bg-[#1a1a1a] rounded-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-lg">Total meals logged</Text>
              <Text className="text-text-secondary text-xl">0</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-white text-lg">AI analysis</Text>
              <Text className="text-[#10b981] text-sm">Powered by GPT</Text>
            </View>
          </View>
        </View>

        {/* Data Section */}
        <View className="px-6 mb-12">
          <Text className="text-text-secondary text-sm mb-4">DATA</Text>
          
          <TouchableOpacity className="bg-[#1a1a1a] rounded-3xl p-6 border-2 border-[#ef4444]">
            <View className="flex-row items-center justify-center">
              <Ionicons name="trash-outline" size={24} color="#ef4444" />
              <Text className="text-[#ef4444] text-lg font-semibold ml-3">
                Clear all meal data
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
