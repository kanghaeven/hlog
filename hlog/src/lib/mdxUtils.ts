import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "@/types/post";
import { getFileContent } from "@/lib/fileUtils";
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

export async function parseMdxFile(filePath: string) {
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
}
