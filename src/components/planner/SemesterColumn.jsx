import { usePlanner } from "../../context/PlannerContext"
import { courses } from "../../data/courses"

export default function SemesterColumn({semester}){

const {state,dispatch} = usePlanner()

const enrolled = state.enrolled[semester] || []

function remove(courseId){
dispatch({
type:"REMOVE_COURSE",
courseId,
sem:semester
})
}

const totalCredits = enrolled.reduce((sum,id)=>{
const c = courses.find(x=>x.id===id)
return sum + (c?.credits || 0)
},0)

return(
<div className="semester-column">

<div className="semester-header">
<h3>Semester {semester}</h3>
<span className="mono">{totalCredits} credits</span>
</div>

<div className="semester-body">

{enrolled.length === 0 && (
<div className="semester-empty">
Drop courses here
</div>
)}

{enrolled.map(id=>{
const course = courses.find(c=>c.id===id)

return(
<div key={id} className="semester-course">

<div>
<div className="semester-course-title">
{course.name}
</div>

<div className="semester-course-meta mono">
{course.credits} cr
</div>
</div>

<button
className="semester-remove"
onClick={()=>remove(id)}
>
✕
</button>

</div>
)
})}

</div>

</div>
)
}