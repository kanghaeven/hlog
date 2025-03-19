import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="p-6 my-16 rounded-lg bg-input border-soft border-[1px]">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={64}
            height={64}
            className="w-10 h-10 m-0 rounded-full md:w-20 md:h-20"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-md">Kang Haebin</span>
            <span className="text-sm text-muted">Junior Developer</span>
            <span className="hidden mt-3 text-sm md:block text-dusty">
              피드백과 댓글, 좋아요는 언제나 환영입니다! 여러분의 한마디가 큰
              힘이 돼요 🪼
            </span>
          </div>
        </div>
        <span className="block text-sm md:hidden text-dusty">
          피드백과 댓글, 좋아요는 언제나 환영입니다! 여러분의 한마디가 큰 힘이
          돼요 🪼
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
