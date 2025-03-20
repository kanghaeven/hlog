import { ReactNode } from "react";

// params는 Promise 객체로 감싸져 있어, 파라미터를 비동기적으로 반환
export type CategoryParams = {
  params: Promise<{ categorySlug: string }>;
};

// params는 Promise 객체로 감싸져 있어, 두 파라미터를 비동기적으로 반환
export type PostParams = {
  params: Promise<{ categorySlug: string; postSlug: string }>;
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

export type CategoryMenuButtonProps = {
  category: string;
  selected: boolean;
  isLoading: boolean;
  onClick: (category: string) => void;
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

export type ButtonProps = {
  onClick: () => void;
  variant: "top" | "comments" | "copy";
  label: string;
};

export type PopupProps = {
  message: string;
  duration?: number;
  position?: "top" | "bottom";
};

export type SearchBarProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};
