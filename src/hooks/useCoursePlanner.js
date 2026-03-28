import { usePlanner } from "../context/PlannerContext"

export function useCourseSearch(){
  const { courses, state } = usePlanner()

  return courses.filter(c=>{
    const matchText =
      c.name.toLowerCase().includes(state.filter.toLowerCase())

    const matchDept =
      state.department === "All" ||
      c.dept === state.department

    return matchText && matchDept
  })
}

export function usePrereqCheck(){
  const { state } = usePlanner()

  return (course)=>{
    return course.prereq.every(pr =>
      Object.values(state.enrolled).flat().includes(pr)
    )
  }
}

export function useAsyncCourseLoad(){
  const { courses } = usePlanner()
  return new Promise(resolve=>{
    setTimeout(()=>resolve(courses),600)
  })
}