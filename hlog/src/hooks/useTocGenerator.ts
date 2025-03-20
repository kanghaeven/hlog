"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { HeaderProps, TocItem } from "@/types/types";

// 콘텐츠에서 Table of Contents를 제외한 헤더 정보를 추출하여 TOC(목차)를 생성하는 커스텀 훅
const useTocGenerator = (content: ReactNode) => {
  // TOC 항목들을 저장할 상태
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    // 콘텐츠가 배열이 아니면 처리하지 않음
    if (!Array.isArray(content)) return;

    // 콘텐츠에서 유효한 헤더 요소만 추출하여 TOC 항목으로 변환
    const newToc = content
      .filter(React.isValidElement) // 유효한 React 요소만 필터링
      .map((item): TocItem | null => {
        // 요소 타입이 h1, h2 등 헤더인지 확인
        const match = item.type.toString().match(/h(\d)/i);
        if (!match) return null; // 헤더가 아니면 null 반환

        const level = parseInt(match[1], 10); // 헤더의 레벨 (h1 => 1, h2 => 2 등)
        const props = item.props as HeaderProps; // 헤더의 속성 추출

        // h1, h2 헤더에서 "Table of Contents" 텍스트를 제외한 항목만 TOC에 추가
        return level <= 2 && props.children !== "Table of Contents"
          ? { id: props.id, title: props.children, level }
          : null;
      })
      .filter(Boolean) as TocItem[]; // null 값을 제거하고 TOC 항목만 남김

    // 새로 생성한 TOC를 상태에 저장
    setToc(newToc);
  }, [content]); // content가 변경될 때마다 TOC를 업데이트

  return toc; // 생성된 TOC 항목을 반환
};

export default useTocGenerator;
