"use client";

import Link from "next/link";

export const notfoundMetadata = {
  title: "페이지를 찾을 수 없음",
  description: "해당 페이지를 찾을 수 없습니다.",
  robots: {
    index: false,
  },
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="m-0 text-2xl font-bold">페이지를 찾을 수 없습니다.</p>
      <p className="text-dusty text-md">존재하지 않는 페이지입니다.</p>
      <Link
        href="/"
        className="px-4 py-2 mt-6 no-underline transition rounded-full text-background bg-primary hover:bg-secondary"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
