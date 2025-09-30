import { getSaqQuestionsData } from "@/action/exams/saq-exam";
import { SAQExamParams } from "@/types/exam/saq-exam";
import { useQuery } from "@tanstack/react-query";


export function useSaqQuestionsData (value: SAQExamParams) {
    return useQuery({
        queryKey: ["getSaqQuestionsData"],
        queryFn: async () => await getSaqQuestionsData(value),
    })
}