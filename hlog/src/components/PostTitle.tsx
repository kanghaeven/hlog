import Image from "next/image";
import { Frontmatter } from "@/types/types";

const PostTitle = ({
  title,
  publishDate,
  posterImage,
  categories,
}: Frontmatter) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>{new Date(publishDate).toLocaleDateString()}</p>
      <p>{categories.join(", ")}</p>
      <Image src={posterImage} alt="title" width={800} height={400} />
    </header>
  );
};

export default PostTitle;
