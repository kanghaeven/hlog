"use client";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";
import { PostContentProps } from "@/types/types";

// ID 생성 로직 분리 (공백을 "-"로 변환)
const generateId = (text: React.ReactNode) =>
  text?.toString().toLowerCase().replace(/\s+/g, "-");

const PostContent = ({ content }: PostContentProps) => {
  const components = useMDXComponents({});

  const enhancedComponents = {
    ...components,
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props} id={generateId(props.children)} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props} id={generateId(props.children)} />
    ),
  };

  return (
    <MDXProvider components={enhancedComponents}>
      <div className="prose text-black max-w-none">{content}</div>
    </MDXProvider>
  );
};

export default PostContent;
