import { CategoryParams } from "@/types/types";
import { getPostsForCategory } from "@/lib/postUtils";
import PostList from "@/components/postlist/PostList";

const CategoryPage = async ({ params }: CategoryParams) => {
  // URL에서 동적 세그먼트인 category를 전달받음
  const { categorySlug } = params;

  // 카테고리에 해당하는 게시글 데이터 가져오기
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
