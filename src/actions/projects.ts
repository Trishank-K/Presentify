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
        userId: checkUser?.id,
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
    console.log('ERROR: ',err)
    return {status: 500, error: "Internal Server Error"}
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await getUser();
    if(!checkUser)  {
      return {status: 403, error: "User Not Authenticated "};
    }

    const projects = await prisma.project.findMany({
      where:{
        userId: checkUser?.id,
        isDeleted: false,
      }, orderBy: {
        updatedAt:"desc"
      }
    })
  } catch(err)  {
    
  }
}
