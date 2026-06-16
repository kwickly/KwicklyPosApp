import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useAuthStore, StaffRole } from '../store/useAuth';

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [selectedRole, setSelectedRole] = useState<StaffRole>('MANAGER');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (pin.length >= 4) {
      login(pin, selectedRole);
    }
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const RoleButton = ({ role, label }: { role: StaffRole, label: string }) => (
    <TouchableOpacity 
      onPress={() => setSelectedRole(role)}
      className={`px-4 py-2 rounded-lg mx-1 border ${selectedRole === role ? 'bg-indigo-100 border-indigo-500' : 'bg-slate-50 border-slate-200'}`}
    >
      <Text className={`font-bold ${selectedRole === role ? 'text-indigo-700' : 'text-slate-500'}`}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900 justify-center items-center">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="w-full max-w-sm items-center"
      >
        <View className="bg-indigo-500 w-16 h-16 rounded-2xl justify-center items-center mb-6 shadow-lg shadow-indigo-500/30">
          <Lock color="white" size={32} />
        </View>
        <Text className="text-3xl font-bold text-white tracking-tight mb-2">Staff Portal</Text>
        <Text className="text-slate-400 mb-8">Enter your 4-digit PIN to clock in</Text>

        <View className="flex-row mb-6">
          <RoleButton role="MANAGER" label="Manager" />
          <RoleButton role="CASHIER" label="Cashier" />
          <RoleButton role="KITCHEN_STAFF" label="Kitchen" />
        </View>

        {/* PIN Display */}
        <View className="flex-row justify-center mb-10 space-x-4 w-full">
          {[0, 1, 2, 3].map((index) => (
            <View 
              key={index} 
              className={`w-14 h-16 rounded-xl border-2 items-center justify-center
                ${pin.length > index ? 'border-indigo-500 bg-slate-800' : 'border-slate-700 bg-slate-800/50'}`}
            >
              <Text className="text-white text-3xl font-bold">
                {pin.length > index ? '•' : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* Numpad */}
        <View className="flex-row flex-wrap justify-center w-64">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <TouchableOpacity 
              key={num} 
              onPress={() => handleKeyPress(num)}
              className="w-20 h-20 items-center justify-center m-1 rounded-full bg-slate-800/50"
            >
              <Text className="text-white text-3xl font-medium">{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            onPress={handleDelete}
            className="w-20 h-20 items-center justify-center m-1 rounded-full"
          >
            <Text className="text-slate-500 text-xl font-medium">DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleKeyPress('0')}
            className="w-20 h-20 items-center justify-center m-1 rounded-full bg-slate-800/50"
          >
            <Text className="text-white text-3xl font-medium">0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={pin.length < 4}
            className={`w-20 h-20 items-center justify-center m-1 rounded-full ${pin.length >= 4 ? 'bg-indigo-500' : 'bg-slate-800'}`}
          >
            <Text className={`text-xl font-bold ${pin.length >= 4 ? 'text-white' : 'text-slate-600'}`}>GO</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
