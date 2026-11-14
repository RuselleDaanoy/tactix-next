export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];
export type WinningLine = readonly [number, number, number];

export const WINNING_LINES: readonly WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type WinResult = { player: Player; line: WinningLine } | null;

export function createBoard(): Board {
  return Array<Cell>(9).fill(null);
}

/** Returns the winning player and their line, or null if nobody has won yet. */
export function getWinner(board: Board): WinResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const cell = board[a];
    if (cell && cell === board[b] && cell === board[c]) {
      return { player: cell, line };
    }
  }
  return null;
}

export type MoveOutcome = {
  board: Board;
  moves: number[];
  winner: WinResult;
  draw: boolean;
};

/**
 * Applies a move and resolves the round.
 *
 * Normal mode: the board fills up and a full board with no winner is a draw.
 * Infinity mode: once a player has three marks on the board, their oldest mark
 * disappears when they place a fourth, so the round can never end in a draw.
 */
export function playMove(
  board: Board,
  moves: number[],
  index: number,
  player: Player,
  infinite: boolean,
): MoveOutcome | null {
  if (index < 0 || index > 8 || board[index]) {
    return null;
  }

  const nextBoard = board.slice();
  const nextMoves = [...moves, index];
  nextBoard[index] = player;

  if (infinite) {
    const ownMoves = nextMoves.filter((move) => nextBoard[move] === player);
    if (ownMoves.length > 3) {
      const oldest = ownMoves[0];
      nextBoard[oldest] = null;
      nextMoves.splice(nextMoves.indexOf(oldest), 1);
    }
  }

  const winner = getWinner(nextBoard);
  const draw = !winner && !infinite && nextBoard.every(Boolean);

  return { board: nextBoard, moves: nextMoves, winner, draw };
}
