"use client";
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoadingPostList: boolean;
  setIsLoadingPostList: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoadingPostList, setIsLoadingPostList] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoadingPostList, setIsLoadingPostList }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingPostList = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
