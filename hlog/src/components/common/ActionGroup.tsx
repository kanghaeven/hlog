"use client";

import { memo, useCallback } from "react";
import useClipboard from "@/hooks/useClipboard";
import { scrollToComments, scrollToTop } from "@/utils/scrollUtils";
import Popup from "@/components/common/Popup";
import ActionButton from "@/components/common/ActionButton";

const ActionGroup = memo(() => {
  const { copied, copyToClipboard } = useClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(window.location.href);
  }, [copyToClipboard]);

  return (
    <div className="z-50 flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <ActionButton onClick={scrollToTop} variant="top" label="최상단 이동" />

        <ActionButton
          onClick={scrollToComments}
          variant="comments"
          label="댓글 이동"
        />

        <ActionButton onClick={handleCopy} variant="copy" label="URL 복사" />
      </div>

      {copied && <Popup message="URL이 복사되었습니다!" position="bottom" />}
    </div>
  );
});

ActionGroup.displayName = "ActionGroup";

export default ActionGroup;
