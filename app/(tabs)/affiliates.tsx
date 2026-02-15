import ParallaxScrollView from '@/components/parallax-scroll-view';
import { User } from '@/constants/User';
import { useAffiliates } from '@/services/affiliates';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Affiliates() {
    const { data, isLoading, error } = useAffiliates();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0a7ea4" />
            </View>
        );
    }

    if (error) {
        const err = error as any;
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{err.message}</Text>
            </View>
        );
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            {data?.map((affiliate: User) => (
                <View key={affiliate.id} style={styles.itemContainer}>
                    <Text style={styles.itemName}>{affiliate.name}</Text>
                    <Text style={styles.itemEmail}>{affiliate.email}</Text>
                </View>
            ))}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemEmail: {
        color: '#0a7ea4',
        fontSize: 14,
    },
});
