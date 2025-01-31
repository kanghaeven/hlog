import type { MDXComponents } from "mdx/types";
import PostTitle from "@/components/PostTitle";
import PostContent from "@/components/PostContent";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Link,
    PostTitle,
    PostContent,
    ...components,
  };
}
