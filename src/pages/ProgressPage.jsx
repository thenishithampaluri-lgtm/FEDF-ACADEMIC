import { usePlanner } from "../context/PlannerContext"
import { ProgressBar } from "../components/ui"

export default function ProgressPage(){

const {state,courses} = usePlanner()

const completed =
Object.values(state.enrolled).flat()

const totalCredits = 140

const earnedCredits =
completed.reduce((sum,id)=>{
const c = courses.find(x=>x.id===id)
return sum + (c?.credits || 0)
},0)

const percent = Math.round(
(earnedCredits/totalCredits)*100
)

return(
<div className="page">

<h2>Degree Progress</h2>

<h3>{earnedCredits} / {totalCredits} credits</h3>

<ProgressBar value={percent}/>

</div>
)
}