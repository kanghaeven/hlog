"use client";

import { Search } from "lucide-react";

const SearchBar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) => {
  return (
    <div className="relative flex items-center cursor-pointer">
      <div
        className={`flex justify-center items-center rounded-full overflow-hidden transition-all duration-300 ease-in-out cursor-pointer ${
          isExpanded
            ? "w-[14.5rem] md:w-64 h-8 md:h-11 px-2 md:px-3 py-1 bg-input"
            : "w-10 h-10 md:w-14 md:h-14 hover:bg-washed"
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <Search className="w-4 h-4 md:w-6 md:h-6" />
        {isExpanded && (
          <input
            type="text"
            className="w-full ml-2 text-base bg-transparent outline-none text-secondary caret-primary"
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
