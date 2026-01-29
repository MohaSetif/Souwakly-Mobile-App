import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RegisterScreen() {
    const { register } = useAuth();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleRegister = async () => {
        // Reset errors
        setError(null);
        setFieldErrors({});

        // Basic validation
        const errors: Record<string, string[]> = {};

        if (!name.trim()) {
            errors.name = ['Name is required'];
        }
        if (!email.trim()) {
            errors.email = ['Email is required'];
        }
        if (!password) {
            errors.password = ['Password is required'];
        } else if (password.length < 8) {
            errors.password = ['Password must be at least 8 characters'];
        }
        if (password !== passwordConfirmation) {
            errors.password_confirmation = ['Passwords do not match'];
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const result = await register(
                name.trim(),
                email.trim(),
                password,
                passwordConfirmation
            );

            if (!result.success) {
                if (result.errors) {
                    setFieldErrors(result.errors);
                }
                setError(result.message || 'Registration failed');
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
                            Create Account
                        </ThemedText>
                        <ThemedText style={styles.subtitle}>
                            Sign up to get started
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

                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Name</ThemedText>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: colors.text,
                                        borderColor: fieldErrors.name ? '#ef4444' : colors.icon,
                                        backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                                    },
                                ]}
                                placeholder="Enter your name"
                                placeholderTextColor={colors.icon}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                                autoComplete="name"
                                editable={!isLoading}
                            />
                            {fieldErrors.name && (
                                <ThemedText style={styles.fieldError}>
                                    {fieldErrors.name[0]}
                                </ThemedText>
                            )}
                        </View>

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
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: colors.text,
                                        borderColor: fieldErrors.password ? '#ef4444' : colors.icon,
                                        backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                                    },
                                ]}
                                placeholder="Create a password"
                                placeholderTextColor={colors.icon}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="password-new"
                                editable={!isLoading}
                            />
                            {fieldErrors.password && (
                                <ThemedText style={styles.fieldError}>
                                    {fieldErrors.password[0]}
                                </ThemedText>
                            )}
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Confirm Password</ThemedText>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: colors.text,
                                        borderColor: fieldErrors.password_confirmation ? '#ef4444' : colors.icon,
                                        backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
                                    },
                                ]}
                                placeholder="Confirm your password"
                                placeholderTextColor={colors.icon}
                                value={passwordConfirmation}
                                onChangeText={setPasswordConfirmation}
                                secureTextEntry
                                autoComplete="password-new"
                                editable={!isLoading}
                            />
                            {fieldErrors.password_confirmation && (
                                <ThemedText style={styles.fieldError}>
                                    {fieldErrors.password_confirmation[0]}
                                </ThemedText>
                            )}
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <ThemedText style={styles.buttonText}>Create Account</ThemedText>
                            )}
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.footer}>
                            <ThemedText style={styles.footerText}>
                                Already have an account?{' '}
                            </ThemedText>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <ThemedText style={[styles.linkText, { color: colors.tint }]}>
                                        Sign in
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
        marginBottom: 32,
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
        gap: 16,
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
    fieldError: {
        color: '#ef4444',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#0a7ea4',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
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
        marginTop: 20,
    },
    footerText: {
        opacity: 0.7,
    },
    linkText: {
        fontWeight: '600',
    },
});
