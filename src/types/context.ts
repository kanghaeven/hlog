export type LoadingContextType = {
  isLoadingPostList: boolean;
  setIsLoadingPostList: (state: boolean) => void;
};

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
