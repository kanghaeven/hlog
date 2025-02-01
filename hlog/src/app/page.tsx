import { getAllPosts } from "@/lib/postUtils";
import PostList from "@/components/PostList";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex items-center justify-start">
      {/* <h1 className="w-full p-6 text-2xl font-bold">Welcome to the Blog</h1> */}
      <PostList posts={posts} />
    </div>
  );
}
