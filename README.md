# 🏗️ React native + Zustand + Expo Router Template with Example!

A reusable **Expo** template featuring routing with **Expo Router**, state management using **Zustand** (slice-based), and networking using native **fetch**. Comes with environment variable support via **dotenv**, a handy project reset script, and built-in code quality tooling.

---

## ✨ Features

- 🚀 File-based routing with **Expo Router**
- 🧠 Modular Zustand state management using **slices**
- 🌐 API layer built with native **fetch** calls
- 🔒 Environment variables managed via **dotenv** and `.env` files
- 🔄 Reset project script for updating colors and configs
- 🛠 ESLint + Prettier setup with **Husky** and **lint-staged** hooks
- 📱 Supports **iOS**, **Android** platforms

---

## 🗂 Project Structure

```plaintext

src/
├── library/           # API, State management utilities, Design system components
├── features/          # Zustand slices, hooks & UI components grouped by feature
├── navigation/        # Expo Router pages and routing files
├── store/             # Zustand store combining multiple slices
├── styles/            # Global themes, colors, and styling files
└── utils/             # Utilities and helper functions (e.g., env loading)

scripts/
└── reset-project.js   # Script to reset colors & other project settings

app/                  # Routing folder for Expo Router
├── _layout.tsx
└── index.tsx

app.config.ts         # Expo config with dotenv environment variable support
tsconfig.json         # TypeScript configuration file
package.json          # Project dependencies, scripts, and config

```
---

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- npm package manager

---

### Installation

npx create-expo-app@latest MyNewApp --template @lokeswari-satyanarayanan/rn-zustand-expo-template
cd MyNewApp

---

### Environment Setup

Create your environment variables file:

    cp .env.example .env

Edit `.env` with your API URLs, keys, and other environment-specific variables.

---

### Running the App

Start Expo dev server:

    npx expo start

Run on iOS simulator or device:

    npm run ios

Run on Android emulator or device:

    npm run android

---

## 🧩 Zustand State Management

- State is split into **slices** — modular parts managing specific features or domains.
- Slices are composed into a single global store in `store/`.
- Access state with hooks, for example:

  import { useStore } from '../store'

  const value = useStore(state => state.someSlice.someValue)

- Add new slices inside `features/` and combine in `store/` for scalability.

---

## 🌐 API Layer

- Network requests centralized in the `api/` folder using native `fetch`.
- Base URLs and API keys configured through environment variables.
- Easily add new endpoints or update existing ones.

---

## 🔧 Environment Variables & Multiple Environments

- `.env` file contains default environment variable (API URL).
- Add `.env.staging`, `.env.production`, etc., for different environments.
- Access environment variables with `process.env` or Expo Constants.

Example `.env` content:

    API_URL=https://api.dev.example.com

---

## 🛠 Scripts & Prebuild Steps

- **Reset Project Script**: Runs `scripts/reset-project.js` to update colors and other configs.

Run manually with:

    npm run reset-project

- Add prestart/prebuild hooks to automate tasks, for example, add this snippet to your `package.json` scripts:

  "scripts": {
  "prestart": "node scripts/reset-project.js",
  "start": "expo start"
  }

---

## 🧹 Code Quality

- ESLint and Prettier configured for consistent code style.
- Husky + lint-staged run linting and formatting on git commit automatically.
- Manual commands available:

  npm run lint # Check linting errors
  npm run lint:fix # Automatically fix linting issues
  npm run format # Format code with Prettier

---

## 📝 Using This Template

1. **Clone or use as GitHub template** to start your project.
2. **Rename** your project in `package.json` (update `"name"`, `"description"`, and `"version"`).
3. **Configure environment variables** by replacing `.env.example` with your own `.env`.
4. **Edit `app.config.ts`** to update app name, slug, icons, and environment setup.
5. **Create or modify routes** inside `navigation/` following Expo Router file conventions.
6. **Add or adjust Zustand slices** inside `features/` and combine them in `store/`.
7. **Extend API endpoints** inside `api/` folder.
8. **Customize styles and themes** inside `styles/` or update colors using reset script.
9. **Run and test** your app on all platforms!

---

## ⚡ Tips & Tricks

- Keep your dependencies up to date, especially Expo SDK and TypeScript.
- Clear caches if you encounter strange errors:

  rm -rf node_modules .expo
  npm install
  npx expo start -c

- Use the reset script anytime you change primary colors or environment defaults to keep the app consistent.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Happy coding!

If you find issues or want to contribute, please open issues or pull requests. Reach out if you want help customizing or extending this template! 🚀
