import Link from "next/link";

interface Post {
  url: string;
  title: string;
  publishDate: string;
  categories: string[];
  posterImage?: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="p-0 list-none">
      {posts.map((post) => (
        <li key={post.url} className="p-0 m-0 border-b-[0.1rem]">
          <Link
            href={post.url}
            className="grid grid-cols-[1fr_4fr_1fr] items-center p-6 no-underline"
          >
            <div className="text-sm text-muted">
              {post.categories.join(", ")}
            </div>
            <div className="text-lg font-semibold leading-none text-secondary">
              {post.title}
            </div>
            <div className="text-sm text-right text-muted">
              {post.publishDate.split(" ")[0]}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
