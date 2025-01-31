import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import ViewType from "@/components/header/ViewType";
import SearchBar from "@/components/header/SearchBar";

const Header = ({ categories }: { categories: string[] }) => {
  return (
    <header className="h-20 fixed top-0 left-0 w-full z-50 flex items-center justify-between border-b-[0.1rem] bg-background shadow-sm">
      <Hlogo />
      <div className="flex items-center justify-center">
        <Category categories={categories} />
        <ViewType />
        <SearchBar />
      </div>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
