export type Post = {
  url: string; // url 속성 추가
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
  content?: string;
};

export type Metadata = {
  title: string;
  description: string;
  publishDate: string;
  posterImage: string;
  categories: string[];
};
