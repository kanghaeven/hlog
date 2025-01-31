"use client";

import React, { useState } from "react";

const Popup = ({ message }: { message: string }) => {
  return (
    <div className="absolute px-6 py-2 text-sm text-white transform -translate-x-1/2 bg-black rounded shadow-lg bottom-12 left-1/2">
      {message}
    </div>
  );
};

const Footer = () => {
  const [popup, setPopup] = useState<string | null>(null);

  const handlePopup = (type: string) => {
    if (type === "github") {
      window.open("https://github.com/kanghaeven", "_blank");
    } else if (type === "email") {
      navigator.clipboard.writeText("aubrienid@naver.com");
      setPopup("Email address copied!");
      setTimeout(() => setPopup(null), 2000);
    }
  };

  return (
    <footer className="flex items-center justify-between w-full h-8 px-6 mt-auto text-primary-foreground bg-primary">
      <div className="flex space-x-4">
        <button
          onClick={() => handlePopup("github")}
          className="hover:underline focus:outline-none"
        >
          Github
        </button>
        <button
          onClick={() => handlePopup("email")}
          className="hover:underline focus:outline-none"
        >
          Email
        </button>
      </div>
      <div>© 2025 HaebinK</div>
      {popup && <Popup message={popup} />}
    </footer>
  );
};

export default Footer;
