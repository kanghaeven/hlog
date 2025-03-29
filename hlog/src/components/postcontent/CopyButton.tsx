import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useClipboard from "@/hooks/useClipboard";
import Popup from "@/components/common/Popup";
import { Copy, Check } from "lucide-react";

const CopyButton = ({ text }: { text: string }) => {
  const { copied, copyToClipboard } = useClipboard();
  const [showGlobalPopup, setShowGlobalPopup] = useState(false);

  useEffect(() => {
    if (copied) {
      setShowGlobalPopup(false);
      setTimeout(() => setShowGlobalPopup(true), 10);
    }
  }, [copied]);

  const handleClick = () => {
    copyToClipboard(text);
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="코드 복사"
        className="absolute z-10 flex items-center justify-center p-2 transition-all border opacity-0 rounded-xl size-8 backdrop-blur hover:bg-washed border-dusty/20 top-3 right-3 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-dusty" />
        )}
      </button>

      {showGlobalPopup &&
        // createPortal: 컴포넌트를 DOM 트리의 다른 위치(여기서는 document.body)에 렌더링
        // 팝업이 부모 요소의 CSS 제약에 영향받지 않고 화면 어디서나 보임
        createPortal(
          <Popup
            message="코드가 복사되었습니다"
            duration={2000}
            position="bottom"
          />,
          document.body
        )}
    </>
  );
};

export default CopyButton;
