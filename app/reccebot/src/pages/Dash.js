import React, { useEffect, useState } from "react";
import Button from "../components/Uncategorised/Button";
import CWrap from "../components/Uncategorised/CWrap";
import config from "../config";
import Base from "../template/Base";
import RadarUI from "./../features/RadarUI";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import Movepad from "../components/Controls/Movepad";
import GPSMap from "../components/Controls/GPSMap";
import DashSection from "../components/Uncategorised/DashSection";
import DashItem from "../components/Uncategorised/DashItem";
import LogoutBtn from "../components/Auth/LogoutBtn";
import Logs from "../components/Controls/Logs";
import Camera from "../components/Controls/Camera";
import Toggles from "../components/Controls/Toggles";

const meta = {
  title: "Dashboard",
  description: "Dashboard page of the reccebot app",
};

export default function Dashboard() {
  const [socketUrl, setSocketUrl] = useState(config.wsURL);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const handleSendMessage = (message) => {
    // console.log(message)
    sendMessage(message);
  };

  useEffect(() => {
    // console.log(lastMessage.data);
    setMessageHistory([...messageHistory, lastMessage?.data]);
    return () => {};
  }, [lastMessage]);

  useEffect(()=>{
    handleSendMessage("**boolscheck")
  },[])

  return (
    <Base config={meta} keyrequired>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1">
        <DashSection>
          <CWrap>
            <div className="text-2xl font-sans mb-1 flex items-center justify-start w-full">
              <LogoutBtn />
              Reccebot
            </div>
            <DashItem heading="Camera">
              {/* <RadarUI /> */}
              {/* <div className="bg-black w-full aspect-video rounded-md"/> */}
              <Camera messageHistory={messageHistory}/>
            </DashItem>
            <Button
              className="mt-2"
              onClick={() => handleSendMessage("rcconnections")}
            >
              Connections
            </Button>
            <Movepad className="mt-2" handleSendMessage={handleSendMessage} />
            <Toggles handleSendMessage={handleSendMessage}/>
          </CWrap>
        </DashSection>
        <DashSection>
          <CWrap>
            <div className="grid md:grid-cols-2 w-full sm:grid-cols-1 ">
              <DashItem heading="Location">
                <GPSMap/>
              </DashItem>
              <DashItem heading="Radar">
                <RadarUI  messageHistory={messageHistory}/>
              </DashItem>
            </div>
            <Logs messageHistory={messageHistory} handleSendMessage={handleSendMessage}/>
            
            {/* <div className="break-words w-4/5">
              {messageHistory && JSON.stringify(messageHistory)}
            </div> */}
          </CWrap>
        </DashSection>
      </div>
    </Base>
  );
}
