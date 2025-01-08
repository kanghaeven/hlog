import { Metadata, Post } from "@/types/types";
import { readdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";

const POSTS_PATH = path.resolve(process.cwd(), "src", "posts");

// 특정 카테고리의 게시글을 가져오는 함수
export async function getPostsForCategory(category: string): Promise<Post[]> {
  // 카테고리별 절대 경로 설정
  const categoryPath = path.resolve(POSTS_PATH, category);

  // 디렉토리 내 파일 이름들 가져오기
  const filenames = await readdir(categoryPath);

  // 게시글이 없으면 빈 배열 반환
  if (filenames.length === 0) {
    return [];
  }

  // .mdx 파일만 필터링하고, 각 파일의 메타데이터를 가져옵니다.
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx")) // .mdx 파일만 처리
      .map(async (filename) => {
        const slug = filename.replace(".mdx", ""); // 확장자 제거
        const filePath = path.resolve(categoryPath, filename);

        // MDX 파일에서 메타데이터와 콘텐츠 추출
        const { metadata } = await parseMdxFile(filePath);

        // Post 타입에 맞는 데이터 반환
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

// MDX 파일에서 메타데이터와 콘텐츠를 추출하는 함수
export async function parseMdxFile(filePath: string) {
  const fileContent = await fs.promises.readFile(filePath, "utf-8");

  const metadataMatch = fileContent.match(
    /export const metadata = {([\s\S]+?)}/
  );

  const metadataRaw = metadataMatch ? metadataMatch[1].trim() : "{}"; // 메타데이터 추출

  const metadata = parseMetadata(metadataRaw); // 메타데이터 파싱

  const contentWithoutMetadata = fileContent
    .replace(/export const metadata = {[\s\S]+?}/, "")
    .trim();

  const { content } = await compileMDX({
    source: contentWithoutMetadata,
    options: { parseFrontmatter: true },
  });

  return { metadata, content };
}

// 메타데이터를 안전하게 파싱하는 함수
function parseMetadata(metadataRaw: string): Metadata {
  const metadata: Metadata = {
    title: "",
    description: "",
    publishDate: "",
    posterImage: "",
    categories: [],
  };

  // 수동으로 메타데이터를 파싱
  const lines = metadataRaw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(": ");
    const value = valueParts.join("").replace(/^"|",$/g, "");

    switch (key) {
      case "title":
        metadata.title = value;
        break;
      case "description":
        metadata.description = value;
        break;
      case "publishDate":
        metadata.publishDate = value;
        break;
      case "posterImage":
        metadata.posterImage = value;
        break;
      case "categories":
        try {
          // categories가 JSON 형식이라면 파싱, 그렇지 않으면 빈 배열 처리
          if (value.startsWith("[") && value.endsWith("]")) {
            metadata.categories = JSON.parse(value);
          } else {
            throw new Error("Invalid categories format");
          }
        } catch {
          console.error(`Failed to parse categories: ${value}`);
          throw new Error(`Invalid categories format in metadata`);
        }
        break;
      default:
        console.warn(`Unknown metadata key: ${key}`);
        break;
    }
  });

  return metadata;
}

export async function getPostBySlug(category: string, slug: string) {
  const categoryPath = path.resolve(POSTS_PATH, category);
  const filePath = path.resolve(categoryPath, `${slug}.mdx`);

  try {
    const { metadata, content } = await parseMdxFile(filePath);
    console.log(content);
    return {
      slug,
      url: `/blog/${category}/${slug}`,
      title: metadata.title,
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
