import { usePlanner } from "../../context/PlannerContext"

export default function CourseFilterBar(){

const {state,dispatch} = usePlanner()

return(
<div className="filter-bar">

<input
placeholder="Search course..."
value={state.filter}
onChange={e=>dispatch({
type:"SET_FILTER",
value:e.target.value
})}
/>

<select
value={state.department}
onChange={e=>dispatch({
type:"SET_DEPT",
value:e.target.value
})}
>
<option value="All">All</option>
<option value="CS">CS</option>
<option value="Math">Math</option>
<option value="Electronics">Electronics</option>
</select>

</div>
)
}