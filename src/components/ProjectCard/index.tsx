"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "../ThumbnailPreview";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  src: string;
  themeName:string
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDeleted,
  slideData,
  themeName
}: Props) => {
    const {setSlides} = useSlideStore();
    const router = useRouter();
    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)))
        router.push(`/presentation/${projectId}`) 
    }
    const theme = themes.find((theme)=>theme.name===themeName) || themes[0];
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}>
            {/* <ThumbnailPreview theme={theme}
            slide={JSON.parse(JSON.stringify(slideData))?.[0]}/> */}
        </div>
    </motion.div>
  );
};

export default ProjectCard;
