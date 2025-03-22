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
};
