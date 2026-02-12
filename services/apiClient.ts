import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '.';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Attach token
apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Normalize errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const message =
                error.response.data?.message || 'Something went wrong';

            const errors = error.response.data?.errors || null;

            return Promise.reject({
                status: error.response.status,
                message,
                errors,
            });
        }

        return Promise.reject({
            status: 0,
            message: 'Network error. Please check your connection.',
            errors: null,
        });
    }
);
