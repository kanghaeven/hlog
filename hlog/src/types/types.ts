import { ReactNode } from "react";

export type Post = {
  slug: string;
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
