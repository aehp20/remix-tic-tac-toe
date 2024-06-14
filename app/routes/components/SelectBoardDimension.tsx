type SelectBoardDimensionProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBoardDimension = (
  props: Readonly<SelectBoardDimensionProps>
) => {
  const { handleChange } = props;

  return (
    <select onChange={handleChange}>
      <option value={0}>Choose a dimension...</option>
      {Array.from({ length: 9 }).map((_, index) => {
        const size = index + 2;
        return (
          <option key={size} value={size}>
            {size}x{size}
          </option>
        );
      })}
    </select>
  );
};
