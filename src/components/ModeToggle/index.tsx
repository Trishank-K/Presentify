"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch checked={theme === "light"} aria-label="Toggle dark mode" className="h-10 w-20 pl-1 data-[state=checked]:bg-gray-300"
      onCheckedChange={()=> setTheme(theme==='dark'?'light':'dark')}/>
    </div>
  );

};

export default ThemeSwitcher;