"use client";

import { Circle, X } from "lucide-react";
import type { Cell, Player } from "@/utils/gameLogic";

type MarkProps = {
  player: Player;
  className?: string;
};

export function Mark({ player, className = "" }: MarkProps) {
  const Icon = player === "X" ? X : Circle;
  return <Icon aria-hidden className={className} strokeWidth={2.4} />;
}

type SquareProps = {
  value: Cell;
  index: number;
  onPlay: (index: number) => void;
  isWinning: boolean;
  isLast: boolean;
  preview: Player;
  locked: boolean;
};

export default function Square({
  value,
  index,
  onPlay,
  isWinning,
  isLast,
  preview,
  locked,
}: SquareProps) {
  const label = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      onClick={() => onPlay(index)}
      disabled={locked || value !== null}
      aria-label={label}
      className={[
        "group relative flex aspect-square w-full items-center justify-center bg-paper outline-none transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
        isWinning
          ? "bg-accent text-white"
          : value
            ? "cursor-default text-ink"
            : locked
              ? "cursor-not-allowed"
              : "cursor-pointer text-ink hover:bg-[#eae7de] active:bg-[#e2ded3]",
      ].join(" ")}
    >
      {value ? (
        <Mark
          player={value}
          className="mark-in h-[46%] w-[46%]"
        />
      ) : (
        !locked && (
          <Mark
            player={preview}
            className="h-[46%] w-[46%] opacity-0 transition-opacity duration-150 group-hover:opacity-20 group-focus-visible:opacity-20"
          />
        )
      )}

      {isLast && value && (
        <span
          aria-hidden
          className={[
            "absolute bottom-1.5 right-1.5 h-1 w-1",
            isWinning ? "bg-white" : "bg-accent",
          ].join(" ")}
        />
      )}
    </button>
  );
}
