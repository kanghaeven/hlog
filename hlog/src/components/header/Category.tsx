"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

interface CategoryProps {
  categories: string[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const { isTransitioning, setIsTransitioning } = useLoading();
  const [, setSelectedCategory] = useState("Home");
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
    setIsTransitioning(false);
  }, [pathname, setIsTransitioning]);

  const renderCategoryButton = (category: string) => {
    const categoryPath = category === "Home" ? "/" : `/${category}`;
    const isActive = pathname === categoryPath;

    return (
      <Link key={category} href={categoryPath} passHref>
        <button
          onClick={() => {
            if (!isActive) {
              setIsTransitioning(true);
              setSelectedCategory(category);
            }
          }}
          className={`box relative px-6 sm:px-12 transition-all duration-300 border-[1.5px] text-sm sm:text-base ${
            isActive
              ? "text-shade border-b-0 py-[0.6rem] sm:py-[1.125rem]"
              : "text-muted py-[0.6rem] sm:py-3 mt-[0.65rem]"
          } ${isTransitioning ? "opacity-50 pointer-events-none" : ""}`}
          style={{
            clipPath: isActive
              ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }}
          disabled={isTransitioning}
        >
          <span className="relative z-10">{category}</span>
        </button>
      </Link>
    );
  };

  return (
    <nav
      className={`flex items-center p-2 sm:p-4 mt-[0.85rem] sm:mt-5 space-x-2`}
    >
      {/* 모바일 화면에서는 선택된 카테고리만 렌더 */}
      {["Home", ...categories].map((category) => {
        // 화면이 모바일이면 선택된 카테고리만 렌더
        return (
          <div key={category} className="w-full sm:hidden">
            {pathname === `/${category === "Home" ? "" : category}` &&
              renderCategoryButton(category)}
          </div>
        );
      })}
      {/* 데스크탑 화면에서는 모든 카테고리 렌더 */}
      <div className="hidden space-x-2 sm:flex">
        {["Home", ...categories].map(renderCategoryButton)}
      </div>
    </nav>
  );
};

export default Category;
