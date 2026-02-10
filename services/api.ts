// API Service for Laravel Backend

import { Platform } from "react-native";

// Configure your Laravel API base URL here
const API_BASE_URL = 'http://172.17.194.71:8000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

interface RequestOptions {
  method?: HttpMethod;
  body?: Record<string, any>;
  token?: string | null;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, token } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return { data };
    } catch (error) {
      console.error('API request error:', error);
      return {
        message: 'Network error. Please check your connection.',
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/login', {
      method: 'POST',
      body: { email, password, device_name: `${Platform.Version} - ${Platform.OS}`, },
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.request<{ token: string; user: any }>('/register', {
      method: 'POST',
      body: { name, email, password, password_confirmation, device_name: `${Platform.Version} - ${Platform.OS}` },
    });
  }

  async logout(token: string) {
    return this.request('/logout', {
      method: 'POST',
      token,
    });
  }

  async getUser(token: string) {
    return this.request<any>('/user', {
      method: 'GET',
      token,
    });
  }
}

export const api = new ApiService(API_BASE_URL);
export { API_BASE_URL };

