import clsx from "clsx";

type ResetButtonProps = {
  nbMovement: number;
  resetGame: () => void;
};

export const ResetButton = (props: Readonly<ResetButtonProps>) => {
  const { nbMovement, resetGame } = props;

  const isDisabled = nbMovement === 0;
  const bgColor = isDisabled ? "bg-gray-200" : "bg-gray-300";
  const textColor = isDisabled ? "text-gray-400" : "text-black";

  return (
    <button
      disabled={isDisabled}
      className={clsx("p-2 rounded w-fit", bgColor, textColor)}
      onClick={resetGame}
    >
      Reset game
    </button>
  );
};
