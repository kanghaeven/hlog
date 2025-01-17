import { Post } from "@/types/types";
import { POSTS_PATH, getFilenamesInDirectory } from "@/lib/fileUtils";
import path from "path";
import { parseMdxFile } from "@/lib/mdxUtils";

export async function getPostsForCategory(category: string): Promise<Post[]> {
  const categoryPath = path.resolve(POSTS_PATH, category);
  const filenames = await getFilenamesInDirectory(categoryPath);

  if (filenames.length === 0) return [];

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(".mdx", "");
        const filePath = path.resolve(categoryPath, filename);
        const { metadata } = await parseMdxFile(filePath);

        return {
          slug,
          url: `/blog/${category}/${slug}`,
          title: metadata.title,
          description: metadata.description,
          publishDate: metadata.publishDate,
          posterImage: metadata.posterImage,
          categories: metadata.categories,
        };
      })
  );

  return posts;
}

export async function getPostBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const filePath = path.resolve(POSTS_PATH, category, `${slug}.mdx`);

  try {
    const { metadata, content } = await parseMdxFile(filePath);

    return {
      slug,
      url: `/blog/${category}/${slug}`,
      title: metadata.title,
      description: metadata.description,
      publishDate: metadata.publishDate,
      posterImage: metadata.posterImage,
      categories: metadata.categories,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
