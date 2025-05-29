"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { LoadingContextType } from "@/types/context";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
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
