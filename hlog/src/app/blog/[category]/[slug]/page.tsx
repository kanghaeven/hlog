// src/app/blog/[category]/[slug]/page.tsx
import PostContent from "@/components/PostContent";
import { getPostBySlug } from "@/lib/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  console.log(post.content);

  return (
    <div>
      <h1>{post.title}</h1>
      <PostContent content={post.content} />
    </div>
  );
}
