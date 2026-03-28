export function Button({children,...props}){
return(
<button className="btn-primary" {...props}>
{children}
</button>
)
}

export function Badge({children}){
return(
<span className="badge">
{children}
</span>
)
}

export function StatCard({title,value}){
return(
<div className="stat-card">
<div className="stat-value">{value}</div>
<div className="stat-title">{title}</div>
</div>
)
}

export function ProgressBar({value}){
return(
<div className="progress">
<div
className="progress-fill"
style={{width:`${value}%`}}
/>
</div>
)
}

export function Skeleton(){
return(
<div className="skeleton"/>
)
}