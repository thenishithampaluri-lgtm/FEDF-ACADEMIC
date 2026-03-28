import { useState } from "react"
import ThemeToggle from "../components/ThemeToggle"

export default function AdminDashboard({
  admin,
  students,
  theme,
  toggleTheme,
  onLogout
}) {

  const [tab,setTab] = useState("dashboard")

  const [courses,setCourses] = useState([
    { id:1, name:"Data Structures", credits:3 },
    { id:2, name:"Operating Systems", credits:4 }
  ])

  const [form,setForm] = useState({ name:"", credits:"" })

  function addCourse(){
    if(!form.name || !form.credits) return
    setCourses([
      ...courses,
      { id:Date.now(), name:form.name, credits:form.credits }
    ])
    setForm({ name:"", credits:"" })
  }

  function removeCourse(id){
    setCourses(courses.filter(c=>c.id!==id))
  }

  const tabs = [
    { id:"dashboard", label:"Dashboard" },
    { id:"courses", label:"Courses" },
    { id:"students", label:"Students" }
  ]

  return (
    <div className="admin-container">

      {/* TOP BAR */}
      <header className="admin-topbar">

        <div className="admin-tabs">
          {tabs.map(t=>(
            <button
              key={t.id}
              className={`admin-tab ${tab===t.id?"active":""}`}
              onClick={()=>setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin-actions">
          <ThemeToggle theme={theme} toggle={toggleTheme}/>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

      </header>

      {/* CONTENT */}
      <div className="admin-content">

        {tab==="dashboard" && (
          <>
            {/* HERO */}
            <section className="admin-hero">
              <h1 className="admin-title">
                Welcome <span className="gradient-text">
                  {admin?.username || "Admin"}
                </span>
              </h1>

              <p className="admin-sub">
                Manage courses, students, and system settings from one dashboard.
              </p>
            </section>

            {/* DASHBOARD CARDS */}
            <div className="admin-cards">

              <div className="admin-card">
                <h4>Total Students</h4>
                <p>{students.length}</p>
              </div>

              <div className="admin-card">
                <h4>Total Courses</h4>
                <p>{courses.length}</p>
              </div>

              <div className="admin-card">
                <h4>System Status</h4>
                <p>Active</p>
              </div>

            </div>
          </>
        )}

        {tab==="courses" && (
          <div className="admin-section">

            <h3>Course Management</h3>

            <div className="admin-form">
              <input
                placeholder="Course name"
                value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})}
              />

              <input
                placeholder="Credits"
                value={form.credits}
                onChange={e=>setForm({...form,credits:e.target.value})}
              />

              <button onClick={addCourse}>Add</button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Credits</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {courses.map(c=>(
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.credits}</td>
                    <td>
                      <button onClick={()=>removeCourse(c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {tab==="students" && (
          <div className="admin-section">

            <h3>Registered Students</h3>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s,i)=>(
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  )
}