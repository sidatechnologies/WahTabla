import { getAllVideoAnalyticsForUser } from "@/action/analytics/getAnalytics";
import { useQuery } from "@tanstack/react-query";


export function useAllVideoAnalyticsForUser () {
    return useQuery({
        queryKey: ["getAllVideoAnalyticsForUser"],
        queryFn: async () => await getAllVideoAnalyticsForUser(),
    })
}