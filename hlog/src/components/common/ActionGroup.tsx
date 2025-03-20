"use client";

import { useClipboard } from "@/hooks/useClipboard";
import Popup from "@/components/common/Popup";
import ActionButton from "@/components/common/ActionButton";

const ActionGroup = () => {
  // useClipboard 훅을 사용하여 복사 상태와 복사 함수 가져오기
  const { copied, copyToClipboard } = useClipboard();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToComments = () =>
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="z-50 flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <ActionButton onClick={scrollToTop} variant="top" label="최상단 이동" />

        <ActionButton
          onClick={scrollToComments}
          variant="comments"
          label="댓글 이동"
        />

        <ActionButton
          onClick={() => copyToClipboard(window.location.href)}
          variant="copy"
          label="URL 복사"
        />
      </div>

      {copied && <Popup message="URL이 복사되었습니다!" position="bottom" />}
    </div>
  );
};

export default ActionGroup;
