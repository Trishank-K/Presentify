"use client";

import { getAllProjects } from "@/actions/projects";
import NotFound from "@/components/NotFound/NotFound";
import ProjectCard from "@/components/ProjectCard";
import Projects from "@/components/Projects";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@prisma/client";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      if (projects.status === 404) {
        toast({
          variant: "default",
          title: "No existing projects",
          description: "Create a Project to get Started",
        });
      } else if (projects.data) {
        setProjects(projects.data);
      }
    };
    fetchProjects();
  }, [toast]);

  return (
    <div className="w-full flex flex-col gap-6 relative p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold text-primary backdrop:blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All of your works in one place
          </p>
        </div>
      </div>
      {projects.length > 0 ? <Projects projects={projects}/> : <NotFound />}
    </div>
  );
};

export default DashboardPage;
