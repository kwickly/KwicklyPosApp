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

### Phase 2: KDS Real-Time Integration (✅ COMPLETED)
- [x] Connect KDSScreen to the Kwickly WebSocket Server for real-time ticket ingestion.
- [x] Implement exponential backoff for Socket resiliency (porting logic from `kwickly-admin-web`).
- [x] Implement local caching/storage so tickets aren't lost if the tablet loses power.
- [x] Send status updates (e.g., `PREPARING` -> `READY`) back to the server to notify the customer app.

### Phase 3: Hardware & POS Features (✅ COMPLETED)
- [x] Hook up the ScannerScreen to the API to actively deduct "Pro Meal" balances from customer wallets.
- [x] Integrate thermal receipt printer drivers (mocked Bluetooth service) for automatic ticket printing when an order arrives.
- [x] Build a local fail-safe mode (offline syncing cache for scanned QR tokens).

### Phase 4: Timesheets & Staff Management (✅ COMPLETED)
- [x] Sync TimesheetScreen with the backend API to track payroll hours.
- [x] Role-based access control (e.g., Cashiers can access Scanner, Kitchen Staff can only access KDS).

### Phase 5: Automated Testing (⏳ PENDING)
- [ ] Install `jest` and `@testing-library/react-native`.
- [ ] Write unit tests for Offline Scanner Queue resilience.
- [ ] Verify test suite passes with 0 failures.
