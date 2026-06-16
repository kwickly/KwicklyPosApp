import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Clock, CheckCircle2 } from 'lucide-react-native';

interface Ticket {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  status: 'PREPARING' | 'READY';
  timestamp: string;
  type: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: 'ORD-1092',
    customerName: 'John Doe',
    items: [{ name: 'Spicy Chicken Bowl', quantity: 1 }, { name: 'Mango Lassi', quantity: 1 }],
    status: 'PREPARING',
    timestamp: '1:15 PM',
    type: 'DINE_IN'
  },
  {
    id: 'ORD-1093',
    customerName: 'Alice Smith',
    items: [{ name: 'Vegetarian Pasta (Sub)', quantity: 1 }],
    status: 'PREPARING',
    timestamp: '1:18 PM',
    type: 'TAKEAWAY'
  }
];

export default function KDSScreen() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const markAsReady = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'READY' } : t));
    // In reality, this would send a WS message to update the backend and notify the customer
  };

  const renderTicket = ({ item }: { item: Ticket }) => (
    <View className={`w-80 m-3 rounded-2xl border bg-white shadow-sm ${item.status === 'READY' ? 'border-emerald-200' : 'border-slate-200'}`}>
      {/* Header */}
      <View className={`p-4 rounded-t-2xl border-b ${item.status === 'READY' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold text-slate-900">#{item.id.split('-')[1]}</Text>
          <View className="bg-indigo-100 px-2 py-1 rounded-md">
            <Text className="text-indigo-700 text-xs font-bold">{item.type}</Text>
          </View>
        </View>
        <Text className="text-slate-600 font-medium">{item.customerName}</Text>
        <View className="flex-row items-center mt-2">
          <Clock size={14} color="#64748b" />
          <Text className="text-slate-500 text-xs ml-1">{item.timestamp}</Text>
        </View>
      </View>

      {/* Items */}
      <View className="p-4 flex-1">
        {item.items.map((orderItem, idx) => (
          <View key={idx} className="flex-row items-start mb-3">
            <Text className="text-lg font-bold mr-3 text-slate-900">{orderItem.quantity}x</Text>
            <Text className="text-lg text-slate-800 flex-1">{orderItem.name}</Text>
          </View>
        ))}
      </View>

      {/* Action */}
      <View className="p-4 pt-0">
        {item.status === 'PREPARING' ? (
          <TouchableOpacity 
            className="bg-indigo-600 py-3 rounded-xl items-center"
            onPress={() => markAsReady(item.id)}
          >
            <Text className="text-white font-bold text-lg">Mark Ready</Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-emerald-100 py-3 rounded-xl items-center flex-row justify-center">
            <CheckCircle2 size={20} color="#059669" />
            <Text className="text-emerald-700 font-bold text-lg ml-2">Ready for Pickup</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-slate-200">
        <View>
          <Text className="text-2xl font-bold tracking-tight text-slate-900">Active Orders</Text>
          <Text className="text-slate-500">Kitchen Display System</Text>
        </View>
        <View className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <View className={`w-2.5 h-2.5 rounded-full mr-2 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <Text className="text-sm font-medium text-slate-700">{isConnected ? 'Live' : 'Connecting...'}</Text>
        </View>
      </View>

      {isConnected ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={renderTicket}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 12 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="text-slate-500 mt-4 font-medium">Connecting to Kwickly servers...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
