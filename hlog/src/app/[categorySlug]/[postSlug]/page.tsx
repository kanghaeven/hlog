import { Metadata } from "next";
import { PostParams } from "@/types/params";
import { getPostBySlug, getAllPosts } from "@/services/postService";
import PostTitle from "@/components/postcontent/PostTitle";
import PostContent from "@/components/postcontent/PostContent";
import ProfileCard from "@/components/postcontent/ProfileCard";
import Giscus from "@/components/postcontent/CommentGiscus";
import CustomToC from "@/components/toc/CustomToC";
import ActionGroup from "@/components/common/ActionGroup";
import RelatedPostList from "@/components/postcontent/RelatedPostList";
import NotFound from "@/app/not-found";

export const generateMetadata = async ({
  params,
}: PostParams): Promise<Metadata> => {
  const resolvedParams = await params;
  const { categorySlug, postSlug } = resolvedParams;

  const post = await getPostBySlug(categorySlug, postSlug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다.",
      description: "해당 포스트를 찾을 수 없습니다.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${post.title}`,
    description: post.description || "이 포스트에 대한 설명이 없습니다.",
    metadataBase: new URL(
      `https://haebink.vercel.app/${categorySlug}/${postSlug}`
    ),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${post.title} - HaebinK`,
      url: `https://haebink.vercel.app/${categorySlug}/${postSlug}`,
      locale: "ko_KR",
      type: "article",
      description:
        post.description || "이 포스트를 클릭하여 새로운 정보를 만나보세요!",
      siteName: "HaebinK",
      images: [
        {
          url:
            `https://haebink.vercel.app/postimg/${categorySlug}/${postSlug.slice(
              0,
              3
            )}/00thumbnail.png` || "https://haebink.vercel.app/profile.jpg",
          width: 600,
          height: 315,
          alt: "게시글 이미지",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - HaebinK`,
      description:
        post.description || "이 포스트를 클릭하여 새로운 정보를 만나보세요!",
      images: [
        `https://haebink.vercel.app/postimg/${categorySlug}/${postSlug.slice(
          0,
          3
        )}/00thumbnail.png` || "https://haebink.vercel.app/profile.jpg",
      ],
    },
    keywords: [...(post.categories || []), "개발", "SAP", "Next", "HaebinK"],
  };
};

const PostPage = async ({ params }: PostParams) => {
  const resolvedParams = await params;
  const { categorySlug, postSlug } = resolvedParams;

  const post = await getPostBySlug(categorySlug, postSlug);
  const allPosts = await getAllPosts();

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-center p-6 mx-auto mt-6 mobile-post-content sm:mt-10">
      <div className="hidden mr-8 w-[14rem] xl:block"></div>
      <article className="w-full max-w-3xl">
        <PostTitle
          url={post.url}
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

        <RelatedPostList
          currentPostUrl={post.url}
          relatedPostUrls={post.relatedPosts || []}
          allPosts={allPosts}
        />

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
};

export default PostPage;
