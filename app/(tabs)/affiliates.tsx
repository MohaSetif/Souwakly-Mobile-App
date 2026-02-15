import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, GoldColors } from '@/constants/theme';
import { User } from '@/constants/User';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAffiliates } from '@/services/affiliates';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Affiliates() {
    const { data, isLoading, error } = useAffiliates();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={GoldColors.primary} />
            </View>
        );
    }

    if (error) {
        const err = error as any;
        return (
            <View style={styles.center}>
                <IconSymbol name="exclamationmark.triangle.fill" size={48} color="#ef4444" />
                <Text style={styles.errorText}>{err.message}</Text>
            </View>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerLine} />
                    <ThemedText style={styles.headerLabel}>GLOBAL NETWORK</ThemedText>
                    <ThemedText style={styles.headerTitle}>STRATEGIC{"\n"}PARTNERS</ThemedText>
                </View>

                <View style={styles.listContainer}>
                    {data?.map((affiliate: User) => (
                        <TouchableOpacity key={affiliate.id} style={styles.itemCard} activeOpacity={0.7}>
                            <View style={styles.avatarWrapper}>
                                <View style={styles.avatarInner}>
                                    <Text style={styles.avatarText}>{affiliate.name.charAt(0).toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={styles.itemInfo}>
                                <ThemedText style={styles.itemName}>{affiliate.name.toUpperCase()}</ThemedText>
                                <ThemedText style={styles.itemEmail}>{affiliate.email.toLowerCase()}</ThemedText>
                            </View>
                            <View style={styles.statusIndicator}>
                                <View style={styles.activeDot} />
                                <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.1)" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.expandButton}>
                    <ThemedText style={styles.expandText}>INVITE NEW PARTNER</ThemedText>
                    <IconSymbol name="plus" size={14} color="#000" />
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingTop: 80,
        paddingBottom: 150,
        paddingHorizontal: 30,
    },
    header: {
        marginBottom: 50,
    },
    headerLine: {
        width: 30,
        height: 1,
        backgroundColor: GoldColors.primary,
        marginBottom: 15,
    },
    headerLabel: {
        fontSize: 10,
        letterSpacing: 4,
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '800',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 42,
        fontWeight: '300',
        color: '#fff',
        letterSpacing: -1.5,
        lineHeight: 44,
    },
    listContainer: {
        gap: 0,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
        gap: 20,
    },
    avatarWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#0A0A0A',
        padding: 1,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInner: {
        width: '100%',
        height: '100%',
        borderRadius: 21,
        backgroundColor: '#050505',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: GoldColors.primary,
        fontSize: 14,
        fontWeight: '300',
    },
    itemInfo: {
        flex: 1,
        gap: 4,
    },
    itemName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    itemEmail: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 12,
        fontWeight: '400',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#4ade80',
        opacity: 0.5,
    },
    expandButton: {
        marginTop: 50,
        backgroundColor: GoldColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15,
    },
    expandText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    errorText: {
        color: '#ef4444',
        marginTop: 10,
    }
});
