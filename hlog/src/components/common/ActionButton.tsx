// components/common/ActionButton.tsx
"use client";

import React from "react";
import { ArrowUp, MessageSquareMore, Link2 } from "lucide-react";

interface ButtonProps {
  onClick: () => void;
  variant: "top" | "comments" | "copy";
  label: string;
}

const iconMap = {
  top: ArrowUp,
  comments: MessageSquareMore,
  copy: Link2,
};

const ActionButton = ({ onClick, variant, label }: ButtonProps) => {
  const Icon = iconMap[variant];

  return (
    <button
      onClick={onClick}
      className={
        "flex items-center backdrop-blur-lg border-soft border-[1px] transition-all text-dusty hover:text-faded p-2 rounded-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:outline-none hover:bg-washed"
      }
      aria-label={label}
    >
      <Icon />
    </button>
  );
};

export default React.memo(ActionButton);
