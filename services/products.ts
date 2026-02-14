import { Product } from "@/constants/Product";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

export const getProducts = async (): Promise<Product[]> => {
    const response = await apiClient.get("/products");
    return response.data.data;
};

export const addProduct = async (product: Product) => {
    const response = await apiClient.post("products", product)
    return response.data.data
}

export const updateProduct = async (id: string, product: Product) => {
    const response = await apiClient.put(`products/${id}`, product)
    return response.data.data
}

export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`products/${id}`)
    return response.data.data
}


export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    })
}