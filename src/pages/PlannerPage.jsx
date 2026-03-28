import SemesterColumn from "../components/planner/SemesterColumn"

export default function PlannerPage(){

return(
<div className="page">

<h2>Semester Planner</h2>

<div className="semester-grid">
{[1,2,3,4,5,6,7,8].map(s=>(
<SemesterColumn key={s} semester={s}/>
))}
</div>

</div>
)
}