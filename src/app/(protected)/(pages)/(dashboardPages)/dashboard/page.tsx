"use client";

import { getAllProjects } from "@/actions/projects";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      console.log(projects);
      if (projects.status === 404) {
        toast({
          variant: "default",
          title: "No existing projects",
          description: "Create a Project to get Started",
        });
      }
    };
    fetchProjects();
  }, [toast]);

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop:blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">All of your works in one place</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
