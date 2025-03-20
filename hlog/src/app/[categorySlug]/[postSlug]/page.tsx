// import { Suspense } from "react";
import { PostParams } from "@/types/types";
// import Loading from "@/app/Loading";
import PostContentLayout from "@/components/postcontent/PostContentLayout";

async function PostPage({ params }: { params: PostParams }) {
  // params에서 category와 slug를 추출
  const { categorySlug, postSlug } = params;

  return (
    // <Suspense fallback={<Loading />}>
    <PostContentLayout categorySlug={categorySlug} postSlug={postSlug} />
    // </Suspense>
  );
}

export default PostPage;
