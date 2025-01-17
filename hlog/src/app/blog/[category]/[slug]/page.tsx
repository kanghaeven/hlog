// src/app/blog/[category]/[slug]/page.tsx
import PostContent from "@/components/PostContent";
import { getPostBySlug } from "@/lib/postUtils";

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto my-16 p-6 bg-white shadow-lg rounded-lg">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          게시일: {new Date(post.publishDate).toLocaleDateString()} &bull;
          카테고리: {post.categories.join(", ")}
        </p>
        <img
          src={post.posterImage}
          alt={post.title}
          className="mt-6 w-full h-64 object-cover rounded-lg"
        />
      </header>
      <section className="prose prose-lg">
        <PostContent content={post.content} />
      </section>
    </article>
  );
}
