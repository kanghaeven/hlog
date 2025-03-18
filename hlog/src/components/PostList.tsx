"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/types";
import { useLoading } from "@/context/LoadingContext";
import Loading from "@/app/Loading";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const { isTransitioning } = useLoading(); // 로딩 상태 관리
  const [showLoading, setShowLoading] = useState(false);

  // 게시글 클릭 시 로딩 상태 변경
  const handlePostClick = () => {
    setShowLoading(true); // 로딩 상태 true로 설정
  };

  if (posts === null || posts.length === 0) {
    return <div className="text-lg text-center">게시물이 없습니다.</div>;
  }

  return (
    <>
      {isTransitioning && <PostListSkeleton />}
      {showLoading ? (
        <Loading />
      ) : (
        <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
          {posts.map((post) => (
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
                  <div className="flex justify-between">
                    <h2 className="m-0 text-lg font-medium text-black lg:text-xl">
                      {post.title}
                    </h2>
                    <span className="hidden sm:block h-fit px-2 border-muted text-dusty text-md rounded-full border-[1px] text-bold">
                      {post.categories[0]}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="md:flex md:w-full md:justify-between md:items-end">
                      <p className="max-w-xs text-xs sm:my-0 xl:max-w-md text-muted sm:hidden md:block">
                        {post.description}
                      </p>
                      <div className="flex gap-2 m-0 text-xs sm:text-sm text-dusty">
                        {post.categories.slice(1).map((category, index) => (
                          <span key={index}>{category}</span>
                        ))}
                      </div>
                    </div>
                    <span className="sm:hidden h-fit px-2 border-muted text-dusty text-sm rounded-full border-[1px] text-bold">
                      {post.categories[0]}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Skeleton UI 컴포넌트
const PostListSkeleton = () => {
  return (
    <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
      {[...Array(3)].map((_, index) => (
        <li
          key={index}
          className="p-0 m-0 border-t border-soft first:border-t-0 animate-pulse"
        >
          <div className="grid sm:grid-cols-[39%_2%_59%] p-5">
            <div className="items-stretch justify-between hidden sm:flex">
              <div className="relative w-full aspect-[3/2] bg-soft animate-pulse"></div>
              <div className="flex flex-col items-end gap-3 ml-10 text-lg text-muted">
                <div className="w-12 h-5 rounded bg-soft animate-pulse"></div>
                <div className="w-12 h-5 rounded bg-soft animate-pulse"></div>
              </div>
            </div>

            <div className="hidden sm:block"></div>

            <div className="flex flex-col justify-between gap-12 sm:gap-0">
              <div className="flex justify-between">
                <div className="w-32 h-6 rounded bg-soft animate-pulse"></div>
                <div className="hidden w-10 h-6 rounded bg-soft sm:block animate-pulse"></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1 md:flex-row md:w-full md:justify-between md:items-end">
                  <div className="max-w-xs xl:max-w-md sm:hidden md:block">
                    <div className="w-24 h-4 rounded bg-soft animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 ">
                    {[...Array(2)].map((_, idx) => (
                      <span key={idx}>
                        <div className="w-10 h-5 rounded bg-soft animate-pulse"></div>
                      </span>
                    ))}
                  </div>
                </div>
                <span className="px-2 rounded-full sm:hidden h-fit">
                  <div className="w-20 h-5 rounded bg-soft animate-pulse"></div>
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
