import { useKDSStore } from '../store/useKDSStore';

// In reality, this would point to the deployed API or dynamic tenant URL.
// Since we are running locally, we aim at the local kwickly-api server.
// For Android Emulators connecting to localhost, 10.0.2.2 is required. For iOS Simulator, localhost is fine.
import { Platform } from 'react-native';
const WS_URL = Platform.OS === 'android' ? 'ws://10.0.2.2:8080' : 'ws://localhost:8080';

class KDSWebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isIntentionalClose = false;

  public connect() {
    this.isIntentionalClose = false;

    // The Kwickly API currently accepts connections at the root level, but we can pass tenant/device IDs via query params if needed.
    this.ws = new WebSocket(`${WS_URL}?device=kds_tablet_1`);

    this.ws.onopen = () => {
      console.log('✅ KDS WebSocket Connected');
      this.reconnectAttempts = 0; // Reset backoff
      useKDSStore.getState().setConnectionStatus(true);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Handle incoming ticket
        if (data.type === 'NEW_TICKET' && data.payload) {
          useKDSStore.getState().addTicket(data.payload);
        }

        // Handle ticket updates (e.g., deleted or updated by another KDS device)
        if (data.type === 'TICKET_STATUS_UPDATED' && data.payload) {
           useKDSStore.getState().updateTicketStatus(data.payload.id, data.payload.status);
        }

      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('⚠️ KDS WebSocket Disconnected');
      useKDSStore.getState().setConnectionStatus(false);
      this.ws = null;

      if (!this.isIntentionalClose) {
        this.attemptReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error('KDS WebSocket Error:', error);
      // onerror is usually followed by onclose
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      // Exponential backoff: 1s, 2s, 4s, 8s...
      const timeout = Math.pow(2, this.reconnectAttempts) * 1000;
      this.reconnectAttempts++;

      console.log(`⏳ Attempting to reconnect in ${timeout}ms (Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, timeout);
    } else {
      console.error('❌ KDS WebSocket: Max reconnection attempts reached. Please check server.');
    }
  }

  public disconnect() {
    this.isIntentionalClose = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    useKDSStore.getState().setConnectionStatus(false);
  }

  public sendStatusUpdate(ticketId: string, newStatus: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'UPDATE_STATUS',
        payload: {
          id: ticketId,
          status: newStatus
        }
      }));
    } else {
      console.warn('Cannot send status update. WebSocket is not connected.');
    }
  }
}

// Export a singleton instance
export const websocketService = new KDSWebSocketService();
