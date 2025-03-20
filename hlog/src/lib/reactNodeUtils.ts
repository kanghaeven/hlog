import { ReactElement, ReactNode } from "react";

export function isReactElement(
  node: unknown
): node is ReactElement<{ children?: ReactNode }> {
  return (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    "type" in node
  );
}

export function extractTextFromReactNode(node: ReactNode): string {
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
}
