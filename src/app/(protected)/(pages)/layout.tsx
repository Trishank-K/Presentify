import getUser from "@/actions/user";
import AppSidebar from "@/components/AppSideBar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type props = { children: React.ReactNode };

const Layout = async ({children}: props) => {
    // const recentProjects = await getRecentProjects();
    const recentProjects: Project[] = []
    let user = await getUser();
    if(!user)
        redirect("/SignUp");

  return <SidebarProvider>
    <AppSidebar recentProjects={recentProjects}></AppSidebar>
  </SidebarProvider>
};

export default Layout;
