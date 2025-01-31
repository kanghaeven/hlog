"use client";

import { useState } from "react";
import { AlignJustify } from "lucide-react";
import { LayoutGrid } from "lucide-react";

const ViewType = () => {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  return (
    <button
      onClick={toggleView}
      className="flex items-center justify-center p-2 transition-all duration-300 rounded-full w-14 h-14 hover:bg-accent"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <LayoutGrid
          className={`transition-all duration-300 ease-in-out absolute transform ${
            isGridView ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
        <AlignJustify
          className={`transition-all duration-300 ease-in-out absolute transform ${
            !isGridView ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>
    </button>
  );
};

export default ViewType;
