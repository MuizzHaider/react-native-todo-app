import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTodos } from '../../context/TodoContext';
import TodoCard from '../../components/TodoCard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { todos, toggleTodoStatus } = useTodos();
  const router = useRouter();

  const handleTodoPress = (id: string) => {
    router.push(`/(app)/todo/${id}`);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
              <TouchableOpacity style={{ backgroundColor: '#3B82F6', padding: 8, borderRadius: 8 }}
                  onPress={() => router.push('/(app)/profile')}
              >
                  <Text style={{ color: '#FFF' }}>Profile</Text>
        </TouchableOpacity>
      </View>


      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySubtitle}>Tap the + button to add your first task</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard 
              todo={item} 
              onToggle={toggleTodoStatus} 
              onPress={handleTodoPress} 
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}


      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/(app)/todo/create')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 26,
    color: '#00FFFF',
  },
  email: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 26,
    paddingVertical: 16,
    borderRadius: 16,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(59, 130, 246, 0.4)',
  },
  fabText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -2,
  },
});
