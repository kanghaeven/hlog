import { Suspense } from "react";
import PostContent from "@/components/PostContent";
import PostTitle from "@/components/PostTitle";
import CustomToC from "@/components/toc/CustomToC";
import Giscus from "@/components/CommentGiscus";
import { getPostBySlug } from "@/lib/postUtils";
import Loading from "@/app/Loading";
import ActionGroup from "@/components/common/ActionGroup";

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <PostContentSection category={category} slug={slug} />
    </Suspense>
  );
}

async function PostContentSection({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 mx-auto mt-6 sm:mt-10">
      <div className="hidden mr-8 w-[14rem] xl:block"></div>
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
        <section id="comments">
          <Giscus />
        </section>
      </article>
      <aside className="hidden ml-20 w-72 xl:block">
        <div className="fixed top-[14vh]">
          <CustomToC content={post.content} />
        </div>
      </aside>
      <div className="fixed bottom-0 right-0 block m-6 md:m-12 xl:hidden">
        <ActionGroup />
      </div>
    </div>
  );
}
