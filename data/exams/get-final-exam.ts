import { getFinalExamData } from "@/action/exams/final-exam";
import { FinalExamParams } from "@/types/exam/final-exam";
import { useQuery } from "@tanstack/react-query";


export function useFinalExamData (value: FinalExamParams) {
    return useQuery({
        queryKey: ["getFinalExamData"],
        queryFn: async () => await getFinalExamData(value),
    })
}