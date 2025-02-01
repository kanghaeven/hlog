// In PostContent.tsx (Client Component)
"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";
import { ReactNode } from "react";

interface PostContentProps {
  content: ReactNode;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <MDXProvider components={useMDXComponents({})}>
      <div className="xl:px-0">{content}</div>
    </MDXProvider>
  );
};

export default PostContent;
