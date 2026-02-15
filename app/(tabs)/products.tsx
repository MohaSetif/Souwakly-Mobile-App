import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Product } from '@/constants/Product';
import { Colors, GoldColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { STORAGE_URL } from '@/services';
import { useProducts } from '@/services/products';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Products() {
    const { data, isLoading, error } = useProducts();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const getImageUrl = useCallback((path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${STORAGE_URL}${normalizedPath}`;
    }, []);

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
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#1a1a1a', dark: '#000' }}
            headerImage={
                <View style={styles.headerContainer}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.headerImage}
                    />
                    <View style={styles.headerOverlay} />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Premium Products</Text>
                        <Text style={styles.headerSubtitle}>Curated for excellence</Text>
                    </View>
                </View>
            }
        >
            <View style={styles.productsGrid}>
                {data?.map((product: Product) => (
                    <TouchableOpacity key={product.id} style={[styles.productCard, { backgroundColor: colors.card }]}>
                        {product.images && product.images.length > 0 ? (
                            <Image
                                source={{ uri: getImageUrl(product.images[0]) }}
                                style={styles.productImage}
                                contentFit="cover"
                                transition={300}
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <IconSymbol name="photo" size={48} color="rgba(255,255,255,0.1)" />
                            </View>
                        )}

                        <View style={styles.productInfo}>
                            <View style={styles.priceTag}>
                                <Text style={styles.productPrice}>${product.price}</Text>
                            </View>
                            <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                            <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>

                            <View style={styles.productFooter}>
                                <View style={styles.statusBadge}>
                                    <View style={[styles.statusDot, { backgroundColor: product.status === 'active' ? '#4ade80' : '#facc15' }]} />
                                    <Text style={styles.statusText}>{product.status}</Text>
                                </View>
                                <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.3)" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        gap: 16,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '600',
    },
    headerContainer: {
        height: 250,
        width: '100%',
    },
    headerImage: {
        height: '100%',
        width: '100%',
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    headerTitleContainer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: GoldColors.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    productsGrid: {
        padding: 16,
        gap: 20,
    },
    productCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    productImage: {
        width: '100%',
        height: 200,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        padding: 20,
    },
    priceTag: {
        position: 'absolute',
        top: -24,
        right: 20,
        backgroundColor: GoldColors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    productPrice: {
        color: '#000',
        fontSize: 18,
        fontWeight: '900',
    },
    productName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
        marginTop: 4,
    },
    productDescription: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.03)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
});

export default Products;
