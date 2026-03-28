import { usePlanner } from "../context/PlannerContext"
import { StatCard } from "../components/ui"

export default function DashboardPage(){

const {state,courses} = usePlanner()

const totalCourses =
Object.values(state.enrolled).flat().length

const totalCredits =
Object.values(state.enrolled)
.flat()
.reduce((sum,id)=>{
const c = courses.find(x=>x.id===id)
return sum + (c?.credits || 0)
},0)

return(
<div className="page">

<h2>Dashboard</h2>

<div className="stats-grid">
<StatCard title="Courses Selected" value={totalCourses}/>
<StatCard title="Credits" value={totalCredits}/>
<StatCard title="Semesters" value="8"/>
</div>

</div>
)
}