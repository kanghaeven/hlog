import "@/app/styles/globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getCategories } from "@/lib/categoryUtils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen prose dark:prose-invert">
        <ThemeProvider>
          <Header categories={categories} />
          <main className="flex-1 mt-4 sm:mt-10">{children}</main>
          <ScrollProgressBar />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
