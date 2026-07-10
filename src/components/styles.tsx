import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
        fontSize: 36,
        color: '#94A3B8',
    },
    email: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#F8FAFC',
    },
    logoutBtn: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
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
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    fabText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '300',
        marginTop: -2,
    },
});
