import { create } from "zustand";
import { VideoAnalytics } from "@/lib/types";

type VideoAnalyticsStore = {
  videoAnalytics: VideoAnalytics[];
  setVideoAnalytics: (
    updater: VideoAnalytics[] | ((prev: VideoAnalytics[]) => VideoAnalytics[])
  ) => void;
};

export const useVideoAnalyticsStore = create<VideoAnalyticsStore>((set) => ({
  videoAnalytics: [],
  setVideoAnalytics: (updater) =>
    set((state) => ({
      videoAnalytics:
        typeof updater === "function"
          ? updater(state.videoAnalytics)
          : updater,
    })),
}));
