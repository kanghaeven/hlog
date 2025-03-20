// import { Suspense } from "react";
// import Loading from "@/app/Loading";
import { PostParams } from "@/types/types";
import PostContentLayout from "@/components/postcontent/PostContentLayout";

async function PostPage({ params }: PostParams) {
  return (
    // <Suspense fallback={<Loading />}>
    <PostContentLayout params={params} /> // </Suspense>
  );
}

export default PostPage;
