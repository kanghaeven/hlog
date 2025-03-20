"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoadingPostList } from "@/context/LoadingPostListContext";

interface CategoryProps {
  categories: string[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const { isLoadingPostList, setIsLoadingPostList } = useLoadingPostList();
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const pathname = usePathname();

  // 경로에 맞게 selectedCategory 설정
  useEffect(() => {
    if (pathname === "/") {
      setSelectedCategory("Home");
    } else {
      const category = pathname.split("/")[1];
      setSelectedCategory(category || "Home");
    }
  }, [pathname]);

  useEffect(() => {
    setIsLoadingPostList(false);
  }, [pathname, setIsLoadingPostList]);

  const renderCategoryButton = (category: string) => {
    const categoryPath = category === "Home" ? "/" : `/${category}`;
    const isActive = selectedCategory === category;

    return (
      <Link key={category} href={categoryPath} passHref>
        <button
          onClick={() => {
            if (!isActive) {
              setIsLoadingPostList(true);
              setSelectedCategory(category);
            }
          }}
          className={`box relative px-6 md:px-12 transition-all duration-300 border-[1.5px] text-sm md:text-base ${
            isActive
              ? "text-shade border-b-0 py-[0.6rem] md:py-[1.125rem]"
              : "text-muted py-[0.6rem] md:py-3 mt-[0.65rem]"
          } ${isLoadingPostList ? "opacity-50 pointer-events-none" : ""}`}
          style={{
            clipPath: isActive
              ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }}
          disabled={isLoadingPostList}
        >
          <span className="relative z-10">{category}</span>
        </button>
      </Link>
    );
  };

  return (
    <nav
      className={`flex items-center p-2 sm:p-4 mt-[0.85rem] md:mt-5 space-x-2`}
    >
      {/* 모바일 화면에서는 선택된 카테고리만 렌더 */}
      {["Home", ...categories].map((category) => {
        // 화면이 모바일이면 선택된 카테고리만 렌더
        return (
          <div key={category} className="w-full md:hidden">
            {selectedCategory === category && renderCategoryButton(category)}
          </div>
        );
      })}
      {/* 데스크탑 화면에서는 모든 카테고리 렌더 */}
      <div className="hidden space-x-2 md:flex">
        {["Home", ...categories].map(renderCategoryButton)}
      </div>
    </nav>
  );
};

export default Category;
