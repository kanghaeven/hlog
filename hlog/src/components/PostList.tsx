"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/types";
import { useLoading } from "@/context/LoadingContext";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const { isTransitioning } = useLoading(); // 로딩 상태 값
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    console.log("Transitioning 상태:", isTransitioning); // 상태 값 체크
    setShowLoading(isTransitioning); // transitioning 상태가 바뀔 때마다 로딩 상태를 업데이트
  }, [isTransitioning]);

  return (
    <>
      {showLoading && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
          <div className="text-white">로딩 중...</div>
        </div>
      )}

      <Suspense fallback={<div>로딩 중...</div>}>
        <PostListContent posts={posts} />
      </Suspense>
    </>
  );
};
const PostListContent = ({ posts }: PostListProps) => {
  if (posts === null || posts.length === 0) {
    return <div className="text-lg text-center">게시물이 없습니다.</div>;
  }

  return (
    <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
      {posts.map((post) => (
        <li
          key={post.url}
          className="p-0 m-0 border-t border-soft first:border-t-0"
        >
          <Link
            href={post.url}
            className="grid sm:grid-cols-[39%_2%_59%] p-5 no-underline hover:bg-input"
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
                  {post.publishDate.split(" ")[0].split("-").slice(1).join(".")}
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
                  <p className="max-w-xs text-xs xl:max-w-md text-muted sm:hidden md:block">
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
  );
};

export default PostList;
