"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // 트랜지션 지속 시간과 일치
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleCategorySelect = (category: string) => {
    setIsTransitioning(true);
    setSelectedCategory(category);
    onCategoryChange(category);
    router.push(category === "Home" ? "/" : `/${category}`);
  };

  const renderCategoryButton = (category: string) => (
    <button
      key={category}
      onClick={() => handleCategorySelect(category)}
      className={`box relative px-6 sm:px-12 transition-all duration-300 border-[1.5px] text-sm sm:text-base ${
        selectedCategory === category || singleCategory
          ? "text-foreground border-b-0 py-[0.7rem] sm:py-[1.125rem]"
          : "text-muted-foreground py-3 mt-[0.65rem]"
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
    </nav>
  );
};
export default Category;
