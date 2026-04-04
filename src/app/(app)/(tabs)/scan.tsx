import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

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
        <Ionicons name="camera-outline" size={64} color="#a3a3a3" />
        <Text className="text-white text-center mt-4 text-lg">
          Camera access required
        </Text>
        <Text className="text-text-secondary text-center mt-2">
          Calibre needs camera access to scan your meals for nutrition tracking
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

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo) {
        Alert.alert('Error', 'Failed to capture photo');
        setIsCapturing(false);
        return;
      }

      // Compress image before sending to AI
      const compressed = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      // Navigate to AI confirm screen with base64 image
      router.push({
        pathname: '/(app)/ai-confirm',
        params: {
          imageBase64: compressed.base64,
          imageUri: compressed.uri,
        },
      });
    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to process photo');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      >
        {/* Instruction Text */}
        <View className="absolute top-12 left-0 right-0 items-center">
          <View className="bg-black/60 px-6 py-3 rounded-full">
            <Text className="text-white text-center">
              Take a photo of your meal
            </Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View className="absolute bottom-0 left-0 right-0 pb-12">
          <View className="flex-row items-center justify-center">
            {/* Shutter Button */}
            <TouchableOpacity
              onPress={handleCapture}
              disabled={isCapturing}
              className="w-20 h-20 rounded-full border-4 border-white items-center justify-center"
              style={{ opacity: isCapturing ? 0.5 : 1 }}
            >
              <View className="w-16 h-16 rounded-full bg-white" />
            </TouchableOpacity>

            {/* Barcode Button */}
            <TouchableOpacity
              onPress={() => router.push('/(app)/barcode')}
              className="absolute right-8 bg-black/60 rounded-full p-4"
            >
              <Ionicons name="barcode-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
