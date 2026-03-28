import { useState, useEffect } from "react"
import ThemeToggle from "../components/ThemeToggle"
import ProgressPage from "./ProgressPage"
import { usePlanner } from "../context/PlannerContext"

const NAV_LINKS = [
{ id:"home", label:"Dashboard", icon:"📊" },
{ id:"catalog", label:"Catalog", icon:"📚" },
{ id:"planner", label:"Planner", icon:"🗓️" },
{ id:"progress", label:"Progress", icon:"📈" },
{ id:"constraints", label:"Constraints", icon:"⚙️" }
]

export default function HomePage({ user, onLogout, theme, toggleTheme }) {

const [activeNav, setActiveNav] = useState("home")
const [greeting, setGreeting] = useState("Welcome")

const { state, totalCredits } = usePlanner()

useEffect(() => {
const h = new Date().getHours()
if (h < 12) setGreeting("Good morning")
else if (h < 17) setGreeting("Good afternoon")
else setGreeting("Good evening")
}, [])

const firstName = user?.name?.split(" ")[0] || "Student"

const coursesSelected =
Object.values(state.enrolled).flat().length

const semestersUsed =
Object.keys(state.enrolled).length || 8

return (
<div className="student-layout">

{/* NAVBAR */}
<nav className="navbar">
<div className="navbar-brand">AcadPlan</div>

<div className="navbar-links">
{NAV_LINKS.map(link => (
<button
key={link.id}
className={`nav-link ${activeNav === link.id ? "active" : ""}`}
onClick={() => setActiveNav(link.id)}
>
{link.icon} {link.label}
</button>
))}
</div>

<div className="navbar-right">
<ThemeToggle theme={theme} toggle={toggleTheme}/>
<button className="btn-logout" onClick={onLogout}>
Logout
</button>
</div>
</nav>

{/* MAIN */}
<main className="home-main">

{/* DASHBOARD */}
{activeNav === "home" && (
<>
<section className="dashboard-hero">
<h1 className="dashboard-title">
{greeting},{" "}
<span className="dashboard-gradient">
{firstName}
</span>
</h1>

<p className="hero-sub">
Plan your academic journey smarter.
</p>
</section>

<div className="dashboard-cards">

<div className="dashboard-card">
<h2>{coursesSelected}</h2>
<p>Courses Selected</p>
</div>

<div className="dashboard-card">
<h2>{totalCredits}</h2>
<p>Credits</p>
</div>

<div className="dashboard-card">
<h2>{semestersUsed}</h2>
<p>Semesters</p>
</div>

</div>
</>
)}

{/* PROGRESS */}
{activeNav === "progress" && (
<ProgressPage/>
)}

</main>

</div>
)
}