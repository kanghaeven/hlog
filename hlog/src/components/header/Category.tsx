"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryProps {
  categories: string[];
  // onCategoryChange: (category: string) => void;
  singleCategory?: string;
}

const Category: React.FC<CategoryProps> = ({
  categories,
  // onCategoryChange,
  singleCategory,
}) => {
  const [, setSelectedCategory] = useState(singleCategory || "Home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    setIsTransitioning(false); // ✅ 경로가 변경되면 로딩 상태 해제
  }, [pathname]);

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
              ? "text-shade border-b-0 py-[0.7rem] sm:py-[1.125rem]"
              : "text-muted py-3 mt-[0.65rem]"
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
      {singleCategory
        ? renderCategoryButton(singleCategory)
        : ["Home", ...categories].map(renderCategoryButton)}

      {isTransitioning && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
          <div className="text-white">로딩 중...</div>
        </div>
      )}
    </nav>
  );
};

export default Category;
