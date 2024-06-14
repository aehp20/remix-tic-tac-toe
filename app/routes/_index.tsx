import { type MetaFunction } from "@remix-run/node";

import clsx from "clsx";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [size, setSize] = useState(0);
  const [board, setBoard] = useState<number[][]>();
  const [player, setPlayer] = useState<number>(0);
  const [nbMovement, setNbMovement] = useState<number>(0);
  const [isThereAWinner, setIsThereAWinner] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    const newSize = Number.parseInt(element.value, 10);
    setSize(newSize);
  };

  const PIECE: { [key: string]: string } = {
    "-1": "",
    "0": "0",
    "1": "X",
  };

  const handleClick = (row: number, col: number, player: number) => {
    invariant(board, "Board is not initialized");
    board[row][col] = player;
    setBoard(board);
    setPlayer(player === 0 ? 1 : 0);
    setNbMovement((prev) => prev + 1);
    if (checkWinner(row, col)) {
      setIsThereAWinner(true);
    }
  };

  const checkWinner = (row: number, col: number) => {
    const allRowIsChecked = checkRow(row, col);
    const allColIsChecked = checkCol(row, col);
    const allDiagonalIsChecked =
      row === col ||
      (row === size - 1 && col === 0) ||
      (row === 0 && col === size - 1)
        ? checkDiagonal(row)
        : false;

    return allRowIsChecked || allColIsChecked || allDiagonalIsChecked;
  };

  const checkRow = (row: number, col: number) => {
    invariant(board, "Board is not initialized");
    let allIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (i !== col && board[row][i] !== player) {
        allIsChecked = false;
      }
    }
    return allIsChecked;
  };

  const checkCol = (row: number, col: number) => {
    invariant(board, "Board is not initialized");
    let allIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (i !== row && board[i][col] !== player) {
        allIsChecked = false;
      }
    }
    return allIsChecked;
  };

  const checkDiagonal = (row: number) => {
    invariant(board, "Board is not initialized");
    let allLeftDiagonalIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (row !== i && board[i][i] !== player) {
        allLeftDiagonalIsChecked = false;
      }
    }
    let allRightDiagonalIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (row !== i && board[i][size - 1 - i] !== player) {
        allRightDiagonalIsChecked = false;
      }
    }
    return allLeftDiagonalIsChecked || allRightDiagonalIsChecked;
  };

  const resetGame = (size: number) => {
    const items = Array.from({ length: size });
    setBoard(items.map(() => Array.from({ length: size }).map(() => -1)));
    setPlayer(0);
    setNbMovement(0);
    setIsThereAWinner(false);
  };

  useEffect(() => {
    resetGame(size);
  }, [size]);

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Tic Tac Toe game</h1>
      <div>Table dimension:</div>
      <select name="nbColumns" onChange={handleChange}>
        <option value={0}>Choose a table...</option>
        <option value={2}>2x2</option>
        <option value={3}>3x3</option>
        <option value={4}>4x4</option>
        <option value={5}>5x5</option>
      </select>
      {board && board.length > 0 && (
        <div className="flex flex-col gap-1">
          <div>
            {nbMovement < size * size && !isThereAWinner ? (
              <div>Current player: {player === 0 ? "0" : "X"}</div>
            ) : (
              <div>
                {isThereAWinner ? (
                  <div>The winner is "{player === 0 ? "X" : "0"}"</div>
                ) : (
                  <div>End of game</div>
                )}
              </div>
            )}
          </div>
          <div>Number of movements {nbMovement}</div>
          <div className="flex">
            {board.map((rows, indexRow) => (
              <div key={indexRow} className="flex flex-col">
                {rows.map((item, indexItem) => (
                  <button
                    key={`${indexItem}-${indexRow}`}
                    className={clsx(
                      "flex w-12 h-12 bg-yellow-400 border items-center justify-center",
                      isThereAWinner
                        ? "cursor-not-allowed"
                        : item === -1
                        ? player === 0
                          ? "cursor-pointer"
                          : "cursor-grab"
                        : "cursor-not-allowed"
                    )}
                    onClick={
                      item >= 0 || isThereAWinner
                        ? undefined
                        : () => handleClick(indexRow, indexItem, player)
                    }
                  >
                    {PIECE[`${item}`]}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <button
            className={clsx("bg-gray-300 p-2 rounded w-fit")}
            onClick={() => resetGame(size)}
          >
            Reset game
          </button>
        </div>
      )}
    </div>
  );
}
