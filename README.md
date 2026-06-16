# Kwickly POS & KDS Application 🍔📱

A React Native CLI application designed for restaurant staff, featuring a real-time Kitchen Display System (KDS), Customer QR Scanner, and Timesheet management. 

Part of the Kwickly ecosystem.

## Features

* **Kitchen Display System (KDS):** Real-time WebSocket connection to receive live customer orders.
* **Customer QR Scanner:** Built with `react-native-vision-camera` to instantly scan and deduct customer meal redemptions.
* **Staff Timesheets:** Shift tracking and management.
* **Tablet Optimized:** Uses a Drawer Navigation system designed for POS setups and landscape devices.

## Tech Stack

* **React Native CLI** (Bare Workflow)
* **TypeScript**
* **NativeWind** (Tailwind CSS for React Native)
* **React Navigation** (Drawer & Stack)
* **Zustand** (State Management)
* **Axios** (API Client)

## Development Setup

### Prerequisites
* Node.js v18+
* Ruby (for iOS CocoaPods)
* Xcode (for iOS Development)
* Android Studio (for Android Development)

### 1. Installation
```bash
# Install Node dependencies
npm install

# Install iOS Pods (Mac only)
cd ios && pod install && cd ..
```

### 2. Running the App

**Start the Metro Bundler:**
```bash
npm start
```

**Run on iOS Simulator:**
```bash
npm run ios
```

**Run on Android Emulator:**
```bash
npm run android
```

## Documentation
For a comprehensive overview of the architecture and implementation progress, please review:
[Project Context & Tracker](./docs/project-context.md)
