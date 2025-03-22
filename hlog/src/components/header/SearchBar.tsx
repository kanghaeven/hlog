"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SearchBarProps } from "@/types/ui";
import { useSearch } from "@/contexts/SearchContext";
import { Search } from "lucide-react";

const SearchBar = ({ isExpanded, setIsExpanded }: SearchBarProps) => {
  const { setSearchQuery } = useSearch();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [showDimmed, setShowDimmed] = useState<boolean>(false);

  // 검색바가 축소될 때 검색어 초기화
  useEffect(() => {
    if (!isExpanded) {
      setInputValue("");
      setSearchQuery("");
      setShowDimmed(false);
    }
  }, [isExpanded, setSearchQuery]);

  // 입력 값이 변경될 때마다 dimmed 효과 표시
  useEffect(() => {
    if (inputValue.trim() !== "") {
      setShowDimmed(true);
    } else {
      setShowDimmed(false);
    }
  }, [inputValue]);

  // Dimmed (검색바 외부 영역) 클릭 시 검색바 닫기
  const handleDimmedClick = useCallback(() => {
    setIsExpanded(false);
  }, [setIsExpanded]);

  // 외부 클릭 시 검색바 닫기
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    },
    [setIsExpanded]
  );

  // 외부 클릭 이벤트 리스너 등록 및 해제
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, handleClickOutside]);

  // 엔터 키 입력 처리 (검색 실행 + Dimmed 제거)
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      !event.nativeEvent.isComposing // 한글 입력 시 중복 입력 방지
    ) {
      event.preventDefault();
      setSearchQuery(inputValue.trim());
      setShowDimmed(false);
    }
  };

  // 입력 값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative">
      {showDimmed && (
        <div
          className="fixed inset-0 z-40 bg-background/50"
          onClick={handleDimmedClick}
        />
      )}

      <div className="relative z-50 flex items-center" ref={searchBarRef}>
        <div
          className={`flex justify-center items-center transition-[width,height,background-color] duration-300 rounded-full overflow-hidden cursor-pointer ${
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
              value={inputValue}
              onChange={handleInputChange}
              className="w-full ml-2 text-base bg-transparent outline-none text-secondary caret-primary"
              placeholder="검색어 입력"
              autoFocus
              onKeyUp={handleKeyUp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
