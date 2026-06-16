import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthStore } from '../store/useAuth';
import { Clock, PlayCircle, StopCircle, Calendar } from 'lucide-react-native';

export default function TimesheetScreen() {
  const user = useAuthStore(state => state.user);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [shiftStart, setShiftStart] = useState<Date | null>(null);

  const handleToggleShift = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      // In reality: POST to backend to end shift
    } else {
      setIsClockedIn(true);
      setShiftStart(new Date());
      // In reality: POST to backend to start shift
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-slate-900 tracking-tight">Timesheets</Text>
        <Text className="text-slate-500 text-lg mt-1">Manage your shifts and hours</Text>
      </View>

      <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
        <View className="flex-row items-center mb-6">
          <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mr-4">
            <Clock color="#4f46e5" size={24} />
          </View>
          <View>
            <Text className="text-slate-500 font-medium uppercase tracking-wider text-xs">Current Status</Text>
            <Text className={`text-xl font-bold ${isClockedIn ? 'text-emerald-600' : 'text-slate-900'}`}>
              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
            </Text>
          </View>
        </View>

        {isClockedIn && shiftStart && (
          <View className="bg-emerald-50 p-4 rounded-xl mb-6 flex-row items-center">
            <View className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-3" />
            <Text className="text-emerald-800 font-medium">
              Shift started at {shiftStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}

        <TouchableOpacity 
          className={`py-4 rounded-xl items-center flex-row justify-center ${isClockedIn ? 'bg-red-500 shadow-red-500/20 shadow-lg' : 'bg-indigo-600 shadow-indigo-600/20 shadow-lg'}`}
          onPress={handleToggleShift}
        >
          {isClockedIn ? <StopCircle color="white" size={24} /> : <PlayCircle color="white" size={24} />}
          <Text className="text-white font-bold text-lg ml-2">
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold text-slate-900 mb-4 mt-2">Recent Shifts</Text>
      
      <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mock Data */}
        <View className="p-4 border-b border-slate-100 flex-row justify-between items-center bg-slate-50/50">
          <View className="flex-row items-center">
            <Calendar color="#64748b" size={18} />
            <Text className="text-slate-700 font-medium ml-2">Yesterday</Text>
          </View>
          <Text className="text-slate-900 font-bold">8.5 hrs</Text>
        </View>
        <View className="p-4 border-b border-slate-100 flex-row justify-between items-center">
          <Text className="text-slate-600">09:00 AM - 05:30 PM</Text>
          <View className="bg-emerald-100 px-2 py-1 rounded">
            <Text className="text-emerald-700 text-xs font-bold">Completed</Text>
          </View>
        </View>

        <View className="p-4 border-b border-slate-100 flex-row justify-between items-center bg-slate-50/50 mt-2">
          <View className="flex-row items-center">
            <Calendar color="#64748b" size={18} />
            <Text className="text-slate-700 font-medium ml-2">Monday</Text>
          </View>
          <Text className="text-slate-900 font-bold">7.0 hrs</Text>
        </View>
        <View className="p-4 flex-row justify-between items-center">
          <Text className="text-slate-600">10:00 AM - 05:00 PM</Text>
          <View className="bg-emerald-100 px-2 py-1 rounded">
            <Text className="text-emerald-700 text-xs font-bold">Completed</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
