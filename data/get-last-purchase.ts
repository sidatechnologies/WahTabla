import { getPurchase } from "@/action/profile/getPurchase";
import { useQuery } from "@tanstack/react-query";


export function useLastPurchaseDetails () {
    return useQuery({
        queryKey: ["getLastPurchase"],
        queryFn: async () => await getPurchase(),
    })
}