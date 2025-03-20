import { getAllPosts } from "@/lib/postUtils";
import PostList from "@/components/postlist/PostList";
import { Post } from "@/types/types";

export default async function Home() {
  const posts: Post[] = await getAllPosts();

  return (
    <div className="flex items-start justify-start w-full">
      <PostList posts={posts} />
    </div>
  );
}
