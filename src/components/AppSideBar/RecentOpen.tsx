"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";
import { useToast } from "@/hooks/use-toast";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  items: {
    id: string;
    title: string;
  }[];
};

const RecentOpen = ({ items }: Props) => {
  const router = useRouter();
  const sidebar = useSidebar();
  const { toast } = useToast();
  const {setSlides} = useSlideStore(); 
  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || slides) {
      toast({ title: "Project Not Found", description: "Please try again" });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };
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
            {items.length === 0 && sidebar.open && (
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
