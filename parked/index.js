function Clock(){
    const [time, setTime] = React.useState(2*60)
    const [timeInt, setTimeInt] = React.useState(null)
    function handleClick(){
        setTimeInt(setInterval(()=>{
            setTime(prev=>prev-1)
        },130))
    }
    if(time==0)setTime(-1)
    React.useEffect(()=>{
        if(time==-1){
            setTime(2*60)
        }
    },[time])
    return(
        <div className="clock">
            <span className="mins">{(Math.floor(time/60)).toString().padStart(2,"0")}</span>:<span className="secs">{(time%60).toString().padStart(2,"0")}</span>
            <button onClick={handleClick}>Start timer</button>
        </div>
    )
}
ReactDOM.render(<Clock/>,document.getElementById("root"))