import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ScratchState {
  outlines: OutlineCard[];
  resetOutlines: () => void;
  addOutline: (card: OutlineCard) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
}

const useScratchStore = create(
  devtools(
    persist<ScratchState>(
      (set) => ({
        outlines: [],
        resetOutlines: () => set({ outlines: [] }),
        addOutline: (card: OutlineCard) =>
          set((state) => ({
            outlines: [...state.outlines, card],
          })),
        addMultipleOutlines: (cards: OutlineCard[]) =>
          set((state) => ({
            outlines: [...state.outlines, ...cards],
          })),
      }),
      {
        name: "scratch-storage",
      }
    )
  )
);

export default useScratchStore;