import PostList from "@/components/PostList";
import { getPostsForCategory } from "@/lib/postUtils";
import Link from "next/link";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: { page?: string };
}) {
  // params를 비동기적으로 처리
  const { category } = await params;
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 6;

  // 비동기적으로 카테고리 게시글들을 가져옵니다.
  const { posts, total } = await getPostsForCategory(category, page, limit);

  // 게시글이 없으면 "게시글이 없습니다" 메시지 표시
  if (posts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold">{category} 카테고리</h1>
        <p>이 카테고리에는 게시글이 없습니다.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);

  // MDX 컴포넌트로 해당 카테고리와 관련된 게시글 목록 표시
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">{category}</h1>
      <PostList posts={posts} />

      <div className="flex justify-between mt-8">
        {page > 1 ? (
          <Link href={`/${category}?page=${page - 1}`}>
            <button className="btn">이전 페이지</button>
          </Link>
        ) : (
          <p></p>
        )}

        {page < totalPages ? (
          <Link href={`/${category}?page=${page + 1}`}>
            <button className="ml-auto btn">다음 페이지</button>
          </Link>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
