"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/normalInput";
import { useCreativeAiStore } from "@/store/useCreativeAiStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { useToast } from "@/hooks/use-toast";
import { generateCreativePrompt } from "@/actions/ai";
import { OutlineCard } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const router = useRouter();
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    addOutline,
    addMultipleOutlines,
    resetOutlines,
  } = useCreativeAiStore();
  const { setProject } = useSlideStore();
  const [noOfCards, setNoOfCards] = useState(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { prompts, addPrompt } = usePromptStore();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least once card to generate slides",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards)
      );
      if (res.status !== 200 || !res.data) {
        throw new Error("Failed to generate slides");
      }
      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while generating slides",
      });
    }
    setIsGenerating(false);
  };
  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines]);

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      toast({
        title: "Error",
        description: "You need to enter a prompt before generating outlines",
      });
      return;
    }
    setIsGenerating(true);
    const res = await generateCreativePrompt(currentAiPrompt);
    if (res.status === 200 && res.data.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      toast({
        title: "Success",
        description: "Outlines generated successfully",
      });
    }
    setIsGenerating(false);
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
    resetOutlines();
  };
  return (
    <motion.div
      variants={containerVariants}
      className="space-y-6 w-full max-w-4xl mx-auto px-4 lg:px-8"
      initial="hidden "
      animate="visible"
    >
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with{" "}
          <span className="text-creative-ai-gradient">Creative AI</span>
        </h1>
        <p className="text-muted-foreground dark:text-secondary">
          What would you like to create today?
        </p>
      </motion.div>
      <motion.div
        className="focus-within:ring-2 border-2 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex w-full sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={currentAiPrompt || ""}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            placeholder="Enter Prompt and add to the Cards..."
          />
          <div className="flex items-center gap-2">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="flex w-fit justify-center gap-2 p-6 pl-8 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
                <SelectContent className="w-fit">
                  {outlines.length === 0 ? (
                    <SelectItem value="0" className="font-semibold">
                      No Cards
                    </SelectItem>
                  ) : (
                    Array.from(
                      { length: outlines.length },
                      (_, idx) => idx + 1
                    ).map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="font-semibold"
                      >
                        {num} {num === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </SelectTrigger>
            </Select>
            <Button
              variant={"destructive"}
              onClick={resetCards}
              size={"icon"}
              aria-label="Reset Cards"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className=" font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
          size={"lg"}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}
      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreativeAI;
