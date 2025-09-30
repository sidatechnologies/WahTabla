"use client";
import { useFinalExamData } from "@/data/exams/get-final-exam";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { FinalExamSubmitRequest } from "@/types/exam/final-exam";
import { useSubmitFinalExam } from "@/data/exams/submit-final-exam";
import { toast } from "sonner";
import FinalExamForm from "./final-exam-form";
import { FinalExamResultDialog } from "./final-exam-result-dialog";
import { useVideoAnalyticsStore } from "@/store/videoAnalytics.store";

interface FinalExamContainerProps {
  courseId: number;
  yearId: number;
  weekNumber: number;
  type: string;
}

export function FinalExamContainer({
  courseId,
  yearId,
  weekNumber,
  type,
}: FinalExamContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoAnalytics = useVideoAnalyticsStore((state) => state.videoAnalytics);

  useEffect(() => {
    // if (videoAnalytics.length > 0) {
    console.log("Video Analytics:", videoAnalytics);
    // }
  }, [videoAnalytics]);

  const {
    data: examResponse,
    isLoading,
    error,
  } = useFinalExamData({
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
  } = useSubmitFinalExam();

  const handleSubmit = async (data: FinalExamSubmitRequest) => {
    setIsSubmitting(true);
    try {
      console.log("Final Exam submitted:", data);
      mutate(data);
      console.log("Final Exam submitted successfully!");
    } catch (error) {
      console.error("Failed to submit Final exam:", error);
      toast.error("Failed to submit Final exam. Please try again.");
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
            Failed to load Final exam: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!examResponse?.data) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Alert variant="destructive" className="bg-white">
          <AlertDescription>No Final exam data found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full mx-auto">
      <FinalExamForm
        examData={examResponse.data.data}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {examResult && (
        <FinalExamResultDialog
          open={showResultDialog}
          onOpenChange={setShowResultDialog}
          result={examResult}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
