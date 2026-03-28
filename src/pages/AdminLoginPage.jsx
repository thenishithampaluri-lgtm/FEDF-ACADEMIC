// ─── ADMIN LOGIN PAGE ─────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminLoginPage({ onAdminLogin, onGoLanding, theme, toggleTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const userRef = useRef(null);

  useEffect(() => { userRef.current?.focus(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!username.trim()) return setError("Username is required.");
    if (!password)        return setError("Password is required.");

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);

    const err = onAdminLogin(username, password);
    if (err) setError(err);
  }

  function handleDemo() {
    setUsername("admin");
    setPassword("admin123");
  }

  return (
    <div className="auth-page">
      {/* Admin glow uses amber tones via CSS var overrides */}
      <div className="auth-glow-br" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 65%)" }} />

      <button className="auth-back-btn" onClick={onGoLanding}>← Back</button>

      <div className="auth-theme-toggle">
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>

      <div className="auth-card" style={{ borderTopColor: "rgba(251,191,36,0.4)" }}>
        {/* Top accent override — amber */}
        <style>{`.auth-card::before { background: linear-gradient(90deg, transparent, #fbbf24, transparent) !important; }`}</style>

        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">⚙️</span>
          <div className="auth-logo-title">
            The Academic Course<br />Planning System
          </div>
          <div className="auth-logo-sub mono" style={{ color: "#fbbf24" }}>v2025 · Administration</div>
        </div>

        {/* Portal badge */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <span className="portal-login-badge plb-admin">⚙️ Admin Portal</span>
        </div>

        <h2 className="auth-heading">Admin Sign In</h2>
        <p className="auth-subheading">Access the administration dashboard</p>

        {error && (
          <div className="alert alert-error" role="alert">
            <span>⚠&nbsp;</span>{error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="field-group">
            <label htmlFor="al-user" className="field-label">Username</label>
            <div className="field-wrap">
              <span className="field-icon">👤</span>
              <input
                ref={userRef}
                id="al-user"
                type="text"
                className="field-input"
                placeholder="admin"
                autoComplete="username"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                style={{ borderColor: undefined }}
                onFocus={e => e.target.style.borderColor = "#fbbf24"}
                onBlur={e => e.target.style.borderColor = ""}
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
              <label htmlFor="al-pass" className="field-label" style={{ margin: 0 }}>Password</label>
              <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)} style={{ position: "static", transform: "none" }}>
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            <div className="field-wrap">
              <span className="field-icon">🔑</span>
              <input
                id="al-pass"
                type={showPass ? "text" : "password"}
                className="field-input"
                placeholder="Enter admin password"
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit admin-submit" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Authenticating…</> : "Admin Sign In →"}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-label mono">or try demo</span>
          <div className="divider-line" />
        </div>

        <button className="demo-btn" onClick={handleDemo} style={{ borderColor: "rgba(251,191,36,0.25)" }}>
          🧪 &nbsp;Use demo admin credentials
        </button>

        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.65rem", color: "var(--text-muted)" }}>
            🔒 &nbsp;Restricted access · Authorised personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
