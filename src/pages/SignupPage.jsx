// ─── SIGNUP PAGE — Multi-Step ─────────────────────────────────────────────────
// Step 1: Account credentials
// Step 2: Personal details
// Step 3: Education details

import { useState, useRef, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

function getStrength(pw) {
  if (!pw) return { score: 0, label: "", bars: [] };
  let score = 0;
  if (pw.length >= 8)          score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "s-weak", "s-fair", "s-good", "s-strong"];
  const bars   = Array.from({ length: 4 }, (_, i) => (i < score ? colors[score] : ""));
  return { score, label: labels[score], bars };
}

function StepBar({ current }) {
  const steps = ["Account", "Personal", "Education"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", fontWeight: 600,
            background: i < current ? "var(--accent)" : i === current ? "var(--accent-muted)" : "var(--bg-elevated)",
            border: `2px solid ${i <= current ? "var(--accent)" : "var(--border-mid)"}`,
            color: i < current ? "white" : i === current ? "var(--accent)" : "var(--text-muted)",
            transition: "all 0.3s",
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          <span style={{
            fontSize: "0.65rem", fontFamily: "'Fira Code', monospace",
            color: i === current ? "var(--accent)" : i < current ? "var(--success)" : "var(--text-muted)",
            marginLeft: 6, whiteSpace: "nowrap", letterSpacing: "0.03em",
          }}>
            {s}
          </span>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 2, margin: "0 10px",
              background: i < current ? "var(--accent)" : "var(--border-soft)",
              borderRadius: 2, transition: "background 0.4s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, icon, id, children }) {
  return (
    <div className="field-group">
      <label htmlFor={id} className="field-label">{label}</label>
      <div className="field-wrap">
        <span className="field-icon">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function Sel({ id, value, onChange, placeholder, children }) {
  return (
    <select id={id} value={value} onChange={onChange} className="field-input"
      style={{ paddingLeft: "2.6rem", appearance: "none", cursor: "pointer" }}>
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
}

const STATES_IN = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Chandigarh","Puducherry"];

export default function SignupPage({ accounts, onSignup, onGoLogin, onGoLanding, theme, toggleTheme }) {
  const [step, setStep] = useState(0);

  // Step 0
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Step 1 — Personal
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [pincode, setPincode] = useState("");
  const [nationality, setNationality] = useState("Indian");

  // Step 2 — Education
  const [rollNo, setRollNo] = useState("");
  const [program, setProgram] = useState("");
  const [branch, setBranch] = useState("");
  const [semesterVal, setSemesterVal] = useState("");
  const [batch, setBatch] = useState("");
  const [college, setCollege] = useState("");
  const [tenthPct, setTenthPct] = useState("");
  const [twelfthPct, setTwelfthPct] = useState("");
  const [entranceExam, setEntranceExam] = useState("");
  const [entranceRank, setEntranceRank] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => { setTimeout(() => firstRef.current?.focus(), 50); }, [step]);

  const strength = getStrength(password);
  const passMatch = confirm && password === confirm;
  const passMismatch = confirm && password !== confirm;
  const labelColors = { "s-weak": "var(--error)", "s-fair": "var(--amber)", "s-good": "var(--success)", "s-strong": "var(--accent)" };

  function validateStep0() {
    if (!name.trim()) return "Full name is required.";
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!email.trim()) return "Email address is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    if (accounts.some(a => a.email.toLowerCase() === email.trim().toLowerCase())) return "An account with this email already exists.";
    return null;
  }

  function validateStep1() {
    if (!phone.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) return "Enter a valid 10-digit phone number.";
    if (!dob) return "Date of birth is required.";
    if (!gender) return "Please select your gender.";
    if (!address.trim()) return "Address is required.";
    if (!city.trim()) return "City is required.";
    if (!stateVal) return "Please select your state.";
    return null;
  }

  function validateStep2() {
    if (!rollNo.trim()) return "Roll number is required.";
    if (!program) return "Please select your program.";
    if (!branch) return "Please select your branch.";
    if (!semesterVal) return "Please select your current semester.";
    if (!batch.trim()) return "Batch / joining year is required.";
    if (!college.trim()) return "College name is required.";
    return null;
  }

  function handleNext(e) {
    e.preventDefault();
    setError("");
    const err = step === 0 ? validateStep0() : validateStep1();
    if (err) return setError(err);
    setStep(s => s + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const err = validateStep2();
    if (err) return setError(err);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    onSignup({
      name: name.trim(), email: email.trim().toLowerCase(), password,
      phone, dob, gender, address, city, state: stateVal, pincode, nationality,
      rollNo, program, branch, semester: Number(semesterVal), batch, college,
      tenthPct, twelfthPct, entranceExam, entranceRank,
    });
  }

  const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" };

  return (
    <div className="auth-page" style={{ padding: "2rem 1rem", alignItems: "flex-start", paddingTop: "4.5rem" }}>
      <div className="auth-glow-br" />

      <button className="auth-back-btn" onClick={step > 0 ? () => { setStep(s => s - 1); setError(""); } : onGoLanding}>
        ← {step > 0 ? "Back" : "Home"}
      </button>

      <div className="auth-theme-toggle">
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>

      <div className="auth-card" style={{ maxWidth: 560, width: "100%", margin: "0 auto" }}>

        {/* Logo */}
        <div className="auth-logo" style={{ marginBottom: "1.25rem" }}>
          <span className="auth-logo-icon" style={{ fontSize: "2rem" }}>🎓</span>
          <div className="auth-logo-title" style={{ fontSize: "1.05rem" }}>The Academic Course Planning System</div>
          <div className="auth-logo-sub mono">Student Registration</div>
        </div>

        <StepBar current={step} />

        {step === 0 && <><h2 className="auth-heading">Create Account</h2><p className="auth-subheading">Set up your login credentials</p></>}
        {step === 1 && <><h2 className="auth-heading">Personal Details</h2><p className="auth-subheading">Tell us about yourself</p></>}
        {step === 2 && <><h2 className="auth-heading">Education Details</h2><p className="auth-subheading">Your academic background and enrollment info</p></>}

        {error && <div className="alert alert-error" role="alert"><span>⚠&nbsp;</span>{error}</div>}

        {/* ── STEP 0 ─────────────────────────────────────────────────── */}
        {step === 0 && (
          <form onSubmit={handleNext} noValidate>
            <Field label="Full Name" icon="👤" id="s0-name">
              <input ref={firstRef} id="s0-name" type="text" className="field-input"
                placeholder="e.g. Shouryaa Verma" autoComplete="name"
                value={name} onChange={e => { setName(e.target.value); setError(""); }} />
            </Field>

            <Field label="Email Address" icon="✉" id="s0-email">
              <input id="s0-email" type="email" className="field-input"
                placeholder="you@example.com" autoComplete="email"
                value={email} onChange={e => { setEmail(e.target.value); setError(""); }} />
            </Field>

            <div className="field-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                <label htmlFor="s0-pass" className="field-label" style={{ margin: 0 }}>Password</label>
                <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)} style={{ position: "static", transform: "none" }}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input id="s0-pass" type={showPass ? "text" : "password"} className="field-input"
                  placeholder="Min. 6 characters" autoComplete="new-password"
                  value={password} onChange={e => { setPassword(e.target.value); setError(""); }} />
              </div>
              {password && (
                <div className="strength-wrap">
                  <div className="strength-bars">{strength.bars.map((cls, i) => <div key={i} className={`strength-bar ${cls}`} />)}</div>
                  <div className="strength-label mono" style={{ color: labelColors[strength.bars.find(Boolean)] || "var(--text-muted)" }}>
                    {strength.label}{strength.score < 3 && " — add numbers or symbols"}
                  </div>
                </div>
              )}
            </div>

            <Field label="Confirm Password" icon="🔑" id="s0-confirm">
              <input id="s0-confirm" type={showPass ? "text" : "password"} className="field-input"
                placeholder="Re-enter your password" autoComplete="new-password"
                value={confirm}
                style={{ borderColor: passMatch ? "var(--success)" : passMismatch ? "var(--error)" : undefined, boxShadow: passMatch ? "0 0 0 4px var(--success-bg)" : passMismatch ? "0 0 0 4px var(--error-bg)" : undefined }}
                onChange={e => { setConfirm(e.target.value); setError(""); }} />
            </Field>
            {passMatch    && <p className="match-hint mono match-ok">✓ Passwords match</p>}
            {passMismatch && <p className="match-hint mono match-error">✗ Passwords do not match</p>}

            <button type="submit" className="btn-submit" style={{ marginTop: "1rem" }}>Continue to Personal Details →</button>
            <p className="auth-footer">Already have an account?&nbsp;<button className="auth-link" type="button" onClick={onGoLogin}>Sign in</button></p>
          </form>
        )}

        {/* ── STEP 1 ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleNext} noValidate>
            <div style={gridTwo}>
              <Field label="Phone Number" icon="📞" id="s1-phone">
                <input ref={firstRef} id="s1-phone" type="tel" className="field-input"
                  placeholder="10-digit number" value={phone}
                  onChange={e => { setPhone(e.target.value); setError(""); }} />
              </Field>
              <Field label="Date of Birth" icon="🎂" id="s1-dob">
                <input id="s1-dob" type="date" className="field-input"
                  value={dob} max={new Date().toISOString().split("T")[0]}
                  onChange={e => { setDob(e.target.value); setError(""); }} />
              </Field>
            </div>

            <div style={gridTwo}>
              <Field label="Gender" icon="⚧" id="s1-gender">
                <Sel id="s1-gender" value={gender} placeholder="Select gender" onChange={e => { setGender(e.target.value); setError(""); }}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not">Prefer not to say</option>
                </Sel>
              </Field>
              <Field label="Nationality" icon="🌍" id="s1-nat">
                <Sel id="s1-nat" value={nationality} onChange={e => setNationality(e.target.value)}>
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </Sel>
              </Field>
            </div>

            <div className="field-group">
              <label className="field-label">Address</label>
              <div className="field-wrap">
                <span className="field-icon" style={{ top: "1rem" }}>🏠</span>
                <textarea className="field-input" placeholder="Door No., Street, Locality"
                  value={address} rows={2}
                  style={{ paddingLeft: "2.6rem", resize: "vertical", minHeight: 56 }}
                  onChange={e => { setAddress(e.target.value); setError(""); }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 0.8fr", gap: "0 0.75rem" }}>
              <Field label="City" icon="🏙️" id="s1-city">
                <input id="s1-city" type="text" className="field-input" placeholder="City"
                  value={city} onChange={e => { setCity(e.target.value); setError(""); }} />
              </Field>
              <Field label="State" icon="📍" id="s1-state">
                <Sel id="s1-state" value={stateVal} placeholder="State" onChange={e => { setStateVal(e.target.value); setError(""); }}>
                  {STATES_IN.map(s => <option key={s} value={s}>{s}</option>)}
                </Sel>
              </Field>
              <Field label="Pincode" icon="#" id="s1-pin">
                <input id="s1-pin" type="text" className="field-input" placeholder="000000"
                  maxLength={6} value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/, ""))} />
              </Field>
            </div>

            <button type="submit" className="btn-submit" style={{ marginTop: "0.75rem" }}>Continue to Education Details →</button>
          </form>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate>
            <div style={gridTwo}>
              <Field label="Roll / Reg. Number" icon="🆔" id="s2-roll">
                <input ref={firstRef} id="s2-roll" type="text" className="field-input"
                  placeholder="e.g. 22CS101" value={rollNo}
                  onChange={e => { setRollNo(e.target.value.toUpperCase()); setError(""); }} />
              </Field>
              <Field label="Batch" icon="📅" id="s2-batch">
                <input id="s2-batch" type="text" className="field-input"
                  placeholder="e.g. 2022–26" value={batch}
                  onChange={e => { setBatch(e.target.value); setError(""); }} />
              </Field>
            </div>

            <div style={gridTwo}>
              <Field label="Program" icon="🎓" id="s2-prog">
                <Sel id="s2-prog" value={program} placeholder="Program" onChange={e => { setProgram(e.target.value); setError(""); }}>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E.">B.E.</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                </Sel>
              </Field>
              <Field label="Current Semester" icon="📆" id="s2-sem">
                <Sel id="s2-sem" value={semesterVal} placeholder="Semester" onChange={e => { setSemesterVal(e.target.value); setError(""); }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                </Sel>
              </Field>
            </div>

            <Field label="Branch / Specialisation" icon="🔬" id="s2-branch">
              <Sel id="s2-branch" value={branch} placeholder="Select branch" onChange={e => { setBranch(e.target.value); setError(""); }}>
                <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                <option value="Electronics & Communication">Electronics &amp; Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mathematics & Computing">Mathematics &amp; Computing</option>
              </Sel>
            </Field>

            <Field label="College / University" icon="🏛️" id="s2-college">
              <input id="s2-college" type="text" className="field-input"
                placeholder="Full institution name" value={college}
                onChange={e => { setCollege(e.target.value); setError(""); }} />
            </Field>

            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.63rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem", marginTop: "0.25rem" }}>
              Previous Qualifications (Optional)
            </p>

            <div style={gridTwo}>
              <Field label="10th %" icon="📝" id="s2-10">
                <input id="s2-10" type="text" className="field-input" placeholder="e.g. 92.4%"
                  value={tenthPct} onChange={e => setTenthPct(e.target.value)} />
              </Field>
              <Field label="12th %" icon="📝" id="s2-12">
                <input id="s2-12" type="text" className="field-input" placeholder="e.g. 88.0%"
                  value={twelfthPct} onChange={e => setTwelfthPct(e.target.value)} />
              </Field>
            </div>

            <div style={gridTwo}>
              <Field label="Entrance Exam" icon="📋" id="s2-exam">
                <Sel id="s2-exam" value={entranceExam} placeholder="Select exam" onChange={e => setEntranceExam(e.target.value)}>
                  <option value="JEE Main">JEE Main</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="GATE">GATE</option>
                  <option value="BITSAT">BITSAT</option>
                  <option value="VITEEE">VITEEE</option>
                  <option value="State CET">State CET</option>
                  <option value="Other">Other</option>
                </Sel>
              </Field>
              <Field label="Rank / Score" icon="🏆" id="s2-rank">
                <input id="s2-rank" type="text" className="field-input" placeholder="e.g. 4523"
                  value={entranceRank} onChange={e => setEntranceRank(e.target.value)} />
              </Field>
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: "0.75rem" }}>
              {loading ? <><span className="btn-spinner" /> Creating account…</> : "Complete Registration →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
