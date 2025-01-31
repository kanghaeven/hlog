"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center cursor-pointer">
      <div
        className={`flex justify-center items-center rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
          isExpanded
            ? "w-64 h-11 px-3 py-1 bg-muted-foreground"
            : "w-14 h-14 hover:bg-accent"
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <Search className="text-gray-600" />
        {isExpanded && (
          <input
            type="text"
            className="w-full ml-2 bg-transparent outline-none text-secondary caret-primary"
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
