import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title = (props: Readonly<TitleProps>) => {
  const { children } = props;
  return <h1 className="text-3xl">{children}</h1>;
};
