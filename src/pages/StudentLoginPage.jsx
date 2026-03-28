// ─── STUDENT LOGIN PAGE ───────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function StudentLoginPage({ onLogin, onGoSignup, onGoLanding, theme, toggleTheme }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const emailRef = useRef(null);

  useEffect(() => { emailRef.current?.focus(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim())               return setError("Email address is required.");
    if (!password)                   return setError("Password is required.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email address.");

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);

    const err = onLogin(email, password);
    if (err) setError(err);
  }

  function handleDemo() {
    setEmail("student@acad.edu");
    setPassword("demo123");
  }

  return (
    <div className="auth-page">
      <div className="auth-glow-br" />

      {/* Back */}
      <button className="auth-back-btn" onClick={onGoLanding}>
        ← Back
      </button>

      {/* Theme toggle */}
      <div className="auth-theme-toggle">
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">🎓</span>
          <div className="auth-logo-title">
            The Academic Course<br />Planning System
          </div>
          <div className="auth-logo-sub mono">v2025 · Student Portal</div>
        </div>

        {/* Portal badge */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <span className="portal-login-badge plb-student">🎓 Student Login</span>
        </div>

        <h2 className="auth-heading">Welcome back</h2>
        <p className="auth-subheading">Sign in to access your course dashboard</p>

        {error && (
          <div className="alert alert-error" role="alert">
            <span>⚠&nbsp;</span>{error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="field-group">
            <label htmlFor="sl-email" className="field-label">Email Address</label>
            <div className="field-wrap">
              <span className="field-icon">✉</span>
              <input
                ref={emailRef}
                id="sl-email"
                type="email"
                className="field-input"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
              <label htmlFor="sl-pass" className="field-label" style={{ margin: 0 }}>Password</label>
              <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)} style={{ position: "static", transform: "none" }}>
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            <div className="field-wrap">
              <span className="field-icon">🔒</span>
              <input
                id="sl-pass"
                type={showPass ? "text" : "password"}
                className="field-input"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Signing in…</> : "Sign In →"}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-label mono">or try demo</span>
          <div className="divider-line" />
        </div>

        <button className="demo-btn" onClick={handleDemo}>
          🧪 &nbsp;Use demo credentials
        </button>

        <p className="auth-footer">
          Don't have an account?&nbsp;
          <button className="auth-link" onClick={onGoSignup}>Create one</button>
        </p>
      </div>
    </div>
  );
}
