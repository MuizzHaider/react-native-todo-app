import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Todo } from '../context/TodoContext';
import { format } from 'date-fns';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
};

export default function TodoCard({ todo, onToggle, onPress }: Props) {
  return (
    <TouchableOpacity 
      style={[styles.card, todo.completed && styles.cardCompleted]} 
      onPress={() => onPress(todo.id)}
    >
      <TouchableOpacity 
        style={[styles.checkbox, todo.completed && styles.checkboxCompleted]} 
        onPress={() => onToggle(todo.id)}
      >
        {todo.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[styles.title, todo.completed && styles.textCompleted]}>
          {todo.title}
        </Text>
        <Text style={[styles.date, todo.completed && styles.textCompleted]}>
          Due: {format(new Date(todo.dueDate), 'MMM do, yyyy')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#3B82F6',
  },
  checkmark: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#94A3B8',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
});
