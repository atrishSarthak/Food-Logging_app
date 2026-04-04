import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGoalsStore } from '@/store/goalsStore';
import { calculateTDEE } from '@/lib/utils';
import type { NutritionGoals } from '@/types/food';

export default function ProfileScreen() {
  const { goals, fetchGoals, updateGoals } = useGoalsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoals, setEditedGoals] = useState<NutritionGoals | null>(null);

  // TDEE Calculator inputs
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (goals) {
      setEditedGoals(goals);
    }
  }, [goals]);

  const handleSave = async () => {
    if (!editedGoals) return;

    await updateGoals(editedGoals);
    setIsEditing(false);
    Alert.alert('Success', 'Goals updated successfully!');
  };

  const handleCalculateTDEE = () => {
    if (!editedGoals) return;

    const tdee = calculateTDEE(
      parseFloat(weight),
      parseFloat(height),
      parseFloat(age),
      gender,
      editedGoals.activity_level
    );

    // Adjust based on goal type
    let targetCalories = tdee;
    if (editedGoals.goal_type === 'lose') {
      targetCalories = Math.round(tdee * 0.85); // 15% deficit
    } else if (editedGoals.goal_type === 'gain') {
      targetCalories = Math.round(tdee * 1.1); // 10% surplus
    }

    setEditedGoals({
      ...editedGoals,
      calorie_goal: targetCalories,
    });

    Alert.alert(
      'TDEE Calculated',
      `Your estimated TDEE is ${tdee} kcal/day.\nTarget calories set to ${targetCalories} kcal/day based on your goal.`
    );
  };

  if (!editedGoals) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Goals Section */}
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white font-semibold text-lg">Daily Goals</Text>
            <TouchableOpacity
              onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex-row items-center"
            >
              <Ionicons
                name={isEditing ? 'checkmark-circle' : 'create-outline'}
                size={20}
                color="#10b981"
              />
              <Text className="text-primary ml-1">{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Calories</Text>
            {isEditing ? (
              <TextInput
                value={editedGoals.calorie_goal.toString()}
                onChangeText={(text) =>
                  setEditedGoals({ ...editedGoals, calorie_goal: parseInt(text) || 0 })
                }
                keyboardType="numeric"
                className="text-white font-bold text-2xl mt-1"
              />
            ) : (
              <Text className="text-white font-bold text-2xl mt-1">
                {editedGoals.calorie_goal} kcal
              </Text>
            )}
          </View>

          <View className="flex-row gap-3 mb-3">
            <View className="flex-1 bg-background-card rounded-lg p-4">
              <Text className="text-primary text-xs">PROTEIN</Text>
              {isEditing ? (
                <TextInput
                  value={editedGoals.protein_goal_g.toString()}
                  onChangeText={(text) =>
                    setEditedGoals({ ...editedGoals, protein_goal_g: parseInt(text) || 0 })
                  }
                  keyboardType="numeric"
                  className="text-white font-bold text-xl mt-1"
                />
              ) : (
                <Text className="text-white font-bold text-xl mt-1">
                  {editedGoals.protein_goal_g}g
                </Text>
              )}
            </View>

            <View className="flex-1 bg-background-card rounded-lg p-4">
              <Text className="text-amber text-xs">CARBS</Text>
              {isEditing ? (
                <TextInput
                  value={editedGoals.carbs_goal_g.toString()}
                  onChangeText={(text) =>
                    setEditedGoals({ ...editedGoals, carbs_goal_g: parseInt(text) || 0 })
                  }
                  keyboardType="numeric"
                  className="text-white font-bold text-xl mt-1"
                />
              ) : (
                <Text className="text-white font-bold text-xl mt-1">
                  {editedGoals.carbs_goal_g}g
                </Text>
              )}
            </View>

            <View className="flex-1 bg-background-card rounded-lg p-4">
              <Text className="text-blue text-xs">FAT</Text>
              {isEditing ? (
                <TextInput
                  value={editedGoals.fat_goal_g.toString()}
                  onChangeText={(text) =>
                    setEditedGoals({ ...editedGoals, fat_goal_g: parseInt(text) || 0 })
                  }
                  keyboardType="numeric"
                  className="text-white font-bold text-xl mt-1"
                />
              ) : (
                <Text className="text-white font-bold text-xl mt-1">
                  {editedGoals.fat_goal_g}g
                </Text>
              )}
            </View>
          </View>

          {/* Activity Level */}
          {isEditing && (
            <View className="mb-3">
              <Text className="text-text-secondary text-sm mb-2">Activity Level</Text>
              <View className="flex-row flex-wrap gap-2">
                {(['sedentary', 'light', 'moderate', 'active', 'very_active'] as const).map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setEditedGoals({ ...editedGoals, activity_level: level })}
                    className={`px-4 py-2 rounded-lg ${
                      editedGoals.activity_level === level ? 'bg-primary' : 'bg-gray-800'
                    }`}
                  >
                    <Text className={editedGoals.activity_level === level ? 'text-white' : 'text-text-secondary'}>
                      {level.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Goal Type */}
          {isEditing && (
            <View className="mb-3">
              <Text className="text-text-secondary text-sm mb-2">Goal</Text>
              <View className="flex-row gap-2">
                {(['lose', 'maintain', 'gain'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setEditedGoals({ ...editedGoals, goal_type: type })}
                    className={`flex-1 py-3 rounded-lg ${
                      editedGoals.goal_type === type ? 'bg-primary' : 'bg-gray-800'
                    }`}
                  >
                    <Text className={`text-center capitalize ${editedGoals.goal_type === type ? 'text-white font-semibold' : 'text-text-secondary'}`}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* TDEE Calculator */}
        {isEditing && (
          <View className="p-4 border-t border-gray-800">
            <Text className="text-white font-semibold text-lg mb-4">TDEE Calculator</Text>
            
            <View className="bg-background-card rounded-lg p-4 mb-3">
              <Text className="text-text-secondary text-sm mb-2">Weight (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="text-white text-lg"
                placeholder="70"
                placeholderTextColor="#a3a3a3"
              />
            </View>

            <View className="bg-background-card rounded-lg p-4 mb-3">
              <Text className="text-text-secondary text-sm mb-2">Height (cm)</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                className="text-white text-lg"
                placeholder="170"
                placeholderTextColor="#a3a3a3"
              />
            </View>

            <View className="bg-background-card rounded-lg p-4 mb-3">
              <Text className="text-text-secondary text-sm mb-2">Age</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                className="text-white text-lg"
                placeholder="30"
                placeholderTextColor="#a3a3a3"
              />
            </View>

            <View className="mb-3">
              <Text className="text-text-secondary text-sm mb-2">Gender</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  className={`flex-1 py-3 rounded-lg ${
                    gender === 'male' ? 'bg-primary' : 'bg-gray-800'
                  }`}
                >
                  <Text className={`text-center ${gender === 'male' ? 'text-white font-semibold' : 'text-text-secondary'}`}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  className={`flex-1 py-3 rounded-lg ${
                    gender === 'female' ? 'bg-primary' : 'bg-gray-800'
                  }`}
                >
                  <Text className={`text-center ${gender === 'female' ? 'text-white font-semibold' : 'text-text-secondary'}`}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleCalculateTDEE}
              className="bg-primary rounded-lg py-3 items-center"
            >
              <Text className="text-white font-semibold">Calculate TDEE</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Stats */}
        <View className="p-4 border-t border-gray-800">
          <Text className="text-white font-semibold text-lg mb-4">Stats</Text>
          
          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Total Days Logged</Text>
            <Text className="text-white font-bold text-2xl mt-1">47</Text>
          </View>

          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Longest Streak</Text>
            <Text className="text-white font-bold text-2xl mt-1">12 days</Text>
          </View>

          <View className="bg-background-card rounded-lg p-4">
            <Text className="text-text-secondary text-sm">Total Meals Logged</Text>
            <Text className="text-white font-bold text-2xl mt-1">183</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
