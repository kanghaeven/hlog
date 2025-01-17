import path from "path";
import fs from "fs/promises";

export const POSTS_PATH = path.resolve(process.cwd(), "src", "posts");

export async function getFileContent(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8");
}

export async function getFilenamesInDirectory(
  dirPath: string
): Promise<string[]> {
  return fs.readdir(dirPath);
}
