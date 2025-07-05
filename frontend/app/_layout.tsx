import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/auth/auth';
import { Alert, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  const pathname = usePathname();
  const skipAuthCheckPaths = ['/login', '/register', '/forgot-password', '/confirm-code'];
  useEffect(() => {
    const checkAuth = async () => {
      if (skipAuthCheckPaths.some((skipPath) => skipPath === pathname)) {
        // login画面ではチェックしない
        setIsChecking(false);
        return;
      }

      try {
        const user = await getCurrentUser();
        if (!user) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('checkAuth error:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname]); // pathname に依存（画面切り替えにも対応）

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (isChecking) {
    // ローディング画面を表示
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="plan" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
