"use client";

import Link from "next/link";
import Player from "@vimeo/player";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Video, VideoAnalytics } from "@/lib/types";
import { getTheoryLink, getThisWeekNoteLink } from "@/utils/get-notes";

type VideoDetailsProps = {
  video: Video | null;
  yearName: string;
  selectedWeek: string;
  courseId: number;
  yearId: number;
  videoData: VideoAnalytics[];
  setVideoData: Dispatch<SetStateAction<VideoAnalytics[]>>;
  isDisabledState?: boolean;
  setIsDisabledState?: Dispatch<SetStateAction<boolean>>;
};

export function VideoDetails({
  video,
  yearName,
  selectedWeek,
  courseId,
  yearId,
  videoData,
  setVideoData,
  isDisabledState,
  setIsDisabledState
}: VideoDetailsProps) {
  const [analytics, setAnalytics] = useState<VideoAnalytics | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<Player | null>(null);
  const router = useRouter();

  const openPdf = (url: string | null) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!video || !playerRef.current) return;

    // Destroy old player if exists
    if (playerInstance.current) {
      playerInstance.current.destroy().catch(() => { });
      playerInstance.current = null;
    }

    const player = new Player(playerRef.current, {
      id: Number(video.videoVimeoId),
      width: playerRef.current.clientWidth,
    });

    playerInstance.current = player;

    // Find existing analytics
    const existing = videoData.find(v => v.videoId === video.videoId);
    if (existing) {

      // Always create initial analytics (either from existing or placeholder)
      const initialAnalytics: VideoAnalytics = existing
        ? { ...existing }
        : {
          analyticsId: -1, // placeholder until server assigns real id
          videoId: video.videoId,
          videoName: video.videoTitle,
          userId: null,
          playCount: 0,
          pauseCount: 0,
          seekCount: 0,
          durationSeconds: 0,
          totalVideoDuration: video.duration,
          watchedSeconds: 0,
          watchProgress: 0,
          fullyWatched: false,
          isAvailable: true,
          startDate: new Date().toISOString(),
          endDate: null,
        };

      setAnalytics(initialAnalytics);

      // Create a new Vimeo player


      // Resume if watchedSeconds > 0
      if (existing && existing.watchedSeconds > 0) {
        player.setCurrentTime(existing.watchedSeconds - 2).catch(() => { });
      }

      // Player event bindings
      player.on("play", () =>
        setAnalytics(prev =>
          prev ? { ...prev, playCount: prev.playCount + 1 } : prev
        )
      );
      player.on("pause", () =>
        setAnalytics(prev =>
          prev ? { ...prev, pauseCount: prev.pauseCount + 1 } : prev
        )
      );
      player.on("seeked", () =>
        setAnalytics(prev =>
          prev ? { ...prev, seekCount: prev.seekCount + 1 } : prev
        )
      );
      player.on("timeupdate", (data: { seconds: number }) =>
        setAnalytics(prev => {
          if (!prev) return prev;
          const watchedSeconds = Math.round(data.seconds);
          const totalDurationSeconds = prev.durationSeconds;

          const watchProgress = totalDurationSeconds
            ? Math.min(100, Math.round((watchedSeconds / totalDurationSeconds) * 100))
            : 0;

          const fullyWatched = watchProgress >= 90;

          return {
            ...prev,
            watchedSeconds,
            watchProgress,
            fullyWatched,
            endDate: fullyWatched ? new Date().toISOString() : prev.endDate,
          };
        })
      );
      player.on("ended", () =>
        setAnalytics(prev =>
          prev
            ? { ...prev, fullyWatched: true, watchProgress: 100, endDate: new Date().toISOString() }
            : prev
        )
      );
    }

    return () => {
      player.unload().catch(() => { });
    };
  }, [video, selectedWeek]); // 🚨 only depend on video + week


  useEffect(() => {
    if (!analytics) return;

    setVideoData(prev => {
      const exists = prev.find(v => v.videoId === analytics.videoId);

      if (exists) {
        // overwrite even if placeholder (-1), but keep the real analyticsId once it comes
        return prev.map(v =>
          v.videoId === analytics.videoId
            ? { ...analytics, analyticsId: analytics.analyticsId !== -1 ? analytics.analyticsId : v.analyticsId }
            : v
        );
      } else {
        // first time seeing this video -> push it in
        return [...prev, analytics];
      }
    });
  }, [analytics, setVideoData]);

  if (!video || video.isExam) {
    return (
      <div className="flex h-full items-center justify-center">
        {selectedWeek ? (
          ["Week 13", "Week 26", "Week 39"].includes(selectedWeek) ? (
            <div className="flex flex-col justify-center items-center gap-8">
              <Button variant="outline" className="rounded-full">
                📅 {selectedWeek} (Exam Week)
              </Button>
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  onClick={() =>
                    router.push(
                      `/exam/mcq/courses/${courseId}/year/${yearId}/week/${selectedWeek.replace(
                        "Week ",
                        ""
                      )}`
                    )
                  }
                  variant="secondary"
                >
                  MCQ Exam
                </Button>
                <Button
                  onClick={() =>
                    router.push(
                      `/exam/saq/courses/${courseId}/year/${yearId}/week/${selectedWeek.replace(
                        "Week ",
                        ""
                      )}`
                    )
                  }
                  variant="secondary"
                >
                  SAQ Exam
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-8">
              <Button variant="outline" className="rounded-full">
                📅 {selectedWeek} (No Video Available)
              </Button>
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  onClick={() => openPdf(getTheoryLink(selectedWeek, yearName))}
                  variant="secondary"
                >
                  View Theory
                </Button>
                <Button
                  onClick={() =>
                    openPdf(getThisWeekNoteLink(selectedWeek, yearName))
                  }
                  variant="secondary"
                >
                  View Lecture Notes
                </Button>
              </div>
            </div>
          )
        ) : (
          <p className="text-muted-foreground">
            Select a video to view details
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">{video.videoTitle}</h2>
      </div>

      <div className="aspect-video mb-4 rounded-lg overflow-hidden">
        <div
          ref={playerRef}
          className="relative w-full h-full rounded-lg overflow-hidden"
        />
      </div>

      <p className="mb-2 text-sm text-muted-foreground">
        Duration: {Math.floor(video.duration / 60)} minutes
      </p>

      <div className="w-full flex justify-between items-center mb-4">
        <h1>By Pandit Abhijit Banerjee</h1>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            onClick={() => openPdf(getTheoryLink(selectedWeek, yearName))}
            variant="secondary"
          >
            View Theory
          </Button>
          <Button
            onClick={() => openPdf(getThisWeekNoteLink(selectedWeek, yearName))}
            variant="secondary"
          >
            View Lecture Notes
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">{video.description}</p>
    </div>
  );
}
