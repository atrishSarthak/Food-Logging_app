import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MacroRingProps {
  current: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
}

export function MacroRing({ current, goal, size = 200, strokeWidth = 16 }: MacroRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);
  
  const remaining = Math.max(goal - current, 0);
  const isOver = current > goal;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size} className="absolute">
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isOver ? '#ef4444' : '#10b981'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      
      <View className="items-center">
        <Text className="text-5xl font-bold text-white">
          {remaining.toLocaleString()}
        </Text>
        <Text className="text-sm text-text-secondary mt-1">
          {isOver ? 'over goal' : 'remaining'}
        </Text>
        <Text className="text-xs text-text-secondary mt-2">
          {current.toLocaleString()} / {goal.toLocaleString()} kcal
        </Text>
      </View>
    </View>
  );
}
