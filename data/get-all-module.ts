import { getAllCourse } from "@/action/course/getAllCourses";
import { useQuery } from "@tanstack/react-query";


export function useAllModuleContent () {
    return useQuery({
        queryKey: ["getAllModule"],
        queryFn: async () => await getAllCourse(),
    })
}