import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Product } from '@/constants/Product';
import { STORAGE_URL } from '@/services';
import { useProducts } from '@/services/products';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Products() {
    const { data, isLoading, error } = useProducts();

    const getImageUrl = useCallback((path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // Ensure path starts with / if it doesn't
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${STORAGE_URL}${normalizedPath}`;
    }, []);

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
            {data?.map((product: Product) => (
                <View key={product.id} style={styles.productContainer}>
                    <Text style={[styles.productText, styles.productName]}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                    <Text style={styles.productText}>Brand: {product.brand}</Text>
                    {product.images && product.images.length > 0 && (
                        <Image
                            source={{ uri: getImageUrl(product.images[0]) }}
                            style={styles.productImage}
                            contentFit="cover"
                            transition={200}
                        />
                    )}
                    <Text style={styles.productText}>Status: {product.status}</Text>
                    {product.merchant && (
                        <Text style={styles.productText}>Merchant: {product.merchant.name}</Text>
                    )}
                    <Text style={styles.productMetadata}>Created: {new Date(product.created_at).toLocaleDateString()}</Text>
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
    productContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productText: {
        color: 'white',
        marginBottom: 4,
        fontSize: 14,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        color: '#0a7ea4',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    productDescription: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 8,
    },
    productMetadata: {
        color: '#999',
        fontSize: 12,
        marginTop: 4,
    },
    productImage: {
        width: '100%',
        height: 200,
        marginVertical: 12,
        borderRadius: 12,
        backgroundColor: '#333',
    },
});

export default Products;
