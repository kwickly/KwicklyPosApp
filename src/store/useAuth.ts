import { create } from 'zustand';

export type StaffRole = 'MANAGER' | 'CASHIER' | 'KITCHEN_STAFF';

export interface User {
  id: string;
  name: string;
  role: StaffRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (pin: string, role?: StaffRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (pin, role = 'MANAGER') => {
    // Mock login logic
    if (pin.length >= 4) {
      set({ 
        user: { id: 'usr_1', name: 'Alex (Staff)', role },
        isAuthenticated: true 
      });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
