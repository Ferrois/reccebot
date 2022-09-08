import React, { useContext } from "react";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import {FaRobot} from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../Uncategorised/Button";

export default function AI({ handleSendMessage }) {
    const {aiData} = useContext(GlobalContext);
    const [ai,setAi] = aiData;
  return (
    <div className="bg-gray-775 rounded-md ml-1 px-2">
        <div className="mt-1 text-xs text-gray-400 ">Automate (AI)</div>
      <div className="flex mt-0 items-center">
        <Button onClick={()=>handleSendMessage("rcai1")}><BsFillPlayFill/></Button>
        <Button onClick={()=>handleSendMessage("rcai0")}><BsFillStopFill/></Button>
        <FaRobot className={`ml-1 text-lg ${(ai == "1")?"loadinglogospin text-green-400":" text-red-600"}`}/>
      </div>
    </div>
  );
}
