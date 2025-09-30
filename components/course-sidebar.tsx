"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  VideoIcon,
  Lock,
  Eye,
  BadgeCheck,
  BookOpen,
  ChartColumnIncreasing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Year, Video, VideoAnalytics } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CourseSidebarProps = {
  courseId: number;
  year: Year;
  selectedWeek: string | null;
  onVideoSelect: (
    video: Video | null,
    index: number,
    weekTitle: string
  ) => void;
  selectedVideo: Video | null;
  videoData: VideoAnalytics[];
  mergedList: Array<{
    isExam: boolean;
    examId: number;
    type: string;
    weekNumber: number;
    yearId: number;
  }>;
  allVideos: Video[];
};

export function CourseSidebar({
  courseId,
  year,
  selectedWeek,
  onVideoSelect,
  videoData,
  mergedList,
  allVideos,
}: CourseSidebarProps) {
  console.log(year.exams)
  const [openModules, setOpenModules] = useState<number[]>([]);
  const [openMonths, setOpenMonths] = useState<number[]>([]);
  const [initialized, setInitialized] = useState(false);

  const allWatched = allVideos.every((video) => {
    const analytics = videoData.find((v) => v.videoId === video.videoId);
    return (
      analytics?.watchProgress !== undefined && analytics.watchProgress >= 90
    );
  });

  useEffect(() => {
    if (!selectedWeek || initialized) return;

    let weekCounter = 0;
    let foundModule: number | null = null;
    let foundMonth: number | null = null;

    for (const courseModule of year.modules) {
      for (const month of courseModule.months) {
        for (let i = 1; i <= 4; i++) {
          weekCounter++;
          const currentWeek = `Week ${weekCounter}`;
          if (currentWeek === selectedWeek) {
            foundModule = courseModule.moduleId;
            foundMonth = month.monthId;
            break;
          }
        }
        if (foundMonth) break;
      }
      if (foundModule) break;
    }

    if (foundModule) setOpenModules([foundModule]);
    if (foundMonth) setOpenMonths([foundMonth]);

    // setInitialized(true);
  }, [selectedWeek, year, initialized]);

  const router = useRouter();

  let weekCounter = 1;

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleMonth = (monthId: number) => {
    setOpenMonths((prev) =>
      prev.includes(monthId)
        ? prev.filter((id) => id !== monthId)
        : [...prev, monthId]
    );
  };

  function extractWeekNumber(title: string): number | null {
    const match = title.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  return (
    <div className="rounded-lg hidden md:block relative h-[calc(100vh-4rem)] w-80 p-1 backdrop-blur-md bg-white/4 border-2 border-slate-600 flex flex-col">
      <ScrollArea className="h-[calc(100vh-7rem)] w-full">
        <div className="w-full p-4">
          <h2 className="mb-4 text-lg font-semibold">{year.yearName}</h2>
          {year.modules.map((courseModule) => (
            <Collapsible
              key={courseModule.moduleId}
              open={openModules.includes(courseModule.moduleId)}
              onOpenChange={() => toggleModule(courseModule.moduleId)}
              className="w-full py-1"
            >
              <CollapsibleTrigger asChild>
                <Button variant="default" className="w-full justify-start">
                  {openModules.includes(courseModule.moduleId) ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  {courseModule.moduleName}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-full">
                {courseModule.months.map((month) => {
                  const totalWeeks = 4;
                  const allWeeks = Array.from(
                    { length: totalWeeks },
                    () => `Week ${weekCounter++}`
                  );

                  const videoMap = new Map(
                    month.videos.map((video) => {
                      const normalizedTitle = video.videoTitle
                        .toLowerCase()
                        .replace(/\.(mp4|mov|avi)$/i, "")
                        .replace(/(:| - ).*$/, "")
                        .replace(/\b(\d+)(st|nd|rd|th)\b/, "$1")
                        .replace(/&.*/, "");
                      return [normalizedTitle, video];
                    })
                  );

                  return (
                    <Collapsible
                      key={month.monthId}
                      open={openMonths.includes(month.monthId)}
                      onOpenChange={() => toggleMonth(month.monthId)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full border border-black justify-start mt-2"
                        >
                          {openMonths.includes(month.monthId) ? (
                            <ChevronDown className="mr-2 h-4 w-4" />
                          ) : (
                            <ChevronRight className="mr-2 h-4 w-4" />
                          )}
                          {month.monthName}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="w-full">
                        {allWeeks.map((weekTitle, index) => {
                          const normalizedWeekTitle = weekTitle.toLowerCase();
                          const extractedWeekNumber =
                            extractWeekNumber(normalizedWeekTitle);
                          const video = videoMap.get(normalizedWeekTitle);
                          const isSelected = selectedWeek === weekTitle;
                          const hasExam =
                            extractedWeekNumber !== null &&
                            mergedList.find(
                              (exam) => exam.weekNumber === extractedWeekNumber
                            );
                          const weekNumberMatch = weekTitle.match(/\d+/);
                          const weekNumber = weekNumberMatch
                            ? parseInt(weekNumberMatch[0], 10)
                            : index + 1;

                          const analytics = video
                            ? videoData.find(
                              (v) => v.videoId === video.videoId
                            )
                            : null;
                          const examAnalytics = hasExam
                            ? videoData.find(
                              (v) => v.examId === hasExam.examId
                            )
                            : null;
                          const isDisabled =
                            !analytics || !analytics.isAvailable;
                          const isGettingWatched = analytics
                            ? analytics.watchProgress >= 0 &&
                            analytics.watchProgress < 90
                            : false;
                          const isFullyWatched = analytics
                            ? analytics.watchProgress >= 90
                            : false;

                          return (
                            <Button
                              key={index}
                              variant="ghost"
                              className={cn(
                                "w-full justify-between mt-2",
                                isSelected ? "bg-white border-none" : "",
                                examAnalytics
                                  ? ""
                                  : isDisabled
                                    ? "relative opacity-50"
                                    : ""
                              )}
                              onClick={() => {
                                if (hasExam) {
                                  onVideoSelect(
                                    {
                                      isExam: true,
                                      description: "",
                                      duration: 0,
                                      thumbnailUrl: "",
                                      videoId: -1,
                                      videoTitle: "",
                                      videoUrl: "",
                                      videoVimeoId: "",
                                      examId: (hasExam as any).examId,
                                    },
                                    weekNumber - 1,
                                    weekTitle
                                  );
                                } else {
                                  onVideoSelect(
                                    video
                                      ? { ...video, isExam: false }
                                      : null,
                                    weekNumber - 1,
                                    weekTitle
                                  );
                                }
                              }}
                            >
                              <div className="flex items-center">
                                {video ? (
                                  <VideoIcon className="mr-2 h-4 w-4" />
                                ) : hasExam ? (
                                  <BookOpen className="mr-2 h-4 w-4" />
                                ) : (
                                  <VideoIcon className="mr-2 h-4 w-4" />
                                )}
                                {weekTitle}
                              </div>
                              {examAnalytics ? (
                                <ChartColumnIncreasing className="relative right-0 ml-2 h-4 w-4" />
                              ) : (
                                isDisabled && (
                                  <Lock className="relative right-0 ml-2 h-4 w-4" />
                                )
                              )}
                              {isGettingWatched && (
                                <Eye className="relative right-0 ml-2 h-4 w-4" />
                              )}
                              {isFullyWatched && (
                                <BadgeCheck className="relative right-0 ml-2 h-4 w-4" />
                              )}
                            </Button>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={!allWatched}
                  // onClick={() =>
                  //   router.push(
                  //     `/exam/final/courses/${courseId}/year/${year.yearId}/week/52`
                  //   )
                  // }
                  className="w-full mt-2"
                >
                  Final Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

        </div>
      </ScrollArea>
      <Link href="/profile" className="absolute bottom-0 left-0 w-full p-4">
        <Button variant="outline" className="w-full bg-white">
          Profile
        </Button>
      </Link>
    </div>
  );
}
