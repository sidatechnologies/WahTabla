// components/VimeoEmbed.tsx
import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

interface VimeoEmbedProps {
  videoId: string;
  videoName?: string;
  userId?: string;
  width?: number;
  height?: number;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({
  videoId,
  videoName = "Untitled",
  userId = "anonymous",
  width = 640,
  height = 360,
}) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [seekCount, setSeekCount] = useState(0);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [watchProgress, setWatchProgress] = useState<number>(0); // 0–100%

  useEffect(() => {
    if (!playerRef.current) return;

    const player = new Player(playerRef.current, {
      id: Number(videoId),
      width,
    });

    player.on("loaded", () => {
      player.getDuration().then((duration: number) => {
        setVideoDuration(duration);
      });
    });

    player.on("play", () => {
      setPlayCount((prev) => prev + 1);
      if (!startDate) setStartDate(new Date());
    });

    player.on("pause", () => {
      setPauseCount((prev) => prev + 1);
    });

    player.on("seeked", () => {
      setSeekCount((prev) => prev + 1);
    });

    player.on("timeupdate", (data: { seconds: number }) => {
      // Use Set to track unique seconds
      setWatchedSeconds((prev) => prev + 1);
      if (videoDuration) {
        const percentage = (data.seconds / videoDuration) * 100;
        setWatchProgress(percentage);
      }
    });

    player.on("ended", () => {
      setEndDate(new Date());
    });

    return () => {
      player.unload(); // Clean up
    };
  }, [videoId, width, height, startDate, videoDuration]);

  useEffect(() => {
    if (endDate && startDate) {
      const durationSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
      const fullyWatched = watchProgress >= 98; // 98% or more considered full

      const payload = {
        userId,
        videoId,
        videoName,
        playCount,
        pauseCount,
        seekCount,
        watchedSeconds,
        totalVideoDuration: videoDuration,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        durationSeconds,
        watchProgress: Math.round(watchProgress),
        fullyWatched,
      };

      console.log("📤 Sending video tracking data:", payload);

      fetch("/api/video-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("❌ Failed to send analytics:", err));
    }
  }, [endDate]);

  return <div ref={playerRef}></div>;
};

export default VimeoEmbed;
