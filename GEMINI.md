# Pivot: Soccer Performance Tracker

## Project Overview

This project, named "Pivot", is a web application designed for soccer coaches to track player performance and efficiency during a match. It allows for real-time stat tracking (goals, assists, errors, etc.) and provides high-level team analytics like possession percentage and overall efficiency. The application is built with Next.js using the App Router, written in TypeScript, and styled with Tailwind CSS. Authentication is handled by NextAuth.js with a credentials-based provider, and all game state is currently stored in the browser's local storage for persistence across reloads.

## Building and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Run in Production Mode:**
    ```bash
    npm run start
    ```

5.  **Linting:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Framework:** The project uses [Next.js](https://nextjs.org/) with the App Router paradigm.
*   **Language:** The entire codebase is written in [TypeScript](https://www.typescriptlang.org/).
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) is used for all styling.
*   **Component Structure:**
    *   Pages are located within the `app/` directory (e.g., `app/page.tsx`).
    *   Reusable React components are located in the `components/` directory (e.g., `PlayerCard.tsx`, `SoccerTracker.tsx`).
*   **State Management:** The core game tracking logic in `SoccerTracker.tsx` uses React's `useState` and `useEffect` hooks. The game state is serialized to `localStorage` to persist it on the client side.
*   **Authentication:**
    *   Authentication is managed by `next-auth@v5`.
    *   The main configuration is in `authConfig.ts`, which defines a `Credentials` provider for email/password login.
    *   The `middleware.ts` file exports the `auth` function from `next-auth`, protecting routes by default.
    *   The sign-in page is a custom page located at `/auth/signin`.
*   **Data Validation:** Zod is used for schema validation, particularly for the sign-in process as seen in `authConfig.ts`.
*   **Database:** While there are no active database queries in the UI-facing components, the presence of `lib/db.ts` and `lib/firebase.ts` suggests that a database (likely Firebase/Firestore) is intended for user and data storage.
