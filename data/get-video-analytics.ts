import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useVideoAnalyticsStore } from '@/store/videoAnalytics.store';
import { submitVideoAnalytics, SubmitVideoAnalyticsRequest, SubmitVideoAnalyticsResponse } from '@/action/video-analytics.action';
import { VideoAnalytics } from '@/lib/types';
import { useState } from 'react';

export const useSubmitVideoAnalytics = () => {
    const [submittedAnalytics, setSubmittedAnalytics] = useState<VideoAnalytics | null>()
    // ✅ Zustand setter
    const setVideoAnalytics = useVideoAnalyticsStore((state) => state.setVideoAnalytics);

    const mutation = useMutation<SubmitVideoAnalyticsResponse, Error, SubmitVideoAnalyticsRequest>({
        mutationFn: async (values) => await submitVideoAnalytics(values),
        onSuccess: (data) => {
            if (data.success && data.data) {

                // ✅ Update Zustand store
                if (data.data.analytics) {
                    setVideoAnalytics(data.data.analytics);
                    setSubmittedAnalytics(data.data.analytics[data.data.analytics.length - 1])
                }

            } else {
                toast.error(data.message || 'Failed to submit video analytics');
            }
        },
        onError: (error) => {
            toast.error(error.message || 'Error submitting video analytics');
        },
    });

    return {
        ...mutation,
        submittedAnalytics
    };
};
