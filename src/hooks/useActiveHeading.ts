"use client";

import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 스크롤 시 활성화된 헤딩의 ID를 추적하는 커스텀 훅
const useActiveHeading = () => {
  // 현재 활성화된 헤딩의 ID 상태
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 스크롤 이벤트에 대한 처리 함수 (throttle을 사용하여 성능 최적화)
    const handleScroll = throttle(() => {
      // 문서에서 모든 h1, h2 요소를 선택하고, 스크롤 위치에 따라 가장 가까운 헤딩을 찾음
      const headings = Array.from(document.querySelectorAll("h1, h2"))
        .reverse() // 마지막에서부터 탐색 (가장 가까운 헤딩을 찾기 위함)
        .find((heading) => heading.getBoundingClientRect().top <= 100); // 화면에 나타나는 헤딩

      // 활성화된 헤딩의 ID를 상태로 설정
      setActiveId(headings?.id || ""); // 만약 활성화된 헤딩이 없으면 빈 문자열로 설정
    }, 100); // 100ms마다 한번만 호출되도록 throttle

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // cleanup 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거 및 throttle cancel
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []); // 의존성 배열이 빈 배열이므로 컴포넌트가 마운트될 때 한번만 실행

  // 현재 활성화된 헤딩의 ID를 반환
  return activeId;
};

export default useActiveHeading;
