import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface PortionSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function PortionSlider({
  value,
  onChange,
  min = 10,
  max = 500,
  step = 5,
  unit = 'g',
}: PortionSliderProps) {
  return (
    <View className="py-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-text-secondary text-sm">Portion size</Text>
        <Text className="text-white font-bold text-lg">
          {value}{unit}
        </Text>
      </View>
      
      <Slider
        value={value}
        onValueChange={onChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#10b981"
        maximumTrackTintColor="#1a1a1a"
        thumbTintColor="#10b981"
      />
      
      <View className="flex-row justify-between mt-1">
        <Text className="text-text-secondary text-xs">{min}{unit}</Text>
        <Text className="text-text-secondary text-xs">{max}{unit}</Text>
      </View>
    </View>
  );
}
