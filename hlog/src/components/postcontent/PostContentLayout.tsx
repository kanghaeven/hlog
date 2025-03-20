import { PostParams } from "@/types/types";
import { getPostBySlug } from "@/lib/postUtils";
import PostTitle from "@/components/postcontent/PostTitle";
import PostContent from "@/components/postcontent/PostContent";
import ProfileCard from "@/components/postcontent/ProfileCard";
import Giscus from "@/components/postcontent/CommentGiscus";
import CustomToC from "@/components/toc/CustomToC";
import ActionGroup from "@/components/common/ActionGroup";

async function PostContentLayout({ categorySlug, postSlug }: PostParams) {
  const post = await getPostBySlug(categorySlug, postSlug);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-md text-muted">포스트를 찾을 수 없습니다.</p>
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
        <ProfileCard />
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

export default PostContentLayout;
