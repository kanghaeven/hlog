"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/types";
import { useLoading } from "@/context/LoadingContext";
import { useSearch } from "@/context/SearchContext";
import Loading from "@/app/Loading";
import PostListSkeleton from "./PostListSkeleton";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const { isTransitioning } = useLoading(); // 로딩 상태 관리
  const { searchQuery } = useSearch(); // 검색어 상태 가져오기
  const [showLoading, setShowLoading] = useState(false);

  const filteredPosts = useFilteredPosts(posts);

  // 게시글 클릭 시 로딩 상태 변경
  const handlePostClick = () => {
    setShowLoading(true); // 로딩 상태 true로 설정
  };

  // 로딩이 끝난 후 스켈레톤을 숨기기 위해 효과 사용
  useEffect(() => {
    if (!showLoading) {
      setShowLoading(false); // 로딩 종료 시 상태 변경
    }
  }, [showLoading]);

  return (
    <>
      {showLoading && !isTransitioning && <Loading />}
      {!showLoading && isTransitioning && <PostListSkeleton />}

      {!showLoading && !isTransitioning && (
        <div className="flex flex-col items-center w-full">
          {searchQuery && (
            <h2 className="mb-4 text-xl font-medium text-muted">
              &quot;{searchQuery}&quot;를 포함한 결과 {filteredPosts.length}개
            </h2>
          )}

          {filteredPosts.length === 0 ? (
            <p className="text-md text-dusty">검색 결과가 없습니다.</p>
          ) : (
            <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
              {filteredPosts.map((post) => (
                <li
                  key={post.url}
                  className="p-0 m-0 border-t border-soft first:border-t-0"
                >
                  <Link
                    href={post.url}
                    className="grid sm:grid-cols-[39%_2%_59%] p-5 no-underline hover:bg-input"
                    onClick={handlePostClick} // 클릭 시 로딩 상태 변경
                  >
                    {/* 왼쪽 이미지 영역 */}
                    <div className="items-stretch hidden gap-12 sm:flex jusity-between">
                      <div className="relative w-full aspect-[3/2]">
                        {post.posterImage && (
                          <Image
                            src={post.posterImage}
                            alt={post.title}
                            fill
                            className="object-cover m-0"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-end text-lg text-muted">
                        <span>
                          {post.publishDate
                            .split(" ")[0]
                            .split("-")
                            .slice(1)
                            .join(".")}
                        </span>
                        <span>{post.publishDate.split("-")[0]}</span>
                      </div>
                    </div>
                    <div className="hidden sm:block"></div>

                    {/* 오른쪽 텍스트 영역 */}
                    <div className="flex flex-col justify-between gap-12 sm:gap-0">
                      <div className="flex justify-between gap-6">
                        <h2 className="m-0 text-lg font-medium text-black lg:text-xl">
                          {post.title}
                        </h2>
                        <span className="hidden sm:block h-fit px-2 border-muted text-dusty text-md rounded-full border-[1px] text-bold">
                          {post.categories[0]}
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="w-full gap-6 md:flex md:justify-between md:items-end">
                          <p className="text-xs sm:my-0 lg:max-w-md text-muted sm:hidden md:block">
                            {post.description}
                          </p>
                          <div className="flex justify-between">
                            <div className="flex gap-2 m-0 text-xs whitespace-nowrap sm:text-sm text-dusty">
                              {post.categories
                                .slice(1)
                                .map((category, index) => (
                                  <span key={index}>{category}</span>
                                ))}
                            </div>
                            <span className="sm:hidden h-fit px-2 border-muted text-dusty text-sm rounded-full border-[1px] text-bold">
                              {post.categories[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
