import { Platform } from 'react-native';

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 110 : 90;

export const COLORS = {
  background: '#0a0a0a',
  card: '#1a1a1a',
  text: {
    primary: '#ffffff',
    secondary: '#a3a3a3',
  },
  accent: '#4ADE80',
  orange: '#ff6b35',
  green: '#10b981',
  amber: '#f59e0b',
  blue: '#3b82f6',
  red: '#ef4444',
};
