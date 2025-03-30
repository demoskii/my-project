import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--bg", "#1e1e1e");
      root.style.setProperty("--text", "#eee");
      root.style.setProperty("--accent", "#888");
      localStorage.setItem("theme", "dark");
    } else {
      root.style.setProperty("--bg", "#f4f4f4");
      root.style.setProperty("--text", "#111");
      root.style.setProperty("--accent", "#444");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      style={{
        padding: "5px 12px",
        marginLeft: "10px",
        background: "none",
        border: "1px solid var(--text)",
        borderRadius: "6px",
        color: "var(--text)",
        cursor: "pointer"
      }}
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggle;
