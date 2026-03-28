import { usePlanner } from "../../context/PlannerContext"
import { usePrereqCheck } from "../../hooks/useCoursePlanner"
import { Button, Badge } from "../ui"

export default function CourseCard({course}){

const {dispatch} = usePlanner()
const prereqOk = usePrereqCheck()(course)

function enroll(sem){
dispatch({
type:"ADD_COURSE",
courseId:course.id,
sem
})
}

return(
<div className="course-card">

<div className="course-header">
<h4>{course.name}</h4>
<Badge>{course.credits} cr</Badge>
</div>

<div className="course-meta">
<span className="mono">{course.dept}</span>
</div>

{course.prereq.length>0 && (
<div className="course-prereq">
Prereq: {course.prereq.join(", ")}
</div>
)}

<div className="course-actions">
<select
className="semester-select"
onChange={e=>enroll(e.target.value)}
disabled={!prereqOk}
>
<option>Select semester</option>
{[1,2,3,4,5,6,7,8].map(s=>(
<option key={s} value={s}>
Semester {s}
</option>
))}
</select>

<Button disabled={!prereqOk}>
Enroll
</Button>

</div>

</div>
)
}