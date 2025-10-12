"use client";

import { notFound } from "next/navigation";
import { useVideoAnalyticsStore } from "@/store/videoAnalytics.store";
import { YearContent } from "@/components/year-content";
import { useFullProfileDetails } from "@/data/get-full-profile";
import { useAllVideoAnalyticsForUser } from "@/data/get-all-video-analytics-for-user";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { Year } from "@/lib/types";


export default function YearPage({ params }: { params: { courseId: string; yearId: string } }) {
  const yearId = parseInt(params.yearId);
  const courseId = parseInt(params.courseId);

  // Zustand store
  const setVideoAnalytics = useVideoAnalyticsStore((state) => state.setVideoAnalytics);
  const videoAnalytics = useVideoAnalyticsStore((state) => state.videoAnalytics);

  const { data: courseData, error, isPending } = useFullProfileDetails();
  const {
    data: videoAnalyticsData,
    error: videoAnalyticsError,
    isPending: isVideoAnalyticsPending,
    refetch
  } = useAllVideoAnalyticsForUser();

  // ✅ Sync store + local ONLY when API brings fresh data
  useEffect(() => {
    if (videoAnalyticsData?.success && Array.isArray(videoAnalyticsData.data)) {
      setVideoAnalytics(videoAnalyticsData.data); // replace Zustand state
    }
  }, [videoAnalyticsData, setVideoAnalytics]);

  useEffect(() => {
    refetch()
  })

  try {
    let yearData = null;

    // ✅ Loading state
    if (isPending || isVideoAnalyticsPending) {
      return (
        <div className="w-full min-h-screen">
          <section className="w-full h-full flex mt-8 relative scroll-smooth">
            <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
              <Skeleton className="min-h-[92vh] h-full max-w-[400px] w-full" />
            </aside>
            <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
              <Skeleton className="h-[500px] w-full" />
              <Skeleton className="h-10 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
              <Skeleton className="h-6 w-1/4 mt-4" />
            </div>
          </section>
        </div>
      );
    }

    // ✅ Error handling
    if (error || videoAnalyticsError || !courseData?.data) {
      return (
        <div className="w-full min-h-screen flex justify-center items-center p-10">
          <h1>No data found.</h1>
        </div>
      );
    }

    // ✅ Find year data
    if (courseData?.data) {
      for (const course of Object.values(courseData.data)) {
        const year = course.years.find((y) => y.yearId === yearId);
        if (year) {
          yearData = year;
          break;
        }
      }
    }

    if (!yearData) {
      notFound();
    }

    // ✅ Preserve old data until new arrives
    if (videoAnalytics.length === 0) {
      return (
        <div className="w-full min-h-screen flex justify-center items-center">
          <h1>Loading video analytics...</h1>
        </div>
      );
    }
    const typedYearData = yearData as Year;

    return (
      <YearContent
        year={typedYearData}
        courseId={courseId}
        videoData={videoAnalytics}
        setVideoData={setVideoAnalytics}
        yearId={yearId}
      />
    );
  } catch (error) {
    console.error("Error fetching year data:", error);
    notFound();
  }
}
