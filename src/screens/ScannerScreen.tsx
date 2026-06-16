import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { QrCode, X } from 'lucide-react-native';

export default function ScannerScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScanning, setIsScanning] = useState(true);
  const device = useCameraDevice('back');

  const handleManualScan = () => {
    setIsScanning(false);
    Alert.alert(
      "QR Code Scanned",
      `Customer Token: MOCK-1234\n\n1x Pro Meal deducted.`,
      [{ text: "OK", onPress: () => setIsScanning(true) }]
    );
  };

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-lg mb-4">Camera permission is required.</Text>
        <TouchableOpacity 
          className="bg-indigo-600 px-6 py-3 rounded-lg"
          onPress={() => requestPermission()}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-red-400 text-lg">No Camera Device Found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isScanning}
      />
      
      {/* Scanner Overlay UI */}
      <View className="absolute inset-0 items-center justify-center pointer-events-none">
        <TouchableOpacity 
          className="w-64 h-64 border-2 border-indigo-500 rounded-xl bg-transparent pointer-events-auto"
          onPress={handleManualScan}
        />
        <Text className="text-white text-center mt-8 font-medium bg-black/50 px-4 py-2 rounded-full overflow-hidden">
          Align QR Code within frame to redeem meal
        </Text>
      </View>

      {!isScanning && (
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <TouchableOpacity 
            className="bg-indigo-600 px-8 py-4 rounded-full shadow-lg flex-row items-center"
            onPress={() => setIsScanning(true)}
          >
            <QrCode color="white" size={20} />
            <Text className="text-white font-bold ml-2">Scan Next Customer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
