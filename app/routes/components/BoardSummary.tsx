type BoardSummaryProps = {
  nbMovement: number;
  size: number;
  isThereAWinner: boolean;
  player: number;
};

export const BoardSummary = (props: Readonly<BoardSummaryProps>) => {
  const { nbMovement, size, isThereAWinner, player } = props;

  const displayTheWinner = (player: number) => (
    <div>The winner is &quot;{player === 0 ? "X" : "0"}&quot;</div>
  );
  const displayEndOfTheGame = () => <div>End of game</div>;
  const displayCurrentPlayer = (player: number) => (
    <div>Current player: {player === 0 ? "0" : "X"}</div>
  );
  const displayTheWinnerOrEndOfTheGame = () =>
    isThereAWinner ? displayTheWinner(player) : displayEndOfTheGame();

  const canContinueTheGame = nbMovement < size * size && !isThereAWinner;

  return canContinueTheGame
    ? displayCurrentPlayer(player)
    : displayTheWinnerOrEndOfTheGame();
};
