import type { MDXComponents } from "mdx/types";
import BlogTitle from "@/components/BlogTitle";
import PostContent from "@/components/PostContent";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Link,
    BlogTitle,
    PostContent,
    ...components,
  };
}
