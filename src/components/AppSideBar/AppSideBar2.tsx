"use client";
import { useState } from "react";
import { Sidebar, SidebarBody } from "../CustomSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Project, User } from "@prisma/client";
import NavMain from "./NavMain";
import { data } from "@/lib/constants";
import NavMain2 from "./NavMain2";
import RecentOpen from "./RecentOpen";
import NavFooter from "./NavFooter";

export const SideBar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: Project[] } & { user: User } & React.ComponentProps<
    typeof Sidebar
  >) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="bg-sidebar dark:bg-sidebar space-y-4 ">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex space-x-2 justify-center items-center">
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarImage src={"/public/next.svg"} alt="LOGO" />
                  <AvatarFallback className="rounded-lg"></AvatarFallback>
                </Avatar>
                <h2 className="truncate text-primary text-3xl font-semibold">
                  Presentify
                </h2>
              </div>
              <div className="flex flex-col gap-y-6">
                <NavMain2 items={data.navMain2} />
                {open && <hr />}
                {open && <hr /> && <RecentOpen items={recentProjects} />}
              </div>
            </div>
          <div>
            <NavFooter User={user} />
          </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};
