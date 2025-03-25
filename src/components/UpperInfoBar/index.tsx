import { User } from "@prisma/client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "../ModeToggle";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import NewProjectButton from "./NewProjectButton";

type Props = {
  User: User;
};

const UpperInfoBar = ({ User }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full max-w-[95%] flex justify-between items-center flex-wrap gap-4 ">
        <SearchBar />
        <ThemeSwitcher />
        <div className="max-w-[95%] flex items-center gap-4">
          <Button className="bg-primary rounder-lg hover:bg-primary/80 font-semibold cursor-not-allowed">
            <Upload />
            Import
          </Button>
          <NewProjectButton user={User}/>
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
