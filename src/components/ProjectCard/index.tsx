"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "../ThumbnailPreview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../AlertDialogBox";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteProject, recoverProject } from "@/actions/projects";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDeleted,
  slideData,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();
  const { toast } = useToast();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleRecovery = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast({ title: "Error", description: "Project Not Found!" });
      return;
    }
    try {
      const recover = await recoverProject(projectId);
      if (recover?.error) {
        toast({
          title: "Error",
          description: recover.error,
        });
        return;
      } else if (recover?.data) {
        toast({
          title: "Success",
          description: recover.data,
        });
        setOpen(false);
        router.refresh();
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Some Error Occured!",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast({ title: "Error", description: "Project Not Found!" });
      return;
    }
    try {
      const deleted = await deleteProject(projectId);
      if (deleted?.error) {
        toast({
          title: "Error",
          description: deleted.error,
        });
        return;
      } else if (deleted?.data) {
        toast({
          title: "Success",
          description: deleted.data,
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Some Error Occured!",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview
          theme={theme}
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecovery}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="bg-secondary hover:bg-gray-300 dark:hover:bg-secondary-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
