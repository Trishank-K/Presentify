"use client";
import { OutlineCard } from "@/lib/types";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  addOutline,
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) return;
    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex((card) => {
      card.id === draggedItem.id;
    });
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );
    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
    );
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;

    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else setDragOverIndex(index + 1);
  };
  return (
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <AnimatePresence>
        {outlines &&
          outlines.map((card, idx) => {
            return (
              <React.Fragment key={card.id}>
                <Card
                  onDragOver={(e) => onDragOver(e, index)}
                  card={card}
                  isEditing={editingCard === card.id}
                  isSelected={selectedCard === card.id}
                  editText={editText}
                  onEditChange={onEditChange}
                  onEditBlur={() => onCardUpdate(card.id, editText)}
                  onEditKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onCardUpdate(card.id, editText);
                    }
                  }}
                  onCardClick={() => onCardSelect(card.id)}
                  onCardDoubleClick={() =>
                    onCardDoubleClick(card.id, card.title)
                  }
                  onDeleteClick={() => onCardDelete(card.id)}
                  dragHandlers={{
                    onDragStart: (e) => {
                      onDragStart(e, card);
                    },
                    onDragEnd: onDragEnd,
                  }}
                />
              </React.Fragment>
            );
          })}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
