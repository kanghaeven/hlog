"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MobileMenu from "@/components/header/MobileMenu";
import { useLoading } from "@/context/LoadingContext";

const Header = ({ categories }: { categories: string[] }) => {
  const { isTransitioning, setIsTransitioning } = useLoading();

  const [isVisible, setIsVisible] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("Home");
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setIsTransitioning(true); // ✅ 로딩 시작
    Promise.resolve(
      router.push(category === "Home" ? "/" : `/${category}`)
    ).finally(() => setIsTransitioning(false)); // ✅ 로딩 끝
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300 ${
        isVisible ? "transform-none" : "-translate-y-[95%]"
      }`}
    >
      {isTransitioning && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
          <div className="text-white">로딩 중...</div>
        </div>
      )}
      <div className="h-14 sm:h-20 flex items-center justify-between border-b-[0.1rem] px-2 sm:px-4">
        <div className="flex items-center">
          <Hlogo />
          <div className="hidden sm:block">
            <Category categories={categories} />
          </div>
          <div className="sm:hidden">
            <Category
              categories={categories}
              singleCategory={currentCategory}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar />
          <div>
            <ThemeSwitch />
          </div>
          <div className="sm:hidden">
            <MobileMenu
              categories={categories}
              onCategoryChange={handleCategoryChange}
              currentCategory={currentCategory}
            />
          </div>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
