import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardsContainer = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 md:grid-cols-4">{children}</div>
  );
};
