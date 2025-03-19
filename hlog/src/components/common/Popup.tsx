// components/common/Popup.tsx
"use client";

import { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  duration?: number;
  position?: "top" | "bottom";
}

export const Popup = ({
  message,
  duration = 2000,
  position = "bottom",
}: PopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? (
    <div
      className={`whitespace-nowrap fixed px-4 py-2 text-sm text-white bg-black/90 rounded-full shadow-lg transform -translate-x-1/2 left-1/2 ${
        position === "bottom" ? "bottom-20" : "top-20"
      }`}
    >
      {message}
    </div>
  ) : null;
};
