# Kwickly POS & KDS Application - Context & Progress

## 🏢 Project Overview
The **Kwickly POS App** is a specialized React Native (CLI) mobile application optimized for restaurant tablets (iPads, Android Tablets) and dedicated devices. It acts as the operational backbone for restaurant staff, bringing real-time kitchen efficiency and customer redemption workflows into a single interface.

This app is a critical piece of the Kwickly micro-frontend ecosystem, communicating securely with the `kwickly-api` backend.

## 🛠 Tech Stack
- **Framework:** React Native CLI (Bare Workflow)
- **Language:** TypeScript
- **State Management:** Zustand (Mock global stores & async data caching)
- **Styling:** NativeWind (Tailwind CSS for React Native v4)
- **Navigation:** React Navigation (Drawer & Native Stack)
- **API Client:** Axios (with seamless JWT injection & interceptors)
- **Hardware Integration:** `react-native-vision-camera` (v5) for high-performance QR code scanning.

---

## 🚀 Implementation Progress

### Phase 1: Scaffolding & Core Architecture (✅ COMPLETED)
- [x] Initialize React Native CLI project (`KwicklyPosApp`).
- [x] Configure NativeWind and TailwindCSS.
- [x] Set up React Navigation with a Drawer layout (industry standard for POS/KDS tablets).
- [x] Create Global Zustand store for Authentication (`useAuth`).
- [x] **Staff Login UI:** (`/src/screens/LoginScreen.tsx`) Dedicated staff portal for clocking in securely.
- [x] **KDS UI:** (`/src/screens/KDSScreen.tsx`) Kitchen Display System showcasing real-time incoming orders.
- [x] **Scanner UI:** (`/src/screens/ScannerScreen.tsx`) Camera overlay designed to read customer QR tokens for meal redemptions.
- [x] **Timesheets UI:** (`/src/screens/TimesheetScreen.tsx`) Portal for staff to track their hours and clock in/out.
- [x] Verify strict TypeScript compilation with 0 errors.

### Phase 2: KDS Real-Time Integration (PENDING)
- [ ] Connect KDSScreen to the Kwickly WebSocket Server for real-time ticket ingestion.
- [ ] Implement exponential backoff for Socket resiliency (porting logic from `kwickly-admin-web`).
- [ ] Implement local caching/storage so tickets aren't lost if the tablet loses power.
- [ ] Send status updates (e.g., `PREPARING` -> `READY`) back to the server to notify the customer app.

### Phase 3: Hardware & POS Features (PENDING)
- [ ] Hook up the ScannerScreen to the API to actively deduct "Pro Meal" balances from customer wallets.
- [ ] Integrate thermal receipt printer drivers (e.g., via Bluetooth) for automatic ticket printing when an order arrives.
- [ ] Build a local fail-safe mode (offline syncing).

### Phase 4: Timesheets & Staff Management (PENDING)
- [ ] Sync TimesheetScreen with the backend API to track payroll hours.
- [ ] Role-based access control (e.g., Cashiers can access Scanner, Kitchen Staff can only access KDS).
