import { Post } from "@/types/post";

// 포스트를 최신순 or 오래된 순으로 정렬하는 함수
export const sortPostsByDate = (
  posts: Post[],
  order: "asc" | "desc" = "desc"
) => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
};
