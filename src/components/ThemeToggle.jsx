// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
// Reusable pill-style toggle — used on Login, Signup, and Home pages
// Props: theme ("dark"|"light"), toggle (function)

export default function ThemeToggle({ theme, toggle }) {
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sun / Moon icon */}
      <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>
        {isDark ? "☀️" : "🌙"}
      </span>

      {/* Sliding track */}
      <div className={`theme-toggle-track ${!isDark ? "on" : ""}`}>
        <div className={`theme-toggle-thumb ${!isDark ? "on" : ""}`} />
      </div>

      {/* Label */}
      <span style={{ fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", letterSpacing: "0.04em" }}>
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}