import * as z from "zod"

export const examFormSchema = z.object({
  answers: z.record(
    z.string(), // questionId as string key
    z.string().min(1, 'Please select an answer') // optionId as string value
  ),
});

export type ExamFormValues = z.infer<typeof examFormSchema>;