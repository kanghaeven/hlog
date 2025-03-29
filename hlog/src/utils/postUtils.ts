import { Post } from "@/types/post";
import { sortPostsByDate } from "@/services/sortService";

/**
 * 현재 게시글의 카테고리와 일치하는 게시글을 찾는 함수
 */
export const findSameCategoryPosts = (
  currentPostUrl: string,
  currentPost: Post,
  allPosts: Post[],
  existingRelatedPosts: Post[]
): Post[] => {
  // 같은 카테고리의 게시글 찾기
  const sameCategoryPosts = allPosts.filter(
    (post) =>
      post.url !== currentPostUrl &&
      post.categories.some((cat) => currentPost.categories.includes(cat)) &&
      !existingRelatedPosts.some((relatedPost) => relatedPost.url === post.url)
  );

  // 날짜 기준 최신순으로 정렬
  return sortPostsByDate(sameCategoryPosts);
};
