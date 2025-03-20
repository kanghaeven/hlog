"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import throttle from "lodash/throttle";

// 스크롤 방향에 따라 요소의 가시성을 제어하는 커스텀 훅
const useScrollDirection = (threshold = 50) => {
  // 요소가 보이는지 여부를 나타내는 상태
  const [isVisible, setIsVisible] = useState(true);
  // 마지막 스크롤 위치를 저장하기 위한 useRef 훅 (렌더링에 영향을 미치지 않음)
  const lastScrollY = useRef(0);

  // 스크롤 이벤트를 처리하는 함수 (useCallback으로 최적화하여 불필요한 재생성을 방지)
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }

      // 마지막 스크롤 위치 업데이트
      lastScrollY.current = currentScrollY;
    }, 100), // 100ms마다 호출되도록 throttle
    [threshold]
  );

  // 컴포넌트 마운트 시 스크롤 이벤트 리스너 추가, 언마운트 시 제거
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // throttle에서 제공하는 cancel 함수 호출로 cleanup
    };
  }, [handleScroll]);

  // 요소의 가시성 반환
  return isVisible;
};

export default useScrollDirection;
