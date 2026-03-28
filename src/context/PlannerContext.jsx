import { createContext, useContext, useReducer } from "react"
import { courses, TOTAL_SEMESTERS } from "../data/courses"

const PlannerContext = createContext()

const initialState = {
  enrolled: {},   // { semester : [courseIds] }
  filter: "",
  department: "All"
}

function reducer(state, action){
  switch(action.type){

    case "ADD_COURSE":
      return {
        ...state,
        enrolled:{
          ...state.enrolled,
          [action.sem]: [
            ...(state.enrolled[action.sem] || []),
            action.courseId
          ]
        }
      }

    case "REMOVE_COURSE":
      return {
        ...state,
        enrolled:{
          ...state.enrolled,
          [action.sem]:
            state.enrolled[action.sem].filter(c => c !== action.courseId)
        }
      }

    case "SET_FILTER":
      return { ...state, filter: action.value }

    case "SET_DEPT":
      return { ...state, department: action.value }

    default:
      return state
  }
}

export function PlannerProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState)

  const totalCredits = Object.entries(state.enrolled).reduce(
    (sum,[sem,ids]) =>
      sum + ids.reduce(
        (s,id)=> s + courses.find(c=>c.id===id).credits ,0),
    0
  )

  return (
    <PlannerContext.Provider value={{
      state,
      dispatch,
      courses,
      totalCredits
    }}>
      {children}
    </PlannerContext.Provider>
  )
}

export const usePlanner = () => useContext(PlannerContext)