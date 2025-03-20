"use client";

import { useCallback, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  // 진행 바 요소의 참조를 저장하는 ref
  const progressRef = useRef<HTMLDivElement>(null);
  // requestAnimationFrame의 ID를 저장하는 ref (애니메이션 취소에 사용)
  const requestRef = useRef<number | undefined>(undefined);

  // 스크롤 진행률 업데이트 함수
  // 전체 문서에서 사용자가 스크롤한 비율을 계산하여 진행 바의 width 값으로 반영
  const updateScrollProgress = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, []);

  // 애니메이션 루프를 통해 부드럽게 업데이트
  // 매 프레임마다 updateScrollProgress를 호출하여 자연스러운 UI 반응을 제공
  const animate = useCallback(() => {
    updateScrollProgress();
    requestRef.current = requestAnimationFrame(animate); // 다음 프레임 요청
  }, [updateScrollProgress]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      // 컴포넌트가 언마운트될 때 애니메이션 중지 (메모리 누수 방지)
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="z-50 w-full h-[0.2rem] bg-soft mt-[0.6px]">
      <div
        ref={progressRef}
        className="h-full bg-primary"
        style={{ transition: "width 0.1s linear" }}
      />
    </div>
  );
};

export default ScrollProgressBar;
