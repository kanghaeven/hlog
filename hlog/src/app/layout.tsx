import "@/app/styles/globals.css";
import { Metadata } from "next";
import Head from "next/head";
import { getCategories } from "@/services/categoryService";
import { SearchProvider } from "@/contexts/SearchContext";
import { LoadingProvider } from "@/contexts/LoadingPostListContext";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Hlog",
  description: "HaebinK의 기술 블로그입니다.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Hlog",
    url: "https://haebink.vercel.app",
    locale: "ko_KR",
    type: "website",
    description: "SAP와 Next를 다루는 기술 블로그 - HaebinK",
    siteName: "Example Blog",
    images: [
      {
        url: "https://github.com/user-attachments/assets/2a170019-402b-433a-b233-8aa74e38aec3",
        width: 600,
        height: 400,
        alt: "Hlog 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hlog",
    description: "SAP와 Next를 다루는 기술 블로그 - HaebinK",
    images: [
      "https://github.com/user-attachments/assets/2a170019-402b-433a-b233-8aa74e38aec3",
    ],
  },
  keywords: ["개발", "SAP", "Next", "HaebinK"],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories();
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
