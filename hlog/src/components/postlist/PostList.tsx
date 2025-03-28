"use client";

import React, { memo } from "react";
import { PostListProps } from "@/types/post";
import { useLoadingPostList } from "@/contexts/LoadingPostListContext";
import { useSearch } from "@/contexts/SearchContext";
import useSearchPosts from "@/hooks/useSearchPosts";
import PostListItem from "@/components/postlist/PostListItem";
import PostListSkeleton from "@/components/postlist/PostListSkeleton";

/*
 * 포스트 목록을 표시하는 컴포넌트
 * memo로 감싸 불필요한 리렌더링을 방지합
 * 내부 상태 변경이나 검색 결과 변경 시에만 리렌더링.
 */
const PostList = memo(({ posts }: PostListProps) => {
  // Post List 로딩 상태
  const { isLoadingPostList } = useLoadingPostList();

  // 검색 쿼리 가져오기
  const { searchQuery } = useSearch();
  // 검색된 게시물 목록 가져오기 (내부적으로 useMemo 사용)
  const searchedPosts = useSearchPosts(posts);

  return (
    <>
      {/* 게시물 목록 로딩 중일 때, Post List 스켈레톤 UI 표시 */}
      {isLoadingPostList && <PostListSkeleton />}

      {!isLoadingPostList && (
        <div className="flex flex-col items-start w-full">
          {/* 검색 쿼리가 있을 경우, 해당 검색어와 관련된 게시물 수 표시 */}
          {searchQuery && (
            <h2 className="px-6 mb-4 font-medium text-md md:px-12 text-muted">
              &quot;{searchQuery}&quot;를 포함한 글 {searchedPosts.length}개
            </h2>
          )}
          {/* 검색된 게시물 없을 경우 메시지 표시 */}
          {searchedPosts.length === 0 ? (
            <p className="px-6 md:px-12 text-md text-dusty">
              검색 결과가 없습니다.
            </p>
          ) : (
            <ul className="w-full p-0 m-0 mt-10 list-none max-w-7xl">
              {/* 게시물 리스트 항목을 순차적으로 렌더링 */}
              {searchedPosts.map((post) => (
                <PostListItem key={post.url} post={post} />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
});

PostList.displayName = "PostList";

export default PostList;
