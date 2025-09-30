"use client";

import { GetCourseResponseType } from "@/schema/course";
import { Button } from "./ui/button";
import VimeoEmbed from "./VimeoEmbed";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const CourseVideoComponent = ({
  videoId,
  moduleData,
}: {
  videoId: string;
  moduleData: GetCourseResponseType;
}) => {

  const videos = moduleData.videos.sort((a, b) => a.title.localeCompare(b.title));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    videos.findIndex((video) => video.video_id === videoId)
  );

  useEffect(() => {
    const newIndex = videos.findIndex((video) => video.video_id === videoId);
    setCurrentVideoIndex(newIndex);
  }, [videoId, videos]);

  const content = videos[currentVideoIndex];

    // Function to handle video change
    const changeVideo = (increment: number) => {
      const newIndex = currentVideoIndex + increment;
      if (newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };


  if (!content) {
    return <span>No Such Video Found</span>;
  }

  function formatContent(text: string) {
    // Split the text by double newlines and wrap each part in a <p> tag
    return text
      .split(/\n\n/)
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  }

  return (
    <div className="max-w-[1032px] w-full min-h-[92vh] bg-white rounded-lg flex flex-col justify-start items-start p-4 shadow-lg">
      <div className="w-full h-full flex flex-col justify-between items-start gap-6">
        <div className="max-w-[1032px] w-full flex flex-col justify-start items-start gap-6">
          <VimeoEmbed videoId={content.video_id} />
          <div className="w-full flex flex-col tablet:flex-row gap-2 justify-between items-center px-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="w-full text-3xl font-semibold capitalize">
                {content.title}
              </h1>
              <span className="text-sm text-muted-foreground">
                By Pandit Abhijit Banerjee
              </span>
            </div>
            <Button variant="secondary" size="lg">
              Download PDF
            </Button>
          </div>
          {content.description && (
            <div className="text-xl px-4 font-medium">
              Description:{" "}
              <div className="text-sm font-normal text-muted-foreground">
                {formatContent(content.description)}
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center">
          <Button variant="secondary" onClick={() => changeVideo(-1)} disabled={currentVideoIndex === 0}>
            <TriangleLeftIcon />
            <span>Previous</span>
          </Button>

          <Button variant="secondary" onClick={() => changeVideo(1)} disabled={currentVideoIndex === videos.length - 1}>
            <span>Next</span>
            <TriangleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoComponent;
