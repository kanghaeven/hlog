import { ReactNode } from "react";

export type Post = {
  postSlug: string;
  url: string;
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
  content?: ReactNode;
};

export type Frontmatter = {
  url: string;
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
};

export type PostListProps = {
  posts: Post[];
};

export type PostListItemProps = {
  post: Post;
  handlePostClick: () => void;
};

export type PostContentProps = {
  content: ReactNode;
};
