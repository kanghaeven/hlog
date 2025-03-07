"use client";
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isTransitioning: boolean;
  setIsTransitioning: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <LoadingContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  console.log("여기", context);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
