// In PostContent.tsx (Client Component)
"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";
import { ReactElement } from "react";

interface PostContentProps {
  content: ReactElement;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <MDXProvider components={useMDXComponents({})}>
      <div>{content}</div>
    </MDXProvider>
  );
};

export default PostContent;
