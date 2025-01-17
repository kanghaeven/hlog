import { getPostsForCategory } from "@/lib/postUtils";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // params를 비동기적으로 처리
  const { category } = await params;

  // 비동기적으로 카테고리 게시글들을 가져옵니다.
  const posts = await getPostsForCategory(category);

  // 게시글이 없으면 "게시글이 없습니다" 메시지 표시
  if (posts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{category} 카테고리</h1>
        <p>이 카테고리에는 게시글이 없습니다.</p>
      </div>
    );
  }

  // MDX 컴포넌트로 해당 카테고리와 관련된 게시글 목록 표시
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.url} className="border-b py-4">
            <Link
              href={post.url}
              className="text-lg font-semibold text-blue-600"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">작성일: {post.publishDate}</p>
            <p className="text-sm">카테고리: {post.categories.join(", ")}</p>
            {post.posterImage && (
              <img
                src={post.posterImage}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-md mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
