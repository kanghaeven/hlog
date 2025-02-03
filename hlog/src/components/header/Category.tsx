"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Category = ({ categories }: { categories: string[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    router.push(category === "Home" ? "/" : `/${category}`);
  };

  return (
    <nav className="flex items-center p-4 mt-5 space-x-2">
      {["Home", ...categories].map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={`box relative px-12 transition-all duration-300 border-[1.5px] ${
            selectedCategory === category
              ? "text-foreground border-b-0 py-4"
              : "text-muted-foreground py-3 mt-[6.5px]"
          }`}
          style={{
            clipPath:
              selectedCategory === category
                ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
                : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </nav>
  );
};

export default Category;
