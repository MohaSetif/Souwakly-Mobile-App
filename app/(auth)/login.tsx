import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, GoldColors } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
    const { login } = useAuth();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const result = await login(email.trim(), password);
            if (!result.success) {
                setError(result.message || 'Login failed');
            }
        } catch (err: any) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <StatusBar style="light" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.topDecoration}>
                        <View style={styles.glow} />
                    </View>

                    <View style={styles.header}>
                        <ThemedText style={styles.brandTitle}>SOUWAKLY</ThemedText>
                        <View style={styles.rule} />
                        <ThemedText style={styles.brandSubtitle}>EXECUTIVE PLATFORM</ThemedText>
                    </View>

                    <View style={styles.form}>
                        {error && (
                            <View style={styles.errorContainer}>
                                <ThemedText style={styles.errorText}>{error}</ThemedText>
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>IDENTIFIER</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="ACCESS KEY (EMAIL)"
                                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>SECURITY PHRASE</ThemedText>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="••••••••"
                                    placeholderTextColor="rgba(255, 255, 255, 0.2)"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    editable={!isLoading}
                                />
                                <Pressable
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <IconSymbol
                                        name={showPassword ? 'eye.slash' : 'eye'}
                                        size={18}
                                        color={GoldColors.primary}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#000" />
                            ) : (
                                <ThemedText style={styles.buttonText}>AUTHORIZE ACCESS</ThemedText>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <ThemedText style={styles.footerText}>NEW RECRUIT? </ThemedText>
                            <Link href="/(auth)/register" asChild>
                                <TouchableOpacity>
                                    <ThemedText style={styles.linkText}>CREATE CREDENTIALS</ThemedText>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 40,
    },
    topDecoration: {
        position: 'absolute',
        top: -100,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    glow: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: GoldColors.secondary,
        opacity: 0.1,
        transform: [{ scaleY: 0.5 }],
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    brandTitle: {
        fontSize: 32,
        fontWeight: '300',
        color: GoldColors.primary,
        letterSpacing: 8,
        textTransform: 'uppercase',
    },
    rule: {
        width: 40,
        height: 1,
        backgroundColor: GoldColors.secondary,
        marginVertical: 15,
    },
    brandSubtitle: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: 4,
        fontWeight: '600',
    },
    form: {
        gap: 30,
    },
    errorContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ff6b6b',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
    },
    inputGroup: {
        gap: 10,
    },
    label: {
        fontSize: 10,
        fontWeight: '800',
        color: GoldColors.secondary,
        letterSpacing: 2,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 215, 0, 0.2)',
        paddingVertical: 12,
        fontSize: 16,
        color: '#fff',
        letterSpacing: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: GoldColors.primary,
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: GoldColors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: 30,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 10,
        letterSpacing: 1,
    },
    linkText: {
        color: GoldColors.primary,
        fontWeight: '800',
        fontSize: 10,
        letterSpacing: 1,
    },
});
