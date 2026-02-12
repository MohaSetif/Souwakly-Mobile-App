import { Platform } from "react-native";
import { apiClient } from "./apiClient";

export const login = async (email: string, password: string) => {
    const response = await apiClient.post("/login", {
        email,
        password,
        device_name: `${Platform.Version} - ${Platform.OS}`,
    });

    return response.data;
};

export const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
) => {
    const response = await apiClient.post("/register", {
        name,
        email,
        password,
        password_confirmation,
        device_name: `${Platform.Version} - ${Platform.OS}`,
    });

    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post("/logout");
    return response.data;
};

export const getUser = async () => {
    const response = await apiClient.get("/user");
    return response.data;
};
