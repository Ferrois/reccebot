import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logfilter from "../../utils/logfilter";
import Button from "../Uncategorised/Button";
import DashItem from "../Uncategorised/DashItem";
import SendCommand from "./SendCommand";
import {BsTrashFill} from "react-icons/bs";

export default function Logs({ messageHistory, handleSendMessage }) {
  const [logsArray, setLogsArray] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    const date = new Date().toLocaleString();
    const idx = messageHistory.length - 1;
    if (messageHistory[idx] == "Pong received") {
      if (firstRender == true) {
        setFirstRender(false);
        toast.success("Server Response Detected!");
      }
      return;
    }
    if (messageHistory[idx].slice(0,3) == "usd") {
      return;
    }
    setLogsArray([...logsArray, [date, logfilter(messageHistory[idx]), idx]]);
  }, [messageHistory?.length]);
  return (
    <DashItem heading="Logs">
      <div className="p-3 bg-gray-875 shadow-md rounded-md h-64 overflow-y-auto">
        {logsArray &&
          logsArray.map((data) => {
            return <div key={data[2]}>{data[0] + ": " + data[1]}</div>;
          })}
      </div>
      <div className="flex justify-between items-center">
        <div>
        <Button onClick={()=>setFirstRender(true)}>{firstRender? ".  .  .  .":"Ping"}</Button>
        <Button className="m-1 text-red-600" onClick={()=>setLogsArray([])}><BsTrashFill/></Button>
        </div>
        <SendCommand handleSendMessage={handleSendMessage} />
      </div>
    </DashItem>
  );
}
