"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import usePromptStore from "@/store/usePromptStore";

type Props = {};

const RenderPage = (props: Props) => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={page}></motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
