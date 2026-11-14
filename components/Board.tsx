"use client";

import Square from "@/components/Square";
import type { Board as BoardState, Player, WinningLine } from "@/utils/gameLogic";

type BoardProps = {
  board: BoardState;
  onPlay: (index: number) => void;
  winningLine: WinningLine | null;
  lastMove: number | null;
  currentPlayer: Player;
  locked: boolean;
};

export default function Board({
  board,
  onPlay,
  winningLine,
  lastMove,
  currentPlayer,
  locked,
}: BoardProps) {
  return (
    <div
      role="group"
      aria-label="Tic-tac-toe board"
      className="mx-auto grid aspect-square w-full grid-cols-3 gap-[2px] border-2 border-ink bg-ink shadow-[6px_6px_0_0_#101214]"
    >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          index={index}
          onPlay={onPlay}
          isWinning={winningLine?.includes(index) ?? false}
          isLast={lastMove === index}
          preview={currentPlayer}
          locked={locked}
        />
      ))}
    </div>
  );
}
