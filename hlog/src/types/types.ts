import { ReactNode } from "react";

export type CategoryPageParams = {
  params: { categorySlug: string };
};

export type PostParams = {
  categorySlug: string;
  postSlug: string;
};

export type Post = {
  postSlug: string;
  url: string; // url 속성 추가
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
  content?: ReactNode;
};

export type Frontmatter = {
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

export type TocItem = {
  id: string;
  title: string | ReactNode;
  level: number;
};

export type TocItemProps = {
  item: TocItem;
  isActive: boolean;
  isNearActive: boolean;
};

export type HeaderProps = {
  id: string;
  children: ReactNode;
};
