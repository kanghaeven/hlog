import { CategoryParams } from "@/types/types";
import { getPostsForCategory } from "@/lib/postUtils";
import PostList from "@/components/postlist/PostList";

const CategoryPage = async (props: CategoryParams) => {
  const { categorySlug } = await props.params;

  const { posts } = await getPostsForCategory(categorySlug);

  if (posts.length === 0) {
    return (
      <p className="p-8 mb-4 text-md text-dusty">
        {categorySlug} 카테고리에는 게시글이 없습니다.
      </p>
    );
  }

  return <PostList posts={posts} />;
};

export default CategoryPage;
