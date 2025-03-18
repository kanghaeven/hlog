import PostList from "@/components/PostList";
import { getPostsForCategory } from "@/lib/postUtils";

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await props.params;
  const { page: pageString } = await props.searchParams;
  const page = parseInt(pageString || "1", 10);
  const limit = 6;

  const { posts, total } = await getPostsForCategory(category, page, limit);
  console.log(total);

  if (posts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold">{category} 카테고리</h1>
        <p>이 카테고리에는 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-between">
      <PostList posts={posts} />
    </div>
  );
}
