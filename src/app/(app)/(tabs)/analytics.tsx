import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function AnalyticsScreen() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  // TODO: Implement Victory Native XL charts
  // For now, showing placeholder

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Period Selector */}
        <View className="flex-row p-4 gap-2">
          <TouchableOpacity
            onPress={() => setPeriod('week')}
            className={`flex-1 py-3 rounded-lg ${
              period === 'week' ? 'bg-primary' : 'bg-background-card'
            }`}
          >
            <Text className={`text-center font-semibold ${
              period === 'week' ? 'text-white' : 'text-text-secondary'
            }`}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPeriod('month')}
            className={`flex-1 py-3 rounded-lg ${
              period === 'month' ? 'bg-primary' : 'bg-background-card'
            }`}
          >
            <Text className={`text-center font-semibold ${
              period === 'month' ? 'text-white' : 'text-text-secondary'
            }`}>
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chart Placeholder */}
        <View className="bg-background-card mx-4 rounded-lg p-6 h-64 items-center justify-center">
          <Text className="text-text-secondary text-center">
            Daily Calories Chart
          </Text>
          <Text className="text-text-secondary text-sm text-center mt-2">
            Victory Native XL chart will be implemented here
          </Text>
        </View>

        {/* Stats */}
        <View className="p-4">
          <Text className="text-white font-semibold text-lg mb-4">
            {period === 'week' ? 'This Week' : 'This Month'}
          </Text>
          
          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Average Calories</Text>
            <Text className="text-white font-bold text-2xl mt-1">1,847</Text>
          </View>

          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Average Protein</Text>
            <Text className="text-white font-bold text-2xl mt-1">142g</Text>
          </View>

          <View className="bg-background-card rounded-lg p-4 mb-3">
            <Text className="text-text-secondary text-sm">Days Logged</Text>
            <Text className="text-white font-bold text-2xl mt-1">
              {period === 'week' ? '5 / 7' : '23 / 30'}
            </Text>
          </View>

          <View className="bg-background-card rounded-lg p-4">
            <Text className="text-text-secondary text-sm">Streak</Text>
            <Text className="text-white font-bold text-2xl mt-1">3 days</Text>
          </View>
        </View>

        {/* Macro Split Placeholder */}
        <View className="p-4">
          <Text className="text-white font-semibold text-lg mb-4">
            Macro Split
          </Text>
          <View className="bg-background-card rounded-lg p-6 h-48 items-center justify-center">
            <Text className="text-text-secondary text-center">
              Macro Donut Chart
            </Text>
            <Text className="text-text-secondary text-sm text-center mt-2">
              Victory Native XL chart will be implemented here
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
