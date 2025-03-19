import { Menu, Dot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

interface MobileMenuProps {
  categories: string[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ categories }) => {
  const { isTransitioning, setIsTransitioning } = useLoading(); // LoadingContext에서 상태 업데이트 함수 가져오기
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    setIsTransitioning(false); // ✅ 경로가 변경되면 로딩 상태 해제
  }, [pathname, setIsTransitioning]);

  // 현재 카테고리 판별
  const getActiveCategory = () => {
    if (pathname === "/") return "Home";
    const pathParts = pathname.split("/");
    return categories.includes(pathParts[1]) ? pathParts[1] : "Home";
  };

  const activeCategory = getActiveCategory();

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
            <Link
              key={category}
              href={categoryPath}
              className={`block no-underline ${
                isActive ? "text-shade" : "text-muted"
              }`}
              onClick={() => {
                if (!isActive) {
                  setIsTransitioning(true); // 카테고리 변경 시 로딩 상태 설정
                }
              }}
            >
              <DropdownMenuItem
                className={`flex items-center justify-between 
                  ${isTransitioning ? "opacity-50 pointer-events-none" : ""}`}
                disabled={isTransitioning}
              >
                {category}
                {isActive && <Dot className="ml-2" />}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
