"use client";

import { useState } from "react";
import { Folder, FolderOpen, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Category = ({ categories }: { categories: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const router = useRouter();

  const toggleCategory = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    router.push(category === "Home" ? "/" : `/${category}`);
    setTimeout(() => setIsOpen(false), 100); // ⬅️ setTimeout으로 닫힘 처리 (비동기 반영 문제 해결)
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={toggleCategory}
          className="flex items-center justify-center p-2 transition-all duration-300 border-none rounded-full ring-none w-14 h-14 hover:bg-accent"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <Folder
              className={`transition-all duration-300 ease-in-out absolute ${
                isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />
            <FolderOpen
              className={`transition-all duration-300 ease-in-out absolute ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleCategorySelect("Home")}>
          <Link href="/" className="w-full no-underline">
            <div className="flex items-center justify-between w-full cursor-pointer">
              Home
              <span className="flex items-center justify-center w-6 h-6">
                {selectedCategory === "Home" && <Dot />}
              </span>
            </div>
          </Link>
        </DropdownMenuItem>

        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            className="border-t border-muted-foreground"
          >
            <Link href={`/${category}`} className="w-full no-underline">
              <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                {category}
                <span className="flex items-center justify-center w-6 h-6">
                  {selectedCategory === category && <Dot />}
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Category;
