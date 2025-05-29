import path from "path";
import fs from "fs/promises";
import { Post } from "@/types/post";

// posts 폴더의 절대 경로를 정의
export const POSTS_PATH = path.resolve(process.cwd(), "src", "posts");

// 카테고리 이름을 받아 해당 카테고리의 절대 경로를 반환
export const getCategoryPath = (category: string) =>
  path.resolve(POSTS_PATH, category);

// 카테고리 이름과 파일명을 받아서 해당 파일의 절대 경로를 반환
export const getPostFilePath = (category: string, filename: string) =>
  path.resolve(POSTS_PATH, category, filename);

// 주어진 파일 경로의 내용을 읽어오는 함수
export const getFileContent = async (filePath: string): Promise<string> =>
  fs.readFile(filePath, "utf-8");

// 디렉토리 내 모든 파일 이름을 가져오는 함수
export const getFilenamesInDirectory = async (
  dirPath: string
): Promise<string[]> => fs.readdir(dirPath);

// MDX 파일만 필터링하는 함수
export const filterMdxFiles = (filenames: string[]) =>
  filenames.filter((filename) => filename.endsWith(".mdx"));

// null을 제외한 유효한 포스트만 필터링하는 함수
export const validatePosts = (posts: (Post | null)[]) =>
  posts.filter((post): post is Post => post !== null);
