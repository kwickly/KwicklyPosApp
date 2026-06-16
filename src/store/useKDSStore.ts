import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Ticket {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  status: 'PREPARING' | 'READY';
  timestamp: string;
  type: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
}

interface KDSState {
  tickets: Ticket[];
  isConnected: boolean;
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, status: 'PREPARING' | 'READY') => void;
  removeTicket: (id: string) => void;
  setConnectionStatus: (status: boolean) => void;
  clearTickets: () => void;
}

export const useKDSStore = create<KDSState>()(
  persist(
    (set) => ({
      tickets: [],
      isConnected: false,
      addTicket: (ticket) => 
        set((state) => {
          // Prevent duplicates
          if (state.tickets.some(t => t.id === ticket.id)) return state;
          return { tickets: [...state.tickets, ticket] };
        }),
      updateTicketStatus: (id, status) =>
        set((state) => ({
          tickets: state.tickets.map(t => 
            t.id === id ? { ...t, status } : t
          )
        })),
      removeTicket: (id) =>
        set((state) => ({
          tickets: state.tickets.filter(t => t.id !== id)
        })),
      setConnectionStatus: (isConnected) => set({ isConnected }),
      clearTickets: () => set({ tickets: [] }),
    }),
    {
      name: 'kwickly-kds-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tickets: state.tickets }), // Only persist tickets
    }
  )
);
