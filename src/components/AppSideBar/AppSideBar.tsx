"use client"
import { Project, User } from "@prisma/client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import NavMain from "./NavMain";
import { data, Recent } from "@/lib/constants";
import RecentOpen from "./RecentOpen";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: Project[] } & { user: User } & React.ComponentProps<
    typeof Sidebar
  >) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[240px] bg-secondary/20 shadow-secondary"
      {...props}
    >
      <SidebarHeader className="pt-6 px-3 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-background"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={"/src/app/favicon.ico"} alt="LOGO" />
              <AvatarFallback className="rounded-lg"></AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">Presentify</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="mt-6 px-3 gap-y-6">
        <NavMain items={data.navMain}/>
        <hr />
        <RecentOpen items={Recent}/>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
