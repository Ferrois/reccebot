import { toast } from "react-toastify"


export default function logfilter(log) {
    
    if (log == "btn"){
        toast.error("Button has been pressed!!!");
        return " Button Pressed"
    }
    if (log == "pir"){
        toast.error("Motion has been detected.");
        return " Motion Detected"
    }
    if (log == "pir0"){
        return " PIR Off"
    }
    if (log == "pir1"){
        return " PIR On"
    }
    if (log == "radoff"){
        return " Radar Off"
    }
    if (log == "radon"){
        return " Radar On"
    }
    if (log == "camoff"){
        return " CAM Off"
    }
    if (log == "camon"){
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
        return " Voice Detected"
    }
    if (log == "snd"){
        return " Activated Alarm"
    }
    if (log?.slice(0,3) == "usd"){
        return ""
    }
    if (log == "aion"){
        return " AI Mode Activated"
    }
    if (log == "aioff"){
        return " AI Mode Deactivated"
    }
    return "Received: " + log
}