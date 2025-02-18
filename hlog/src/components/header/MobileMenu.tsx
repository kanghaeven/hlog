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
        <button className="p-4 rounded-full hover:bg-accent">
          <Menu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
