import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleTakePhoto = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setShowCamera(true);
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    if (!photo) return;

    const compressed = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 1024 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    router.push({
      pathname: '/(app)/ai-confirm',
      params: {
        imageBase64: compressed.base64,
        imageUri: compressed.uri,
      },
    });
  };

  const handleChooseLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const compressed = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      router.push({
        pathname: '/(app)/ai-confirm',
        params: {
          imageBase64: compressed.base64,
          imageUri: compressed.uri,
        },
      });
    }
  };

  if (showCamera && permission?.granted) {
    return (
      <View className="flex-1 bg-background">
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
          <View className="flex-1 justify-between">
            <TouchableOpacity
              onPress={() => setShowCamera(false)}
              className="absolute top-12 left-6 bg-black/60 rounded-full p-3"
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View className="absolute bottom-12 left-0 right-0 items-center">
              <TouchableOpacity
                onPress={handleCapture}
                className="w-20 h-20 rounded-full border-4 border-white items-center justify-center"
              >
                <View className="w-16 h-16 rounded-full bg-white" />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-16 pb-6 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold">Scan Food</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 justify-center">
        <View className="border-2 border-dashed border-gray-700 rounded-3xl p-12 items-center mb-8">
          <Ionicons name="camera" size={80} color="#374151" />
          <Text className="text-white text-2xl font-semibold mt-6">
            Take a photo of your meal
          </Text>
          <Text className="text-text-secondary text-center mt-3 text-base">
            AI will automatically detect food and calculate nutrition
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          onPress={handleTakePhoto}
          className="bg-[#ff6b35] rounded-2xl py-5 flex-row items-center justify-center mb-4"
        >
          <Ionicons name="camera" size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-3">Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleChooseLibrary}
          className="bg-[#1a1a1a] rounded-2xl py-5 flex-row items-center justify-center"
        >
          <Ionicons name="images" size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-3">Choose from Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
