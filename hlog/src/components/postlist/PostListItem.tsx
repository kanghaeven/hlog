import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostListItemProps } from "@/types/post";

/*
 * 포스트 목록의 각 항목을 표시하는 컴포넌트
 * memo로 감싸 불필요한 리렌더링을 방지
 * 검색 결과가 변경되거나 필터링될 때 변경되지 않은 항목은 리렌더링되지 않음
 */
const PostListItem = memo(({ post }: PostListItemProps) => (
  <li className="p-0 m-0 border-t border-soft first:border-t-0">
    <Link
      href={post.url}
      className="grid sm:grid-cols-[39%_2%_59%] p-5 no-underline hover:bg-input group"
    >
      {/* 왼쪽 이미지 영역 */}
      <div className="items-stretch justify-between hidden gap-12 sm:flex">
        <div className="relative w-full aspect-[1.91/1] overflow-hidden">
          {post.posterImage && (
            <Image
              src={post.posterImage}
              alt={post.title}
              fill
              sizes="(max-width: 600px) 100%, 50%"
              className="object-cover m-0 transition-all dark:invert-[0.15] group-hover:scale-105"
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
        <div className="flex justify-between gap-6">
          <p className="m-0 text-lg font-medium text-black lg:text-xl">
            {post.title}
          </p>
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
                {post.categories.slice(1).map((category, index) => (
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
));

PostListItem.displayName = "PostListItem";

export default PostListItem;
