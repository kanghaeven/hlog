import Image from "next/image";
import { Frontmatter } from "@/types/post";

const PostTitle = ({
  title,
  description,
  publishDate,
  posterImage,
  categories,
}: Frontmatter) => {
  // 날짜 변환
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishDate));

  // 카테고리 태그 분리
  const categoryTags = categories
    .slice(1)
    .map((category, index) => <span key={index}>#{category}</span>);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-base font-semibold text-primary">{categories[0]}</p>
      <h1 className="mt-0 text-2xl font-bold leading-tight text-black sm:text-3xl">
        {title}
      </h1>
      <p className="flex gap-3 m-0 text-base font-normal text-secondary">
        {categoryTags}
      </p>
      <p className="text-sm font-light text-muted">{formattedDate}</p>
      <Image
        src={posterImage}
        className="transition-all dark:invert-[0.15]"
        priority={true}
        alt="thumbnail"
        width={600}
        height={315}
      />
      <p className="m-0 text-dusty font-regular">{description}</p>
    </div>
  );
};

export default PostTitle;
