import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn(
        "w-full relative aspect-video rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground 
      }}
    >
      ThumbnailPreview
    </div>
  );
};

export default ThumbnailPreview;
