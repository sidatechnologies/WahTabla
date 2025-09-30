"use client";

import { useModuleContent } from "@/data/get-module-content";
import { AvatarIcon, PlayIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const OverviewSidebar = ({
  moduleId,
  handleSettingVideoId,
}: {
  moduleId: string;
  handleSettingVideoId: (videoId: string) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: moduleData, isError, error } = useModuleContent(moduleId);
  const router = useRouter();

  if (isError || error) {
    setErrorMessage(error.message);
  }

  return (
    <section className="w-full flex flex-col justify-between items-start space-y-1 max-w-[350px] min-h-[92vh] bg-white shadow-lg rounded-lg p-4">
      <div className="w-full max-w-md p-4">
        {errorMessage ? (
          <p className="text-red-500 text-lg font-semibold">
            Error: {errorMessage}
          </p>
        ) : moduleData ? (
          <div>
            {/* Module Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {moduleData.data?.module.title || "Module Information"}
              </h2>
            </div>
            {/* Video List */}
            <div>
              {moduleData.data?.videos.length ? (
                <div className="">
                  {moduleData.data.videos.toSorted((a, b) => a.title.localeCompare(b.title)).map((item, index) => (
                    <Button
                      variant="ghost"
                      key={index}
                      className="w-full h-full flex justify-start items-center rounded-lg cursor-pointer hover:bg-muted border-none shadow-none"
                      onClick={() => handleSettingVideoId(item.video_id)}
                    >
                      <p className="flex justify-start items-center gap-2 truncate capitalize">
                        <span className="font-semibold">
                          <PlayIcon className="w-10 h-10 rounded-full border border-muted-foreground p-1" />
                        </span>{" "}
                        {item.title || "No title"}
                      </p>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No videos available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
      <Button variant='secondary' onClick={() => router.push('/profile')} className="w-full">
        <AvatarIcon className="w-6 h-6" />
        <span>Profile</span>
      </Button>
    </section>
  );
};

export default OverviewSidebar;
