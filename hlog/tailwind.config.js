/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

module.exports = {
  content: [
    "./src/components/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        shade: "hsl(var(--shade))",
        faded: "hsl(var(--faded))",
        black: "hsl(var(--black))",
        background: "hsl(var(--background))",
        input: "hsl(var(--input))",
        soft: "hsl(var(--soft))",
        washed: "hsl(var(--washed))",
        muted: "hsl(var(--muted))",
        dusty: "hsl(var(--dusty))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              counterReset: "line",
            },
            // 인라인 코드 스타일
            ":not(pre) > code": {
              fontWeight: "inherit",
              position: "relative",
              bottom: 1,
              margin: "0 3px",
              color: "#E569D1",
              backgroundColor: "rgba(135,131,120,0.15)",
              fontFamily:
                '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
              borderRadius: 3,
              padding: "0.2em 0.4em",
              overflowWrap: "break-word",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            // 라인 번호 스타일
            "code[data-line-numbers] > [data-line]::before": {
              counterIncrement: "line",
              content: "counter(line)",
              display: "inline-block",
              width: "1rem",
              marginRight: "1.4rem",
              textAlign: "right",
              color: "lightgrey",
              fontSize: "0.75rem",
            },
            // 라인 번호 자리수에 맞춰 스타일
            'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
              width: "1rem",
            },
            'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
              width: "2rem",
            },
            // 코드 블록 스타일
            pre: {
              paddingRight: 0,
              paddingLeft: 0,
              color: "var(--shiki-light)",
              backgroundColor: "var(--shiki-light-bg)",
              border: "1px solid #e5e7eb",
            },
            ".dark pre": {
              backgroundColor: "var(--shiki-dark-bg)",
              color: "var(--shiki-dark)",
              border: "1px solid #374151",
            },
            "pre > code > span": {
              paddingLeft: "1.1rem",
              paddingRight: "1rem",
            },
            "pre code span": {
              color: "var(--shiki-light)",
            },
            ".dark pre code span": {
              color: "var(--shiki-dark)",
            },
            // 강조된 라인 배경 색상
            "[data-highlighted-line]": {
              backgroundColor: "rgba(253, 224, 71, 0.2)",
            },
          },
        },
      },
    },
  },
  plugins: [typography, animate],
};
