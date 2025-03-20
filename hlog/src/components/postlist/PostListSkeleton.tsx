const PostListSkeleton = () => {
  return (
    <ul className="w-full max-w-6xl p-0 m-0 mt-10 list-none">
      {[...Array(3)].map((_, index) => (
        <li
          key={index}
          className="p-0 m-0 border-t border-soft first:border-t-0 animate-pulse"
        >
          <div className="grid sm:grid-cols-[39%_2%_59%] p-5">
            <div className="items-stretch justify-between hidden sm:flex">
              <div className="relative w-full aspect-[3/2] bg-soft animate-pulse"></div>
              <div className="flex flex-col items-end gap-3 ml-10 text-lg text-muted">
                <div className="w-12 h-5 rounded bg-soft animate-pulse"></div>
                <div className="w-12 h-5 rounded bg-soft animate-pulse"></div>
              </div>
            </div>

            <div className="hidden sm:block"></div>

            <div className="flex flex-col justify-between gap-12 sm:gap-0">
              <div className="flex justify-between">
                <div className="w-32 h-6 rounded bg-soft animate-pulse"></div>
                <div className="hidden w-10 h-6 rounded bg-soft sm:block animate-pulse"></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1 md:flex-row md:w-full md:justify-between md:items-end">
                  <div className="max-w-xs xl:max-w-md sm:hidden md:block">
                    <div className="w-24 h-4 rounded bg-soft animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 ">
                    {[...Array(2)].map((_, idx) => (
                      <span key={idx}>
                        <div className="w-10 h-5 rounded bg-soft animate-pulse"></div>
                      </span>
                    ))}
                  </div>
                </div>
                <span className="px-2 rounded-full sm:hidden h-fit">
                  <div className="w-20 h-5 rounded bg-soft animate-pulse"></div>
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostListSkeleton;
