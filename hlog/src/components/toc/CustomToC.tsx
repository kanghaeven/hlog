"use client";

import { ReactNode } from "react";
import ActionGroup from "../common/ActionGroup";
import TocItem from "./TocItem";
import useScrollDirection from "@/hooks/useScrollDirection";
import useTocGenerator from "@/hooks/useTocGenerator";
import useActiveHeading from "@/hooks/useActiveHeading";

const CustomToC = ({ content }: { content: ReactNode }) => {
  const toc = useTocGenerator(content);
  const activeId = useActiveHeading();
  const isHeaderVisible = useScrollDirection();

  return (
    <div
      className={`${
        isHeaderVisible ? "xl:top-[20vh]" : "xl:top-[10vh]"
      } transition-all duration-300 xl:sticky xl:top-[14vh] xl:z-10 relative z-30`}
    >
      <hr className="xl:hidden" />
      <div className="pl-6 flex-grow xl:border-l-[1px] xl:border-soft">
        <h3 className="m-0 text-lg font-bold text-faded">What&apos;s Inside</h3>
        <ul className="pl-0 m-0 text-sm leading-6 list-none xl:text-xs">
          {toc.map((item, index) => {
            const isActive = activeId === item.id;
            const isNearActive = [
              toc[index - 1]?.id,
              toc[index + 1]?.id,
            ].includes(activeId);
            return (
              <TocItem key={item.id} {...{ item, isActive, isNearActive }} />
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
