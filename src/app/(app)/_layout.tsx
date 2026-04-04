import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0a0a',
        },
        headerTintColor: '#fff',
        contentStyle: {
          backgroundColor: '#0a0a0a',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="food-search" 
        options={{ 
          title: 'Search Food',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="food-detail" 
        options={{ 
          title: 'Food Details',
        }} 
      />
      <Stack.Screen 
        name="ai-confirm" 
        options={{ 
          title: 'Confirm Meal',
        }} 
      />
      <Stack.Screen 
        name="barcode" 
        options={{ 
          title: 'Scan Barcode',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}
