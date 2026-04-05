import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  const [period, setPeriod] = useState<'7' | '30'>('7');
  const [selectedTab, setSelectedTab] = useState<'kcal' | 'protein' | 'carbs' | 'fat'>('kcal');

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-16 pb-6">
          <Text className="text-white text-4xl font-bold">Analytics</Text>
        </View>

        {/* Period Selector */}
        <View className="flex-row px-6 gap-3 mb-6">
          <TouchableOpacity
            onPress={() => setPeriod('7')}
            className={`flex-1 py-4 rounded-2xl ${
              period === '7' ? 'bg-[#ff6b35]' : 'bg-[#1a1a1a]'
            }`}
          >
            <Text className={`text-center font-semibold ${
              period === '7' ? 'text-white' : 'text-text-secondary'
            }`}>
              7 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPeriod('30')}
            className={`flex-1 py-4 rounded-2xl ${
              period === '30' ? 'bg-[#ff6b35]' : 'bg-[#1a1a1a]'
            }`}
          >
            <Text className={`text-center font-semibold ${
              period === '30' ? 'text-white' : 'text-text-secondary'
            }`}>
              30 Days
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View className="flex-row px-6 mb-6">
          {(['kcal', 'protein', 'carbs', 'fat'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className="flex-1 pb-3"
              style={{
                borderBottomWidth: selectedTab === tab ? 2 : 0,
                borderBottomColor: '#ff6b35',
              }}
            >
              <Text className={`text-center capitalize ${
                selectedTab === tab ? 'text-white' : 'text-text-secondary'
              }`}>
                {tab === 'kcal' ? 'kcal' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Placeholder */}
        <View className="mx-6 mb-6 bg-[#1a1a1a] rounded-3xl p-6 h-64 items-center justify-center">
          <Text className="text-text-secondary text-center">
            Chart will be displayed here
          </Text>
          <Text className="text-text-secondary text-sm text-center mt-2">
            {period} days • {selectedTab}
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row px-6 gap-3 mb-6">
          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="w-2 h-2 rounded-full bg-[#ff6b35] mb-2" />
            <Text className="text-white text-3xl font-bold">0</Text>
            <Text className="text-text-secondary text-sm mt-1">kcal</Text>
            <Text className="text-text-secondary text-xs mt-1">AVG / DAY</Text>
          </View>

          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="w-2 h-2 rounded-full bg-[#ef4444] mb-2" />
            <Text className="text-white text-3xl font-bold">0</Text>
            <Text className="text-text-secondary text-sm mt-1">g</Text>
            <Text className="text-text-secondary text-xs mt-1">AVG PROTEIN</Text>
          </View>

          <View className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <View className="w-2 h-2 rounded-full bg-[#10b981] mb-2" />
            <Text className="text-white text-3xl font-bold">0</Text>
            <Text className="text-text-secondary text-sm mt-1">MEALS LOGGED</Text>
          </View>
        </View>

        {/* No Data Message */}
        <View className="items-center py-16 px-6">
          <Ionicons name="bar-chart-outline" size={64} color="#374151" />
          <Text className="text-white text-xl font-semibold mt-4">No data yet</Text>
          <Text className="text-text-secondary text-center mt-2">
            Log meals to see your nutrition trends here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
