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
  const [activeId, setActiveId] = useState("");

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

    const handleScroll = () => {
      const headings = document.querySelectorAll("h1, h2");
      let currentActiveId = "";

      headings.forEach((heading) => {
        const { top } = heading.getBoundingClientRect();
        if (top <= 100) {
          currentActiveId = heading.id;
        }
      });

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [content]);

  const renderTocItem = (item: TocItem, index: number) => {
    const isActive = activeId === item.id;
    const isNearActive =
      toc[index - 1]?.id === activeId || toc[index + 1]?.id === activeId;

    return (
      <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 10}px` }}>
        <a
          className={`no-underline transition-colors duration-200 ${
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
  };

  return (
    <div className="w-full xl:pl-2 xl:sticky xl:top-24 xl:self-start xl:flex xl:items-start">
      <hr className="xl:hidden" />
      <div className="pl-6 flex-grow xl:border-l-[1px] xl:border-soft">
        <h3 className="m-0 text-lg font-bold text-faded">What&apos;s Inside</h3>
        <ul className="pl-0 m-0 text-sm leading-6 list-none xl:text-xs">
          {toc.map(renderTocItem)}
        </ul>
      </div>
      <hr className="xl:hidden" />
    </div>
  );
};

export default CustomToC;
