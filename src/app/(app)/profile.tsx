import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.value}>{user?.email}</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 32,
    },
    infoCard: {
        backgroundColor: '#1E293B',
        padding: 24,
        borderRadius: 16,
        width: '100%',
        marginBottom: 32,
    },
    label: {
        color: '#94A3B8',
        fontSize: 14,
        marginBottom: 8,
    },
    value: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        backgroundColor: '#3B82F6',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    backText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#EF4444',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
});