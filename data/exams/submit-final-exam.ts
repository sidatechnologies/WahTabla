import { useMutation } from '@tanstack/react-query';
import { FinalExamSubmitRequest, FinalExamSubmitResponse, FinalExamSubmitData } from '@/types/exam/final-exam';
import { toast } from 'sonner';
import { useState } from 'react';
import { submitFinalExam } from '@/action/exams/submit-final-exam';
import { useVideoAnalyticsStore } from '@/store/videoAnalytics.store';

export const useSubmitFinalExam = () => {
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [examResult, setExamResult] = useState<FinalExamSubmitData | null>(null);

  // ✅ Get setter from Zustand
  const setVideoAnalytics = useVideoAnalyticsStore((state) => state.setVideoAnalytics);

  const mutation = useMutation<FinalExamSubmitResponse, Error, FinalExamSubmitRequest>({
    mutationFn: async (values) => await submitFinalExam(values),
    onSuccess: (data) => {
      if (data.success && data.data) {
        // Update exam result for dialog
        setExamResult(data.data);

        // ✅ Directly update Zustand store
        if (data.data.videoAnalytics) {
          setVideoAnalytics(data.data.videoAnalytics);
        }

        setShowResultDialog(true);
      } else {
        toast.error(data.message || 'Submission failed');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit Final exam');
    },
  });

  return {
    ...mutation,
    showResultDialog,
    setShowResultDialog,
    examResult,
  };
};
