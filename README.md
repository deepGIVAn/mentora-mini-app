# Mentora Mini App

Mentora is a mobile-first platform connecting students, parents, and mentors through structured lessons and learning sessions.

## Project Structure

```
src/
├── components/     # Reusable UI components (Button, Input, Card)
├── data/           # Mock data for demonstration
├── hooks/          # Custom hooks (useAuth)
├── navigation/     # Role-based navigation stacks
├── screens/        # Screen components organized by role/common
├── services/       # Mock API service layer
├── theme/          # Centralized theme and styling constants
└── types/          # TypeScript interfaces
```

## Setup Instructions

1.  **Clone the repository** (if applicable)
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the project**:
    ```bash
    npx expo start
    ```
4.  **Open on Device/Emulator**:
    -   Scan the QR code with the Expo Go app (Android) or Camera app (iOS).
    -   Press `i` for iOS simulator or `a` for Android emulator.

## Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Parent** | `parent@mentora.com` | `password` |
| **Student** | `alice@mentora.com` | `password` |
| **Mentor** | `mentor@mentora.com` | `password` |

## Assumptions & Improvements

-   **Mock API**: Real network requests are simulated with artificial delays using a service layer to demonstrate loading states.
-   **Role-Based Routing**: The app automatically switches the navigation stack based on the logged-in user's role.
-   **Reusable UI**: Built a custom design system with consistent spacing, colors, and typography.
-   **Data Consistency**: Creating a student in the Parent dashboard updates the local mock state for the duration of the session.
-   **DOB Formatting**: Strict `YYYY-MM-DD` validation is enforced on the client side to ensure data integrity.
-   **Dynamic Age Calculation**: Student ages are calculated in real-time based on the provided DOB, improving UX by showing relevant instead of raw data.
-   **Profile Avatars**: Integrated dynamic profile images using `ui-avatars.com`. Names are properly URL-encoded to handle spaces and special characters.
-   **Layered Visuals**: All avatars feature a layered UI with a background icon and an initials-based fallback, ensuring a consistent premium look even during image loading or failures.
-   **UI Consistency**: Unified design language across Parent, Student, and Mentor dashboards with reusable card and button components.
