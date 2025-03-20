import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useLoadingPostList } from "@/contexts/LoadingPostListContext";
import { Menu, Dot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileCategoryMenuProps {
  categories: string[];
}

const MobileCategoryMenu = ({ categories }: MobileCategoryMenuProps) => {
  const pathname = usePathname();
  const { isLoadingPostList, setIsLoadingPostList } = useLoadingPostList();

  // 경로 변경 시 로딩 상태 해제
  useEffect(() => {
    setIsLoadingPostList(false);
  }, [pathname, setIsLoadingPostList]);

  // 현재 카테고리 판별 (useMemo로 최적화)
  const activeCategory = useMemo(() => {
    if (pathname === "/") return "Home";
    const pathParts = pathname.split("/");
    return categories.includes(pathParts[1]) ? pathParts[1] : "Home";
  }, [pathname, categories]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:outline-none hover:bg-washed">
          <Menu />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden">
        {["Home", ...categories].map((category) => {
          const categoryPath = category === "Home" ? "/" : `/${category}`;
          const isActive = activeCategory === category;

          return (
            <DropdownMenuItem
              key={category}
              asChild
              disabled={isLoadingPostList}
            >
              <Link
                href={categoryPath}
                className={`flex items-center justify-between no-underline ${
                  isActive ? "text-shade" : "text-muted"
                } ${isLoadingPostList ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => !isActive && setIsLoadingPostList(true)}
              >
                {category}
                {isActive && <Dot className="ml-2" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileCategoryMenu;
