import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";

type Props = {
  items: {
    id: string;
    title: string;
  }[];
};

const RecentOpen = ({ items }: Props) => {
  return (
    <div>
      {items && (
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
          <SidebarMenu className="gap-y-2">
            {items.map((item, idx) => {
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className=" shadow-sm bg-sidebar-accent hover:opacity-80 py-6"
                  >
                    <Link href={item.id} className=" truncate">
                      <span className="truncate font-semibold">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            {!items && (
              <div className="bg-sidebar-accent text-left rounded-xl mt-4  p-4">
                Your Recent Projects Appear Here
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </div>
  );
};

export default RecentOpen;
