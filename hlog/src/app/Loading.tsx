export default function Loading() {
  return (
    <div className="flex justify-center p-6 mx-auto mt-6 sm:mt-10">
      {/* 왼쪽 빈 공간 (hidden on smaller screens) */}
      <div className="hidden max-w-xs mr-8 xl:block"></div>

      {/* 메인 컨텐츠 */}
      <article className="w-full max-w-3xl">
        {/* 스켈레톤 타이틀 */}
        <header className="flex flex-col items-center justify-center">
          <div className="w-3/4 h-6 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 카테고리 */}
          <div className="w-2/3 h-8 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 타이틀 */}
          <div className="w-1/2 h-4 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 추가 카테고리 */}
          <div className="w-1/3 h-4 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 날짜 */}
          <div className="w-full h-48 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 이미지 */}
          <div className="w-5/6 h-6 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* 설명 */}
        </header>

        {/* 스켈레톤 ToC (Table of Contents) */}
        <div className="my-8 xl:hidden">
          <div className="w-1/2 h-6 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* ToC 제목 */}
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-3/4 h-4 bg-gray-200 rounded"></div> // ToC 항목들
            ))}
          </div>
        </div>

        {/* 스켈레톤 본문 콘텐츠 */}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full h-4 bg-gray-200 rounded"></div> // 본문 콘텐츠
          ))}
        </div>
      </article>

      {/* 스켈레톤 오른쪽 사이드바 (Aside) */}
      <aside className="hidden ml-8 w-72 xl:block">
        <div className="sticky top-[14vh]">
          <div className="w-1/2 h-6 mb-4 bg-gray-200 rounded"></div>{" "}
          {/* ToC 제목 */}
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-3/4 h-4 bg-gray-200 rounded"></div> // ToC 항목들
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
