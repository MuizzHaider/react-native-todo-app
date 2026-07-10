import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. We define the "shape" of our User object
export type User = {
  id: string;
  email: string;
};

// 2. We define what our Context will provide to the rest of the app
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

// 3. We create the actual Context object
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. We create a "Provider" component that wraps our app. 
// This holds the actual state (the user data) and the functions to change it.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Used to show a loading screen while we check storage

  // When the app starts, we check if the user is already logged in by looking in AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('todo_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false); // Finished checking
      }
    };
    loadUser();
  }, []);

  // The login function saves the user to state AND to local storage
  const login = async (email: string) => {
    const newUser = { id: Date.now().toString(), email };
    setUser(newUser);
    await AsyncStorage.setItem('todo_user', JSON.stringify(newUser));
  };

  // The logout function removes the user from state AND local storage
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('todo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. We create a handy custom hook so any screen can easily type `const { user, login } = useAuth()`
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
