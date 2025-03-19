// hooks/useActiveHeading.ts
"use client";

import throttle from "lodash/throttle"; // 15KB 더 가벼움
import { useEffect, useState } from "react";

const useActiveHeading = () => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = throttle(() => {
      const headings = Array.from(document.querySelectorAll("h1, h2"))
        .reverse()
        .find((heading) => heading.getBoundingClientRect().top <= 100);

      setActiveId(headings?.id || "");
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeId;
};

export default useActiveHeading;
