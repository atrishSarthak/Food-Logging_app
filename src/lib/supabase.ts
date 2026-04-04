import { createClient } from '@supabase/supabase-js';

// Polyfill for React Native
if (typeof global.ReadableStream === 'undefined') {
  const { ReadableStream } = require('web-streams-polyfill/ponyfill/es6');
  global.ReadableStream = ReadableStream;
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Mock user for standalone development
    // In production, this will use the main Calibre app's auth
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Mock user ID for standalone development
export const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000';
