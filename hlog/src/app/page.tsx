import { Post } from "@/types/types";
import { getAllPosts } from "@/lib/postUtils";
import PostList from "@/components/postlist/PostList";

const Home = async () => {
  const posts: Post[] = await getAllPosts();

  return (
    <div className="flex items-start justify-start w-full">
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
