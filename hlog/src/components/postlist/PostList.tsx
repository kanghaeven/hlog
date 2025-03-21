"use client";

import React, { useState } from "react";
import { PostListProps } from "@/types/post";
import { useLoadingPostList } from "@/contexts/LoadingPostListContext";
import { useSearch } from "@/contexts/SearchContext";
import useSearchPosts from "@/hooks/useSearchPosts";
import PostListItem from "@/components/postlist/PostListItem";
import PostListSkeleton from "@/components/postlist/PostListSkeleton";
import PostContentSkeleton from "@/components/postcontent/PostContentSkeleton";

const PostList = ({ posts }: PostListProps) => {
  // Post List 로딩 상태
  const { isLoadingPostList } = useLoadingPostList();

  // 검색 쿼리 가져오기
  const { searchQuery } = useSearch();
  // 검색된 게시물 목록 가져오기
  const searchedPosts = useSearchPosts(posts);

  // Post Content 로딩 상태 관리
  const [isLoadingPostContent, setIsLoadingPostContent] =
    useState<boolean>(false);
  // 게시글 클릭 시 해당 Post Content의 로딩 상태 true로 설정
  const handlePostClick = () => setIsLoadingPostContent(true);

  return (
    <>
      {/* 게시글 클릭 후 해당 게시글 로딩 중일 때, Post Content 스켈레톤 UI 표시 */}
      {isLoadingPostContent && !isLoadingPostList && <PostContentSkeleton />}
      {/* 게시물 목록 로딩 중일 때, Post List 스켈레톤 UI 표시 */}
      {!isLoadingPostContent && isLoadingPostList && <PostListSkeleton />}
      {/* 로딩이 모두 끝난 후, 필터링된 게시물 목록 표시 */}
      {!isLoadingPostContent && !isLoadingPostList && (
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
            <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
              {/* 게시물 리스트 항목을 순차적으로 렌더링 */}
              {searchedPosts.map((post) => (
                <PostListItem
                  key={post.url}
                  post={post}
                  handlePostClick={handlePostClick}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
