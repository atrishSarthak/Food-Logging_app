// Polyfill for React Native - must be before any imports
import 'react-native-url-polyfill/auto';
if (typeof global.ReadableStream === 'undefined') {
  const { ReadableStream } = require('web-streams-polyfill/ponyfill/es6');
  global.ReadableStream = ReadableStream;
}

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0a0a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: '#0a0a0a',
        },
      }}
    >
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
