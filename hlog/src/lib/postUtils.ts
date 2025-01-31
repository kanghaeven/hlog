import { Post } from "@/types/types";
import { POSTS_PATH, getFilenamesInDirectory } from "@/lib/fileUtils";
import path from "path";
import { parseMdxFile } from "@/lib/mdxUtils";

export async function getAllPosts(): Promise<Post[]> {
  const categories = await getFilenamesInDirectory(POSTS_PATH);
  let allPosts: Post[] = [];

  for (const category of categories) {
    const categoryPath = path.resolve(POSTS_PATH, category);
    const filenames = await getFilenamesInDirectory(categoryPath);

    const posts = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".mdx"))
        .map(async (filename) => {
          const slug = filename.replace(".mdx", "");
          const filePath = path.resolve(categoryPath, filename);
          const { metadata } = await parseMdxFile(filePath);

          return {
            slug,
            url: `/${category}/${slug}`,
            title: metadata.title,
            description: metadata.description,
            publishDate: metadata.publishDate,
            posterImage: metadata.posterImage,
            categories: metadata.categories,
          };
        })
    );

    allPosts = [...allPosts, ...posts];
  }

  // 최신순 정렬
  return allPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export async function getPostsForCategory(
  category: string,
  page: number = 1,
  limit: number = 6
): Promise<{ posts: Post[]; total: number }> {
  const categoryPath = path.resolve(POSTS_PATH, category);
  const filenames = await getFilenamesInDirectory(categoryPath);

  if (filenames.length === 0) return { posts: [], total: 0 };

  const allPosts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(".mdx", "");
        const filePath = path.resolve(categoryPath, filename);
        const { metadata } = await parseMdxFile(filePath);

        return {
          slug,
          url: `/${category}/${slug}`,
          title: metadata.title,
          description: metadata.description,
          publishDate: metadata.publishDate,
          posterImage: metadata.posterImage,
          categories: metadata.categories,
        };
      })
  );

  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const start = (page - 1) * limit;
  const paginatedPosts = sortedPosts.slice(start, start + limit);

  return { posts: paginatedPosts, total: sortedPosts.length };
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
      url: `/${category}/${slug}`,
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
