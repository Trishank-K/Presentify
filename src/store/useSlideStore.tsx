import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setProject: (id: Project) => void;
  setSlides: (slides: Slide[]) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#000000",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  navbarColor: "#ffffff",
  sidebarColor: "#f0f0f0",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      setProject: (project: Project) => set({ project }),
      setSlides: (slides: Slide[]) => set({ slides }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
    }),
    {
      name: "slides-storage",
    }
  )
);
