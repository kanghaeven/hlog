import { useSearch } from "@/context/SearchContext";
import { extractTextFromReactNode } from "@/lib/reactNodeUtils";
import { Post } from "@/types/types";

export function useFilteredPosts(posts: Post[]) {
  const { searchQuery } = useSearch();

  return searchQuery
    ? posts.filter((post) => {
        const contentText = post.content
          ? extractTextFromReactNode(post.content)
          : "";

        return (
          contentText.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : posts;
}
