"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center cursor-pointer">
      <div
        className={`flex justify-center items-center rounded-full overflow-hidden transition-all duration-200 cursor-pointer ${
          isExpanded
            ? "w-[13.3rem] sm:w-64 h-8 sm:h-11 px-2 sm:px-3 py-1 bg-input"
            : "w-10 h-10 sm:w-14 sm:h-14 hover:bg-washed"
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <Search className="w-4 h-4 sm:w-6 sm:h-6" />
        {isExpanded && (
          <input
            type="text"
            className="w-full ml-2 text-sm bg-transparent outline-none text-secondary caret-primary sm:text-base"
            placeholder="Type something cool... ✨"
            autoFocus
            onBlur={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
