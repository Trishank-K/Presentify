import { getRecentProjects } from "@/actions/projects";
import getUser from "@/actions/user";
import AppSidebar from "@/components/AppSideBar/AppSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UpperInfoBar from "@/components/UpperInfoBar";
import { Project, User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type props = { children: React.ReactNode };

const Layout = async ({children}: props) => {
    const recentProjects = await getRecentProjects();
    let user = await getUser();
    if(!user.data)
        redirect("/SignUp");

  return <SidebarProvider>
    <AppSidebar user={user.data} recentProjects={recentProjects.data||[]}/>
    <SidebarInset className="flex">
      <UpperInfoBar User={user.data}/>
        {children}
    </SidebarInset>
  </SidebarProvider>
};

export default Layout;
