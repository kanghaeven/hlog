"use client";

import { useEffect, useState } from "react";
import { PopupProps } from "@/types/ui";

const Popup = ({
  message,
  duration = 2000,
  position = "bottom",
}: PopupProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? (
    <div
      className={`whitespace-nowrap fixed px-4 py-2 text-sm text-background bg-faded rounded-full shadow-lg transform -translate-x-1/2 left-1/2 ${
        position === "bottom" ? "bottom-20" : "top-20"
      }`}
    >
      {message}
    </div>
  ) : null;
};

export default Popup;
