export const TOTAL_SEMESTERS = 8
export const MAX_CREDITS = 18

export const courses = [
  { id:"CS101", name:"Programming Fundamentals", credits:3, dept:"CS", semester:1, prereq:[] },
  { id:"MA101", name:"Calculus I", credits:4, dept:"Math", semester:1, prereq:[] },
  { id:"PH101", name:"Physics", credits:3, dept:"Electronics", semester:1, prereq:[] },
  { id:"CS102", name:"Data Structures", credits:3, dept:"CS", semester:2, prereq:["CS101"] },
  { id:"MA102", name:"Linear Algebra", credits:4, dept:"Math", semester:2, prereq:["MA101"] },
  { id:"CS201", name:"Algorithms", credits:3, dept:"CS", semester:3, prereq:["CS102"] },
  { id:"CS202", name:"Computer Organization", credits:3, dept:"CS", semester:3, prereq:["CS102"] },
  { id:"CS301", name:"Operating Systems", credits:3, dept:"CS", semester:4, prereq:["CS201"] },
  { id:"CS302", name:"Database Systems", credits:3, dept:"CS", semester:4, prereq:["CS201"] },
  { id:"CS303", name:"Networks", credits:3, dept:"CS", semester:5, prereq:["CS301"] },
  { id:"CS304", name:"Software Engineering", credits:3, dept:"CS", semester:5, prereq:["CS302"] },
  { id:"CS401", name:"Machine Learning", credits:3, dept:"CS", semester:6, prereq:["CS303"] },
  { id:"CS402", name:"Distributed Systems", credits:3, dept:"CS", semester:6, prereq:["CS301"] },
  { id:"CS403", name:"Compiler Design", credits:3, dept:"CS", semester:7, prereq:["CS302"] },
  { id:"CS404", name:"Cloud Computing", credits:3, dept:"CS", semester:7, prereq:["CS303"] },
  { id:"CS499", name:"Capstone Project", credits:4, dept:"CS", semester:8, prereq:["CS401","CS403"] }
]