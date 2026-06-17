module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|nativewind|react-native-reanimated|lucide-react-native|react-native-gesture-handler|react-native-screens|react-native-safe-area-context)/'
  ]
};

