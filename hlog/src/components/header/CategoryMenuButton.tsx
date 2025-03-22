import Link from "next/link";
import { CategoryMenuButtonProps } from "@/types/category";

const CategoryMenuButton = ({
  category,
  selected,
  isLoading,
  onClick,
}: CategoryMenuButtonProps) => {
  const categoryPath = category === "Home" ? "/" : `/${category}`;

  return (
    <Link href={categoryPath} passHref>
      <button
        onClick={() => onClick(category)}
        className={`box relative px-6 py-[0.6rem] md:px-12 transition-all duration-300 border-[1.5px] text-sm md:text-base ${
          selected
            ? "text-shade border-b-0 md:py-[1.125rem]"
            : "text-muted  md:py-3 mt-[0.68rem]"
        } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        style={{
          clipPath: selected
            ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
            : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
        }}
        disabled={isLoading}
      >
        <span className="relative z-10">{category}</span>
      </button>
    </Link>
  );
};

export default CategoryMenuButton;
