export default function Loading() {
  return (
    <div className="flex justify-center w-full p-6 mx-auto mt-6 sm:mt-10">
      <div className="hidden max-w-xs mr-8 xl:block"></div>

      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center">
          <div className="w-1/4 h-8 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="w-2/3 h-10 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="w-1/2 h-6 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="w-1/3 h-6 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="w-full h-56 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="w-5/6 h-8 mb-6 bg-gray-200 rounded"></div>{" "}
        </div>

        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full h-6 bg-gray-200 rounded"></div> // 본문 콘텐츠
          ))}
        </div>
      </div>

      <div className="hidden ml-8 w-72 xl:block">
        <div className="sticky top-[14vh]">
          <div className="w-1/2 h-8 mb-6 bg-gray-200 rounded"></div>{" "}
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-3/4 h-6 bg-gray-200 rounded"></div> // ToC 항목들
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
