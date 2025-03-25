import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/constants";
import ProjectCard from "../ProjectCard";
type Props = {
  projects?: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects?.map((project, id) => (
        <ProjectCard key={id}
            projectId={project?.id}
            title={project?.title}
            createdAt={project?.createdAt.toString()}
            isDeleted={project?.isDeleted}
            slideData={project?.slides}
            themeName={project.themeName}
            src={project?.thumbnail || 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
