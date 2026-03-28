export default function ProgressWheel({percent}){

const radius = 70
const stroke = 10
const normalized = radius - stroke/2
const circumference = normalized * 2 * Math.PI
const offset = circumference - percent/100 * circumference

return(
<div className="progress-wheel">

<svg height="160" width="160">

<circle
stroke="#eee"
fill="transparent"
strokeWidth={stroke}
r={normalized}
cx="80"
cy="80"
/>

<circle
stroke="url(#grad)"
fill="transparent"
strokeWidth={stroke}
strokeDasharray={`${circumference} ${circumference}`}
strokeDashoffset={offset}
r={normalized}
cx="80"
cy="80"
style={{transition:"stroke-dashoffset .4s"}}
/>

<defs>
<linearGradient id="grad">
<stop offset="0%" stopColor="#7c3aed"/>
<stop offset="100%" stopColor="#f97316"/>
</linearGradient>
</defs>

</svg>

<div className="progress-text">
{percent}%
</div>

</div>
)
}