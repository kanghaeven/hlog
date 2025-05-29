"use client";

import { memo } from "react";
import { ButtonProps } from "@/types/ui";
import { actionButtonIcon } from "@/constants/icon";

const ActionButton = memo(({ onClick, variant, label }: ButtonProps) => {
  const Icon = actionButtonIcon[variant];

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
});

ActionButton.displayName = "ActionButton";

export default ActionButton;
