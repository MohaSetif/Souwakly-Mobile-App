import { api } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

const TOKEN_KEY = 'auth_token';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load stored token on app start
    useEffect(() => {
        loadStoredToken();
    }, []);

    const loadStoredToken = async () => {
        try {
            const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
            if (storedToken) {
                setToken(storedToken);
                // Fetch user data with the stored token
                const response = await api.getUser(storedToken);
                if (response.data) {
                    setUser(response.data);
                } else {
                    // Token is invalid, clear it
                    await SecureStore.deleteItemAsync(TOKEN_KEY);
                    setToken(null);
                }
            }
        } catch (error) {
            console.error('Error loading stored token:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.login(email, password);
            console.log('Login API response:', JSON.stringify(response, null, 2));

            if (response.data) {
                // Handle both { token, user } and direct token string responses
                const newToken = typeof response.data === 'string'
                    ? response.data
                    : response.data.token;
                const userData = typeof response.data === 'string'
                    ? null
                    : response.data.user;

                if (newToken) {
                    // Store token securely
                    await SecureStore.setItemAsync(TOKEN_KEY, newToken);
                    setToken(newToken);

                    // If user data wasn't in the response, fetch it
                    if (userData) {
                        setUser(userData);
                    } else {
                        const userResponse = await api.getUser(newToken);
                        if (userResponse.data) {
                            setUser(userResponse.data);
                        }
                    }

                    return { success: true };
                }
            }

            return {
                success: false,
                message: response.message || 'Login failed',
                errors: response.errors,
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => {
        try {
            const response = await api.register(name, email, password, passwordConfirmation);
            console.log('Register API response:', JSON.stringify(response, null, 2));

            if (response.data) {
                // Handle both { token, user } and direct token string responses
                const newToken = typeof response.data === 'string'
                    ? response.data
                    : response.data.token;
                const userData = typeof response.data === 'string'
                    ? null
                    : response.data.user;

                if (newToken) {
                    // Store token securely
                    await SecureStore.setItemAsync(TOKEN_KEY, newToken);
                    setToken(newToken);

                    // If user data wasn't in the response, fetch it
                    if (userData) {
                        setUser(userData);
                    } else {
                        const userResponse = await api.getUser(newToken);
                        if (userResponse.data) {
                            setUser(userResponse.data);
                        }
                    }

                    return { success: true };
                }
            }

            return {
                success: false,
                message: response.message || 'Registration failed',
                errors: response.errors,
            };
        } catch (error) {
            console.error('Register error:', error);
            return {
                success: false,
                message: 'An unexpected error occurred',
            };
        }
    };

    const logout = async () => {
        try {
            if (token) {
                await api.logout(token);
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Always clear local state regardless of API response
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
            setUser(null);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
