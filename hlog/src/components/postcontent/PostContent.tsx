"use client";

import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";

interface PostContentProps {
  content: ReactNode;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const components = useMDXComponents({});

  const enhancedComponents = {
    ...components,
    h1: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
      <h1
        {...props}
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h1>
    ),
    h2: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
      <h2
        {...props}
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h2>
    ),
  };

  return (
    <MDXProvider components={enhancedComponents}>
      <div>{content}</div>
    </MDXProvider>
  );
};

export default PostContent;
