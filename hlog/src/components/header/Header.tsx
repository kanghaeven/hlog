import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import ViewType from "@/components/header/ViewType";
import Search from "@/components/header/Search";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b-[0.1rem]">
      <Hlogo />
      <div className="flex">
        <Category />
        <ViewType />
        <Search />
      </div>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
