"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { User } from "@prisma/client";

type Props = {};

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <Button
      className=" rounderd-lg font-semibold"
      disabled={!user.subscription}
      onClick={()=>router.push('/create-page')}
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
