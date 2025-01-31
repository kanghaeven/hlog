import path from "path";
import { getFilenamesInDirectory } from "@/lib/fileUtils";

export const POSTS_PATH = path.resolve(process.cwd(), "src", "posts");

export async function getCategories(): Promise<string[]> {
  const filenames = await getFilenamesInDirectory(POSTS_PATH);

  // 카테고리 목록 추출
  const categories = new Set(
    filenames.map((filename) => filename.split(path.sep)[0])
  );

  return Array.from(categories);
}
