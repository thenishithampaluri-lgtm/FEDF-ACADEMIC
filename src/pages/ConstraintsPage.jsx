import { usePlanner } from "../context/PlannerContext"

export default function ConstraintsPage(){

const {state,courses} = usePlanner()

const violations = []

Object.entries(state.enrolled).forEach(([sem,ids])=>{
ids.forEach(id=>{
const course = courses.find(c=>c.id===id)

course.prereq.forEach(pr=>{
const taken =
Object.values(state.enrolled)
.flat()
.includes(pr)

if(!taken){
violations.push(
`${course.name} missing prereq ${pr}`
)
}
})
})
})

return(
<div className="page">

<h2>Constraint Checker</h2>

{violations.length===0 ? (
<p>No violations</p>
) : (
<ul>
{violations.map((v,i)=>(
<li key={i}>{v}</li>
))}
</ul>
)}

</div>
)
}