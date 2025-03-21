import { useMemo } from "react";
import { Post } from "@/types/post";
import { useSearch } from "@/contexts/SearchContext";
import { extractTextFromReactNode } from "@/lib/reactNodeUtils";

const useFilteredPosts = (posts: Post[]) => {
  const { searchQuery } = useSearch();

  // searchQuery가 있을 경우 필터링하고, 없으면 전체 posts 반환
  return useMemo(() => {
    if (!searchQuery) return posts;

    const searchQueryLower = searchQuery.toLowerCase();

    return posts.filter((post) => {
      // 콘텐츠에서 텍스트 추출
      const contentText = post.content
        ? extractTextFromReactNode(post.content)
        : "";

      // 제목, 설명, 콘텐츠에 대해 검색어 포함 여부 확인
      return (
        contentText.toLowerCase().includes(searchQueryLower) ||
        post.title.toLowerCase().includes(searchQueryLower) ||
        post.description.toLowerCase().includes(searchQueryLower)
      );
    });
  }, [posts, searchQuery]);
};

export default useFilteredPosts;
