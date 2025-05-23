import fs from "fs";
import { Post } from "@/types/post";
import { parseMdxFile } from "@/services/mdxService";
import { sortPostsByDate } from "@/services/sortService";
import {
  POSTS_PATH,
  filterMdxFiles,
  getCategoryPath,
  getFilenamesInDirectory,
  getPostFilePath,
  validatePosts,
} from "@/utils/fileUtils";

// MDX 파일을 파싱하여 포스트 객체를 반환
const getPostFromFile = async (
  category: string,
  filename: string
): Promise<Post | null> => {
  try {
    const postSlug = filename.replace(".mdx", "");
    const filePath = getPostFilePath(category, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`[Not found] File not found: ${filePath}`);
      return null;
    }

    const { metadata, content } = await parseMdxFile(filePath);

    return {
      postSlug,
      url: `/${category}/${postSlug}`,
      title: metadata.title,
      description: metadata.description,
      publishDate: metadata.publishDate,
      posterImage: metadata.posterImage,
      categories: metadata.categories,
      relatedPosts: metadata.relatedPosts || [],
      content,
    };
  } catch (error) {
    console.error(`[Post Error] File: ${filename}`, error);
    return null;
  }
};

// 주어진 카테고리 내의 MDX 파일들을 가져오는 공통 함수
const getPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    const categoryPath = getCategoryPath(category);
    if (!fs.existsSync(categoryPath)) {
      console.warn(`[Not Found] Category not found: ${category}`);
      return [];
    }

    const filenames = await getFilenamesInDirectory(getCategoryPath(category));

    const posts = await Promise.all(
      filterMdxFiles(filenames).map((filename) =>
        getPostFromFile(category, filename)
      )
    );

    return validatePosts(posts);
  } catch (error) {
    console.error(`[Category Error] ${category}`, error);
    return [];
  }
};

// 모든 포스트를 가져오는 함수
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const categories = await getFilenamesInDirectory(POSTS_PATH);

    const posts = await Promise.all(categories.map(getPostsByCategory));
    return sortPostsByDate(posts.flat());
  } catch (error) {
    console.error("[System Error] getAllPosts", error);
    return [];
  }
};

// 특정 카테고리의 포스트와 총 개수를 반환하는 함수
export const getPostsForCategory = async (
  category: string
): Promise<{ posts: Post[]; count: number }> => {
  const posts = await getPostsByCategory(category);

  return {
    posts: sortPostsByDate(posts),
    count: posts.length,
  };
};

// 슬러그를 이용해 특정 포스트를 반환하는 함수
export const getPostBySlug = async (
  categorySlug: string,
  postSlug: string
): Promise<Post | null> => {
  try {
    const decodedPostSlug = decodeURIComponent(postSlug);
    const filename = `${decodedPostSlug}.mdx`;
    const post = await getPostFromFile(categorySlug, filename);

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error(`[Post Error] ${categorySlug}/${postSlug}`, error);
    return null;
  }
};

// 현재 게시글의 카테고리와 일치하는 게시글을 찾는 함수
export const findSameCategoryPosts = (
  currentPostUrl: string,
  currentPost: Post,
  allPosts: Post[],
  existingRelatedPosts: Post[]
): Post[] => {
  const sameCategoryPosts = allPosts.filter(
    (post) =>
      post.url !== currentPostUrl &&
      post.categories.some((cat) => currentPost.categories.includes(cat)) &&
      !existingRelatedPosts.some((relatedPost) => relatedPost.url === post.url)
  );

  return sortPostsByDate(sameCategoryPosts);
};
