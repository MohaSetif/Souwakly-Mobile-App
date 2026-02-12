import { apiClient } from "./apiClient"

export const getOrders = async () => {
    const response = await apiClient.get("/orders")
    return response.data
}

export const addOrder = async (order: any) => {
    const response = await apiClient.post("orders", order)
    return response.data
}

export const updateOrder = async (id: string, order: any) => {
    const response = await apiClient.put(`orders/${id}`, order)
    return response.data
}

export const deleteOrder = async (id: string) => {
    const response = await apiClient.delete(`orders/${id}`)
    return response.data
}
