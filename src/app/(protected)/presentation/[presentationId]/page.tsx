"use client";
import { getProjectById } from "@/actions/projects";
import { useToast } from "@/hooks/use-toast";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";

type Props = {};

const page = (props: Props) => {
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setSlides, setProject, currentTheme, setCurrentTheme } =
    useSlideStore();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presentationId as string);
        if (res.status !== 200 || !res.data) {
          toast({
            title: "Error",
            description: "Unable to load project",
          });
          redirect("/dashboard");
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        );
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to load project",
          variant: "destructive",
        });
        console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    })();
  }, []);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin to-primary"/>
        </div>
        );
    }

//   return <DndProvider></DndProvider>
};

export default page;
