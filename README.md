# React Native + Zustand + Expo Router Template

A lightweight starter template built with  **Expo Router**,  **Zustand**  (slice-based), and TypeScript. It’s structured for quick development with modular state management, native fetch API integration, and built-in tooling for code quality, theming, and environment management.

This template is something I use personally to skip setup and get straight to building. It’s minimal, extendable, and avoids unnecessary abstractions.

----------

## ✨ Features

-   File-based routing with  **Expo Router**
    
-   Modular state management using  **Zustand slices**
    
-   Native  `fetch`-based API layer
    
-   Environment variable support via  `.env`  and  `dotenv`
    
-   Script to reset project colors and base config
    
-   ESLint, Prettier, Husky, and lint-staged pre-commit hooks
    
-   Works on both  **iOS**  and  **Android**
    

----------

## 🗂 Project Structure

```plaintext
src/
├── features/         → Zustand slices, hooks, and UI grouped by feature
├── library/          → Shared utilities, API helpers, design system
├── navigation/       → Layouts and routing logic
├── store/            → Zustand root store composed from slices
├── styles/           → Theming and global styles
└── utils/            → Environment loading and general helpers

scripts/
└── reset-project.js  → Script to update colors and reset project config

app/                  → Expo Router routing pages
├── _layout.tsx
└── index.tsx

app.config.ts         → Expo config with dynamic env setup  
tsconfig.json         → TypeScript configuration  
package.json          → Dependencies, scripts, and metadata

```

----------

## 🚀 Getting Started

### Prerequisites

-   Node.js v16 or higher
    
-   npm or yarn
    

----------

### Installation

Use this command to create a new project using this template:

```bash
npx create-expo-app@latest MyNewApp \
  --template @lokeswari-satyanarayanan/rn-zustand-expo-template

```

----------

### Environment Setup

Create your environment variable file:

```bash
cp .env.example .env

```

Edit  `.env`  to include your base URLs, API keys, and other environment-specific values.

----------

### Running the App

Start the Expo dev server:

```bash
npx expo start

```

Run on iOS:

```bash
npm run ios
```

Run on Android:

```bash
npm run android
```

----------

## 🧠 Zustand State Management

-   Each feature manages its state in a slice (e.g.  `features/auth/store.ts`)
    
-   Slices are combined into a global store in  `store/index.ts`
    
-   Access state using hooks like:
    

```ts
const value = useStore(state => state.someSlice.someValue)
```

Add new slices inside  `features/`, then register them in the root store.

----------

## 🌐 API Layer

-   Uses native  `fetch`  to handle API calls
    
-   Resides in  `library/api/`
    
-   Environment variables configure base URLs and keys
    
----------

## 🔒 Environment Variables

-   Default environment values are stored in  `.env`
    
-   You can create  `.env.staging`,  `.env.production`, etc.
    
-   Access variables using  `process.env.MY_KEY`  or via  `Constants.expoConfig.extra`
    
Example:

```env
API_URL=https://api.dev.example.com
```

----------

## 🔄 Reset Script

Update theme colors or reset other project settings using:

```bash
npm run reset-project
```

You can also auto-run it before development:

```json
"scripts": {
  "prestart": "node scripts/reset-project.js",
  "start": "expo start"
}
```

----------

## 🧹 Code Quality

Pre-configured with:

-   **ESLint**  for static analysis
    
-   **Prettier**  for code formatting
    
-   **Husky**  and  **lint-staged**  for safe git commits
    

Useful commands:

```bash
npm run lint        # Lint check
npm run lint:fix    # Auto-fix lint issues
npm run format      # Format with Prettier
```

----------

## 📝 Using This Template

1.  Clone or use as a GitHub template
    
2.  Rename your project in  `package.json`
    
3.  Set up  `.env`  with your own environment variables
    
4.  Update  `app.config.ts`  for app metadata (name, icon, etc.)
    
5.  Add routes under  `app/`  using Expo Router conventions
    
6.  Create Zustand slices inside  `features/`
    
7.  Extend the API layer in  `library/api/`
    
8.  Customize themes in  `styles/`
    
9.  Run and test the app on iOS and Android
    

----------

## 💡 Tips & Tricks

-   If something breaks, clear the cache:
    

```bash
rm -rf node_modules .expo
npm install
npx expo start
```

-   Use the reset script whenever you change base theme variables or config defaults
    
----------

## 📜 License

This project is licensed under the MIT License — feel free to use, fork, or modify.