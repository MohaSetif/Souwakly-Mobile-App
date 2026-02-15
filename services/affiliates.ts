import { User } from "@/constants/User"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "./apiClient"

export const getAffiliates = async () => {
    const response = await apiClient.get("/merchant/affiliates")
    return response.data.data
}

export const useAffiliates = () => {
    return useQuery<User[]>({
        queryKey: ["affiliates"],
        queryFn: getAffiliates
    })
}