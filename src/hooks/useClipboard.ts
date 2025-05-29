"use client";

import { useCallback, useState } from "react";

const useClipboard = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return { copied, copyToClipboard };
};

export default useClipboard;
