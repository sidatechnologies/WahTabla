"use client";

import React, { useEffect, useState } from "react";
import OverviewSidebar from "./overview-sidebar";
import CourseVideoComponent from "./course-video-compnent";
import { useModuleContent } from "@/data/get-module-content";
import { Skeleton } from "./ui/skeleton";
import { notFound } from "next/navigation";

const CourseMainPage = ({ moduleId }: { moduleId: string }) => {
  const { data: moduleData, isError, error, isPending } = useModuleContent(moduleId);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

 useEffect(() => {
  if (moduleData?.data?.videos) {
    const sortedVideos = moduleData.data.videos
      .slice() // Create a copy to avoid mutating the original array
      .sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (A-Z)
    // Set the current video ID to the first video's ID after sorting
    setCurrentVideoId(sortedVideos[0]?.video_id || null);
  }
}, [moduleData]);

  function handleSettingVideoId(videoId: string) {
    setCurrentVideoId(videoId);
  }


  if(isPending) {
    return (
      <section className="w-full h-full flex mt-8 relative scroll-smooth">
        <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
          <Skeleton className="min-h-[92vh] h-full max-w-[400px] w-full" /> {/* Sidebar skeleton */}
        </aside>
        <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
          <Skeleton className="h-[500px] w-full" /> {/* Video skeleton */}
          <Skeleton className="h-10 w-3/4 mt-4" /> {/* Title skeleton */}
          <Skeleton className="h-4 w-1/2 mt-2" /> {/* Subtitle skeleton */}
          <Skeleton className="h-6 w-1/4 mt-4" /> {/* Button skeleton */}
        </div>
      </section>
    );
  }

  if (isError || error) {
    console.log(error);
    return <span>Error: check console for more details</span>;
  }

  if (!moduleData?.data) {
    return notFound()
  }


  return (
    <section className="w-full flex mt-8 relative scroll-smooth">
      <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
        <OverviewSidebar
          moduleId={moduleId}
          handleSettingVideoId={handleSettingVideoId}
        />
      </aside>
      <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
        {currentVideoId && (
          <CourseVideoComponent
            moduleData={moduleData.data}
            videoId={currentVideoId}
          />
        )}
      </div>
    </section>
  );
};

export default CourseMainPage;
