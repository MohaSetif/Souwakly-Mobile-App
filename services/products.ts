import { useQuery } from "@tanstack/react-query"
import { apiClient } from "./apiClient"

export const getProducts = async () => {
    const response = await apiClient.get("/products")
    return response.data
}

export const addProduct = async (product: any) => {
    const response = await apiClient.post("products", product)
    return response.data
}

export const updateProduct = async (id: string, product: any) => {
    const response = await apiClient.put(`products/${id}`, product)
    return response.data
}

export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`products/${id}`)
    return response.data
}


export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })
}