import { useOfflineQueueStore } from './useOfflineQueueStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('useOfflineQueueStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOfflineQueueStore.getState().clearQueue();
  });

  it('adds a scan to the queue', () => {
    useOfflineQueueStore.getState().addScanToQueue('test-token-123');
    const queue = useOfflineQueueStore.getState().queuedScans;
    
    expect(queue).toHaveLength(1);
    expect(queue[0].qrToken).toBe('test-token-123');
    expect(queue[0].id).toBeDefined();
    expect(queue[0].timestamp).toBeDefined();
  });

  it('syncs queue and clears it on success', async () => {
    useOfflineQueueStore.getState().addScanToQueue('test-token-1');
    useOfflineQueueStore.getState().addScanToQueue('test-token-2');
    
    expect(useOfflineQueueStore.getState().queuedScans).toHaveLength(2);

    await useOfflineQueueStore.getState().syncQueue();

    expect(useOfflineQueueStore.getState().queuedScans).toHaveLength(0);
    expect(Alert.alert).toHaveBeenCalledWith('Offline Sync Complete', 'Successfully synced 2 pending meal redemptions.');
  });
});
