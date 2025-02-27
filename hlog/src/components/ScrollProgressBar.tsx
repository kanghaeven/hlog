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
