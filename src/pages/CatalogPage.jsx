import CourseCard from "../components/courses/CourseCard"
import CourseFilterBar from "../components/courses/CourseFilterBar"
import { useCourseSearch } from "../hooks/useCoursePlanner"

export default function CatalogPage(){

const courses = useCourseSearch()

return(
<div className="page">

<h2>Course Catalog</h2>

<CourseFilterBar/>

<div className="course-grid">
{courses.map(c=>(
<CourseCard key={c.id} course={c}/>
))}
</div>

</div>
)
}