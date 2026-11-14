"use client";

import { Mark } from "@/components/Square";
import type { Player } from "@/utils/gameLogic";

export type Scores = {
  X: number;
  O: number;
  draws: number;
};

type ScoreBoardProps = {
  scores: Scores;
  currentPlayer: Player;
  winner: Player | null;
  draw: boolean;
};

export default function ScoreBoard({
  scores,
  currentPlayer,
  winner,
  draw,
}: ScoreBoardProps) {
  const activeSide = winner ?? (draw ? "draw" : currentPlayer);

  return (
    <div className="grid grid-cols-3 border-x-2 border-t-2 border-ink">
      <div
        className={[
          "border-r-2 border-ink px-3 py-2.5 transition-colors duration-200",
          activeSide === "X" ? "bg-ink text-paper" : "bg-paper text-ink",
        ].join(" ")}
      >
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
          <Mark player="X" className="h-3 w-3" />
          <span>X wins</span>
        </div>
        <p className="mt-0.5 font-mono text-3xl font-bold tabular-nums leading-none">
          {scores.X}
        </p>
      </div>

      <div
        className={[
          "border-r-2 border-ink px-3 py-2.5 transition-colors duration-200",
          activeSide === "draw" ? "bg-ink text-paper" : "bg-paper text-ink",
        ].join(" ")}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]">
          Draws
        </div>
        <p className="mt-0.5 font-mono text-3xl font-bold tabular-nums leading-none">
          {scores.draws}
        </p>
      </div>

      <div
        className={[
          "px-3 py-2.5 transition-colors duration-200",
          activeSide === "O" ? "bg-ink text-paper" : "bg-paper text-ink",
        ].join(" ")}
      >
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
          <Mark player="O" className="h-3 w-3" />
          <span>O wins</span>
        </div>
        <p className="mt-0.5 font-mono text-3xl font-bold tabular-nums leading-none">
          {scores.O}
        </p>
      </div>
    </div>
  );
}
