import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { TodoProvider } from '../context/TodoContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// We create a component that handles the redirection logic
function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check if the user is trying to access the (app) group or (auth) group
    const inAppGroup = segments[0] === '(app)';

    if (!user && inAppGroup) {
      // If the user is NOT logged in and trying to access the main app, send to login
      router.replace('/(auth)/login');
    } else if (user && !inAppGroup) {
      // If the user IS logged in and trying to access login/signup, send to app
      router.replace('/(app)/');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // <Slot /> acts like a placeholder that renders the current screen
  return <Slot />;
}

// The Root Layout wraps everything in our Providers
export default function RootLayout() {
  return (
    <AuthProvider>
      <TodoProvider>
        <InitialLayout />
      </TodoProvider>
    </AuthProvider>
  );
}
