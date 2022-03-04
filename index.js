function Controls({breakTime, setBreakTime, sessionTime, setSessionTime}){
    function handleClick(e){
        const id=e.target.id
        if(id=="break-decrement" && breakTime>60)setBreakTime(prev=>prev-60)
        if(id=="break-increment" && breakTime<60*60)setBreakTime(prev=>prev+60)
        if(id=="session-decrement" && sessionTime>60)setSessionTime(prev=>prev-60)
        if(id=="session-increment" && sessionTime<60*60)setSessionTime(prev=>prev+60)
    }
    return(
        <div className="controls">
            <div className="flex controls-left">
                <div id="break-label">Break Length</div>
                <div className="arrows">
                    <i onClick={handleClick} id="break-decrement" className="fas fa-arrow-down"></i>
                    <div id="break-length">{breakTime/60}</div>
                    <i onClick={handleClick} id="break-increment" className="fas fa-arrow-up"></i>
                </div>
            </div>
            <div className="flex controls-right">
            <div id="session-label">Session Length</div>
                <div className="arrows">
                    <i onClick={handleClick} id="session-decrement" className="fas fa-arrow-down"></i>
                    <div id="session-length">{sessionTime/60}</div>
                    <i onClick={handleClick} id="session-increment" className="fas fa-arrow-up"></i>
                </div>
                
            </div>
        </div>
    )
}
function Timer({breakTime, setBreakTime, sessionTime, setSessionTime}){
    const [thisTime, setThisTime] = React.useState(sessionTime)
    const [start, setStart] = React.useState(true)
    
    // const [timeInt, setTimeInt] = React.useState(null)
    let intervalRef = React.useRef(null) //why do we need to use hooks useRef for setInterval to work?

    const [session, setSession] = React.useState(true)
    React.useEffect(()=>{
        setThisTime(sessionTime)
    },[sessionTime])
    function handleClick(e){
        const id=e.target.id
        if(id=="start_stop"){
            if(intervalRef.current){
                if(intervalRef.current==null)return
                clearInterval(intervalRef.current)
                intervalRef.current=null
                setStart(false)
                return
            }
            setStart(true)
            intervalRef.current=setInterval(()=>{
                setThisTime(time=>{
                    if(time>0)return time-1
                    return -1
                }) 
            },1000)
        }else if(id=="reset"){
            setThisTime(sessionTime)
            setStart(true)
            clearInterval(intervalRef.current)
            intervalRef.current=null
            setSession(true)
            setBreakTime(5*60)
            setSessionTime(25*60)
            document.getElementById("beep").pause()
            document.getElementById("beep").currentTime=0
        }
    }
    if(thisTime==-1){
        session? setThisTime(breakTime) : setThisTime(sessionTime)
        setSession(prev=>!prev)
        document.getElementById("beep").play()
    }
    return(
        <div className="timer">
            <div className="flex timer-top">
                <div id="timer-label">{session? "Session" : "Break"}</div>
                <div id="time-left">
                    <span className="mins">{(Math.floor(thisTime/60)).toString().padStart(2,"0")}</span>:<span className="secs">{(thisTime%60).toString().padStart(2,"0")}</span>
                </div>
            </div>
            <div className="timer-bottom">
                <button id="start_stop" onClick={handleClick}>Start / Pause</button>
                <button id="reset" onClick={handleClick}>reset</button>
            </div> 
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>      
        </div>
        
    )
}
function Clock(){
    const [breakTime, setBreakTime] = React.useState(5*60)
    const [sessionTime, setSessionTime] = React.useState(25*60)
    return(
        <div className="flex clock">
            <div className="header">25+5 Clock</div>
            <Controls breakTime={breakTime} setBreakTime={setBreakTime} sessionTime={sessionTime} setSessionTime={setSessionTime}/>
            <Timer sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime}setBreakTime={setBreakTime}/>
        </div>
    )
}
ReactDOM.render(<Clock/>,document.getElementById("root"))