import { useEffect, useState } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';

import Navigation from './src/navigation/RootNavigator';
import { delay } from './src/utils';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // Simulate some startup logic before hiding the splash screen
      await delay(1500);
      await BootSplash.hide({ fade: true });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Navigation theme={MyTheme} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
