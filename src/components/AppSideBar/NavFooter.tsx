"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";

const NavFooter = ({ User }: { User: User }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("IMG: ", User.name,User.email);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!User.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 rounded-xl">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get{" "}
                  <span className="text-creative-ai-gradient">Creative AI</span>
                </p>
                <span className="text-sm dark:text-secondary">
                  Unlock all features including AI and more
                </span>
              </div>

              <button className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Upgrade
                </span>
              </button>
            </div>
          )}
          <SidebarMenuButton size={"lg"}>
          {User.image && (
            <div className="flex gap-2">
              <img
                className="rounded-full w-10 h-10"
                src={User.image}
                alt="Image"
                referrerPolicy="no-referrer"
                />
              <div className="grid flex-1 text-left test-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{User.name}</span>
                <span className="truncate dark:text-secondary font-semibold">{User.email}</span>
              </div>
            </div>
          )}
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
