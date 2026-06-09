import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx
var MarkdownTypewriter = ({
  markdown,
  delay = 75,
  charsPerTick = 1,
  layout = "stack",
  className = "",
  style,
  showRaw = false,
  onComplete
}) => {
  const [typed, setTyped] = useState("");
  const timerRef = useRef(null);
  useEffect(() => {
    if (document.getElementById("mtw-caret-style")) return;
    const styleEl = document.createElement("style");
    styleEl.id = "mtw-caret-style";
    styleEl.textContent = `
      .markdown-typewriter .mtw-raw { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; white-space: pre-wrap; }
      .markdown-typewriter .mtw-caret { display: inline-block; width: 0; border-right: 2px solid currentColor; margin-left: 2px; animation: mtw-blink 1s steps(1,end) infinite; }
      .markdown-typewriter.mtw-split .mtw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
      .markdown-typewriter table { border-collapse: collapse; width: 100%; margin: 16px 0; }
      .markdown-typewriter th, .markdown-typewriter td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
      .markdown-typewriter th { background-color: #f5f5f5; font-weight: 600; }
      .markdown-typewriter tr:nth-child(even) { background-color: #f9f9f9; }
      @keyframes mtw-blink { 50% { border-color: transparent; } }
    `;
    document.head.appendChild(styleEl);
  }, []);
  useEffect(() => {
    setTyped("");
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    let i = 0;
    const step = Math.max(1, Math.floor(charsPerTick));
    timerRef.current = window.setInterval(
      () => {
        i = Math.min(markdown.length, i + step);
        setTyped(markdown.slice(0, i));
        if (i >= markdown.length && timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
          onComplete?.();
          console.log("Typing complete, onComplete callback fired");
        }
      },
      Math.max(10, delay)
    );
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [markdown, delay, charsPerTick]);
  const split = showRaw && layout === "split";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `markdown-typewriter ${split ? "mtw-split" : ""} ${className}`.trim(),
      style,
      children: /* @__PURE__ */ jsxs("div", { className: "mtw-grid", children: [
        showRaw && /* @__PURE__ */ jsxs("pre", { className: "mtw-raw", children: [
          /* @__PURE__ */ jsx("code", { children: typed }),
          /* @__PURE__ */ jsx("span", { className: "mtw-caret" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mtw-rendered", children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: typed }) })
      ] })
    }
  );
};
var index_default = MarkdownTypewriter;

export { index_default as default };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map