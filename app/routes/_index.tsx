import { type MetaFunction } from "@remix-run/node";

import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { Board } from "./components/Board";
import { BoardSummary } from "./components/BoardSummary";
import { ResetButton } from "./components/ResetButton";
import { SelectBoardDimension } from "./components/SelectBoardDimension";
import { Title } from "./components/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const stringToNumber = (value: string): number => Number.parseInt(value, 10);

export default function Index() {
  const [size, setSize] = useState<number>(0);
  const [board, setBoard] = useState<number[][]>();
  const [player, setPlayer] = useState<number>(0);
  const [nbMovement, setNbMovement] = useState<number>(0);
  const [isThereAWinner, setIsThereAWinner] = useState<boolean>(false);

  const canDisplayBoard = board && board.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(getSizeFromEvent(event));
  };

  const getSizeFromEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    return stringToNumber(element.value);
  };

  const applyMovement = (row: number, col: number, player: number) => {
    saveMovement(row, col, player);
    changePlayer(player);
    countMovements();
    findWinner(row, col);
  };

  const saveMovement = (row: number, col: number, player: number) => {
    invariant(board, "Board is not initialized");
    const currentBoard = [...board];
    currentBoard[row][col] = player;
    setBoard(currentBoard);
  };

  const changePlayer = (player: number) => {
    setPlayer(player === 0 ? 1 : 0);
  };

  const countMovements = () => {
    setNbMovement((prev) => prev + 1);
  };

  const findWinner = (row: number, col: number) => {
    if (checkWinner(row, col)) {
      setIsThereAWinner(true);
    }
  };

  const canCheckDiagonal = (row: number, col: number) =>
    row === col ||
    (row === size - 1 && col === 0) ||
    (row === 0 && col === size - 1);

  const checkWinner = (row: number, col: number) => {
    const allRowIsChecked = checkRow(row, col);
    const allColIsChecked = checkCol(row, col);
    const allDiagonalIsChecked = canCheckDiagonal(row, col)
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
        break;
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
        break;
      }
    }
    return allIsChecked;
  };

  const checkDiagonal = (row: number) => {
    const allLeftDiagonalIsChecked = checkLeftDiagonal(row);
    const allRightDiagonalIsChecked = checkRightDiagonal(row);
    return allLeftDiagonalIsChecked || allRightDiagonalIsChecked;
  };

  const checkLeftDiagonal = (row: number) => {
    invariant(board, "Board is not initialized");
    let allLeftDiagonalIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (row !== i && board[i][i] !== player) {
        allLeftDiagonalIsChecked = false;
        break;
      }
    }
    return allLeftDiagonalIsChecked;
  };

  const checkRightDiagonal = (row: number) => {
    invariant(board, "Board is not initialized");
    let allRightDiagonalIsChecked = true;
    for (let i = 0; i < size; i++) {
      if (row !== i && board[i][size - 1 - i] !== player) {
        allRightDiagonalIsChecked = false;
        break;
      }
    }
    return allRightDiagonalIsChecked;
  };

  const resetGame = () => {
    resetBoard();
    resetCurrentPlayer();
    resetNbMovements();
    resetIsThereAWinner();
  };

  const resetBoard = () => {
    const items = Array.from({ length: size });
    setBoard(items.map(() => [...items].map(() => -1)));
  };

  const resetCurrentPlayer = () => {
    setPlayer(0);
  };

  const resetNbMovements = () => {
    setNbMovement(0);
  };

  const resetIsThereAWinner = () => {
    setIsThereAWinner(false);
  };

  useEffect(() => {
    resetGame();
  }, [size]);

  return (
    <main className="font-sans p-4">
      <Title>Welcome to Tic Tac Toe game</Title>
      <span>Table dimension:</span>
      <SelectBoardDimension handleChange={handleChange} />
      {canDisplayBoard && (
        <section className="flex flex-col gap-1">
          <BoardSummary
            nbMovement={nbMovement}
            size={size}
            isThereAWinner={isThereAWinner}
            player={player}
          />
          <span>Number of movements: {nbMovement}</span>
          <Board
            board={board}
            isThereAWinner={isThereAWinner}
            player={player}
            applyMovement={applyMovement}
          />
          <ResetButton nbMovement={nbMovement} resetGame={resetGame} />
        </section>
      )}
    </main>
  );
}
