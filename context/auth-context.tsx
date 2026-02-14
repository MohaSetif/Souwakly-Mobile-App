import { apiClient } from "@/services/apiClient";
import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
    register: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (!token) {
                setIsLoading(false);
                return;
            }

            const { data } = await apiClient.get("/user");
            setUser(data);
        } catch (error) {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const { data } = await apiClient.post("/login", { email, password, device_name: `${Platform.OS}.${Platform.Version}` });

            await SecureStore.setItemAsync(TOKEN_KEY, data.token);

            // Fetch user after login
            const userResponse = await apiClient.get("/user");
            setUser(userResponse.data);

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.message ?? "Invalid credentials",
                errors: error.errors,
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
            const { data } = await apiClient.post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                device_name: `${Platform.OS}.${Platform.Version}`
            });

            await SecureStore.setItemAsync(TOKEN_KEY, data.token);

            const userResponse = await apiClient.get("/user");
            setUser(userResponse.data);

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.message ?? "Registration failed",
                errors: error.errors,
            };
        }
    };

    const logout = async () => {
        try {
            await apiClient.post("/logout");
        } catch (error) {
            console.log("Logout error:", error);
        } finally {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
