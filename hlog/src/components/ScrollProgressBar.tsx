"use client";

import { useCallback, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);

  const updateScrollProgress = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, []);

  const animate = useCallback(() => {
    updateScrollProgress();
    requestRef.current = requestAnimationFrame(animate);
  }, [updateScrollProgress]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="fixed left-0 z-50 w-full h-1 bg-gray-200 top-20">
      <div
        ref={progressRef}
        className="h-full bg-primary"
        style={{ transition: "width 0.1s linear" }}
      />
    </div>
  );
};

export default ScrollProgressBar;
