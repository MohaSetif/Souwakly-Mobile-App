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

import { IconSymbol } from '@/components/ui/icon-symbol';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
    const { login } = useAuth();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleLogin = async () => {
        // Reset errors
        setError(null);
        setFieldErrors({});

        // Basic validation
        if (!email.trim()) {
            setFieldErrors({ email: ['Email is required'] });
            return;
        }
        if (!password) {
            setFieldErrors({ password: ['Password is required'] });
            return;
        }

        setIsLoading(true);
        try {
            const result = await login(email.trim(), password);

            if (!result.success) {
                if (result.errors) {
                    setFieldErrors(result.errors);
                }
                setError(result.message || 'Login failed');
            }
            // Don't manually redirect - the useEffect in _layout.tsx will handle it
            // when isAuthenticated becomes true
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText type="title" style={styles.title}>
                            Welcome Back
                        </ThemedText>
                        <ThemedText style={styles.subtitle}>
                            Sign in to continue
                        </ThemedText>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* General Error */}
                        {error && (
                            <View style={styles.errorContainer}>
                                <ThemedText style={styles.errorText}>{error}</ThemedText>
                            </View>
                        )}

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Email</ThemedText>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: colors.text,
                                        borderColor: fieldErrors.email ? '#ef4444' : colors.icon,
                                        backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                                    },
                                ]}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.icon}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                                editable={!isLoading}
                            />
                            {fieldErrors.email && (
                                <ThemedText style={styles.fieldError}>
                                    {fieldErrors.email[0]}
                                </ThemedText>
                            )}
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Password</ThemedText>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.passwordInput,
                                        {
                                            color: colors.text,
                                            borderColor: fieldErrors.password ? '#ef4444' : colors.icon,
                                            backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                                        },
                                    ]}
                                    placeholder="Enter your password"
                                    placeholderTextColor={colors.icon}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoComplete="password"
                                    editable={!isLoading}
                                />
                                <Pressable
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <IconSymbol
                                        name={showPassword ? 'eye.slash' : 'eye'}
                                        size={24}
                                        color={colors.icon}
                                    />
                                </Pressable>
                            </View>
                            {fieldErrors.password && (
                                <ThemedText style={styles.fieldError}>
                                    {fieldErrors.password[0]}
                                </ThemedText>
                            )}
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <ThemedText style={styles.buttonText}>Sign In</ThemedText>
                            )}
                        </TouchableOpacity>

                        {/* Register Link */}
                        <View style={styles.footer}>
                            <ThemedText style={styles.footerText}>
                                Don't have an account?{' '}
                            </ThemedText>
                            <Link href="/(auth)/register" asChild>
                                <TouchableOpacity>
                                    <ThemedText style={[styles.linkText, { color: colors.tint }]}>
                                        Create one
                                    </ThemedText>
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
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
    },
    form: {
        gap: 20,
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    errorText: {
        color: '#ef4444',
        textAlign: 'center',
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    fieldError: {
        color: '#ef4444',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#0a7ea4',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        opacity: 0.7,
    },
    linkText: {
        fontWeight: '600',
    },
});
