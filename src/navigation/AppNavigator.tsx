import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuth';
import { LayoutDashboard, Camera, Clock, LogOut } from 'lucide-react-native';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import KDSScreen from '../screens/KDSScreen';
import ScannerScreen from '../screens/ScannerScreen';
import TimesheetScreen from '../screens/TimesheetScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-slate-900">
      <View className="p-6 border-b border-slate-800 mb-4">
        <Text className="text-white text-2xl font-bold tracking-tight">Kwickly POS</Text>
        <Text className="text-slate-400 mt-1">Hello, {user?.name}</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity 
        onPress={logout}
        className="p-4 m-4 bg-slate-800 rounded-xl flex-row items-center"
      >
        <LogOut color="#f87171" size={20} />
        <Text className="text-red-400 font-semibold ml-3">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function DrawerNavigator() {
  const user = useAuthStore(state => state.user);
  const role = user?.role || 'KITCHEN_STAFF';

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' }, // slate-900
        headerTintColor: '#fff',
        drawerActiveBackgroundColor: '#312e81', // indigo-900
        drawerActiveTintColor: '#818cf8', // indigo-400
        drawerInactiveTintColor: '#cbd5e1', // slate-300
        drawerStyle: { backgroundColor: '#0f172a', width: 300 },
      }}
    >
      {(role === 'MANAGER' || role === 'KITCHEN_STAFF') && (
        <Drawer.Screen 
          name="KDS" 
          component={KDSScreen} 
          options={{
            title: 'Kitchen Display',
            drawerIcon: ({ color }) => <LayoutDashboard color={color} size={22} />
          }}
        />
      )}
      
      {(role === 'MANAGER' || role === 'CASHIER') && (
        <Drawer.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{
            title: 'QR Scanner',
            drawerIcon: ({ color }) => <Camera color={color} size={22} />
          }}
        />
      )}

      <Drawer.Screen 
        name="Timesheets" 
        component={TimesheetScreen} 
        options={{
          title: 'Staff Timesheets',
          drawerIcon: ({ color }) => <Clock color={color} size={22} />
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}
