import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../store/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(() => resolve(true), 1000));
    
    // Mock successful login
    login('mock-jwt-token', {
      id: 'staff-1',
      name: 'Sarah Kitchen',
      role: 'STAFF'
    });
    
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50 justify-center px-8"
    >
      <View className="max-w-sm w-full mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50">
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-indigo-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-indigo-600/30">
            <Text className="text-white text-3xl font-bold">K</Text>
          </View>
          <Text className="text-3xl font-bold text-slate-900 tracking-tight">Kwickly POS</Text>
          <Text className="text-slate-500 mt-2 text-center">Staff Login Portal</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email or Staff ID</Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-slate-900 text-base"
              placeholder="e.g. sarah@kwickly.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</Text>
            <TextInput
              className="bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-slate-900 text-base"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            className="bg-indigo-600 py-4 rounded-xl items-center justify-center mt-4 shadow-lg shadow-indigo-600/20"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
