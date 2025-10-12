"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Year, Video, VideoAnalytics } from "@/lib/types";
import { CourseSidebar } from "@/components/course-sidebar";
import { VideoDetails } from "@/components/video-details";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";
import { useSubmitVideoAnalytics } from "@/data/get-video-analytics";
import { useRouter } from "next/navigation";
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
import { ExamTable } from "./exam-table";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import PanelTopbar from "./panel-topbar";


type YearContentProps = {
  year: Year;
  courseId: number;
  videoData: VideoAnalytics[];
  setVideoData: Dispatch<SetStateAction<VideoAnalytics[]>>;
  yearId: number
};

export function YearContent({ year, courseId, videoData, setVideoData, yearId }: YearContentProps) {
  const router = useRouter()
  const { mutate: submitAnalytics, submittedAnalytics } = useSubmitVideoAnalytics();
  const [initialized, setInitialized] = useState(false);
  const [hasFinalAfter, setHasFinalAfter] = useState(false);
  const [isDisabledState, setIsDisabledState] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (!year.exams || year.exams.length === 0) {
      setAvailable(false)
      return
    }

    // Check if all exams have at least one attempt passed
    const allPassed = year.exams.every((exam) => {
      const lastAttempt = (exam as any).attempts?.[(exam as any).attempts.length - 1]
      return lastAttempt?.passed === true
    })

    setAvailable(allPassed)
  }, [year.exams])

  const getWeekNumber = (title: string) => {
    const match = title.match(/\d+/);
    return match ? parseInt(match[0], 10) : 999;
  };

  // Sort videos
  const allVideos = year.modules
    .flatMap(m => m.months)
    .flatMap(month => month.videos)
    .sort((a, b) => getWeekNumber(a.videoTitle) - getWeekNumber(b.videoTitle)).map(v => ({ ...v, isExam: false }));

  // Filter and sort exams
  const allExams = Array.from(
    new Map(year.exams?.map(e => [e.weekNumber, { ...e, isExam: true }])).values()
  );

  // Merge videos and exams
  const mergedList: (typeof allVideos[0] | typeof allExams[0] & { isExam?: boolean })[] = [];
  let examIndex = 0;

  for (let i = 0; i < allVideos.length; i++) {
    const video = allVideos[i];
    const videoWeek = getWeekNumber(video.videoTitle);

    mergedList.push(video);

    // Insert all exams that should come after this video
    while (
      examIndex < allExams.length &&
      allExams[examIndex].weekNumber === videoWeek + 1
    ) {
      mergedList.push({ ...allExams[examIndex], isExam: true });
      examIndex++;
    }
  }

  // If any exams remain (e.g. after the last video), push them too
  while (examIndex < allExams.length) {
    mergedList.push({ ...allExams[examIndex], isExam: true });
    examIndex++;
  }

  const getWeekTitle = (videoTitle: string) => {
    const match = videoTitle.match(/\d+/);
    return match ? `Week ${match[0]}` : "Unknown Week";
  };

  useEffect(() => {
    if (!(allVideos as any).length || !(videoData as any).length || initialized) return;

    const mergedContent: any[] = mergedList; // make sure you have allExams

    const watched = (mergedContent as any).filter((item: any) =>
      (videoData as any).some((vd: any) =>
        item.isExam ? vd.examId === item.examId : vd.videoId === item.videoId
      )
    );

    if ((watched as any).length > 0) {
      const sorted = [...watched].sort((a: any, b: any) => {
        const getWeekNumber = (item: any) => {
          if (item.isExam) return item.weekNumber || 999;
          const match = (item.videoTitle || "").match(/\d+/);
          return match ? parseInt(match[0], 10) : 999;
        };
        return getWeekNumber(a) - getWeekNumber(b);
      });

      const lastItem: any = sorted[sorted.length - 1];

      if (lastItem.isExam) {
        const idx = mergedContent.findIndex(
          (e: any) => e.isExam && e.examId === lastItem.examId
        );

        setSelectedVideo(lastItem);
        setSelectedVideoIndex(idx);
        setSelectedWeek(`Week ${lastItem.weekNumber}`);
      } else {
        const idx = (mergedList as any).findIndex((v: any) => v.videoId === lastItem.videoId);

        setSelectedVideo(lastItem);
        setSelectedVideoIndex(idx);
        setSelectedWeek(getWeekTitle(lastItem.videoTitle));
      }
    } else {
      const first: any = (mergedList as any)[0];
      setSelectedVideo(first);
      setSelectedVideoIndex(0);
      setSelectedWeek(getWeekTitle(first.videoTitle));
    }

    setInitialized(true);
  }, [allVideos, allExams, videoData, initialized]);

  // Define type guards
  function isVideo(item: any): item is { videoId: number } {
    return !item.isExam && "videoId" in item;
  }

  function isExam(item: any): item is { type: string } {
    return item.isExam === true && "type" in item;
  }

  useEffect(() => {
    if (!selectedVideo) return;

    const selectedIndex = mergedList.findIndex(
      item => isVideo(item) && item.videoId === selectedVideo.videoId
    );

    if (selectedIndex === -1 || selectedIndex === mergedList.length - 1) {
      // Either video not found or it's the last item
      setHasFinalAfter(false);
      return;
    }

    const nextItem = mergedList[selectedIndex + 1];

    const isNextFinalExam = isExam(nextItem) && nextItem.type === "final";

    setHasFinalAfter(isNextFinalExam);
  }, [selectedVideo, mergedList]);



  // Type guard to check if an item is an exam



  const isDisabled = selectedVideo
    ? selectedVideo.isExam
      ? !(videoData.find(v => v.examId === selectedVideo.examId))
      : !(videoData.find(v => v.videoId === selectedVideo.videoId)?.isAvailable)
    : false;

  const canGoNext = selectedVideo
    ? (videoData.find(v => v.videoId === selectedVideo.videoId)?.watchProgress ?? 0) >= 90
    : false;

  const handlePrevVideo = () => {
    if (selectedVideoIndex <= 0) return;
    const prev = allVideos[selectedVideoIndex - 1];
    setSelectedVideo(prev);
    setSelectedVideoIndex(selectedVideoIndex - 1);
    setSelectedWeek(getWeekTitle(prev.videoTitle));
  };

  const handleNextVideo = async () => {
    if (!selectedVideo || selectedVideoIndex > mergedList.length - 1) return;

    if (!selectedVideo.isExam) {
      const weekNumber = getWeekNumber(selectedWeek) + 1
      const hasExam = weekNumber !== null && allExams.find(exam => exam.weekNumber === weekNumber);
      const hasExamv2 = mergedList[selectedVideoIndex + 1]
      if (hasExamv2.isExam) {
        if ('type' in hasExamv2 && hasExamv2.type === "final") {
          const analyticsItem = videoData.find(v => v.videoId === selectedVideo.videoId);
          if (analyticsItem) {
            submitAnalytics({ analytics: [analyticsItem], isNextVideo: false });
            setVideoData([...videoData, analyticsItem])
            router.push(`/exam/final/courses/${courseId}/year/${yearId}/week/52`)
            return
          }
          router.push(`/exam/final/courses/${courseId}/year/${yearId}/week/52`)
          return
        }
        const nextVideo = mergedList[selectedVideoIndex + 1];
        const prevVideo = mergedList[selectedVideoIndex];

        const prevVideoAnalytics = prevVideo.hasOwnProperty('videoId')
          ? videoData.find(v => v.videoId === (prevVideo as any).videoId)
          : videoData.find(v => v.examId === (prevVideo as any).examId);

        setVideoData(prev => {
          const exists = prev.find(v => {
            const anyV = v as any;
            const anyNext = nextVideo as any;

            return nextVideo.isExam
              ? anyV.examId === anyNext.examId
              : anyV.videoId === anyNext.videoId;
          });
          if (exists) {
            setSelectedVideo({
              isExam: true,
              videoId: -1,
              videoTitle: "",
              videoUrl: "",
              videoVimeoId: "",
              description: "",
              duration: 0,
              thumbnailUrl: "",
              examId: (nextVideo as any).examId
            } as Video);
            setSelectedVideoIndex(selectedVideoIndex + 1);
            setSelectedWeek(
              `Week ${"weekNumber" in hasExamv2 && typeof hasExamv2.weekNumber === "number"
                ? hasExamv2.weekNumber
                : "Unknown"
              }`
            );
            return prev;
          } else {
            const analytics: VideoAnalytics = {
              analyticsId: -1,
              userId: videoData[0].userId || -1,
              videoId: 1,
              videoName: `Exam For Week ${(nextVideo as any).weekNumber}`,
              durationSeconds: 1,
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              playCount: 1,
              pauseCount: 41,
              seekCount: 2,
              totalVideoDuration: 20,
              fullyWatched: false,
              isAvailable: true,
              watchProgress: 100,
              watchedSeconds: 20,
              isExam: true,
              examId: (nextVideo as any).examId,
              yearId: yearId,
              courseId: courseId
            };

            // Ensure all fields are defined and match VideoAnalytics type
            const safePrevVideoAnalytics: VideoAnalytics = {
              analyticsId: prevVideoAnalytics?.analyticsId ?? -1,
              userId: prevVideoAnalytics?.userId ?? -1,
              videoId: prevVideoAnalytics?.videoId ?? -1,
              videoName: prevVideoAnalytics?.videoName ?? "",
              durationSeconds: prevVideoAnalytics?.durationSeconds ?? 1,
              startDate: prevVideoAnalytics?.startDate ?? new Date().toISOString(),
              endDate: prevVideoAnalytics?.endDate ?? new Date().toISOString(),
              playCount: prevVideoAnalytics?.playCount ?? 1,
              pauseCount: prevVideoAnalytics?.pauseCount ?? 1,
              seekCount: prevVideoAnalytics?.seekCount ?? 1,
              totalVideoDuration: prevVideoAnalytics?.totalVideoDuration ?? 1,
              fullyWatched: prevVideoAnalytics?.fullyWatched ?? false,
              isAvailable: prevVideoAnalytics?.isAvailable ?? false,
              watchProgress: prevVideoAnalytics?.watchProgress ?? 1,
              watchedSeconds: prevVideoAnalytics?.watchedSeconds ?? 1,
              isExam: false,
              examId: null,
              yearId: yearId,
              courseId: courseId
            };

            const analyticsUpdates: VideoAnalytics[] = [safePrevVideoAnalytics, analytics];

            submitAnalytics({ analytics: analyticsUpdates, isNextVideo: true });

            setSelectedVideo({
              isExam: true,
              description: "",
              duration: 0,
              thumbnailUrl: "",
              videoId: -1,
              videoTitle: "",
              videoUrl: "",
              videoVimeoId: "",
              examId: (nextVideo as any).examId
            });
            setSelectedVideoIndex(selectedVideoIndex + 1);
            setSelectedWeek(
              typeof hasExam === "object" && hasExam !== null && "weekNumber" in hasExam
                ? `Week ${hasExam.weekNumber}`
                : "Unknown Week"
            );
            return [...prev, analytics];
          }
        });
        return
      } else {
        if (selectedVideoIndex === mergedList.length - 1) {
          // Submit analytics for the last video
          const analyticsItem = videoData.find(v => v.videoId === selectedVideo.videoId);
          if (analyticsItem) {
            submitAnalytics({ analytics: [analyticsItem], isNextVideo: false });
            return
          }
          return
        }
        const nextVideo = mergedList[selectedVideoIndex + 1];
        const prevVideo = mergedList[selectedVideoIndex];

        const prevVideoAnalytics = prevVideo.hasOwnProperty('videoId')
          ? videoData.find(v => v.videoId === (prevVideo as any).videoId)
          : videoData.find(v => v.examId === (prevVideo as any).examId);

        setVideoData(prev => {
          const exists = prev.find(v => {
            if ((nextVideo as any).isExam) {
              return v.examId === (nextVideo as any).examId;
            } else {
              return v.videoId === (nextVideo as any).videoId;
            }
          });
          if (exists) {
            // If nextVideo is an exam, construct a Video-like object
            if ((nextVideo as any).isExam) {
              setSelectedVideo({
                isExam: true,
                videoId: -1,
                videoTitle: "",
                videoUrl: "",
                videoVimeoId: "",
                description: "",
                duration: 0,
                thumbnailUrl: "",
                examId: (nextVideo as any).examId
              });
              setSelectedVideoIndex(selectedVideoIndex + 1);
              setSelectedWeek(`Week ${(nextVideo as any).weekNumber}`);
            } else {
              setSelectedVideo(nextVideo as Video);
              setSelectedVideoIndex(selectedVideoIndex + 1);
              setSelectedWeek(getWeekTitle((nextVideo as any).videoTitle));
            }
            return prev;
          } else {
            const analytics: VideoAnalytics = {
              analyticsId: -1,
              userId: videoData[0].userId || -1,
              videoId: 'videoId' in nextVideo ? nextVideo.videoId : -1,
              videoName: 'videoTitle' in nextVideo ? nextVideo.videoTitle : "",
              durationSeconds: 'duration' in nextVideo ? nextVideo.duration || 0 : 0,
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              playCount: 0,
              pauseCount: 0,
              seekCount: 0,
              totalVideoDuration: 'duration' in nextVideo ? Math.round(nextVideo.duration / 60 || 0) : 0,
              fullyWatched: false,
              isAvailable: true,
              watchProgress: 0,
              watchedSeconds: 0,
              isExam: false,
              examId: null,
              yearId: yearId,
              courseId: courseId
            };

            // Ensure all fields are defined and match VideoAnalytics type
            const safePrevVideoAnalytics: VideoAnalytics = {
              analyticsId: prevVideoAnalytics?.analyticsId ?? -1,
              userId: prevVideoAnalytics?.userId ?? -1,
              videoId: prevVideoAnalytics?.videoId ?? -1,
              videoName: prevVideoAnalytics?.videoName ?? "No video",
              durationSeconds: prevVideoAnalytics?.durationSeconds ?? 0,
              startDate: prevVideoAnalytics?.startDate ?? new Date().toISOString(),
              endDate: prevVideoAnalytics?.endDate ?? new Date().toISOString(),
              playCount: prevVideoAnalytics?.playCount ?? 0,
              pauseCount: prevVideoAnalytics?.pauseCount ?? 0,
              seekCount: prevVideoAnalytics?.seekCount ?? 0,
              totalVideoDuration: prevVideoAnalytics?.totalVideoDuration ?? 0,
              fullyWatched: prevVideoAnalytics?.fullyWatched ?? false,
              isAvailable: prevVideoAnalytics?.isAvailable ?? false,
              watchProgress: prevVideoAnalytics?.watchProgress ?? 0,
              watchedSeconds: prevVideoAnalytics?.watchedSeconds ?? 0,
              isExam: false,
              examId: null,
              yearId: yearId,
              courseId: courseId
            };

            const analyticsUpdates: VideoAnalytics[] = [safePrevVideoAnalytics, analytics];

            submitAnalytics({ analytics: analyticsUpdates, isNextVideo: true });

            // If nextVideo is an exam, construct a Video-like object
            if ((nextVideo as any).isExam) {
              setSelectedVideo({
                isExam: true,
                videoId: -1,
                videoTitle: "",
                videoUrl: "",
                videoVimeoId: "",
                description: "",
                duration: 0,
                thumbnailUrl: "",
                examId: (nextVideo as any).examId
              } as Video);
            } else {
              setSelectedVideo(nextVideo as Video);
            }
            setSelectedVideoIndex(selectedVideoIndex + 1);
            setSelectedWeek(
              'videoTitle' in nextVideo
                ? getWeekTitle(nextVideo.videoTitle)
                : `Week ${(nextVideo as any).weekNumber}`
            );
            return [...prev, analytics];
          }
        });
      }
    }
  };

  return (
    <SidebarProvider>
      <CourseSidebar
        courseId={courseId}
        year={year}
        selectedWeek={selectedWeek}
        selectedVideo={selectedVideo}
        onVideoSelect={(video, index, weekTitle) => {
          setSelectedVideo(video);
          setSelectedVideoIndex(index);
          setSelectedWeek(weekTitle);
        }}
        videoData={videoData}
        mergedList={allExams}
        allVideos={allVideos}
      />
      <SidebarInset>
        <div className="flex space-x-4 relative m-0">
          <main
            className={`flex-1 relative ${isDisabled ? "overflow-hidden" : "overflow-y-auto"
              } backdrop-blur-md rounded-lg`}
          >
            <PanelTopbar suite={year.yearName} service={selectedWeek} />
            {selectedVideo?.isExam ? isDisabled ? (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center cursor-not-allowed m-2 rounded-lg">
                <Lock className="h-10 w-10" />
                <p className="text-xl font-bold text-red-600">Exam Locked</p>
                <p className="text-md text-black-600">
                  Complete the previous videos to get access!
                </p>
              </div>
            ) : "" : isDisabled ? (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center cursor-not-allowed m-2 rounded-lg">
                <Lock className="h-10 w-10" />
                <p className="text-xl font-bold text-red-600">Video Locked</p>
                <p className="text-md text-black-600">
                  Complete the previous videos to get access!
                </p>
              </div>
            ) : ""}

            <VideoDetails
              video={selectedVideo}
              yearName={year.yearName}
              selectedWeek={selectedWeek}
              courseId={courseId}
              yearId={year.yearId}
              videoData={videoData}
              setVideoData={setVideoData}
              isDisabledState={isDisabledState}
              setIsDisabledState={setIsDisabledState}
            />

            {/* {!isDisabled && (
          <div className="mt-4 flex justify-between p-4">
            <Button
              onClick={handlePrevVideo}
              disabled={selectedVideoIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextVideo}
              disabled={!canGoNext || selectedVideoIndex === allVideos.length - 1}
            >
              Next
            </Button>
          </div>
        )} */}
            {isDisabled ? "" : selectedVideo?.isExam ? "" : (
              <div className="mt-4 flex justify-between p-4">
                <Button
                  onClick={handlePrevVideo}
                  disabled={selectedVideoIndex === 0}
                >
                  Previous
                </Button>
                {
                  hasFinalAfter ?
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            disabled={!canGoNext}
                          >
                            Final Exam
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                          <DialogHeader>
                            <DialogTitle>Exam Overview</DialogTitle>
                            <DialogDescription>
                              Here’s a list of all your assessments for this term
                            </DialogDescription>
                          </DialogHeader>
                          <ExamTable data={year.exams} courseId={courseId} yearId={year.yearId} />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={() =>
                              router.push(
                                `/exam/final/courses/${courseId}/year/${year.yearId}/week/52`
                              )
                            } disabled={!available}>
                              Final Exam</Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog> : <Button
                      onClick={handleNextVideo}
                      disabled={!canGoNext || hasFinalAfter}
                    >
                      Next
                    </Button>
                }

              </div>
            )
            }
          </main >
        </div >
      </SidebarInset>
    </SidebarProvider>
  );
}
