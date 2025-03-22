import "@/app/styles/globals.css";
import Head from "next/head";
import { getCategories } from "@/services/categoryService";
import { SearchProvider } from "@/contexts/SearchContext";
import { LoadingProvider } from "@/contexts/LoadingPostListContext";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories();
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        {/* Google 사이트 인증 메타 태그 */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hlog</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="HaebinK의 기술 블로그입니다." />
        <meta name="keywords" content="개발, SAP, Next, HaebinK" />
        <meta property="og:title" content="Hlog" />
        <meta property="og:url" content={"https://haebink.vercel.app"} />
        <meta property="og:type" content="website" />

        <meta
          property="og:description"
          content="여기에서 다양한 게시물을 확인하세요."
        />
        <meta
          property="og:image"
          content="https://github.com/user-attachments/assets/2a170019-402b-433a-b233-8aa74e38aec3"
        />
        <title>내 블로그</title>
      </Head>
      <body className="flex flex-col min-h-screen prose transition-all duration-300 dark:prose-invert">
        <ThemeProvider>
          <LoadingProvider>
            <SearchProvider>
              <Header categories={categories} />
              <main className="flex-1 mt-4 md:mt-10">{children}</main>
              <Footer />
            </SearchProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
