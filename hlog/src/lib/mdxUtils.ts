import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "@/types/types";
import { getFileContent } from "@/lib/fileUtils";
import remarkGfm from "remark-gfm";
// import remarkToc from "remark-toc";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export async function parseMdxFile(filePath: string) {
  const fileContent = await getFileContent(filePath);

  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkA11yEmoji,
          // [
          //   remarkToc,
          //   {
          //     heading: "Table of Contents",
          //     ordered: false,
          //     tight: true,
          //     maxDepth: 3,
          //   },
          // ],
        ],
        rehypePlugins: [[rehypePrettyCode, { theme: "night-owl" }], rehypeSlug],
      },
    },
  });

  return { metadata: frontmatter, content };
}
