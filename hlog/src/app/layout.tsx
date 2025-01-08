import "@/app/styles/globals.css"; // 글로벌 CSS 또는 Tailwind 설정

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <header className="p-4 bg-blue-500 text-white">
          <h1 className="text-xl">My Blog</h1>
        </header>
        <main className="max-w-4xl mx-auto">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2024 My Blog
        </footer>
      </body>
    </html>
  );
}
