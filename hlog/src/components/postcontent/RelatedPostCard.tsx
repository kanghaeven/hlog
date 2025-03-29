import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { Post } from "@/types/post";

const RelatedPostCard = memo(({ post }: { post: Post }) => (
  <Link
    href={post.url}
    className="flex flex-col overflow-hidden no-underline transition-all border rounded-lg border-soft group hover:bg-input"
  >
    <div className="relative hidden overflow-hidden md:block aspect-[16/9]">
      <Image
        src={post.posterImage}
        alt={post.title}
        fill
        sizes="(max-width: 600px) 100vw, 50vw"
        className="object-cover m-0 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-grow gap-6 p-4">
      <h4 className="m-0 text-base font-semibold transition-colors line-clamp-2 group-hover:text-secondary">
        {post.title}
      </h4>
      <div className="flex flex-wrap gap-2 mt-auto mr-auto">
        {post.categories.slice(1).map((category) => (
          <span
            key={category}
            className="px-2 py-1 text-xs border rounded-full border-soft dark:bg-slate-800 text-dusty"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  </Link>
));

RelatedPostCard.displayName = "RelatedPostCard";

export default RelatedPostCard;
