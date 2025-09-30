import { getCourse } from "@/action/course/getCourse";
import { useQuery } from "@tanstack/react-query";


export function useModuleContent (moduleId: string) {

    return useQuery({
        queryKey: ["getModule", moduleId],
        queryFn: async () => await getCourse(moduleId),
        enabled: !!moduleId
    })
}