import { ReactElement, ReactNode } from "react";

// 주어진 값이 ReactElement인지 확인하는 타입 가드 함수
export const isReactElement = (
  node: unknown
): node is ReactElement<{ children?: ReactNode }> =>
  typeof node === "object" &&
  node !== null &&
  "props" in node &&
  "type" in node;

// ReactNode에서 텍스트만 추출하여 문자열로 반환하는 함수
export const extractTextFromReactNode = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join(" ");
  }
  if (isReactElement(node)) {
    return extractTextFromReactNode(node.props.children);
  }
  return "";
};

// ID 생성 로직 분리 (공백을 "-"로 변환)
export const generateId = (text: ReactNode) =>
  text?.toString().toLowerCase().replace(/\s+/g, "-");
