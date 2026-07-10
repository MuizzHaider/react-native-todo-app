import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export type Todo = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  userId: string;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string, description: string, dueDate: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodoStatus: (id: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadTodos = async () => {
      if (!user) {
        setTodos([]);
        return;
      }
      try {
        const storedTodos = await AsyncStorage.getItem(`todos_${user.id}`);
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };
    loadTodos();
  }, [user]);

  const saveTodos = async (newTodos: Todo[]) => {
    if (!user) return;
    setTodos(newTodos);
    await AsyncStorage.setItem(`todos_${user.id}`, JSON.stringify(newTodos));
  };

  const addTodo = async (title: string, description: string, dueDate: string) => {
    if (!user) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      completed: false,
      userId: user.id,
    };
    await saveTodos([...todos, newTodo]);
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    );
    await saveTodos(updatedTodos);
  };

  const deleteTodo = async (id: string) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    await saveTodos(remainingTodos);
  };

  const toggleTodoStatus = async (id: string) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await saveTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodoStatus }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
