import { apiClient } from "./apiClient"

export const getAffiliates = async () => {
    const response = await apiClient.get("/affiliates")
    return response.data
}

export const addAffiliate = async (affiliate: any) => {
    const response = await apiClient.post("affiliates", affiliate)
    return response.data
}

export const updateAffiliate = async (id: string, affiliate: any) => {
    const response = await apiClient.put(`affiliates/${id}`, affiliate)
    return response.data
}

export const deleteAffiliate = async (id: string) => {
    const response = await apiClient.delete(`affiliates/${id}`)
    return response.data
}
