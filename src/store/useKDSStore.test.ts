import { useKDSStore, Ticket } from './useKDSStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useKDSStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useKDSStore.getState().clearTickets();
  });

  it('adds a new ticket and prevents duplicates', () => {
    const ticket: Ticket = {
      id: '123',
      customerName: 'John',
      items: [{ name: 'Burger', quantity: 2 }],
      status: 'PREPARING',
      timestamp: '2023-10-01T12:00:00Z',
      type: 'DINE_IN',
    };

    useKDSStore.getState().addTicket(ticket);
    expect(useKDSStore.getState().tickets).toHaveLength(1);
    expect(useKDSStore.getState().tickets[0]).toEqual(ticket);

    // Try adding duplicate
    useKDSStore.getState().addTicket(ticket);
    expect(useKDSStore.getState().tickets).toHaveLength(1);
  });

  it('updates ticket status', () => {
    const ticket: Ticket = {
      id: '124',
      customerName: 'Jane',
      items: [{ name: 'Fries', quantity: 1 }],
      status: 'PREPARING',
      timestamp: '2023-10-01T12:05:00Z',
      type: 'TAKEAWAY',
    };

    useKDSStore.getState().addTicket(ticket);
    useKDSStore.getState().updateTicketStatus('124', 'READY');
    
    expect(useKDSStore.getState().tickets[0].status).toBe('READY');
  });

  it('removes a ticket', () => {
    const ticket: Ticket = {
      id: '125',
      customerName: 'Bob',
      items: [{ name: 'Soda', quantity: 1 }],
      status: 'PREPARING',
      timestamp: '2023-10-01T12:10:00Z',
      type: 'DELIVERY',
    };

    useKDSStore.getState().addTicket(ticket);
    expect(useKDSStore.getState().tickets).toHaveLength(1);

    useKDSStore.getState().removeTicket('125');
    expect(useKDSStore.getState().tickets).toHaveLength(0);
  });
});
