"use client";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { PostContentProps } from "@/types/post";
import mdxComponents from "@/components/postcontent/mdxComponents";

const PostContent = ({ content }: PostContentProps) => {
  const components = mdxComponents({});

  return (
    <MDXProvider components={components}>
      <div className="prose text-black max-w-none">{content}</div>
    </MDXProvider>
  );
};

export default PostContent;
