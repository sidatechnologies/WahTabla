import { getProfile } from "@/action/profile/getProfile";
import { useQuery } from "@tanstack/react-query";


export function useFullProfileDetails () {
    return useQuery({
        queryKey: ["getFullProfile"],
        queryFn: async () => await getProfile(),
    })
}