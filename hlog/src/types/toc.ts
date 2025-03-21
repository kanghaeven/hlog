import { ReactNode } from "react";

export type TocItem = {
  id: string;
  title: string | ReactNode;
  level: number;
};

export type TocItemProps = {
  item: TocItem;
  isActive: boolean;
  isNearActive: boolean;
};

export type HeaderProps = {
  id: string;
  children: ReactNode;
};
