import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos } from '../../../context/TodoContext';

export default function CreateTodoScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { addTodo } = useTodos();
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }
    if (!dueDate.trim()) {
      Alert.alert('Error', 'Please enter a due date');
      return;
    }

    // Parse the date (expects YYYY-MM-DD format)
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      Alert.alert('Error', 'Please enter a valid date in YYYY-MM-DD format (e.g. 2026-07-15)');
      return;
    }

    await addTodo(title, description, parsedDate.toISOString());
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Buy groceries"
        placeholderTextColor="#64748B"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add more details about this task..."
        placeholderTextColor="#64748B"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Due Date *</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD (e.g. 2026-07-15)"
        placeholderTextColor="#64748B"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  textArea: {
    minHeight: 100,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cancelText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});
