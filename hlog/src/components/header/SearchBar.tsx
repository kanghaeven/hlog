"use client";

import { useSearch } from "@/context/SearchContext";
import { Search } from "lucide-react";
import { useEffect } from "react";

const SearchBar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) => {
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    if (!isExpanded) {
      setSearchQuery(""); // 검색바가 축소될 때 검색어 초기화
    }
  }, [isExpanded, setSearchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearch}
            className="w-full ml-2 text-base bg-transparent outline-none text-secondary caret-primary"
            placeholder="검색어 입력..."
            autoFocus
            onBlur={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
