import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export interface QueuedScan {
  id: string;
  qrToken: string;
  timestamp: string;
}

interface OfflineQueueState {
  queuedScans: QueuedScan[];
  addScanToQueue: (token: string) => void;
  syncQueue: () => Promise<void>;
  clearQueue: () => void;
}

export const useOfflineQueueStore = create<OfflineQueueState>()(
  persist(
    (set, get) => ({
      queuedScans: [],
      addScanToQueue: (token: string) => {
        const newScan: QueuedScan = {
          id: Math.random().toString(36).substr(2, 9),
          qrToken: token,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ queuedScans: [...state.queuedScans, newScan] }));
        console.log(`[Offline Queue] Added token ${token} to local cache.`);
      },
      syncQueue: async () => {
        const queue = get().queuedScans;
        if (queue.length === 0) return;
        
        console.log(`[Offline Queue] Syncing ${queue.length} scanned tokens to backend...`);
        
        try {
          // Simulate API call to process the backlog of scans
          await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
          
          set({ queuedScans: [] });
          Alert.alert('Offline Sync Complete', `Successfully synced ${queue.length} pending meal redemptions.`);
        } catch (error) {
          console.error('[Offline Queue] Failed to sync.', error);
        }
      },
      clearQueue: () => set({ queuedScans: [] }),
    }),
    {
      name: 'kwickly-offline-queue',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
