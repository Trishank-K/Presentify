import { getRecentProjects } from "@/actions/projects";
import getUser from "@/actions/user";
import AppSidebar from "@/components/AppSideBar/AppSideBar";
import { SideBar } from "@/components/AppSideBar/AppSideBar2";

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
    <SideBar user={user.data} recentProjects={recentProjects.data||[]}/>
    <SidebarInset className="flex">
      <UpperInfoBar User={user.data}/>
      <div className="p-4">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
};

export default Layout;
