"use client";

import React, { useEffect, useRef, useState } from "react";
import Player, { Options } from "@vimeo/player";
import { PieChartIcon } from "@radix-ui/react-icons";

interface VimeoEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({
  videoId,
  width = 1000,
  height = 360,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!playerRef.current) {
      console.error("Player container is not available");
      return;
    }

    const options: Options = {
      id: parseInt(videoId, 10),
      width,
      height,
      responsive: true,
    };

    const player = new Player(playerRef.current, options);

    player.on("loaded", () => {
      console.info("player loaded");
      setIsLoading(false);
    });

    player.on("error", (error) => {
      console.error("Player error:", error);
      setIsLoading(false);
    });

    // Cleanup: Ensure player is destroyed synchronously
    return () => {
      player
        .destroy()
        .catch((error) => console.error("Error destroying player:", error));
      setIsLoading(true);
    };
  }, [videoId, width, height]);

  return (
    <>
      <div ref={playerRef} className="w-full h-full"></div>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center gap-2">
          <PieChartIcon
            width={16}
            height={16}
            className="animate-spin text-muted-foreground/30"
          />
          <span className="text-sm text-muted-foreground/80">
            Loading Video..
          </span>
        </div>
      )}
    </>
  );
};

export default VimeoEmbed;
