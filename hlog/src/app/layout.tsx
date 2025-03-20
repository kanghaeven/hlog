import "@/app/styles/globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LoadingProvider } from "@/context/LoadingPostListContext";
import { SearchProvider } from "@/context/SearchContext";
import { getCategories } from "@/lib/categoryUtils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
