"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string | ReactNode;
  level: number;
}

interface HeaderProps {
  id: string;
  children: ReactNode;
}

const CustomToC = ({ content }: { content: ReactNode }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (Array.isArray(content)) {
      const tocItems: TocItem[] = [];
      content.forEach((item) => {
        if (React.isValidElement(item) && typeof item.type === "string") {
          const match = item.type.match(/h(\d)/i);
          if (match) {
            const level = parseInt(match[1], 10);
            if (level <= 2) {
              const props = item.props as HeaderProps;
              const id = props.id;
              const title = props.children;
              if (title !== "Table of Contents") {
                tocItems.push({ id, title, level });
              }
            }
          }
        }
      });
      setToc(tocItems);
    }
  }, [content]);

  const renderTocItem = (item: TocItem) => (
    <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 10}px` }}>
      <a className="no-underline text-muted" href={`#${item.id}`}>
        {item.title}
      </a>
    </li>
  );

  return (
    <div className="w-full xl:sticky xl:top-24 xl:self-start xl:flex xl:items-start">
      <hr className="xl:hidden" />
      <div className="pl-6 flex-grow xl:border-l-[1px] xl:border-secondary-foreground">
        <h3 className="m-0 text-lg font-bold text-accent-foreground">
          What&apos;s Inside
        </h3>
        <ul className="pl-0 m-0 text-sm leading-6 list-none xl:text-xs">
          {toc.map(renderTocItem)}
        </ul>
      </div>
      <hr className="xl:hidden" />
    </div>
  );
};

export default CustomToC;
