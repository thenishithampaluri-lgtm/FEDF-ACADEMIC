import ThemeToggle from "../ThemeToggle"

export default function TopBar({onNavigate,onLogout,theme,toggleTheme,active}){

const links = [
{ id:"dashboard", label:"Dashboard", icon:"📊" },
{ id:"catalog", label:"Catalog", icon:"📚" },
{ id:"planner", label:"Planner", icon:"🗓️" },
{ id:"progress", label:"Progress", icon:"📈" },
{ id:"constraints", label:"Constraints", icon:"⚙️" }
]

return(
<header className="topbar">

<div className="topbar-left">
<div className="topbar-title">AcadPlan</div>

<div className="topbar-nav">
{links.map(l=>(
<button
key={l.id}
className={`topbar-link ${active===l.id?"active":""}`}
onClick={()=>onNavigate(l.id)}
>
<span>{l.icon}</span>
{l.label}
</button>
))}
</div>
</div>

<div className="topbar-right">
<ThemeToggle theme={theme} toggle={toggleTheme}/>
<button className="btn-logout" onClick={onLogout}>
Logout
</button>
</div>

</header>
)
}