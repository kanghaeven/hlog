// src/app/blog/[category]/[slug]/page.tsx
import Giscus from "@/components/CommentGiscus";
import PostContent from "@/components/PostContent";
import PostTitle from "@/components/PostTitle";
import CustomToC from "@/components/CustomToC";
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
    <div className="flex justify-center p-6 mx-auto">
      <div className="hidden w-64 mr-8 xl:block">
        {/* This is an empty div to balance the layout */}
      </div>
      <article className="w-full max-w-3xl">
        <PostTitle
          title={post.title}
          description={post.description}
          publishDate={post.publishDate}
          posterImage={post.posterImage}
          categories={post.categories}
        />
        <div className="my-8 xl:hidden">
          <CustomToC content={post.content} />
        </div>
        <PostContent content={post.content} />
        <Giscus />
      </article>
      <aside className="hidden w-64 ml-10 xl:block">
        <div className="sticky top-60">
          <CustomToC content={post.content} />
        </div>
      </aside>
    </div>
  );
}
