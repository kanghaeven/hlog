import Image from "next/image";
import { Frontmatter } from "@/types/types";

const PostTitle = ({
  title,
  description,
  publishDate,
  posterImage,
  categories,
}: Frontmatter) => {
  return (
    <header className="flex flex-col items-center justify-center">
      <p className="text-base font-semibold text-primary">{categories[0]}</p>
      <h1 className="mt-0 text-2xl font-bold leading-tight text-black sm:text-3xl">
        {title}
      </h1>
      <p className="flex gap-3 m-0 text-base font-normal text-secondary">
        {categories.slice(1).map((category, index) => (
          <span key={index}>#{category}</span>
        ))}
      </p>
      <p className="text-sm font-light text-muted">
        {new Date(publishDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <Image src={posterImage} alt="thumbnail" width={600} height={400} />
      <p className="m-0 text-base text-dusty font-regular">{description}</p>
    </header>
  );
};

export default PostTitle;
