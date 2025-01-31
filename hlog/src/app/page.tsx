import { getAllPosts } from "@/lib/postUtils";
import PostList from "@/components/PostList";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="p-6 text-2xl font-bold">Welcome to the Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
