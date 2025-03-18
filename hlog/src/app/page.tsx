import { getAllPosts } from "@/lib/postUtils";
import PostList from "@/components/PostList";
// import { Suspense } from "react";
// import Loading from "@/app/Loading";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex items-center justify-start">
      {/* <Suspense fallback={<Loading />}> */}
      {/* PostList 컴포넌트에 posts를 전달 */}
      <PostList posts={posts} />
      {/* </Suspense> */}
    </div>
  );
}
