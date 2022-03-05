That was really challenging. Spent a lot of time to (1) implement the mins and secs part (2) get the timer right i.e. setInterval worked when using React hooks useRef but not otherwise. Still have to figure out why!!!

# Sat, 5 March 2022

## my bad! prob;em was not that setInterval worke only when using useRef

### problem was I used this:

    setThisTime(time=>{
                        if(time>0)return time-1
                    })
    ....
    if(thisTime==0){
    ....

### instead of this:

    setThisTime(time=>{
                        if(time>0)return time-1
                        return -1
                    })
    ....
    if(thisTime==-1){
    ....

hence the error: Timer has not yet reached 00:00
