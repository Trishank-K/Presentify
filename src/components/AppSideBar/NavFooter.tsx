"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import { useSidebar } from "../CustomSideBar";

const NavFooter = ({ User }: { User: User }) => {
  const { open } = useSidebar();

  return (
    <div>
      <div>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          <button className={`w-full p-0 ${open&&'p-2'} flex gap-2 justify-center rounded-xl hover:bg-sidebar-accent`}>
            {User.image && (
              <div className="flex gap-2">
                <img
                  className={`rounded-full ${open?'w-10 h-10':'w-8 h-8'} shrink-0`}
                  src={User.image}
                  alt="Image"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {open && (
              <div className="grid flex-1 text-left test-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{User.name}</span>
                <span className="truncate dark:text-secondary font-semibold">
                  {User.email}
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavFooter;
