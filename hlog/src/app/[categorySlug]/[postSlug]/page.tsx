// import { Suspense } from "react";
// import Loading from "@/app/Loading";
import { PostParams } from "@/types/types";
import PostContentLayout from "@/components/postcontent/PostContentLayout";

async function PostPage({ params }: PostParams) {
  // params에서 category와 slug를 추출
  const { categorySlug, postSlug } = params;

  return (
    // <Suspense fallback={<Loading />}>
    <PostContentLayout params={{ categorySlug, postSlug }} />
    // </Suspense>
  );
}

export default PostPage;
