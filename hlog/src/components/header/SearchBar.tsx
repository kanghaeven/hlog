"use client";

import { useEffect } from "react";
import { SearchBarProps } from "@/types/ui";
import { useSearch } from "@/contexts/SearchContext";
import { Search } from "lucide-react";

const SearchBar = ({ isExpanded, setIsExpanded }: SearchBarProps) => {
  const { searchQuery, setSearchQuery } = useSearch();

  // 검색바가 축소될 때 검색어 초기화
  useEffect(() => {
    if (!isExpanded) {
      setSearchQuery("");
    }
  }, [isExpanded, setSearchQuery]);

  // 검색 입력 처리
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 포커스 아웃 시 검색어가 없으면 검색바 축소
  const handleFocusOut = () => {
    if (!searchQuery.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex justify-center items-center rounded-full overflow-hidden cursor-pointer ${
          isExpanded
            ? "w-[14.5rem] md:w-64 h-8 md:h-11 px-2 md:px-3 py-1 bg-input trasition-color duration-300"
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
            onBlur={handleFocusOut}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
