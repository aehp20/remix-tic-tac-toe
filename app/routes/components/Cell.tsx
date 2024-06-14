import clsx from "clsx";

import { PIECE } from "../constants";

type CellProps = {
  item: number;
  isThereAWinner: boolean;
  indexRow: number;
  indexCol: number;
  player: number;
  applyMovement: (row: number, col: number, player: number) => void;
};

type HandleClick = {
  item: number;
  isThereAWinner: boolean;
  indexRow: number;
  indexCol: number;
  player: number;
};

export const Cell = (props: Readonly<CellProps>) => {
  const { item, isThereAWinner, indexRow, indexCol, player, applyMovement } =
    props;

  const handleClick = (props: HandleClick) => {
    const { item, isThereAWinner, indexRow, indexCol, player } = props;
    return item >= 0 || isThereAWinner
      ? undefined
      : () => applyMovement(indexRow, indexCol, player);
  };

  return (
    <button
      key={`${indexRow}-${indexCol}`}
      className={clsx(
        "flex w-12 h-12 bg-yellow-400 border items-center justify-center",
        getCursorStyle(isThereAWinner, item, player)
      )}
      onClick={handleClick({
        item,
        isThereAWinner,
        indexRow,
        indexCol,
        player,
      })}
    >
      {PIECE[`${item}`]}
    </button>
  );
};

const getCursorStyle = (
  isThereAWinner: boolean,
  item: number,
  player: number
) => {
  return isThereAWinner
    ? "cursor-not-allowed"
    : item === -1
    ? player === 0
      ? "cursor-pointer"
      : "cursor-grab"
    : "cursor-not-allowed";
};
