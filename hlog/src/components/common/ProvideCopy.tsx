"use client";

import { useEffect } from "react";

const ProvideCopy = () => {
  useEffect(() => {
    const preventRightClick = (e: { preventDefault: () => unknown }) =>
      e.preventDefault();
    const preventDrag = (e: { preventDefault: () => unknown }) =>
      e.preventDefault();
    const preventCopy = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      alert("복사는 허용되지 않습니다.");
    };

    document.body.addEventListener("contextmenu", preventRightClick); // 우클릭 방지
    document.body.addEventListener("dragstart", preventDrag); // 드래그 방지
    document.addEventListener("copy", preventCopy); // 복사 방지

    return () => {
      document.body.removeEventListener("contextmenu", preventRightClick);
      document.body.removeEventListener("dragstart", preventDrag);
      document.removeEventListener("copy", preventCopy);
    };
  }, []);

  return null;
};

export default ProvideCopy;
