"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface CategoryProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  singleCategory?: string;
}

const Category: React.FC<CategoryProps> = ({
  categories,
  onCategoryChange,
  singleCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    singleCategory || "Home"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // usePathname을 사용하여 현재 경로를 추적

  useEffect(() => {
    setIsTransitioning(false); // 경로가 변경되면 로딩 상태 종료
    console.log(pathname);
  }, [pathname]);

  const handleCategorySelect = async (category: string) => {
    if (isTransitioning) return; // 전환 중일 때는 클릭 불가

    setIsTransitioning(true); // 로딩 상태 시작

    if (selectedCategory === category) {
      // 동일한 카테고리 클릭 시 새로고침
      await router.push(pathname); // 동일한 경로로 강제 이동
    } else {
      // 다른 카테고리 클릭 시 로딩 상태로 전환
      setSelectedCategory(category);
      onCategoryChange(category);
      await router.push(category === "Home" ? "/" : `/${category}`);
    }

    // router.push 후 로딩 상태 종료
    setIsTransitioning(false);
  };

  const renderCategoryButton = (category: string) => (
    <button
      key={category}
      onClick={() => handleCategorySelect(category)}
      disabled={isTransitioning} // 전환 중에는 버튼 비활성화
      className={`box relative px-6 sm:px-12 transition-all duration-300 border-[1.5px] text-sm sm:text-base ${
        selectedCategory === category || singleCategory
          ? "text-shade border-b-0 py-[0.7rem] sm:py-[1.125rem]"
          : "text-muted py-3 mt-[0.65rem]"
      } ${isTransitioning ? "fade-transition" : ""}`}
      style={{
        clipPath:
          selectedCategory === category || singleCategory
            ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
            : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <span className="relative z-10">{category}</span>
    </button>
  );

  return (
    <nav
      className={`flex items-center p-2 sm:p-4 mt-[0.85rem] sm:mt-5 ${
        singleCategory ? "space-x-0" : "space-x-1 sm:space-x-2"
      }`}
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
