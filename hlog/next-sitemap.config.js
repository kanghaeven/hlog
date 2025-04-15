/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://haebink.vercel.app",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  generateRobotsTxt: true,
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

    const categories = fs.readdirSync(POSTS_PATH);

    for (const category of categories) {
      const categoryPath = path.join(POSTS_PATH, category);
      const posts = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith(".mdx"));

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
