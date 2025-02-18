"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MobileMenu from "@/components/header/MobileMenu";

const Header = ({ categories }: { categories: string[] }) => {
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
    router.push(category === "Home" ? "/" : `/${category}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300 ${
        isVisible ? "transform-none" : "-translate-y-[95%]"
      }`}
    >
      <div className="h-12 sm:h-20 flex items-center justify-between border-b-[0.1rem] px-4">
        <div className="flex items-center">
          <Hlogo />
          <div className="hidden md:block sm:block xs:block">
            <Category
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="md:hidden sm:hidden xs:hidden">
            <Category
              categories={categories}
              onCategoryChange={handleCategoryChange}
              singleCategory={currentCategory}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar />
          <ThemeSwitch />
          <div className="md:hidden sm:hidden xs:hidden">
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
