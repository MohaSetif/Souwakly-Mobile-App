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
    View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GoldColors } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RegisterScreen() {
    const { register } = useAuth();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!name || !email || !password || !passwordConfirmation) {
            setError('All fields are requested for clearance');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Security phrase mismatch');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const result = await register(
                name.trim(),
                email.trim(),
                password,
                passwordConfirmation
            );

            if (!result.success) {
                setError(result.message || 'Registration failed');
            }
        } catch (err: any) {
            setError('System communication failure');
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
                    <View style={styles.header}>
                        <ThemedText style={styles.brandTitle}>SOUWAKLY</ThemedText>
                        <View style={styles.rule} />
                        <ThemedText style={styles.brandSubtitle}>NEW ENROLLMENT</ThemedText>
                    </View>

                    <View style={styles.form}>
                        {error && (
                            <View style={styles.errorContainer}>
                                <ThemedText style={styles.errorText}>{error}</ThemedText>
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>LEGAL NAME</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="FULL NAME"
                                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>COMMUNICATION PATH (EMAIL)</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
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
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>RE-ENTER PHRASE</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                                value={passwordConfirmation}
                                onChangeText={setPasswordConfirmation}
                                secureTextEntry={!showPassword}
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#000" />
                            ) : (
                                <ThemedText style={styles.buttonText}>REQUEST CLEARANCE</ThemedText>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <ThemedText style={styles.footerText}>ALREADY CLEARED? </ThemedText>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <ThemedText style={styles.linkText}>SECURE LOGIN</ThemedText>
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
    header: {
        alignItems: 'center',
        marginBottom: 50,
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
        gap: 25,
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
        gap: 8,
    },
    label: {
        fontSize: 9,
        fontWeight: '800',
        color: GoldColors.secondary,
        letterSpacing: 2,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 215, 0, 0.2)',
        paddingVertical: 10,
        fontSize: 15,
        color: '#fff',
        letterSpacing: 1,
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
        marginTop: 30,
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
