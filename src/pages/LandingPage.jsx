// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
import ThemeToggle from "../components/ThemeToggle";

const FEATURES = [
  { icon: "📚", title: "Course Catalog",      desc: "Browse 50+ courses across CS, Mathematics, and Electronics with detailed descriptions and prerequisites.", accent: "#818cf8" },
  { icon: "🗓️", title: "Semester Planner",    desc: "Build your complete 8-semester roadmap with drag-and-drop simplicity and credit tracking.",               accent: "var(--accent)" },
  { icon: "📊", title: "Progress Tracker",    desc: "Visualize your degree completion with real-time dashboards and department-wise breakdowns.",               accent: "#34d399" },
  { icon: "⚙️", title: "Constraint Validator",desc: "Automatically detect prerequisite violations and credit overloads before they become problems.",           accent: "var(--error)" },
];

export default function LandingPage({ onGoStudentLogin, onGoAdminLogin, theme, toggleTheme }) {
  return (
    <div className="landing-page">

      {/* ══════════ NAV ════════════════════════════════════════════════ */}
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <div className="landing-nav-name" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            The Academic Course Planning System
          </div>
        </div>

        <div className="landing-nav-right">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button className="btn-nav-login" onClick={onGoAdminLogin}>Admin</button>
          <button className="btn-nav-cta" onClick={onGoStudentLogin}>Student Login →</button>
        </div>
      </nav>

      {/* ══════════ HERO ══════════════════════════════════════════════ */}
      <section className="landing-hero">
        <h1 className="landing-hero-title">
          Plan Your Academic Journey{" "}
          <span className="hl-accent">Smarter</span>
        </h1>

        <p className="landing-hero-sub">
          The all-in-one course planning system for engineering students. Browse courses, build semester plans, validate prerequisites, and track your degree completion — in one beautiful dashboard.
        </p>

        <div className="landing-hero-ctas">
          <button className="btn-hero-primary" onClick={onGoStudentLogin}>
            <span>🎓</span> Student Portal →
          </button>
          <button className="btn-hero-secondary" onClick={onGoAdminLogin}>
            <span>⚙️</span> Admin Portal
          </button>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════════════════════════════════════ */}
      <section className="features-section">
        <div className="features-inner">
          <div style={{ textAlign: "center" }}>
            <p className="section-eyebrow">What's Inside</p>
            <h2 className="section-title">Everything You Need to Graduate</h2>
            <p className="section-sub">Four powerful tools that work together to keep your academic journey on track.</p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{ "--fc-accent": f.accent, animationDelay: `${0.08 * i}s` }}
              >
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PORTAL SELECTION ══════════════════════════════════ */}
      <section className="portal-section">
        <p className="section-eyebrow">Choose Your Portal</p>
        <h2 className="section-title">Two Portals, One System</h2>
        <p className="section-sub">
          Whether you're a student planning your degree or an administrator managing the curriculum — we've got the right dashboard for you.
        </p>

        <div className="portal-cards">
          {/* Student Portal */}
          <div
            className="portal-card"
            style={{ "--pc-accent": "var(--accent)", "--pc-glow": "var(--accent-glow)", "--pc-muted": "var(--accent-muted)" }}
            onClick={onGoStudentLogin}
          >
            <div className="portal-card-icon">🎓</div>
            <span className="portal-card-badge" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid rgba(167,139,250,0.25)" }}>
              Student Portal
            </span>
            <div className="portal-card-title">For Students</div>
            <div className="portal-card-desc">
              Plan your entire degree from Semester 1 to 8. Browse courses, check prerequisites, and track your progress toward graduation.
            </div>
            <ul className="portal-card-perks">
              {["Semester-wise course planner", "Credit load validator", "Prerequisite checker", "Progress dashboard"].map((p, i) => (
                <li key={i}><span className="perk-dot" />{p}</li>
              ))}
            </ul>
            <button className="portal-btn" onClick={onGoStudentLogin}>Student Login →</button>
          </div>

          {/* Admin Portal */}
          <div
            className="portal-card"
            style={{ "--pc-accent": "#fbbf24", "--pc-glow": "rgba(251,191,36,0.2)", "--pc-muted": "rgba(251,191,36,0.1)" }}
            onClick={onGoAdminLogin}
          >
            <div className="portal-card-icon">⚙️</div>
            <span className="portal-card-badge" style={{ background: "rgba(251,191,36,0.12)", color: "var(--amber)", border: "1px solid rgba(251,191,36,0.25)" }}>
              Admin Portal
            </span>
            <div className="portal-card-title">For Administrators</div>
            <div className="portal-card-desc">
              Manage the course catalog, configure prerequisites, oversee student registrations, and control system settings.
            </div>
            <ul className="portal-card-perks">
              {["Course catalog management", "Prerequisite configuration", "Student account oversight", "System announcements"].map((p, i) => (
                <li key={i}><span className="perk-dot" style={{ background: "#fbbf24" }} />{p}</li>
              ))}
            </ul>
            <button className="portal-btn" style={{ background: "#fbbf24", color: "#000" }} onClick={onGoAdminLogin}>
              Admin Login →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ════════════════════════════════════════════ */}
      <footer className="landing-footer">
        <div className="landing-footer-inner" style={{ justifyContent: "center" }}>
          <span className="footer-meta mono">© 2026 The Nishith Ampaluri. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}