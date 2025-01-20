import "@/app/styles/globals.css"; // 글로벌 CSS 또는 Tailwind 설정
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="prose dark:prose-invert font-sans">
        <ThemeProvider>
          <header className="p-4 bg-blue-500 text-white">
            <h1 className="text-xl">My Blog</h1>
            <ThemeSwitch />
          </header>
          <main className="max-w-4xl mx-auto">{children}</main>
          <footer className="p-4 bg-gray-800 text-white text-center">
            © 2024 My Blog
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
