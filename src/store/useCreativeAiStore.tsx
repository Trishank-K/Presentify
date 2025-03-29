import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAiStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
  resetOutlines:()=>void;
};

export const useCreativeAiStore = create<CreativeAiStore>()(
  persist(
    (set) => ({
      outlines: [],
      addOutline(outline) {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      addMultipleOutlines(outlines) {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      currentAiPrompt: "",
      setCurrentAiPrompt(prompt) {
        set({
          currentAiPrompt: prompt,
        });
      },
      resetOutlines() {
          set({outlines:[]})
      },
    }),
    {
      name: "creative-ai",
    }
  )
);
