import type { MDXComponents } from "mdx/types";
import { generateId } from "@/utils/reactUtils";

// MDX에서 사용될 커스텀 컴포넌트를 반환하는 함수
const mdxComponents = (components: MDXComponents): MDXComponents => ({
  ...components,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} id={generateId(props.children)} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} id={generateId(props.children)} />
  ),
});

export default mdxComponents;
