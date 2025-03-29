"use client";
import usePromptStore from "@/store/usePromptStore";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreativeAiStore } from "@/store/useCreativeAiStore";
import { toast } from "@/hooks/use-toast";

type Props = {};

const RecentPrompts = (props: Props) => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAiStore();
  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt.id === id);
    if (prompt) {
      setPage("creative-ai");
      addMultipleOutlines(prompt.outlines);
      setCurrentAiPrompt(prompt.title);
    }
    else{
      toast({title:'Error', description:'Prompt Not Found'});
    }
  };

  return (
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full mx-auto"
      >
        {prompts.map((prompt, index) => {
          return (
            <div key={index}>
              <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
                <div>
                  <h3 className="font-semibold text-xl line-clamp-1">
                    {prompt?.title}
                  </h3>
                  <p className="font-semibold text-sm text-muted-foreground">
                    {timeAgo(prompt?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-creative-ai-gradient">
                    Creative AI
                  </span>
                  <Button
                    variant={"default"}
                    size={"lg"}
                    className="rounded-xl bg-primary/20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                    onClick={() => handleEdit(prompt.id)}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
