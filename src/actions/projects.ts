"use server";

import { prisma } from "@/db/prisma";
import getUser from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser = await getUser();
    if (!checkUser) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: checkUser?.data?.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }
    return { staus: 200, data: projects };
  } catch (err) {
    console.log("ERROR: ", err);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await getUser();
    if (!checkUser) {
      return { status: 403, error: "User Not Authenticated " };
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: checkUser?.data?.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
    if (projects.length === 0) {
      return { status: 404, error: "No Recent Projects" };
    }
    return { status: 200, data: projects };
  } catch (err) {
    console.log("ERROR: ", err);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const user = await getUser();
    if (!user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      select: {
        userId: true,
      },
    });
    if(!project){
      return {status:500, error: "Failed to recover project"}
    }

    if (project?.userId === user.data?.id) {
      const recover = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          isDeleted: false,
        },
      });
      return { status: 200, data: "Recover Successful" };
    }

    return { status: 403, error: "User Not Authorised" };
  } catch (err) {
    console.log(err);
    return {status:500, error: "Some Error Occured"}
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const user = await getUser();
    if (!user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      select: {
        userId: true,
      },
    });
    if(!project){
      return {status:500, error: "Failed to recover project"}
    }

    if (project?.userId === user.data?.id) {
      const recover = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          isDeleted: true,
        },
      });
      return { status: 200, data: "Delete Successful" };
    }

    return { status: 403, error: "User Not Authorised" };
  } catch (err) {
    console.log(err);
    return {status:500, error: "Some Error Occured"}
  }
};
