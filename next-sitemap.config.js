import { readdirSync } from "fs";
import { join } from "path";

const POSTS_PATH = join(process.cwd(), "src/posts");

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://haebink.vercel.app",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  generateRobotsTxt: false,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async () => {
    const urls = [];
    const categories = readdirSync(POSTS_PATH);

    for (const category of categories) {
      const categoryPath = join(POSTS_PATH, category);
      const posts = readdirSync(categoryPath).filter((file) =>
        file.endsWith(".mdx")
      );

      for (const post of posts) {
        const postSlug = post.replace(/\.mdx$/, "");
        urls.push({
          loc: `/${category}/${postSlug}`,
          changefreq: "daily",
          priority: 0.7,
        });
      }
    }

    return urls;
  },
};

export default config;
