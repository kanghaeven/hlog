import { CategoryParams } from "@/types/params";
import { getPostsForCategory } from "@/services/postService";
import PostList from "@/components/postlist/PostList";
import NotFound from "../not-found";

const CategoryPage = async (props: CategoryParams) => {
  const { categorySlug } = await props.params;

  const { posts } = await getPostsForCategory(categorySlug);

  if (posts.length === 0) {
    return <NotFound />;
  }

  return <PostList posts={posts} />;
};

export default CategoryPage;
