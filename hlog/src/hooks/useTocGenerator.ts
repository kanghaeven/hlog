// hooks/useTocGenerator.ts
"use client";

import { HeaderProps, TocItem } from "@/types/types";
import React, { ReactNode, useEffect, useState } from "react";

const useTocGenerator = (content: ReactNode) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!Array.isArray(content)) return;

    const newToc = content
      .filter(React.isValidElement)
      .map((item): TocItem | null => {
        const match = item.type.toString().match(/h(\d)/i);
        if (!match) return null;

        const level = parseInt(match[1], 10);
        const props = item.props as HeaderProps;
        return level <= 2 && props.children !== "Table of Contents"
          ? { id: props.id, title: props.children, level }
          : null;
      })
      .filter(Boolean) as TocItem[];

    setToc(newToc);
  }, [content]);

  return toc;
};

export default useTocGenerator;
