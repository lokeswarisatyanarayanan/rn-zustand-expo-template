import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Slot } from 'expo-router';

import { useAppStore } from '@src/state';
import { hydrateStoreFromSecureStorage } from '@src/state/hydrate';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const set = useAppStore.setState;
      await hydrateStoreFromSecureStorage(set);

      setReady(true);
    };

    bootstrap();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
