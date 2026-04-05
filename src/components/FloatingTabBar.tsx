import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { useEffect } from 'react';

const tabs = [
  {
    name: 'diary',
    label: 'Diary',
    icon: 'book-outline' as const,
    iconActive: 'book' as const,
  },
  {
    name: 'analytics',
    label: 'Analytics',
    icon: 'bar-chart-outline' as const,
    iconActive: 'bar-chart' as const,
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: 'person-outline' as const,
    iconActive: 'person' as const,
  },
];

const ACCENT_COLOR = '#4ADE80';
const TAB_WIDTH = 80;
const PILL_HORIZONTAL_MARGIN = 20;

export function FloatingTabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  
  // Find active tab index (excluding scan)
  const activeIndex = tabs.findIndex(tab => 
    state.routes[state.index]?.name === tab.name
  );
  
  const indicatorPosition = useSharedValue(activeIndex * TAB_WIDTH);
  const fabScale = useSharedValue(1);

  useEffect(() => {
    indicatorPosition.value = withSpring(activeIndex * TAB_WIDTH, {
      damping: 15,
      stiffness: 150,
    });
  }, [activeIndex]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const handleFabPressIn = () => {
    fabScale.value = withSpring(0.93);
  };

  const handleFabPressOut = () => {
    fabScale.value = withSpring(1);
  };

  const handleFabPress = () => {
    router.push('/(app)/(tabs)/scan');
  };

  return (
    <View style={styles.container}>
      {/* Pill Container */}
      <View style={styles.pillWrapper}>
        {/* Blur Background */}
        <BlurView
          intensity={40}
          tint="dark"
          style={styles.blurView}
        />
        
        {/* Pill Content */}
        <View style={styles.pill}>
          {/* Active Tab Indicator */}
          <Animated.View style={[styles.activeIndicator, indicatorStyle]} />
          
          {/* Tabs */}
          {tabs.map((tab, index) => {
            const isActive = activeIndex === index;
            const iconOpacity = useSharedValue(isActive ? 1 : 0.35);
            
            useEffect(() => {
              iconOpacity.value = withTiming(isActive ? 1 : 0.35, { duration: 150 });
            }, [isActive]);

            const iconStyle = useAnimatedStyle(() => ({
              opacity: iconOpacity.value,
            }));

            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => navigation.navigate(tab.name)}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.tabContent, iconStyle]}>
                  <Ionicons
                    name={isActive ? tab.iconActive : tab.icon}
                    size={24}
                    color={isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.35)'}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isActive ? '#fff' : 'rgba(255,255,255,0.35)' },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Scan FAB */}
      <Animated.View style={[styles.fabContainer, fabStyle]}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleFabPress}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
          activeOpacity={1}
        >
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 16,
    left: PILL_HORIZONTAL_MARGIN,
    right: PILL_HORIZONTAL_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillWrapper: {
    flex: 1,
    height: 64,
    marginRight: 12,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    overflow: 'hidden',
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 18, 18, 0.92)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  activeIndicator: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: TAB_WIDTH,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  tab: {
    width: TAB_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  fabContainer: {
    width: 56,
    height: 56,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ACCENT_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
});
