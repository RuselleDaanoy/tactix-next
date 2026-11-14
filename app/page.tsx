"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Board from "@/components/Board";
import Controls from "@/components/Controls";
import InfoPanel from "@/components/InfoPanel";
import ResultModal from "@/components/ResultModal";
import ScoreBoard, { type Scores } from "@/components/ScoreBoard";
import {
  createBoard,
  playMove,
  type Board as BoardState,
  type Player,
  type WinResult,
} from "@/utils/gameLogic";

const EMPTY_SCORES: Scores = { X: 0, O: 0, draws: 0 };
const AUTO_ADVANCE_MS = 3600;
const CONFETTI_COLORS = ["#0f9d6e", "#101214", "#f4f2ec", "#7ce3bd"];

export default function Home() {
  const [board, setBoard] = useState<BoardState>(createBoard);
  const [moves, setMoves] = useState<number[]>([]);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<WinResult>(null);
  const [draw, setDraw] = useState(false);
  const [scores, setScores] = useState<Scores>(EMPTY_SCORES);
  const [infinite, setInfinite] = useState(false);
  const [round, setRound] = useState(1);
  const [lastMove, setLastMove] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentPlayer: Player = xIsNext ? "X" : "O";
  const roundOver = winner !== null || draw;

  const handlePlay = useCallback(
    (index: number) => {
      if (winner || draw) return;

      const outcome = playMove(board, moves, index, currentPlayer, infinite);
      if (!outcome) return;

      setBoard(outcome.board);
      setMoves(outcome.moves);
      setLastMove(index);
      setXIsNext((next) => !next);
      setWinner(outcome.winner);
      setDraw(outcome.draw);

      if (outcome.winner) {
        const winningPlayer = outcome.winner.player;
        setScores((current) => ({
          ...current,
          X: winningPlayer === "X" ? current.X + 1 : current.X,
          O: winningPlayer === "O" ? current.O + 1 : current.O,
        }));
      } else if (outcome.draw) {
        setScores((current) => ({ ...current, draws: current.draws + 1 }));
      }
    },
    [board, currentPlayer, draw, infinite, moves, winner],
  );

  const startRound = useCallback((nextRound: boolean) => {
    setBoard(createBoard());
    setMoves([]);
    setXIsNext(true);
    setWinner(null);
    setDraw(false);
    setLastMove(null);
    setShowResult(false);
    if (nextRound) setRound((current) => current + 1);
  }, []);

  const handleNextRound = useCallback(() => startRound(true), [startRound]);

  // Hold on the winning line for a beat before the result card takes over.
  useEffect(() => {
    if (!roundOver) return;
    const timer = window.setTimeout(() => setShowResult(true), 600);
    return () => window.clearTimeout(timer);
  }, [roundOver]);

  // Clear the board and roll into the next round once the result has been shown.
  useEffect(() => {
    if (!roundOver) return;
    const timer = window.setTimeout(() => startRound(true), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [roundOver, startRound]);

  const handleResetSeries = useCallback(() => {
    setScores(EMPTY_SCORES);
    setRound(1);
    startRound(false);
  }, [startRound]);

  const handleToggleInfinite = useCallback(() => {
    setInfinite((current) => !current);
    startRound(true);
  }, [startRound]);

  useEffect(() => {
    if (!winner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    void import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled) return;
      confetti({
        particleCount: 120,
        spread: 80,
        startVelocity: 42,
        scalar: 0.9,
        origin: { y: 0.62 },
        colors: CONFETTI_COLORS,
      });
      window.setTimeout(() => {
        if (cancelled) return;
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.72 },
          colors: CONFETTI_COLORS,
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.72 },
          colors: CONFETTI_COLORS,
        });
      }, 180);
    });

    return () => {
      cancelled = true;
    };
  }, [winner]);

  const statusText = useMemo(() => {
    if (winner) return `${winner.player} takes the round`;
    if (draw) return "Round drawn — nobody blinked";
    return infinite
      ? `${currentPlayer} to move · infinity`
      : `${currentPlayer} to move`;
  }, [currentPlayer, draw, infinite, winner]);

  const seriesStarted =
    scores.X + scores.O + scores.draws > 0 || round > 1;

  return (
    <main className="flex flex-1 flex-col items-center px-5 py-8 sm:py-12">
      <div className="w-full max-w-[360px]">
        <header className="flex items-end justify-between border-b-2 border-ink pb-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/60">
              Tic · Tac · Toe Arena
            </p>
            <h1 className="mt-1 text-[2.6rem] font-black leading-none tracking-[-0.06em]">
              TACTIX<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
              Round
            </p>
            <p className="font-mono text-xl font-bold leading-none tabular-nums">
              {String(round).padStart(2, "0")}
            </p>
          </div>
        </header>

        <div className="mt-5 grid gap-8 lg:grid-cols-[360px_280px] lg:items-start lg:gap-10">
          <section aria-label="Game">
            <ScoreBoard
              scores={scores}
              currentPlayer={currentPlayer}
              winner={winner?.player ?? null}
              draw={draw}
            />

            <div
              aria-live="polite"
              className="flex items-center justify-between gap-3 border-x-2 border-b-2 border-ink px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={[
                    "h-2 w-2",
                    winner || draw ? "bg-ink" : "bg-accent",
                  ].join(" ")}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]">
                  {statusText}
                </p>
              </div>
              {infinite && (
                <span className="border border-accent px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-accent">
                  ∞ mode
                </span>
              )}
            </div>

            <div className="mt-5">
              <Board
                board={board}
                onPlay={handlePlay}
                winningLine={winner?.line ?? null}
                lastMove={lastMove}
                currentPlayer={currentPlayer}
                locked={roundOver}
              />
            </div>

            <div className="mt-5">
              <Controls
                onResetSeries={handleResetSeries}
                infinite={infinite}
                onToggleInfinite={handleToggleInfinite}
                seriesStarted={seriesStarted}
              />
            </div>
          </section>

          <InfoPanel />
        </div>

        <footer className="mt-8 flex items-center justify-between border-t-2 border-ink pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
          <span>Three in a row wins</span>
          <span>Two players · One board</span>
        </footer>
      </div>

      {roundOver && showResult && (
        <ResultModal
          key={round}
          winner={winner?.player ?? null}
          scores={scores}
          round={round}
          autoAdvanceMs={AUTO_ADVANCE_MS}
          onNextRound={handleNextRound}
        />
      )}
    </main>
  );
}
