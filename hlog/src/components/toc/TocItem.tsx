// components/toc/TocItem.tsx
"use client";

import { TocItemProps } from "@/types/types";
import React from "react";

const TocItem = ({ item, isActive, isNearActive }: TocItemProps) => (
  <li style={{ marginLeft: `${(item.level - 1) * 10}px` }}>
    <a
      className={`whitespace-nowrap no-underline transition-colors duration-200 ${
        isActive
          ? "text-primary font-semibold"
          : isNearActive
          ? "text-secondary font-medium"
          : "text-dusty hover:text-primary"
      }`}
      href={`#${item.id}`}
    >
      {item.title}
    </a>
  </li>
);

export default React.memo(TocItem);
