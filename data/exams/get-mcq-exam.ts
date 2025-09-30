import { getMcqQuestionsData } from "@/action/exams/mcq-exam";
import { McqExamParams } from "@/types/exam/mcq-exam";
import { useQuery } from "@tanstack/react-query";


export function useMcqQuestionsData (value: McqExamParams) {
    return useQuery({
        queryKey: ["getMcqQuestionsData"],
        queryFn: async () => await getMcqQuestionsData(value),
    })
}