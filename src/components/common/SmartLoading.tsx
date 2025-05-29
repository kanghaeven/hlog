"use client";

import { usePathname } from "next/navigation";
import PostContentSkeleton from "@/components/postcontent/PostContentSkeleton";
import PostListSkeleton from "@/components/postlist/PostListSkeleton";

export default function SmartLoading() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  // 경로 분석: /[categorySlug]/[postSlug] 형태인지 확인
  const isPostPage = pathParts.length >= 2;

  // 경로에 따라 적절한 스켈레톤 표시
  if (isPostPage) {
    return <PostContentSkeleton />;
  } else {
    return <PostListSkeleton />;
  }
}
