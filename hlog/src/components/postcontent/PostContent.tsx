"use client";

import React, { memo, useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";
import { PostContentProps } from "@/types/post";
import mdxComponents from "@/components/postcontent/mdxComponents";
import CodeBlockCopy from "@/components/postcontent/CodeBlockCopy";

/*
 * memo와 useMemo는 서로 다른 레벨에서 최적화
 *
 * memo: 컴포넌트 자체를 메모이제이션, props가 변경되지 않으면 리렌더링을 건너뜀
 * 상위 컴포넌트가 리렌더링되어도 content prop이 동일하면 이 컴포넌트는 리렌더링되지 않음
 *
 * useMemo: 컴포넌트 내부의 값/계산 결과를 메모이제이션
 * 컴포넌트가 리렌더링되어도 의존성 배열이 변경되지 않으면 계산을 다시 수행하지 않음
 */
const PostContent = memo(({ content }: PostContentProps) => {
  // mdxComponents는 렌더링마다 새 객체를 생성하므로 useMemo로 최적화
  const components = useMemo(() => mdxComponents({}), []);

  return (
    <MDXProvider components={components} disableParentContext={true}>
      <div className="prose text-black max-w-none mobile-post-content">
        {content}
        <CodeBlockCopy />
      </div>
    </MDXProvider>
  );
});

PostContent.displayName = "PostContent";

export default PostContent;
