import { Alert } from 'react-native';

class PrinterService {
  private isConnected: boolean = false;

  public async connect(): Promise<boolean> {
    // Simulate searching and connecting to a Bluetooth ESC/POS thermal printer
    console.log('[Printer] Searching for Bluetooth printers...');
    await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
    
    this.isConnected = true;
    console.log('[Printer] Connected to EPSON TM-T88VI');
    return true;
  }

  public async printReceipt(ticketId: string, customerName: string, items: {name: string, quantity: number}[]): Promise<void> {
    if (!this.isConnected) {
      const connected = await this.connect();
      if (!connected) {
        Alert.alert('Printer Error', 'Could not connect to the receipt printer.');
        return;
      }
    }

    console.log('\n--- 🖨️ Kwickly Thermal Printer 🖨️ ---');
    console.log(`        KWICKLY POS SYSTEM        `);
    console.log(`-----------------------------------`);
    console.log(`Ticket #: ${ticketId}`);
    console.log(`Customer: ${customerName}`);
    console.log(`Date: ${new Date().toLocaleString()}`);
    console.log(`-----------------------------------`);
    items.forEach(item => {
      console.log(`${item.quantity}x ${item.name}`);
    });
    console.log(`-----------------------------------`);
    console.log(`          *** PAID ***             \n`);

    Alert.alert('Printed', `Receipt for ${ticketId} sent to printer successfully!`);
  }
}

export const printerService = new PrinterService();
