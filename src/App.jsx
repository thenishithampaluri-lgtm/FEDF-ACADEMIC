// ─── APP ROOT ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import "./App.css";

/* ── Portal pages ───────────────────────────────────────────────────────── */
import LandingPage       from "./pages/LandingPage";
import StudentLoginPage  from "./pages/StudentLoginPage";
import AdminLoginPage    from "./pages/AdminLoginPage";
import SignupPage        from "./pages/SignupPage";
import AdminDashboard    from "./pages/AdminDashboard";

/* ── Planner pages ──────────────────────────────────────────────────────── */
import DashboardPage     from "./pages/DashboardPage";
import CatalogPage       from "./pages/CatalogPage";
import PlannerPage       from "./pages/PlannerPage";
import ProgressPage      from "./pages/ProgressPage";
import ConstraintsPage   from "./pages/ConstraintsPage";

/* ── Layout ─────────────────────────────────────────────────────────────── */
import TopBar from "./components/layout/TopBar";
import { PlannerProvider } from "./context/PlannerContext";

/* ── Initial seed accounts ───────────────────────────────────────────────── */
const SEED_STUDENTS = [
  { name: "Demo Student", email: "student@acad.edu", password: "demo123" },
  { name: "Shouryaa Verma", email: "shouryaa@iit.edu", password: "pass123" },
];

const SEED_ADMINS = [
  { username: "admin", password: "admin123" },
  { username: "director", password: "dir2025" },
];

const PAGE = {
  LANDING: "landing",
  STUDENT_LOGIN: "student-login",
  SIGNUP: "signup",
  ADMIN_LOGIN: "admin-login",
  ADMIN_DASH: "admin-dash",

  DASHBOARD: "dashboard",
  CATALOG: "catalog",
  PLANNER: "planner",
  PROGRESS: "progress",
  CONSTRAINTS: "constraints"
};

export default function App(){

  const [theme,setTheme] = useState("dark");
  const [page,setPage] = useState(PAGE.LANDING);
  const [students,setStudents] = useState(SEED_STUDENTS);
  const [currentUser,setCurrentUser] = useState(null);
  const [currentAdmin,setCurrentAdmin] = useState(null);

  const toggleTheme = () =>
    setTheme(t => t==="dark" ? "light" : "dark");

  /* student login */
  function handleStudentLogin(email,password){
    const user = students.find(
      s => s.email===email && s.password===password
    );
    if(!user) return "Invalid credentials";
    setCurrentUser(user);
    setPage(PAGE.DASHBOARD);
    return null;
  }

  function handleSignup(data){
    setStudents(prev=>[...prev,data]);
    setCurrentUser(data);
    setPage(PAGE.DASHBOARD);
  }

  function handleStudentLogout(){
    setCurrentUser(null);
    setPage(PAGE.LANDING);
  }

  function handleAdminLogin(username,password){
    const admin = SEED_ADMINS.find(
      a => a.username===username && a.password===password
    );
    if(!admin) return "Invalid admin";
    setCurrentAdmin(admin);
    setPage(PAGE.ADMIN_DASH);
    return null;
  }

  const themeProps = {theme,toggleTheme};

  /* planner layout */
  const renderPlanner = () => (
    <PlannerProvider>

      <TopBar
        onNavigate={setPage}
        onLogout={handleStudentLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        active={page}
      />

      <div className="page">
        {page===PAGE.DASHBOARD && <DashboardPage/>}
        {page===PAGE.CATALOG && <CatalogPage/>}
        {page===PAGE.PLANNER && <PlannerPage/>}
        {page===PAGE.PROGRESS && <ProgressPage/>}
        {page===PAGE.CONSTRAINTS && <ConstraintsPage/>}
      </div>

    </PlannerProvider>
  );

  return(
    <div data-theme={theme}>

      {page===PAGE.LANDING && (
        <LandingPage
          {...themeProps}
          onGoStudentLogin={()=>setPage(PAGE.STUDENT_LOGIN)}
          onGoAdminLogin={()=>setPage(PAGE.ADMIN_LOGIN)}
        />
      )}

      {page===PAGE.STUDENT_LOGIN && (
        <StudentLoginPage
          {...themeProps}
          onLogin={handleStudentLogin}
          onGoSignup={()=>setPage(PAGE.SIGNUP)}
          onGoLanding={()=>setPage(PAGE.LANDING)}
        />
      )}

      {page===PAGE.SIGNUP && (
        <SignupPage
          {...themeProps}
          accounts={students}
          onSignup={handleSignup}
          onGoLogin={()=>setPage(PAGE.STUDENT_LOGIN)}
          onGoLanding={()=>setPage(PAGE.LANDING)}
        />
      )}

      {page===PAGE.ADMIN_LOGIN && (
        <AdminLoginPage
          {...themeProps}
          onAdminLogin={handleAdminLogin}
          onGoLanding={()=>setPage(PAGE.LANDING)}
        />
      )}

      {/* ADMIN DASHBOARD — FIXED */}
      {page===PAGE.ADMIN_DASH && (
        <AdminDashboard
          {...themeProps}
          admin={currentAdmin}
          students={students}     // ← added
          onLogout={()=>setPage(PAGE.LANDING)}
        />
      )}

      {currentUser && (
        page===PAGE.DASHBOARD ||
        page===PAGE.CATALOG ||
        page===PAGE.PLANNER ||
        page===PAGE.PROGRESS ||
        page===PAGE.CONSTRAINTS
      ) && renderPlanner()}

    </div>
  )
}