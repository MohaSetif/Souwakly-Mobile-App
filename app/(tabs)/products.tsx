import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useProducts } from '@/services/products';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Products() {
    const { data, isLoading, error } = useProducts();

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
                <Text style={{ color: 'red' }}>{err.message}</Text>
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
            {data?.map((product: any) => (
                <Text key={product.id}>{product.name}</Text>
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
});

export default Products;
