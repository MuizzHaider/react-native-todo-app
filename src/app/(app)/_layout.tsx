import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E293B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Todos',
        }} 
      />
      <Stack.Screen 
        name="todo/create" 
        options={{ 
          title: 'New Task',
          presentation: 'modal' // Opens as a modal from bottom on iOS
        }} 
      />
      <Stack.Screen 
        name="todo/[id]" 
        options={{ 
          title: 'Task Details',
        }} 
      />
    </Stack>
  );
}
