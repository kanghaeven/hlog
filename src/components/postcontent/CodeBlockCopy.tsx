"use client";

import React, { useEffect, useCallback } from "react";
import * as ReactDOM from "react-dom/client";
import CopyButton from "@/components/postcontent/CopyButton";

const CodeBlockCopy = () => {
  // 코드 텍스트 추출 함수
  const extractCodeText = useCallback((codeElement: Element): string => {
    const codeLines: string[] = [];
    const lineElements = codeElement.querySelectorAll("[data-line]");

    lineElements.forEach((line) => {
      let lineContent = "";
      line.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          lineContent += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          lineContent += (node as HTMLElement).textContent;
        }
      });
      codeLines.push(lineContent || "");
    });

    return codeLines.join("\n");
  }, []);

  // 코드 블록에 버튼 표시하는 함수
  const enhanceCodeBlock = useCallback(
    (codeBlock: Element) => {
      // 이미 처리된 코드 블록인지 확인
      if (codeBlock.classList.contains("copy-button-added")) return;
      codeBlock.classList.add("copy-button-added");

      // pre 요소 찾기
      const preElement = codeBlock.querySelector("pre");
      if (!preElement) return;

      // 복사할 텍스트 추출
      const codeElement = preElement.querySelector("code");
      if (!codeElement) return;

      // 코드 텍스트 추출
      const codeText = extractCodeText(codeElement);

      // 스타일 적용
      preElement.classList.add("group", "relative");

      // React 컴포넌트를 렌더링할 컨테이너 생성
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "code-copy-container";
      preElement.appendChild(buttonContainer);

      const buttonRoot = ReactDOM.createRoot(buttonContainer);
      buttonRoot.render(<CopyButton text={codeText} />);
    },
    [extractCodeText]
  );

  useEffect(() => {
    // 초기 코드 블록 처리
    const codeBlocks = document.querySelectorAll(
      "[data-rehype-pretty-code-figure]"
    );
    codeBlocks.forEach(enhanceCodeBlock);

    // MutationObserver를 사용하여 동적으로 추가되는 코드 블록 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;

              // 추가된 노드가 코드 블록인 경우
              if (element.hasAttribute("data-rehype-pretty-code-figure")) {
                enhanceCodeBlock(element);
              }

              // 추가된 노드 내부에 코드 블록이 있는 경우
              const nestedCodeBlocks = element.querySelectorAll(
                "[data-rehype-pretty-code-figure]"
              );
              nestedCodeBlocks.forEach(enhanceCodeBlock);
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [enhanceCodeBlock]);

  return null;
};

export default CodeBlockCopy;
