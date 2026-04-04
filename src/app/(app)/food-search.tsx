import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FoodCard } from '@/components/FoodCard';
import type { Food } from '@/types/food';

export default function FoodSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentFoods, setRecentFoods] = useState<Food[]>([]);

  useEffect(() => {
    // TODO: Load recent foods from local storage or API
    // For now, empty array
    setRecentFoods([]);
  }, []);

  const searchFoods = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search-food?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchFoods(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchFoods]);

  const handleFoodSelect = (food: Food) => {
    router.push({
      pathname: '/(app)/food-detail',
      params: { foodId: food.id },
    });
  };

  const displayList = query.length < 2 ? recentFoods : results;
  const showEmpty = query.length >= 2 && results.length === 0 && !isLoading;

  return (
    <View className="flex-1 bg-background">
      {/* Search Bar */}
      <View className="px-4 py-3 border-b border-gray-800">
        <View className="flex-row items-center bg-background-card rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#a3a3a3" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search foods..."
            placeholderTextColor="#a3a3a3"
            className="flex-1 ml-2 text-white"
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color="#a3a3a3"
              onPress={() => setQuery('')}
            />
          )}
        </View>
      </View>

      {/* Results */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : showEmpty ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="search-outline" size={64} color="#a3a3a3" />
          <Text className="text-text-secondary text-center mt-4">
            No foods found for "{query}"
          </Text>
          <Text className="text-text-secondary text-center text-sm mt-2">
            Try a different search term or scan a barcode
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard food={item} onPress={() => handleFoodSelect(item)} />
          )}
          contentContainerClassName="p-4"
          ListHeaderComponent={
            query.length < 2 && recentFoods.length > 0 ? (
              <Text className="text-text-secondary text-sm mb-3">Recent</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
