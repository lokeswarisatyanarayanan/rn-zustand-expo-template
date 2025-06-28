import 'dotenv/config';

export default {
  expo: {
    name: 'expo-template-zustand-router',
    slug: 'rn-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.rntemplate',
    },
    android: {
      package: 'com.anonymous.rntemplate',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'rntemplate',
    plugins: ['expo-router', 'expo-secure-store'],
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
    experiments: {
      typedRoutes: true,
    },
  },
};
