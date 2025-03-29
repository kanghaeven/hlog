"use client";

import React, { memo, useMemo } from "react";
import { RelatedPostsProps, Post } from "@/types/post";
import { findSameCategoryPosts } from "@/utils/postUtils";
import RelatedPostCard from "@/components/postcontent/RelatedPostCard";

const RelatedPostList = memo(
  ({ currentPostUrl, relatedPostUrls, allPosts }: RelatedPostsProps) => {
    // 1. relatedPostUrls를 지정했다면 연관 게시글 찾기
    const relatedPosts = useMemo(() => {
      if (relatedPostUrls && relatedPostUrls.length > 0) {
        return relatedPostUrls
          .map((url) => allPosts.find((post) => post.url === url))
          .filter(
            (post): post is Post =>
              post !== undefined && post.url !== currentPostUrl
          );
      }

      // 2. relatedPostUrls가 없거나 빈 배열인 경우, 같은 카테고리 게시글 찾기
      const currentPost = allPosts.find((post) => post.url === currentPostUrl);
      if (!currentPost) return [];

      const sameCategoryPosts = findSameCategoryPosts(
        currentPostUrl,
        currentPost,
        allPosts,
        []
      );

      return sameCategoryPosts.slice(0, 3);
    }, [currentPostUrl, relatedPostUrls, allPosts]);

    // 표시할 연관 게시글이 없으면 컴포넌트를 렌더링하지 않음
    if (relatedPosts.length === 0) return null;

    const sectionTitle =
      relatedPostUrls && relatedPostUrls.length > 0
        ? "관련 게시글"
        : "최근 게시글";

    return (
      <section className="mt-16 mb-8">
        <h3 className="mb-6 text-xl font-bold text-black">{sectionTitle}</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <RelatedPostCard key={post.url} post={post} />
          ))}
        </div>
      </section>
    );
  }
);

RelatedPostList.displayName = "RelatedPostList";

export default RelatedPostList;
