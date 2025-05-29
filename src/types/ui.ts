import { LucideIcon } from "lucide-react";

export type ButtonProps = {
  onClick: () => void;
  variant: "top" | "comments" | "copy";
  label: string;
};

export type PopupProps = {
  message: string;
  duration?: number;
  position?: "top" | "bottom";
};

export type SearchBarProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export type ThemeItemProps = {
  theme: string;
  label: string;
  Icon: LucideIcon;
};
