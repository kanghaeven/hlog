import PostList from "@/components/PostList";
import { getPostsForCategory } from "@/lib/postUtils";

// import Link from "next/link";

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

  // const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-start justify-between">
      {/* <h1 className="w-full p-6 mb-4 text-2xl font-semibold">{category}</h1> */}
      <PostList posts={posts} />

      {/* <div className="flex justify-between mt-8">
        {page > 1 ? (
          <Link href={`/${category}?page=${page - 1}`} scroll={false}>
            <button className="btn">이전 페이지</button>
          </Link>
        ) : (
          <p></p>
        )}

        {page < totalPages ? (
          <Link href={`/${category}?page=${page + 1}`} scroll={false}>
            <button className="ml-auto btn">다음 페이지</button>
          </Link>
        ) : (
          <p></p>
        )}
      </div> */}
    </div>
  );
}
