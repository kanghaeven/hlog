"use client";

import React from "react";
import useClipboard from "@/hooks/useClipboard";
import { handleGithub } from "@/utils/linkUtils";
import Popup from "@/components/common/Popup";

const Footer = () => {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <footer className="flex items-center justify-between w-full h-8 px-6 mt-auto text-background bg-primary">
      <div className="flex space-x-4">
        <button
          onClick={handleGithub}
          className="hover:underline focus:outline-none"
        >
          Github
        </button>
        <button
          onClick={() => copyToClipboard("aubrienid@naver.com")}
          className="hover:underline focus:outline-none"
        >
          Email
        </button>
      </div>
      <div>© 2025 HaebinK</div>
      {copied && (
        <Popup message="이메일 주소가 복사되었습니다" position="bottom" />
      )}
    </footer>
  );
};

export default Footer;
