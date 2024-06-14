import { Cell } from "./Cell";

type BoardProps = {
  board: number[][];
  isThereAWinner: boolean;
  player: number;
  applyMovement: (row: number, col: number, player: number) => void;
};

export const Board = (props: Readonly<BoardProps>) => {
  const { board, isThereAWinner, player, applyMovement } = props;
  return (
    <div className="flex">
      {board.map((rows, indexRow) => (
        <div key={indexRow} className="flex flex-col">
          {rows.map((item, indexCol) => (
            <Cell
              key={`${indexRow}-${indexCol}`}
              item={item}
              isThereAWinner={isThereAWinner}
              indexRow={indexRow}
              indexCol={indexCol}
              player={player}
              applyMovement={applyMovement}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
