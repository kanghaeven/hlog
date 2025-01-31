// src/app/blog/[category]/[slug]/page.tsx
import Giscus from "@/components/CommentGiscus";
import PostContent from "@/components/PostContent";
import PostTitle from "@/components/PostTitle";
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
        <p className="text-lg text-gray-500">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl p-6 mx-auto my-16 prose border-4 rounded-lg shadow-lg dark:prose-invert">
      <PostTitle
        title={post.title}
        description={post.description}
        publishDate={post.publishDate}
        posterImage={post.posterImage}
        categories={post.categories}
      />
      <section>
        <PostContent content={post.content} />
      </section>

      <Giscus />
    </article>
  );
}
