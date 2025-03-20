import "@/app/styles/globals.css";
import { getCategories } from "@/lib/categoryUtils";
import { SearchProvider } from "@/contexts/SearchContext";
import { LoadingProvider } from "@/contexts/LoadingPostListContext";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen prose transition-all duration-300 dark:prose-invert">
        <ThemeProvider>
          <LoadingProvider>
            <SearchProvider>
              <Header categories={categories} />
              <main className="flex-1 mt-4 sm:mt-10">{children}</main>
              <Footer />
            </SearchProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
