"use client";
import { useSaqQuestionsData } from "@/data/exams/get-saq-exam";
import SaqExamForm from "./saq-exam-form";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { SAQSubmissionRequest } from "@/types/exam/saq-exam";
import { useSubmitSaqExam } from "@/data/exams/submit-saq-exam";
import { SaqExamResultDialog } from "./saq-exam-result-dialog";
import { toast } from "sonner";

interface SaqExamFormContainerProps {
  courseId: number;
  yearId: number;
  weekNumber: number;
  type: string;
}

export function SaqExamFormContainer({
  courseId,
  yearId,
  weekNumber,
  type,
}: SaqExamFormContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    data: examResponse,
    isLoading,
    error,
  } = useSaqQuestionsData({
    courseId,
    yearId,
    weekNumber,
    type,
  });

  const {
    mutate,
    isPending,
    showResultDialog,
    setShowResultDialog,
    examResult,
  } = useSubmitSaqExam();

  const handleSubmit = async (data: SAQSubmissionRequest) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log("SAQ Exam submitted:", data);
      mutate(data);
      
      console.log("SAQ Exam submitted successfully!");
    } catch (error) {
      console.error("Failed to submit SAQ exam:", error);
      toast.error("Failed to submit SAQ exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Alert variant="destructive" className="bg-white">
          <AlertDescription>
            Failed to load SAQ exam: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!examResponse?.data) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Alert variant='destructive' className="bg-white">
          <AlertDescription>No SAQ exam data found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleRetry = () => {
    // Reset form or redirect to retry
    window.location.reload(); // or your preferred retry logic
  };

  return (
    <div className="w-full mx-auto">
      <SaqExamForm
        examData={examResponse.data.data}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {examResult && (
        <SaqExamResultDialog
          open={showResultDialog}
          onOpenChange={setShowResultDialog}
          result={examResult}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}