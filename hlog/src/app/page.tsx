import fs from "fs";
import path from "path";
import Link from "next/link";

const BASE_PATH = "src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

async function getCategories() {
  const filenames = fs.readdirSync(POSTS_PATH);

  // 카테고리 목록 추출
  const categories = new Set(
    filenames.map((filename) => filename.split("/")[0])
  );

  return Array.from(categories);
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Blog</h1>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/blog/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
