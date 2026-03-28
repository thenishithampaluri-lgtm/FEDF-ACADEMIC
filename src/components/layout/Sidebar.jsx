export default function Sidebar({ onNavigate, active }) {

  const links = [
    { id: "dashboard",   label: "Dashboard",   icon: "📊" },
    { id: "catalog",     label: "Catalog",     icon: "📚" },
    { id: "planner",     label: "Planner",     icon: "🗓️" },
    { id: "progress",    label: "Progress",    icon: "📈" },
    { id: "constraints", label: "Constraints", icon: "⚙️" }
  ]

  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <div className="logo">A</div>
        <div>
          <div className="logo-title">AcadPlan</div>
          <div className="logo-sub mono">Planner</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(l => (
          <button
            key={l.id}
            className={`sidebar-link ${active === l.id ? "active" : ""}`}
            onClick={() => onNavigate(l.id)}
          >
            <span>{l.icon}</span>
            {l.label}
          </button>
        ))}
      </nav>

    </aside>
  )
}