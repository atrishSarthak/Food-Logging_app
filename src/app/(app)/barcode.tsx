import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BarcodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <Ionicons name="barcode-outline" size={64} color="#a3a3a3" />
        <Text className="text-white text-center mt-4 text-lg">
          Camera access required
        </Text>
        <Text className="text-text-secondary text-center mt-2">
          Calibre needs camera access to scan barcodes on packaged foods
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-primary rounded-lg px-6 py-3 mt-6"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);

    try {
      const response = await fetch(`/api/search-food?barcode=${encodeURIComponent(data)}`);
      const result = await response.json();

      if (result.results && result.results.length > 0) {
        const food = result.results[0];
        router.replace({
          pathname: '/(app)/food-detail',
          params: { foodId: food.id },
        });
      } else {
        Alert.alert(
          'Not Found',
          'This barcode is not in our database yet. Try searching manually.',
          [
            {
              text: 'Search',
              onPress: () => router.replace('/(app)/food-search'),
            },
            {
              text: 'Scan Again',
              onPress: () => setScanned(false),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Barcode lookup error:', error);
      Alert.alert('Error', 'Failed to lookup barcode. Please try again.', [
        {
          text: 'Try Again',
          onPress: () => setScanned(false),
        },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Scanning Frame */}
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-48 border-2 border-primary rounded-lg" />
          <Text className="text-white mt-6 text-center px-8">
            Position the barcode within the frame
          </Text>
        </View>

        {/* Rescan Button */}
        {scanned && (
          <View className="absolute bottom-12 left-0 right-0 items-center">
            <TouchableOpacity
              onPress={() => setScanned(false)}
              className="bg-primary rounded-lg px-6 py-3"
            >
              <Text className="text-white font-semibold">Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}
