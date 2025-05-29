"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLoadingPostList } from "@/contexts/LoadingPostListContext";
import CategoryMenuButton from "@/components/header/CategoryMenuButton";

const CategoryMenu = ({ categories }: { categories: string[] }) => {
  const pathname = usePathname();
  const { isLoadingPostList, setIsLoadingPostList } = useLoadingPostList();
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");

  useEffect(() => {
    // 루트 경로("/")이면 "Home"으로 설정하고, 그렇지 않으면 경로의 첫 번째 세그먼트를 카테고리로 설정
    const category =
      pathname === "/" ? "Home" : pathname.split("/")[1] || "Home";
    // 선택된 카테고리 상태 업데이트
    setSelectedCategory(category);
    // 페이지 이동 시 로딩 상태를 false로 설정하여 로딩이 완료되었음을 표시
    setIsLoadingPostList(false);
  }, [pathname, setIsLoadingPostList]);

  // 카테고리 버튼 클릭 시 호출되는 함수
  const handleCategoryClick = (category: string) => {
    // 현재 선택된 카테고리와 클릭한 카테고리가 다를 경우:
    if (selectedCategory !== category) {
      // 로딩 상태 true로 설정 (페이지 이동 시 로딩 표시를 위함)
      setIsLoadingPostList(true);
      // 선택된 카테고리 업데이트
      setSelectedCategory(category);
    }
  };

  return (
    <nav className="flex transition-all duration-300 items-center p-2 sm:p-4 mt-[0.85rem] md:mt-5 space-x-2">
      {/* 모바일 화면에서는 선택된 카테고리만 렌더 */}
      <div className="w-full md:hidden">
        {["Home", ...categories].map(
          (category) =>
            selectedCategory === category && (
              <CategoryMenuButton
                key={category}
                category={category}
                selected={selectedCategory === category}
                isLoading={isLoadingPostList}
                onClick={handleCategoryClick}
              />
            )
        )}
      </div>

      {/* 데스크탑 화면에서는 모든 카테고리 렌더 */}
      <div className="hidden space-x-2 md:flex">
        {["Home", ...categories].map((category) => (
          <CategoryMenuButton
            key={category}
            category={category}
            selected={selectedCategory === category}
            isLoading={isLoadingPostList}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </nav>
  );
};

export default CategoryMenu;
