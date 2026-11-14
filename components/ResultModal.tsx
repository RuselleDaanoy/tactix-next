"use client";

import { ArrowRight, Crown } from "lucide-react";
import { Mark } from "@/components/Square";
import type { Scores } from "@/components/ScoreBoard";
import type { Player } from "@/utils/gameLogic";

type ResultModalProps = {
  winner: Player | null;
  scores: Scores;
  round: number;
  autoAdvanceMs: number;
  onNextRound: () => void;
};

export default function ResultModal({
  winner,
  scores,
  round,
  autoAdvanceMs,
  onNextRound,
}: ResultModalProps) {
  const isWin = winner !== null;

  return (
    <div
      className="modal-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-5 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-title"
    >
      <div className="modal-card-in w-full max-w-[300px] border-2 border-ink bg-paper shadow-[8px_8px_0_0_#101214]">
        <div className="flex items-center justify-between border-b-2 border-ink px-3 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-ink/60">
            Round {String(round).padStart(2, "0")} · Complete
          </p>
          {isWin && (
            <Crown className="h-3.5 w-3.5 text-accent" aria-hidden />
          )}
        </div>

        <div className="flex flex-col items-center px-5 pb-5 pt-6 text-center">
          <div
            className={[
              "relative flex h-20 w-20 items-center justify-center border-2",
              isWin
                ? "border-accent bg-accent text-white shadow-[4px_4px_0_0_#101214]"
                : "border-ink bg-ink text-paper shadow-[4px_4px_0_0_#0f9d6e]",
            ].join(" ")}
          >
            {isWin ? (
              <Mark player={winner} className="h-11 w-11" />
            ) : (
              <span className="flex items-center gap-0.5">
                <Mark player="X" className="h-7 w-7 opacity-70" />
                <Mark player="O" className="h-7 w-7 opacity-70" />
              </span>
            )}
            <span
              aria-hidden
              className={[
                "absolute -right-1.5 -top-1.5 h-3 w-3 border-2",
                isWin
                  ? "border-paper bg-paper"
                  : "border-paper bg-accent",
              ].join(" ")}
            />
          </div>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/50">
            {isWin ? "Winner" : "Dead heat"}
          </p>
          <h2
            id="result-title"
            className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]"
          >
            {isWin ? `${winner} takes it` : "Draw"}
          </h2>

          <div className="mt-4 flex w-full items-center justify-center gap-2 border-y border-ink/15 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">
            <span className={winner === "X" ? "font-bold text-ink" : ""}>
              X {scores.X}
            </span>
            <span aria-hidden>·</span>
            <span>{scores.draws} draws</span>
            <span aria-hidden>·</span>
            <span className={winner === "O" ? "font-bold text-ink" : ""}>
              {scores.O} O
            </span>
          </div>

          <button
            type="button"
            onClick={onNextRound}
            autoFocus
            className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px"
          >
            Next round
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>

          <div className="mt-3 h-0.5 w-full overflow-hidden bg-ink/10">
            <span
              className="modal-timer block h-full origin-left bg-accent"
              style={{ animationDuration: `${autoAdvanceMs}ms` }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
            Auto-starting
          </p>
        </div>
      </div>
    </div>
  );
}
