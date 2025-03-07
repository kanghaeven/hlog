export default function Loading() {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        {/* 제목 스켈레톤 */}
        <div className="w-2/3 h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>

        {/* 포스트 목록 스켈레톤 */}
        <div className="mt-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>

        {/* 로딩 스피너 */}
        <div className="flex justify-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
