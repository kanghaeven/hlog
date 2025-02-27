import { Menu, Dot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileMenuProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  categories,
  onCategoryChange,
  currentCategory,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:outline-none hover:bg-washed">
          <Menu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:hidden">
        {["Home", ...categories].map((category) => (
          <DropdownMenuItem
            key={category}
            onSelect={() => onCategoryChange(category)}
            className="flex items-center justify-between"
          >
            {category}
            {currentCategory === category && <Dot className="ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
