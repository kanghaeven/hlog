import path from "path";
import { POSTS_PATH, getFilenamesInDirectory } from "@/utils/fileUtils";

// 주어진 디렉토리 내의 파일들을 기준으로 카테고리 목록을 추출하는 함수
export const getCategories = async (): Promise<string[]> => {
  const filenames = await getFilenamesInDirectory(POSTS_PATH);

  const categories = new Set(
    filenames.map((filename) => filename.split(path.sep)[0])
  );
  return Array.from(categories);
};
