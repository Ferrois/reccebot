export default function logfilter(log) {
    
    if (log == "btn"){
        return " Button Pressed"
    }
    if (log == "pir"){
        return " Motion Detected"
    }
    if (log == "pir0"){
        return " PIR Off"
    }
    if (log == "pir1"){
        return " PIR On"
    }
    if (log == "usd0"){
        return " Radar Off"
    }
    if (log == "usd1"){
        return " Radar On"
    }
    if (log == "cam0"){
        return " CAM Off"
    }
    if (log == "cam1"){
        return " CAM On"
    }
    if (log == "movew"){
        return " Move Forward"
    }
    if (log == "moves"){
        return " Move Backward"
    }
    if (log == "movea"){
        return " Turn Left"
    }
    if (log == "moved"){
        return " Turn Right"
    }
    if (log == "snd1"){
        return " Sound Detected"
    }
    if (log == "snd"){
        return " Activated Alarm"
    }
    if (log?.slice(0,3) == "usd"){
        return ""
    }
    return "Received: " + log
}