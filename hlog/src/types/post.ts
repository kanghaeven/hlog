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
  relatedPosts?: string[];
};

export type Frontmatter = {
  url: string;
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
  relatedPosts?: string[];
};

export type PostListProps = {
  posts: Post[];
};

export type PostListItemProps = {
  post: Post;
};

export type PostContentProps = {
  content: ReactNode;
};

export type RelatedPostsProps = {
  currentPostUrl: string;
  relatedPostUrls: string[];
  allPosts: Post[];
};
