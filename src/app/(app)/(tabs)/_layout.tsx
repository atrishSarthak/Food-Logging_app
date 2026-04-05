import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';

export default function TabLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="diary">
          <Icon sf={{ default: 'book', selected: 'book.fill' }} />
          <Label>Diary</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="scan">
          <Icon sf={{ default: 'camera', selected: 'camera.fill' }} />
          <Label>Scan</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="analytics">
          <Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} />
          <Label>Analytics</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
          <Icon sf={{ default: 'person', selected: 'person.fill' }} />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
