import type { Clip } from "@prisma/client";
import { Download, Ghost, Loader2, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";

type MyClipsProps = {
  clips: Clip[];
};

const ClipCard = ({ clip }: { clip: Clip }) => {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clip.id);
        if (result.success && result.url) {
          setPlayUrl(result.url);
        } else if (result.error) {
          console.error("Failed to get play url: ", result.error);
        }
      } catch (error) {
        console.error("Failed to get play url: ", error);
      } finally {
        setIsLoadingUrl(false);
      }
    }

    void fetchPlayUrl();
  }, [clip.id]);

  return (
    <div className="flex max-w-52 flex-col gap-2">
      <div className="bg-muted">
        {isLoadingUrl ? (
          <div className="flex h-[360px] w-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-[360px] w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex h-[360px] w-full items-center justify-center">
            <Play className="text-muted-foreground h-10 w-10 opacity-50" />
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={isLoadingUrl}
      >
        <Download className="mr-1.5 h-4 w-4" />
        Download
      </Button>
    </div>
  );
};

const MyClips: React.FC<MyClipsProps> = ({ clips }) => {
  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <Ghost size={45} className="text-muted-foreground" />
        <p className="text-muted-foreground text-center">
          No clips generated yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
};
export default MyClips;
