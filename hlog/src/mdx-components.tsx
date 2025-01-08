import type { MDXComponents } from "mdx/types";
import BlogTitle from "@/components/BlogTitle";
import PostContent from "@/components/PostContent";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Link,
    BlogTitle,
    PostContent,
    h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: (props) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
    ),
    p: (props) => <p className="mb-4" {...props} />,
    // 다른 요소들에 대한 스타일 정의
    ...components,
  };
}
