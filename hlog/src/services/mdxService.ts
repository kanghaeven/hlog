import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "@/types/post";
import { getFileContent } from "@/utils/fileUtils";
import remarkGfm from "remark-gfm";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: {
    dark: "night-owl",
    light: "catppuccin-latte",
  },
};

// 주어진 MDX 파일 경로를 읽고, frontmatter와 content를 파싱하여 반환하는 함수
export const parseMdxFile = async (filePath: string) => {
  const fileContent = await getFileContent(filePath);

  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkA11yEmoji],
        rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
      },
    },
  });

  return { metadata: frontmatter, content };
};
