"use client";

import { ReactNode } from "react";
import useTocGenerator from "@/hooks/useTocGenerator";
import useActiveHeading from "@/hooks/useActiveHeading";
import useScrollDirection from "@/hooks/useScrollDirection";
import TocItem from "@/components/toc/TocItem";
import ActionGroup from "@/components/common/ActionGroup";

const CustomToC = ({ content }: { content: ReactNode }) => {
  const toc = useTocGenerator(content);
  const activeId = useActiveHeading();
  const isHeaderVisible = useScrollDirection();

  return (
    <div
      className={`${
        isHeaderVisible ? "xl:top-[20vh]" : "xl:top-[10vh]"
      } z-0 transition-all duration-300 xl:sticky xl:top-[14vh] xl:z-10 relative`}
    >
      <hr className="xl:hidden" />
      <div className="pl-6 flex-grow xl:border-l-[1px] xl:border-soft">
        <h3 className="m-0 text-lg font-bold text-faded">What&apos;s Inside</h3>
        <ul className="pl-0 m-0 text-sm leading-6 list-none xl:text-xs">
          {toc.map((item, index) => {
            const isActive = activeId === item.id;
            const isNearActive =
              toc[index - 1]?.id === activeId ||
              toc[index + 1]?.id === activeId;
            return (
              <TocItem
                key={item.id}
                item={item}
                isActive={isActive}
                isNearActive={isNearActive}
              />
            );
          })}
        </ul>
      </div>
      <div className="hidden xl:block">
        <ActionGroup />
      </div>
      <hr className="xl:hidden" />
    </div>
  );
};

export default CustomToC;
