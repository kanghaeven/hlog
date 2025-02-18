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
      className={`box relative px-12 transition-all duration-300 border-[1.5px] ${
        selectedCategory === category || singleCategory
          ? "text-foreground border-b-0 py-4"
          : "text-muted-foreground py-3 mt-2 mb-[0.1rem]"
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
      className={`flex items-center p-4 mt-5 ${
        singleCategory ? "space-x-0" : "space-x-2"
      }`}
    >
      {singleCategory
        ? renderCategoryButton(singleCategory)
        : ["Home", ...categories].map(renderCategoryButton)}
    </nav>
  );
};

export default Category;
